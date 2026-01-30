import { FileText, CheckCircle, PieChart, Clock, ArrowRight, TrendingUp, AlertCircle, ShoppingCart, DollarSign, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function GSTReturn() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartService = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'GST Return Filing' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'GST Return Filing' } });
        }
    };

    const gstTypes = [
        {
            type: 'Regular Scheme',
            description: 'For most businesses. Monthly/Quarterly filing of GSTR-1 and GSTR-3B.',
            icon: TrendingUp,
            features: ['Sales Return (GSTR-1)', 'Summary Return (GSTR-3B)', 'Input Tax Credit', 'B2B & B2C Invoices'],
        },
        {
            type: 'Composition Scheme',
            description: 'For small businesses with turnover up to ₹1.5 Cr paying fixed rate.',
            icon: PieChart,
            features: ['Quarterly Challan (CMP-08)', 'Annual Return (GSTR-4)', 'Lower Compliance', 'No Input Credit'],
        },
        {
            type: 'QRMP Scheme',
            description: 'Quarterly Return Monthly Payment for turnover up to ₹5 Cr.',
            icon: Clock,
            features: ['IFF Facility', 'Quarterly GSTR-1 & 3B', 'Monthly Tax Payment', 'Flexible Cash Flow'],
        },
    ];

    const benefits = [
        'Avoid Penalties & Late Fees',
        'Seamless Input Tax Credit (ITC)',
        'Better Vendor Reputation',
        'Easy Loan Approvals',
        'Higher Compliance Rating',
        'Avoid E-Way Bill Blocking',
    ];

    const criticalConsiderations = [
        {
            title: 'Late Fees',
            description: 'Up to ₹50/day (₹20 for Nil) for delay in filing GSTR-3B or GSTR-1.',
            icon: DollarSign,
        },
        {
            title: 'Interest 18%',
            description: '18% p.a. interest is charged on the net tax liability paid after due date.',
            icon: TrendingUp,
        },
        {
            title: 'ITC Restriction',
            description: 'Input Tax Credit is restricted if vendors do not file their GSTR-1 on time.',
            icon: AlertCircle,
        },
        {
            title: 'Registration Cancellation',
            description: 'Non-filing for 6 consecutive months can lead to GST cancellation.',
            icon: Shield,
        },
    ];

    const documents = [
        'Sales Invoices (B2B & B2C)',
        'Purchase Invoices (for ITC)',
        'Bank Statement',
        'Expense Details',
        'Credit/Debit Notes',
        'E-Way Bill Reports',
        'Previous Return Copies',
    ];

    const dataRequired = [
        'Total Outward Supplies',
        'Total Inward Supplies',
        'Reverse Charge Liability',
        'IGST/CGST/SGST Breakup',
        'HSN/SAC Wise Summary',
        'Document Series Number',
        'Advances Received/Adjusted'
    ];

    const process = [
        {
            step: 'Data Collection',
            description: 'Upload sales and purchase registers in Excel/Tally format.',
            time: 'Day 1',
        },
        {
            step: 'Reconciliation',
            description: 'Matching Purchase data with GSTR-2B to maximize ITC claim.',
            time: 'Day 1',
        },
        {
            step: 'Compute Liability',
            description: 'Draft calculation of tax payable after adjusting ITC.',
            time: 'Day 2',
        },
        {
            step: 'Approval & Challan',
            description: 'Sending draft for approval and generating tax payment challan.',
            time: 'Day 2',
        },
        {
            step: 'Filing',
            description: 'Final filing of GSTR-1 and GSTR-3B on the portal.',
            time: 'Instant',
        },
        {
            step: 'Reporting',
            description: 'Sharing filed return acknowledgment and summary.',
            time: 'Final'
        }
    ];

    const pricing = [
        {
            plan: 'Review Only',
            price: '₹499',
            desc: 'Per Return',
            features: [
                'Review of Prepared Data',
                'GSTR-2B Matching',
                'Tax Computation Error Check',
                'Filing Assistance',
            ]
        },
        {
            plan: 'Monthly Filing',
            price: '₹1,499',
            desc: 'Recommended',
            features: [
                'GSTR-1 & GSTR-3B',
                'Invoice entry (up to 50)',
                'GSTR-2B Reconciliation',
                'Nil Return Filing Included',
            ]
        },
        {
            plan: 'Quarterly/QRMP',
            price: '₹3,999',
            desc: 'Per Quarter',
            features: [
                'IFF (Optional) Filing',
                'Quarterly GSTR-1 & 3B',
                'Monthly Tax Challan',
                'Dedicated Support',
            ]
        }
    ];

    const faqs = [
        {
            q: 'What is the due date for GSTR-3B?',
            a: 'For monthly filers, it is the 20th of the next month. For quarterly filers (QRMP), it is the 22nd or 24th depending on the state.',
        },
        {
            q: 'Can I claim ITC if it is not in GSTR-2B?',
            a: 'No, as per current GST rules, you can only claim Input Tax Credit if it appears in your GSTR-2B statement generated from supplier filings.',
        },
        {
            q: 'What is Nil Return?',
            a: 'If you have no sales and no purchases in a month, you must file a Nil Return to avoid late fees.',
        },
        {
            q: 'Is HSN code mandatory?',
            a: 'Yes, mentioning HSN/SAC codes is mandatory. 4 digits for turnover up to 5Cr and 6 digits for turnover above 5Cr.',
        },
        {
            q: 'How do I pay the tax?',
            a: 'Tax must be paid via an online challan (Netbanking/UPI/NEFT) created on the GST portal before filing GSTR-3B.',
        },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4">
                            Goods & Services Tax
                        </div>
                        <h1 className="text-3xl lg:text-5xl text-white mb-4">GST Return Filing</h1>
                        <p className="text-xl text-neutral-100 leading-relaxed mb-6">
                            Simplifying GST compliance for your business. Accurate GSTR-1, GSTR-3B, and Annual Returns filing with max ITC claim.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-accent" />
                                <span>100% ITC Match</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Clock className="w-5 h-5 text-accent" />
                                <span>On-Time Filing</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* GST Types */}
            <section className="py-16 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        {gstTypes.map((item, index) => (
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Why File GST?</h2>
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Penalties & Risks</h2>
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
                                Documents needed for monthly/quarterly filing
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
                        <p className="text-lg text-neutral-600">From data to acknowledgment in simple steps</p>
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
                        <p className="text-lg text-gray-600">Choose a plan that fits your volume.</p>
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
                                    File Now
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
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">File GST Return Today</h2>
                    <p className="text-xl text-blue-100 mb-10">
                        Stay compliant and avoid penalties.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartService}
                            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                            FILE NOW
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
