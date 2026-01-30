import { FileText, CheckCircle, Clock, ArrowRight, Shield, AlertCircle, TrendingUp, IndianRupee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function ROCAnnualFilings() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStart = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'ROC Annual Filings' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'ROC Annual Filings' } });
        }
    };

    const forms = [
        {
            form: 'Form AOC-4',
            title: 'Financial Statements',
            description: 'Filing of Balance Sheet, Profit & Loss Account, Directors’ Report, and Auditors’ Report.',
            dueDate: '30 days from AGM (Usually 30th Oct)',
        },
        {
            form: 'Form MGT-7/7A',
            title: 'Annual Return',
            description: 'Details of shareholders, directors, and shareholding pattern.',
            dueDate: '60 days from AGM (Usually 29th Nov)',
        },
        {
            form: 'ADT-1',
            title: 'Auditor Appointment',
            description: 'Notice to ROT regarding appointment of auditor (for 5 years).',
            dueDate: '15 days from AGM',
        },
    ];

    const pricing = [
        {
            plan: 'Small Business',
            turnover: 'Up to ₹50 Lakhs',
            price: '₹5,999',
            features: [
                'AOC-4 Filing',
                'MGT-7A Filing',
                'Director KYC (2 Directors)',
                'Drafting of Minutes',
                'Compliance Certificate'
            ]
        },
        {
            plan: 'Growth',
            turnover: '₹50L - ₹5 Cr',
            price: '₹11,999',
            features: [
                'AOC-4 XBRL Filing',
                'MGT-7 Filing',
                'Director KYC (3 Directors)',
                'Statutory Register Update',
                'Secretarial Audit Support'
            ]
        },
        {
            plan: 'Enterprise',
            turnover: 'Above ₹5 Cr',
            price: 'Custom',
            features: [
                'Dedicated Compliance Officer',
                'XBRL Filing',
                'Complete Secretarial Audit',
                'Board Meeting Support',
                'Monthly Compliance Reports'
            ]
        }
    ];

    const penalties = [
        {
            title: 'Late Filing Fee',
            description: '₹100 per day for each day of delay for each form (no upper limit).',
        },
        {
            title: 'Director Disqualification',
            description: 'Failure to file for 3 consecutive years leads to director disqualification for 5 years.',
        },
        {
            title: 'Strike Off',
            description: 'ROC can strike off the company name properly if returns are not filed for 2 years.',
        },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10">
                    <FileText className="w-96 h-96 -mr-20 -mt-20" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-block px-2 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-semibold mb-6 border border-white/20">
                            Corporate Compliance
                        </div>
                        <h1 className="text-4xl md:text-6xl text-white font-bold mb-6 leading-tight">
                            ROC Annual Filings <br />
                            <span className="text-white">Made Simple & Error-Free</span>
                        </h1>
                        <p className="text-xl text-white leading-relaxed mb-8 max-w-2xl">
                            Mandatory annual compliance for Private Limited Companies. Ensure your company stays active and penalty-free with our expert filing services.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg border border-white/20 backdrop-blur-sm">
                                <Clock className="w-5 h-5 text-accent" />
                                <span className="font-medium">Due: 30th Oct & 29th Nov</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg border border-white/20 backdrop-blur-sm">
                                <Shield className="w-5 h-5 text-accent" />
                                <span className="font-medium">Avoid ₹100/day Penalty</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Forms Section */}
            <section className="py-20 -mt-20 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {forms.map((item, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                                    <FileText className="w-7 h-7 text-primary" />
                                </div>
                                <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                                    {item.form}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600 mb-6 text-sm leading-relaxed">{item.description}</p>
                                <div className="text-sm font-semibold text-primary/80 bg-primary/5 p-4 rounded-xl flex items-center gap-2 border border-primary/10">
                                    <Clock className="w-4 h-4" />
                                    Due: {item.dueDate}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Documents Required */}
            <section className="py-20 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">Documents Checklist</h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Keep these documents ready for a smooth filing process. Our experts will verify everything before submission.
                            </p>
                            <div className="space-y-4">
                                {[
                                    'Signed Balance Sheet & P&L Account',
                                    'Directors\' Report & MGT-9',
                                    'Auditor\'s Report',
                                    'List of Shareholders',
                                    'Notice of AGM',
                                    'Board Resolutions',
                                    'DSC of Director and Auditor',
                                ].map((doc, idx) => (
                                    <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                        </div>
                                        <span className="text-gray-800 font-medium">{doc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-8 lg:p-10 rounded-3xl shadow-2xl border border-neutral-100 relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full -z-0"></div>
                            <h3 className="text-2xl font-bold text-primary mb-8 relative z-10">Penalty Calculator</h3>
                            <div className="space-y-6 relative z-10">
                                {penalties.map((item, index) => (
                                    <div key={index} className="flex gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
                                        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h4>
                                            <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Transparent Pricing</h2>
                        <p className="text-lg text-gray-600">Choose a plan that fits your business scale</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {pricing.map((plan, index) => (
                            <div key={index} className={`relative bg-white rounded-2xl shadow-lg border ${index === 1 ? 'border-accent shadow-xl scale-105 z-10' : 'border-neutral-200'} p-8 flex flex-col`}>
                                {index === 1 && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-bold">
                                        MOST POPULAR
                                    </div>
                                )}
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.plan}</h3>
                                <div className="text-sm text-gray-500 mb-6">{plan.turnover}</div>
                                <div className="mb-8">
                                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                                    {plan.price !== 'Custom' && <span className="text-gray-500">/year</span>}
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
                                    onClick={handleStart}
                                    className={`w-full py-4 rounded-xl font-bold transition-all ${index === 1
                                        ? 'bg-accent text-white hover:bg-accent/90 shadow-lg hover:shadow-accent/30'
                                        : 'bg-primary/5 text-primary hover:bg-primary hover:text-white'
                                        }`}
                                >
                                    Choose Plan
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to File Your Annual Returns?</h2>
                    <p className="text-2xl text-blue-100 mb-12 font-light">
                        Don't wait for the last date. Avoid penalties and ensure 100% compliance.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button
                            onClick={handleStart}
                            className="px-10 py-5 bg-white text-primary font-bold rounded-xl hover:bg-blue-50 transition-all shadow-2xl hover:scale-105 flex items-center justify-center gap-3"
                        >
                            Start Annual Filing
                            <ArrowRight className="w-6 h-6" />
                        </button>
                        <button className="px-10 py-5 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all">
                            Talk to Compliance Expert
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
