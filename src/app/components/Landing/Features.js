import { HiShieldCheck, HiCodeBracketSquare, HiArrowTrendingUp } from "react-icons/hi2";

export default function Features() {
  return (
    <section className="py-24 bg-base-200 border-y border-base-300">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="badge badge-secondary mb-4 uppercase font-bold tracking-widest text-xs">Features</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-base-content mb-6 leading-tight">
              Honest Marketing That <br /><span className="text-secondary italic">Actually Converts</span>
            </h2>
            <p className="text-base sm:text-lg text-base-content/70 mb-8 leading-relaxed">
              Ditch the generic "100 people are viewing this page" fake trackers. 
              Modern buyers demand authenticity. We link directly to Stripe to mathematically prove your sales are real.
            </p>
            
            <div className="space-y-6">
              {[
                { 
                    title: "100% Cryptographically Verified", 
                    desc: "Every purchase is backed by a secure HMAC hash linked instantly to a real Stripe Charge ID.", 
                    icon: <HiShieldCheck className="w-8 h-8 text-green-500" />
                },
                { 
                    title: "Zero Customer Data Stored", 
                    desc: "We use a read-only Restricted API Key. We never permanently store your customers' personal data.", 
                    icon: <HiArrowTrendingUp className="w-8 h-8 text-blue-500" />
                },
                { 
                    title: "Drop-in Install in Seconds", 
                    desc: "Add your key, copy a single line of JavaScript, and paste it into your website. It's that easy.", 
                    icon: <HiCodeBracketSquare className="w-8 h-8 text-purple-500" />
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-6 rounded-box bg-base-100 shadow-sm border border-base-300">
                  <div className="shrink-0 mt-1">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-base-content mb-1">{item.title}</h3>
                    <p className="text-base-content/60 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="card bg-[#111827] text-white shadow-2xl border border-gray-800 transform rotate-1 hover:rotate-0 transition-transform duration-300">
            <div className="card-body p-0">
              <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900 rounded-t-2xl">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <h3 className="font-mono text-xs text-gray-500">index.html</h3>
                <div></div>
              </div>
              
              <div className="p-4 sm:p-6 overflow-x-auto">
                <pre className="text-[11px] sm:text-sm font-mono leading-relaxed">
                    <span className="text-gray-500">&lt;!-- Your website content --&gt;</span><br />
                    <span className="text-blue-400">&lt;body&gt;</span><br />
                    <br />
                    {"  "}<span className="text-gray-500">&lt;!-- Paste ProofPopify right before ending body --&gt;</span><br />
                    {"  "}<span className="text-green-400">&lt;script</span> <span className="text-purple-400">src=</span><span className="text-yellow-300">"https://proofpopify.com/embed.js?id=cuid123"</span> <span className="text-green-400">defer&gt;&lt;/script&gt;</span><br />
                    <br />
                    <span className="text-blue-400">&lt;/body&gt;</span>
                </pre>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
