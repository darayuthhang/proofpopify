export const APP_NAME = "ProofPopify";
export const APP_DOMAIN = "proofpopify.com";
export const HERO_BUTTON_TEXT = "Get Started for Free";
export const HERO_BUTTON_LINK = "/register";
export const LIMIT_TRANSACTION = 5;

// Global Avatar Source - Change this once to update all avatars system-wide
export const AVATAR_API_URL = "https://api.dicebear.com/9.x/micah/svg?backgroundColor=transparent&seed=";

export const PRICING_TIERS = [
  {
    name: "Starter",
    price: "$34",
    interval: "/yearly",
    description: "Perfect for indie hackers proving their first sales.",
    features: [
      "1 Website Integration",
      "Stripe Verified Popups",
      "Real-time Polling",
      "Customizable Colors",
    ],
    cta: "Start Building Trust",
    popular: false,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY,
  },
  {
    name: "Growth",
    price: "$42",
    interval: "/yearly",
    description: "For serious startups that need high-conversion social proof.",
    features: [
      "Unlimited Websites",
      "Priority Stripe Syncing",
      "Cryptographic Verification Page",
      "Remove Watermark",
    
    ],
    cta: "Maximize Conversions Now",
    popular: true,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY,
  },
];

export const constants = {
  APP_NAME,
  APP_DOMAIN,
  PRICING_TIERS,
  HERO_BUTTON_TEXT,
  HERO_BUTTON_LINK,
  LIMIT_TRANSACTION,
  AVATAR_API_URL,
}