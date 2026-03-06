import Link from "next/link";
import { constants } from "@/lib/constants";
import { HiCheckBadge, HiOutlineArrowRight } from "react-icons/hi2";

export default function Hero() {
  return (
    <section className="relative pt-20 pb-0 lg:pt-28 lg:pb-0 overflow-hidden bg-[#FFD91A] text-black">
      <div className="container mx-auto px-6 relative z-10 pb-20 lg:pb-28">
        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
          
          {/* Left Text Side */}
          <div className="flex-1 text-left">
            <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-extrabold tracking-tight text-black mb-6 leading-[1.05]">
              Stripe-Verified Sales Popups That Boost Conversions
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-black/80 font-medium mb-10 max-w-xl leading-relaxed">
              Add a beautiful, real-time social proof widget to your site in 2 minutes. We sync directly with Stripe so visitors know your sales are 100% real.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <Link 
                href="/#pricing" 
                className="group inline-flex items-center bg-[#7EE19F] text-black font-bold text-lg px-8 py-3.5 border-2 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                {constants.HERO_BUTTON_TEXT}
                <HiOutlineArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform stroke-2 text-black" />
              </Link>
              
              <div className="flex items-center gap-2 text-black/80 font-medium text-sm">
                <span className="flex items-center justify-center w-5 h-5 bg-[#7EE19F] rounded-full border border-black">
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                Takes 2 minutes to install
              </div>
            </div>
            
            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex -space-x-3">
                {[
                  "https://randomuser.me/api/portraits/men/32.jpg",
                  "https://randomuser.me/api/portraits/women/44.jpg",
                  "https://randomuser.me/api/portraits/women/68.jpg",
                  "https://randomuser.me/api/portraits/men/46.jpg",
                  "https://randomuser.me/api/portraits/men/86.jpg"
                ].map((src, index) => (
                  <img 
                    key={index}
                    className="w-10 h-10 rounded-full border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] object-cover bg-white placeholder-blur" 
                    src={src} 
                    alt={`User ${index + 1}`} 
                  />
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-[#FF8A00] drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                <div className="text-sm font-extrabold text-black mt-1">
                  Loved by 100+ founders
                </div>
              </div>
            </div>
          </div>

          {/* Right Widget Side */}
          <div className="flex-1 w-full max-w-md mx-auto lg:mr-0 mt-16 lg:mt-0 relative h-[280px]">
             
            {/* Soft & Elegant Style */}
             <div className="absolute top-0 right-0 sm:-right-4 w-[95%] bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-white px-5 py-4 flex items-center gap-4 select-none transform rotate-3 hover:rotate-6 hover:-translate-y-1 transition-all duration-300 z-10 cursor-pointer group">
                <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden bg-gradient-to-br from-indigo-50 to-pink-50 flex items-center justify-center shadow-inner">
                    <img src="https://api.dicebear.com/9.x/notionists/svg?seed=Jessica&backgroundColor=transparent" alt="Avatar" className="w-full h-full object-cover scale-110" />
                </div>

                <div className="flex flex-col text-left w-full">
                    <p className="m-0 text-gray-800 text-[14px] sm:text-[15px] font-medium leading-tight tracking-tight">
                        <span className="text-gray-500">Sarah from</span> London (UK) <span className="text-gray-500">upgraded</span>
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                        <span className="text-[12px] text-gray-400 font-medium">Just now</span>
                        <div className="text-[#10B981] flex ml-1">
                            <HiCheckBadge className="w-4 h-4" />
                        </div>
                        <span className="text-[12px] text-gray-400 font-medium">Verified securely</span>
                    </div>
                </div>
                
                {/* Floating fun marker */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg border border-white/20 whitespace-nowrap">
                  <span className="group-hover:hidden">Modern Style ✨</span>
                  <span className="hidden group-hover:inline-block">Any style you want!</span>
                </div>
            </div>

            {/* Brutalist Style (Original) */}
            <div className="absolute top-24 sm:top-28 left-0 sm:-left-4 w-[95%] bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-md px-5 py-4 flex items-center gap-4 select-none transform -rotate-2 hover:-rotate-4 hover:-translate-y-1 transition-all duration-300 z-20 cursor-pointer group">
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

                {/* Floating fun marker */}
                <div className="absolute -bottom-3 -left-3 bg-[#FFD91A] text-black text-[11px] font-extrabold px-3 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase whitespace-nowrap">
                  Bold & Edgy ⚡️
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
