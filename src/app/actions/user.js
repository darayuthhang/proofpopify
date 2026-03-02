"use server";

import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function saveStripeKey(formData) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return { error: "Unauthorized" };
    }

    const stripeRestrictedKey = formData.get("stripeRestrictedKey");

    if (!stripeRestrictedKey || typeof stripeRestrictedKey !== "string") {
      return { error: "Invalid Stripe key provided." };
    }

    // Basic validation to ensure it looks like a restricted key
    if (!stripeRestrictedKey.startsWith("rk_")) {
      return { error: "Invalid key format. Stripe Restricted Keys should start with 'rk_'." };
    }

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        stripeRestrictedKey,
      },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error saving Stripe key:", error);
    return { error: "An error occurred while saving the key." };
  }
}
