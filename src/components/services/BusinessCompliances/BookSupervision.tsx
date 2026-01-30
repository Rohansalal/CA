import { Eye, CheckCircle, FileText, Clock, ArrowRight, Shield, AlertTriangle, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function BookSupervision() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartService = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'Book Supervision' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'Book Supervision' } });
        }
    };

    const features = [
        {
            icon: Eye,
            title: 'Expert Oversight',
            description: 'Regular review of accounts by CA/Experts.',
        },
        {
            icon: Search,
            title: 'Error Detection',
            description: 'Identifies and rectifies accounting errors early.',
        },
        {
            icon: Shield,
            title: 'Compliance Check',
            description: 'Ensures books are compliant with GST/TDS laws.',
        },
        {
            icon: AlertTriangle,
            title: 'Fraud Prevention',
            description: 'Internal control check to prevent leakages.',
        },
    ];

    const benefits = [
        'Assurance of accurate financial data',
        'Timely statutory compliance',
        'Training for your internal accounts team',
        'Better preparation for statutory audit',
        'Cost-effective compared to full-time CFO',
        'Valuable MIS reporting',
        'Peace of mind for management',
        'Process improvement suggestions'
    ];

    const documents = [
        'Access to Accounting Software',
        'Bank Statements',
        'Sample of Invoices/Vouchers',
        'GST & TDS Returns filed',
        'Previous Audit Report',
    ];

    const process = [
        {
            step: 'Initial Audit',
            description: 'We conduct a one-time setup audit to understand your current system and identify gaps.',
            time: 'Days 1-3',
        },
        {
            step: 'Routine Check',
            description: 'Monthly/Quarterly verification of entered data against physical documents.',
            time: 'Recurring',
        },
        {
            step: 'Compliance Verification',
            description: 'Ensuring all GST, TDS, and other statutory dues are calculated and paid correctly.',
            time: 'Monthly',
        },
        {
            step: 'Ledger Scrutiny',
            description: 'In-depth review of key ledgers like Cash, Bank, Sales, and Purchase.',
            time: 'Monthly',
        },
        {
            step: 'Reporting',
            description: 'Submitting a detailed observation report to management with action points.',
            time: 'Post Review',
        },
        {
            step: 'Training & Closure',
            description: 'Guiding your accountant to correct the errors and preventing recurrence.',
            time: 'Correction Phase',
        },
    ];

    const criticalConsiderations = [
        {
            title: 'Independence',
            description: 'Our review is unbiased and independent of the person writing the accounts.',
            icon: Shield,
        },
        {
            title: 'Not a Statutory Audit',
            description: 'This is an internal management tool, distinct from the mandatory year-end audit.',
            icon: AlertTriangle,
        },
        {
            title: 'Scope Definition',
            description: 'Scope is defined by management needs (e.g., focus on inventory or cash).',
            icon: Search,
        },
        {
            title: 'Cooperation',
            description: 'Success depends on the cooperation of your internal accounts team.',
            icon: CheckCircle,
        },
    ];

    const prerequisites = [
        'Access to Accounting Software (View User)',
        'Availability of Vouchers for checking',
        'GST and TDS Returns filed copies',
        'Bank Statements for the period',
        'Previous Audit Reports',
        'Management Representation Letter'
    ];

    const faqs = [
        {
            q: 'How is this different from a Statutory Audit?',
            a: 'Statutory Audit is mandatory by law annually. Book Supervision is regular (monthly/quarterly) internal checking for better control and is voluntary.',
        },
        {
            q: 'Does this service include Data Entry?',
            a: 'No, this service is for supervision. We verify the entries made by your accountant. For data entry, please check our Bookkeeping service.',
        },
        {
            q: 'Can you work with our existing accountant?',
            a: 'Yes, we work along with your team. We mentor them to improve accuracy and compliance.',
        },
        {
            q: 'Do you visit our office?',
            a: 'We offer both onsite and remote supervision models depending on your location and preference.',
        },
        {
            q: 'Will you file the returns?',
            a: 'Filing returns can be added as an optional service, but primarily we verify the data before you or your consultant files them.',
        },
    ];

    const pricing = [
        {
            plan: 'Review',
            price: '₹4,999',
            desc: 'Quarterly',
            features: [
                'Quarterly Review of Books',
                'TDS & GST Compliance Check',
                'Basic MIS Report',
                'Email Support'
            ]
        },
        {
            plan: 'Supervision',
            price: '₹2,999',
            desc: 'Monthly',
            features: [
                'Monthly Book Scrutiny',
                'Bank Reconciliation Check',
                'Staff Guidance',
                'Monthly MIS Report',
                'Process Optimisation'
            ]
        },
        {
            plan: 'Virtual CFO',
            price: 'Custom',
            features: [
                'Weekly Reviews',
                'Cash Flow Management',
                'Budgeting & Forecasting',
                'Strategic Financial Advice',
                'Board Reporting'
            ]
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10">
                    <Eye className="w-96 h-96 -mr-20 -mt-20" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-semibold mb-6 border border-white/20">
                            Audit & Review
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Book Supervision <br />
                            <span className="text-accent">Audit Ready, Always</span>
                        </h1>
                        <p className="text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl">
                            You do the accounting, we check the accuracy. A periodic review service to ensure your financial health and compliance.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg border border-white/20 backdrop-blur-sm">
                                <Clock className="w-5 h-5 text-accent" />
                                <span className="font-medium">Monthly / Quarterly</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg border border-white/20 backdrop-blur-sm">
                                <CheckCircle className="w-5 h-5 text-accent" />
                                <span className="font-medium">Expert Review</span>
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

            {/* Benefits & Considerations */}
            <section className="py-16 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Benefits */}
                        <div>
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Why Supervision?</h2>
                            <div className="space-y-3">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                        <span className="text-neutral-700">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Critical Considerations */}
                        <div>
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Key Rules</h2>
                            <div className="space-y-4">
                                {criticalConsiderations.map((item, index) => (
                                    <div key={index} className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                                        <div className="flex items-start gap-3">
                                            <item.icon className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <h3 className="text-lg text-orange-900 font-semibold mb-1">{item.title}</h3>
                                                <p className="text-orange-800 text-sm">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Documents & Prerequisites */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Documents */}
                        <div>
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Items to Review</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Standard documents we examine
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

                        {/* Prerequisites */}
                        <div>
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Prerequisites</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Needed for a smooth audit
                            </p>
                            <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 text-white">
                                <div className="space-y-3">
                                    {prerequisites.map((item, index) => (
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

            {/* Process Section */}
            <section className="py-16 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Supervision Methodology</h2>
                        <p className="text-lg text-neutral-600">Our systematic approach to verify your books</p>
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

            {/* Pricing Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Supervision Packages</h2>
                        <p className="text-lg text-gray-600">Cost-effective internal audit solutions.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {pricing.map((plan, index) => (
                            <div key={index} className={`relative bg-white rounded-2xl shadow-lg border ${index === 1 ? 'border-accent shadow-xl scale-105 z-10' : 'border-neutral-200'} p-8 flex flex-col`}>
                                {index === 1 && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                        {plan.desc}
                                    </div>
                                )}
                                <h3 className="text-xl font-bold text-gray-900 mb-6">{plan.plan}</h3>
                                <div className="mb-8">
                                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                                    {plan.price !== 'Custom' && <span className="text-gray-500"></span>}
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
                                    className={`w-full py-3 rounded-xl font-bold transition-all ${index === 1
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
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Expert Eyes on Your Finanace</h2>
                    <p className="text-xl text-blue-100 mb-10">
                        Prevent errors and frauds with professional book supervision.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartService}
                            className="px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl inline-flex items-center justify-center gap-2"
                        >
                            SCHEDULE REVIEW
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all">
                            Talk to Expert
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
