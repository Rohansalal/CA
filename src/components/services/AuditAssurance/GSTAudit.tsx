import { Filter, CheckCircle, FileText, Clock, ArrowRight, Shield, Calculator, FileSearch, Building2, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function GSTAudit() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartService = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'GST Audit' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'GST Audit' } });
        }
    };

    const auditTypes = [
        {
            type: 'Annual Reconciliation (9C)',
            description: 'Reconciling Audited Financials with GST Returns (GSTR-9). Mandatory for turnover > ₹5 Cr.',
            icon: Calculator,
            features: ['Book vs Return matching', 'Turnover verification', 'ITC Reconciliation', 'Tax Liability check'],
        },
        {
            type: 'Department Audit (Sec 65)',
            description: 'Detailed scrutiny of records by GST authorities at your business premises.',
            icon: FileSearch,
            features: ['Notice Reply', 'Document Compilation', 'Representation', 'Legal Defense'],
        },
        {
            type: 'Special Audit (Sec 66)',
            description: 'Audit directed by the department to be conducted by a CA/CMA nominated by them.',
            icon: Shield,
            features: ['Complex Case Analysis', 'Valuation Disputes', 'ITC Fraud Investigation', 'Detailed Report'],
        },
    ];

    const benefits = [
        'Identification of Revenue Leakages',
        'Verification of Input Tax Credit (ITC) eligibility',
        'Avoidance of future litigation and interest',
        'Correct classification of Goods/Services',
        'Validation of Place of Supply rules',
        'Assurance on tax positions taken',
        'Refund of excess tax paid (if any)',
        'Peace of Mind during Department visits'
    ];

    const criticalConsiderations = [
        {
            title: 'Self Certification',
            description: 'GSTR-9C is now self-certified. The responsibility of accuracy lies entirely on the taxpayer.',
            icon: CheckCircle,
        },
        {
            title: 'Turnover Limits',
            description: 'GSTR-9 is mandatory if turnover > ₹2 Cr. GSTR-9C is mandatory if turnover > ₹5 Cr.',
            icon: Building2,
        },
        {
            title: 'ITC Reversal',
            description: 'Specific focus on Rule 42/43 reversals and blocked credits under Section 17(5).',
            icon: AlertTriangle,
        },
        {
            title: 'Limitation Period',
            description: 'Notices can be issued up to 5 years from due date. Records must be preserved for 72 months.',
            icon: Clock,
        },
    ];

    const documents = [
        'Audited Financial Statements (Balance Sheet/P&L)',
        'Copies of filed GSTR-1, GSTR-3B & GSTR-9',
        'Sales and Purchase Registers (Excel)',
        'Input Tax Credit Register',
        'E-Way Bill Reports',
        'Tax Payment Challans',
        'Refund Orders (if any)',
        'Previous Audit/Scrutiny Orders'
    ];

    const dataRequired = [
        'Turnover Reconciliation',
        'Rate-wise Liability Calculation',
        'ITC Claimed vs Availment in Books',
        'Un-reconciled differences',
        'Non-GST / Exempt supply details',
        'Details of Demands/Refunds',
        'HSN Summary'
    ];

    const process = [
        {
            step: 'Data Consolidation',
            description: 'Aggregating financial data and GST portal data for the financial year',
            time: '2-3 Days',
        },
        {
            step: 'Initial Review',
            description: 'High-level check of turnover, tax rates, and major ITC heads',
            time: '1-2 Days',
        },
        {
            step: 'Detailed Verification',
            description: 'Transaction level checking of invoices, e-way bills, and stock records',
            time: '3-5 Days',
        },
        {
            step: 'Draft Reconciliation',
            description: 'Preparation of GSTR-9C draft and identifying gaps',
            time: '2 Days',
        },
        {
            step: 'Management Representation',
            description: 'Discussing findings with management and finalising tax positions',
            time: '1 Day',
        },
        {
            step: 'Filing',
            description: 'Uploading the final GSTR-9 and 9C on the portal',
            time: 'Final Step',
        },
    ];

    const pricing = [
        {
            plan: 'Review',
            price: '₹10,000',
            desc: 'Small Biz',
            features: [
                'GSTR-9 Review',
                'Basic Reconciliation',
                'Filing Support',
            ]
        },
        {
            plan: 'Standard',
            price: '₹20,000',
            desc: 'Recommended',
            features: [
                'GSTR-9 + 9C',
                'Detailed ITC Check',
                'Drafting Reconciliation',
                'Review Meeting'
            ]
        },
        {
            plan: 'Department',
            price: 'Custom',
            features: [
                'Notice Reply',
                'Department Representation',
                'Hearing Attendance',
                'Appeal Filing'
            ]
        }
    ];

    const faqs = [
        {
            q: 'Is GST Audit by CA mandatory?',
            a: 'No, the mandatory requirement for CA certification on GSTR-9C was removed in Budget 2021. It is now self-certified. However, professional help is recommended for accuracy.',
        },
        {
            q: 'What is the due date for GSTR-9/9C?',
            a: 'The due date is typically 31st December following the end of the financial year. For example, for FY 22-23, due date is 31st Dec 2023.',
        },
        {
            q: 'What happens if I miss the due date?',
            a: 'Late fee is levied at ₹200 per day (subject to caps based on turnover). Delay can also attract scrutiny and interest on unpaid tax.',
        },
        {
            q: 'Can I claim missed ITC in Annual Return?',
            a: 'No, usually the time limit to claim ITC for a FY ends on 30th November of the next year. Annual return is primarily for reconciliation, not for claiming new credits.',
        },
        {
            q: 'Is GSTR-9C required if turnover is below ₹5 Cr?',
            a: 'No, filing of GSTR-9C is optional for taxpayers having aggregate turnover up to ₹5 Crores.',
        },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4">
                            GST Assurance
                        </div>
                        <h1 className="text-3xl lg:text-5xl text-white mb-4">GST Audit & Annual Return</h1>
                        <p className="text-xl text-neutral-100 leading-relaxed mb-6">
                            Expert assistance for GSTR-9/9C filing and Department Audits. Ensure 100% compliance and avoid litigation.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Clock className="w-5 h-5 text-accent" />
                                <span>Due: 31st Dec</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Shield className="w-5 h-5 text-accent" />
                                <span>Risk Mitigation</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Audit Types */}
            <section className="py-16 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        {auditTypes.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-xl shadow-lg border border-neutral-200 hover:shadow-2xl transition-all"
                            >
                                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                                    <item.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl text-primary mb-3">{item.type}</h3>
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Value of Compliance</h2>
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Key Regulations</h2>
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
                                Records to be kept ready
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Reconciliation Data</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Information for GSTR-9C
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
                        <p className="text-lg text-neutral-600">Our systemic approach to GST Audit</p>
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
                        <p className="text-lg text-gray-600">Transparent pricing for GST Compliance.</p>
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
                                    Start Compliance
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
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Stay Compliant</h2>
                    <p className="text-xl text-blue-100 mb-10">
                        Handle Dept Audits with Confidence.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartService}
                            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                            CONSULT EXPERT
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
