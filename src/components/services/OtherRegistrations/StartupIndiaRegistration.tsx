import { Rocket, CheckCircle, FileText, Clock, ArrowRight, Shield, Award, Coins, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function StartupIndiaRegistration() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartService = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'Startup India Registration' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'Startup India Registration' } });
        }
    };

    const schemes = [
        {
            type: 'DPIIT Recognition',
            description: 'Core recognition for Startups',
            icon: Award,
            features: ['Self Certification', 'Patent Rebate (80%)', 'Easy Public Procurement'],
        },
        {
            type: 'Tax Exemption (80IAC)',
            description: 'Income Tax Holiday for 3 Years',
            icon: Coins,
            features: ['Separate Application', 'For Pvt Ltd/LLP', 'Review by IMB Board'],
        },
        {
            type: 'Angel Tax Exemption',
            description: 'Section 56 Exemption',
            icon: Shield,
            features: ['For Investments > Fair Value', 'Easy Capital Raising', 'Form 2 Filing'],
        },
    ];

    const benefits = [
        '3 Year Income Tax Holiday (Section 80IAC)',
        'Exemption from Angel Tax (Section 56)',
        '80% Rebate on Patent Fees',
        '50% Rebate on Trademark Fees',
        'Self Certification under 9 Labour/Env Laws',
        'Easy Winding Up (90 Days)',
        'Access to Government Tenders (No EMD/Experience)',
        'Access to Seed Fund Scheme'
    ];

    const documents = [
        'Certificate of Incorporation / Registration',
        'Director/Partner Details (PAN/Aadhaar)',
        'Proof of Concept (Pitch Deck / Website / Video)',
        'Write-up on Innovation (How is it unique?)',
        'Sanction Letter (if funded)',
        'Patent/Trademark details (if any)',
    ];

    const process = [
        {
            step: 'Eligibility Check',
            description: 'Verifying Entity Type & Age (<10 Years)',
            time: '1 Hour',
        },
        {
            step: 'Profile Creation',
            description: 'Creating Account on Startup India Portal',
            time: '1 Day',
        },
        {
            step: 'Application',
            description: 'Filling form with Innovation details',
            time: '2 Days',
        },
        {
            step: 'Certificate',
            description: 'Issuance of DPIIT Recognition Certificate',
            time: '2-5 Days',
        },
    ];

    const pricing = [
        {
            plan: 'DPIIT Recognition',
            price: '₹2,999',
            desc: 'Standard',
            features: [
                'Startup India Profile',
                'DPIIT Recognition Application',
                'Certificate Download',
                'Consultation on Benefits'
            ]
        },
        {
            plan: 'Tax Exemption',
            price: '₹14,999',
            desc: 'Premium',
            features: [
                'DPIIT Recognition',
                '80-IAC Application',
                'Pitch Deck Review',
                'Video Pitch Assistance'
            ]
        },
        {
            plan: 'Seed Fund',
            price: '₹9,999',
            features: [
                'DPIIT Recognition',
                'Seed Fund Application',
                'Incubator Selection',
                'Proposal Drafting'
            ]
        }
    ];

    const faqs = [
        {
            q: 'Who is eligible for Startup India?',
            a: 'A Private Limited Company, LLP, or Registered Partnership Firm not older than 10 years, with turnover less than ₹100 Cr, working towards innovation/improvement of products or services.',
        },
        {
            q: 'Is tax exemption automatic?',
            a: 'No, DPIIT Recognition does not give tax exemption automatically. You need to apply separately for Section 80-IAC exemption, which is approved by an Inter-Ministerial Board.',
        },
        {
            q: 'Can a One Person Company (OPC) apply?',
            a: 'Yes, an OPC is a type of Private Limited Company, so it is eligible for Startup India Recognition.',
        },
        {
            q: 'What is the "Innovation" criteria?',
            a: 'You must demonstrate that your product/service is either new or a significant improvement over existing solutions, or has scope for wealth creation and employment generation.',
        },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4">
                            Government Scheme
                        </div>
                        <h1 className="text-3xl lg:text-5xl text-white mb-4">Startup India Registration</h1>
                        <p className="text-xl text-neutral-100 leading-relaxed mb-6">
                            Get recognized by DPIIT. Avail Tax Holidays, Angel Tax Exemption, and huge rebates on IPR.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Rocket className="w-5 h-5 text-accent" />
                                <span>Boost Growth</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Coins className="w-5 h-5 text-accent" />
                                <span>3 Year Tax Free</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Schemes Grid */}
            <section className="py-16 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        {schemes.map((type, index) => (
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
                                The Startup India initiative is designed to foster entrepreneurship and promote innovation. The benefits are substantial.
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
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-bl-full -z-0"></div>
                                <h3 className="text-2xl font-bold text-primary mb-6 relative z-10">Definition</h3>
                                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-6 relative z-10">
                                    <div className="flex gap-4">
                                        <Lightbulb className="w-8 h-8 text-blue-600 flex-shrink-0" />
                                        <div>
                                            <p className="text-blue-800 font-bold text-lg">Are you a Startup?</p>
                                            <p className="text-blue-700 text-sm mt-1 leading-relaxed">
                                                Mere registration of a company does not make it a "Startup". You have to be working towards innovation, development or improvement of products or services.
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
                                Prepare your pitch
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Recognition Process</h2>
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
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Pricing Plans</h2>
                        <p className="text-lg text-neutral-600">Invest in your startup's future</p>
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
                                    Get Recognized
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
                    <h2 className="text-3xl lg:text-4xl text-white mb-4">Ready for Hypergrowth?</h2>
                    <p className="text-xl text-neutral-100 mb-8">
                        Start your journey with DPIIT Recognition.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartService}
                            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                            GET RECOGNIZED
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
