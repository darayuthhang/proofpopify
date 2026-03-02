import Hero from "./Landing/Hero";
import WhyUseIt from "./Landing/WhyUseIt";
import HowItWorks from "./Landing/HowItWorks";
import Features from "./Landing/Features";
import Pricing from "./Landing/Pricing";
import FAQ from "./Landing/FAQ";
import FounderStory from "./Landing/FounderStory";
import BigCardSignup from "./Landing/BigCardSignup";
import Footer from "./Landing/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <WhyUseIt />
      <HowItWorks />
      <div id="features">
        <Features />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
      <FAQ />
      <FounderStory />
      <BigCardSignup />
      <Footer />
    </main>
  );
}
