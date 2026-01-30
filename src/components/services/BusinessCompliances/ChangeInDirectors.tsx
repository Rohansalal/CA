import { UserPlus, UserMinus, CheckCircle, Clock, ArrowRight, FileText, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function ChangeInDirectors() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStart = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'Change in Directors' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'Change in Directors' } });
        }
    };

    const pricing = [
        {
            plan: 'Add Director',
            price: '₹2,499',
            unit: '/director',
            features: [
                'DIN Application (if required)',
                'DIR-12 Filing',
                'Drafting Resolution',
                'Consent Letters (DIR-2)',
                'Resignation Letter (if replacing)'
            ]
        },
        {
            plan: 'Remove Director',
            price: '₹2,499',
            unit: '/director',
            features: [
                'Resignation Letter Drafting',
                'Board Resolution',
                'DIR-12 Filing (Company)',
                'DIR-11 Filing (Director)',
                'No Dues Certificate'
            ]
        },
        {
            plan: 'DIN Application',
            price: '₹1,499',
            unit: '/DIN',
            features: [
                'DIR-3 Preparation',
                'Digital Signature (DSC)',
                'DIN Allotment Support',
                'Professional Certification'
            ]
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10">
                    <UserPlus className="w-96 h-96 -mr-20 -mt-20" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-semibold mb-6 border border-white/20">
                            Management Change
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Change/Add Directors <br />
                            <span className="text-accent">Smooth Board Transition</span>
                        </h1>
                        <p className="text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl">
                            From appointment to resignation, we handle all ROC filings (DIR-12, DIR-11) and legal documentation efficiently.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg border border-white/20 backdrop-blur-sm">
                                <Clock className="w-5 h-5 text-accent" />
                                <span className="font-medium">3-5 Days Process</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg border border-white/20 backdrop-blur-sm">
                                <FileText className="w-5 h-5 text-accent" />
                                <span className="font-medium">Form DIR-12</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scenarios Section */}
            <section className="py-20 -mt-20 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12">

                        {/* Appointment */}
                        <div className="flex flex-col h-full bg-white border border-neutral-100 rounded-3xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all">
                            <div className="bg-green-50 p-8 flex items-center gap-6 border-b border-green-100">
                                <div className="bg-green-100 p-4 rounded-2xl shadow-inner">
                                    <UserPlus className="w-10 h-10 text-green-700" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">Appointment</h3>
                                    <p className="text-green-800 text-sm">Add a new director to the board</p>
                                </div>
                            </div>
                            <div className="p-8 flex-grow">
                                <p className="text-gray-600 mb-8 leading-relaxed">Adding a new brain to the board? We manage the entire legal process of induction ensuring the new director has valid DIN and DSC.</p>
                                <div className="bg-neutral-50 p-6 rounded-2xl">
                                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-green-600" /> Process Steps:
                                    </h4>
                                    <ul className="space-y-3">
                                        {['Obtain DSC & DIN', 'Consent in DIR-2', 'Board Resolution', 'EGM (if required)', 'File DIR-12'].map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Resignation */}
                        <div className="flex flex-col h-full bg-white border border-neutral-100 rounded-3xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all">
                            <div className="bg-red-50 p-8 flex items-center gap-6 border-b border-red-100">
                                <div className="bg-red-100 p-4 rounded-2xl shadow-inner">
                                    <UserMinus className="w-10 h-10 text-red-700" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">Resignation</h3>
                                    <p className="text-red-800 text-sm">Removal or exit of a director</p>
                                </div>
                            </div>
                            <div className="p-8 flex-grow">
                                <p className="text-gray-600 mb-8 leading-relaxed">Smooth exit formalities ensuring no future liability for the resigning director and proper update in MCA records.</p>
                                <div className="bg-neutral-50 p-6 rounded-2xl">
                                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-red-600" /> Process Steps:
                                    </h4>
                                    <ul className="space-y-3">
                                        {['Resignation Letter', 'Board Acceptance', 'File DIR-12 (Company)', 'File DIR-11 (Director)', 'No Due Certificate'].map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-primary mb-4">Professional Fees</h2>
                        <p className="text-gray-600">Flat fees per director update.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {pricing.map((plan, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8 flex flex-col hover:-translate-y-1 transition-all duration-300">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">{plan.plan}</h3>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                                    <span className="text-gray-400 text-sm font-medium">{plan.unit}</span>
                                </div>
                                <ul className="space-y-4 mb-8 flex-1">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                                            <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={handleStart}
                                    className="w-full py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30"
                                >
                                    Start Process
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Documents Section */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 p-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                            <FileText className="w-8 h-8 text-primary" />
                            Required Documents
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
                            {[
                                'PAN Card of Director',
                                'Aadhaar Card / Voter ID',
                                'Passport (for NRI/Foreigner)',
                                'Passport Size Photo',
                                'Digital Signature Certificate (DSC)',
                                'Consent to act as Director (DIR-2)',
                                'Resignation Letter (if applicable)',
                                'Declaration of Interest (MBP-1)'
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-4 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                                    <div className="w-2 h-2 bg-accent rounded-full mt-2.5 flex-shrink-0"></div>
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 p-6 bg-yellow-50 rounded-xl border border-yellow-100 flex gap-4">
                            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold text-yellow-800 mb-1">Minimum Director Requirement</h4>
                                <p className="text-sm text-yellow-700">A Private Limited Company must have at least 2 directors at all times. If a resignation drops the count below 2, a new director must be appointed first.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">Update Your Board Details</h2>
                    <p className="text-xl text-blue-100 mb-12">
                        Ensure the MCA registry reflects the correct management structure of your company.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button
                            onClick={handleStart}
                            className="px-10 py-5 bg-white text-primary font-bold rounded-xl hover:bg-blue-50 transition-all shadow-2xl inline-flex items-center justify-center gap-2 group"
                        >
                            Start Filing
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
