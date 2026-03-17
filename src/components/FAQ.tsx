import { ChevronDown, HelpCircle, MessageCircle, Phone } from 'lucide-react';
import { useState } from 'react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What services do you provide as Chartered Accountants?',
      answer: 'We provide comprehensive CA services including taxation (income tax, GST, corporate tax), audit & assurance, company registration, financial advisory, payroll management, and business compliance.',
    },
    {
      question: 'How do you ensure tax efficiency for my business?',
      answer: 'Our team conducts thorough financial analysis to identify tax-saving opportunities through proactive tax planning, utilizing exemptions and deductions, and structuring transactions optimally.',
    },
    {
      question: 'What is the GST compliance process?',
      answer: 'We handle complete GST lifecycle management including registration (GSTIN), return filing (GSTR-1, GSTR-3B, GSTR-9), audit support, and advisory on HSN/SAC classification.',
    },
    {
      question: 'Do you provide audit services for startups?',
      answer: 'Yes, we provide tailored audit services including statutory, internal, and tax audits. Our process is efficient, cost-effective, and strengthens your compliance framework.',
    },
    {
      question: 'How can you help with company registration and compliance?',
      answer: 'We assist with company incorporation, LLP formation, partnership deed preparation, and all post-incorporation compliance including ROC filings and annual accounts.',
    },
    {
      question: 'What documents do I need to provide for tax filing?',
      answer: 'Generally, we need bank statements, invoices, expense receipts, purchase bills, investment proofs, TDS certificates, and business records. We provide a detailed checklist during consultation.',
    },
    {
      question: 'Do you offer NRI taxation services?',
      answer: 'Yes, we specialize in NRI taxation including income computation from Indian and foreign sources, treaty benefits, TDS on NRI accounts, and compliance with Indian tax laws.',
    },
    {
      question: 'How can I get a Virtual CFO service?',
      answer: 'Our Virtual CFO service provides strategic financial planning, cash flow management, financial analysis, budgeting, and business advisory without the cost of a full-time CFO.',
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <br />
          <br />
          <br />
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ List */}
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border-2 border-neutral-200 hover:border-primary/40 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left transition-all duration-300"
              >
                <span className={`font-bold text-xl pr-6 transition-colors ${openIndex === index ? 'text-primary' : 'text-neutral-900'
                  }`}>
                  {faq.question}
                </span>

                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === index
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-neutral-100 text-neutral-600'
                  }`}>
                  <ChevronDown
                    className={`w-6 h-6 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                      }`}
                  />
                </div>
              </button>

              {openIndex === index && (
                <div className="px-8 pb-6 animate-fadeIn">
                  <div className="pt-4 border-t-2 border-neutral-200">
                    <p className="text-neutral-700 leading-relaxed text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="p-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border border-primary/20">
            <h3 className="text-2xl font-bold text-neutral-900 mb-3">Still have questions?</h3>
            <p className="text-neutral-600 mb-6">Our expert CA team is ready to help you</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 hover:shadow-xl transition-all duration-300">
                <MessageCircle className="w-5 h-5" />
                SCHEDULE CONSULTATION
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-primary font-semibold rounded-lg border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-300">
                <Phone className="w-5 h-5" />
                CALL NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




