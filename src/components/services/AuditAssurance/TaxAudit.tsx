import { Search, CheckCircle, FileText, Clock, ArrowRight, Shield, AlertTriangle, Calculator, DollarSign, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../user-panel/contexts/AuthContext';

export function TaxAudit() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartService = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'Tax Audit' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'Tax Audit' } });
        }
    };

    const auditScope = [
        {
            title: '44AB Compliance',
            description: 'Mandatory audit for businesses with turnover > ₹1 Crore (₹10 Cr if digital) and Professionals > ₹50 Lakhs.',
            icon: Search,
            features: ['Turnover Verification', 'Limit Applicability', 'Presumptive Scheme Check'],
        },
        {
            title: 'Comprehensive Reporting',
            description: 'Filing of Form 3CA/3CB and detailed particulars in Form 3CD.',
            icon: FileText,
            features: ['Form 3CD', 'Form 3CA/3CB', 'TDS Compliance', 'Method of Accounting'],
        },
        {
            title: 'Disallowance Check',
            description: 'Identifying expenses inadmissible under Income Tax Act (Sec 40, 40A, 43B).',
            icon: AlertTriangle,
            features: ['Cash Payments > 10k', 'TDS Non-deduction', 'Unpaid Statutory Dues'],
        },
    ];

    const benefits = [
        'Ensures accuracy of Income Tax Returns',
        'Avoids heavy penalty of 0.5% of turnover',
        'Verification of deductions claimed',
        'Correct reporting of Depreciation',
        'Reconciliation with GST Returns',
        'Lower scrutiny risk by Department',
    ];

    const criticalConsiderations = [
        {
            title: 'Penalty Alert',
            description: 'Failure to audit attracts penalty of 0.5% of Turnover or ₹1,50,000, whichever is lower.',
            icon: DollarSign,
        },
        {
            title: 'Due Date',
            description: 'Tax Audit Report must be filed by 30th September of the Assessment Year.',
            icon: Clock,
        },
        {
            title: 'Digital Limit',
            description: 'Turnover limit is ₹10 Crores if cash receipts & payments are less than 5%.',
            icon: TrendingUp,
        },
        {
            title: 'Presumptive',
            description: 'Audit mandatory if profit declared is less than 8%/6% (Business) or 50% (Profession).',
            icon: Calculator,
        },
    ];

    const documents = [
        'Final Books of Accounts (Bal. Sheet, P&L)',
        'Sales & Purchase Registers',
        'Bank Statements (All accounts)',
        'TDS Returns & Challans',
        'GST Returns filed (GSTR-1, 3B)',
        'Loan Statements',
        'Fixed Asset Register',
        'Closing Stock Valuation'
    ];

    const dataRequired = [
        'List of Related Party Transactions',
        'Expenses > 10k in Cash',
        'Prior Period Items',
        'Foreign Currency Transactions',
        'Investments in Immovable Property',
        'Excise/Customs details',
        'Previous Year Audit Report'
    ];

    const process = [
        {
            step: 'Applicability Check',
            description: 'verify if turnover limits are exceeded.',
            time: 'Day 1',
        },
        {
            step: 'Vouching',
            description: 'Detailed verification of vouchers, bills, and ledgers.',
            time: 'Week 1',
        },
        {
            step: 'Compliance Verification',
            description: 'Checking TDS, TCS, GST, and Labour Law payments.',
            time: 'Week 1-2',
        },
        {
            step: 'Drafting 3CD',
            description: 'Preparing detailed Form 3CD points for management review.',
            time: 'Week 2',
        },
        {
            step: 'Finalization',
            description: 'Generating UDIN and uploading reports (3CA/3CB & 3CD).',
            time: 'Final Step',
        },
        {
            step: 'Acceptance',
            description: 'Taxpayer accepts the audit report on Income Tax Portal.',
            time: 'Post Filing'
        }
    ];

    const pricing = [
        {
            plan: 'Professional',
            price: '₹12,000',
            desc: 'Small Biz',
            features: [
                'Gross Receipts < ₹50 Lakhs',
                'Presumptive Audit',
                'Filing Included',
            ]
        },
        {
            plan: 'Business',
            price: '₹25,000',
            desc: 'SME',
            features: [
                'Turnover < ₹5 Cr',
                'Comprehensive Audit',
                '3CD Filing',
                'TDS Review Included'
            ]
        },
        {
            plan: 'Corporate',
            price: 'Custom',
            features: [
                'High Turnover',
                'Multiple Locations',
                'Transfer Pricing',
                'Detailed Reporting'
            ]
        }
    ];

    const faqs = [
        {
            q: 'Is Tax Audit mandatory for Loss making companies?',
            a: 'Yes, if the turnover exceeds the specified limit (₹1 Cr/₹10 Cr), tax audit is mandatory even if there is a loss.',
        },
        {
            q: 'Does it apply to salaried individuals?',
            a: 'No, tax audit is applicable only to Income from Business or Profession.',
        },
        {
            q: 'Can I change my Tax Auditor?',
            a: 'Yes, but the new auditor must communicate with the previous auditor (NOC) before acceptance.',
        },
        {
            q: 'What is the due date for ITR in audit cases?',
            a: 'For audit cases, the due date for filing ITR is 31st October (Audit report by 30th Sept).',
        },
        {
            q: 'What is Form 3CA vs 3CB?',
            a: 'Form 3CA is for companies already audited under other laws (like Companies Act). Form 3CB is for others (Proprietorships/Partnerships).',
        },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4">
                            Income Tax Act
                        </div>
                        <h1 className="text-3xl lg:text-5xl text-white mb-4">Tax Audit (44AB)</h1>
                        <p className="text-xl text-neutral-100 leading-relaxed mb-6">
                            Mandatory audit for businesses exceeding turnover limits. Ensure compliance with Section 44AB and avoid penalties.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Clock className="w-5 h-5 text-accent" />
                                <span>Due: 30th Sept</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Shield className="w-5 h-5 text-accent" />
                                <span>Penalty Protection</span>
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Why Tax Audit?</h2>
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
                                Books and subsidiary records
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
                                Information for Form 3CD
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
                        <p className="text-lg text-neutral-600">Step by step completion of Tax Audit</p>
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
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Audit Fees</h2>
                        <p className="text-lg text-gray-600">Based on turnover volume and transaction count.</p>
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
                                    Get Started
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
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Avoid Delay Penalties</h2>
                    <p className="text-xl text-blue-100 mb-10">
                        Book your Tax Audit slot today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartService}
                            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                            BOOK NOW
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}




