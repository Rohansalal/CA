import { UserCheck, CheckCircle, Clock, ArrowRight, AlertCircle, FileText, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../user-panel/contexts/AuthContext';

export function DirectorKYC() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStart = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'Director KYC' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'Director KYC' } });
        }
    };

    const pricing = [
        {
            plan: 'KYC Web Service',
            desc: 'For directors with no change in details',
            price: '₹999',
            features: [
                'DIR-3 KYC Web Filing',
                'OTP Verification',
                'Acknowledgment Receipt',
                'Same Day Processing'
            ]
        },
        {
            plan: 'KYC E-Form',
            desc: 'For updating personal details (Mobile/Email/Address)',
            price: '₹1,999',
            features: [
                'DIR-3 KYC E-Form Filing',
                'DSC Verification',
                'Document Update on MCA',
                'Compliance Certificate'
            ]
        },
        {
            plan: 'Bulk Filing',
            desc: 'For companies with 3+ directors',
            price: 'Custom',
            features: [
                'Discounted Rates',
                'Priority Processing',
                'Dedicated Support',
                'Monthly Reports'
            ]
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10">
                    <UserCheck className="w-96 h-96 -mr-20 -mt-20" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-semibold mb-6 border border-white/20">
                            Director Compliance
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Director KYC (DIR-3) <br />
                            <span className="text-accent">Keep Your DIN Active</span>
                        </h1>
                        <p className="text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl">
                            Every individual holding a Director Identification Number (DIN) must file DIR-3 KYC annually on or before 30th September to avoid disqualification.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg border border-white/20 backdrop-blur-sm">
                                <Clock className="w-5 h-5 text-accent" />
                                <span className="font-medium">Due Date: 30th Sept</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg border border-white/20 backdrop-blur-sm">
                                <AlertCircle className="w-5 h-5 text-red-400" />
                                <span className="font-medium">Late Fee: ₹5,000 Flat</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Info Grid */}
            <section className="py-20 -mt-20 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                                <UserCheck className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Who Needs to File?</h3>
                            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                                Any person who has been allotted a DIN on or before 31st March of the financial year. This applies even if the Director is disqualified.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                                <FileText className="w-7 h-7 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Two Types of Filing</h3>
                            <ul className="text-sm text-gray-600 space-y-4">
                                <li className="flex gap-3">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                                    <span><strong>Web-based KYC:</strong> OTP verification if no change in personal details.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                                    <span><strong>E-Form KYC:</strong> Filing with DSC if updating address, mobile, or email.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mb-6">
                                <AlertCircle className="w-7 h-7 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Consequences</h3>
                            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                                Non-filing leads to <strong>DIN Deactivation</strong>. You cannot file any forms, be appointed as director, or sign documents. Reactivation requires a penalty of ₹5,000.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Simple, Flat Pricing</h2>
                        <p className="text-lg text-gray-600">No hidden charges. 100% Tax Deductible Invoice.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {pricing.map((plan, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-md border border-neutral-200 p-8 flex flex-col hover:border-primary/50 transition-colors">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.plan}</h3>
                                <div className="text-sm text-gray-500 mb-6 min-h-[40px]">{plan.desc}</div>
                                <div className="mb-8">
                                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                                    {plan.price !== 'Custom' && <span className="text-sm text-gray-500 ml-1">/director</span>}
                                </div>
                                <ul className="space-y-4 mb-8 flex-1">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={handleStart}
                                    className="w-full py-3 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all"
                                >
                                    Select Plan
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Documents Required */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-10 md:p-14 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-8 text-center">Required Details for KYC</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    'Personal Mobile Number (OTP required)',
                                    'Personal Email ID (OTP required)',
                                    'Self-attested PAN Card',
                                    'Self-attested Aadhaar Card',
                                    'Passport (for Foreign Nationals)',
                                    'Passport Size Photo',
                                    'Digital Signature Certificate (DSC)',
                                    'DIN Number'
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 bg-white/10 p-3 rounded-lg border border-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
                                        <CheckCircle className="w-5 h-5 text-accent" />
                                        <span className="font-medium text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 p-4 bg-accent/20 rounded-xl border border-accent/20 flex items-start gap-4">
                                <Info className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-white/90">
                                    <strong>Important:</strong> The mobile number and email ID provided must be unique to the director and should not be used by any other director or professional (CA/CS).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">File DIR-3 KYC Instantly</h2>
                    <p className="text-xl text-gray-600 mb-10">
                        Secure your directorship status now. Process takes less than 15 minutes.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStart}
                            className="px-10 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30 inline-flex items-center justify-center gap-2"
                        >
                            File KYC Now
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="px-10 py-4 bg-white text-primary border border-gray-200 font-bold rounded-xl hover:border-primary hover:bg-blue-50 transition-all shadow-sm">
                            Check Status
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}





