import { CreditCard, CheckCircle, FileText, Clock, ArrowRight, AlertCircle, User, Globe, Building2, Fingerprint } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../user-panel/contexts/AuthContext';

export function PANApplication() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartRegistration = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'PAN Application' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'PAN Application' } });
        }
    };

    const applicantTypes = [
        {
            type: 'Individual (Indian)',
            description: 'For Indian citizens residing in India or abroad.',
            icon: User,
            features: ['Form 49A', 'Aadhaar e-KYC available', 'Photo & Signature update', 'Instant e-PAN option'],
        },
        {
            type: 'Entities (Non-Individual)',
            description: 'For Companies, LLPs, Partnerships, Trusts, and NGOs.',
            icon: Building2,
            features: ['Form 49A', 'Incorporation Deed required', 'Auth Signatory KYC', 'No photo on card'],
        },
        {
            type: 'Foreign Citizens',
            description: 'For NRIs and Foreign Companies transacting in India.',
            icon: Globe,
            features: ['Form 49AA', 'Passport/OCI required', 'Apostilled documents', 'International dispatch'],
        },
    ];

    const benefits = [
        'Universal Valid Proof of Identity',
        'Mandatory for Income Tax Returns (ITR)',
        'Essential for Opening Bank Accounts',
        'Required for Buying/Selling Vehicles & Property',
        'Mandatory for Investments (Shares, MF)',
        'Claiming Income Tax Refunds',
        'Applying for Credit Cards/Loans',
        'Getting Telephone/Internet Connection',
    ];

    const criticalConsiderations = [
        {
            title: 'Aadhaar Link',
            description: 'Mandatory to link PAN with Aadhaar. Inoperative PAN leads to higher TDS.',
            icon: Fingerprint,
        },
        {
            title: 'Duplicate PAN',
            description: 'Possessing more than one PAN is illegal. Penalty of ₹10,000 applies.',
            icon: AlertCircle,
        },
        {
            title: 'Minor Applicant',
            description: 'PAN for minors does not have photo/signature. It must be updated after 18.',
            icon: User,
        },
        {
            title: 'Data Match',
            description: 'Name and DOB on PAN application must exactly match Aadhaar/Supporting Documents.',
            icon: FileText,
        },
    ];

    const documents = [
        'Aadhaar Card (Proof of Identity & Address)',
        'Voter ID / Passport / Driving License (Alternative)',
        'Birth Certificate (Proof of Date of Birth)',
        'Passport Size Photographs (2 Nos)',
        'Certificate of Incorporation (For Companies)',
        'Partnership Deed (For Firms)',
        'Trust Deed (For Trusts)',
        'NOC from Office Address (For Business)',
    ];

    const mandatoryDeclarations = [
        'Name as per Aadhaar',
        'Date of Birth / Incorporation',
        'Father’s Name (Even for married women)',
        'Residential Address',
        'Office Address (Mark for Communication)',
        'Mobile Number & Email ID',
        'Source of Income (Salary/Business/Other)',
        'AO Code (Area Code, AO Type, Range Code)',
    ];

    const process = [
        {
            step: 'Form Selection',
            description: 'Choosing Form 49A (Indian) or 49AA (Foreign) based on status',
            time: 'Instant',
        },
        {
            step: 'Data Entry',
            description: 'Filling applicant details carefully matching valid IDs',
            time: '1 Day',
        },
        {
            step: 'Payment',
            description: 'Payment of Govt Fee (₹107 for Indian, ₹1017 for Foreign dispatch)',
            time: 'Instant',
        },
        {
            step: 'KYC & Sign',
            description: 'Aadhaar OTP Authentication or Physical Document Submission',
            time: '1 Day',
        },
        {
            step: 'Processing',
            description: 'Validation by NSDL/UTIITSL and Income Tax Department',
            time: '5-10 Days',
        },
        {
            step: 'Dispatch',
            description: 'Delivery of Physical PAN Card to registered address',
            time: 'Final Step',
        },
    ];

    const relatedCompliances = [
        {
            compliance: 'Link Aadhaar',
            form: 'Online',
            frequency: 'One Time',
            dueDate: 'Immediate',
        },
        {
            compliance: 'Update Profile',
            form: 'e-Filing',
            frequency: 'As needed',
            dueDate: 'Before filing ITR',
        },
        {
            compliance: 'Correction',
            form: 'CSF Form',
            frequency: 'Event Based',
            dueDate: 'On change of name/addr',
        },
    ];

    const upgradePaths = [
        {
            from: 'Physical Mode',
            to: 'Paperless e-KYC',
            benefit: 'No need to send physical documents',
            process: 'Use Aadhaar OTP for signature',
        },
        {
            from: 'e-PAN Only',
            to: 'Physical Card',
            benefit: 'Get hard copy wallet size card',
            process: 'Apply for Reprint of PAN',
        },
    ];

    const pricing = [
        {
            plan: 'Individual',
            price: '₹499',
            desc: 'Indian Citizens',
            features: [
                'Form 49A Filing',
                'Govt Fees Included',
                'e-PAN Generation',
                'Dispatch Tracking'
            ]
        },
        {
            plan: 'Organization',
            price: '₹999',
            desc: 'Firm/Company',
            features: [
                'Form 49A Filing',
                'Govt Fees Included',
                'Document Scrutiny',
                'Correction Support'
            ]
        },
        {
            plan: 'Foreign / NRI',
            price: '₹2,999',
            features: [
                'Form 49AA Filing',
                'Govt Fees Included',
                'Intl Dispatch',
                'Priority Support'
            ]
        }
    ];

    const faqs = [
        {
            q: 'How long does it take to get a new PAN?',
            a: 'e-PAN is usually generated within 2-4 days. Physical PAN card takes about 10-15 working days to reach your address.',
        },
        {
            q: 'Can a minor apply for PAN?',
            a: 'Yes, a PAN can be allotted to a minor. The application is filed by a Representative Assessee (Parent/Guardian). No photo appears on minor’s PAN.',
        },
        {
            q: 'What should I do if my PAN has errors?',
            a: 'You need to file a "Request for New PAN Card or/and Changes or Correction in PAN Data" form along with supporting proofs for the correct details.',
        },
        {
            q: 'Is it mandatory to link PAN with bank account?',
            a: 'Yes, for receiving tax refunds and for high-value transactions, banks require your PAN to be linked to your account.',
        },
        {
            q: 'Can a foreign company apply for PAN?',
            a: 'Yes, foreign entities generating income in India must apply for PAN using Form 49AA.',
        },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4">
                            Permanent Account Number
                        </div>
                        <h1 className="text-3xl lg:text-5xl text-white mb-4">PAN Application & Correction</h1>
                        <p className="text-xl text-neutral-100 leading-relaxed mb-6">
                            Essential identity for every taxpayer. Apply for a new PAN, correct details, or request a reprint. Fast and totally online.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Clock className="w-5 h-5 text-accent" />
                                <span>e-PAN in 3 Days</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <CreditCard className="w-5 h-5 text-accent" />
                                <span>Lifetime Validity</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Applicant Types */}
            <section className="py-16 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        {applicantTypes.map((type, index) => (
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Power of PAN</h2>
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Documents Checklist</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Keep these ready for upload
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
                                Information required in Form 49A
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
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Application Process</h2>
                        <p className="text-lg text-neutral-600">Simple steps to get your PAN card</p>
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
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Post-PAN Actions</h2>
                        <p className="text-lg text-neutral-600">Things to do after receiving PAN</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {relatedCompliances.map((item, index) => (
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
                                        <span className="text-neutral-500">Method:</span>
                                        <span className="text-neutral-800 font-medium">{item.form}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-neutral-500">Frequency:</span>
                                        <span className="text-neutral-800 font-medium">{item.frequency}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-neutral-500">Time:</span>
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
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Application Modes</h2>
                        <p className="text-lg text-neutral-600">Choose the method that suits you</p>
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
                                    <Fingerprint className="w-8 h-8 text-primary" />
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
                        <p className="text-lg text-gray-600">Affordable PAN Application Services</p>
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
                                    <span className="text-gray-500"> /applicant</span>
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
                    <h2 className="text-3xl lg:text-4xl text-white mb-4">Need a PAN Card?</h2>
                    <p className="text-xl text-neutral-100 mb-8">
                        Apply online in minutes and get your PAN delivered to your doorstep.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartRegistration}
                            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                            APPLY NOW
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-neutral-100 transition-all">
                            TRACK STATUS
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}





