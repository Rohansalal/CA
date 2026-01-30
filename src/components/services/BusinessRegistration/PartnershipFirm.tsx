import { Handshake, CheckCircle, FileText, Clock, ArrowRight, AlertCircle, Users, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function PartnershipFirm() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleStartRegistration = () => {
    if (isAuthenticated) {
      navigate('/dashboard', { state: { selectedService: 'Partnership Firm' } });
    } else {
      navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'Partnership Firm' } });
    }
  };
  const partnershipTypes = [
    {
      type: 'General Partnership',
      description: 'All partners share equal rights and liabilities in business operations',
      features: ['Shared management', 'Unlimited liability', 'Simple registration', 'Ideal for small businesses'],
    },
    {
      type: 'Limited Partnership',
      description: 'Mix of general partners (unlimited liability) and limited partners (limited liability)',
      features: ['Limited liability for some', 'Passive investors allowed', 'More complex structure', 'Suitable for funded ventures'],
    },
  ];

  const benefits = [
    'Easy and quick formation process',
    'Low registration and operational costs',
    'Minimal compliance requirements',
    'Flexible profit-sharing arrangements',
    'Combined skills and resources',
    'No mandatory audit requirements',
    'Tax benefits - no separate entity tax',
    'Suitable for professional services',
  ];

  const documents = [
    'PAN Card of all partners',
    'Aadhaar Card of all partners',
    'Address proof of partners (Voter ID/Passport/Driving License)',
    'Passport size photographs',
    'Address proof of registered office',
    'Rent agreement/property documents',
    'NOC from landlord (if rented)',
    'Bank statement of partners',
  ];

  const registrationSteps = [
    {
      step: 'Partnership Deed Drafting',
      description: 'Prepare comprehensive partnership deed defining terms, profit sharing, roles, and responsibilities',
      time: '2-3 days',
    },
    {
      step: 'Stamp Duty Payment',
      description: 'Pay stamp duty as per state-specific rates on the partnership deed',
      time: '1 day',
    },
    {
      step: 'Notarization',
      description: 'Get the partnership deed notarized by a notary public',
      time: '1 day',
    },
    {
      step: 'PAN Application',
      description: 'Apply for PAN in the name of the partnership firm (Form 49A)',
      time: '7-10 days',
    },
    {
      step: 'TAN Registration (if applicable)',
      description: 'Register for TAN if firm will deduct TDS on payments',
      time: '7-10 days',
    },
    {
      step: 'GST Registration',
      description: 'Register for GST if turnover exceeds threshold or for voluntary registration',
      time: '3-7 days',
    },
  ];

  const partnershipDeedClauses = [
    'Name and address of the partnership firm',
    'Names and addresses of all partners',
    'Nature of business activities',
    'Capital contribution by each partner',
    'Profit and loss sharing ratio',
    'Duration of partnership (if applicable)',
    'Roles and responsibilities of partners',
    'Admission and retirement of partners',
    'Settlement of accounts on dissolution',
    'Dispute resolution mechanism',
    'Bank account operations and signing authority',
    'Restrictions on partners',
  ];

  const taxCompliances = [
    {
      compliance: 'Income Tax Return',
      form: 'ITR-5',
      frequency: 'Annual',
      dueDate: '31st July (or 31st Oct if audit applicable)',
    },
    {
      compliance: 'GST Returns',
      form: 'GSTR-1, GSTR-3B',
      frequency: 'Monthly/Quarterly',
      dueDate: '11th and 20th of next month',
    },
    {
      compliance: 'TDS Returns',
      form: '24Q, 26Q, 27Q',
      frequency: 'Quarterly',
      dueDate: '31st of month following quarter',
    },
  ];

  const limitations = [
    {
      title: 'Unlimited Liability',
      description: 'Partners are personally liable for firm debts',
      icon: AlertCircle,
    },
    {
      title: 'Limited Life',
      description: 'Partnership dissolves on death/insolvency of any partner',
      icon: AlertCircle,
    },
    {
      title: 'No Separate Legal Entity',
      description: 'Firm cannot own property; partners own it collectively',
      icon: AlertCircle,
    },
    {
      title: 'Difficulty in Raising Funds',
      description: 'Cannot raise funds through equity or public offerings',
      icon: AlertCircle,
    },
  ];

  const conversionOptions = [
    {
      from: 'Partnership Firm',
      to: 'LLP',
      benefit: 'Limited liability with lower compliance',
      process: 'File conversion application with MCA',
    },
    {
      from: 'Partnership Firm',
      to: 'Private Limited Company',
      benefit: 'Separate legal entity, fundraising capability',
      process: 'Incorporate new company and transfer assets',
    },
  ];

  const faqs = [
    {
      q: 'Is registration of partnership firm mandatory?',
      a: 'No, registration is not mandatory but highly recommended. Unregistered firms cannot file suits against partners or third parties in case of disputes.',
    },
    {
      q: 'What is the minimum and maximum number of partners?',
      a: 'Minimum 2 partners are required. Maximum is 50 partners (previously 20, changed by Companies Act 2013).',
    },
    {
      q: 'Can a partnership firm have a minor as a partner?',
      a: 'A minor can be admitted only for the benefits of the partnership with consent of all partners. Minor partner has limited liability.',
    },
    {
      q: 'Is audit mandatory for partnership firms?',
      a: 'Audit is not mandatory unless turnover exceeds prescribed limits or if required by any specific law or partnership deed.',
    },
    {
      q: 'Can partnership deed be amended?',
      a: 'Yes, partnership deed can be amended with mutual consent of all partners by executing a supplementary deed.',
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
            <h1 className="text-3xl lg:text-5xl text-white mb-4">Partnership Firm Registration</h1>
            <p className="text-xl text-neutral-100 leading-relaxed mb-6">
              Simple and cost-effective business structure for two or more individuals. Perfect for professionals, traders, and small businesses seeking shared ownership and management.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Clock className="w-5 h-5 text-accent" />
                <span>3-5 Days Registration</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>Lowest Compliance Burden</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-16 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {partnershipTypes.map((type, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg border border-neutral-200 hover:shadow-2xl transition-all"
              >
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <Handshake className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl text-primary mb-3">{type.type}</h3>
                <p className="text-neutral-600 mb-6">{type.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {type.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                      <span className="text-sm text-neutral-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Limitations */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <div>
              <h2 className="text-3xl lg:text-4xl text-primary mb-6">Key Benefits</h2>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Limitations */}
            <div>
              <h2 className="text-3xl lg:text-4xl text-primary mb-6">Important Considerations</h2>
              <div className="space-y-4">
                {limitations.map((limit, index) => (
                  <div key={index} className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                    <div className="flex items-start gap-3">
                      <limit.icon className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-lg text-orange-900 font-semibold mb-1">{limit.title}</h3>
                        <p className="text-orange-800 text-sm">{limit.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Required */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl lg:text-4xl text-primary mb-6">Documents Required</h2>
              <p className="text-lg text-neutral-600 mb-6">
                Prepare these documents for partnership firm registration
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

            <div>
              <h2 className="text-3xl lg:text-4xl text-primary mb-6">Partnership Deed Must Include</h2>
              <p className="text-lg text-neutral-600 mb-6">
                Essential clauses in your partnership agreement
              </p>
              <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 text-white">
                <div className="space-y-3">
                  {partnershipDeedClauses.slice(0, 8).map((clause, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                      <span className="text-sm text-neutral-100">{clause}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/20 text-sm text-neutral-200">
                  + {partnershipDeedClauses.length - 8} more clauses...
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Process */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-primary mb-4">Registration Process</h2>
            <p className="text-lg text-neutral-600">Complete process from deed drafting to registrations</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {registrationSteps.map((step, index) => (
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

      {/* Tax Compliances */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-primary mb-4">Annual Tax Compliances</h2>
            <p className="text-lg text-neutral-600">Stay compliant with these regular filings</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {taxCompliances.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6 hover:shadow-2xl transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl text-primary mb-2 font-semibold">{item.compliance}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Form:</span>
                    <span className="text-neutral-800 font-medium">{item.form}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Frequency:</span>
                    <span className="text-neutral-800 font-medium">{item.frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Due Date:</span>
                    <span className="text-accent font-medium">{item.dueDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Options */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-primary mb-4">Need to Scale Up?</h2>
            <p className="text-lg text-neutral-600">Convert your partnership firm to other structures</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {conversionOptions.map((option, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-neutral-200 p-8 hover:shadow-2xl transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-accent" />
                  <ArrowRight className="w-6 h-6 text-neutral-400" />
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl text-primary mb-2 font-semibold">
                  {option.from} → {option.to}
                </h3>
                <p className="text-neutral-600 mb-4">{option.benefit}</p>
                <div className="text-sm text-neutral-500 bg-neutral-50 p-3 rounded-lg">
                  <strong>Process:</strong> {option.process}
                </div>
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
          <h2 className="text-3xl lg:text-4xl text-white mb-4">Ready to Register Your Partnership Firm?</h2>
          <p className="text-xl text-neutral-100 mb-8">
            Get expert assistance with partnership deed drafting and complete registration
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleStartRegistration}
              className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
              START REGISTRATION
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-neutral-100 transition-all">
              DOWNLOAD PARTNERSHIP DEED SAMPLE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
