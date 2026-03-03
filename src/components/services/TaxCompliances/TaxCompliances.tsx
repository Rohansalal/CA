import { FileText, CheckCircle, Clock, ArrowRight, AlertCircle, Calendar, DollarSign, ShoppingCart } from 'lucide-react';

export function TaxCompliances() {
  const itrServices = [
    {
      form: 'ITR-1 (Sahaj)',
      applicableTo: 'Salaried individuals with income up to ₹50 lakhs',
      incomeTypes: ['Salary', 'One house property', 'Other sources (interest, etc.)'],
      fees: '₹500 - ₹1,500',
      timeline: '2-3 days',
    },
    {
      form: 'ITR-2',
      applicableTo: 'Individuals/HUFs not having business/professional income',
      incomeTypes: ['Salary', 'Multiple house properties', 'Capital gains', 'Foreign income'],
      fees: '₹1,500 - ₹3,000',
      timeline: '3-5 days',
    },
    {
      form: 'ITR-3',
      applicableTo: 'Individuals/HUFs having business/professional income',
      incomeTypes: ['Business/Profession', 'Partnership firm income', 'All sources'],
      fees: '₹2,500 - ₹5,000',
      timeline: '5-7 days',
    },
    {
      form: 'ITR-4 (Sugam)',
      applicableTo: 'Presumptive income scheme (44AD/44ADA/44AE)',
      incomeTypes: ['Business (turnover < ₹2 cr)', 'Professional (income < ₹50 lakh)'],
      fees: '₹1,000 - ₹2,500',
      timeline: '3-4 days',
    },
    {
      form: 'ITR-5',
      applicableTo: 'Partnership firms, LLPs, AOPs, BOIs',
      incomeTypes: ['All sources of income for firms and LLPs'],
      fees: '₹3,000 - ₹7,000',
      timeline: '7-10 days',
    },
    {
      form: 'ITR-6',
      applicableTo: 'Companies (other than those claiming exemption u/s 11)',
      incomeTypes: ['All sources of company income'],
      fees: '₹5,000 - ₹15,000',
      timeline: '10-15 days',
    },
  ];

  const taxAuditDetails = {
    applicability: [
      'Business with turnover > ₹1 crore (₹10 cr if 95% digital transactions)',
      'Professional with gross receipts > ₹50 lakhs',
      'Person claiming deduction u/s 10AA, 80-IA series',
      'International transactions requiring transfer pricing audit',
    ],
    forms: [
      {
        form: 'Form 3CA',
        purpose: 'Chartered Accountant\'s report on audit of accounts',
        auditedBy: 'Chartered Accountant',
      },
      {
        form: 'Form 3CB',
        purpose: 'CA report where regular books of accounts not maintained',
        auditedBy: 'Chartered Accountant',
      },
      {
        form: 'Form 3CD',
        purpose: 'Detailed particulars to be furnished (36 clauses)',
        auditedBy: 'Chartered Accountant',
      },
    ],
    dueDate: '30th September (for FY ending 31st March)',
    penalty: 'Minimum ₹1,50,000 (0.5% of turnover/gross receipts)',
  };

  const tdsCompliances = [
    {
      form: '24Q',
      description: 'TDS on Salary',
      frequency: 'Quarterly',
      dueDate: '31st July, 31st Oct, 31st Jan, 31st May',
      applicableTo: 'All employers',
    },
    {
      form: '26Q',
      description: 'TDS on payments other than salary',
      frequency: 'Quarterly',
      dueDate: '31st July, 31st Oct, 31st Jan, 31st May',
      applicableTo: 'Businesses making specified payments',
    },
    {
      form: '27Q',
      description: 'TDS on payments to non-residents',
      frequency: 'Quarterly',
      dueDate: '31st July, 31st Oct, 31st Jan, 31st May',
      applicableTo: 'Entities making foreign payments',
    },
    {
      form: '26QB',
      description: 'TDS on sale of property',
      frequency: 'Within 30 days',
      dueDate: 'Within 30 days of sale',
      applicableTo: 'Property transactions > ₹50 lakhs',
    },
  ];

  const gstCompliances = [
    {
      return: 'GSTR-1',
      description: 'Details of outward supplies',
      frequency: 'Monthly (Turnover > ₹5 cr) / Quarterly (< ₹5 cr)',
      dueDate: '11th of next month / 13th of month after quarter',
      penalty: '₹50 per day (₹20 for nil return), max ₹5,000',
    },
    {
      return: 'GSTR-3B',
      description: 'Summary return with tax payment',
      frequency: 'Monthly (Turnover > ₹5 cr) / Quarterly (< ₹5 cr)',
      dueDate: '20th of next month / 22nd/24th of month after quarter',
      penalty: '₹50 per day (₹20 for nil return), max ₹5,000',
    },
    {
      return: 'GSTR-9',
      description: 'Annual Return',
      frequency: 'Annual',
      dueDate: '31st December of next FY',
      penalty: '₹100 per day, max 0.25% of turnover',
    },
    {
      return: 'GSTR-9C',
      description: 'Reconciliation statement with audit',
      frequency: 'Annual (if turnover > ₹5 cr)',
      dueDate: '31st December of next FY',
      penalty: 'As per GSTR-9',
    },
  ];

  const advanceTax = {
    description: 'Tax paid in advance in installments during the year on estimated income',
    applicability: [
      'Tax liability > ₹10,000 in a financial year',
      'Applies to all taxpayers (salaried, business, professionals)',
      'Senior citizens (60+ years) with no business income are exempt',
    ],
    dueDeadlines: [
      { installment: '1st Installment', dueDate: 'On or before 15th June', percentage: '15% of tax' },
      { installment: '2nd Installment', dueDate: 'On or before 15th September', percentage: '45% of tax' },
      { installment: '3rd Installment', dueDate: 'On or before 15th December', percentage: '75% of tax' },
      { installment: '4th Installment', dueDate: 'On or before 15th March', percentage: '100% of tax' },
    ],
    interest: 'Interest @ 1% per month for shortfall in payment (Section 234B & 234C)',
  };

  const eInvoicing = {
    description: 'Mandatory electronic invoicing for B2B transactions to be reported to Invoice Registration Portal (IRP)',
    applicability: [
      'Businesses with turnover > ₹5 crore (from 1st Aug 2023)',
      'Applicable for B2B supplies, exports, SEZ supplies',
      'Not applicable for B2C supplies',
    ],
    process: [
      'Generate invoice with mandatory fields',
      'Upload to IRP (Invoice Registration Portal)',
      'Receive IRN (Invoice Reference Number) & QR code',
      'Issue invoice with IRN to customer',
      'Auto-population in GST returns',
    ],
    benefits: [
      'Reduced errors and manual data entry',
      'Real-time tracking on IRP',
      'Auto-population of GSTR-1',
      'Prevents fake invoicing',
      'Faster input tax credit',
    ],
  };

  const eWayBill = {
    description: 'Electronic documentation required for movement of goods worth more than ₹50,000',
    whenRequired: [
      'Inter-state movement of goods > ₹50,000',
      'Intra-state movement > threshold (varies by state, typically ₹50,000)',
      'Applies even if goods moved for non-supply reasons',
    ],
    validity: [
      { distance: 'Up to 200 km', validity: '1 day' },
      { distance: 'Every additional 200 km', validity: '+ 1 day' },
      { distance: 'Over-dimensional cargo', validity: 'As per notification' },
    ],
    exemptions: [
      'Goods exempted from GST',
      'Transport by non-motorized vehicle',
      'Specified goods like LPG, certain food items',
      'Within same state if below state threshold',
    ],
  };

  const complianceCalendar = [
    { date: '10th', compliance: 'GSTR-7 (TDS return)' },
    { date: '11th', compliance: 'GSTR-1 (Monthly)' },
    { date: '13th', compliance: 'GSTR-6 (ISD return)' },
    { date: '20th', compliance: 'GSTR-3B (Monthly)' },
    { date: '25th', compliance: 'GSTR-5 (Non-resident)' },
    { date: '31st', compliance: 'TDS Return (Quarterly)' },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4">
              Tax & Financial Compliances
            </div>
            <h1 className="text-3xl lg:text-5xl text-white mb-4">Tax Compliance Services</h1>
            <p className="text-xl text-neutral-100 leading-relaxed mb-6">
              Complete tax filing and compliance solutions including ITR, GST returns, TDS, tax audit, advance tax, e-invoicing, and e-way bills. Stay compliant and avoid penalties.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>Timely Filing Guaranteed</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>Expert CA Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ITR Filing Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-primary mb-4">Income Tax Return (ITR) Filing</h2>
            <p className="text-lg text-neutral-600">Choose the right ITR form based on your income sources</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itrServices.map((itr, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden hover:shadow-2xl transition-all"
              >
                <div className="bg-gradient-to-r from-primary to-accent p-4 text-white">
                  <h3 className="text-xl font-bold">{itr.form}</h3>
                  <p className="text-sm text-neutral-100 mt-1">{itr.applicableTo}</p>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-neutral-500 mb-2 uppercase">Income Types:</h4>
                    <div className="space-y-2">
                      {itr.incomeTypes.map((type, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-neutral-700">{type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-neutral-200">
                    <div>
                      <div className="text-xs text-neutral-500">Professional Fees</div>
                      <div className="text-lg font-bold text-accent">{itr.fees}</div>
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500">Timeline</div>
                      <div className="text-sm font-semibold text-neutral-800 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {itr.timeline}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 px-2 bg-white border-2 border-gray-200 text-gray-700 font-bold text-[13px] rounded-xl hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 shadow-sm group">
                      <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      Add to Cart
                    </button>
                    <button className="flex-1 py-3 px-2 bg-blue-600 text-white font-bold text-[13px] rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5">
                      File Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ITR Due Dates */}
          <div className="mt-12 bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-2">ITR Filing Due Dates (AY 2025-26)</h3>
                <div className="space-y-2 text-sm text-red-800">
                  <p>• <strong>Individuals/HUF/AOP/BOI (non-audit):</strong> 31st July 2025</p>
                  <p>• <strong>Businesses requiring audit:</strong> 31st October 2025</p>
                  <p>• <strong>Revised Return:</strong> Within 31st December 2025 or before assessment completion</p>
                  <p>• <strong>Late filing penalty:</strong> ₹5,000 (₹1,000 if income {"<"} ₹5 lakhs)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Audit */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-primary mb-4">Tax Audit (Section 44AB)</h2>
            <p className="text-lg text-neutral-600">Mandatory audit for businesses exceeding prescribed limits</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-neutral-200">
              <h3 className="text-xl text-primary mb-6 font-semibold">Who Needs Tax Audit?</h3>
              <div className="space-y-3">
                {taxAuditDetails.applicability.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-accent/5 rounded-lg border border-accent/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-primary">Due Date:</span>
                  <span className="text-sm font-bold text-accent">{taxAuditDetails.dueDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-primary">Penalty:</span>
                  <span className="text-sm font-bold text-red-600">{taxAuditDetails.penalty}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-neutral-200">
              <h3 className="text-xl text-primary mb-6 font-semibold">Tax Audit Forms</h3>
              <div className="space-y-4">
                {taxAuditDetails.forms.map((form, index) => (
                  <div key={index} className="p-4 bg-neutral-50 rounded-lg">
                    <div className="flex items-start gap-3 mb-2">
                      <FileText className="w-5 h-5 text-accent flex-shrink-0" />
                      <div>
                        <h4 className="text-lg text-primary font-semibold">{form.form}</h4>
                        <p className="text-sm text-neutral-600 mt-1">{form.purpose}</p>
                        <div className="text-xs text-neutral-500 mt-2">By: {form.auditedBy}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TDS Compliances */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-primary mb-4">TDS Returns & Compliance</h2>
            <p className="text-lg text-neutral-600">Quarterly TDS return filing for all deductors</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tdsCompliances.map((tds, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6 hover:shadow-2xl transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl text-primary mb-2 font-semibold">{tds.form}</h3>
                <p className="text-sm text-neutral-600 mb-4">{tds.description}</p>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-neutral-500">Frequency:</span>
                    <div className="text-neutral-800 font-medium">{tds.frequency}</div>
                  </div>
                  <div>
                    <span className="text-neutral-500">Due Date:</span>
                    <div className="text-accent font-medium">{tds.dueDate}</div>
                  </div>
                  <div>
                    <span className="text-neutral-500">Applicable To:</span>
                    <div className="text-neutral-700 text-xs">{tds.applicableTo}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GST Returns */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-primary mb-4">GST Return Filing</h2>
            <p className="text-lg text-neutral-600">Monthly, quarterly, and annual GST compliance</p>
          </div>
          <div className="space-y-4 max-w-5xl mx-auto">
            {gstCompliances.map((gst, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6 hover:shadow-2xl transition-all"
              >
                <div className="grid md:grid-cols-5 gap-4 items-center">
                  <div>
                    <h3 className="text-xl text-primary font-bold">{gst.return}</h3>
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-sm text-neutral-600">{gst.description}</div>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500">Due Date</div>
                    <div className="text-sm font-semibold text-accent flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {gst.dueDate}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500">Late Fee</div>
                    <div className="text-sm font-semibold text-red-600">{gst.penalty}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advance Tax */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-primary mb-4">Advance Tax Payment</h2>
            <p className="text-lg text-neutral-600">{advanceTax.description}</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
                <h3 className="text-2xl mb-4">Installment Schedule (FY 2025-26)</h3>
                <div className="space-y-2 text-sm">
                  {advanceTax.applicability.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-100">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {advanceTax.dueDeadlines.map((deadline, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                      <div>
                        <div className="font-semibold text-neutral-800">{deadline.installment}</div>
                        <div className="text-sm text-neutral-600">{deadline.percentage}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-accent font-bold">{deadline.dueDate}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-red-800">
                      <strong>Interest on Default:</strong> {advanceTax.interest}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* E-Invoicing & E-Way Bill */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* E-Invoicing */}
            <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-8">
              <h2 className="text-2xl text-primary mb-4">E-Invoicing</h2>
              <p className="text-neutral-600 mb-6">{eInvoicing.description}</p>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-primary mb-3 uppercase">Applicability:</h3>
                <div className="space-y-2">
                  {eInvoicing.applicability.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-primary mb-3 uppercase">Process Steps:</h3>
                <div className="space-y-3">
                  {eInvoicing.process.map((step, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-accent">{idx + 1}</span>
                      </div>
                      <span className="text-sm text-neutral-700">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
                <h4 className="text-sm font-semibold text-primary mb-2">Key Benefits:</h4>
                <div className="space-y-1">
                  {eInvoicing.benefits.slice(0, 3).map((benefit, idx) => (
                    <div key={idx} className="text-xs text-neutral-700">• {benefit}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* E-Way Bill */}
            <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-8">
              <h2 className="text-2xl text-primary mb-4">E-Way Bill</h2>
              <p className="text-neutral-600 mb-6">{eWayBill.description}</p>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-primary mb-3 uppercase">When Required:</h3>
                <div className="space-y-2">
                  {eWayBill.whenRequired.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-primary mb-3 uppercase">Validity Period:</h3>
                <div className="space-y-2">
                  {eWayBill.validity.map((item, idx) => (
                    <div key={idx} className="flex justify-between p-3 bg-neutral-50 rounded-lg">
                      <span className="text-sm text-neutral-700">{item.distance}</span>
                      <span className="text-sm font-semibold text-accent">{item.validity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="text-sm font-semibold text-green-900 mb-2">Exemptions:</h4>
                <div className="space-y-1">
                  {eWayBill.exemptions.slice(0, 3).map((exemption, idx) => (
                    <div key={idx} className="text-xs text-green-800">• {exemption}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Compliance Calendar */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-primary mb-4">Monthly Compliance Calendar</h2>
            <p className="text-lg text-neutral-600">Never miss a due date with our quick reference guide</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {complianceCalendar.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-white font-bold">
                    {item.date}
                  </div>
                  <div className="text-sm text-neutral-700 font-medium">{item.compliance}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl text-white mb-4">Stay Tax Compliant, Avoid Penalties</h2>
          <p className="text-xl text-neutral-100 mb-8">
            Let our CA experts handle all your tax filings and compliances
          </p>
          <button className="px-8 py-4 bg-accent text-white font-bold tracking-wide rounded-xl shadow-lg shadow-accent/20 hover:bg-accent/90 transition-all hover:shadow-xl hover:shadow-accent/40 transform hover:-translate-y-1 inline-flex items-center gap-2">
            GET COMPLIANCE SUPPORT NOW
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
