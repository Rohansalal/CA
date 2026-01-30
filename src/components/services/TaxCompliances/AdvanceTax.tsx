import { Calculator, CheckCircle, FileText, Clock, ArrowRight, AlertCircle, TrendingUp, Shield, Calendar, Percent } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function AdvanceTax() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartService = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'Advance Tax Calculation' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'Advance Tax Calculation' } });
        }
    };

    const liableEntities = [
        {
            type: 'Salaried Employees',
            description: 'If you have other income (Rent, Interest, Capital Gains) not declared to employer.',
            icon: Calculator,
            features: ['Rent Income', 'Bank Interest', 'Stock Market Gains', 'Dividend Income'],
        },
        {
            type: 'Business & Profession',
            description: 'Freelancers, Professionals & Business owners with tax liability > ₹10,000.',
            icon: TrendingUp,
            features: ['Presumptive Tax', 'Regular Business', 'Consultants', 'Freelancers'],
        },
        {
            type: 'Capital Gains',
            description: 'Provide for tax on Capital Gains (Shares, Property, Mutual Funds) in the installment post accrual.',
            icon: Percent,
            features: ['Property Sale', 'Share Trading', 'Mutual Funds', 'Crypto Gains'],
        },
    ];

    const benefits = [
        'Avoid Interest Penalty u/s 234B (1% per month)',
        'Avoid Interest Penalty u/s 234C (Deferment)',
        'Better Cash Flow Management',
        'Reduced Year-End Tax Burden',
        'Compliance with Income Tax Regulation',
        'Avoid Tax Notices',
    ];

    const criticalConsiderations = [
        {
            title: 'Threshold Limit',
            description: 'Mandatory if total tax liability for the year is ₹10,000 or more.',
            icon: AlertCircle,
        },
        {
            title: 'Senior Citizens',
            description: 'Exempt if age > 60 years and no income from business/profession.',
            icon: Shield,
        },
        {
            title: 'Interest Implications',
            description: '1% regular interest + 1% deferment interest is charged on shortfall.',
            icon: Percent,
        },
        {
            title: 'Due Dates',
            description: 'Strict adherence to quarterly due dates is required (15th June/Sep/Dec/Mar).',
            icon: Calendar,
        },
    ];

    const documents = [
        'Salary Slips (if employed)',
        'Form 16/16A (TDS Certificates)',
        'Bank Statements (for Interest)',
        'Investment Proofs (80C, 80D etc.)',
        'Capital Gain Statements',
        'Previous Year ITR',
        'Details of Other Income',
    ];

    const dataRequired = [
        'Estimated Annual Income',
        'TDS Deducted till date',
        'Tax Challans paid (if any)',
        'Deduction Details',
        'Losses brought forward',
        'Residential Status',
        'Bank Account Details'
    ];

    const process = [
        {
            step: 'Income Estimation',
            description: 'Projecting total income from all sources for the financial year',
            time: 'Day 1',
        },
        {
            step: 'Deductions Check',
            description: 'Calculating applicable deductions (Chapter VI-A) to lower tax',
            time: 'Day 1',
        },
        {
            step: 'Tax Computation',
            description: 'Calculating tax, surcharge and cess. Deducting TDS and Relief.',
            time: 'Day 2',
        },
        {
            step: 'Challan Generation',
            description: 'Generating Form 280 for payment of net payable amount',
            time: 'Instant',
        },
        {
            step: 'Payment & Recording',
            description: 'Payment via Netbanking/UPI and saving Challan details',
            time: 'Day 2',
        },
        {
            step: 'Ledger Update',
            description: 'Updating tax records for Year-End Filing',
            time: 'Final'
        }
    ];

    const pricing = [
        {
            plan: 'One Shot',
            price: '₹999',
            desc: 'Per Installment',
            features: [
                'Income Estimation',
                'Tax Calculation',
                'Challan Generation',
                'Payment Support'
            ]
        },
        {
            plan: 'Annual',
            price: '₹2,999',
            desc: 'All 4 Installments',
            features: [
                'Quarterly Calculations',
                'Payment Reminders',
                'Challan Generation',
                'Priority Support'
            ]
        },
        {
            plan: 'Comprehensive',
            price: '₹4,999',
            features: [
                'Advance Tax Service',
                'ITR Filing Included',
                'Tax Planning',
                'Call with CA'
            ]
        }
    ];

    const faqs = [
        {
            q: 'Who is liable to pay Advance Tax?',
            a: 'Any assessee whose tax liability for the financial year (after reducing TDS) is ₹10,000 or more.',
        },
        {
            q: 'What are the due dates?',
            a: 'Usually 15th June (15%), 15th Sept (45%), 15th Dec (75%), and 15th March (100%). For Presumptive scheme (44AD), 100% by 15th March.',
        },
        {
            q: 'Are Senior Citizens exempt?',
            a: 'Yes, resident senior citizens (60+) not having income from business or profession are not required to pay advance tax.',
        },
        {
            q: 'Can I pay advance tax after the due date?',
            a: 'Yes, but you will be liable to pay interest u/s 234B and 234C for the period of delay.',
        },
        {
            q: 'How do I pay Advance Tax?',
            a: 'It can be paid online/offline using Challan 280. Select Code (100) for Advance Tax.',
        },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4">
                            Pay As You Earn
                        </div>
                        <h1 className="text-3xl lg:text-5xl text-white mb-4">Advance Tax Calculation</h1>
                        <p className="text-xl text-neutral-100 leading-relaxed mb-6">
                            Avoid interest penalties u/s 234B & 234C. Expert calculation and timely payment assistance for individuals and businesses.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Clock className="w-5 h-5 text-accent" />
                                <span>Quarterly Deadlines</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Shield className="w-5 h-5 text-accent" />
                                <span>100% compliant</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Liable Entities */}
            <section className="py-16 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        {liableEntities.map((item, index) => (
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
                                Documents to estimate income accurately
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Data Required</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Information needed for computation
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
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Calculation to Payment</h2>
                        <p className="text-lg text-neutral-600">Step by step process to pay advance tax</p>
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
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Service Packages</h2>
                        <p className="text-lg text-gray-600">Flexible plans for your needs</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {pricing.map((plan, index) => (
                            <div key={index} className={`relative bg-white rounded-2xl shadow-lg border ${index === 1 ? 'border-accent shadow-xl scale-105 z-10' : 'border-neutral-200'} p-8 flex flex-col`}>
                                {index === 1 && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                        Best Value
                                    </div>
                                )}
                                <h3 className="text-xl font-bold text-gray-900 mb-6">{plan.plan}</h3>
                                <div className="mb-8">
                                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                                    <span className="text-gray-500"> /assessment</span>
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
                    <h2 className="text-3xl lg:text-4xl text-white mb-4">Need Help with Advance Tax?</h2>
                    <p className="text-xl text-neutral-100 mb-8">
                        Get expert assistance to calculate and pay your tax liability on time.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartService}
                            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                            CALCULATE NOW
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
