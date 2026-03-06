import LandingPage from "./components/LandingPage";
import { constants } from "@/lib/constants";

export const metadata = {
  title: `${constants.APP_NAME} | Stripe-Verified Sales Popups`,
  description: "Boost your conversion rate by displaying real-time, Stripe-verified purchase widgets that build instant trust.",
};

export default function Home() {
  return <LandingPage />;
}
