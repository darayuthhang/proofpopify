import { HiOutlineKey, HiOutlinePaintBrush, HiOutlineCodeBracketSquare, HiOutlineBolt } from "react-icons/hi2";

export default function HowItWorks() {
  const steps = [
    {
      title: "1. Connect Stripe Securely",
      description: "Create a read-only Restricted API Key in your Stripe dashboard. We only ask for permission to read recent charges, keeping your account 100% secure.",
      icon: <HiOutlineKey className="w-8 h-8 text-primary" />,
    },
    {
      title: "2. Customize Your Widget",
      description: "Match the popup to your brand. Choose your theme colors, widget position, and custom call-to-action text in our simple dashboard.",
      icon: <HiOutlinePaintBrush className="w-8 h-8 text-secondary" />,
    },
    {
      title: "3. Paste One Line of Code",
      description: "Copy your unique embed script and paste it right before the closing </body> tag of your website. It works with Next.js, Webflow, WordPress, and more.",
      icon: <HiOutlineCodeBracketSquare className="w-8 h-8 text-accent" />,
    }
  ];

  return (
    <section className="py-24 bg-base-100">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge badge-secondary mb-4 uppercase font-bold tracking-widest text-xs">Simple Setup</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-base-content mb-6 leading-tight">
            Live on Your Site in <span className="text-primary">2 Minutes</span>
          </h2>
          <p className="text-base sm:text-lg text-base-content/70 leading-relaxed">
            No complex developer integration required. If you know how to copy and paste text, you can install ProofPopify.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-[4rem] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-base-200 via-primary/30 to-base-200 z-0"></div>

          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-base-100 border-4 border-base-200 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 group-hover:border-primary transition-all duration-300">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-base-content mb-4">{step.title}</h3>
              <p className="text-base-content/70 leading-relaxed max-w-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Lightweight Performance Callout */}
        <div className="mt-20 max-w-3xl mx-auto bg-base-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 border border-base-300 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center shrink-0">
            <HiOutlineBolt className="w-8 h-8" />
          </div>
          <div className="text-center sm:text-left">
            <h4 className="text-xl font-bold text-base-content mb-2">Ultra-Lightweight & Fast</h4>
            <p className="text-base-content/70 text-sm sm:text-base leading-relaxed">
              Our embed script is <strong>under 5KB</strong> and loads asynchronously. It will <strong>never</strong> slow down your page load speed or negatively affect your Google Core Web Vitals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
