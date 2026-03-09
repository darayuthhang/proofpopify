import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const startups = await prisma.startup.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        themeColor: true,
        isActive: true,
        createdAt: true,
        // specifically NOT returning stripeRestrictedKey here for security
        stripeRestrictedKey: false
      }
    });

    return NextResponse.json({ startups });
  } catch (error) {
    console.error("Error fetching startups:", error);
    return NextResponse.json({ error: "Failed to fetch startups" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check user's subscription plan and current startup count
    const [user, startupCount] = await Promise.all([
      prisma.user.findUnique({
        where: { id: session.user.id },
        select: { stripePriceId: true, isAccess: true }
      }),
      prisma.startup.count({
        where: { userId: session.user.id }
      })
    ]);

    // if (!user || !user.isAccess) {
    //   return NextResponse.json(
    //     { error: "You need an active subscription to create a website." },
    //     { status: 403 }
    //   );
    // }

    // const starterPriceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY;
    
    // // If the user is on the Starter plan and already has 1 or more startups, prevent creation
    // if (user.stripePriceId === starterPriceId && startupCount >= 1) {
    //   return NextResponse.json(
    //     { error: "Starter plan is limited to 1 website. Please upgrade to Growth for unlimited sites." },
    //     { status: 403 }
    //   );
    // }
    
  const growthPriceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY;

// Check if user is NOT on growth plan
const isGrowthUser = user.stripePriceId === growthPriceId;

// Free users can only create 1
    if (!isGrowthUser && startupCount >= 1) {
    return NextResponse.json(
      { error: "Free plan allows only 1 website. Upgrade to Growth for unlimited sites." },
      { status: 403 }
    );
    }
    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Startup name is required" }, { status: 400 });
    }

    const startup = await prisma.startup.create({
      data: {
        name,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ startup }, { status: 201 });
  } catch (error) {
    console.error("Error creating startup:", error);
    return NextResponse.json({ error: "Failed to create startup" }, { status: 500 });
  }
}
