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
                        <h1 className="text-4xl md:text-6xl text-white font-bold mb-6 leading-tight">
                            One Person Company (OPC) <br />
                            <span className="text-white">Be Your Own Boss</span>
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


            {/* Pricing Section */}
            <section className="py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-200">
                        <div className="grid md:grid-cols-2">
                            {/* Left Side - The Offer (White) */}
                            <div className="p-8 md:p-12 bg-white flex flex-col justify-center border-b md:border-b-0 md:border-r border-neutral-100">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Complete OPC Setup</h3>
                                <div className="space-y-4">
                                    {[
                                        'Name Approval (RUN)',
                                        'DSC & DIN (1 Director)',
                                        'MOA & AOA Drafting',
                                        'Incorporation COI',
                                        'PAN & TAN Allotment',
                                        'Nominee Filing (INC-3)'
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
                                        <span>Delivered in 10-15 business days</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - The Price (Dark) */}
                            <div className="p-8 md:p-12 bg-primary text-white flex flex-col justify-center items-center text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                                <div className="relative z-10">
                                    <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 border border-white/20">
                                        Best Value
                                    </span>
                                    <div className="flex items-center justify-center gap-1 mb-2">
                                        <span className="text-6xl font-bold tracking-tight">₹14,999</span>
                                    </div>
                                    <p className="text-blue-100 mb-8">All inclusive (upto 1L capital)</p>

                                    <button
                                        onClick={handleStartRegistration}
                                        className="w-full bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
                                    >
                                        Incorporate Now
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                    <p className="mt-4 text-xs text-blue-200">Secure Payment • Expert CA Support</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Benefits & Considerations */}
            <section className="py-20 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Benefits */}
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">Why Register an OPC?</h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                OPC allows a single entrepreneur to get corporate status. It gives you the best of both worlds - Limited Liability of a Company and the flexibility of a Proprietorship.
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Important Requirements</h2>

                            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-200">
                                <div className="flex items-start gap-4 mb-6">
                                    <User className="w-8 h-8 text-blue-600 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-xl text-blue-900 font-bold mb-2">Mandatory Nominee</h3>
                                        <p className="text-blue-800 leading-relaxed">
                                            Since there is only one member, you must appoint a Nominee who will take over the company in case of death or incapacity of the member.
                                        </p>
                                    </div>
                                </div>
                                <p className="text-neutral-600 text-sm bg-white/50 p-4 rounded-lg">
                                    The nominee must be an Indian Citizen and Resident of India. We handle the consent forms (INC-3).
                                </p>
                            </div>

                            <div className="bg-orange-50 p-8 rounded-2xl border border-orange-200 mt-6">
                                <div className="flex items-start gap-4 mb-6">
                                    <Shield className="w-8 h-8 text-orange-600 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-xl text-orange-900 font-bold mb-2">Conversion Rules</h3>
                                        <p className="text-orange-800 leading-relaxed">
                                            You must convert to a Private Limited Company strictly if paid-up capital exceeds ₹50 Lakhs.
                                        </p>
                                    </div>
                                </div>
                                <p className="text-neutral-600 text-sm bg-white/50 p-4 rounded-lg">
                                    <strong>Plan Ahead:</strong> If you plan to raise big funding soon, start with Pvt Ltd directly.
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
