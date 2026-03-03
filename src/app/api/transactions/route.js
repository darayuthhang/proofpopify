import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import Stripe from "stripe";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { stripeRestrictedKey: true },
    });

    if (!user || !user.stripeRestrictedKey) {
      return NextResponse.json(
        { error: "No Stripe restricted key found for this user." },
        { status: 404 }
      );
    }

    const stripe = new Stripe(user.stripeRestrictedKey, {
      apiVersion: "2023-10-16", // Use a stable API version
    });

    // Try fetching recent charges (successful payments)
    const charges = await stripe.charges.list({
      limit: 5,
    });

    const recentTransactions = charges.data.map((charge) => ({
      id: charge.id,
      city: charge.billing_details?.address?.city || "Unknown City",
      country: charge.billing_details?.address?.country || "US",
      created: charge.created, // Unix timestamp format
    }));

    return NextResponse.json({ transactions: recentTransactions });
  } catch (error) {
    console.error("Error fetching Stripe transactions:", error);
    // Return a generic error to the frontend if the key is invalid or revoked
    return NextResponse.json(
      { error: "Failed to fetch transactions. Please check your Stripe key." },
      { status: 500 }
    );
  }
}
