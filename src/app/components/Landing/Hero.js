import Link from "next/link";
import { constants } from "@/lib/constants";
import { HiCheckBadge } from "react-icons/hi2";

export default function Hero() {
  return (
    <section className="relative pt-20 pb-0 lg:pt-28 lg:pb-0 overflow-hidden bg-[#FFD91A] text-black">
      <div className="container mx-auto px-6 relative z-10 pb-20 lg:pb-28">
        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
          
          {/* Left Text Side */}
          <div className="flex-1 text-left">
            <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-extrabold tracking-tight text-black mb-6 leading-[1.05]">
              Automate & Scale Your Social Proof
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-black/80 font-medium mb-10 max-w-xl leading-relaxed">
              ProofPopify helps you auto-generate real-time, verified Stripe purchase popups to build absolute trust and boost your conversion rate.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <Link 
                href={constants.HERO_BUTTON_LINK} 
                className="inline-block bg-[#7EE19F] text-black font-bold text-lg px-8 py-3.5 border-2 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                {constants.HERO_BUTTON_TEXT}
              </Link>
              
              <div className="flex items-center gap-2 text-black/80 font-medium text-sm">
                <span className="flex items-center justify-center w-5 h-5 bg-[#7EE19F] rounded-full border border-black">
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                Free Trial — No Credit Card Required
              </div>
            </div>
            
            <div className="mt-10 text-xs text-black/60 font-medium tracking-wide uppercase">
              Takes 2 minutes to install. Zero coding required.
            </div>
          </div>

          {/* Right Widget Side */}
          <div className="flex-1 w-full max-w-md mx-auto lg:mr-0 mt-8 lg:mt-0 relative">
             <div className="relative animate-bounce w-full" style={{ animationDuration: '4s' }}>
                <div className="relative bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-md px-5 py-4 flex items-center gap-4 w-full select-none">
                    
                    <div className="w-12 h-12 shrink-0 rounded-full border border-black overflow-hidden bg-yellow-50 flex items-center justify-center">
                        <img src="https://api.dicebear.com/9.x/micah/svg?seed=Felix&backgroundColor=transparent" alt="Avatar" className="w-full h-full object-cover" />
                    </div>

                    <div className="flex flex-col text-left w-full">
                        <p className="m-0 text-black text-[14px] sm:text-[16px] font-bold leading-tight tracking-tight">
                            Someone in <span className="text-[#00B4D8]">New York (US)</span> subscribed
                        </p>
                        <div className="flex items-center gap-[6px] mt-1.5 flex-wrap">
                            <span className="text-[12px] text-gray-500 font-medium">2 minutes ago</span>
                            <span className="text-[12px] text-gray-300 font-bold">|</span>
                            <div className="text-[#00B4D8] flex">
                                <HiCheckBadge className="w-4 h-4" />
                            </div>
                            <span className="text-[12px] text-gray-600 font-medium whitespace-nowrap">
                                Verified by <span className="text-[#635BFF] font-bold">Stripe</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Wavy bottom divider spanning full width */}
      <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-0">
        <svg className="relative block w-[calc(100%+1.3px)] h-[30px] md:h-[40px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C73.27,34.84,159.23,67.66,242.65,76.51,269.45,79.28,296.2,74.58,321.39,56.44Z" fill="#F9FAFB" stroke="black" strokeWidth="2"></path>
        </svg>
      </div>
    </section>
  );
}
