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
    <section className="py-24 bg-base-100">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-base-content mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-base-content/70">
            Everything you need to know about ProofPopify.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="collapse collapse-plus border border-base-300 bg-base-100 shadow-sm rounded-2xl"
            >
              <input type="radio" name="faq-accordion" defaultChecked={idx === 0} /> 
              <div className="collapse-title text-lg font-bold text-base-content p-6">
                {faq.question}
              </div>
              <div className="collapse-content px-6 text-base-content/70 leading-relaxed"> 
                <p className="pb-4">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
