import LandingPage from "./components/LandingPage";
import { constants } from "@/lib/constants";

export const metadata = {
  title: `${constants.APP_NAME} | Precision Conversion Tracking`,
  description: "Track impressions, product page views, and conversion rates for all your applications in one place.",
};

export default function Home() {
  return <LandingPage />;
}
