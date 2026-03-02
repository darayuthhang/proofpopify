import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { constants } from "@/lib/constants";

export default function BigCardSignup() {
  return (
    <section className="bg-[#0B0F19] text-white py-20 lg:py-32 overflow-hidden relative">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent"></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl lg:text-6xl font-extrabold mb-8 tracking-tight leading-tight max-w-4xl mx-auto">
          Ready to dramatically increase your conversion rate?
        </h2>
        <p className="text-xl lg:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium">
          Join other successful startups converting passing visitors into paying customers using mathematically proven social proof.
        </p>
        <Link href={constants.HERO_BUTTON_LINK} className="btn btn-primary btn-lg px-12 rounded-full text-lg shadow-2xl group border-none">
          {constants.HERO_BUTTON_TEXT}
          <HiOutlineArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
        <p className="mt-6 text-sm text-gray-500 font-medium tracking-wide">
          Takes 2 minutes. No credit card required.
        </p>
      </div>
    </section>
  );
}
