import { Users, CheckCircle, FileText, Clock, ArrowRight, Shield, Globe, Award, HelpCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function LLPFormation() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleStartRegistration = () => {
    if (isAuthenticated) {
      navigate('/dashboard', { state: { selectedService: 'LLP Formation' } });
    } else {
      navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'LLP Formation' } });
    }
  };

  const features = [
    {
      icon: Users,
      title: 'Dual Advantage',
      description: 'Combines the flexibility of a Partnership with the Limited Liability of a Company.',
    },
    {
      icon: Shield,
      title: 'Limited Liability',
      description: 'Partners are not personally liable for the debts of the LLP. Safe for business.',
    },
    {
      icon: Globe,
      title: 'Separate Legal Entity',
      description: 'Can own assets, sue and be sued in its own name.',
    },
    {
      icon: Award,
      title: 'Low Compliance',
      description: 'No mandatory audit unless turnover > ₹40L or Capital > ₹25L.',
    },
  ];

  const benefits = [
    'No Minimum Capital Requirement',
    'Lower Registration Cost',
    'Dividend Distribution Tax Exempt',
    'No Limit on Number of Partners',
    'Flexible Agreement (LLP Deed)',
    'Credible Structure for Banks'
  ];

  const documents = [
    'PAN Card of Partners',
    'Aadhaar/Voter ID/Passport',
    'Passport Photo',
    'Bank Statement/Mobile Bill',
    'Rent Agreement for Office',
    'NOC from Property Owner',
    'Utility Bill (Electricity/Gas)',
  ];

  const dataRequired = [
    'Proposed LLP Name (2-3 options)',
    'Contribution Ratio',
    'Profit Sharing Ratio',
    'Designated Partners selection',
    'Business Activities',
    'Email & Mobile of Partners',
  ];

  const process = [
    {
      step: 'DSC Application',
      description: 'Obtaining Digital Signature Certificates for all Designated Partners.',
      time: 'Day 1-2',
    },
    {
      step: 'Name Approval',
      description: 'Filing RUN-LLP form for name reservation with MCA.',
      time: 'Day 3-4',
    },
    {
      step: 'Incorporation Filing',
      description: 'Filing Form FiLLiP along with consent and subscription sheet.',
      time: 'Day 5-10',
    },
    {
      step: 'LLP Agreement',
      description: 'Drafting and filing Form 3 (LLP Agreement) within 30 days of incorporation.',
      time: 'Post Corp',
    },
  ];

  const pricing = [
    {
      plan: 'Lean',
      price: '₹7,999',
      features: [
        'Name Approval',
        'DSC (2 Partners)',
        'FiLLiP Filing',
        'Government Fees (Extra)'
      ]
    },
    {
      plan: 'Standard',
      price: '₹12,999',
      desc: 'Recommended',
      features: [
        'Includes Govt Fees (upto 1L Contribution)',
        'LLP Deed Drafting',
        'DSC (2 Partners)',
        'PAN & TAN',
        'Form 3 Filing'
      ]
    },
    {
      plan: 'Premium',
      price: '₹19,999',
      features: [
        'All Standard Features',
        'GST Registration',
        'MSME Registration',
        'LLP Deed Notarization Support',
        'First Year Compliance Guide'
      ]
    }
  ];

  const faqs = [
    {
      q: 'Is audit mandatory for LLP?',
      a: 'No, audit is mandatory only if turnover exceeds ₹40 Lakhs or capital contribution exceeds ₹25 Lakhs.',
    },
    {
      q: 'Can an LLP act as a partner in another LLP?',
      a: 'Yes, an LLP is a separate legal entity and can be a partner in another LLP or a shareholder in a company.',
    },
    {
      q: 'Can NRIs/Foreign Nationals be partners?',
      a: 'Yes, Foreign Nationals and NRIs can be partners in an LLP, provided at least one Designated Partner is a Resident of India.',
    },
    {
      q: 'What is penalty for late filing of Form 3?',
      a: 'The penalty is severe: ₹100 per day till the date of filing. There is no upper limit on this penalty.',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Users className="w-96 h-96 -mr-20 -mt-20" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4 border border-white/10">
              Modern Partnership
            </div>
            <h1 className="text-3xl lg:text-5xl text-white mb-4">LLP Registration</h1>
            <p className="text-xl text-neutral-100 leading-relaxed mb-6">
              Limited Liability Partnership offers the flexibility of partnership with the safety of limited liability. Audit exempt for small businesses.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Clock className="w-5 h-5 text-accent" />
                <span>15-20 Days Process</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Shield className="w-5 h-5 text-accent" />
                <span>Asset Protection</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-neutral-200 hover:shadow-2xl transition-all">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl text-primary mb-3 font-semibold">{feature.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Considerations */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <div>
              <h2 className="text-3xl lg:text-4xl text-primary mb-6">Why Form an LLP?</h2>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Critical Compliance */}
            <div>
              <h2 className="text-3xl lg:text-4xl text-primary mb-6">Critical Compliance</h2>
              <div className="bg-blue-50 p-8 rounded-2xl border border-blue-200">
                <div className="flex items-start gap-4 mb-6">
                  <FileText className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-xl text-blue-900 font-bold mb-2">Form 3 Agreement</h3>
                    <p className="text-blue-800 leading-relaxed">
                      The LLP Agreement (Form 3) must be filed within 30 days of incorporation. Failure to do so attracts a penalty of ₹100 per day with NO UPPER LIMIT.
                    </p>
                  </div>
                </div>
                <p className="text-neutral-600 text-sm bg-white/50 p-4 rounded-lg">
                  We ensure your Deed is notarized and filed on time to avoid these heavy penalties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents & Data */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Documents */}
            <div>
              <h2 className="text-3xl lg:text-4xl text-primary mb-6">Required Documents</h2>
              <p className="text-lg text-neutral-600 mb-6">
                Documents for Partners and Reg Office
              </p>
              <div className="space-y-3">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-start gap-3 bg-neutral-50 p-4 rounded-lg">
                    <FileText className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Data Needed */}
            <div>
              <h2 className="text-3xl lg:text-4xl text-primary mb-6">Information Checklist</h2>
              <p className="text-lg text-neutral-600 mb-6">
                Details for filing Forms
              </p>
              <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-8 text-white">
                <div className="space-y-4">
                  {dataRequired.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                      <span className="text-neutral-100">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-primary mb-4">Incorporation Process</h2>
            <p className="text-lg text-neutral-600">From Name Reservation to Agreement Filing</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {process.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6 hover:shadow-2xl transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-xl text-primary font-semibold">{step.step}</h3>
                      <span className="text-sm text-accent font-medium flex items-center gap-1 flex-shrink-0">
                        <Clock className="w-4 h-4" />
                        {step.time}
                      </span>
                    </div>
                    <p className="text-neutral-600">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Packages</h2>
            <p className="text-lg text-gray-600">Transparent Pricing for LLP Registration</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricing.map((plan, index) => (
              <div key={index} className={`relative bg-white rounded-2xl shadow-lg border ${index === 1 ? 'border-accent shadow-xl scale-105 z-10' : 'border-neutral-200'} p-8 flex flex-col`}>
                {index === 1 && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    {plan.desc}
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-6">{plan.plan}</h3>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  <span className="text-gray-500"> + government fees</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleStartRegistration}
                  className={`w-full py-3 rounded-xl font-bold transition-all ${index === 1
                    ? 'bg-accent text-white hover:bg-accent/90 shadow-lg hover:shadow-accent/30'
                    : 'bg-primary/5 text-primary hover:bg-primary hover:text-white'
                    }`}
                >
                  Start Registration
                </button>
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Upgrade to LLP</h2>
          <p className="text-xl text-blue-100 mb-10">
            Professional, flexible, and secure business structure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleStartRegistration}
              className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
              REGISTER LLP
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
