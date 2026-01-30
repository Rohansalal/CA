import { Pill, CheckCircle, FileText, Clock, ArrowRight, Shield, Stethoscope, Thermometer, Warehouse } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function DrugLicense() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartService = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'Drug License' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'Drug License' } });
        }
    };

    const licenseTypes = [
        {
            type: 'Retail Drug License',
            description: 'For Pharmacy / Chemist Shop',
            icon: Stethoscope,
            features: ['Sell to Patients', 'Registered Pharmacist Req', 'Area > 10 Sqm'],
        },
        {
            type: 'Wholesale License',
            description: 'For Distributors / Stockists',
            icon: Warehouse,
            features: ['Sell to Retailers', 'Competent Person Req', 'Area > 15 Sqm'],
        },
        {
            type: 'Manufacturing License',
            description: 'For Medicine Production',
            icon: Pill,
            features: ['Factory Setup', 'Stringent Norms', 'Central/State'],
        },
    ];

    const benefits = [
        'Legal permission to sell medicines',
        'Builds trust with doctors & customers',
        'Avoid seizure of stock by Drug Inspector',
        'Necessary for tendering in hospitals',
        'Requirement for pharmaceutical distribution',
        'Compliance with Drugs & Cosmetics Act',
        'Access to genuine supply chain',
        'Higher business valuation'
    ];

    const documents = [
        'Blueprint/Layout Plan of Premises',
        'Rent Agreement / Ownership Proof',
        'Degree/Diploma of Pharmacist (B.Pharm/D.Pharm)',
        'Registration Certificate of Pharmacist',
        'Affidavit of Proprietor & Pharmacist',
        'Refrigerator Purchase Bill (Cold Chain)',
        'Partnership Deed / MOA-AOA',
    ];

    const process = [
        {
            step: 'Application',
            description: 'Online application to State Drug Control Dept',
            time: '1 Day',
        },
        {
            step: 'Scrutiny',
            description: 'Document verification by Drug Inspector',
            time: '3-5 Days',
        },
        {
            step: 'Inspection',
            description: 'Physical inspection of shop & refrigerator',
            time: '7-10 Days',
        },
        {
            step: 'Grant',
            description: 'Issuance of License (Form 20/21)',
            time: '15-30 Days',
        },
    ];

    const pricing = [
        {
            plan: 'Retail License',
            price: '₹14,999',
            desc: 'Start Pharmacy',
            features: [
                'Application Filing',
                'Pharmacist Doc Review',
                'Inspection Guidance',
                'Liaison Assistance'
            ]
        },
        {
            plan: 'Wholesale License',
            price: '₹14,999',
            desc: 'Distribution',
            features: [
                'Application Filing',
                'Competent Person Check',
                'Inspection Guidance',
                'Liaison Assistance'
            ]
        },
        {
            plan: 'Allopathic + Homeopathic',
            price: '₹19,999',
            features: [
                'Combined Application',
                'Form 20/21 + 20C',
                'Inspection Guidance',
                'Liaison Assistance'
            ]
        }
    ];

    const faqs = [
        {
            q: 'Is a Pharmacist mandatory?',
            a: 'Yes, for a Retail Drug License, a Registered Pharmacist (B.Pharm or D.Pharm) must be present at the shop during working hours. For Wholesale, a "Competent Person" (Graduate with 1 yr experience) is enough.',
        },
        {
            q: 'What is the minimum area required?',
            a: 'For Retail: Minimum 10 Sq. meters. For Wholesale: Minimum 10 Sq. meters. For Retail + Wholesale: Minimum 15 Sq. meters.',
        },
        {
            q: 'Is a Refrigerator compulsory?',
            a: 'Yes, you must have a refrigerator to store vaccines and insulin (Cold Chain maintenance) before applying for the license.',
        },
        {
            q: 'How long is the license valid?',
            a: 'Once granted, the Drug License is valid for 5 years. It must be renewed before expiry.',
        },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4">
                            Healthcare Compliance
                        </div>
                        <h1 className="text-3xl lg:text-5xl text-white mb-4">Drug License Registration</h1>
                        <p className="text-xl text-neutral-100 leading-relaxed mb-6">
                            Start your Pharmacy or Pharmaceutical Distribution business. Compliance with Drugs and Cosmetics Act, 1940.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Thermometer className="w-5 h-5 text-accent" />
                                <span>Cold Chain Mandatory</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Shield className="w-5 h-5 text-accent" />
                                <span>5 Year Validity</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* License Types Grid */}
            <section className="py-16 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        {licenseTypes.map((type, index) => (
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Why is it critical?</h2>
                            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                                Dealing in medicines without a license is a serious offense punishable by imprisonment. A license ensures public safety.
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
                                <h3 className="text-2xl font-bold text-primary mb-6 relative z-10">Strict Inspection</h3>
                                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-6 relative z-10">
                                    <div className="flex gap-4">
                                        <Shield className="w-8 h-8 text-blue-600 flex-shrink-0" />
                                        <div>
                                            <p className="text-blue-800 font-bold text-lg">Drug Inspector Visit</p>
                                            <p className="text-blue-700 text-sm mt-1 leading-relaxed">
                                                Before granting the license, a Drug Inspector will physically visit your shop to check cleanliness, area measurements, and the refrigerator. Everything must be perfect.
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
                                Both Pharmacist and Owner documents needed
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
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Consultancy Fees</h2>
                        <p className="text-lg text-neutral-600">Expert guidance for a complex process</p>
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
                                    Get Licensed
                                </button>
                                {index !== 2 && <p className="text-xs text-center mt-2 text-gray-400">*Govt Challan Extra</p>}
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
                    <h2 className="text-3xl lg:text-4xl text-white mb-4">Start Your Pharmacy</h2>
                    <p className="text-xl text-neutral-100 mb-8">
                        Professional help for Drug License Application.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartService}
                            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                            CONTACT EXPERT
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
