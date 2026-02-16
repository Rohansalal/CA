import { Users, CheckCircle, FileText, Clock, ArrowRight, Shield, Globe, Award, HelpCircle, AlertCircle, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { ServicePricing } from '../ServicePricing';

export function LLPFormation() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleStartRegistration = () => {
    if (isAuthenticated) {
      navigate('/dashboard', { state: { selectedServiceSlug: 'llp-formation' } });
    } else {
      navigate('/login', { state: { returnTo: '/dashboard', selectedServiceSlug: 'llp-formation' } });
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

      {/* Benefits & Critical Compliance */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">Why Form an LLP?</h2>
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

              <div className="bg-blue-50 p-8 rounded-2xl border border-blue-200 mb-6">
                <div className="flex items-start gap-4 mb-6">
                  <FileText className="w-8 h-8 text-blue-600 flex-shrink-0" />
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

              <div className="bg-orange-50 p-8 rounded-2xl border border-orange-200">
                <div className="flex items-start gap-4 mb-6">
                  <AlertCircle className="w-8 h-8 text-orange-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl text-orange-900 font-bold mb-2">Audit Rules</h3>
                    <p className="text-orange-800 leading-relaxed">
                      Audit is only mandatory if turnover {'>'} ₹40 Lakhs or Capital {'>'} ₹25 Lakhs.
                    </p>
                  </div>
                </div>
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServicePricing
            serviceSlug="llp-registration"
            serviceName="LLP Registration"
            fallbackContent={
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-200">
                <div className="grid md:grid-cols-2">
                  {/* Left Side - The Offer (White) */}
                  <div className="p-8 md:p-12 bg-white flex flex-col justify-center border-b md:border-b-0 md:border-r border-neutral-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Complete LLP Setup</h3>
                    <div className="space-y-4">
                      {[
                        'Name Approval (RUN-LLP)',
                        'DSC (2 Designated Partners)',
                        'LLP Deed Drafting',
                        'Incorporation (FiLLiP)',
                        'PAN & TAN Allotment',
                        'Form 3 Filing'
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors border border-transparent hover:border-neutral-100">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-primary" />
                          </div>
                          <span className="text-gray-700 font-medium text-lg">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 pt-8 border-t border-neutral-100">
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>Delivered in 15-20 business days</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - The Price (Unique Premium Design) */}
                  <div className="relative p-8 md:p-14 bg-gradient-to-b from-[#1e3a8a] to-[#172554] text-white flex flex-col justify-center items-center text-center overflow-hidden">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

                    <div className="relative z-10 w-full max-w-sm mx-auto">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-xs font-bold tracking-wider uppercase mb-8 border border-white/20 backdrop-blur-md shadow-lg">
                        <Award className="w-4 h-4 text-yellow-400" />
                        Most Popular Choice
                      </div>

                      <div className="relative mb-10">
                        <div className="relative flex flex-col items-center">
                          <span className="text-lg text-blue-200 font-medium mb-3 tracking-wide">Complete Incorporation</span>
                          <div className="flex items-start justify-center text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg">
                            <span className="text-3xl mt-2 opacity-80 font-semibold mr-2">₹</span>
                            12,999
                          </div>
                          <div className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-emerald-100 bg-emerald-500/20 px-4 py-1.5 rounded-full border border-emerald-500/30">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                            <span>Incl. Govt Fees (Capital &lt; 1L)</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleStartRegistration}
                        className="group relative w-full bg-white text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:shadow-white/20 transform hover:-translate-y-1 overflow-hidden"
                      >
                        <div className="flex items-center justify-center gap-3 relative z-10">
                          Register LLP Now
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-orange-500" />
                        </div>
                      </button>

                      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-blue-200/90 font-medium">
                        <div className="flex items-center gap-1.5">
                          <Shield className="w-4 h-4 text-blue-300" />
                          Secure & Confidential
                        </div>
                        <div className="hidden sm:block w-1 h-1 bg-blue-500 rounded-full" />
                        <div className="flex items-center gap-1.5">
                          <Wallet className="w-4 h-4 text-blue-300" />
                          EMI Available
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
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
