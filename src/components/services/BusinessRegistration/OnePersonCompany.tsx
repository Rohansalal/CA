import { User, CheckCircle, FileText, Clock, ArrowRight, Shield, Globe, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function OnePersonCompany() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartRegistration = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'One Person Company' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'One Person Company' } });
        }
    };

    const features = [
        {
            icon: User,
            title: 'Single Owner',
            description: '100% control with only one shareholder (member) required.',
        },
        {
            icon: Shield,
            title: 'Limited Liability',
            description: 'Personal assets are protected. Liability limited to share capital.',
        },
        {
            icon: Globe,
            title: 'Separate Legal Entity',
            description: 'The company is a separate legal person distinct from its member.',
        },
        {
            icon: Award,
            title: 'Easy Funding',
            description: 'Easier to raise banking finance and less compliance than Pvt Ltd.',
        },
    ];

    const benefits = [
        'Complete control like Proprietorship',
        'Limited Liability Protection',
        'Separate Legal Status',
        'Easy Transferability',
        'Perpetual Succession',
        'Credibility of a Company',
    ];

    const documents = [
        'PAN Card of Member/Director',
        'Aadhaar Card of Member/Director',
        'Passport Photo',
        'Bank Statement (Latest)',
        'Registered Office Proof (Utility Bill)',
        'NOC from Owner',
        'Nominee Consent Form (INC-3)',
    ];

    const dataRequired = [
        'Proposed Company Name',
        'Capital Amount',
        'Nature of Business',
        'Director Email & Mobile',
        'Place of Birth',
        'Education Qualification',
        'Duration of Stay at Present Address'
    ];

    const process = [
        {
            step: 'DSC & DIN',
            description: 'Obtain DSC and DIN for the sole director.',
            time: 'Day 1-2',
        },
        {
            step: 'Name Approval',
            description: 'Reserve unique name via Part-A of SPICe+ form.',
            time: 'Day 3-4',
        },
        {
            step: 'Incorporation',
            description: 'File SPICe+ Part-B along with MOA & AOA.',
            time: 'Day 5-8',
        },
        {
            step: 'Certificate',
            description: 'Receipt of Certificate of Incorporation, PAN & TAN.',
            time: 'Day 10',
        },
    ];

    const pricing = [
        {
            plan: 'Starter',
            price: '₹7,999',
            features: [
                'Name Approval Support',
                'DSC & DIN (1 Director)',
                'MOA & AOA Drafting',
                'Govt Fees (Extra)'
            ]
        },
        {
            plan: 'Standard',
            price: '₹14,999',
            desc: 'Best Value',
            features: [
                'Includes Govt Fees (upto 1L Capital)',
                'DSC & DIN (1 Director)',
                'Incorporation Certificate',
                'PAN & TAN',
                'Free Bank Account Opening'
            ]
        },
        {
            plan: 'Premium',
            price: '₹24,999',
            features: [
                'All Standard Features',
                'GST Registration',
                'MSME Registration',
                '1 Year Compliance Support',
                'Trademark Filing Support'
            ]
        }
    ];

    const faqs = [
        {
            q: 'Who can become a member of OPC?',
            a: 'Only a natural person who is an Indian citizen and resident in India can be a member of an OPC.',
        },
        {
            q: 'Is a Nominee mandatory?',
            a: 'Yes, nominating a person who will become the member in case of death/incapacity of the primary member is mandatory.',
        },
        {
            q: 'Can an OPC convert to Private Limited?',
            a: 'Yes, an OPC can convert voluntarily into a Private Limited Company after 2 years or if paid-up capital exceeds ₹50 Lakhs.',
        },
        {
            q: 'Is audit mandatory?',
            a: 'Yes, statutory audit is mandatory for an OPC similar to a Private Limited Company.',
        },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10">
                    <User className="w-96 h-96 -mr-20 -mt-20" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-semibold mb-6 border border-white/20">
                            Solo Entrepreneur
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            One Person Company (OPC) <br />
                            <span className="text-accent">Be Your Own Boss</span>
                        </h1>
                        <p className="text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl">
                            The perfect blend of Sole Proprietorship and Private Limited Company. Enjoy limited liability with complete control.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg border border-white/20 backdrop-blur-sm">
                                <Clock className="w-5 h-5 text-accent" />
                                <span className="font-medium">10-15 Days Registration</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg border border-white/20 backdrop-blur-sm">
                                <Shield className="w-5 h-5 text-accent" />
                                <span className="font-medium">100% Asset Protection</span>
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
                            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">Why Register an OPC?</h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                OPC allows a single entrepreneur to get corporate status. It gives you the best of both worlds - Limited Liability of a Company and the flexibility of a Proprietorship.
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
                            <h3 className="text-2xl font-bold text-primary mb-6 relative z-10">Unique Requirement</h3>
                            <div className="bg-blue-50 border-l-4 border-primary p-6 rounded-r-xl mb-6 relative z-10">
                                <div className="flex gap-4">
                                    <User className="w-8 h-8 text-primary flex-shrink-0" />
                                    <div>
                                        <p className="text-primary font-bold text-lg">Nominee is Mandatory</p>
                                        <p className="text-gray-700 text-sm mt-1 leading-relaxed">
                                            Since there is only one member, you must appoint a Nominee who will take over the company in case of death or incapacity of the member.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm relative z-10">
                                The nominee must be an Indian Citizen and Resident of India. We handle the consent forms (INC-3).
                            </p>
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
                                Documents for Director and Registered Office
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
                                Key details for incorporation
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
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">OPC Registration Packages</h2>
                        <p className="text-lg text-gray-600">Professional services tailored for solo founders.</p>
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
                                    <span className="text-gray-500"> + govt fees</span>
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
                                    Incorporate Now
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
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Launch Your Dream Company</h2>
                    <p className="text-xl text-blue-100 mb-10">
                        Get the credibility of a Private Limited Company with the control of a Proprietorship.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartRegistration}
                            className="px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl inline-flex items-center justify-center gap-2"
                        >
                            START REGISTRATION
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all">
                            Check Name Availability
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
