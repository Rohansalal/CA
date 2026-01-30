import { HandHeart, CheckCircle, FileText, Clock, ArrowRight, Wallet, AlertCircle, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function TrustRegistration() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartRegistration = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'Trust Registration' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'Trust Registration' } });
        }
    };

    const features = [
        {
            icon: HandHeart,
            title: 'Charitable Purpose',
            description: 'Established for religious or charitable purposes.',
        },
        {
            icon: Bookmark,
            title: 'Tax Exemptions',
            description: 'Eligible for 12A and 80G tax exemptions (if charitable).',
        },
        {
            icon: Wallet,
            title: 'Asset Protection',
            description: 'Efficient way to manage and protect assets for beneficiaries.',
        },
        {
            icon: Clock,
            title: 'Perpetuity',
            description: 'Can be created for perpetuity (except for private specific trusts).',
        },
    ];

    const benefits = [
        'Tax exemptions on income (12A Registration)',
        'Donors get tax deduction (80G Registration)',
        'Legal recognition for social work',
        'Efficient succession planning (Private Trust)',
        'Control over usage of funds/assets',
        'Can receive foreign funds (FCRA required)',
        'Minimal government intervention',
        'Simple compliance compared to Section 8'
    ];

    const documents = [
        'PAN & Aadhaar of Settlor (Author)',
        'PAN & Aadhaar of Trustees (Min 2)',
        'Proof of Registered Office (Electricity Bill)',
        'NOC from Landlord',
        'Trust Deed (Drafted by us)',
        'Passport size photos of all parties',
        'Two Witnesses with ID proof',
    ];

    const dataRequired = [
        'Name of the Trust',
        'Address of Trust Office',
        'Objects of the Trust',
        'Trustee Details (Name, Age, Address)',
        'Consolidated Fund Amount',
        'Rules for Trustee Appointment'
    ];

    const process = [
        {
            step: 'Deciding Name & Objectives',
            description: 'Finalizing the name and charitable objects of the trust.',
            time: 'Day 1',
        },
        {
            step: 'Drafting Trust Deed',
            description: 'Legal drafting of the deed containing all rules and regulations.',
            time: 'Day 2-3',
        },
        {
            step: 'Stamp Paper',
            description: 'Printing the deed on non-judicial stamp paper (Value depends on State).',
            time: 'Day 4',
        },
        {
            step: 'Registration',
            description: 'Visit the Local Sub-Registrar office for signing and registration.',
            time: 'Day 5-10',
        },
        {
            step: 'PAN Application',
            description: 'Applying for PAN card of the Trust after Deed registration.',
            time: 'Day 11-15',
        },
    ];

    const pricing = [
        {
            plan: 'Basic',
            price: '₹5,999',
            features: [
                'Trust Deed Drafting',
                'Trust PAN Application',
                'Guidance on Registration',
                'Digital Consultation'
            ]
        },
        {
            plan: 'Complete',
            price: '₹12,499',
            desc: 'Best for NGOs',
            features: [
                'Trust Deed Drafting',
                'Registration Assistance at Sub-Registrar',
                'Trust PAN Card',
                '12A & 80G Application',
                'Bank Account Support'
            ]
        },
        {
            plan: 'FCRA',
            price: '₹24,999',
            features: [
                'All Complete Features',
                'Niti Aayog Registration',
                'DARPAN Registration',
                'CSR-1 Filing',
                'Yearly Compliance Guidance'
            ]
        }
    ];

    const faqs = [
        {
            q: 'Is my presence required?',
            a: 'Yes, the Settlor (Author) and two witnesses must physically visit the Sub-Registrar office. Trustees availability is also preferred, though sometimes exempt.',
        },
        {
            q: 'How many trustees are required?',
            a: 'Minimum two trustees are required to form a trust. There is no maximum limit.',
        },
        {
            q: 'Is stamp duty extra?',
            a: 'Yes, stamp duty is payable to the state government and varies by state and the value of property settled in the trust.',
        },
        {
            q: 'Can a trust be revoked?',
            a: 'A public charitable trust is generally irrevocable. A private trust can be revoked if provision is made in the deed.',
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10">
                    <HandHeart className="w-96 h-96 -mr-20 -mt-20" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-semibold mb-6 border border-white/20">
                            Private & Public Trusts
                        </div>
                        <h1 className="text-4xl text-white md:text-6xl font-bold mb-6 leading-tight">
                            Trust Registration <br />
                            <span className="text-white">Secure Legacy & Charity</span>
                        </h1>
                        <p className="text-xl text-white leading-relaxed mb-8 max-w-2xl">
                            Register a trust for charitable causes or for family estate planning. Complete legal support with 12A/80G registration.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg border border-white/20 backdrop-blur-sm">
                                <Clock className="w-5 h-5 text-accent" />
                                <span className="font-medium">10-15 Days</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg border border-white/20 backdrop-blur-sm">
                                <CheckCircle className="w-5 h-5 text-accent" />
                                <span className="font-medium">Tax Benefits</span>
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

            {/* Benefits Section */}
            <section className="py-20 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">Why Register a Trust?</h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Trusts are the oldest form of charitable organization in India. They are easy to register and manage.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm border border-neutral-100">
                                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700 text-sm font-medium">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white p-8 lg:p-10 rounded-3xl shadow-xl border border-neutral-200 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100 rounded-bl-full -z-0"></div>
                            <h3 className="text-2xl font-bold text-primary mb-6 relative z-10">Important Note</h3>
                            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl mb-6 relative z-10">
                                <div className="flex gap-4">
                                    <AlertCircle className="w-8 h-8 text-orange-600 flex-shrink-0" />
                                    <div>
                                        <p className="text-orange-800 font-bold text-lg">Physical Presence Required</p>
                                        <p className="text-orange-700 text-sm mt-1 leading-relaxed">
                                            The Settlor and 2 Witnesses usually need to be physically present at the Sub-Registrar office for trust deed registration.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Documents & Data */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Documents */}
                        <div>
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Required Documents</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                KYC and Property Proofs
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
                        {/* Data Needed */}
                        <div>
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Information Checklist</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Details for Deed Drafting
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

            {/* Process */}
            <section className="py-16 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Registration Process</h2>
                        <p className="text-lg text-neutral-600">Step-by-step formation guide</p>
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
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Registration Packages</h2>
                        <p className="text-lg text-gray-600">Start your NGO or Private Trust today.</p>
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
                                    <span className="text-gray-500"> + Stamp Duty</span>
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

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Register Your Trust Today</h2>
                    <p className="text-xl text-blue-100 mb-10">
                        Reliable legal support for setting up your charitable or family trust.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartRegistration}
                            className="px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl inline-flex items-center justify-center gap-2"
                        >
                            REGISTER NOW
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
