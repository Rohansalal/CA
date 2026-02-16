import { Building2, CheckCircle, FileText, Clock, ArrowRight, TrendingUp, AlertCircle, ShoppingBag, Globe, Shield, Users, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useState } from 'react';
import { ServicePricing } from '../ServicePricing';

export function PrivateLimitedCompany() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    // Service fetch logic moved to ServicePricing component

    const handleStartRegistration = (planName?: string, price?: number) => {
        const state = {
            selectedService: 'Private Limited Company',
            plan: planName, // Pass plan details if available
            price: price
        };

        if (isAuthenticated) {
            navigate('/dashboard', { state });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', ...state } });
        }
    };

    const companyTypes = [
        {
            type: 'Standard Pvt Ltd',
            description: 'The most popular startup structure. Minimum 2 Directors and 2 Shareholders needed.',
            icon: Building2,
            features: ['Limited Liability', 'Funding Ready', 'ESOPs possible', 'Separate Legal Entity'],
        },
        {
            type: 'Subsidiary Company',
            description: 'When an Indian company is held by a Foreign/Holding Company (>50% shares).',
            icon: Globe,
            features: ['FDI Allowed', 'Global Expansion', 'Control Retention', 'Corporate Governance'],
        },
        {
            type: 'Section 8 (NGO)',
            description: 'A non-profit organization registered as a company for charitable purposes.',
            icon: Users,
            features: ['No Dividend', 'FCRA Eligible', 'Tax Exemptions', 'Credibility'],
        },
    ];

    const benefits = [
        'Limited Liability Protection for Directors/Shareholders',
        'Easy to Raise Funds (Equity/VC/Angel Investment)',
        'Separate Legal Entity (Can own assets/sue)',
        'Perpetual Succession (Company continues forever)',
        'High Credibility with Banks and Customers',
        'Tax Benefits for Startups (DPIIT Recognition)',
        'Easy Transferability of Shares',
        'Protection of Brand and IP'
    ];

    const criticalConsiderations = [
        {
            title: 'Mandatory Audit',
            description: 'Statutory Audit by a CA is mandatory every year, irrespective of turnover or profit.',
            icon: FileText,
        },
        {
            title: 'Compliance Cost',
            description: 'Higher compliance burden and cost compared to LLP or Proprietorship.',
            icon: AlertCircle,
        },
        {
            title: 'Director Residency',
            description: 'At least one Director must be a Resident of India (stayed > 182 days in previous FY).',
            icon: Globe,
        },
        {
            title: 'Bank Account',
            description: 'Certificate of Commencement of Business (INC-20A) must be filed within 180 days.',
            icon: Clock,
        },
    ];

    const documents = [
        'PAN Card of all Directors/Shareholders',
        'Aadhaar Card / Voter ID / Passport (Address Proof)',
        'Passport Size Photo of all Directors',
        'Latest Bank Statement / Mobile Bill (Residence Proof)',
        'Electricity Bill of Registered Office (Not older than 2 months)',
        'Rent Agreement & NOC from Landlord (for Office)',
        'Specimen Signature on blank paper',
        'Digital Signature Certificate (DSC) application form',
    ];

    const mandatoryDeclarations = [
        'Proposed Company Names (1-2 options in order of preference)',
        'Authorized and Paid-up Capital amount',
        'Profit Sharing Ratio among shareholders',
        'Main Objects (Nature of Business)',
        'Email ID and Mobile No of all Directors',
        'Place of Birth and Education Qualification',
        'Duration of stay at current address',
        'Relationship between directors (if any)',
    ];

    const process = [
        {
            step: 'DSC & DIN',
            description: 'Application for Digital Signature Certificates and Director Identification Numbers',
            time: '1-2 Days',
        },
        {
            step: 'Name Reservation',
            description: 'Filing SPICe+ Part A for name approval from MCA (Central Registration Centre)',
            time: '1-2 Days',
        },
        {
            step: 'Documentation',
            description: 'Drafting Memorandum (MoA) and Articles of Association (AoA)',
            time: '2-3 Days',
        },
        {
            step: 'Final Filing',
            description: 'Submission of SPICe+ Part B along with AGILE PRO forms',
            time: '1 Day',
        },
        {
            step: 'Certificate Issue',
            description: 'Review by Registrar of Companies (ROC) and Grant of COI',
            time: '3-7 Days',
        },
        {
            step: 'PAN & TAN',
            description: 'PAN and TAN are allotted automatically with the Incorporation Certificate',
            time: 'With COI',
        },
    ];

    const annualCompliances = [
        {
            compliance: 'Auditor Appointment',
            form: 'ADT-1',
            frequency: 'First 30 days / 5 Years',
            dueDate: 'Within 15 days of AGM',
        },
        {
            compliance: 'Financial Statements',
            form: 'AOC-4',
            frequency: 'Annual',
            dueDate: '30 days from AGM',
        },
        {
            compliance: 'Annual Return',
            form: 'MGT-7',
            frequency: 'Annual',
            dueDate: '60 days from AGM',
        },
    ];

    const upgradePaths = [
        {
            from: 'Private Limited',
            to: 'Public Limited',
            benefit: 'Issue IPO and trade shares on stock exchange',
            process: 'Pass Special Resolution & Increase Members',
        },
        {
            from: 'Private Limited',
            to: 'DPIIT Startup',
            benefit: 'Tax Holiday for 3 Years & Angel Tax Exemption',
            process: 'Register on Startup India Portal',
        },
    ];

    const faqs = [
        {
            q: 'What is the minimum capital required?',
            a: 'There is no minimum paid-up capital requirement now. You can start with even ₹10,000, though ₹1 Lakh is standard practice.',
        },
        {
            q: 'Can a salaried person be a director?',
            a: 'Yes, legally a salaried person can be a director. However, you should check your employment contract for any "conflict of interest" or "dual employment" clauses.',
        },
        {
            q: 'Is an office space mandatory?',
            a: 'You need an address for the registered office to receive official correspondence. It can be a residential address or a commercial one. A Rent Agreement and NOC is required.',
        },
        {
            q: 'Do I need to be physically present for registration?',
            a: 'No, the entire process is online. Documents are signed digitally using DSC. You do not need to visit any government office.',
        },
        {
            q: 'What is the difference between Authorized and Paid-up Capital?',
            a: 'Authorized Capital is the maximum share capital a company can issue. Paid-up capital is the amount actually invested by shareholders. Registration fees depend on Authorized Capital.',
        },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4">
                            Start Your Business
                        </div>
                        <h1 className="text-3xl lg:text-5xl text-white mb-4">Private Limited Company Registration</h1>
                        <p className="text-xl text-neutral-100 leading-relaxed mb-6">
                            The gold standard for startups and growing businesses. Get limited liability, separate legal identity, and easy access to funding.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Clock className="w-5 h-5 text-accent" />
                                <span>7-14 Days Process</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <TrendingUp className="w-5 h-5 text-accent" />
                                <span>Investor Friendly</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Company Types */}
            <section className="py-16 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        {companyTypes.map((type, index) => (
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
            <section className="py-20 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Benefits */}
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">Why Choose Pvt Ltd?</h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Private Limited Company is the most popular corporate structure in India. It gives you Limited Liability and is preferred by Investors.
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

                        {/* Critical Considerations */}
                        <div>
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Must Know Facts</h2>
                            <div className="space-y-6">
                                <div className="bg-orange-50 p-8 rounded-2xl border border-orange-200">
                                    <div className="flex items-start gap-4 mb-4">
                                        <AlertCircle className="w-8 h-8 text-orange-600 flex-shrink-0" />
                                        <div>
                                            <h3 className="text-xl text-orange-900 font-bold mb-2">Mandatory Audit</h3>
                                            <p className="text-orange-800 leading-relaxed">
                                                Statutory Audit by a CA is mandatory every year, irrespective of turnover or profit.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-blue-50 p-8 rounded-2xl border border-blue-200">
                                    <div className="flex items-start gap-4 mb-4">
                                        <Building2 className="w-8 h-8 text-blue-600 flex-shrink-0" />
                                        <div>
                                            <h3 className="text-xl text-blue-900 font-bold mb-2">Compliance Cost</h3>
                                            <p className="text-blue-800 leading-relaxed">
                                                Higher compliance burden and cost compared to LLP or Proprietorship.
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-neutral-600 text-sm bg-white/50 p-4 rounded-lg mt-4">
                                        <strong>Startup Tip:</strong> If you plan to raise funds, Pvt Ltd is the ONLY option.
                                    </p>
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Required Documents</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Documents for Directors and Registered Office
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Information Needed</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Details to be provided for SPICe+ Form
                            </p>
                            <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 text-white">
                                <div className="space-y-3">
                                    {mandatoryDeclarations.map((clause, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                                            <span className="text-sm text-neutral-100">{clause}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-16 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Incorporation Process</h2>
                        <p className="text-lg text-neutral-600">From name approval to certificate in 6 steps</p>
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

            {/* Annual Compliances */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Post-Incorporation Compliance</h2>
                        <p className="text-lg text-neutral-600">Mandatory filings to keep your company active</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {annualCompliances.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6 hover:shadow-2xl transition-all"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <FileText className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl text-primary mb-2 font-semibold">{item.compliance}</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-neutral-500">Form:</span>
                                        <span className="text-neutral-800 font-medium">{item.form}</span>
                                    </div>
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

            {/* Upgrade Options */}
            <section className="py-16 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Growth Options</h2>
                        <p className="text-lg text-neutral-600">Scale your business further</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {upgradePaths.map((option, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg border border-neutral-200 p-8 hover:shadow-2xl transition-all"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <Building2 className="w-8 h-8 text-secondary" />
                                    <ArrowRight className="w-6 h-6 text-neutral-400" />
                                    <TrendingUp className="w-8 h-8 text-primary" />
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
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ServicePricing
                        serviceSlug="private-limited-company"
                        serviceName="Private Limited Company"
                        fallbackContent={
                            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-200">
                                <div className="grid md:grid-cols-2">
                                    {/* Left Side - The Offer (White) */}
                                    <div className="p-8 md:p-12 bg-white flex flex-col justify-center border-b md:border-b-0 md:border-r border-neutral-100">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Complete Pvt Ltd Setup</h3>
                                        <div className="space-y-4">
                                            {[
                                                'Name Approval (RUN)',
                                                'DSC (2 Directors)',
                                                'MOA & AOA Drafting',
                                                'Incorporation Certificate',
                                                'PAN & TAN Allotment',
                                                'Bank Account Opening'
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                                        <CheckCircle className="w-4 h-4 text-primary" />
                                                    </div>
                                                    <span className="text-gray-600 font-medium">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-8 pt-8 border-t border-neutral-100">
                                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                                <Clock className="w-4 h-4" />
                                                <span>Delivered in 7-14 business days</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side - The Price (Dark) */}
                                    <div className="p-8 md:p-12 bg-primary text-white flex flex-col justify-center items-center text-center relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                                        <div className="relative z-10">
                                            <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 border border-white/20">
                                                Most Popular
                                            </span>
                                            <div className="flex items-center justify-center gap-1 mb-2">
                                                <span className="text-6xl font-bold tracking-tight">₹14,999</span>
                                            </div>
                                            <p className="text-blue-100 mb-8">All inclusive (upto 1L Capital)</p>

                                            <button
                                                onClick={() => handleStartRegistration()}
                                                className="w-full bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
                                            >
                                                Register Now
                                                <ArrowRight className="w-5 h-5" />
                                            </button>
                                            <p className="mt-4 text-xs text-blue-200">Secure Payment • Expert CA Support</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    />
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
                    <h2 className="text-3xl lg:text-4xl text-white mb-4">Start Your Company Today</h2>
                    <p className="text-xl text-neutral-100 mb-8">
                        Expert guidance for hassle-free incorporation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => handleStartRegistration()}
                            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                            REGISTER COMPANY
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-neutral-100 transition-all">
                            CHECK NAMING RULES
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
