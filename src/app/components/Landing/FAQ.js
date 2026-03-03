export default function FAQ() {
  const faqs = [
    {
      question: "Is my Stripe data secure?",
      answer: "Yes. We use a Stripe Restricted API Key that only has read access to your recent charges. We cannot create charges, issue refunds, or modify your account. Plus, we never permanently store your customers' personal data.",
    },
    {
      question: "Will this slow down my website?",
      answer: "Not at all. The ProofPopify script is incredibly lightweight and loads asynchronously, meaning it won't affect your page load speed or Google Lighthouse scores.",
    },
    {
      question: "Does it work with my website builder?",
      answer: "Yes! ProofPopify works on any platform that allows you to embed a custom HTML script, including Next.js, Webflow, WordPress, Framer, Softr, and Shopify.",
    },
    {
      question: "Can I customize how the popup looks?",
      answer: "Absolutely. From your dashboard, you can customize the theme color, background color, positioning (e.g., bottom-left, top-right), and the action text (like 'subscribed' or 'purchased') to perfectly match your brand.",
    },
    {
      question: "What happens if I don't have recent sales?",
      answer: "The popup only fires when there is real data. If you don't have any recent sales yet, the widget will simply remain hidden. We never display empty or fake notifications.",
    },
  ];

  return (
    <section className="py-24 bg-white border-b-2 border-black">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block text-black font-bold uppercase tracking-widest text-sm mb-4">
            FAQ
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-black mb-4 leading-[1.1]">
            Frequently Asked Questions
          </h2>
          <p className="text-lg sm:text-xl text-black/70 font-medium">
            Everything you need to know about ProofPopify.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="collapse collapse-plus border-2 border-black bg-white rounded shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              <input type="radio" name="faq-accordion" defaultChecked={idx === 0} /> 
              <div className="collapse-title text-lg font-bold text-black p-6">
                {faq.question}
              </div>
              <div className="collapse-content px-6 text-black/70 font-medium text-base leading-relaxed"> 
                <p className="pb-4">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
