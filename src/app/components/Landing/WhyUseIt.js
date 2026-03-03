import { HiOutlineUserGroup, HiOutlineChartBarSquare, HiOutlineShieldCheck } from "react-icons/hi2";

export default function WhyUseIt() {
  return (
    <section className="py-24 bg-[#F9FAFB] border-b-2 border-black">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block text-black font-bold uppercase tracking-widest text-sm mb-4">
            Why It Works
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black mb-6 leading-[1.1]">
            The Psychology of Social Proof
          </h2>
          <p className="text-lg sm:text-xl text-black/70 font-medium leading-relaxed">
            Humans are hardwired to look to others when making decisions. Here is the science behind why a simple verified popup can double your conversion rate overnight.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-12 h-12 bg-[#FFD91A] border border-black text-black rounded flex items-center justify-center mb-6">
              <HiOutlineUserGroup className="w-6 h-6" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-black mb-3">The Bandwagon Effect</h3>
            <p className="text-black/70 font-medium leading-relaxed">
              When visitors see that someone else just bought your product, it immediately reduces their purchase anxiety. The <a href="https://www.nielsen.com/insights/2012/global-trust-in-advertising-and-brand-messages-2/" target="_blank" rel="noopener noreferrer" className="text-black font-bold underline hover:text-[#72DDA4]">Nielsen Global Trust Report</a> shows that 92% of consumers trust peer recommendations above all other forms of advertising.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-12 h-12 bg-[#72DDA4] border border-black text-black rounded flex items-center justify-center mb-6">
              <HiOutlineChartBarSquare className="w-6 h-6" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-black mb-3">Authentic Urgency (FOMO)</h3>
            <p className="text-black/70 font-medium leading-relaxed">
              Seeing real-time activity triggers the "Fear Of Missing Out". According to research by <a href="https://trustpulse.com/fomo-statistics/" target="_blank" rel="noopener noreferrer" className="text-black font-bold underline hover:text-[#72DDA4]">TrustPulse</a>, 60% of people make reactive purchases largely because of FOMO. 
              Real, verified purchases create genuine urgency.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-12 h-12 bg-[#00B4D8] border border-black text-black rounded flex items-center justify-center mb-6">
              <HiOutlineShieldCheck className="w-6 h-6" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-black mb-3">Verification Wins</h3>
            <p className="text-black/70 font-medium leading-relaxed">
              Consumers are blind to generic, fake widgets. The <a href="https://www.edelman.com/trust/2024/trust-barometer" target="_blank" rel="noopener noreferrer" className="text-black font-bold underline hover:text-[#72DDA4]">Edelman Trust Barometer</a> dictates that brand trust is a top buying consideration. Stamping your popups with a verifiable, cryptographic link to Stripe eliminates skepticism.
            </p>
          </div>
        </div>

        {/* Big Stat Box */}
        <div className="max-w-4xl mx-auto bg-black rounded p-10 sm:p-14 text-center text-white relative shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-[#FFD91A] font-bold tracking-widest uppercase mb-6 text-sm">The ROI of Trust</p>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-[1.15]">
            Social proof creates an average <span className="text-[#72DDA4]">conversion lift of 15%</span>.
          </h3>
          <p className="text-gray-300 sm:text-lg font-medium max-w-2xl mx-auto mb-8">
            Stop leaving money on the table. For less than the cost of a coffee, you can turn your existing traffic into a highly-converting sales machine.
          </p>

          <div className="pt-6 border-t border-gray-800 text-xs text-gray-400 max-w-xl mx-auto">
            * Statistic based on independent conversion optimization studies. Read the full data report by <a href="https://optinmonster.com/social-proof-statistics/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white underline transition-all">OptinMonster on the power of Social Proof</a>.
          </div>
        </div>
      </div>
    </section>
  );
}
