import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";

export default function FounderStory() {
  return (
    <section className="py-24 bg-[#FFD91A] border-b-2 border-black">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-[#F9FAFB] rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden border-2 border-black">
          <div className="grid md:grid-cols-5 gap-0">
            
            {/* Image Section */}
            <div className="md:col-span-2 bg-[#72DDA4] border-b-2 md:border-b-0 md:border-r-2 border-black relative min-h-[300px] flex items-center justify-center p-8">
              <div className="w-48 h-48 sm:w-56 sm:h-56 relative rounded-full overflow-hidden shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
                <img 
                  src="/my_profile.jpg"
                  alt="Darayuth H. - Founder of ProofPopify"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="md:col-span-3 p-8 sm:p-12 flex flex-col justify-center">
              <div className="inline-block text-black font-bold uppercase tracking-widest text-xs mb-4">
                FOUNDER'S STORY
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-black mb-6 leading-[1.1]">
                Why I built ProofPopify
              </h2>
              
              <div className="space-y-4 text-black/70 font-medium text-lg leading-relaxed mb-8">
                <p>
                  "I was tired of seeing amazing startups struggle to convert visitors into customers. Building a great product isn't enough anymore—you have to build <strong className="font-bold text-black">trust</strong>."
                </p>
                <p>
                  "I built ProofPopify to help other startups grow. By showing genuine, 100% verified social proof directly from Stripe, we can instantly increase your credibility. More trust leads to more sales, which means more runway for your dream."
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-auto pt-6 border-t border-gray-300">
                <div>
                  <p className="font-bold text-black text-lg">Darayuth Hang</p>
                  <p className="text-black/60 font-medium text-sm">Founder, ProofPopify</p>
                </div>
                
                <Link 
                  href="https://x.com/DarayuthH" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-black text-white font-medium px-5 py-2.5 rounded border-2 border-black hover:bg-gray-800 ml-auto gap-2 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <FaXTwitter className="w-4 h-4" />
                  Connect
                </Link>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
