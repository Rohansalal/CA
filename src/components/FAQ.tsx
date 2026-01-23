import { ChevronDown, HelpCircle } from 'lucide-react';
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
    <section className="pt-32 pb-24 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-3">Frequently Asked Questions</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-6"></div>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Find quick answers to common questions about our CA services and advisory solutions
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="group">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 bg-white rounded-lg border border-neutral-200 hover:border-accent/40 hover:shadow-md transition-all duration-300 flex items-center justify-between group-hover:bg-neutral-50"
              >
                <span className="text-left font-semibold text-neutral-900 text-base group-hover:text-primary transition-colors">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-accent flex-shrink-0 ml-4 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                    }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/20 border-t-0 rounded-b-lg">
                  <p className="text-neutral-700 leading-relaxed text-sm">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 pt-12 border-t border-neutral-200 text-center">
          <p className="text-neutral-600 mb-4">Still have questions?</p>
          <button className="px-8 py-3 mb-8 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
            SCHEDULE FREE CONSULTATION
          </button>
        </div>
      </div>
    </section>
  );
}
