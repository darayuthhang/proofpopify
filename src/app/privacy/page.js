import Link from "next/link";
import { constants } from "@/lib/constants";

export const metadata = {
  title: `Privacy Policy | ${constants.APP_NAME}`,
  description: `Privacy Policy for ${constants.APP_NAME}`,
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-base-100 py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/" className="btn btn-ghost mb-8 border border-base-300">
          ← Back to Home
        </Link>
        <div className="prose prose-lg mx-auto">
          <h1 className="text-4xl font-extrabold mb-8 text-base-content">Privacy Policy</h1>
          <p className="text-base-content/70 mb-4">Last Updated: March 2, 2026</p>
          
          <h2 className="text-2xl font-bold mt-10 mb-4 text-base-content">1. Overview</h2>
          <p className="text-base-content/80 leading-relaxed mb-6">
            This Privacy Policy describes how {constants.APP_NAME} ("we", "us", or "our") collects, uses, and protects your information when you use our website ({constants.APP_DOMAIN}) and our social proof verification widget. We are committed to ensuring your privacy is protected.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-base-content">2. Information We Collect</h2>
          <ul className="list-disc pl-6 text-base-content/80 leading-relaxed mb-6 space-y-2">
            <li><strong>Account Information:</strong> When you register, we collect your name and email address to manage your account.</li>
            <li><strong>Stripe API Credentials:</strong> We securely store the read-only Stripe Restricted API Key you provide us. We use this key solely to read your recent transactions.</li>
            <li><strong>Transaction Data (Ephemeral):</strong> We read basic transaction details (such as the buyer's city, country, and time of purchase) from Stripe to display on your widget. We <strong>do not permanently store</strong> your customers' personal data on our servers. The widget accesses Stripe data in real-time, processes it using a secure cryptographic hash, and returns the verified location to display.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-base-content">3. How We Use Your Information</h2>
          <ul className="list-disc pl-6 text-base-content/80 leading-relaxed mb-6 space-y-2">
            <li>To provide, maintain, and improve our Service.</li>
            <li>To cryptographically verify and display your Stripe transactions to your website visitors.</li>
            <li>To communicate with you, including for customer support and service updates.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-base-content">4. Security of Data</h2>
          <p className="text-base-content/80 leading-relaxed mb-6">
            The security of your data is important to us. We never ask for full Stripe Secret Keys with write permissions. We encrypt sensitive data and use industry-standard security measures to protect your account. However, remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-base-content">5. Privacy laws & Your Customers</h2>
          <p className="text-base-content/80 leading-relaxed mb-6">
            Because {constants.APP_NAME} acts as a data processor for the end-user (your website visitors) transaction data, you as the website owner are the data controller. It is your responsibility to ensure that your own website's Privacy Policy accurately reflects that you share basic purchase data (such as city/country) to display social proof notifications.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-base-content">6. Contact Us</h2>
          <p className="text-base-content/80 leading-relaxed mb-6">
            If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at: <a href="mailto:darayuthhang12@gmail.com" className="text-primary font-semibold hover:underline">darayuthhang12@gmail.com</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
