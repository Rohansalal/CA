import { CreditCard, CheckCircle, FileText, Clock, ArrowRight, AlertCircle, Building, Globe } from 'lucide-react';

export function TaxRegistrations() {
  const registrations = [
    {
      type: 'PAN (Permanent Account Number)',
      icon: CreditCard,
      description: 'Mandatory 10-digit alphanumeric identifier for all tax-related transactions',
      whoNeeds: [
        'All individuals with taxable income',
        'All business entities',
        'Required for bank account opening',
        'Mandatory for transactions above ₹50,000',
        'Property purchase/sale',
        'Vehicle registration',
      ],
      documents: {
        individual: [
          'Proof of identity (Aadhaar/Passport/Voter ID)',
          'Proof of address (Aadhaar/Passport/Utility Bill)',
          'Proof of date of birth',
          'Passport size photograph',
        ],
        business: [
          'Certificate of Incorporation/Registration',
          'PAN of Partners/Directors',
          'Address proof of business',
          'Identity proof of authorized signatory',
        ],
      },
      process: [
        'Fill Form 49A (Individual/HUF) or 49AA (Companies/Firms)',
        'Submit required documents',
        'Pay application fee (₹93 for Indian address, ₹864 for foreign)',
        'Application processed by NSDL/UTI',
        'PAN card dispatched to registered address',
      ],
      timeline: '15-20 days',
      fees: '₹93 (India) / ₹864 (Abroad)',
      color: 'from-blue-500 to-blue-600',
      penalties: [
        'Late filing of ITR: ₹5,000 (₹1,000 if income < ₹5 lakh)',
        'Failure to quote PAN: Transaction may be rejected or higher TDS',
      ],
    },
    {
      type: 'GST Registration',
      icon: Building,
      description: 'Goods and Services Tax registration for businesses involved in supply of goods or services',
      whoNeeds: [
        'Businesses with turnover > ₹40 lakhs (₹20L for special states)',
        'E-commerce operators and sellers',
        'Inter-state suppliers (any turnover)',
        'Casual taxable persons',
        'Input service distributors',
        'Reverse charge mechanism applicable businesses',
      ],
      documents: {
        individual: [
          'PAN of the business/proprietor',
          'Aadhaar of proprietor/partners/directors',
          'Photograph of proprietor/partners',
          'Address proof of principal place of business',
          'Bank account statement/cancelled cheque',
          'Digital Signature Certificate (for companies)',
        ],
        business: [
          'Certificate of Incorporation/Registration',
          'MoA/AoA for companies',
          'Partnership deed for firms',
          'Proof of appointment of authorized signatory',
          'Electricity bill/rent agreement of business premises',
        ],
      },
      process: [
        'Submit online application on GST portal (Form GST REG-01)',
        'Upload all required documents',
        'Receive Application Reference Number (ARN)',
        'Department verification (may ask for clarification)',
        'GSTIN issued (15-digit unique number)',
      ],
      timeline: '3-7 working days',
      fees: 'No government fee',
      color: 'from-green-500 to-green-600',
      penalties: [
        'Late registration: ₹10,000 or 10% of tax due (whichever is higher)',
        'Non-registration despite liability: Penalty + interest',
      ],
      additionalInfo: {
        turnoverLimits: {
          'Goods': '₹40 lakhs (₹20L for special category states)',
          'Services': '₹20 lakhs (₹10L for special category states)',
          'E-commerce': 'Registration mandatory irrespective of turnover',
        },
      },
    },
    {
      type: 'TAN (Tax Deduction Account Number)',
      icon: Globe,
      description: '10-digit alphanumeric number for entities required to deduct or collect tax at source',
      whoNeeds: [
        'All entities required to deduct TDS',
        'All entities required to collect TCS',
        'Employers deducting tax on salaries',
        'Businesses making specified payments requiring TDS',
        'Mandatory for filing TDS/TCS returns',
      ],
      documents: {
        individual: [
          'Form 49B duly filled',
          'PAN of the deductor',
          'Proof of identity of authorized signatory',
          'Address proof of deductor',
        ],
        business: [
          'PAN of the entity',
          'Certificate of Incorporation/Registration',
          'Address proof of registered office',
          'Identity proof of authorized signatory',
          'Board resolution for authorized signatory',
        ],
      },
      process: [
        'Fill Form 49B online on NSDL portal',
        'Upload required documents',
        'Pay application fee (₹65)',
        'Receive acknowledgment number',
        'TAN allotted and certificate dispatched',
      ],
      timeline: '10-15 days',
      fees: '₹65',
      color: 'from-purple-500 to-purple-600',
      penalties: [
        'Late filing of TDS return: ₹200 per day of delay',
        'Non-deduction of TDS: 100% of tax + interest',
        'Late deduction: Interest @ 1% per month',
      ],
      additionalInfo: {
        tdsApplicable: [
          'Salary payments',
          'Interest payments > ₹40,000 (₹50,000 for senior citizens)',
          'Rent > ₹2.4 lakhs per annum',
          'Professional/technical fees > ₹30,000',
          'Commission/brokerage > ₹15,000',
          'Contractor payments > ₹30,000 (single) or ₹1 lakh (aggregate)',
        ],
      },
    },
  ];

  const comparisonTable = [
    { feature: 'Applicable To', pan: 'All taxpayers', gst: 'Businesses above threshold', tan: 'TDS/TCS deductors' },
    { feature: 'Mandatory For', pan: 'Income above basic exemption', gst: 'Turnover limits exceeded', tan: 'TDS obligations' },
    { feature: 'Format', pan: 'ABCDE1234F', gst: '29ABCDE1234F1Z5', tan: 'ABCD12345E' },
    { feature: 'Application Fee', pan: '₹93/₹864', gst: 'Free', tan: '₹65' },
    { feature: 'Processing Time', pan: '15-20 days', gst: '3-7 days', tan: '10-15 days' },
  ];

  const postRegistrationSteps = [
    {
      title: 'Display Requirements',
      items: [
        'Display GSTIN prominently at business premises',
        'Mention PAN on all business documents',
        'Include TAN in all TDS/TCS certificates',
      ],
    },
    {
      title: 'Compliance Setup',
      items: [
        'Setup accounting software for GST compliance',
        'Configure TDS calculation and payment systems',
        'Maintain proper books of accounts',
      ],
    },
    {
      title: 'Regular Filings',
      items: [
        'File GSTR-1 and GSTR-3B monthly/quarterly',
        'File TDS returns quarterly (Form 24Q, 26Q, 27Q)',
        'File annual ITR using PAN',
      ],
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4">
              Tax Registrations
            </div>
            <h1 className="text-3xl lg:text-5xl text-white mb-4">PAN, GST & TAN Registration Services</h1>
            <p className="text-xl text-neutral-100 leading-relaxed mb-6">
              Essential tax registrations for individuals and businesses. Get your PAN, GST, and TAN with complete documentation support and expert guidance.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>100% Online Process</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>Expert Documentation Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Comparison */}
      <section className="py-12 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Feature</th>
                    <th className="px-6 py-4 text-left">PAN</th>
                    <th className="px-6 py-4 text-left">GST</th>
                    <th className="px-6 py-4 text-left">TAN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {comparisonTable.map((row, index) => (
                    <tr key={index} className="hover:bg-neutral-50">
                      <td className="px-6 py-4 font-semibold text-neutral-700">{row.feature}</td>
                      <td className="px-6 py-4 text-neutral-600">{row.pan}</td>
                      <td className="px-6 py-4 text-neutral-600">{row.gst}</td>
                      <td className="px-6 py-4 text-neutral-600">{row.tan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Registration Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {registrations.map((reg, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-neutral-200"
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${reg.color} p-6 lg:p-8 text-white`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <reg.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl lg:text-3xl text-white mb-2">{reg.type}</h2>
                        <p className="text-white/90">{reg.description}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm opacity-90">Timeline</div>
                      <div className="text-xl font-bold flex items-center gap-1">
                        <Clock className="w-5 h-5" />
                        {reg.timeline}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                  {/* Quick Info */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-neutral-200">
                    <div>
                      <div className="text-sm font-semibold text-primary mb-1">Application Fees</div>
                      <div className="text-2xl text-accent font-bold">{reg.fees}</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-primary mb-1">Processing Authority</div>
                      <div className="text-neutral-700">
                        {reg.type.includes('PAN') || reg.type.includes('TAN') ? 'Income Tax Department (NSDL/UTI)' : 'GST Network (GSTN)'}
                      </div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Who Needs It */}
                    <div>
                      <h3 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wide">
                        Who Needs This?
                      </h3>
                      <div className="space-y-2">
                        {reg.whoNeeds.map((need, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-neutral-700">{need}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Documents */}
                    <div>
                      <h3 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wide">
                        Documents Required
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <div className="text-xs font-semibold text-neutral-500 mb-2">For Individuals:</div>
                          <div className="space-y-2">
                            {reg.documents.individual.map((doc, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <FileText className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-neutral-700">{doc}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-neutral-500 mb-2">For Businesses:</div>
                          <div className="space-y-2">
                            {reg.documents.business.slice(0, 3).map((doc, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <FileText className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-neutral-700">{doc}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Process */}
                    <div>
                      <h3 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wide">
                        Application Process
                      </h3>
                      <div className="space-y-3">
                        {reg.process.map((step, idx) => (
                          <div key={idx} className="flex gap-3">
                            <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold text-accent">{idx + 1}</span>
                            </div>
                            <span className="text-sm text-neutral-700">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Penalties */}
                  <div className="mt-8 p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-red-900 mb-2">Penalties for Non-Compliance:</div>
                        <div className="space-y-1">
                          {reg.penalties.map((penalty, idx) => (
                            <div key={idx} className="text-sm text-red-800">• {penalty}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info for GST/TAN */}
                  {reg.additionalInfo && (
                    <div className="mt-6 p-6 bg-accent/5 rounded-lg border border-accent/20">
                      {reg.additionalInfo.turnoverLimits && (
                        <div>
                          <h4 className="text-sm font-semibold text-primary mb-3">GST Registration Thresholds:</h4>
                          <div className="grid md:grid-cols-3 gap-4">
                            {Object.entries(reg.additionalInfo.turnoverLimits).map(([key, value], idx) => (
                              <div key={idx}>
                                <div className="text-xs text-neutral-500">{key}</div>
                                <div className="text-sm text-neutral-800 font-medium">{value as string}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {reg.additionalInfo.tdsApplicable && (
                        <div>
                          <h4 className="text-sm font-semibold text-primary mb-3">Common TDS Applicable Payments:</h4>
                          <div className="grid md:grid-cols-2 gap-2">
                            {reg.additionalInfo.tdsApplicable.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-neutral-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all hover:shadow-lg">
                      Apply Now
                    </button>
                    <button className="px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all">
                      Get Expert Consultation
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Post-Registration Steps */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-primary mb-4">After Registration - What's Next?</h2>
            <p className="text-lg text-neutral-600">Important steps to follow post-registration</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {postRegistrationSteps.map((step, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg border border-neutral-200 hover:shadow-2xl transition-all"
              >
                <h3 className="text-xl text-primary mb-4 font-semibold">{step.title}</h3>
                <div className="space-y-3">
                  {step.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl text-white mb-4">Need Help with Tax Registrations?</h2>
          <p className="text-xl text-neutral-100 mb-8">
            Our CA experts will handle your PAN, GST, and TAN applications with complete documentation support
          </p>
          <button className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center gap-2">
            GET STARTED NOW
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}





