import { Store, CheckCircle, FileText, Clock, ArrowRight, Shield, UserCheck, Briefcase, Calculator } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function LabourRegistration() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartService = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'Shop & Establishment Act' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'Shop & Establishment Act' } });
        }
    };

    const licenseTypes = [
        {
            type: 'Shop Act Intimation',
            description: 'For Shops with < 10 Employees',
            icon: Store,
            features: ['Instant Approval', 'Lifetime Validity', 'Small Businesses'],
        },
        {
            type: 'Shop Act Registration',
            description: 'For Shops with > 10 Employees',
            icon: Building2,
            features: ['Formal Registration', 'Requires Inspection', 'Renewable'],
        },
        {
            type: 'Contract Labour License',
            description: 'For Contractors supplying labor',
            icon: UserCheck,
            features: ['CLRA License', 'Principal Employer', 'Contractor'],
        },
    ];

    const benefits = [
        'Legal Proof of Business Existence',
        'Mandatory for Opening Current Bank Account',
        'Required for Payment Gateway integration',
        'Compliance with State Labor Laws',
        'Avoid Police/Inspector Harrassment',
        'Defines working hours & holidays for employees',
        'Necessary for Govt Tenders',
        'Easier Loan Processing'
    ];

    const documents = [
        'Photo of Shop with Name Board (Banner)',
        'Aadhaar Card of Proprietor/Partners',
        'PAN Card of Business/Proprietor',
        'Address Proof (Electricity Bill/Rent Agreement)',
        'Passport Size Photo of Applicant',
        'Signature of Applicant',
    ];

    const process = [
        {
            step: 'Data Collection',
            description: 'Uploading details & shop photo',
            time: '15 Mins',
        },
        {
            step: 'Submission',
            description: 'Filing on State Labor Dept Portal',
            time: '30 Mins',
        },
        {
            step: 'Fee Payment',
            description: 'Payment of Government Challan',
            time: 'Instant',
        },
        {
            step: 'Certificate',
            description: 'Generation of "Gumasta" / License',
            time: '1-3 Days',
        },
    ];

    const pricing = [
        {
            plan: 'Shop Act (Intimation)',
            price: '₹1,499',
            desc: '< 10 Employees',
            features: [
                'Application Filing',
                'Govt Challan Payment',
                'Certificate Generation',
                'Consultation'
            ]
        },
        {
            plan: 'Shop Act (Reg)',
            price: '₹3,999',
            desc: '> 10 Employees',
            features: [
                'Detailed Application',
                'Register Maintenance Guide',
                'Inspection Handling',
                'Consultation'
            ]
        },
        {
            plan: 'Labor License',
            price: '₹4,999',
            desc: 'Contractor',
            features: [
                'CLRA Application',
                'Form V from Principal',
                'Challan Payment',
                'License Generation'
            ]
        }
    ];

    const faqs = [
        {
            q: 'What is Gumasta?',
            a: 'Gumasta is the local name for Shop & Establishment Registration in some states like Maharashtra and MP. It is the most basic license required to run any commercial establishment.',
        },
        {
            q: 'Is it mandatory for home business?',
            a: 'If you are running a commercial activity from home and require a current bank account, banks will ask for this certificate as proof of business.',
        },
        {
            q: 'What constitutes a "Shop"?',
            a: '"Shop" means any premises where goods are sold, either by retail or wholesale, or where services are rendered to customers. It includes offices, godowns, storerooms, etc.',
        },
        {
            q: 'Is Physical location mandatory?',
            a: 'Yes, Shop Act is location-specific. You must have a physical address (even if residential) to apply. The photo of the premises with a name board is often a mandatory document.',
        },
    ];

    // Helper icon
    function Building2(props: any) {
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
                <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                <path d="M10 6h4" />
                <path d="M10 10h4" />
                <path d="M10 14h4" />
                <path d="M10 18h4" />
            </svg>
        )
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4">
                            State Labor Law
                        </div>
                        <h1 className="text-3xl lg:text-5xl text-white mb-4">Shop & Establishment Registration</h1>
                        <p className="text-xl text-neutral-100 leading-relaxed mb-6">
                            Commonly known as "Gumasta" or "Shop Act". The fundamental proof of business for opening a Current Bank Account.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Briefcase className="w-5 h-5 text-accent" />
                                <span>Bank Account Proof</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Clock className="w-5 h-5 text-accent" />
                                <span>1-3 Days Process</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* License Types Grid */}
            <section className="py-16 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        {licenseTypes.map((type, index) => (
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

            {/* Benefits Section */}
            <section className="py-16 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 text-left">
                        <div>
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Why do you need it?</h2>
                            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                                It acts as a primary identity proof for any commercial entity. Most banks will not open a Current Account without it.
                            </p>
                            <div className="space-y-3">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                        <span className="text-neutral-700">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="bg-white p-8 lg:p-10 rounded-3xl shadow-xl border border-neutral-200 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-green-100 rounded-bl-full -z-0"></div>
                                <h3 className="text-2xl font-bold text-primary mb-6 relative z-10">Lifetime Validity</h3>
                                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl mb-6 relative z-10">
                                    <div className="flex gap-4">
                                        <Shield className="w-8 h-8 text-green-600 flex-shrink-0" />
                                        <div>
                                            <p className="text-green-800 font-bold text-lg">No Renewal Needed</p>
                                            <p className="text-green-700 text-sm mt-1 leading-relaxed">
                                                For small establishments (0-9 employees), the Simple Intimation Receipt is valid for a lifetime in most states, saving you from annual renewal hassles.
                                            </p>
                                        </div>
                                    </div>
                                </div>
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
                                Simple KYC documents
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Registration Process</h2>
                            <div className="space-y-6">
                                {process.map((step, index) => (
                                    <div key={index} className="flex gap-6 group bg-white border border-neutral-200 p-6 rounded-xl hover:shadow-md transition-all">
                                        <div className="flex flex-col items-center">
                                            <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition-transform">
                                                {index + 1}
                                            </div>
                                            {index !== process.length - 1 && <div className="w-0.5 h-full bg-gray-200 my-2"></div>}
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center mb-2 gap-4">
                                                <h4 className="font-bold text-primary text-lg">{step.step}</h4>
                                                <span className="text-xs font-semibold bg-accent/10 text-accent px-2 py-1 rounded">{step.time}</span>
                                            </div>
                                            <p className="text-neutral-600 text-sm">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-16 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Registration Fees</h2>
                        <p className="text-lg text-neutral-600">Get your license online</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {pricing.map((plan, index) => (
                            <div key={index} className={`relative bg-white rounded-2xl shadow-lg border ${index === 0 ? 'border-accent shadow-xl scale-105 z-10' : 'border-neutral-200'} p-8 flex flex-col`}>
                                {index === 0 && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                        {plan.desc}
                                    </div>
                                )}
                                <h3 className="text-xl font-bold text-gray-900 mb-6">{plan.plan}</h3>
                                <div className="mb-8">
                                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
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
                                    className={`w-full py-3 rounded-xl font-bold transition-all ${index === 0
                                        ? 'bg-accent text-white hover:bg-accent/90 shadow-lg hover:shadow-accent/30'
                                        : 'bg-primary/5 text-primary hover:bg-primary hover:text-white'
                                        }`}
                                >
                                    Register Now
                                </button>
                                {index !== 2 && <p className="text-xs text-center mt-2 text-gray-400">*Govt Fee is Nil/Low for intimation</p>}
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
                    <h2 className="text-3xl lg:text-4xl text-white mb-4">Open A Current Account</h2>
                    <p className="text-xl text-neutral-100 mb-8">
                        Get your Shop Act Registration today to start your banking.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartService}
                            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                            GET SHOP ACT
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
