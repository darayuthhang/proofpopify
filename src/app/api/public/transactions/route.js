import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import Stripe from "stripe";
import { AVATAR_API_URL } from "@/lib/constants";
// Handle CORS preflight requests
export async function OPTIONS() {
  const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
  return new NextResponse(null, { status: 200, headers });
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const proofId = searchParams.get("proof_id");

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*", // Allow any site to use the embed widget
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Content-Type": "application/json",
    };

    if (!proofId) {
      return NextResponse.json(
        { error: "proof_id is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const startup = await prisma.Startup.findFirst({
      where: { proof_id: proofId },
      select: { 
        name: true,
        stripeRestrictedKey: true, 
        isActive: true, 
        themeColor: true,
        backgroundColor: true,
        actionText: true,
        showRealNames: true,
        showIcon: true,
        showBorder: true,
        showCity: true,
        position: true
      },
    });

    if (!startup) {
      return NextResponse.json(
        { error: "Startup not found" },
        { status: 404, headers: corsHeaders }
      );
    }
    
    // Provide a default transaction to show if they haven't added a stripe key yet
    const dummyTransaction = { 
      name: "John Doe", 
      city: startup.showCity ? "San Francisco" : "Unknown City", 
      country: "United States", 
      created: Math.floor(Date.now() / 1000) - 120 
    };

    if (!startup.stripeRestrictedKey) {
      return NextResponse.json({
        transactions: [dummyTransaction],
        isDummy: true,
        themeColor: startup.themeColor,
        backgroundColor: startup.backgroundColor,
        actionText: startup.actionText,
        showRealNames: startup.showRealNames,
        showIcon: startup.showIcon,
        showBorder: startup.showBorder,
        showCity: startup.showCity,
        position: startup.position,
        startupName: startup.name,
        avatarUrlBase: AVATAR_API_URL
      }, {
        status: 200, 
        headers: corsHeaders 
      });
    }

    if (!startup.isActive) {
      return NextResponse.json(
        { error: "This startup's popup is currently disabled" },
        { status: 403, headers: corsHeaders }
      );
    }

    const stripe = new Stripe(startup.stripeRestrictedKey, {
      apiVersion: "2023-10-16",
    });

    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

    // Try fetching recent charges
    const charges = await stripe.charges.list({
      limit: 5, // Fetch up to 5 latest successful transactions
    });

    let recentTransactions = charges.data.map((charge) => {
      // Extract first name safely, or force anonymous if privacy mode is on
      let firstName = "Someone";
      if (startup.showRealNames) {
        const fullName = charge.billing_details?.name || "";
        firstName = fullName.split(" ")[0].trim() || "Someone";
      }

      let fullCountryName = "United States";
      const isoCode = charge.billing_details?.address?.country;
      if (isoCode) {
        try {
          fullCountryName = regionNames.of(isoCode);
        } catch (e) {
          fullCountryName = isoCode;
        }
      }

      return {
        id: charge.id,
        name: firstName,
        city: startup.showCity ? (charge.billing_details?.address?.city || "Unknown City") : "Unknown City",
        country: fullCountryName,
        created: charge.created,
      };
    });

    let isDummy = false;
    if (recentTransactions.length === 0) {
      recentTransactions = [dummyTransaction];
      isDummy = true;
    }

    return NextResponse.json({ 
      transactions: recentTransactions,
      isDummy: isDummy,
      themeColor: startup.themeColor,
      backgroundColor: startup.backgroundColor,
      actionText: startup.actionText,
      showRealNames: startup.showRealNames,
      showIcon: startup.showIcon,
      showBorder: startup.showBorder,
      showCity: startup.showCity,
      position: startup.position,
      startupName: startup.name,
      avatarUrlBase: AVATAR_API_URL
    }, {
      headers: corsHeaders
    });
    
  } catch (error) {
    console.error("Error fetching public Stripe transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
