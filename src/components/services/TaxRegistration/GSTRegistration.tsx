import { Receipt, CheckCircle, FileText, Clock, ArrowRight, AlertCircle, TrendingUp, Shield, Globe, ShoppingCart, Percent } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function GSTRegistration() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartRegistration = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'GST Registration' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'GST Registration' } });
        }
    };

    const gstTypes = [
        {
            type: 'Regular Scheme',
            description: 'Standard GST registration for most businesses. Mandatory if turnover > ₹40L (Goods) / ₹20L (Services).',
            icon: Receipt,
            features: ['Can claim Input Tax Credit (ITC)', 'No turnover limit', 'Monthly/Quarterly returns', 'Inter-state sales allowed'],
        },
        {
            type: 'Composition Scheme',
            description: 'Simplified scheme for small businesses with turnover up to ₹1.5 Crores.',
            icon: Percent,
            features: ['Lower fixed tax rate (1% to 6%)', 'Cannot claim ITC', 'Quarterly returns', 'Cannot sell inter-state'],
        },
        {
            type: 'Casual Taxable Person',
            description: 'For temporary business setup (exhibitions, seasonal sales) in a state where you don’t have a fixed place.',
            icon: Clock,
            features: ['Valid for 90 days', 'Advance tax deposit required', 'Cannot claim full ITC', 'Standard compliance'],
        },
    ];

    const benefits = [
        'Legal recognition as a supplier of goods/services',
        'Seamless flow of Input Tax Credit (ITC)',
        'Legally authorized to sell online (E-commerce)',
        'Ability to bid for Government Tenders',
        'Boosts credibility with bank & suppliers',
        'One Nation, One Tax structure',
        'Composition scheme option for lower tax liability',
        'Automated and transparent online process',
    ];

    const criticalConsiderations = [
        {
            title: 'Mandatory Compliance',
            description: 'Monthly/Quarterly returns are mandatory even if there is zero business (Nil Return).',
            icon: AlertCircle,
        },
        {
            title: 'Inter-State Trade',
            description: 'Registration is mandatory for inter-state supply, regardless of turnover limit.',
            icon: Globe,
        },
        {
            title: 'Input Tax Credit',
            description: 'ITC can only be claimed if your supplier has filed their returns and paid tax.',
            icon: TrendingUp,
        },
        {
            title: 'Physical Verification',
            description: 'Department may conduct physical verification of business premises in certain cases.',
            icon: Shield,
        },
    ];

    const documents = [
        'PAN Card of Business/Applicant',
        'Aadhaar Card of Promoters/Directors',
        'Proof of Business Registration (Inc. Cert/Partnership Deed)',
        'Address Proof of Place of Business (Rent Agreement/Electricity Bill)',
        'Cancelled Cheque / Bank Statement',
        'Digital Signature Certificate (for Company/LLP)',
        'Letter of Authorization / Board Resolution',
        'Passport Size Photo of Promoters',
    ];

    const mandatoryDeclarations = [
        'Nature of Business Activity (Trader/Manufacturer/Service)',
        'List of Top 5 Goods/Services with HSN/SAC Codes',
        'State Specific Registration Details (PT, Shop Act)',
        'NOC from Property Owner (if rented)',
        'Consent Letter (if owned by relative)',
        'Email and Mobile Number of Authorized Signatory',
        'Jurisdiction Details (Ward/Circle)',
    ];

    const registrationSteps = [
        {
            step: 'TRN Generation',
            description: 'Generate Temporary Reference Number (TRN) using PAN, Email, and Mobile',
            time: 'Instant',
        },
        {
            step: 'Application Filing',
            description: 'Fill Part-B of REG-01 with business, promoter, and bank details',
            time: '1 Day',
        },
        {
            step: 'Aadhaar Authentication',
            description: 'E-KYC authentication of primary authorized signatory via OTP',
            time: 'Instant',
        },
        {
            step: 'ARN Generation',
            description: 'Application Reference Number generated after successful submission',
            time: 'Instant',
        },
        {
            step: 'Department Processing',
            description: 'Tax Officer scrutinizes the application and documents',
            time: '3-7 Days',
        },
        {
            step: 'Query Resolution',
            description: 'Reply to any clarification (SCN) raised by the officer (if any)',
            time: 'As needed',
        },
        {
            step: 'Certificate Issue',
            description: 'Grant of Registration Certificate (Form REG-06) with GSTIN',
            time: 'Final Step',
        },
    ];

    const annualCompliances = [
        {
            compliance: 'Monthly/Quarterly Return',
            form: 'GSTR-3B',
            frequency: 'Monthly/Quarterly',
            dueDate: '20th/22nd/24th of next month',
        },
        {
            compliance: 'Outward Supply Return',
            form: 'GSTR-1',
            frequency: 'Monthly/Quarterly',
            dueDate: '11th/13th of next month',
        },
        {
            compliance: 'Annual Return',
            form: 'GSTR-9',
            frequency: 'Annual',
            dueDate: '31st December of next FY',
        },
    ];

    const upgradePaths = [
        {
            from: 'Composition Scheme',
            to: 'Regular Scheme',
            benefit: 'Claim ITC and Sell Inter-state',
            process: 'File CMP-04 for withdrawal from scheme',
        },
        {
            from: 'Regular Scheme',
            to: 'Composition Scheme',
            benefit: 'Lower tax rates and compliance',
            process: 'File CMP-02 before start of FY',
        },
    ];

    const pricing = [
        {
            plan: 'Standard',
            price: '₹1,499',
            desc: 'Registration',
            features: [
                'GST Registration',
                'TRN Generation',
                'Application Filing',
                'Clarification Reply'
            ]
        },
        {
            plan: 'Pro',
            price: '₹2,999',
            desc: 'Reg + 1 Month',
            features: [
                'GST Registration',
                '1st Month Return (Nil)',
                'GSTR-1 & 3B',
                'Billing Software Trial'
            ]
        },
        {
            plan: 'Premium',
            price: '₹9,999',
            features: [
                'GST Registration',
                '6 Months Return Filing',
                'Dedicated Accountant',
                'GST Advisory'
            ]
        }
    ];

    const faqs = [
        {
            q: 'Is GST registration mandatory for services below ₹20 Lakhs?',
            a: 'No, if your aggregate turnover is below ₹20 Lakhs (₹10 Lakhs in hill states) and you are not involved in inter-state supply, registration is optional.',
        },
        {
            q: 'Can I apply for GST voluntarily?',
            a: 'Yes, entering the GST regime voluntarily allows you to claim Input Tax Credit and expands your supplier/customer base who look for GST compliant vendors.',
        },
        {
            q: 'What is the penalty for not registering?',
            a: 'Offenders pay a penalty of 10% of the tax amount due subject to a minimum of ₹10,000. If proven intentional evasion, the penalty is 100% of the tax amount.',
        },
        {
            q: 'Do I need a commercial space for GST registration?',
            a: 'Not strictly commercial, but you need a physical address which can be verified. Even a residential address can be used with proper NOC and address proof.',
        },
        {
            q: 'Is a bank account mandatory at the time of registration?',
            a: 'Bank account details are not mandatory at the time of filing REG-01 but must be added within 45 days of grant of registration or before the first return filing.',
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
                        <h1 className="text-3xl lg:text-5xl text-white mb-4">GST Registration Online</h1>
                        <p className="text-xl text-neutral-100 leading-relaxed mb-6">
                            Get your 15-digit GSTIN completely online. Mandatory for businesses with turnover  ₹20L/₹40L and for inter-state trade.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Clock className="w-5 h-5 text-accent" />
                                <span>3-7 Working Days</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-accent" />
                                <span>100% Paperless</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* GST Types */}
            <section className="py-16 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        {gstTypes.map((type, index) => (
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
                                Scan and keep these documents ready
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
                                You will also need to provide details on:
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

            {/* Registration Process */}
            <section className="py-16 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Registration Process</h2>
                        <p className="text-lg text-neutral-600">From TRN to Certificate in 7 simple steps</p>
                    </div>
                    <div className="max-w-4xl mx-auto space-y-6">
                        {registrationSteps.map((step, index) => (
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

            {/* Annual Compliances */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Returns & Filing</h2>
                        <p className="text-lg text-neutral-600">Routine compliance for GST registered businesses</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {annualCompliances.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6 hover:shadow-2xl transition-all"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <FileText className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl text-primary mb-2 font-semibold">{item.compliance}</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-neutral-500">Form:</span>
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
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Switching Schemes?</h2>
                        <p className="text-lg text-neutral-600">Change your GST status based on your business needs</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {upgradePaths.map((option, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg border border-neutral-200 p-8 hover:shadow-2xl transition-all"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <Percent className="w-8 h-8 text-secondary" />
                                    <ArrowRight className="w-6 h-6 text-neutral-400" />
                                    <Receipt className="w-8 h-8 text-primary" />
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
                        <p className="text-lg text-gray-600">Transparent pricing for GST registration</p>
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
                                    <span className="text-gray-500"> /application</span>
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
                    <h2 className="text-3xl lg:text-4xl text-white mb-4">Ready to Get Your GSTIN?</h2>
                    <p className="text-xl text-neutral-100 mb-8">
                        Expert-assisted filing ensures no rejections and faster approval.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartRegistration}
                            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                            APPLY NOW
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-neutral-100 transition-all">
                            CHECK DOCUMENTS
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
