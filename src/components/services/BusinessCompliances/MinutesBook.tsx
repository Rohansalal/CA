import { Book, CheckCircle, FileText, Clock, ArrowRight, Shield, Globe, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function MinutesBook() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartService = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'Minutes Book' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'Minutes Book' } });
        }
    };

    const features = [
        {
            icon: Book,
            title: 'Digital Record',
            description: 'Maintain minutes in digital format.',
        },
        {
            icon: Shield,
            title: 'Legal Compliance',
            description: 'Mandatory under Companies Act, 2013.',
        },
        {
            icon: Globe,
            title: 'Easy Access',
            description: 'Retrieve old records instantly.',
        },
        {
            icon: Award,
            title: 'Secretarial Standards',
            description: 'Compliance with SS-1 and SS-2.',
        },
    ];

    const benefits = [
        'Evidence of proceedings in court of law',
        'Statutory requirement for every company',
        'Preserves corporate memory',
        'Necessary for due diligence and funding',
        'Avoids penalties for non-compliance',
        'Keeps track of director decisions',
        'Professional corporate governance',
        'Ready for inspection by authorities'
    ];

    const documents = [
        'Notice of Meetings',
        'Agenda Papers',
        'Attendance Sheets',
        'Notes on Proceedings',
        'Draft Resolutions',
        'Chairman\'s Signature',
    ];

    const process = [
        'Drafting of Minutes after Meeting',
        'Circulation to Directors for Comments',
        'Finalization and Entry in Minute Book',
        'Signing by Chairman',
        'Digital Storage & Backup'
    ];

    const pricing = [
        {
            plan: 'Annual',
            price: '₹4,999',
            desc: 'Per Year',
            features: [
                'Maintenance of Board Meeting Minutes',
                'AGM Minutes',
                'Secretarial Assistance',
                'Digital Storage'
            ]
        },
        {
            plan: 'Backlog',
            price: 'Custom',
            features: [
                'Updating Old Records',
                'Reconstruction of Minutes',
                'Compliance Check',
                'Penalty Assessment',
                'Expert Advisory'
            ]
        },
        {
            plan: 'Retainer',
            price: '₹9,999',
            desc: 'Comprehensive',
            features: [
                'All Meetings Covered',
                'Notice & Agenda Drafting',
                'Meeting Facilitation',
                'Instant Minutes Drafting',
                'Physical Binding'
            ]
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10">
                    <Book className="w-96 h-96 -mr-20 -mt-20" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-semibold mb-6 border border-white/20">
                            Corporate Secretarial
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Minutes Book Maintenance <br />
                            <span className="text-accent">Record Every Decision</span>
                        </h1>
                        <p className="text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl">
                            Proper maintenance of minutes is not just a legal formality but a crucial evidence of corporate decision making. We ensure your records are impeccable.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg border border-white/20 backdrop-blur-sm">
                                <Clock className="w-5 h-5 text-accent" />
                                <span className="font-medium">Timely Updates</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg border border-white/20 backdrop-blur-sm">
                                <CheckCircle className="w-5 h-5 text-accent" />
                                <span className="font-medium">SS-1 & SS-2 Compliant</span>
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
                            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">Importance of Minutes</h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Section 118 of the Companies Act, 2013 mandates that every company shall prepare, sign and keep minutes of proceedings of every general meeting, board meeting, and committee meeting.
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
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-bl-full -z-0"></div>
                            <h3 className="text-2xl font-bold text-primary mb-6 relative z-10">Consequences</h3>
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-6 relative z-10">
                                <div className="flex gap-4">
                                    <Shield className="w-8 h-8 text-blue-600 flex-shrink-0" />
                                    <div>
                                        <p className="text-blue-800 font-bold text-lg">Penalty for Default</p>
                                        <p className="text-blue-700 text-sm mt-1 leading-relaxed">
                                            Company: ₹25,000. Officers in default: ₹5,000 each. Tampering with minutes can lead to imprisonment upto 2 years.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Pricing Plans</h2>
                        <p className="text-lg text-gray-600">Secure your corporate memory.</p>
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
                                    {plan.price !== 'Custom' && <span className="text-gray-500"> / year</span>}
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
                                    Start Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Documents & Process */}
            <section className="py-20 bg-primary/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">

                        {/* Documents */}
                        <div>
                            <h2 className="text-3xl font-bold text-primary mb-8">What We Need</h2>
                            <div className="bg-white rounded-3xl p-8 shadow-lg border border-neutral-100">
                                <ul className="space-y-4">
                                    {documents.map((doc, index) => (
                                        <li key={index} className="flex items-start gap-4 p-2 rounded-lg hover:bg-neutral-50 transition-colors">
                                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <FileText className="w-3 h-3 text-primary" />
                                            </div>
                                            <span className="text-gray-700 font-medium">{doc}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Process */}
                        <div>
                            <h2 className="text-3xl font-bold text-primary mb-8">Workflow</h2>
                            <div className="space-y-6">
                                {process.map((step, index) => (
                                    <div key={index} className="flex gap-6 group bg-white border border-neutral-200 p-6 rounded-xl hover:shadow-md transition-all">
                                        <div className="flex flex-col items-center">
                                            <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition-transform">
                                                {index + 1}
                                            </div>
                                            {index !== process.length - 1 && <div className="w-0.5 h-full bg-gray-200 my-2"></div>}
                                        </div>
                                        <div className="pb-8">
                                            <h4 className="font-bold text-gray-900 text-lg mb-2">Step {index + 1}</h4>
                                            <p className="text-gray-600">{step}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Stay Compliant</h2>
                    <p className="text-xl text-blue-100 mb-10">
                        Don't let missing minutes attract penalties.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartService}
                            className="px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl inline-flex items-center justify-center gap-2"
                        >
                            UPDATE RECORDS
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all">
                            Consult Expert
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
