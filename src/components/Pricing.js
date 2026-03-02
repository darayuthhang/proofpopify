'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const Pricing = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubscribe = async (priceId) => {
    // If we wanted to check session we'd need useSession, but since it's missing let's simply assume they click it and we don't have it implemented properly here.
    // However, looking at the code, it directly calls /api/stripe/checkout which returns 401 if unauthenticated.
    try {
      setLoading(true);
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { url } = await response.json();
      router.push(url);
    } catch (error) {
      console.error('Subscription Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="card bg-base-200 shadow-xl border border-base-300">
            <div className="card-body items-center text-center">
              <h3 className="card-title text-2xl">Free</h3>
              <p className="text-4xl font-bold my-4">$0<span className="text-base font-normal">/mo</span></p>
              <ul className="list-disc list-inside mb-6 text-left">
                <li>Basic Features</li>
                <li>Limited Access</li>
                <li>Community Support</li>
              </ul>
              <div className="card-actions">
                <button className="btn btn-outline">Current Plan</button>
              </div>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="card bg-primary text-primary-content shadow-xl">
            <div className="card-body items-center text-center">
              <h3 className="card-title text-2xl">Pro</h3>
              <p className="text-4xl font-bold my-4">$19<span className="text-base font-normal opacity-80">/mo</span></p>
              <ul className="list-disc list-inside mb-6 text-left">
                <li>All Features</li>
                <li>Unlimited Access</li>
                <li>Priority Support</li>
              </ul>
              <div className="card-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleSubscribe('price_1Q...')} // Replace with actual Price ID
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Subscribe Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
