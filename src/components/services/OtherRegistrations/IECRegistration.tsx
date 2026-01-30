import { Globe, CheckCircle, FileText, Clock, ArrowRight, Shield, Plane, Ship, RefreshCw, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function IECRegistration() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartService = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'Import Export Code (IEC)' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'Import Export Code (IEC)' } });
        }
    };

    const features = [
        {
            icon: Globe,
            title: 'Global Trade',
            description: 'Essential for Import/Export.',
        },
        {
            icon: Shield,
            title: 'Lifetime Validity',
            description: 'No renewal required.',
        },
        {
            icon: Plane,
            title: 'Customs Clearance',
            description: 'Mandatory for clearing goods.',
        },
        {
            icon: Ship,
            title: 'Shipping',
            description: 'Required by shipping agencies.',
        },
    ];

    const benefits = [
        'Prerequisite for Import/Export',
        'Lifelong validity, no renewal',
        'No annual return filing',
        'Online registration process',
        'Access to global markets',
        'Claim export benefits (MEIS/SEIS)',
        'Legal recognition as Exporter/Importer',
        'Easy bank transaction for foreign currency'
    ];

    const documents = [
        'PAN Card of Business/Individual',
        'Aadhaar Card of Applicant',
        'Cancelled Cheque/Bank Certificate',
        'Address Proof of Business (Electricity Bill/Rent Agreement)',
        'Digital Signature Certificate (DSC)',
        'Sale Deed (if self-owned)',
    ];

    const process = [
        {
            step: 'Application Preparation',
            description: 'Collecting documents and preparing application on DGFT',
            time: '1 Day',
        },
        {
            step: 'Digital Signature',
            description: 'Linking DSC to DGFT portal for authentication',
            time: 'Instant',
        },
        {
            step: 'Submission',
            description: 'Online submission of ANF-2A form',
            time: '1 Hour',
        },
        {
            step: 'Government Fee',
            description: 'Payment of ₹500 government fee',
            time: 'Instant',
        },
        {
            step: 'IEC Issuance',
            description: 'Generation of e-IEC certificate',
            time: 'Same Day',
        },
    ];

    const pricing = [
        {
            plan: 'IEC Registration',
            price: '₹1,999',
            desc: 'Best Value',
            features: [
                'DGFT Application',
                'Certificate Issuance',
                'Consultation',
                'AD Code Guidance'
            ]
        },
        {
            plan: 'IEC + AD Code',
            price: '₹3,999',
            features: [
                'IEC Registration',
                'AD Code Registration',
                'Icegate Registration',
                'Bank Liaison Guidance'
            ]
        },
        {
            plan: 'Modification',
            price: '₹1,499',
            features: [
                'Update Existing IEC',
                'Address Change',
                'Bank Change',
                'Yearly Validation'
            ]
        }
    ];

    const compliances = [
        {
            compliance: 'Annual Update',
            form: 'Online Confirmation',
            frequency: 'Annual',
            dueDate: 'April to June',
        },
        {
            compliance: 'RCMC Registration',
            form: 'Export Council',
            frequency: 'One Time',
            dueDate: 'Before Export',
        }
    ];

    const faqs = [
        {
            q: 'Is IEC mandatory for service exporters?',
            a: 'Yes, IEC is mandatory for service providers also if they want to avail benefits under the Service Exports from India Scheme (SEIS).',
        },
        {
            q: 'Can I export without IEC?',
            a: 'No, IEC is a mandatory requirement for clearing customs. The only exception is for personal use goods (not for trade) or government notified exemptions.',
        },
        {
            q: 'Does IEC require renewal?',
            a: 'No, IEC is issued for a lifetime and does not require renewal. However, details must be confirmed/updated annually between April and June.',
        },
        {
            q: 'What is AD Code?',
            a: 'Authorized Dealer (AD) Code is a 14-digit code issued by the bank where you have your current account. It is required for customs clearance of export goods.',
        },
        {
            q: 'Can one PAN have multiple IECs?',
            a: 'No, only one IEC is issued against a single PAN card. If you have multiple branches, they are added as branches under the same IEC.',
        },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4">
                            International Trade
                        </div>
                        <h1 className="text-3xl lg:text-5xl text-white mb-4">Import Export Code (IEC)</h1>
                        <p className="text-xl text-neutral-100 leading-relaxed mb-6">
                            Unlock global opportunities. IEC is the first requirement for any business looking to import or export goods/services from India.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Clock className="w-5 h-5 text-accent" />
                                <span>Lifetime Validity</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Plane className="w-5 h-5 text-accent" />
                                <span>DGFT Issued</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-16 -mt-8 relative z-10">
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
            <section className="py-16 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 text-left">
                        <div>
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Why Apply for IEC?</h2>
                            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                                Without IEC, you cannot clear goods from customs, send money abroad for imports, or receive money for exports.
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
                                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100 rounded-bl-full -z-0"></div>
                                <h3 className="text-2xl font-bold text-primary mb-6 relative z-10">Mandatory Update</h3>
                                <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl mb-6 relative z-10">
                                    <div className="flex gap-4">
                                        <AlertCircle className="w-8 h-8 text-orange-600 flex-shrink-0" />
                                        <div>
                                            <p className="text-orange-800 font-bold text-lg">April to June</p>
                                            <p className="text-orange-700 text-sm mt-1 leading-relaxed">
                                                All IEC holders must confirm their details online on DGFT portal every year between April and June, even if there are no changes.
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
                                Keep these ready for instant application
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
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Simple Pricing</h2>
                        <p className="text-lg text-neutral-600">Start your export journey</p>
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
                                    Apply Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Compliances */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Post Registration</h2>
                        <p className="text-lg text-neutral-600">Keep your IEC active</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {compliances.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6 hover:shadow-2xl transition-all"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <RefreshCw className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl text-primary mb-2 font-semibold">{item.compliance}</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-neutral-500">Frequency:</span>
                                        <span className="text-neutral-800 font-medium">{item.frequency}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-neutral-500">Due Date:</span>
                                        <span className="text-accent font-medium">{item.dueDate}</span>
                                    </div>
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
                    <h2 className="text-3xl lg:text-4xl text-white mb-4">Start Exporting Today</h2>
                    <p className="text-xl text-neutral-100 mb-8">
                        Expert assistance for IEC Application and Modification.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartService}
                            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                            GET IEC CODE
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
