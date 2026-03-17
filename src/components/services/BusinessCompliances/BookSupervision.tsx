import { Eye, CheckCircle, FileText, Clock, ArrowRight, Shield, AlertTriangle, Search, TrendingUp, Users, ClipboardCheck, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../user-panel/contexts/AuthContext';

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

    const serviceTypes = [
        {
            type: 'Expert Oversight',
            description: 'Regular review of your accounts by experienced CAs.',
            icon: Eye,
            features: ['Monthly/Quarterly reviews', 'Guidance for internal team', 'Identifying process gaps', 'Improving data quality'],
        },
        {
            type: 'Compliance Check',
            description: 'Ensure your books are ready for GST, TDS, and other statutory filings.',
            icon: Shield,
            features: ['GST/TDS liability verification', 'Input Tax Credit reconciliation', 'Statutory due dates tracking', 'Penalty prevention'],
        },
        {
            type: 'Fraud Prevention',
            description: 'Internal control checks to detect and prevent financial leakages.',
            icon: AlertTriangle,
            features: ['Cash & Bank scrutiny', 'Expense verification', 'Duplicate entry detection', 'Authorization checks'],
        },
    ];

    const benefits = [
        'Assurance of accurate financial data',
        'Timely statutory compliance (GST/TDS)',
        'On-job training for your accounts team',
        'Better preparation for statutory audits',
        'Cost-effective compared to full-time CFO',
        'Valuable insights for management',
        'Peace of mind for business owners',
        'Process improvement suggestions'
    ];

    const criticalConsiderations = [
        {
            title: 'Independence',
            description: 'Our review is unbiased and independent of the person writing the accounts.',
            icon: Shield,
        },
        {
            title: 'Management Tool',
            description: 'This is an internal management tool, distinct from the mandatory year-end statutory audit.',
            icon: ClipboardCheck,
        },
        {
            title: 'Defined Scope',
            description: 'Scope is tailored to management needs (e.g., focus on inventory, cash, or compliance).',
            icon: Search,
        },
        {
            title: 'Team Cooperation',
            description: 'Success depends on the active cooperation and transparency of your internal accounts team.',
            icon: Users,
        },
    ];

    const documents = [
        'Access to Accounting Software (View User)',
        'Bank Statements for the period',
        'Sample Invoices & Vouchers',
        'GST & TDS Returns filed copies',
        'Previous Audit Reports',
        'Payroll / Salary Sheets',
        'Stock / Inventory Records',
        'Fixed Asset Register',
    ];

    const additionalInfo = [
        'Key focus areas for management',
        'Known issues or past errors',
        'Changes in business model',
        'New statutory registrations',
        'Authorization matrix details',
        'Vendor/Customer agreements',
    ];

    const processSteps = [
        {
            step: 'Initial Assessment',
            description: 'We conduct a one-time setup audit to understand your current system and identify gaps',
            time: 'Days 1-3',
        },
        {
            step: 'Routine Check',
            description: 'Monthly/Quarterly verification of entered data against physical documents and norms',
            time: 'Recurring',
        },
        {
            step: 'Compliance Verification',
            description: 'Ensuring all GST, TDS, and other statutory dues are calculated and paid correctly',
            time: 'Monthly',
        },
        {
            step: 'Ledger Scrutiny',
            description: 'In-depth review of key ledgers like Cash, Bank, Sales, Purchase, and Expenses',
            time: 'Monthly',
        },
        {
            step: 'Reporting',
            description: 'Submitting a detailed observation report to management with actionable points',
            time: 'Post Review',
        },
        {
            step: 'Closure & Training',
            description: 'Guiding your accountant to correct errors and preventing recurrence through training',
            time: 'Correction Phase',
        },
    ];

    const keyDeliverables = [
        {
            report: 'Observation Report',
            purpose: 'Highlight Errors',
            frequency: 'Monthly/Quarterly',
            format: 'PDF / Excel',
        },
        {
            report: 'Compliance Status',
            purpose: 'Statutory Adherence',
            frequency: 'Monthly',
            format: 'Checklist',
        },
        {
            report: 'MIS Dashboard',
            purpose: 'Business Insights',
            frequency: 'Monthly',
            format: 'Visual Dashboard',
        },
    ];

    const transitionOptions = [
        {
            from: 'Unsupervised Accounts',
            to: 'Expert Supervision',
            benefit: 'Accuracy & Compliance Assurance',
            process: 'Review → Report → Rectify',
        },
        {
            from: 'Year-end Surprise',
            to: 'Monthly Control',
            benefit: 'No last-minute tax stress',
            process: 'Regular health checks of books',
        },
    ];

    const pricing = [
        {
            plan: 'Supervision',
            price: '₹2,999',
            desc: 'Monthly',
            features: [
                'Monthly Book Scrutiny',
                'Bank Reconciliation Check',
                'Staff Guidance',
                'Monthly MIS Report',
            ]
        },
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
            plan: 'Virtual CFO',
            price: 'Custom',
            features: [
                'Weekly Reviews',
                'Cash Flow Management',
                'Budgeting & Forecasting',
                'Strategic Financial Advice',
            ]
        }
    ];

    const faqs = [
        {
            q: 'How is this different from a Statutory Audit?',
            a: 'Statutory Audit is mandatory by law annually. Book Supervision is a regular (monthly/quarterly) internal check for better control and is voluntary.',
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

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4">
                            Audit & Review Services
                        </div>
                        <h1 className="text-3xl lg:text-5xl text-white mb-4">Professional Book Supervision</h1>
                        <p className="text-xl text-neutral-100 leading-relaxed mb-6">
                            You do the accounting, we check the accuracy. A periodic review service to ensure your financial health and compliance.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Clock className="w-5 h-5 text-accent" />
                                <span>Monthly / Quarterly</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-accent" />
                                <span>Expert Review</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Types */}
            <section className="py-16 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        {serviceTypes.map((type, index) => (
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Important Rules</h2>
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

            {/* Documents Required */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Documents to Review</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                We will need access to the following
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Additional Details</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Information to better understand your business
                            </p>
                            <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 text-white">
                                <div className="space-y-3">
                                    {additionalInfo.map((details, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                                            <span className="text-sm text-neutral-100">{details}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Work Process */}
            <section className="py-16 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Supervision Process</h2>
                        <p className="text-lg text-neutral-600">Our systematic approach to verify your books</p>
                    </div>
                    <div className="max-w-4xl mx-auto space-y-6">
                        {processSteps.map((step, index) => (
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

            {/* Key Deliverables (Replaces Annual Compliances) */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Key Deliverables</h2>
                        <p className="text-lg text-neutral-600">Reports you receive after our review</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {keyDeliverables.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6 hover:shadow-2xl transition-all"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <FileText className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl text-primary mb-2 font-semibold">{item.report}</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-neutral-500">Purpose:</span>
                                        <span className="text-neutral-800 font-medium">{item.purpose}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-neutral-500">Frequency:</span>
                                        <span className="text-neutral-800 font-medium">{item.frequency}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-neutral-500">Format:</span>
                                        <span className="text-accent font-medium">{item.format}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Transition/Upgrade Options */}
            <section className="py-16 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Upgrade Your Control</h2>
                        <p className="text-lg text-neutral-600">Move from uncertainty to expert assurance</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {transitionOptions.map((option, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg border border-neutral-200 p-8 hover:shadow-2xl transition-all"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <Users className="w-8 h-8 text-secondary" />
                                    <ArrowRight className="w-6 h-6 text-neutral-400" />
                                    <Shield className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-xl text-primary mb-2 font-semibold">
                                    {option.from} → {option.to}
                                </h3>
                                <p className="text-neutral-600 mb-4">{option.benefit}</p>
                                <div className="text-sm text-neutral-500 bg-neutral-50 p-3 rounded-lg">
                                    <strong>Process:</strong> {option.process}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Supervision Packages</h2>
                        <p className="text-lg text-gray-600">Transparent pricing for expert oversight</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {pricing.map((plan, index) => (
                            <div key={index} className={`relative bg-white rounded-2xl shadow-lg border ${index === 1 ? 'border-accent shadow-xl scale-105 z-10' : 'border-neutral-200'} p-8 flex flex-col`}>
                                {index === 1 && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                        Best Value
                                    </div>
                                )}
                                <h3 className="text-xl font-bold text-gray-900 mb-6">{plan.plan}</h3>
                                <div className="mb-8">
                                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                                    {plan.price !== 'Custom' && <span className="text-gray-500"> / month</span>}
                                </div>
                                <ul className="space-y-4 mb-8 flex-1">
                                    {plan.features?.map((feature, idx) => (
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

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-4xl text-white mb-4">Expert Eyes on Your Finance</h2>
                    <p className="text-xl text-neutral-100 mb-8">
                        Prevent errors and frauds with professional book supervision.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartService}
                            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                            SCHEDULE REVIEW
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-neutral-100 transition-all">
                            TALK TO EXPERT
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}




