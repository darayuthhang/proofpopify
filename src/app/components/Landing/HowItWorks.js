import { HiOutlineKey, HiOutlinePaintBrush, HiOutlineCodeBracketSquare, HiOutlineBolt } from "react-icons/hi2";

export default function HowItWorks() {
  const steps = [
    {
      title: "1. Connect Stripe",
      description: "Create a read-only Restricted API Key. We only ask for permission to read recent charges, keeping you 100% secure.",
      icon: <HiOutlineKey className="w-8 h-8 text-black" strokeWidth={2} />,
      bgColor: "bg-[#FFD91A]"
    },
    {
      title: "2. Customize Widget",
      description: "Match the popup to your brand. Choose your theme colors, widget position, and custom call-to-action text.",
      icon: <HiOutlinePaintBrush className="w-8 h-8 text-black" strokeWidth={2} />,
      bgColor: "bg-[#72DDA4]"
    },
    {
      title: "3. Paste One Line",
      description: "Copy your unique embed script and paste it into your website. Works with Next.js, Webflow, WordPress, and more.",
      icon: <HiOutlineCodeBracketSquare className="w-8 h-8 text-black" strokeWidth={2} />,
      bgColor: "bg-[#00B4D8]"
    }
  ];

  return (
    <section className="relative py-24 bg-white border-b-2 border-black overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block text-black uppercase font-bold tracking-widest text-sm mb-4">
            Simple Setup
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black mb-6 leading-[1.1]">
            Live on Your Site in 2 Minutes
          </h2>
          <p className="text-lg sm:text-xl text-black/70 font-medium leading-relaxed">
            No complex developer integration required. If you know how to copy and paste text, you can install ProofPopify.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-[2.5rem] left-[16%] right-[16%] h-[2px] bg-black z-0"></div>

          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center">
              <div className={`w-20 h-20 ${step.bgColor} border-2 border-black rounded-lg flex items-center justify-center mb-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-black mb-3">{step.title}</h3>
              <p className="text-black/70 font-medium leading-relaxed max-w-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Lightweight Performance Callout */}
        <div className="mt-20 max-w-4xl mx-auto bg-white border-2 border-black rounded-lg p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <div className="w-16 h-16 bg-[#FFD91A] border-2 border-black rounded-full flex items-center justify-center shrink-0">
            <HiOutlineBolt className="w-8 h-8 text-black" strokeWidth={2} />
          </div>
          <div className="text-center sm:text-left">
            <h4 className="text-xl font-bold text-black mb-2">Ultra-Lightweight & Lightning Fast</h4>
            <p className="text-black/70 text-base font-medium leading-relaxed">
              Our embed script is <strong className="font-bold text-black">under 5KB</strong> and loads asynchronously. It will <strong className="font-bold text-black">never</strong> slow down your page load speed or negatively affect your Google Core Web Vitals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
