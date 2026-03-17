import { Copyright, CheckCircle, FileText, Clock, ArrowRight, Shield, Globe, Award, AlertTriangle, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../user-panel/contexts/AuthContext';

export function TrademarkRegistration() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartService = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'Trademark Registration' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'Trademark Registration' } });
        }
    };

    const trademarkTypes = [
        {
            type: 'Word Mark',
            description: 'Brand Name (e.g., Google, Nike)',
            icon: FileText,
            features: ['Protects TEXT only', 'Strongest Protection', 'Broad coverage'],
        },
        {
            type: 'Device Mark',
            description: 'Logo / Symbol (e.g., Apple Logo)',
            icon: Layers,
            features: ['Protects Visual Design', 'Specific to Logo', 'Brand Identity'],
        },
        {
            type: 'Slogan / Tagline',
            description: 'Catchphrase (e.g., Just Do It)',
            icon: Award,
            features: ['Marketing Asset', 'Distinctive Phrase', 'Ad Campaign'],
        },
    ];

    const benefits = [
        'Exclusive right to use the mark',
        'Legal protection against copycats',
        'Creation of intangible asset (Valuation)',
        'Trust and goodwill in market',
        'Use of ® symbol',
        'Global registration possibility',
        'Deterrent to others',
        'License/Franchise opportunity'
    ];

    const documents = [
        'Logo/Brand Name (High Res)',
        'User Affidavit (if Name is already in use)',
        'ID & Address Proof of Applicant',
        'MSME Certificate (Important for 50% Govt Fee discount)',
        'Signed Power of Attorney (Form 48)',
        'Incorporation Certificate (for Companies)'
    ];

    const process = [
        {
            step: 'Search',
            description: 'Comprehensive Trademark Search for availability',
            time: '1 Hour',
        },
        {
            step: 'Application',
            description: 'Filing TM-A Application online',
            time: '1 Day',
        },
        {
            step: 'Objected?',
            description: 'Replying to Examination Report (if any)',
            time: 'As needed',
        },
        {
            step: 'Registration',
            description: 'Issuance of Certificate if no opposition',
            time: '6-8 Months',
        },
    ];

    const pricing = [
        {
            plan: 'Individual/MSME',
            price: '₹5,999',
            desc: 'Govt Fee Included',
            features: [
                'Govt Fee Included (₹4500)',
                'Search Report',
                'Filing',
                'Consultation'
            ]
        },
        {
            plan: 'Company',
            price: '₹10,999',
            desc: 'Non-MSME',
            features: [
                'Govt Fee Included (₹9000)',
                'Search Report',
                'Filing',
                'Consultation'
            ]
        },
        {
            plan: 'Objection Reply',
            price: '₹2,999',
            features: [
                'Drafting Legal Reply',
                'Citation of Case Laws',
                'Filing Response',
                'Tracking Status'
            ]
        }
    ];

    const upgradePaths = [
        {
            from: 'Domestic Trademark',
            to: 'International (Madrid)',
            benefit: 'Protect your brand in 120+ countries with a single application.',
            process: 'Apply via WIPO (Madrid Protocol)',
        },
        {
            from: 'Registered TM',
            to: 'Brand Valuation',
            benefit: 'Value your brand as an asset on your balance sheet for raising funds.',
            process: 'Valuation by Registered Valuer',
        },
    ];

    const faqs = [
        {
            q: 'Can I use the ® symbol immediately?',
            a: 'No, you can use the ™ symbol immediately after filing the application. Valid ® symbol can be used only after the Registration Certificate is issued (approx 6-8 months).',
        },
        {
            q: 'What if my trademark is rejected?',
            a: 'Trademarks are usually rejected on grounds of being "Descriptive" or "Similar" to existing marks. We conduct a thorough search beforehand to minimize this risk.',
        },
        {
            q: 'Is the fee refundable?',
            a: 'Government fees paid to the registry are non-refundable even if the application is objected to or refused. Professional fees may be adjusted.',
        },
        {
            q: 'How long is it valid?',
            a: 'A registered trademark is valid for 10 years. It can be renewed indefinitely every 10 years.',
        },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4">
                            Intellectual Property
                        </div>
                        <h1 className="text-3xl lg:text-5xl text-white mb-4">Trademark Registration</h1>
                        <p className="text-xl text-neutral-100 leading-relaxed mb-6">
                            Secure your Brand Name, Logo, and Slogan. Prevent others from copying your business identity.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Clock className="w-5 h-5 text-accent" />
                                <span>Valid 10 Years</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Shield className="w-5 h-5 text-accent" />
                                <span>Legal Protection</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trademark Types Grid */}
            <section className="py-16 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        {trademarkTypes.map((type, index) => (
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Why Register?</h2>
                            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                                A registered trademark is an intangible asset for your business. It allows you to franchise and scale without fear of imitation.
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
                                <div className="absolute top-0 right-0 w-24 h-24 bg-red-100 rounded-bl-full -z-0"></div>
                                <h3 className="text-2xl font-bold text-primary mb-6 relative z-10">Objection Handling</h3>
                                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl mb-6 relative z-10">
                                    <div className="flex gap-4">
                                        <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
                                        <div>
                                            <p className="text-red-800 font-bold text-lg">Don't Panic</p>
                                            <p className="text-red-700 text-sm mt-1 leading-relaxed">
                                                Receiving an objection is part of the process. Our legal team drafts expert replies citing relevant case laws to get your mark accepted.
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Requirements</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Simple docs to get started
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Process Flow</h2>
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
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Transparent Pricing</h2>
                        <p className="text-lg text-neutral-600">No hidden costs</p>
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
                                    File Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upgrade Paths */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Go Global</h2>
                        <p className="text-lg text-neutral-600">Take your brand international</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {upgradePaths.map((option, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg border border-neutral-200 p-8 hover:shadow-2xl transition-all"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <Globe className="w-8 h-8 text-secondary" />
                                    <ArrowRight className="w-6 h-6 text-neutral-400" />
                                    <Award className="w-8 h-8 text-primary" />
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

            {/* FAQs */}
            <section className="py-16 bg-neutral-50">
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
                    <h2 className="text-3xl lg:text-4xl text-white mb-4">Own Your Brand</h2>
                    <p className="text-xl text-neutral-100 mb-8">
                        Start your Trademark Application today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartService}
                            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                            BRAND REGISTRATION
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}





