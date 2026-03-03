import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./components/AuthProvider";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: '%s | ProofPopify',
    default: 'ProofPopify — Boost Conversions with Stripe Social Proof Notifications',
  },
  description:
    'Increase trust and sales with real-time verified Stripe purchase popups on your website.',
  openGraph: {
    title: 'ProofPopify',
    description: 'Increase trust and sales with real-time verified Stripe purchase popups on your website.',
    url: 'https://proofpopify.com',
    siteName: 'ProofPopify',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F9FAFB] text-black`}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-64px)]">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
