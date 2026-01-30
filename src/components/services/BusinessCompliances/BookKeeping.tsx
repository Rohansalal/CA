import { BookOpen, CheckCircle, FileText, Clock, ArrowRight, PieChart, Calculator, TrendingUp, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function BookKeeping() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartService = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'Book Keeping' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'Book Keeping' } });
        }
    };

    const features = [
        {
            icon: BookOpen,
            title: 'Double Entry',
            description: 'Scientific recording of transactions.',
        },
        {
            icon: Calculator,
            title: 'Accuracy',
            description: 'Error-free financial records.',
        },
        {
            icon: TrendingUp,
            title: 'Financial Analysis',
            description: 'Track profitability and growth.',
        },
        {
            icon: PieChart,
            title: 'Compliance',
            description: 'Ready for GST and Income Tax filings.',
        },
    ];

    const benefits = [
        'Accurate financial picture',
        'Helpful in decision making',
        'Easier tax compliance (GST/ITR)',
        'Better cash flow management',
        'Ready for investor due diligence',
        'Saves time and reduces stress',
        'Professional financial reports',
        'Detection of errors and frauds'
    ];

    const documents = [
        'Bank Statements',
        'Sales Invoices',
        'Purchase Bills',
        'Expense Vouchers',
        'Payroll Data',
        'Loan Statements',
    ];

    const process = [
        {
            step: 'Data Collection',
            description: 'We collect your bank statements, invoices, and expense vouchers digitally or physically.',
            time: 'Days 1-5',
        },
        {
            step: 'Document Verification',
            description: 'Our team verifies the authenticity and completeness of all provided documents.',
            time: 'Day 6',
        },
        {
            step: 'Recording Entries',
            description: 'Transactions are recorded in your preferred accounting software (Tally/Zoho/QB).',
            time: 'Days 7-20',
        },
        {
            step: 'Bank Reconciliation',
            description: 'Matching book balance with bank statement to identify discrepancies.',
            time: 'Day 21',
        },
        {
            step: 'Review & Reporting',
            description: 'Senior accountant reviews the books and generates monthly P&L and Balance Sheet.',
            time: 'Day 25',
        },
        {
            step: 'Finalization',
            description: 'Reports are shared with management for approval and decision making.',
            time: 'Month End',
        },
    ];

    const criticalConsiderations = [
        {
            title: 'Timely Submission',
            description: 'Documents must be provided by the 5th of every month to ensure on-time reporting.',
            icon: Clock,
        },
        {
            title: 'Digital Copies',
            description: 'Scanned copies or clear photos are sufficient; originals are not strictly required.',
            icon: FileText,
        },
        {
            title: 'Bank Access',
            description: 'View-only access to net banking helps in faster reconciliation and accuracy.',
            icon: Shield,
        },
        {
            title: 'Software Choice',
            description: 'We adapt to your existing software or recommend the best one for your industry.',
            icon: Calculator,
        },
    ];

    const faqs = [
        {
            q: 'Do I need to send physical copies of bills?',
            a: 'No, we encourage a paperless office. You can upload scanned copies or photos to our secure portal or email them to us.',
        },
        {
            q: 'Which accounting software do you use?',
            a: 'We are proficient in Tally Prime, Zoho Books, QuickBooks, and Xero. We can also work on Excel for very small businesses.',
        },
        {
            q: 'Is my financial data secure?',
            a: 'Absolutely. We use enterprise-grade encryption for data transfer and storage. Our staff is bound by strict non-disclosure agreements.',
        },
        {
            q: 'Can you handle backlog accounting for previous months?',
            a: 'Yes, we specialize in backlog clearing. We can reconstruct your books from the start of the financial year or even earlier.',
        },
        {
            q: 'How does this help with GST and Tax?',
            a: 'Accurate bookkeeping is the foundation of tax compliance. We ensure all ITC is claimed correctly and turnover matches your GST returns.',
        },
    ];

    const dataRequired = [
        'Nature of Business Activity',
        'Chart of Accounts (if existing)',
        'Previous Year Financials (for Opening Balances)',
        'GST Portal Credentials (for reconciliation)',
        'List of recurring expenses',
        'Vendor and Customer Details'
    ];

    const pricing = [
        {
            plan: 'Small Biz',
            price: '₹2,499',
            desc: 'Per Month',
            features: [
                'Upto 100 Transactions',
                'Monthly P&L & Balance Sheet',
                'Bank Reconciliation',
                'GST Data Preparation'
            ]
        },
        {
            plan: 'Growth',
            price: '₹5,999',
            desc: 'Per Month',
            features: [
                'Upto 500 Transactions',
                'Weekly Application',
                'Debtors/Creditors Aging',
                'TDS Data Preparation',
                'Quarterly Review'
            ]
        },
        {
            plan: 'Enterprise',
            price: 'Custom',
            features: [
                'Unlimited Transactions',
                'Dedicated Accountant',
                'Daily/Weekly Reporting',
                'Inventory Management',
                'MIS Reporting'
            ]
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10">
                    <BookOpen className="w-96 h-96 -mr-20 -mt-20" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-semibold mb-6 border border-white/20">
                            Accounting Services
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Professional Book Keeping <br />
                            <span className="text-accent">Know Your Numbers</span>
                        </h1>
                        <p className="text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl">
                            Outsource your accounting to experts. We ensure your books are up-to-date, compliant, and providing actionable insights.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg border border-white/20 backdrop-blur-sm">
                                <Clock className="w-5 h-5 text-accent" />
                                <span className="font-medium">Monthly / Yearly</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg border border-white/20 backdrop-blur-sm">
                                <CheckCircle className="w-5 h-5 text-accent" />
                                <span className="font-medium">Tally / Zoho / Quickbooks</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 -mt-20 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-xl border border-neutral-100 hover:-translate-y-2 transition-all duration-300">
                                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                    <feature.icon className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Why Outsource?</h2>
                            <div className="space-y-3">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                        <span className="text-neutral-700">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Critical Considerations */}
                        <div>
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Important Points</h2>
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

            {/* Documents & Data Required */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Documents */}
                        <div>
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Documents Required</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Standard documents needed for accurate accounting
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

                        {/* Data Required */}
                        <div>
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Information Needed</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Additional details to set up your account
                            </p>
                            <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 text-white">
                                <div className="space-y-3">
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

            {/* Process Section */}
            <section className="py-16 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Our Process</h2>
                        <p className="text-lg text-neutral-600">Streamlined workflow for efficient bookkeeping</p>
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
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Monthly Plans</h2>
                        <p className="text-lg text-gray-600">Choose a plan that fits your transaction volume.</p>
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
                                    {plan.price !== 'Custom' && <span className="text-gray-500"> / month</span>}
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
                                    Start Now
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
            <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Focus on Business, Not Books</h2>
                    <p className="text-xl text-blue-100 mb-10">
                        Let us handle the accounting while you grow your business.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartService}
                            className="px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl inline-flex items-center justify-center gap-2"
                        >
                            GET STARTED
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all">
                            Talk to Expert
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
