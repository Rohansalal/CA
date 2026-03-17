import { Factory, CheckCircle, FileText, Clock, ArrowRight, Shield, Leaf, Droplets, Wind } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../user-panel/contexts/AuthContext';

export function PollutionControlLicense() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartService = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'Pollution Control (NOC)' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'Pollution Control (NOC)' } });
        }
    };

    const categories = [
        {
            type: 'White Category',
            description: 'Non-Polluting Industries',
            icon: Leaf,
            features: ['Exempt from Consent', 'Simple Intimation', 'e.g., Assembly Units'],
        },
        {
            type: 'Green Category',
            description: 'Low Polluting Industries',
            icon: Wind,
            features: ['Consent Required', '15 Years Validity', 'e.g., Washing Units'],
        },
        {
            type: 'Orange/Red Category',
            description: 'High Polluting Industries',
            icon: Factory,
            features: ['Strict Audit', '5 Years Validity', 'e.g., Chemical Plants'],
        },
    ];

    const benefits = [
        'Mandatory Legal Requirement for Industries',
        'Avoid Closure Notices from PCB',
        'Necessary for Electricity Connection',
        'Required for Bank Loans',
        'Environmentally Responsible Image',
        'Avoid Heavy Environmental Compensation',
        'Smooth Export Compliance',
        'Water/Air Act Compliance'
    ];

    const documents = [
        'Project Report with Process Flow Chart',
        'Land Ownership Proof (Rent/Lease)',
        'Site Plan',
        'Machinery Details & Cost',
        'Water Consumption & Discharge Details',
        'Effluent Treatment Plant (ETP) details (if any)',
        'Partnership Deed / MOA-AOA',
    ];

    const process = [
        {
            step: 'Classification',
            description: 'Identifying Category (Red/Orange/Green/White)',
            time: '1 Day',
        },
        {
            step: 'CTE Filing',
            description: 'Consent to Establish (Before Construction)',
            time: '7-15 Days',
        },
        {
            step: 'Construction',
            description: 'Setting up plant & machinery',
            time: 'User Scope',
        },
        {
            step: 'CTO Filing',
            description: 'Consent to Operate (Before Production)',
            time: '15-30 Days',
        },
        {
            step: 'NOC Grant',
            description: 'Issuance of Pollution Certificate',
            time: 'Final Step',
        },
    ];

    const pricing = [
        {
            plan: 'CTE (Establish)',
            price: '₹9,999',
            desc: 'Step 1',
            features: [
                'Application Filing',
                'Document Preparation',
                'Liaison with PCB',
                'Reply to Queries'
            ]
        },
        {
            plan: 'CTO (Operate)',
            price: '₹14,999',
            desc: 'Step 2',
            features: [
                'Application Filing',
                'Site Layout Draft',
                'Liaison with PCB',
                'Inspection Support'
            ]
        },
        {
            plan: 'Complete Package',
            price: '₹22,999',
            features: [
                'CTE + CTO Filing',
                'Priority Processing',
                'End-to-End Support',
                'Consultancy'
            ]
        }
    ];

    const faqs = [
        {
            q: 'What is CTE and CTO?',
            a: 'CTE (Consent to Establish) is obtained BEFORE setting up the industry. CTO (Consent to Operate) is obtained AFTER setup but BEFORE starting production.',
        },
        {
            q: 'Is it mandatory for all?',
            a: 'Most manufacturing units require it. However, "White Category" industries are exempt from obtaining Consent, they only need to submit an intimation.',
        },
        {
            q: 'What determines the category?',
            a: 'The Pollution Control Board (SPCB/CPCB) has classified industries into Red, Orange, Green, and White based on their "Pollution Index" score.',
        },
        {
            q: 'What if I operate without NOC?',
            a: 'Operating without valid Consent can lead to immediate closure of the industry, disconnection of electricity/water, and heavy financial penalties.',
        },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4">
                            Environmental Compliance
                        </div>
                        <h1 className="text-3xl lg:text-5xl text-white mb-4">Pollution Control NOC (PCB)</h1>
                        <p className="text-xl text-neutral-100 leading-relaxed mb-6">
                            Obtain Consent to Establish (CTE) and Consent to Operate (CTO) from State Pollution Control Board.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Leaf className="w-5 h-5 text-accent" />
                                <span>Go Green</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Droplets className="w-5 h-5 text-accent" />
                                <span>Water & Air Act</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="py-16 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        {categories.map((type, index) => (
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Why Pollution NOC?</h2>
                            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                                Industrial Development must go hand in hand with environmental protection. The NOC ensures your business is eco-friendly and compliant.
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
                                <h3 className="text-2xl font-bold text-primary mb-6 relative z-10">Closure Risk</h3>
                                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl mb-6 relative z-10">
                                    <div className="flex gap-4">
                                        <Shield className="w-8 h-8 text-red-600 flex-shrink-0" />
                                        <div>
                                            <p className="text-red-800 font-bold text-lg">Avoid Shutdown</p>
                                            <p className="text-red-700 text-sm mt-1 leading-relaxed">
                                                Pollution Boards are very strict. Operating without consent is a direct invitation for a closure notice and disconnection of power supply.
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
                                Detailed technical documents needed
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Process Workflow</h2>
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
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Professional Fees</h2>
                        <p className="text-lg text-neutral-600">Technical consultancy for PCB approvals</p>
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
                                    Get Quote
                                </button>
                                {index !== 2 && <p className="text-xs text-center mt-2 text-gray-400">*Govt/Lab Fees Extra</p>}
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
                    <h2 className="text-3xl lg:text-4xl text-white mb-4">Eco-Friendly Business</h2>
                    <p className="text-xl text-neutral-100 mb-8">
                        Get your Pollution Control NOC today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartService}
                            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                            GET NOC
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}





