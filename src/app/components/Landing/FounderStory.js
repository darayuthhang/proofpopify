
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";

export default function FounderStory() {
  return (
    <section className="py-24 bg-base-200">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-base-100 rounded-3xl shadow-xl overflow-hidden border border-base-300">
          <div className="grid md:grid-cols-5 gap-0">
            
            {/* Image Section */}
            <div className="md:col-span-2 bg-[#635BFF]/10 relative min-h-[300px] flex items-center justify-center p-8">
              <div className="w-48 h-48 sm:w-56 sm:h-56 relative rounded-full overflow-hidden shadow-2xl border-4 border-white">
                {/* Using unavatar.io to pull the user's X/Twitter profile picture automatically */}
                <img 
                  src="/my_profile.jpg"
                  alt="Darayuth H. - Founder of ProofPopify"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="md:col-span-3 p-8 sm:p-12 flex flex-col justify-center">
              <div className="badge badge-primary mb-4 font-bold tracking-widest text-xs">FOUNDER'S STORY</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-base-content mb-6 leading-tight">
                Why I built <span className="text-primary">ProofPopify</span>
              </h2>
              
              <div className="space-y-4 text-base-content/80 text-lg leading-relaxed mb-8">
                <p>
                  "I was tired of seeing amazing startups struggle to convert visitors into customers. Building a great product isn't enough anymore—you have to build <strong>trust</strong>."
                </p>
                <p>
                  "I built ProofPopify to help other startups grow. By showing genuine, 100% verified social proof directly from Stripe, we can instantly increase your credibility. More trust leads to more sales, which means more runway for your dream."
                </p>
              </div>

              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-base-200">
                <div>
                  <p className="font-bold text-base-content text-lg">Darayuth Hang</p>
                  <p className="text-base-content/60 text-sm">Founder, ProofPopify</p>
                </div>
                
                <Link 
                  href="https://x.com/DarayuthH" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline hover:bg-black hover:text-white ml-auto gap-2"
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
