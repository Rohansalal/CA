import { Archive, CheckCircle, FileText, Clock, ArrowRight, AlertCircle, Database, Shield, BookOpen, Lock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../user-panel/contexts/AuthContext';

export function StatutoryRecord() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartService = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'Statutory Record' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'Statutory Record' } });
        }
    };

    const registerTypes = [
        {
            type: 'Membership Registers',
            description: 'Definitive proof of shareholding/membership in the company.',
            icon: Users,
            features: ['Register of Members (MGT-1)', 'Register of Debenture Holders (MGT-2)', 'Index of Members', 'Share Transfer Register'],
        },
        {
            type: 'Management Registers',
            description: 'Records of company management and their interests.',
            icon: BookOpen,
            features: ['Register of Directors & KMP', 'Register of Directors Shareholding', 'Register of Related Party Contracts (MBP-4)'],
        },
        {
            type: 'Financial & Asset Registers',
            description: 'Records of company assets, loans, and charges.',
            icon: Database,
            features: ['Register of Charges (CHG-7)', 'Register of Loans & Investments (MBP-2)', 'Register of Deposits'],
        },
    ];

    const benefits = [
        'Ensures 100% Compliance with Companies Act, 2013',
        'Essential for Due Diligence by Investors',
        'Primary evidence of ownership in legal disputes',
        'Smooth Statutory and Internal Audits',
        'Avoidance of heavy penalties (up to ₹3 Lakhs)',
        'Transparency in corporate governance',
        'Quick retrieval of historical corporate data',
        'Protects Directors from disqualification',
    ];

    const criticalConsiderations = [
        {
            title: 'Place of Maintenance',
            description: 'Records must be kept at the Registered Office (or city limits with SR).',
            icon: AlertCircle,
        },
        {
            title: 'Preservation Period',
            description: 'Register of Members must be preserved permanently. Others for 8 years.',
            icon: Archive,
        },
        {
            title: 'Authentication',
            description: 'Entries must be authenticated by Company Secretary or authorized Director.',
            icon: Shield,
        },
        {
            title: 'Inspection Rights',
            description: 'Open for inspection by members/debenture holders during business hours.',
            icon: Lock,
        },
    ];

    const documents = [
        'Incorporation Certificate & MoA/AoA',
        'Copies of all filed e-Forms (MGT-7, DIR-12)',
        'Board Meeting Minutes & Resolutions',
        'Share Certificates Counterfoils',
        'Loan & Investment Documents',
        'Details of Charges/Mortgages created',
        'Notices of Interest by Directors (MBP-1)',
        'Share Transfer Deeds (SH-4)',
    ];

    const mandatoryDeclarations = [
        'Register of Members (Form MGT-1)',
        'Register of Directors (Form DIR-12)',
        'Register of Charges (Form CHG-7)',
        'Register of Loans/Guarantees (Form MBP-2)',
        'Register of Contracts (Form MBP-4)',
        'Register of Renewed/Duplicate Shares (Form SH-2)',
        'Register of Sweat Equity Shares (Form SH-3)',
        'Register of ESOP (Form SH-6)',
    ];

    const process = [
        {
            step: 'Data Compilation',
            description: 'Collection of all incorporation documents, forms, and minutes since inception',
            time: '2-3 Days',
        },
        {
            step: 'Gap Analysis',
            description: 'Identifying missing entries or discrepancies in existing records',
            time: '1-2 Days',
        },
        {
            step: 'Reconstruction',
            description: 'Drafting and updating registers (Physical or Electronic mode)',
            time: '3-5 Days',
        },
        {
            step: 'Authentication',
            description: 'Signing of entries by the Company Secretary or Director',
            time: '1 Day',
        },
        {
            step: 'Certification',
            description: 'Issuance of Compliance Certificate if required',
            time: '1 Day',
        },
        {
            step: 'Safe Custody',
            description: 'Arranging records in binders/digital vault for inspection',
            time: 'Final Step',
        },
    ];

    const relatedCompliances = [
        {
            compliance: 'Annual Return',
            form: 'MGT-7/7A',
            frequency: 'Annual',
            dueDate: '60 days from AGM',
        },
        {
            compliance: 'Resolutions',
            form: 'MGT-14',
            frequency: 'Event Based',
            dueDate: '30 days from Board Meeting',
        },
        {
            compliance: 'Director Change',
            form: 'DIR-12',
            frequency: 'Event Based',
            dueDate: '30 days from Appointment/Resignation',
        },
    ];

    const upgradePaths = [
        {
            from: 'Physical Registers',
            to: 'Electronic Registers',
            benefit: 'Secure, accessible from anywhere, easy to update',
            process: 'Digitization and Cloud Storage Setup',
        },
        {
            from: 'Basic Maintenance',
            to: 'Secretarial Audit',
            benefit: 'Comprehensive check of all applicable laws',
            process: 'Appointment of PCS (Form MGT-8)',
        },
    ];

    const faqs = [
        {
            q: 'Is it mandatory to maintain registers in physical format?',
            a: 'Section 120 allows maintenance of registers in electronic form. Listed companies must maintain them electronically. Others have the option.',
        },
        {
            q: 'Who is responsible for maintaining these records?',
            a: 'The Company Secretary (if appointed) or any Director authorized by the Board is responsible for the custody and maintenance of these records.',
        },
        {
            q: 'What is the penalty for non-maintenance?',
            a: 'The company can be fined not less than ₹50,000 up to ₹3 Lakhs. Every officer in default is consistently punishable.',
        },
        {
            q: 'Can these registers be kept at a place other than Registered Office?',
            a: 'Yes, by passing a Special Resolution, registers can be kept at any other place in India where more than 1/10th of the total members reside.',
        },
        {
            q: 'How long should we preserve the minutes of meetings?',
            a: 'Minutes of all Board and General Meetings must be preserved permanently. They are the history book of the company.',
        },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4">
                            Corporate Record Keeping
                        </div>
                        <h1 className="text-3xl lg:text-5xl text-white mb-4">Statutory Registers & Records</h1>
                        <p className="text-xl text-neutral-100 leading-relaxed mb-6">
                            Mandatory maintenance of company records under the Companies Act, 2013. Essential for compliance, audits, and due diligence.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Clock className="w-5 h-5 text-accent" />
                                <span>Permanent Records</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-accent" />
                                <span>Audit Ready</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Register Types */}
            <section className="py-16 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        {registerTypes.map((type, index) => (
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Why Maintain This?</h2>
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

            {/* Documents Required */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Source Documents</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Registers are updated based on these documents
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">List of Registers</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Mandatory registers to be maintained
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
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Reconstruction Process</h2>
                        <p className="text-lg text-neutral-600">How we update your statutory records</p>
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

            {/* Related Compliances */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Related Filings</h2>
                        <p className="text-lg text-neutral-600">These forms trigger updates in your registers</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {relatedCompliances.map((item, index) => (
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
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Modern Solutions</h2>
                        <p className="text-lg text-neutral-600">Upgrade how you maintain records</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {upgradePaths.map((option, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg border border-neutral-200 p-8 hover:shadow-2xl transition-all"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <BookOpen className="w-8 h-8 text-secondary" />
                                    <ArrowRight className="w-6 h-6 text-neutral-400" />
                                    <Database className="w-8 h-8 text-primary" />
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
                    <h2 className="text-3xl lg:text-4xl text-white mb-4">Companies Act Compliance Issues?</h2>
                    <p className="text-xl text-neutral-100 mb-8">
                        Get your statutory registers reconstructed and updated by experts today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartService}
                            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                            UPDATE NOW
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-neutral-100 transition-all">
                            CONTACT EXPERT
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}







