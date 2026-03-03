import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: startupId } = await params;
    

    // Verify ownership
    const startup = await prisma.startup.findUnique({
      where: { id: startupId },
      select: { userId: true },
    });
    
    if (!startup || startup.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found or unauthorized" }, { status: 403 });
    }

    const reqData = await request.json();
    const updates = {};
    
    // Process Stripe Key if provided
    const stripeRestrictedKey = reqData.stripeRestrictedKey;
    if (stripeRestrictedKey) {
      if (typeof stripeRestrictedKey !== "string" || !stripeRestrictedKey.startsWith("rk_")) {
        return NextResponse.json({ error: "Invalid key format. Stripe Restricted Keys should start with 'rk_'." }, { status: 400 });
      }
      updates.stripeRestrictedKey = stripeRestrictedKey;
    }

    // Process Theme Color
    if (reqData.themeColor && typeof reqData.themeColor === "string") {
      updates.themeColor = reqData.themeColor;
    }

    // Process Background Color
    if (reqData.backgroundColor && typeof reqData.backgroundColor === "string") {
      updates.backgroundColor = reqData.backgroundColor;
    }

    // Process Action Text
    if (reqData.actionText && typeof reqData.actionText === "string") {
      updates.actionText = reqData.actionText.slice(0, 30);
    }

    // Process Show Real Names
    if (reqData.showRealNames !== undefined) {
      updates.showRealNames = reqData.showRealNames === true || reqData.showRealNames === "true";
    }

    // Process Position
    if (reqData.position && typeof reqData.position === "string") {
      updates.position = reqData.position;
    }

    // Process Show Icon
    if (reqData.showIcon !== undefined) {
      updates.showIcon = reqData.showIcon === true || reqData.showIcon === "true";
    }

    // Process Show Border
    if (reqData.showBorder !== undefined) {
      updates.showBorder = reqData.showBorder === true || reqData.showBorder === "true";
    }
    
    // Process Name
    if (reqData.name && typeof reqData.name === "string") {
        updates.name = reqData.name;
    }

    if (Object.keys(updates).length > 0) {
      await prisma.startup.update({
        where: { id: startupId },
        data: updates,
      });
    }
    
    return NextResponse.json({ success: true, message: "Startup updated" }, { status: 200 });
  } catch (error) {
    console.error("Error updating startup:", error);
    return NextResponse.json({ error: "An error occurred while updating the startup." }, { status: 500 });
  }
}
