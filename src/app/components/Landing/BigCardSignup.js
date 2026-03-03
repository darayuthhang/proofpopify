import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { constants } from "@/lib/constants";

export default function BigCardSignup() {
  return (
    <section className="bg-[#FFD91A] text-black py-24 sm:py-32 overflow-hidden border-b-2 border-black relative">
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-8 tracking-tight leading-[1.05] max-w-4xl mx-auto text-black">
          Ready to dramatically increase your conversion rate?
        </h2>
        <p className="text-xl lg:text-2xl text-black/80 mb-12 max-w-3xl mx-auto font-medium">
          Join other successful startups converting passing visitors into paying customers using mathematically proven social proof.
        </p>
        <Link 
          href={constants.HERO_BUTTON_LINK} 
          className="inline-flex items-center justify-center bg-[#72DDA4] border-2 border-black text-black font-bold text-xl px-10 py-4 rounded shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all group"
        >
          {constants.HERO_BUTTON_TEXT}
          <HiOutlineArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform stroke-2 text-black" />
        </Link>
        <p className="mt-8 text-sm text-black/60 font-medium tracking-wide">
          Takes 2 minutes. No credit card required.
        </p>
      </div>
    </section>
  );
}
