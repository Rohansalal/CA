import { FileText, CheckCircle, PieChart, Clock, ArrowRight, Shield, TrendingUp, DollarSign, Calendar, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function ITRFiling() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartService = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'ITR Filing' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'ITR Filing' } });
        }
    };

    const itrTypes = [
        {
            type: 'Salaried Individuals',
            description: 'For employees with salary income, one house property, and other sources.',
            icon: FileText,
            features: ['Salary (Form 16)', 'House Rent Allowance', 'Standard Deduction', '80C Investments'],
        },
        {
            type: 'Capital Gains & Crypto',
            description: 'For taxes on stock market, mutual funds, property, and crypto assets.',
            icon: TrendingUp,
            features: ['Stock Market Gains', 'Property Sale', 'Crypto VDA', 'Foreign Assets'],
        },
        {
            type: 'Business & Profession',
            description: 'For freelancers, professionals, and small business owners (Presumptive).',
            icon: PieChart,
            features: ['Presumptive Income', 'Business Expenses', 'Depreciation', 'Books of Accounts'],
        },
    ];

    const benefits = [
        'Quick & Accurate Filing',
        'Maximum Tax Refund',
        'Expert Notice Management',
        'Loan & Visa Documentation',
        'Carry Forward of Losses',
        'Claim TDS Refunds',
    ];

    const criticalConsiderations = [
        {
            title: 'Due Date',
            description: '31st July is the deadline for non-audit cases. File on time to avoid fees.',
            icon: Calendar,
        },
        {
            title: 'Late Fees',
            description: 'Penalty of up to ₹5,000 u/s 234F for late filing after due date.',
            icon: DollarSign,
        },
        {
            title: 'Defective Return',
            description: 'Mismatches with AIS/TIS can lead to defective return notices.',
            icon: AlertCircle,
        },
        {
            title: 'Revised Return',
            description: 'Errors can be corrected by filing a Revised Return before 31st Dec.',
            icon: Shield,
        },
    ];

    const documents = [
        'PAN & Aadhaar Card',
        'Form 16 (for Salaried)',
        'Bank Statements (Interest Income)',
        'Investments Proof (LIC, PPF etc)',
        'Home Loan Certificate',
        'Capital Gains Statement (if any)',
        'Form 26AS & AIS/TIS',
    ];

    const dataRequired = [
        'Total Salary Income',
        'Interest from Savings/FD',
        'Dividend Income',
        'Details of Sold Assets',
        'Rental Income Details',
        'Deduction Details (80C, 80D)',
        'Bank Account for Refund'
    ];

    const process = [
        {
            step: 'Document Upload',
            description: 'Upload Form 16, Bank Statements, and other proofs on our portal.',
            time: 'Day 1',
        },
        {
            step: 'Expert Review',
            description: 'Our CA expert reviews documents and matches with 26AS/AIS.',
            time: 'Day 1',
        },
        {
            step: 'Tax Computation',
            description: 'Preparation of draft computation to maximize refund/minimize tax.',
            time: 'Day 2',
        },
        {
            step: 'Customer Approval',
            description: 'Sharing summary with you for confirmation before final filing.',
            time: 'Day 2',
        },
        {
            step: 'Filing & Verification',
            description: 'Filing the return and assisting with E-Verification.',
            time: 'Instant',
        },
        {
            step: 'Acknowledgement',
            description: 'Sending ITR-V and Computation for your records.',
            time: 'Final'
        }
    ];

    const pricing = [
        {
            plan: 'Salaried',
            price: '₹799',
            desc: 'ITR-1',
            features: [
                'Salary Income',
                'Single House Property',
                'Interest Income',
                'Tax Computation',
            ]
        },
        {
            plan: 'Capital Gains',
            price: '₹1,999',
            desc: 'ITR-2/3',
            features: [
                'Stocks/MF Gains',
                'Multiple House Property',
                'Crypto Income',
                'Business Income (Non-Audit)',
            ]
        },
        {
            plan: 'Business/Pro',
            price: '₹2,499',
            desc: 'ITR-3/4',
            features: [
                'Business/Profession Income',
                'Presumptive Taxation',
                'Balance Sheet Preparation',
                'Profit & Loss Account'
            ]
        }
    ];

    const faqs = [
        {
            q: 'Is it mandatory to file ITR?',
            a: 'Yes, if your gross total income exceeds the basic exemption limit (₹2.5L or ₹3L under new regime), it is mandatory.',
        },
        {
            q: 'Can I claim a refund for TDS deducted?',
            a: 'Yes, if your tax liability is less than the TDS deducted, you can claim the excess amount as a refund by filing ITR.',
        },
        {
            q: 'What is the difference between Old and New Regime?',
            a: 'Old regime allows deductions like 80C, HRA, etc. New regime offers lower tax rates but disallows most deductions. We help you choose the best one.',
        },
        {
            q: 'What happens if I miss the due date?',
            a: 'You can file a Belated Return until 31st December with a late fee. You cannot carry forward losses in a belated return.',
        },
        {
            q: 'Do I need to send physical documents?',
            a: 'No, the entire process is online. Sending physical ITR-V to Bangalore is also not required if you e-Verify using Aadhaar OTP.',
        },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4">
                            Income Tax Returns
                        </div>
                        <h1 className="text-3xl lg:text-5xl text-white mb-4">Expert ITR Filing</h1>
                        <p className="text-xl text-neutral-100 leading-relaxed mb-6">
                            File your Income Tax Returns with India's trusted tax experts. We ensure 100% accuracy, maximum refunds, and complete peace of mind.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Clock className="w-5 h-5 text-accent" />
                                <span>Fast Processing</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <DollarSign className="w-5 h-5 text-accent" />
                                <span>Max Refund Guarantee</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ITR Types */}
            <section className="py-16 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        {itrTypes.map((item, index) => (
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Why File ITR?</h2>
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
                                Documents needed for accurate filing
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Information Needed</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Key details to keep handy
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
                        <p className="text-lg text-neutral-600">From upload to acknowledgement in 3 steps</p>
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
                        <p className="text-lg text-gray-600">Choose plan based on your income sources.</p>
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
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to File?</h2>
                    <p className="text-xl text-blue-100 mb-10">
                        File early to get early refunds.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartService}
                            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                            FILE ITR NOW
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
