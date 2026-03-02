'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const SubscriptionButton = ({ isSubscribed }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleManageSubscription = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { url } = await response.json();
      router.push(url);
    } catch (error) {
      console.error('Portal Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isSubscribed) {
    return (
      <a href="/pricing" className="btn btn-primary">
        Upgrade to Pro
      </a>
    );
  }

  return (
    <button 
      className="btn btn-outline"
      onClick={handleManageSubscription}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Manage Subscription'}
    </button>
  );
};
