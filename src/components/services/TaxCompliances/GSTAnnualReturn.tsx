import { FileText, CheckCircle, PieChart, Clock, ArrowRight, TrendingUp, AlertCircle, ShoppingCart, DollarSign, Shield, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function GSTAnnualReturn() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartService = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'GST Annual Return' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'GST Annual Return' } });
        }
    };

    const returnTypes = [
        {
            type: 'GSTR-9',
            description: 'Annual Return for regular taxpayers. Consolidates monthly flows.',
            icon: FileText,
            features: ['Sales Consolidation', 'ITC Re-validation', 'Tax Paid vs Payable', 'DRC-03 Payment'],
        },
        {
            type: 'GSTR-9C',
            description: 'Reconciliation Statement (Self-certified Audit Report).',
            icon: Shield,
            features: ['Books vs GST Portal', 'Turnover Reconciliation', 'ITC Reconciliation', 'Rate-wise Liability'],
        },
        {
            type: 'GSTR-4 (Annual)',
            description: 'Annual Return for Composition Scheme taxpayers.',
            icon: PieChart,
            features: ['Fixed Rate Tax', 'Purchase details', 'Financial Summary', 'No Input Credit'],
        },
    ];

    const benefits = [
        'Correct past mistakes of FY',
        'Avoid Department Audit Notices',
        'Finalize Books of Accounts',
        'Reclaim missed ITC (if allowed)',
        'Reverse ineligible excess ITC',
        'Assessment Readiness',
    ];

    const criticalConsiderations = [
        {
            title: 'Late Fee',
            description: '₹200/day (varies by turnover) for delay in filing Annual Return.',
            icon: Clock,
        },
        {
            title: 'Audit Limit',
            description: 'GSTR-9 filing is mandatory for turnover > ₹2 Cr.',
            icon: TrendingUp,
        },
        {
            title: 'Reconciliation',
            description: 'GSTR-9C is mandatory for turnover > ₹5 Cr.',
            icon: BookOpen,
        },
        {
            title: 'Optional',
            description: 'Optional for turnover < ₹2 Cr, but recommended to close assessment.',
            icon: AlertCircle,
        },
    ];

    const documents = [
        'Audited Financial Statements',
        'GSTR-1 & 3B Filed Copies',
        'Sales & Purchase Registers',
        'Bank Statements',
        'E-Way Bill Reports',
        'ITC Ledger Dump (Portal)',
        'Expense Head-wise Summary',
    ];

    const dataRequired = [
        'Turnover Bifurcation (Exempt/Taxable)',
        'HSN Wise Outward Summary',
        'ITC Split (Inputs/Capital Goods)',
        'Reversal of ITC Details',
        'Tax paid in Cash/Credit',
        'Refund claimed details',
        'Demand/Appeal details'
    ];

    const process = [
        {
            step: 'Data Consolidation',
            description: 'Merging 12 months data of GSTR-1, 3B, and Books of Accounts.',
            time: 'Day 1-2',
        },
        {
            step: 'Gap Analysis',
            description: 'Identifying mismatches between Portal and Books.',
            time: 'Day 3',
        },
        {
            step: 'Draft Preparation',
            description: 'Preparing draft GSTR-9/9C and computing final liability.',
            time: 'Day 4',
        },
        {
            step: 'Payment & Filing',
            description: 'Paying differential tax via DRC-03 and filing the return.',
            time: 'Day 5',
        },
        {
            step: 'Acknowledgement',
            description: 'Sharing filed acknowledgment and final set of documents.',
            time: 'Day 5',
        }
    ];

    const pricing = [
        {
            plan: 'Essential',
            price: '₹4,999',
            desc: 'GSTR-9 Only',
            features: [
                'GSTR-9 Preparation',
                '2A vs Purchase Register',
                'Tax Liability Check',
                'Filing Support',
            ]
        },
        {
            plan: 'Comprehensive',
            price: '₹9,999',
            desc: 'Recommended',
            features: [
                'GSTR-9 + GSTR-9C',
                'Books vs Portal Recon',
                'ITC Detailed Review',
                'DRC-03 Assistance',
            ]
        },
        {
            plan: 'Corporate',
            price: 'Custom',
            desc: 'For Audit Cases',
            features: [
                'Multi-State Filing',
                'Complex Reconciliation',
                'Department Verification',
                'Legal Opinion',
            ]
        }
    ];

    const faqs = [
        {
            q: 'Is GSTR-9 mandatory for everyone?',
            a: 'It is mandatory if your aggregate turnover is above ₹2 Crores. For turnover up to ₹2 Crores, it is optional.',
        },
        {
            q: 'What is GSTR-9C?',
            a: 'GSTR-9C is a reconciliation statement between your audited financial statements and GSTR-9. It is mandatory for turnover > ₹5 Crores.',
        },
        {
            q: 'Can I claim missed ITC in Annual Return?',
            a: 'Technically, the time limit to claim new ITC is 30th Nov of next FY. However, annual return is the last chance to report it (subject to litigation).',
        },
        {
            q: 'What happens if I make a mistake in Annual Return?',
            a: 'Unlike monthly returns, there is no provision to revise an Annual Return. Once filed, it is final. Hence, due diligence is critical.',
        },
        {
            q: 'What is DRC-03?',
            a: 'If any additional tax liability is found during annual return preparation, it must be paid through Form DRC-03.',
        },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4">
                            Annual Compliance
                        </div>
                        <h1 className="text-3xl lg:text-5xl text-white mb-4">GST Annual Return</h1>
                        <p className="text-xl text-neutral-100 leading-relaxed mb-6">
                            Expert filing of GSTR-9 and GSTR-9C. reconcile your books with portal data and close your financial year with zero risk.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Shield className="w-5 h-5 text-accent" />
                                <span>Audit Ready</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-accent" />
                                <span>100% Accuracy</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Types */}
            <section className="py-16 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        {returnTypes.map((item, index) => (
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Importance of Annual Return</h2>
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Turnover Limits & Fee</h2>
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
                                Documents needed for accurate reconciliation
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
                                Essential information for return preparation
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
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Filing Process</h2>
                        <p className="text-lg text-neutral-600">From consolidation to filing in 5 steps</p>
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
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Filing Plans</h2>
                        <p className="text-lg text-gray-600">Choose plan based on your turnover & compliance.</p>
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
                                    Start Process
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
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Complete Your Annual Filing</h2>
                    <p className="text-xl text-blue-100 mb-10">
                        Ensure peace of mind with our expert reconciliation services.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartService}
                            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                            START FILING
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
