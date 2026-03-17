import { Scale, CheckCircle, FileText, Clock, ArrowRight, Shield, Building2, Gavel, AlertCircle, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../user-panel/contexts/AuthContext';

export function StatutoryAudit() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartService = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'Statutory Audit' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'Statutory Audit' } });
        }
    };

    const features = [
        {
            icon: Scale,
            title: 'Independent Opinion',
            description: 'True & Fair view of financial statements.',
            features: ['Financial Analysis', 'Accounting Standards', 'Fraud Detection'],
        },
        {
            icon: Gavel,
            title: 'Legal Compliance',
            description: 'Compliance with Companies Act, 2013.',
            features: ['Section 143', 'CARO 2020', 'Accounting Standards'],
        },
        {
            icon: Shield,
            title: 'Stakeholder Trust',
            description: 'Assurance for banks & investors.',
            features: ['Investor Confidence', 'Bank Loans', 'Valuation Support'],
        },
    ];

    const benefits = [
        'Mandatory for all companies',
        'Adds credibility to financial statements',
        'Helps in detection of fraud/error',
        'Improvement in internal systems',
        'Ensures accounting standards compliance',
        'Required for loans and funding',
        'Valuable insights for management',
        'Protects shareholder interests'
    ];

    const criticalConsiderations = [
        {
            title: 'Penalty Alert',
            description: 'Section 147: Minimum Fine ₹25,000. Imprisonment up to 1 year for officers in default if willful.',
            icon: AlertCircle,
        },
        {
            title: 'Disqualification',
            description: 'Auditor cannot be appointed if he holds security or is indebted > ₹5 Lakhs.',
            icon: Shield,
        },
        {
            title: 'Rotation',
            description: 'Mandatory rotation of auditors for listed and certain class of companies.',
            icon: Clock,
        },
        {
            title: 'Reporting',
            description: 'Auditor must report fraud to Central Govt if amount > ₹1 Crore.',
            icon: Scale,
        },
    ];

    const documents = [
        'Books of Accounts (Tally/Zoho etc)',
        'Supporting Vouchers & Bills',
        'Bank Statements & Confirmations',
        'Minutes of Board Meetings',
        'Previous Audit Report',
        'Statutory Registers',
        'Shareholding Patterns'
    ];

    const dataRequired = [
        'Trial Balance & Financials',
        'List of Related Parties',
        'Contingent Liabilities',
        'Fixed Asset Register',
        'Inventory Valuation Certificate',
        'Legal Case details',
        'Internal Control Notes'
    ];

    const process = [
        {
            step: 'Appointment',
            description: 'Filing ADT-1 and issue of Engagement Letter.',
            time: 'Day 1',
        },
        {
            step: 'Planning',
            description: 'Understanding business and risk assessment.',
            time: 'Day 2-3',
        },
        {
            step: 'Execution',
            description: 'Substantive testing of transactions and balances.',
            time: 'Week 2',
        },
        {
            step: 'Reporting',
            description: 'Drafting Audit Report and discussion with management.',
            time: 'Week 3',
        },
        {
            step: 'Finalization',
            description: 'Signing of Financial Statements and Audit Report.',
            time: 'Final',
        },
        {
            step: 'Filing',
            description: 'Assistance in filing AOC-4 with ROC.',
            time: 'Post Audit',
        }
    ];

    const pricing = [
        {
            plan: 'Small Co.',
            price: '₹15,000',
            desc: 'Startups',
            features: [
                'Turnover < ₹50 Lakhs',
                'Basic Audit Report',
                'Compliance Check',
                'Annual Filing Support'
            ]
        },
        {
            plan: 'Medium Co.',
            price: '₹35,000',
            desc: 'Growing',
            features: [
                'Turnover < ₹5 Cr',
                'Detailed Reporting',
                'CARO Reporting',
                'Tax Audit Verification'
            ]
        },
        {
            plan: 'Large Co.',
            price: 'Custom',
            desc: 'Enterprise',
            features: [
                'Complete Audit',
                'Internal Financial Controls',
                'Consolidated Statements',
                'Board Presentation'
            ]
        }
    ];

    const faqs = [
        {
            q: 'Is Statutory Audit mandatory for small companies?',
            a: 'Yes, every company registered under the Companies Act, irrespective of turnover or loss, must get its accounts audited.',
        },
        {
            q: 'What is CARO 2020?',
            a: 'Companies (Auditor\'s Report) Order, 2020 requires auditor to report on 21 specific clauses including inventory, loans, fraud, etc.',
        },
        {
            q: 'Can use a relative as auditor?',
            a: 'No, a relative of a director or key managerial personnel cannot be appointed as an auditor.',
        },
        {
            q: 'What if accounts are not audited?',
            a: 'The company cannot file its annual return (AOC-4), attracting heavy penalties. Directors may also face disqualification.',
        },
        {
            q: 'When should the audit be completed?',
            a: 'Ideally before the AGM (Annual General Meeting), which must be held within 6 months from the end of financial year (i.e., by 30th Sept).',
        },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4">
                            Corporate Compliance
                        </div>
                        <h1 className="text-3xl lg:text-5xl text-white mb-4">Statutory Audit</h1>
                        <p className="text-xl text-neutral-100 leading-relaxed mb-6">
                            Independent assurance on your financial statements. We ensure compliance with Companies Act, 2013 and Accounting Standards.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Building2 className="w-5 h-5 text-accent" />
                                <span>Mandatory for All</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Shield className="w-5 h-5 text-accent" />
                                <span>Risk Assessment</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Types */}
            <section className="py-16 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        {features.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-xl shadow-lg border border-neutral-200 hover:shadow-2xl transition-all"
                            >
                                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                                    <item.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl text-primary mb-3">{item.title}</h3>
                                <p className="text-neutral-600 mb-6">{item.description}</p>
                                <ul className="space-y-3">
                                    {item.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                                            <span className="text-sm text-neutral-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Why Audit?</h2>
                            <div className="space-y-3">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                        <span className="text-neutral-700">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Critical Rules */}
                        <div>
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Critical Rules</h2>
                            <div className="space-y-4">
                                {criticalConsiderations.map((item, index) => (
                                    <div key={index} className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                                        <div className="flex items-start gap-3">
                                            <item.icon className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <h3 className="text-lg text-orange-900 font-semibold mb-1">{item.title}</h3>
                                                <p className="text-orange-800 text-sm">{item.description}</p>
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
                                Standard list of documents for audit
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Data Needed</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Specific information for verification
                            </p>
                            <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 text-white">
                                <div className="space-y-3">
                                    {dataRequired.map((item, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                                            <span className="text-sm text-neutral-100">{item}</span>
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
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Audit Process</h2>
                        <p className="text-lg text-neutral-600">Methodical approach to assurance</p>
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
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Professional Fees</h2>
                        <p className="text-lg text-gray-600">Transparent pricing based on turnover & complexity.</p>
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
                                    {plan.price !== 'Custom' && <span className="text-gray-500"></span>}
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
                                    onClick={handleStartService}
                                    className={`w-full py-3 rounded-xl font-bold transition-all ${index === 1
                                        ? 'bg-accent text-white hover:bg-accent/90 shadow-lg hover:shadow-accent/30'
                                        : 'bg-primary/5 text-primary hover:bg-primary hover:text-white'
                                        }`}
                                >
                                    Appoint Auditor
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
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Need a Statutory Auditor?</h2>
                    <p className="text-xl text-blue-100 mb-10">
                        Get your accounts audited by expert Chartered Accountants.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartService}
                            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                            CONTACT US
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}





