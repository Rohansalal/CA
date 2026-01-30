import { FileText, CheckCircle, Percent, Clock, ArrowRight, AlertCircle, Shield, Layers, Calendar, DollarSign, Users, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function TDSReturn() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartService = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'TDS Return Filing' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'TDS Return Filing' } });
        }
    };

    const returnTypes = [
        {
            type: 'Form 24Q (Salary)',
            description: 'Quarterly statement for Tax Deducted at Source (TDS) from "Salaries".',
            icon: Users,
            features: ['Employee details', 'Tax calculation', 'Challan mapping', 'Salary Annexure (Q4)'],
        },
        {
            type: 'Form 26Q (Other)',
            description: 'Quarterly statement for TDS on payments other than Salary (e.g. Professional fees, Rent).',
            icon: Layers,
            features: ['Vendor/Contractor details', 'Section-wise reporting', 'Nil/Lower deduction', 'Domestic payments'],
        },
        {
            type: 'Form 27Q (NRI)',
            description: 'Quarterly statement for TDS on payments made to Non-Residents or Foreign Companies.',
            icon: Globe,
            features: ['NRI Payments', 'DTAA benefits', 'Remittance details', 'Foreign currency'],
        },
    ];

    const benefits = [
        'Compliance with Income Tax Act, 1961',
        'Avoidance of Late Filing Fees (Section 234E)',
        'Prevention of Penalty for Non-Filing (Section 271H)',
        'Expenses allowed as business deduction',
        'Proper tax credit reflection in Deductee’s 26AS',
        'Avoidance of Interest on late payment',
        'Smooth processing of Form 16/16A',
        'Reduced litigation and scrutiny'
    ];

    const criticalConsiderations = [
        {
            title: 'Late Fee',
            description: '₹200 per day for every day of delay in filing, up to the TDS amount.',
            icon: Clock,
        },
        {
            title: 'Time Barring',
            description: 'TDS Returns cannot be filed after 1 year from the due date without penalty.',
            icon: AlertCircle,
        },
        {
            title: 'Interest',
            description: '1% to 1.5% per month interest on late deduction or payment of TDS.',
            icon: Percent,
        },
        {
            title: 'Certificate',
            description: 'Deadlines for issuing Form 16/16A are linked to return filing dates.',
            icon: FileText,
        },
    ];

    const documents = [
        'TAN (Tax Deduction and Collection Account Number)',
        'Payment Challans (CIN, BSR Code, Date, Amount)',
        'PAN and Names of all Deductees',
        'Nature of Payment & TDS Section Code',
        'Date of Deduction & Date of Payment',
        'Details of lower deduction certificate (if any)',
    ];

    const filingDueDates = [
        {
            quarter: 'Quarter 1 (Apr - Jun)',
            dueDate: '31st July',
        },
        {
            quarter: 'Quarter 2 (Jul - Sep)',
            dueDate: '31st October',
        },
        {
            quarter: 'Quarter 3 (Oct - Dec)',
            dueDate: '31st January',
        },
        {
            quarter: 'Quarter 4 (Jan - Mar)',
            dueDate: '31st May',
        },
    ];

    const process = [
        {
            step: 'Data Collection',
            description: 'Collecting TDS payment challans, deductee PANs, and deduction details',
            time: 'Day 1',
        },
        {
            step: 'Verification',
            description: 'Verifying PAN validity and challan status on TIN-NSDL/OLTAS',
            time: 'Day 2',
        },
        {
            step: 'FVU Generation',
            description: 'Preparing standard return file and validating with FVU utility',
            time: 'Day 2',
        },
        {
            step: 'Uploading',
            description: 'Uploading the encrypted file to the Income Tax Department portal',
            time: 'Instant',
        },
        {
            step: 'Acknowledgement',
            description: 'Generation of Token Number/Receipt for the filed return',
            time: 'Final',
        }
    ];

    const pricing = [
        {
            plan: 'Small Biz',
            price: '₹1,499',
            desc: '< 50 Entries',
            features: [
                'Data Validation',
                'Return Preparation',
                'Filing & Acknowledgement',
                'Challan Verification'
            ]
        },
        {
            plan: 'Corporate',
            price: '₹2,999',
            desc: '< 500 Entries',
            features: [
                'Bulk PAN Verification',
                'FVU Error Resolution',
                'Return Filing',
                'Form 16A Generation'
            ]
        },
        {
            plan: 'Enterprise',
            price: 'Custom',
            features: [
                'Unlimited Entries',
                'Dedicated Support',
                'Correction Statements',
                'Notice Management'
            ]
        }
    ];

    const faqs = [
        {
            q: 'What is the due date for TDS payments?',
            a: 'TDS deducted in a month must be deposited to the government by the 7th of the next month. For March, the due date is 30th April.',
        },
        {
            q: 'How much is the penalty for late filing?',
            a: 'Under Section 234E, there is a late fee of ₹200 per day until the return is filed. However, the total fee cannot exceed the TDS amount.',
        },
        {
            q: 'Can I revise my TDS return?',
            a: 'Yes, if you made a mistake in the original return, you can file a revision/correction statement to update deductee details or challan details.',
        },
        {
            q: 'Is TAN mandatory for TDS filing?',
            a: 'Yes, Tax Deduction and Collection Account Number (TAN) is mandatory for all deductors except for TDS on property sale (Form 26QB).',
        },
        {
            q: 'What happens if PAN of deductee is not available?',
            a: 'If PAN is not provided by the deductee, TDS must be deducted at a higher rate (usually 20%) under Section 206AA.',
        },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4">
                            Tax Deducted at Source
                        </div>
                        <h1 className="text-3xl lg:text-5xl text-white mb-4">TDS Return Filing</h1>
                        <p className="text-xl text-neutral-100 leading-relaxed mb-6">
                            Expert assistance for accurate and timely filing of quarterly TDS returns (Form 24Q, 26Q, 27Q). Avoid notices and late fees.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Calendar className="w-5 h-5 text-accent" />
                                <span>Quarterly Deadlines</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-accent" />
                                <span>Zero Errors</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Return Types */}
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Penalties & Dates</h2>
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Documents Needed</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Information required for accurate filing
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Due Date Calendar</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Mark these dates to avoid late fees
                            </p>
                            <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 text-white">
                                <div className="space-y-4">
                                    {filingDueDates.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between border-b border-white/20 pb-3 last:border-0 last:pb-0">
                                            <span className="font-medium text-white/90">{item.quarter}</span>
                                            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-md">
                                                <Clock className="w-4 h-4 text-accent" />
                                                <span className="text-sm font-bold">{item.dueDate}</span>
                                            </div>
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
                        <p className="text-lg text-neutral-600">Our systematic approach to zero-error filing</p>
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
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Service Plans</h2>
                        <p className="text-lg text-gray-600">Plans based on volume of deductees.</p>
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
                                    {plan.price !== 'Custom' && <span className="text-gray-500"> / quarter</span>}
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
                                    Start Filing
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
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">File Your TDS Returns Today</h2>
                    <p className="text-xl text-blue-100 mb-10">
                        Avoid 1.5% monthly interest and ₹200 daily late fees.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartService}
                            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                            FILE RETURN
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}


