import { Receipt, CheckCircle, FileText, Clock, ArrowRight, AlertCircle, TrendingUp, Shield, Globe, ShoppingCart, Percent, BookOpen, Calculator, PieChart, Users, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../user-panel/contexts/AuthContext';

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

    const serviceTypes = [
        {
            type: 'End-to-End Bookkeeping',
            description: 'Complete outsourcing of your accounting function. We handle everything from recording to reporting.',
            icon: BookOpen,
            features: ['Daily transaction recording', 'Bank reconciliation', 'Vendor management', 'Monthly MIS calculation'],
        },
        {
            type: 'Review & Supervision',
            description: 'For businesses with an in-house accountant. We review the entries and ensure compliance.',
            icon: Shield,
            features: ['Weekly review of books', 'Error detection & correction', 'Tax liability computation', 'Finalization support'],
        },
        {
            type: 'Backlog / Catch-up',
            description: 'Pending accounting for previous months or years? We reconstruct your books from scratch.',
            icon: Clock,
            features: ['Clearing years of backlog', 'Suspense clearing', 'Reconciliation with GST/ITR', 'Updated financial statements'],
        },
    ];

    const benefits = [
        'Accurate financial picture of your business',
        'Helpful in strategic decision making',
        'Seamless tax compliance (GST/ITR)',
        'Better cash flow management and tracking',
        'Ready for investor due diligence at any time',
        'Saves time and reduces administrative stress',
        'Professional financial reports (MIS)',
        'Early detection of errors and potential frauds',
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

    const documents = [
        'Bank Statements (PDF/Excel)',
        'Sales Invoices / POS Reports',
        'Purchase Bills & Expense Vouchers',
        'Payroll / Salary Data',
        'Loan Statements & Interest Certificates',
        'Credit Card Statements',
        'Tax Challans (GST/TDS/PF)',
        'Fixed Asset Purchase Bills',
    ];

    const additionalInfo = [
        'Nature of Business Activity',
        'Chart of Accounts (if existing)',
        'Previous Year Financials (for Opening Balances)',
        'GST Portal Credentials (for reconciliation)',
        'List of recurring expenses',
        'Vendor and Customer Details',
        'Inventory details (Closing Stock value)'
    ];

    const processSteps = [
        {
            step: 'Data Collection',
            description: 'We collect your bank statements, invoices, and expense vouchers digitally or physically',
            time: 'Days 1-5',
        },
        {
            step: 'Document Verification',
            description: 'Our team verifies the authenticity and completeness of all provided documents',
            time: 'Day 6',
        },
        {
            step: 'Recording Entries',
            description: 'Transactions are recorded in your preferred accounting software (Tally/Zoho/QB)',
            time: 'Days 7-20',
        },
        {
            step: 'Bank Reconciliation',
            description: 'Matching book balance with bank statement to identify discrepancies',
            time: 'Day 21',
        },
        {
            step: 'Review & Reporting',
            description: 'Senior accountant reviews the books and generates monthly P&L and Balance Sheet',
            time: 'Day 25',
        },
        {
            step: 'Finalization',
            description: 'Reports are shared with management for approval and decision making',
            time: 'Month End',
        },
        {
            step: 'Advisory Call',
            description: 'Monthly call to discuss financial health and key performance indicators',
            time: 'Post Report',
        },
    ];

    const keyReports = [
        {
            report: 'Profit & Loss A/c',
            purpose: 'Track Profitability',
            frequency: 'Monthly',
            format: 'Excel / PDF Dashboard',
        },
        {
            report: 'Balance Sheet',
            purpose: 'Financial Position',
            frequency: 'Monthly',
            format: 'Detailed Statement',
        },
        {
            report: 'Receivables Aging',
            purpose: 'Cash Collection',
            frequency: 'Weekly',
            format: 'Aging Report',
        },
    ];

    const transitionOptions = [
        {
            from: 'Excel / Manual',
            to: 'Tally / Zoho Books',
            benefit: 'Automation, Compliance & Accuracy',
            process: 'We migrate your data to professional software',
        },
        {
            from: 'In-house Accountant',
            to: 'Outsourced Team',
            benefit: 'Cost Saving & Expert Review',
            process: 'Seamless handover with zero downtime',
        },
    ];

    const pricing = [
        {
            plan: 'Small Biz',
            price: '₹2,499',
            desc: 'Starting',
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
            desc: 'Best Seller',
            features: [
                'Upto 500 Transactions',
                'Weekly Application',
                'Debtors/Creditors Aging',
                'TDS Data Preparation',
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
            ]
        }
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

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4">
                            Accounting Services
                        </div>
                        <h1 className="text-3xl lg:text-5xl text-white mb-4">Professional Bookkeeping Services</h1>
                        <p className="text-xl text-neutral-100 leading-relaxed mb-6">
                            Outsource your accounting to experts. We ensure your books are up-to-date, compliant, and providing actionable insights.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Clock className="w-5 h-5 text-accent" />
                                <span>Monthly / Yearly Reports</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-accent" />
                                <span>Tally / Zoho / QB</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Types */}
            <section className="py-16 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        {serviceTypes.map((type, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-xl shadow-lg border border-neutral-200 hover:shadow-2xl transition-all"
                            >
                                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                                    <type.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl text-primary mb-3">{type.type}</h3>
                                <p className="text-neutral-600 mb-6">{type.description}</p>
                                <ul className="space-y-3">
                                    {type.features.map((feature, idx) => (
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Important Rules</h2>
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
                                Share these digitally for processing
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Additional Information</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                We may need the following details:
                            </p>
                            <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 text-white">
                                <div className="space-y-3">
                                    {additionalInfo.map((details, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                                            <span className="text-sm text-neutral-100">{details}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Work Process */}
            <section className="py-16 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Our Process</h2>
                        <p className="text-lg text-neutral-600">From Data to Insights in 5-7 steps</p>
                    </div>
                    <div className="max-w-4xl mx-auto space-y-6">
                        {processSteps.map((step, index) => (
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

            {/* Key Reports (Replaces Annual Compliances) */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Key Reports</h2>
                        <p className="text-lg text-neutral-600">Deliverables you get every month</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {keyReports.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6 hover:shadow-2xl transition-all"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <FileText className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl text-primary mb-2 font-semibold">{item.report}</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-neutral-500">Purpose:</span>
                                        <span className="text-neutral-800 font-medium">{item.purpose}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-neutral-500">Frequency:</span>
                                        <span className="text-neutral-800 font-medium">{item.frequency}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-neutral-500">Format:</span>
                                        <span className="text-accent font-medium">{item.format}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Transition/Upgrade Options */}
            <section className="py-16 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Make the Switch</h2>
                        <p className="text-lg text-neutral-600">Improve your finance function with better tools and teams</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {transitionOptions.map((option, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg border border-neutral-200 p-8 hover:shadow-2xl transition-all"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <Users className="w-8 h-8 text-secondary" />
                                    <ArrowRight className="w-6 h-6 text-neutral-400" />
                                    <Shield className="w-8 h-8 text-primary" />
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

            {/* Pricing Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Service Packages</h2>
                        <p className="text-lg text-gray-600">Transparent pricing for monthly bookkeeping</p>
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
                                    {plan.features?.map((feature, idx) => (
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

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-4xl text-white mb-4">Focus on Business, Not Books</h2>
                    <p className="text-xl text-neutral-100 mb-8">
                        Let us handle the accounting while you grow your business.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartService}
                            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                            START NOW
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-neutral-100 transition-all">
                            TALK TO EXPERT
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}





