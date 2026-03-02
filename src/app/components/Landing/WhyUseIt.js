import { HiOutlineUserGroup, HiOutlineChartBarSquare, HiOutlineShieldCheck } from "react-icons/hi2";

export default function WhyUseIt() {
  return (
    <section className="py-24 bg-white border-y border-base-200">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge badge-primary badge-outline mb-4 uppercase font-bold tracking-widest text-xs">Why It Works</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            The Psychology of <span className="text-primary">Social Proof</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Humans are hardwired to look to others when making decisions. Here is the science behind why a simple verified popup can double your conversion rate overnight.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-base-50 p-8 rounded-2xl border border-base-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <HiOutlineUserGroup className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">The Bandwagon Effect</h3>
            <p className="text-gray-600 leading-relaxed">
              When visitors see that someone else just bought your product, it immediately reduces their purchase anxiety. The <a href="https://www.nielsen.com/insights/2012/global-trust-in-advertising-and-brand-messages-2/" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">Nielsen Global Trust Report</a> shows that 92% of consumers trust peer recommendations above all other forms of advertising.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-base-50 p-8 rounded-2xl border border-base-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-6">
              <HiOutlineChartBarSquare className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Authentic Urgency (FOMO)</h3>
            <p className="text-gray-600 leading-relaxed">
              Seeing real-time activity triggers the "Fear Of Missing Out". According to research by <a href="https://trustpulse.com/fomo-statistics/" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">TrustPulse</a>, 60% of people make reactive purchases largely because of FOMO. 
              Real, verified purchases create genuine urgency.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-base-50 p-8 rounded-2xl border border-base-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
              <HiOutlineShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Credibility Through Verification</h3>
            <p className="text-gray-600 leading-relaxed">
              Consumers are blind to generic, fake widgets. The <a href="https://www.edelman.com/trust/2024/trust-barometer" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">Edelman Trust Barometer</a> dictates that brand trust is a top buying consideration. Stamping your popups with a verifiable, cryptographic link to Stripe eliminates skepticism.
            </p>
          </div>
        </div>

        {/* Big Stat Box */}
        <div className="mt-16 max-w-4xl mx-auto bg-gray-900 rounded-3xl p-10 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>

          <p className="text-primary font-bold tracking-widest uppercase mb-4 text-sm relative z-10">The ROI of Trust</p>
          <h3 className="text-3xl sm:text-5xl font-extrabold mb-6 relative z-10 leading-tight">
            Websites using authentic social proof see an average <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">conversion lift of 15%</span>.
          </h3>
          <p className="text-gray-400 text-lg relative z-10 max-w-xl mx-auto mb-8">
            Stop leaving money on the table. For less than the cost of a coffee, you can turn your existing traffic into a highly-converting sales machine.
          </p>

          <div className="relative z-10 pt-6 border-t border-gray-800 text-xs sm:text-sm text-gray-500 max-w-xl mx-auto text-center font-medium">
            * Statistic based on independent conversion optimization studies. Read the full data report by <a href="https://optinmonster.com/social-proof-statistics/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white underline decoration-gray-600 hover:decoration-white transition-all">OptinMonster on the power of Social Proof</a>.
          </div>
        </div>
      </div>
    </section>
  );
}
