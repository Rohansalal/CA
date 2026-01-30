import { FileText, CheckCircle, Clock, ArrowRight, Shield, AlertCircle, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function LLPAnnualFilings() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStart = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'LLP Annual Filings' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'LLP Annual Filings' } });
        }
    };

    const filings = [
        {
            form: 'Form 11',
            title: 'Annual Return',
            description: 'Statement of details of partners and contributions.',
            dueDate: '30th May',
            penalty: '₹100 per day',
        },
        {
            form: 'Form 8',
            title: 'Statement of Accounts',
            description: 'Statement of Account & Solvency (Assets & Liabilities).',
            dueDate: '30th October',
            penalty: '₹100 per day',
        },
        {
            form: 'ITR-5',
            title: 'Income Tax Return',
            description: 'Annual Income Tax Return filing for the LLP.',
            dueDate: '31st July / 31st Oct (Audit)',
            penalty: 'Interest + Fees',
        },
    ];

    const pricing = [
        {
            plan: 'Basic',
            turnover: 'No Activity / NIL',
            price: '₹2,999',
            features: [
                'Form 11 Filing (NIL)',
                'Form 8 Filing (NIL)',
                'DIR-3 KYC (2 Partners)',
                'Drafting of Documents',
                'Acknowledgment Receipt'
            ]
        },
        {
            plan: 'Standard',
            turnover: 'Up to ₹40 Lakhs',
            price: '₹5,999',
            features: [
                'Form 11 Filing',
                'Form 8 Preparation & Filing',
                'DIR-3 KYC (2 Partners)',
                'ITR-5 Filing',
                'Computation of Income'
            ]
        },
        {
            plan: 'Premium',
            turnover: 'Above ₹40 Lakhs',
            price: '₹12,999',
            features: [
                'Tax Audit Support',
                'Form 11 & Form 8 Filing',
                'ITR Filing with Audit Report',
                'Director KYC',
                'Dedicated CA Support'
            ]
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10">
                    <TrendingUp className="w-96 h-96 -mr-20 -mt-20" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-semibold mb-6 border border-white/20">
                            Limited Liability Partnership
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            LLP Annual Compliance <br />
                            <span className="text-accent">Zero Hassle. Zero Penalties.</span>
                        </h1>
                        <p className="text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl">
                            LLPs must file annual returns irrespective of business turnover. Stay compliant and avoid the heavy penalty of ₹100/day.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg border border-white/20 backdrop-blur-sm">
                                <Clock className="w-5 h-5 text-accent" />
                                <span className="font-medium">Form 11: 30th May</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg border border-white/20 backdrop-blur-sm">
                                <Clock className="w-5 h-5 text-accent" />
                                <span className="font-medium">Form 8: 30th Oct</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filings Grid */}
            <section className="py-20 -mt-20 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {filings.map((item, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors">
                                        <FileText className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                                    </div>
                                    <div className="text-xs font-bold px-3 py-1 bg-red-100 text-red-700 rounded-full border border-red-200">
                                        Penalty: {item.penalty}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <div className="text-sm font-semibold text-accent mb-3 uppercase tracking-wide">{item.form}</div>
                                <p className="text-gray-600 mb-6 text-sm leading-relaxed">{item.description}</p>
                                <div className="pt-4 border-t border-dashed border-gray-200">
                                    <div className="text-sm text-gray-500 mb-1">Due Date</div>
                                    <div className="font-bold text-gray-900 flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-primary" />
                                        {item.dueDate}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Audit Requirement Section */}
            <section className="py-20 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-neutral-100">
                        <div className="grid md:grid-cols-2">
                            <div className="p-10 md:p-14">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">Tax Audit for LLP</h2>
                                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                                    Unlike companies, LLPs are not required to get their accounts audited unless they cross specific turnover or contribution thresholds.
                                </p>
                                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8">
                                    <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5" />
                                        Audit is Mandatory if:
                                    </h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                                            </div>
                                            <span className="text-gray-700">Turnover exceeds <strong>₹40 Lakhs</strong> in a financial year</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                                            </div>
                                            <span className="text-gray-700">Capital Contribution exceeds <strong>₹25 Lakhs</strong></span>
                                        </li>
                                    </ul>
                                </div>
                                <button
                                    onClick={handleStart}
                                    className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30">
                                    Check Audit Applicability
                                </button>
                            </div>
                            <div className="bg-secondary p-10 md:p-14 text-white flex flex-col justify-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold mb-8 border-b border-white/20 pb-4">Checklist of Documents</h3>
                                    <div className="space-y-5">
                                        {[
                                            'Digital Signature Certificate (DSC)',
                                            'LLP Agreement',
                                            'Bank Statements (Full Year)',
                                            'Purchase & Sales Invoices',
                                            'Expense Bills & Vouchers',
                                            'TDS Certificates (if any)'
                                        ].map((doc, idx) => (
                                            <div key={idx} className="flex items-center gap-4 group">
                                                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                                                    <CheckCircle className="w-5 h-5 text-white" />
                                                </div>
                                                <span className="text-blue-50 font-medium">{doc}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
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
                        <p className="text-lg text-gray-600">Affordable packages for every stage of your LLP</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {pricing.map((plan, index) => (
                            <div key={index} className={`relative bg-white rounded-2xl shadow-lg border ${index === 1 ? 'border-accent shadow-xl scale-105 z-10' : 'border-neutral-200'} p-8 flex flex-col`}>
                                {index === 1 && (
                                    <div className="absolute top-0 right-0 bg-accent text-white px-4 py-1 rounded-bl-xl rounded-tr-xl text-sm font-bold">
                                        RECOMMENDED
                                    </div>
                                )}
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.plan}</h3>
                                <div className="text-sm text-gray-500 mb-6">{plan.turnover}</div>
                                <div className="mb-8">
                                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                                    <span className="text-gray-500">/year</span>
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
                                    Get Started
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">File Your LLP Returns Today</h2>
                    <p className="text-xl text-blue-100 mb-12 font-light">
                        Expert assisted filing with zero errors. We handle drafting, certification, and uploading.
                    </p>
                    <button
                        onClick={handleStart}
                        className="px-10 py-5 bg-white text-primary font-bold rounded-xl hover:bg-blue-50 transition-all shadow-2xl hover:scale-105 inline-flex items-center justify-center gap-3"
                    >
                        Start Filing Process
                        <ArrowRight className="w-6 h-6" />
                    </button>
                </div>
            </section>
        </div>
    );
}
