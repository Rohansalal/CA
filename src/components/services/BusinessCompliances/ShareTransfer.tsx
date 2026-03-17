import { ArrowRight, FileText, CheckCircle, Clock, ArrowLeftRight, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../user-panel/contexts/AuthContext';

export function ShareTransfer() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStart = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'Share Transfer' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'Share Transfer' } });
        }
    };

    const steps = [
        {
            title: 'Notice & Intimation',
            desc: 'Transferor sends notice to company about intent to transfer shares.'
        },
        {
            title: 'Share Transfer Deed (SH-4)',
            desc: 'Execution of Form SH-4 by both Transferor and Transferee.'
        },
        {
            title: 'Stamp Duty Payment',
            desc: 'Payment of stamp duty (0.25% of consieration value) on the transfer deed.'
        },
        {
            title: 'Board Meeting',
            desc: 'Company holds Board Meeting to approve the share transfer.'
        },
        {
            title: 'Certificate Endorsement',
            desc: 'Company endorses the share certificate with new owner details.'
        }
    ];

    const pricing = [
        {
            plan: 'Share Transfer',
            desc: 'Voluntary transfer of shares',
            price: '₹2,999',
            features: [
                'SH-4 Deed Drafting',
                'Stamp Duty Guidance',
                'Board Resolution Drafting',
                'Share Certificate Endorsement'
            ]
        },
        {
            plan: 'Share Transmission',
            desc: 'Transfer due to death/law',
            price: '₹4,999',
            features: [
                'Legal Documentation Review',
                'Transmission Forms Drafting',
                'Board Resolution',
                'Succession Advice'
            ]
        },
        {
            plan: 'Bulk Transfer',
            desc: 'Transfer between multiple parties',
            price: 'Custom',
            features: [
                'Dedicated Consultant',
                'Bulk SH-4 Generation',
                'Stamp Duty Optimization',
                'Shareholders Agreement'
            ]
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10">
                    <ArrowLeftRight className="w-96 h-96 -mr-20 -mt-20" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-semibold mb-6 border border-white/20">
                            Equity Management
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Share Transfer & Transmission <br />
                            <span className="text-accent">Secure Equity Handover</span>
                        </h1>
                        <p className="text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl">
                            Seamless legal process for transferring share ownership in Private Limited Companies. We handle drafting, stamp duty calculation, and ROC compliance.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg border border-white/20 backdrop-blur-sm">
                                <FileText className="w-5 h-5 text-accent" />
                                <span className="font-medium">Form SH-4 Drafting</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg border border-white/20 backdrop-blur-sm">
                                <Shield className="w-5 h-5 text-accent" />
                                <span className="font-medium">Stamp Duty: 0.25%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Difference Section */}
            <section className="py-20 -mt-20 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 lg:p-10 rounded-3xl shadow-xl border border-neutral-100 hover:border-primary/30 transition-all">
                            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                                <ArrowLeftRight className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Share Transfer</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Voluntary act where a shareholder transfers their shares to another person for consideration (sale) or as a gift.
                            </p>
                            <div className="space-y-3 bg-neutral-50 p-6 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary" />
                                    <span className="text-gray-800 font-medium">Initiated by Shareholder</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary" />
                                    <span className="text-gray-800 font-medium">Stamp Duty is Mandatory (0.25%)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary" />
                                    <span className="text-gray-800 font-medium">Form SH-4 Execution Required</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 lg:p-10 rounded-3xl shadow-xl border border-neutral-100 hover:border-green-600/30 transition-all">
                            <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                                <FileText className="w-7 h-7 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Share Transmission</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Transfer of shares by operation of law (e.g., death, insolvency/bankruptcy) to the legal heir or nominee.
                            </p>
                            <div className="space-y-3 bg-neutral-50 p-6 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span className="text-gray-800 font-medium">Operation of Law (Automatic)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span className="text-gray-800 font-medium">No Stamp Duty Required</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span className="text-gray-800 font-medium">Death/Succession Certificate Required</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Flow */}
            <section className="py-20 bg-neutral-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Transfer Process Timeline</h2>
                        <p className="text-lg text-gray-600">Step-by-step compliant execution for Pvt Ltd Companies.</p>
                    </div>
                    <div className="relative">
                        {/* Connector Line (Desktop) */}
                        <div className="hidden md:block absolute top-10 left-0 w-full h-1 bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 -z-0"></div>

                        <div className="grid md:grid-cols-5 gap-8">
                            {steps.map((step, idx) => (
                                <div key={idx} className="relative flex flex-col items-center text-center group">
                                    <div className="w-20 h-20 bg-white border-4 border-primary/10 rounded-full flex items-center justify-center text-2xl font-bold text-primary mb-6 shadow-lg group-hover:scale-110 group-hover:border-accent transition-all z-10">
                                        {idx + 1}
                                    </div>
                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100 min-h-[160px] flex flex-col items-center">
                                        <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                                        <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-primary">Service Packages</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {pricing.map((plan, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8 flex flex-col hover:border-primary/50 transition-all">
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-gray-900">{plan.plan}</h3>
                                    <p className="text-sm text-gray-500">{plan.desc}</p>
                                </div>
                                <div className="mb-6 pb-6 border-b border-gray-100">
                                    <span className="text-3xl font-bold text-primary">{plan.price}</span>
                                    {plan.price !== 'Custom' && <span className="text-gray-500 text-sm"> / case</span>}
                                </div>
                                <ul className="space-y-4 mb-8 flex-1">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                                            <div className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0"></div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={handleStart}
                                    className="w-full py-3 rounded-xl bg-primary/5 text-primary font-bold hover:bg-primary hover:text-white transition-all border border-primary/10"
                                >
                                    Get Started
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Documents Section */}
            <section className="py-20 bg-primary text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-12 text-center">Required Documents Checklist</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                            <h4 className="font-bold text-xl mb-6 text-accent">For Share Transfer</h4>
                            <ul className="space-y-4">
                                {['Original Share Certificates', 'Form SH-4 (Transfer Deed)', 'Proof of Stamp Duty Payment', 'PAN of Transferor', 'PAN of Transferee'].map((d, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-blue-50">
                                        <CheckCircle className="w-5 h-5 text-accent" /> {d}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                            <h4 className="font-bold text-xl mb-6 text-green-400">For Transmission</h4>
                            <ul className="space-y-4">
                                {['Original Share Certificates', 'Death Certificate (Certified)', 'Succession Certificate/Legal Heir', 'PAN of Legal Heir', 'Application for Transmission'].map((d, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-blue-50">
                                        <CheckCircle className="w-5 h-5 text-green-400" /> {d}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <button
                            onClick={handleStart}
                            className="px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-blue-50 transition-all shadow-xl inline-flex items-center justify-center gap-2"
                        >
                            Start Transfer Process
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}





