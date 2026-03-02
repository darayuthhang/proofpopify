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
