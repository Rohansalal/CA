import { User, CheckCircle, FileText, Clock, ArrowRight, TrendingUp, AlertCircle, Users, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function HUFRegistration() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartRegistration = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'HUF Registration' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'HUF Registration' } });
        }
    };

    const features = [
        {
            icon: Users,
            title: 'Family Business',
            description: 'Ideal for businesses run by Hindu joint families.',
        },
        {
            icon: FileText,
            title: 'Separate Pan Card',
            description: 'HUF has its own PAN card and is taxed separately from members.',
        },
        {
            icon: TrendingUp,
            title: 'Tax Planning',
            description: 'Can be used as a tool for tax planning and capital formation.',
        },
        {
            icon: User,
            title: 'Karta Management',
            description: 'Managed by the head of the family (Karta).',
        },
    ];

    const benefits = [
        'Separate legal entity for tax purposes',
        'Tax savings through splitting of income',
        'Easy to form (Deed + PAN)',
        'Deductions under Section 80C available',
        'Capital accumulation for family',
        'Efficient family asset management',
        'Low compliance burden',
        'Continuity of business'
    ];

    const documents = [
        'PAN Card of Karta',
        'Aadhaar Card of Karta',
        'Proof of Family Business (Affidavit)',
        'HUF Deed (Drafting provided)',
        'Address Proof of Karta',
        'Bank Account Details',
    ];

    const dataRequired = [
        'Name of Karta',
        'Names of all Coparceners',
        'Name of the HUF',
        'Capital Contribution Amount',
        'Business Activities',
        'Address for Communication',
    ];

    const process = [
        {
            step: 'HUF Deed',
            description: 'Drafting of the HUF Deed on stamp paper declaring the formation.',
            time: 'Day 1-2',
        },
        {
            step: 'Notarization',
            description: 'Getting the Deed notarized makes it a valid legal document.',
            time: 'Day 3',
        },
        {
            step: 'PAN Application',
            description: 'Applying for PAN card in the name of the HUF.',
            time: 'Day 3-7',
        },
        {
            step: 'Bank Account',
            description: 'Opening a bank account in the name of the HUF using PAN & Deed.',
            time: 'Day 7+',
        },
    ];

    const pricing = [
        {
            plan: 'Basic',
            price: '₹2,999',
            features: [
                'HUF Deed Drafting',
                'HUF PAN Application',
                'Digital Consultation',
            ]
        },
        {
            plan: 'Standard',
            price: '₹5,999',
            desc: 'Most Popular',
            features: [
                'HUF Deed Drafting & Notary',
                'HUF PAN Card',
                'Bank Account Assistance',
                'Tax Planning Advice',
                'Udhyam Registration'
            ]
        },
        {
            plan: 'Premium',
            price: '₹11,999',
            features: [
                'All Standard Features',
                'GST Registration',
                'Trademark Filing',
                'Dedicated CA Support',
                'First Year Tax Filing Support'
            ]
        }
    ];

    const faqs = [
        {
            q: 'Who can be the Karta?',
            a: 'Usually, the senior-most male member of the family is the Karta. However, after recent amendments, a female can also be a Karta.',
        },
        {
            q: 'Can an HUF have members other than family?',
            a: 'No, an HUF consists only of persons lineally descended from a common ancestor, plus wives of male members.',
        },
        {
            q: 'Is separate tax return filing mandatory?',
            a: 'Yes, since HUF is a separate entity, it must file its own Income Tax Return if its income exceeds the basic exemption limit.',
        },
        {
            q: 'How is HUF taxed?',
            a: 'HUF is taxed at the same slab rates as an individual.',
        },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10">
                    <Users className="w-96 h-96 -mr-20 -mt-20" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4 border border-white/10">
                            Family Business
                        </div>
                        <h1 className="text-3xl lg:text-5xl text-white mb-4">HUF Registration</h1>
                        <p className="text-xl text-neutral-100 leading-relaxed mb-6">
                            Maximize tax savings by creating a Hindu Undivided Family (HUF) unit. Secure your family's financial future.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Clock className="w-5 h-5 text-accent" />
                                <span>5-7 Days Process</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-accent" />
                                <span>Tax Benefits</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-16 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-neutral-200 hover:shadow-2xl transition-all">
                                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                                    <feature.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl text-primary mb-3 font-semibold">{feature.title}</h3>
                                <p className="text-neutral-600 text-sm leading-relaxed">{feature.description}</p>
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Why Form an HUF?</h2>
                            <div className="space-y-3">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                        <span className="text-neutral-700">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Considerations */}
                        <div>
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Formation Rules</h2>
                            <div className="bg-orange-50 p-8 rounded-2xl border border-orange-200">
                                <div className="flex items-start gap-4 mb-6">
                                    <AlertCircle className="w-8 h-8 text-orange-600 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-xl text-orange-900 font-bold mb-2">Capital Infusion</h3>
                                        <p className="text-orange-800 leading-relaxed">
                                            An HUF is automatically created at marriage. However, to be recognized for tax, a deed is required. Crucially, capital must verify be infused via Gift or Inheritance, not by member's own funds.
                                        </p>
                                    </div>
                                </div>
                                <p className="text-neutral-600 text-sm bg-white/50 p-4 rounded-lg">
                                    Consult with our experts to understand the correct way to infuse capital to ensure tax compliance.
                                </p>
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Documents Required</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                KYC for Karta and proofs
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Details Needed</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Information for Deed Drafting
                            </p>
                            <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-8 text-white">
                                <div className="space-y-4">
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
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Formation Process</h2>
                        <p className="text-lg text-neutral-600">Step by step execution</p>
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
                        <p className="text-lg text-gray-600">Professional assistance for HUF.</p>
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
                                    <span className="text-gray-500"> /one-time</span>
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
            <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Start Your HUF Today</h2>
                    <p className="text-xl text-blue-100 mb-10">
                        Secure your wealth and save taxes legally.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartRegistration}
                            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                            REGISTER NOW
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
