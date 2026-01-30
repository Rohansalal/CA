import { PenTool, CheckCircle, FileText, Clock, ArrowRight, Shield, Lock, Laptop, Key, FileCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function DSCRegistration() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartService = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'Digital Signature (DSC)' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'Digital Signature (DSC)' } });
        }
    };

    const dscTypes = [
        {
            type: 'Class 3 Signing',
            description: 'For Income Tax, GST, MCA, Trademark, PF',
            icon: PenTool,
            features: ['Most Common', 'Valid for 2 Years', 'Individuals & Organizations'],
        },
        {
            type: 'Class 3 Combo',
            description: 'Signing + Encryption (For e-Tendering)',
            icon: Lock,
            features: ['Govt Tenders', 'High Security', 'Bid Submission'],
        },
        {
            type: 'DGFT DSC',
            description: 'Specifically for Import/Export (IEC)',
            icon: Globe,
            features: ['DGFT Portal', 'M.E.I.S Claims', 'Customs'],
        },
    ];

    const benefits = [
        'Secure way to sign documents',
        'Mandatory for Company Registration',
        'Mandatory for heavy GSTR/ITR filers',
        'Required for e-Tendering',
        'Go paperless & green',
        'Time saving (sign from anywhere)',
        'Legal validity same as wet signature',
        'Prevents tampering of documents'
    ];

    const documents = [
        'Aadhaar Card (Soft Copy)',
        'PAN Card (Soft Copy)',
        'Passport Size Photo (Soft Copy)',
        'Email ID & Mobile No (Linked to Aadhaar)',
    ];

    const process = [
        {
            step: 'Data Entry',
            description: 'Filling application on CA Portal',
            time: '15 Mins',
        },
        {
            step: 'Verfications',
            description: 'Mobile OTP & Email OTP Verification',
            time: 'Instant',
        },
        {
            step: 'Video Recording',
            description: '20 second video recording on phone/laptop',
            time: '5 Mins',
        },
        {
            step: 'Approval',
            description: 'Approval by Certifying Authority (eMudhra/Pantasign)',
            time: '15 Mins',
        },
        {
            step: 'Download',
            description: 'Downloading DSC into USB Token',
            time: 'Final Step',
        },
    ];

    const pricing = [
        {
            plan: '2 Years Validity',
            price: '₹1,499',
            desc: 'Best Value',
            features: [
                'Class 3 Signing',
                'HyperPKI/Watchdata Token',
                'Free Delivery',
                'Installation Support'
            ]
        },
        {
            plan: '3 Years Validity',
            price: '₹1,999',
            features: [
                'Class 3 Signing',
                'HyperPKI/Watchdata Token',
                'Free Delivery',
                'Installation Support'
            ]
        },
        {
            plan: 'Combo (Sign + Encrypt)',
            price: '₹2,499',
            desc: 'For Tenders',
            features: [
                'Signing + Encryption',
                'USB Token Included',
                'Free Delivery',
                'Priority Support'
            ]
        }
    ];

    const faqs = [
        {
            q: 'Is USB Token mandatory?',
            a: 'Yes, Class 3 DSC can only be downloaded into a FIPS Certified Cryptographic USB Token (like Watchdata, Proxkey, HyperPKI). It cannot be stored on a computer hard drive.',
        },
        {
            q: 'Can I use one DSC for everything?',
            a: 'A Class 3 Signing DSC works for 90% of purposes (GST, MCA, ITR, PF). However, for e-Tendering, you often need the Report (Encryption) certificate as well (Combo DSC).',
        },
        {
            q: 'How long does it take?',
            a: 'If your Aadhaar and Mobile are linked, the entire process can be completed in 30 minutes. Delivery of the physical token takes 2-3 days.',
        },
        {
            q: 'Can I renew my old token?',
            a: 'Yes, if you already have a USB token, we can reuse it. You will save the cost of the token (approx ₹300-400). Select "Without Token" plan.',
        },
    ];

    // Helper icon for DGFT
    function Globe(props: any) {
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
                <circle cx="12" cy="12" r="10" />
                <line x1="2" x2="22" y1="12" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
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
                            Digital Identity
                        </div>
                        <h1 className="text-3xl lg:text-5xl text-white mb-4">Digital Signature (DSC) Class 3</h1>
                        <p className="text-xl text-neutral-100 leading-relaxed mb-6">
                            Paperless, Secure, and Legally Valid. Mandatory for Filing Returns, Tenders, and Company Registration.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Clock className="w-5 h-5 text-accent" />
                                <span>30 Mins Approval</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Key className="w-5 h-5 text-accent" />
                                <span>USB Token Included</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Type Grid */}
            <section className="py-16 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        {dscTypes.map((type, index) => (
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Why you need DSC?</h2>
                            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                                A Digital Signature Certificate works like an electronic key. It proves your identity online and ensures documents haven't been tampered with.
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
                                <h3 className="text-2xl font-bold text-primary mb-6 relative z-10">Security</h3>
                                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-6 relative z-10">
                                    <div className="flex gap-4">
                                        <Lock className="w-8 h-8 text-blue-600 flex-shrink-0" />
                                        <div>
                                            <p className="text-blue-800 font-bold text-lg">AES 256 Encryption</p>
                                            <p className="text-blue-700 text-sm mt-1 leading-relaxed">
                                                Class 3 DSCs use the highest level of encryption. They cannot be copied or forged. The password is known only to you.
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Documents & Requirements</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Everything is digital. No physical submission.
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Verification Process</h2>
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
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Registration Plans</h2>
                        <p className="text-lg text-neutral-600">Includes Token & All Taxes</p>
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
                                    Order Now
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
                    <h2 className="text-3xl lg:text-4xl text-white mb-4">Get Signed Today</h2>
                    <p className="text-xl text-neutral-100 mb-8">
                        Instant approval and delivery options available.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartService}
                            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                            BUY DSC
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
