import { HiShieldCheck, HiCodeBracketSquare, HiArrowTrendingUp } from "react-icons/hi2";

export default function Features() {
  return (
    <section className="py-24 bg-[#F9FAFB] border-b-2 border-black">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <div>
            <div className="inline-block text-black font-bold uppercase tracking-widest text-sm mb-4">
              Features
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-black mb-6 leading-[1.1]">
              Honest Marketing That Actually Converts
            </h2>
            <p className="text-lg sm:text-xl text-black/70 font-medium mb-10 leading-relaxed">
              Ditch the generic "100 people are viewing this page" fake trackers. 
              Modern buyers demand authenticity. We link directly to Stripe to mathematically prove your sales are real.
            </p>
            
            <div className="space-y-6">
              {[
                { 
                    title: "100% Cryptographically Verified", 
                    desc: "Every purchase is backed by a secure HMAC hash linked instantly to a real Stripe Charge ID.", 
                    icon: <HiShieldCheck className="w-6 h-6 text-black" strokeWidth={2} />
                },
                { 
                    title: "Zero Customer Data Stored", 
                    desc: "We use a read-only Restricted API Key. We never permanently store your customers' personal data.", 
                    icon: <HiArrowTrendingUp className="w-6 h-6 text-black" strokeWidth={2} />
                },
                { 
                    title: "Drop-in Install in Seconds", 
                    desc: "Add your key, copy a single line of JavaScript, and paste it into your website. It's that easy.", 
                    icon: <HiCodeBracketSquare className="w-6 h-6 text-black" strokeWidth={2} />
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-5 p-6 rounded bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
                  <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded bg-[#00B4D8] border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black mb-2">{item.title}</h3>
                    <p className="text-black/70 font-medium text-sm sm:text-base">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full bg-[#111827] text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-2 border-black rounded overflow-hidden">
            <div className="p-4 border-b-2 border-black flex justify-between items-center bg-gray-200">
              <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400 border border-black"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400 border border-black"></div>
              </div>
              <h3 className="font-mono text-sm font-bold text-black border border-black px-2 py-0.5 rounded bg-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">index.html</h3>
              <div></div>
            </div>
            
            <div className="p-6 sm:p-8 overflow-x-auto bg-[#0B0F19]">
              <pre className="text-sm md:text-base font-mono leading-relaxed font-bold">
                  <span className="text-[#a0aec0]">&lt;!-- Your website content --&gt;</span><br />
                  <span className="text-[#63b3ed]">&lt;body&gt;</span><br />
                  <br />
                  {"  "}<span className="text-[#a0aec0]">&lt;!-- Paste ProofPopify right before ending body --&gt;</span><br />
                  {"  "}<span className="text-[#72DDA4]">&lt;script</span> <span className="text-[#b794f4]">src=</span><span className="text-[#FFD91A]">"https://proofpopify.com/embed.js?id=cuid123"</span> <span className="text-[#72DDA4]">defer&gt;&lt;/script&gt;</span><br />
                  <br />
                  <span className="text-[#63b3ed]">&lt;/body&gt;</span>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
