import { ZoomIn, CheckCircle, FileText, Clock, ArrowRight, Shield, AlertTriangle, Activity, BarChart, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function InternalAudit() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartService = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'Internal Audit' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'Internal Audit' } });
        }
    };

    const auditScope = [
        {
            title: 'Process Review',
            description: 'Evaluate operational efficiency and identify bottlenecks in business processes.',
            icon: Activity,
            features: ['SOP Verification', 'Cycle Time Analysis', 'Efficiency Check'],
        },
        {
            title: 'Risk Management',
            description: 'Identify potential risks (Financial, Operational, Legal) and suggest mitigation.',
            icon: Shield,
            features: ['Risk Matrix', 'Control Testing', 'Gap Analysis'],
        },
        {
            title: 'Fraud Detection',
            description: 'Proactive measures to detect and prevent fraud, pilferage, and revenue leakage.',
            icon: ZoomIn,
            features: ['Forensic Checks', 'Data Analytics', 'Transaction Monitoring'],
        },
    ];

    const benefits = [
        'Improves operational efficiency & reduces cost',
        'Stronger internal controls & governance',
        'Early detection of fraud and errors',
        'Compliance with laws, regulations & policies',
        'Better inventory and asset management',
        'Reliable financial reporting for investors',
    ];

    const criticalConsiderations = [
        {
            title: 'Management Responsibility',
            description: 'Internal controls are primarily the responsibility of the management. Audit provides assurance.',
            icon: CheckCircle,
        },
        {
            title: 'Fraud Risk',
            description: 'Companies lose ~5% of revenue to fraud annually without strong controls.',
            icon: AlertTriangle,
        },
        {
            title: 'Cyber Security',
            description: 'IT Controls are now a critical part of internal audit scope.',
            icon: Lock,
        },
        {
            title: 'Cost Benefit',
            description: 'Cost of controls should not exceed the benefit derived from them.',
            icon: BarChart,
        },
    ];

    const documents = [
        'Standard Operating Procedures (SOPs)',
        'Organization Structure & Roles',
        'Policy Manuals (HR, IT, Purchase)',
        'Ledger Scrutiny Reports',
        'Previous Audit Observations',
        'Inventory Records',
        'Fixed Asset Register',
        'Bank Reconciliation Statements'
    ];

    const dataRequired = [
        'Process Flowcharts',
        'Delegation of Authority Matrix',
        'MIS Reports',
        'Vendor/Customer Master Data',
        'Payroll Data',
        'Compliance Tracker',
        'Access to ERP System'
    ];

    const process = [
        {
            step: 'Process Understanding',
            description: 'Walkthrough of business processes and studying SOPs.',
            time: 'Week 1',
        },
        {
            step: 'Risk Assessment',
            description: 'Identifying key risk areas and planning audit extent.',
            time: 'Week 1',
        },
        {
            step: 'Execution',
            description: 'Testing of controls and substantive verification of transactions.',
            time: 'Week 2-3',
        },
        {
            step: 'Draft Reporting',
            description: 'Discussing observations with process owners for their comments.',
            time: 'Week 4',
        },
        {
            step: 'Final Report',
            description: 'Issuing detailed report with Management Action Plan.',
            time: 'Final',
        },
        {
            step: 'Follow Up',
            description: 'Reviewing implementation of recommendations in next cycle.',
            time: 'Next Cycle',
        }
    ];

    const pricing = [
        {
            plan: 'Quarterly',
            price: '₹25,000',
            desc: 'Per Quarter',
            features: [
                'Review of Key Areas',
                'Basic Control Checks',
                'Statutory Compliance',
                'Report to Management'
            ]
        },
        {
            plan: 'Monthly',
            price: '₹15,000',
            desc: 'Per Month',
            features: [
                'Continuous Monitoring',
                'Inventory Verification',
                'Detailed checking of Vouchers',
                'Monthly Reporting'
            ]
        },
        {
            plan: 'Special',
            price: 'Custom',
            features: [
                'Forensic Audit',
                'Process Specific Audit',
                'Investigation',
                'Setting up SOPs'
            ]
        }
    ];

    const faqs = [
        {
            q: 'Is Internal Audit mandatory?',
            a: 'It is mandatory for listed companies and certain unlisted public/private companies based on turnover/borrowing criteria.',
        },
        {
            q: 'How is it different from Statutory Audit?',
            a: 'Statutory audit focuses on "True & Fair" view of financials for shareholders. Internal audit focuses on improving operations and controls for management.',
        },
        {
            q: 'Can Internal Auditor do Statutory Audit?',
            a: 'No, the same firm cannot be appointed as both Internal and Statutory Auditor of the company to maintain independence.',
        },
        {
            q: 'Do you help in drafting SOPs?',
            a: 'Yes, we can help design and document Standard Operating Procedures as a separate advisory assignment.',
        },
        {
            q: 'What is the frequency of Internal Audit?',
            a: 'It can be monthly, quarterly, or yearly depending on the size and complexity of the business.',
        },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4">
                            Operational Excellence
                        </div>
                        <h1 className="text-3xl lg:text-5xl text-white mb-4">Internal Audit & Controls</h1>
                        <p className="text-xl text-neutral-100 leading-relaxed mb-6">
                            Go beyond compliance. Enhance efficiency, mitigate risks, and strengthen internal controls with our expert audit services.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Activity className="w-5 h-5 text-accent" />
                                <span>Efficiency Boost</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Shield className="w-5 h-5 text-accent" />
                                <span>Fraud Prevention</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Audit Scope */}
            <section className="py-16 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        {auditScope.map((item, index) => (
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Why Internal Audit?</h2>
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Risk Areas</h2>
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
                                Documents for review
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
                                System reports and data
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
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Audit Workflow</h2>
                        <p className="text-lg text-neutral-600">Our cycle of continuous improvement</p>
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
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Engagement Fees</h2>
                        <p className="text-lg text-gray-600">Flexible models for every business need.</p>
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
                                    Start Audit
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
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Enhance Efficiency</h2>
                    <p className="text-xl text-blue-100 mb-10">
                        Schedule a consultation with our Audit Experts.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartService}
                            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                            SCHEDULE CALL
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
