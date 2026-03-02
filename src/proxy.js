import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // Protect /dashboard and /admin
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    // Auto-redirect to Stripe if user logged in successfully but we stored a pending priceId
    if (pathname === "/dashboard") {
      const pendingPrice = request.cookies.get("checkout_price_id")?.value;
      if (pendingPrice) {
        // Construct the checkout redirect url
        const checkoutUrl = new URL(`/api/stripe/checkout-redirect?priceId=${pendingPrice}`, request.url);
        const response = NextResponse.redirect(checkoutUrl);
        
        // Remove the cookie so it only triggers once
        response.cookies.delete("checkout_price_id");
        return response;
      }
    }
  }

  // Admin-only routes
  if (pathname.startsWith("/admin")) {
    if (token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Redirect authenticated users away from auth pages
  if (pathname === "/login" || pathname === "/register") {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
};
