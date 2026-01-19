import { Users, CheckCircle, FileText, Clock, ArrowRight, Shield, TrendingUp, AlertCircle, Briefcase } from 'lucide-react';

export function LLPFormation() {
  const benefits = [
    {
      icon: Shield,
      title: 'Limited Liability Protection',
      description: 'Partners are not personally liable for LLP debts beyond their contribution',
    },
    {
      icon: TrendingUp,
      title: 'Separate Legal Entity',
      description: 'LLP has perpetual succession and can own property in its own name',
    },
    {
      icon: Users,
      title: 'Flexible Management',
      description: 'No mandatory audit if turnover < ₹40L and capital < ₹25L',
    },
    {
      icon: Briefcase,
      title: 'Lower Compliance',
      description: 'Simpler compliance compared to Private Limited Companies',
    },
  ];

  const documentsRequired = [
    'PAN Card of all partners (mandatory)',
    'Aadhaar Card of all partners',
    'Passport size photographs',
    'Digital Signature Certificate (DSC)',
    'Registered office address proof (rent agreement/sale deed)',
    'Utility bill (electricity/water) - not older than 2 months',
    'NOC from property owner',
    'Bank statement/passbook of partners',
  ];

  const registrationProcess = [
    {
      step: 'DSC & DIN Acquisition',
      description: 'Obtain Digital Signature Certificate and Director Identification Number for designated partners',
      duration: '2-3 days',
    },
    {
      step: 'Name Reservation',
      description: 'File RUN-LLP form for name approval with MCA. Propose 2-3 unique names',
      duration: '1-2 days',
    },
    {
      step: 'LLP Agreement Drafting',
      description: 'Prepare detailed LLP Agreement defining rights, duties, profit sharing, etc.',
      duration: '2-3 days',
    },
    {
      step: 'FiLLiP Form Filing',
      description: 'File Form FiLLiP (incorporation form) with MCA along with all documents',
      duration: '3-5 days',
    },
    {
      step: 'Certificate of Incorporation',
      description: 'MCA verifies and issues Certificate of Incorporation with LLPIN',
      duration: '1-2 days',
    },
    {
      step: 'PAN & TAN Allotment',
      description: 'Automatic PAN and TAN generation post incorporation',
      duration: '1-2 days',
    },
    {
      step: 'LLP Agreement Filing',
      description: 'File Form 3 within 30 days of incorporation with LLP Agreement',
      duration: '1 day',
    },
  ];

  const comparisonTable = [
    {
      parameter: 'Minimum Partners',
      llp: '2 (individuals or bodies corporate)',
      privateLtd: '2 Directors, 2 Shareholders',
      partnership: '2 Partners',
    },
    {
      parameter: 'Maximum Partners',
      llp: 'No limit',
      privateLtd: '200 Members max',
      partnership: '50 Partners max',
    },
    {
      parameter: 'Liability',
      llp: 'Limited to contribution',
      privateLtd: 'Limited to share capital',
      partnership: 'Unlimited personal liability',
    },
    {
      parameter: 'Compliance',
      llp: 'Form 8 & Form 11 annually',
      privateLtd: 'AOC-4, MGT-7, Annual Audit',
      partnership: 'Minimal',
    },
    {
      parameter: 'Audit Required',
      llp: 'Only if turnover > ₹40L or capital > ₹25L',
      privateLtd: 'Mandatory every year',
      partnership: 'No mandatory audit',
    },
    {
      parameter: 'Foreign Investment',
      llp: 'Allowed in most sectors (with conditions)',
      privateLtd: 'Fully allowed',
      partnership: 'Not allowed',
    },
  ];

  const annualCompliances = [
    {
      form: 'Form 8',
      purpose: 'Statement of Account & Solvency',
      dueDate: '30th May (within 60 days of FY end)',
      penalty: '₹100/day (max ₹5 lakhs)',
    },
    {
      form: 'Form 11',
      purpose: 'Annual Return',
      dueDate: '30th May (within 60 days of FY end)',
      penalty: '₹100/day (max ₹5 lakhs)',
    },
    {
      form: 'Income Tax Return',
      purpose: 'ITR filing for LLP',
      dueDate: '31st July (or 31st Oct if audit)',
      penalty: 'As per IT Act',
    },
  ];

  const postFormationServices = [
    'GST Registration',
    'Current Account Opening',
    'MSME/Udyam Registration',
    'Professional Tax Registration',
    'Shops & Establishment License',
    'Import Export Code (IEC)',
    'FSSAI License (if applicable)',
    'Trademark Registration',
  ];

  const faqs = [
    {
      q: 'What is the minimum capital required for LLP?',
      a: 'There is no minimum capital requirement for LLP registration. You can start with any amount.',
    },
    {
      q: 'Can a foreign national be a partner in Indian LLP?',
      a: 'Yes, foreign nationals and foreign LLPs can be partners in Indian LLP in sectors where 100% FDI is allowed under automatic route.',
    },
    {
      q: 'Is audit mandatory for LLP?',
      a: 'No. Audit is mandatory only if turnover exceeds ₹40 lakhs OR capital contribution exceeds ₹25 lakhs in a financial year.',
    },
    {
      q: 'Can LLP be converted to Private Limited Company?',
      a: 'Yes, LLP can be converted into a Private Limited Company by filing Form 18 with MCA along with required documents.',
    },
    {
      q: 'What is the difference between Partner and Designated Partner?',
      a: 'All LLPs must have at least 2 Designated Partners who are responsible for compliance. Other partners may be regular partners without compliance responsibilities.',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4">
              Business Registration
            </div>
            <h1 className="text-3xl lg:text-5xl text-white mb-4">LLP Formation & Registration</h1>
            <p className="text-xl text-neutral-100 leading-relaxed mb-6">
              Register your Limited Liability Partnership (LLP) with complete legal compliance. Ideal for professionals, consultants, and service providers seeking flexibility with limited liability.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Clock className="w-5 h-5 text-accent" />
                <span>7-10 Days Completion</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>100% Online Process</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all border border-neutral-200 group hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent group-hover:scale-110 transition-all">
                  <benefit.icon className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-lg text-primary mb-2 font-semibold">{benefit.title}</h3>
                <p className="text-sm text-neutral-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents Required */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl lg:text-4xl text-primary mb-6">Documents Required</h2>
              <p className="text-lg text-neutral-600 mb-8">
                Keep these documents ready for a smooth and quick LLP registration process
              </p>
              <div className="space-y-3">
                {documentsRequired.map((doc, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                    <FileText className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white">
              <h3 className="text-2xl text-white mb-6">Government Fees & Charges</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="text-neutral-100">MCA Registration Fees</span>
                  <span className="font-semibold">₹500</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="text-neutral-100">Stamp Duty (varies by state)</span>
                  <span className="font-semibold">₹2,000 - ₹5,000</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="text-neutral-100">DSC (per partner)</span>
                  <span className="font-semibold">₹1,000</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="text-neutral-100">Professional Fees</span>
                  <span className="font-semibold">₹6,000 - ₹10,000</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-white font-semibold text-lg">Total Approx.</span>
                  <span className="text-accent font-bold text-2xl">₹10,000 - ₹18,000</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white/10 rounded-lg">
                <div className="text-sm text-neutral-100">
                  * Final amount varies based on state and capital contribution
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Process */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-primary mb-4">LLP Registration Process</h2>
            <p className="text-lg text-neutral-600">Step-by-step process from application to incorporation</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {registrationProcess.map((process, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden hover:shadow-2xl transition-all"
              >
                <div className="flex items-start gap-6 p-6">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-xl text-primary font-semibold">{process.step}</h3>
                      <span className="text-sm text-accent font-medium flex items-center gap-1 flex-shrink-0">
                        <Clock className="w-4 h-4" />
                        {process.duration}
                      </span>
                    </div>
                    <p className="text-neutral-600">{process.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-primary mb-4">LLP vs Other Business Structures</h2>
            <p className="text-lg text-neutral-600">Compare and choose the right structure for your business</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Parameter</th>
                    <th className="px-6 py-4 text-left">LLP</th>
                    <th className="px-6 py-4 text-left">Private Limited</th>
                    <th className="px-6 py-4 text-left">Partnership Firm</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {comparisonTable.map((row, index) => (
                    <tr key={index} className="hover:bg-neutral-50">
                      <td className="px-6 py-4 font-semibold text-neutral-700">{row.parameter}</td>
                      <td className="px-6 py-4 text-neutral-600">{row.llp}</td>
                      <td className="px-6 py-4 text-neutral-600">{row.privateLtd}</td>
                      <td className="px-6 py-4 text-neutral-600">{row.partnership}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Annual Compliance */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-primary mb-4">Annual Compliance for LLP</h2>
            <p className="text-lg text-neutral-600">Stay compliant with annual filing requirements</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {annualCompliances.map((compliance, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6 hover:shadow-2xl transition-all"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl text-primary mb-2 font-semibold">{compliance.form}</h3>
                <p className="text-sm text-neutral-600 mb-4">{compliance.purpose}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Due Date:</span>
                    <span className="text-neutral-800 font-medium">{compliance.dueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Late Fee:</span>
                    <span className="text-red-600 font-medium">{compliance.penalty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Post Formation Services */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-primary mb-4">Post-Formation Services</h2>
            <p className="text-lg text-neutral-600">Additional registrations and licenses for your LLP</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {postFormationServices.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-neutral-200 group hover:-translate-y-1"
              >
                <CheckCircle className="w-8 h-8 text-accent mb-3" />
                <div className="text-neutral-800 font-medium">{service}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-primary mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="bg-white rounded-xl shadow-md border border-neutral-200 overflow-hidden group"
              >
                <summary className="px-6 py-4 cursor-pointer font-medium text-primary hover:bg-neutral-50 transition-colors list-none flex items-center justify-between">
                  <span>{faq.q}</span>
                  <ArrowRight className="w-5 h-5 transform group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-6 pb-4 text-neutral-700 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl text-white mb-4">Ready to Register Your LLP?</h2>
          <p className="text-xl text-neutral-100 mb-8">
            Get your LLP registered in 7-10 days with complete documentation support
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
              START LLP REGISTRATION
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-neutral-100 transition-all">
              TALK TO EXPERT
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
