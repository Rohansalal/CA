import { FileText, CheckCircle, Clock, ArrowRight, AlertCircle, Building2, Wallet, PieChart, Shield, Calculator } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function TANApplication() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartRegistration = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'TAN Application' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'TAN Application' } });
        }
    };

    const tanTypes = [
        {
            type: 'New TAN Application',
            description: 'For businesses deducting tax for the first time. Apply using Form 49B.',
            icon: FileText,
            features: ['Proprietors & Firms', 'Companies & LLPs', 'Trusts & NGOs', 'Govt Authorities'],
        },
        {
            type: 'Change/Correction',
            description: 'Update address, name, or contact details in existing TAN database.',
            icon: Tool,
            features: ['Address Change', 'Details Correction', 'Re-issue of Letter', 'Online Verification'],
        },
        {
            type: 'TCS Registration',
            description: 'For businesses collecting tax at source (e.g., Scrap sales, Minerals, Luxury cars).',
            icon: Wallet,
            features: ['Tax Collection', 'Form 49B', 'Separate Returns', 'Sales Compliance'],
        },
    ];

    const benefits = [
        'Mandatory for deducting Tax at Source (TDS)',
        'Required for filing quarterly TDS Returns',
        'Necessary to issue Form 16 / 16A to deductees',
        'Avoids heavy penalty of ₹10,000 under Sec 272BB',
        'Essential for government tenders and payments',
        'Ensures compliance with Income Tax Act',
        'Lifetime validity (no renewal needed)',
        'Centralized tracking of tax deduction'
    ];

    const criticalConsiderations = [
        {
            title: 'Penalty Alert',
            description: 'Failure to obtain TAN can attract a flat penalty of ₹10,000.',
            icon: AlertCircle,
        },
        {
            title: 'Multiple TANs',
            description: 'Possessing more than one TAN for the same branch is illegal. It must be surrendered.',
            icon: Shield,
        },
        {
            title: 'Late Filing Fee',
            description: 'Delay in filing TDS returns attracts ₹200/day late fee + Interest.',
            icon: Clock,
        },
        {
            title: 'PAN Linking',
            description: 'TAN must be linked to a valid PAN. Incorrect PAN quoting leads to penalties.',
            icon: CheckCircle,
        },
    ];

    const documents = [
        'PAN Card of the Applicant (Entity/Proprietor)',
        'Certificate of Incorporation (Company/LLP)',
        'Partnership Deed (Partnership Firm)',
        'Trust Deed / Registration Certificate (Trust/NGO)',
        'Address Proof of Registered Office',
        'Aadhaar Card of Authorized Signatory',
        'Passport Size Photo (for Individual/HUF)',
        'Rubber Stamp of the Organization',
    ];

    const mandatoryDeclarations = [
        'AO Code (Area Code, AO Type, Range Code)',
        'Category of Deductor (Govt/Private)',
        'Details of Responsible Person',
        'Designation of Authorized Signatory',
        'Address Verification',
        'Email & Mobile for OTP',
        'Nature of Payments (Salary/Contract/Rent)',
    ];

    const process = [
        {
            step: 'Application Filing',
            description: 'Filling Form 49B with accurate deductor details',
            time: '1 Day',
        },
        {
            step: 'Fee Payment',
            description: 'Payment of Government processing fee',
            time: 'Instant',
        },
        {
            step: 'Document Submission',
            description: 'Sending signed acknowledgment to NSDL (if physical)',
            time: '1-2 Days',
        },
        {
            step: 'Verification',
            description: 'Scrutiny of documents by NSDL and IT Dept',
            time: '3-5 Days',
        },
        {
            step: 'Allotment',
            description: 'Generation of 10-digit TAN Number',
            time: '5-7 Days',
        },
        {
            step: 'Dispatch',
            description: 'Delivery of physical TAN allotment letter',
            time: '7-10 Days',
        },
    ];

    const relatedCompliances = [
        {
            compliance: 'TDS on Salary',
            form: 'Form 24Q',
            frequency: 'Quarterly',
            dueDate: '31st of next month',
        },
        {
            compliance: 'TDS on Non-Salary',
            form: 'Form 26Q',
            frequency: 'Quarterly',
            dueDate: '31st of next month',
        },
        {
            compliance: 'TDS on NRIs',
            form: 'Form 27Q',
            frequency: 'Quarterly',
            dueDate: '31st of next month',
        },
    ];

    const upgradePaths = [
        {
            from: 'Manual Filing',
            to: 'TDS Software',
            benefit: 'Automated challan & return generation',
            process: 'Use professional software',
        },
        {
            from: 'Late Filing',
            to: 'Regular Compliance',
            benefit: 'Save Interest and Late Fees',
            process: 'Adhere to due dates',
        },
    ];

    const pricing = [
        {
            plan: 'New Application',
            price: '₹999',
            desc: 'Form 49B',
            features: [
                'TAN Allotment',
                'Govt Fees Included',
                'Document Review',
                'Digital Acknowledgment'
            ]
        },
        {
            plan: 'Correction',
            price: '₹1,499',
            desc: 'Modification',
            features: [
                'Address/Name Change',
                'Database Update',
                'Data Validation',
                'Re-issue Letter'
            ]
        },
        {
            plan: 'TAN + TDS',
            price: '₹2,499',
            features: [
                'TAN Registration',
                '1st Quarter Return',
                'Compliance Guidance',
                'Software Setup'
            ]
        }
    ];

    const faqs = [
        {
            q: 'Is TAN mandatory for Individuals?',
            a: 'Yes, if an individual is running a business and requires a tax audit (turnover > 1Cr), or is deducting tax on payments like Rent/Contract/Commission above limits.',
        },
        {
            q: 'Can I use my PAN instead of TAN?',
            a: 'No, PAN and TAN are different. You cannot quote PAN for depositing TDS. You must have a TAN. However, for TDS on Property (Form 26QB), TAN is not required.',
        },
        {
            q: 'What is the validity of TAN?',
            a: 'Once allotted, TAN is valid for a lifetime unless surrendered or cancelled by the department.',
        },
        {
            q: 'How do I find my AO Code?',
            a: 'AO Code depends on your jurisdiction and category. It is available on the NSDL website search or we can assist you in finding the correct one.',
        },
        {
            q: 'What happens if I make a mistake in TAN application?',
            a: 'You can file a "Change/Correction" request using the form for "Changes or Correction in TAN data" to rectify errors.',
        },
    ];

    // Helper icon for Change/Correction
    function Tool(props: any) {
        return (
            <svg
                {...props}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        )
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4">
                            Tax Deduction Mechanism
                        </div>
                        <h1 className="text-3xl lg:text-5xl text-white mb-4">TAN Application Online</h1>
                        <p className="text-xl text-neutral-100 leading-relaxed mb-6">
                            Mandatory 10-digit number for businesses to Deduct Tax at Source (TDS). Apply new or correct existing TAN.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Clock className="w-5 h-5 text-accent" />
                                <span>5-7 Working Days</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Shield className="w-5 h-5 text-accent" />
                                <span>Lifetime Validity</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TAN Types */}
            <section className="py-16 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        {tanTypes.map((type, index) => (
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Why get TAN?</h2>
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
                                Documents vary based on entity type
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Application Details</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Information needed for Form 49B
                            </p>
                            <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 text-white">
                                <div className="space-y-3">
                                    {mandatoryDeclarations.map((clause, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                                            <span className="text-sm text-neutral-100">{clause}</span>
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
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Application Workflow</h2>
                        <p className="text-lg text-neutral-600">From Application to Allotment</p>
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

            {/* Related Compliances */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">TDS Returns & Filing</h2>
                        <p className="text-lg text-neutral-600">Mandatory compliances after getting TAN</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {relatedCompliances.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6 hover:shadow-2xl transition-all"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <Calculator className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl text-primary mb-2 font-semibold">{item.compliance}</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-neutral-500">Return Form:</span>
                                        <span className="text-neutral-800 font-medium">{item.form}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-neutral-500">Frequency:</span>
                                        <span className="text-neutral-800 font-medium">{item.frequency}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-neutral-500">Due Date:</span>
                                        <span className="text-accent font-medium">{item.dueDate}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upgrade Options */}
            <section className="py-16 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Improve Compliance</h2>
                        <p className="text-lg text-neutral-600">Streamline your TDS process</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {upgradePaths.map((option, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg border border-neutral-200 p-8 hover:shadow-2xl transition-all"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <FileText className="w-8 h-8 text-secondary" />
                                    <ArrowRight className="w-6 h-6 text-neutral-400" />
                                    <PieChart className="w-8 h-8 text-primary" />
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
                        <p className="text-lg text-gray-600">Get your TAN hassle-free.</p>
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
                                    <span className="text-gray-500"> /setup</span>
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
                                    onClick={handleStartRegistration}
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
                    <h2 className="text-3xl lg:text-4xl text-white mb-4">Apply for TAN Now</h2>
                    <p className="text-xl text-neutral-100 mb-8">
                        Professional assistance for quick and error-free TAN allotment.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartRegistration}
                            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                            GET TAN
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
