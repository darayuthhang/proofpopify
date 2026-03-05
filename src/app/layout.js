import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./components/AuthProvider";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
      </head>
      
      <body className={`${inter.className} bg-[#F9FAFB] text-black`}>
        <AuthProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: '#111827',
                color: '#fff',
                border: '2px solid #000',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '14px',
                boxShadow: '3px 3px 0px 0px rgba(0,0,0,1)',
              },
              success: {
                iconTheme: { primary: '#72DDA4', secondary: '#000' },
                duration: 3000,
              },
              error: {
                iconTheme: { primary: '#e02424', secondary: '#fff' },
                duration: 4000,
              },
            }}
          />
          <Navbar />
          <main className="min-h-[calc(100vh-64px)]">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
