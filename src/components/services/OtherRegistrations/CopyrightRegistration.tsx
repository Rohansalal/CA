import { Copyright, CheckCircle, FileText, Clock, ArrowRight, Shield, BookOpen, Music, Video, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function CopyrightRegistration() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartService = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'Copyright Registration' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'Copyright Registration' } });
        }
    };

    const copyrightTypes = [
        {
            type: 'Literary Works',
            description: 'Books, Scripts, Lyrics, Software Code',
            icon: BookOpen,
            features: ['Authors', 'Coders', 'Writers'],
        },
        {
            type: 'Artistic Works',
            description: 'Logo, Painting, Design, Photos',
            icon: CheckCircle,
            features: ['Designers', 'Artists', 'Photographers'],
        },
        {
            type: 'Cinematography',
            description: 'Movies, Videos, Reels',
            icon: Video,
            features: ['Filmmakers', 'YouTubers', 'Producers'],
        },
        {
            type: 'Sound Recording',
            description: 'Songs, Podcast audio',
            icon: Music,
            features: ['Musicians', 'Podcasters', 'Composers'],
        },
    ];

    const benefits = [
        'Legal Proof of Ownership (Prima Facie Evidence)',
        'Right to sue for infringement/copying',
        'Licensing income (Royalties)',
        'Global protection (Berne Convention)',
        'Prevent monetization by others',
        'Transfer rights to heirs',
        'Increase commercial value',
        'Validity for Lifetime + 60 Years'
    ];

    const documents = [
        '2 Copies of Work (Soft/Hard)',
        'NOC from Author (if applicant is different)',
        'DD/IPO of Copyright Fee',
        'ID & Address Proof of Applicant',
        'NOC from Publisher (if published)',
        'Software Code (Source/Object Code)',
    ];

    const process = [
        {
            step: 'Filing',
            description: 'Filing application (Form XIV) & Fee',
            time: '1 Day',
        },
        {
            step: 'Diary Number',
            description: 'Generation of Diary Number',
            time: 'Instant',
        },
        {
            step: 'Waiting Period',
            description: 'Mandatory wait for objections',
            time: '30 Days',
        },
        {
            step: 'Examination',
            description: 'Scrutiny by Copyright Office',
            time: '1-2 Months',
        },
        {
            step: 'Registration',
            description: 'Issuance of Certificate/ROC',
            time: '6-12 Months',
        },
    ];

    const pricing = [
        {
            plan: 'Literary/Artistic',
            price: '₹4,999',
            desc: 'Popular',
            features: [
                'Govt Fee Included',
                'Filing Application',
                'Diary No Generation',
                'Consultation'
            ]
        },
        {
            plan: 'Software/Code',
            price: '₹6,999',
            desc: 'For Tech',
            features: [
                'Source Code Protection',
                'Govt Fee Included',
                'Filing Application',
                'Consultation'
            ]
        },
        {
            plan: 'Sound/Video',
            price: '₹9,999',
            features: [
                'Govt Fee Included',
                'NOC Drafting',
                'Filing Application',
                'Status Tracking'
            ]
        }
    ];

    const faqs = [
        {
            q: 'Is copyright registration mandatory?',
            a: 'Copyright exists from the moment of creation. However, registration is required to file a lawsuit for infringement and claim statutory damages. It serves as legal proof.',
        },
        {
            q: 'Can I copyright my idea?',
            a: 'No, copyright protects the "expression" of an idea, not the idea itself. You must write it down, record it, or draw it to copyright it.',
        },
        {
            q: 'How long does it last?',
            a: 'Generally, copyright lasts for the lifetime of the author plus 60 years after their death.',
        },
        {
            q: 'Is it valid internationally?',
            a: 'Yes, India is a member of the Berne Convention, so copyright registered in India is recognized in 170+ member countries.',
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
                        <h1 className="text-3xl lg:text-5xl text-white mb-4">Copyright Registration</h1>
                        <p className="text-xl text-neutral-100 leading-relaxed mb-6">
                            Protect your Music, Books, Software, and Artwork. Legal ownership for a lifetime + 60 Years.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Shield className="w-5 h-5 text-accent" />
                                <span>Global Protection</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Clock className="w-5 h-5 text-accent" />
                                <span>Lifetime Validity</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Types Grid */}
            <section className="py-16 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {copyrightTypes.map((type, index) => (
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Why Copyright?</h2>
                            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                                Creativity is an asset. Don't let others profit from your hard work.
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
                                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-100 rounded-bl-full -z-0"></div>
                                <h3 className="text-2xl font-bold text-primary mb-6 relative z-10">Software Code</h3>
                                <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-xl mb-6 relative z-10">
                                    <div className="flex gap-4">
                                        <Code className="w-8 h-8 text-purple-600 flex-shrink-0" />
                                        <div>
                                            <p className="text-purple-800 font-bold text-lg">Protect Source Code</p>
                                            <p className="text-purple-700 text-sm mt-1 leading-relaxed">
                                                Software Apps and Websites can be protected under 'Literary Works'. It prevents competitors from copying your source code structure.
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Data Required</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Physical copies may need to be sent
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Process Timeline</h2>
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
                        <p className="text-lg text-neutral-600">Secure your intellectual property</p>
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
                                    Get Copyright
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
                    <h2 className="text-3xl lg:text-4xl text-white mb-4">Protect What's Yours</h2>
                    <p className="text-xl text-neutral-100 mb-8">
                        File for Copyright Protection today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartService}
                            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                            START REGISTRATION
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
