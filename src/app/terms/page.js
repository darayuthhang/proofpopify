import Link from "next/link";
import { constants } from "@/lib/constants";

export const metadata = {
  title: `Terms of Service | ${constants.APP_NAME}`,
  description: `Terms of Service for ${constants.APP_NAME}`,
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-base-100 py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/" className="btn btn-ghost mb-8 border border-base-300">
          ← Back to Home
        </Link>
        <div className="prose prose-lg mx-auto">
          <h1 className="text-4xl font-extrabold mb-8 text-base-content">Terms of Service</h1>
          <p className="text-base-content/70 mb-4">Last Updated: March 2, 2026</p>
          
          <h2 className="text-2xl font-bold mt-10 mb-4 text-base-content">1. Introduction</h2>
          <p className="text-base-content/80 leading-relaxed mb-6">
            Welcome to {constants.APP_NAME}. By accessing or using our website ({constants.APP_DOMAIN}) and services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the service.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-base-content">2. Description of Service</h2>
          <p className="text-base-content/80 leading-relaxed mb-6">
            {constants.APP_NAME} provides a software tool that allows users to verify recent Stripe purchases and display these verified transactions as social proof popups on their websites. We require the use of a Stripe Restricted API Key with read-only permissions to verify charges.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-base-content">3. Subscriptions & Payments</h2>
          <p className="text-base-content/80 leading-relaxed mb-6">
            Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis depending on the subscription plan you select. All payments are securely processed through Stripe. We do not store any of your raw credit card information on our servers.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-base-content">4. User Responsibilities & Data Security</h2>
          <p className="text-base-content/80 leading-relaxed mb-6">
            You agree to provide us with a read-only Restricted API Key for Stripe and to never provide a standard Secret Key that has write privileges. You are responsible for ensuring that the use of our popup on your website complies with all applicable privacy laws (including GDPR and CCPA) regarding the display of your customers' purchasing information.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-base-content">5. Disclaimer of Liability</h2>
          <p className="text-base-content/80 leading-relaxed mb-6">
            The service is provided on an "as is" and "as available" basis. In no event shall {constants.APP_NAME}, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-base-content">6. Contact Us</h2>
          <p className="text-base-content/80 leading-relaxed mb-6">
            If you have any questions about these Terms, please contact us at: <a href="mailto:darayuthhang12@gmail.com" className="text-primary font-semibold hover:underline">darayuthhang12@gmail.com</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
