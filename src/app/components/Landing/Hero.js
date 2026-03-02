import Link from "next/link";
import { constants } from "@/lib/constants";
import { HiCheckBadge } from "react-icons/hi2";

export default function Hero() {
  return (
    <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-32 overflow-hidden bg-base-100">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-200 border border-base-300 text-base-content text-sm font-semibold mb-8 shadow-sm">
            <span className="badge badge-primary badge-sm">STRIPE VERIFIED</span>
            Build absolute trust with your visitors
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-base-content mb-8 leading-[1.1]">
            Turn Visitors Into Buyers with <span className="text-primary italic">Authentic</span> Social Proof
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-base-content/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Boost your conversion rate by showing real-time, 100% verified Stripe purchases. 
            No fake data. No complex setup. Just powerful, trust-building sales popups.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href={constants.HERO_BUTTON_LINK} 
              className="btn btn-primary btn-lg w-full sm:w-auto px-12 text-lg shadow-lg hover:scale-105 transition-transform"
            >
              {constants.HERO_BUTTON_TEXT}
            </Link>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="avatar-group -space-x-3 rtl:space-x-reverse">
              <div className="avatar border-2 border-base-100">
                <div className="w-8">
                  <img src="/my_profile.jpg" alt="Founder" />
                </div>
              </div>
              <div className="avatar border-2 border-base-100">
                <div className="w-8">
                  <img src="https://i.pravatar.cc/100?img=12" alt="User 1" />
                </div>
              </div>
              <div className="avatar border-2 border-base-100">
                <div className="w-8">
                  <img src="https://i.pravatar.cc/100?img=32" alt="User 2" />
                </div>
              </div>
              <div className="avatar border-2 border-base-100 placeholder bg-base-300 text-base-content">
                <div className="w-8">
                  <span className="text-xs">+99</span>
                </div>
              </div>
            </div>
            <p className="text-sm font-medium text-base-content/70">
              Loved by <span className="text-base-content font-bold">entrepreneurs</span> & <span className="text-base-content font-bold">marketers</span>
            </p>
          </div>
          
          {/* Dashboard / Popup Preview */}
          <div className="mt-16 sm:mt-20 max-w-2xl mx-auto flex justify-center px-2 sm:px-0">
            
            {/* The beautiful animated popup replica */}
            <div className="relative animate-bounce w-full sm:w-auto" style={{ animationDuration: '3s' }}>
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25"></div>
                <div className="relative bg-white border border-gray-200 shadow-2xl rounded-2xl p-4 flex items-center gap-3 w-full sm:w-max select-none mx-auto overflow-hidden">
                    <div className="flex flex-col text-left w-full">
                        <p className="m-0 text-gray-800 text-[13px] sm:text-[14px] font-medium leading-tight tracking-tight break-words">
                            Someone in <span className="text-[#00B4D8] font-semibold">New York (United States)</span> subscribed
                        </p>
                        <div className="flex items-center gap-[4px] mt-1.5 flex-wrap">
                            <span className="text-[11px] sm:text-[12px] text-gray-500">2 minutes ago</span>
                            <span className="text-[11px] sm:text-[12px] text-gray-400">|</span>
                            <div className="text-[#00B4D8] flex">
                                <HiCheckBadge className="w-3 h-3 sm:w-4 sm:h-4" />
                            </div>
                            <span className="text-[11px] sm:text-[12px] text-gray-500 font-medium whitespace-nowrap">
                                Verified by <span className="text-[#635BFF] font-semibold">Stripe</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

          </div>
          
          <div className="mt-12 text-sm text-base-content/50 font-medium tracking-wide uppercase">
            Takes 2 minutes to install. Zero coding required.
          </div>
        </div>
      </div>
    </section>
  );
}
