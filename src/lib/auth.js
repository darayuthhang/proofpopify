import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { loginLimiter } from "@/lib/rate-limit";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout: 20000,
      }
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter email and password");
        }
        const remaining = await loginLimiter.removeTokens(1);
        // Rate limit login: 10 attempts per minute
        if (remaining < 0) {
          throw new Error("Too many login attempts. Please wait a minute and try again.");
        }

        const email = credentials.email.toLowerCase().trim();

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          // Use generic message to prevent user enumeration
          throw new Error("Invalid email or password");
        }

        if (user.authProvider === "google") {
          throw new Error("This account uses Google sign-in. Please use the Google button.");
        }

        if (!user.password) {
          throw new Error("Invalid email or password");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          // Use same generic message to prevent user enumeration
          throw new Error("Invalid email or password");
        }

        // Block login if email is not verified
        if (!user.emailVerified) {
          throw new Error("Please verify your email before signing in. Check your inbox.");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours (session expires)
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const email = user.email.toLowerCase().trim();

        const existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (existingUser) {
          if (existingUser.authProvider === "credentials") {
            return "/login?error=This email is already registered with a password. Please sign in with your credentials.";
          }
          return true;
        }

        // New Google user — create account (auto-verified)
        await prisma.user.create({
          data: {
            email,
            name: user.name,
            authProvider: "google",
            emailVerified: true,
          },
        });

        return true;
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // On first login, populate token from DB
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
          token.isAccess = dbUser.isAccess;
        }
      }

      // On every request, refresh isAccess from DB so it updates after payment
      if (token.id) {
        const freshUser = await prisma.user.findUnique({
          where: { id: token.id },
          select: { isAccess: true },
        });
        if (freshUser) {
          token.isAccess = freshUser.isAccess;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.isAccess = token.isAccess;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      // Allows callback URLs on the same origin or www/non-www variations
      if (new URL(url).origin === baseUrl || url.includes("proofpopify.com")) {
        return url;
      }
      return baseUrl;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
