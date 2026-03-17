import { Building2, CheckCircle, FileText, Clock, ArrowRight, TrendingUp, AlertCircle, ShoppingBag, Globe, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../user-panel/contexts/AuthContext';

export function PublicLimitedCompany() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartRegistration = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'Public Limited Company' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'Public Limited Company' } });
        }
    };

    const features = [
        {
            icon: Globe,
            title: 'Public Investment',
            description: 'Can raise funds from the public through IPOs.',
        },
        {
            icon: Users,
            title: 'Large Membership',
            description: 'Minimum 7 members, no maximum limit.',
        },
        {
            icon: TrendingUp,
            title: 'Growth Potential',
            description: 'Best suited for large scale businesses with huge capital requirements.',
        },
        {
            icon: CheckCircle,
            title: 'Credibility',
            description: 'High credibility and transparency due to strict compliances.',
        },
    ];

    const benefits = [
        'Ability to list on Stock Exchanges (IPO)',
        'Unlimited number of shareholders',
        'Easier transfer of shares',
        'Higher borrowing capacity from banks',
        'Greater brand value and visibility',
        'Limited liability for shareholders',
        'Separate legal status',
        'Perpetual succession'
    ];

    const documents = [
        'PAN & Aadhaar of all Directors (Min 3) & Shareholders (Min 7)',
        'Passport size photos',
        'Address proof of Directors',
        'Bank Statement/Utility Bill',
        'Office Address Proof',
        'DSC & DIN for Directors',
        'MoA & AoA objects',
    ];

    const dataRequired = [
        'Proposed Company Name (3 options)',
        'Authorized Capital',
        'Paid-up Capital',
        'Main Objects of Company',
        'Director Details (DIN, Name)',
        'Shareholder Distribution',
        'Registered Address'
    ];

    const process = [
        {
            step: 'DSC & DIN',
            description: 'Obtain DSC and DIN for all 3 Directors.',
            time: 'Day 1-2',
        },
        {
            step: 'Name Reservation',
            description: 'Apply for name availability via RUN service.',
            time: 'Day 3-5',
        },
        {
            step: 'Docs Preparation',
            description: 'Drafting of MOA, AOA and getting them notarized.',
            time: 'Day 6-8',
        },
        {
            step: 'Filing',
            description: 'Filing SPICe+ forms with MCA for incorporation.',
            time: 'Day 9-15',
        },
        {
            step: 'Certificate',
            description: 'Receive COI, PAN, TAN and commence business certificate.',
            time: 'Day 15-25',
        },
    ];

    const faqs = [
        {
            q: 'What is the minimum requirement for Public Ltd?',
            a: 'Minimum 3 Directors and 7 Shareholders. There is no minimum paid-up capital requirement anymore.',
        },
        {
            q: 'Is it mandatory to list on stock exchange?',
            a: 'No, a Public Limited Company can be "Unlisted". Listing is an optional step for raising public funds.',
        },
        {
            q: 'Can NRIs invests?',
            a: 'Yes, NRIs and Foreign Nationals can invest, subject to FDI guidelines.',
        },
        {
            q: 'How many days does it take?',
            a: 'It typically takes 20-30 days depending on document readiness and ROC processing time.',
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10">
                    <Globe className="w-96 h-96 -mr-20 -mt-20" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-semibold mb-6 border border-white/20">
                            Large Enterprises
                        </div>
                        <h1 className="text-4xl text-white md:text-6xl font-bold mb-6 leading-tight">
                            Public Limited Company <br />
                            <span className="text-white">Go Public, Go Big</span>
                        </h1>
                        <p className="text-xl text-white leading-relaxed mb-8 max-w-2xl">
                            The highest corporate structure in India. Ideal for businesses planning to raise capital from the general public.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg border border-white/20 backdrop-blur-sm">
                                <Clock className="w-5 h-5 text-accent" />
                                <span className="font-medium">20-30 Days</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg border border-white/20 backdrop-blur-sm">
                                <CheckCircle className="w-5 h-5 text-accent" />
                                <span className="font-medium">Stock Market Ready</span>
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

            {/* Benefits & Considerations */}
            <section className="py-20 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Benefits */}
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">Why Public Limited?</h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                A Public Limited Company enjoys the status of a separate legal entity and offers the benefits of limited liability. It is the only entity that can raise funds from the public by selling its shares.
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

                        {/* Considerations */}
                        <div>
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Important Compliance</h2>

                            <div className="bg-orange-50 p-8 rounded-2xl border border-orange-200 mb-6">
                                <div className="flex items-start gap-4 mb-6">
                                    <AlertCircle className="w-8 h-8 text-orange-600 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-xl text-orange-900 font-bold mb-2">Heavy Regulations</h3>
                                        <p className="text-orange-800 leading-relaxed">
                                            Public companies are strictly regulated by the MCA and SEBI (if listed). They have to disclose more information to the public than private companies.
                                        </p>
                                    </div>
                                </div>
                                <p className="text-neutral-600 text-sm bg-white/50 p-4 rounded-lg">
                                    <strong>Strict Audit:</strong> Quarterly compliances and rigorous statutory audits are mandatory.
                                </p>
                            </div>

                            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-200">
                                <div className="flex items-start gap-4 mb-6">
                                    <Users className="w-8 h-8 text-blue-600 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-xl text-blue-900 font-bold mb-2">Who is this for?</h3>
                                        <p className="text-blue-800 leading-relaxed">
                                            Ideal for large-scale businesses planning to raise capital from the public through IPO or Private Placement.
                                        </p>
                                    </div>
                                </div>
                                <p className="text-neutral-600 text-sm bg-white/50 p-4 rounded-lg">
                                    <strong>Best Suited For:</strong> Manufacturing Giants, Infrastructure Projects, and Established Brands.
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Required Documents</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Documents for Directors and Shareholders
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Information Needed</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Details for filing SPICe+ Form
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
                        <p className="text-lg text-neutral-600">Comprehensive steps to formation</p>
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
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-200">
                        <div className="grid md:grid-cols-2">
                            {/* Left Side - The Offer (White) */}
                            <div className="p-8 md:p-12 bg-white flex flex-col justify-center border-b md:border-b-0 md:border-r border-neutral-100">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Public Limited Setup</h3>
                                <div className="space-y-4">
                                    {[
                                        'Name Reservation (RUN)',
                                        '3 DSC & 3 DIN',
                                        'MOA & AOA Drafting',
                                        'Certificate of Incorporation',
                                        'PAN, TAN & Bank Support',
                                        'Commencement Certificate'
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                                <CheckCircle className="w-4 h-4 text-primary" />
                                            </div>
                                            <span className="text-gray-600 font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 pt-8 border-t border-neutral-100">
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <Clock className="w-4 h-4" />
                                        <span>Delivered in 20-30 business days</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - The Price (Dark) */}
                            <div className="p-8 md:p-12 bg-primary text-white flex flex-col justify-center items-center text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                                <div className="relative z-10">
                                    <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 border border-white/20">
                                        Corporate Plan
                                    </span>
                                    <div className="flex items-center justify-center gap-1 mb-2">
                                        <span className="text-6xl font-bold tracking-tight">₹39,999</span>
                                    </div>
                                    <p className="text-blue-100 mb-8">Professional Incorporation Fee</p>

                                    <button
                                        onClick={handleStartRegistration}
                                        className="w-full bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
                                    >
                                        Start Registration
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                    <p className="mt-4 text-xs text-blue-200">Secure Payment • Dedicated CA</p>
                                </div>
                            </div>
                        </div>
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
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Build a Public Enterprise</h2>
                    <p className="text-xl text-blue-100 mb-10">
                        Expert guidance for complex corporate registrations and compliance.
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





