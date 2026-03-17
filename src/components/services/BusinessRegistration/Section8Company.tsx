import { Heart, CheckCircle, FileText, Clock, ArrowRight, Shield, AlertCircle, Globe, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../user-panel/contexts/AuthContext';

export function Section8Company() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartRegistration = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'Section 8 Company' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'Section 8 Company' } });
        }
    };

    const features = [
        {
            icon: Heart,
            title: 'Social Welfare',
            description: 'Dedicated to charitable objects like art, science, sports, education, research, social welfare, etc.',
        },
        {
            icon: Shield,
            title: 'Limited Liability',
            description: 'Enjoy the benefits of limited liability without the profit motive.',
        },
        {
            icon: Globe,
            title: 'Tax Exemptions',
            description: 'Eligible for 12A and 80G registrations for tax-free income and donations.',
        },
        {
            icon: Users,
            title: 'Reliability',
            description: 'More credible than Trust or Society due to strict Central Govt regulations.',
        },
    ];

    const benefits = [
        'No Minimum Capital Requirement',
        'Tax Deductions for Donors (80G)',
        'Income Tax Exemption for Company (12A)',
        'Credibility for FCRA Registration',
        'Separate Legal Entity Status',
        'Ease of Transfer of Title/Ownership'
    ];

    const documents = [
        'PAN Card of Directors/Promoters',
        'Aadhaar Card of Directors',
        'Passport Photo',
        'Bank Statement/Electricity Bill',
        'Rent Agreement for Office',
        'Projected Income & Expenditure (3 Years)',
        'Draft MOA & AOA (Charitable Objects)',
    ];

    const dataRequired = [
        'Proposed Name (Unique)',
        'Objects of the Company',
        'Authorized Capital Amount',
        'Promoter Details (DIN, Name)',
        'Registered Office Address',
        'Email & Mobile of Directors',
        'Duration of Stay at Address'
    ];

    const process = [
        {
            step: 'Name Approval',
            description: 'Apply for a unique name (Section 8 specific) via RUN.',
            time: 'Day 1-3',
        },
        {
            step: 'DSC & DIN',
            description: 'Obtain Digital Signatures and Director IDs.',
            time: 'Day 3-5',
        },
        {
            step: 'License (INC-12)',
            description: 'Apply to Central Govt for Section 8 License.',
            time: 'Day 6-15',
        },
        {
            step: 'Incorporation',
            description: 'File SPICe+ form for final Certificate of Incorporation.',
            time: 'Day 16-20',
        },
        {
            step: '12A & 80G',
            description: 'Apply for Income Tax Exemptions after incorporation.',
            time: 'Post Corp',
        },
    ];

    const faqs = [
        {
            q: 'Does it require minimum capital?',
            a: 'No, Section 8 companies do not require any minimum paid-up capital.',
        },
        {
            q: 'Can profits be distributed?',
            a: 'No, profits cannot be distributed as dividends to members. They must be used for promoting the objectives.',
        },
        {
            q: 'Is it better than a Trust?',
            a: 'Section 8 Company has more credibility with Corporate donors and Govt bodies compared to Trusts.',
        },
        {
            q: 'Is audit mandatory?',
            a: 'Yes, statutory audit is mandatory every year.',
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10">
                    <Heart className="w-96 h-96 -mr-20 -mt-20" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-semibold mb-6 border border-white/20">
                            Non-Profit Organization
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Section 8 Company Registration <br />
                            <span className="text-accent">Start Your NGO</span>
                        </h1>
                        <p className="text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl">
                            The most trusted structure for charitable work in India. Get tax exemptions and accept donations legally.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg border border-white/20 backdrop-blur-sm">
                                <Clock className="w-5 h-5 text-accent" />
                                <span className="font-medium">20-30 Days Process</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg border border-white/20 backdrop-blur-sm">
                                <Shield className="w-5 h-5 text-accent" />
                                <span className="font-medium">Govt Recognized NGO</span>
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
                                <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                                    <feature.icon className="w-7 h-7 text-red-500" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
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
                            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">Why Section 8 Company?</h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Unlike Trusts or Societies, Section 8 Company is registered under the Central Companies Act, making it the most credible and transparent structure for donors and CSR funding.
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Privileges & Restrictions</h2>

                            <div className="bg-orange-50 p-8 rounded-2xl border border-orange-200 mb-6">
                                <div className="flex items-start gap-4 mb-6">
                                    <AlertCircle className="w-8 h-8 text-orange-600 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-xl text-orange-900 font-bold mb-2">No Profit Distribution</h3>
                                        <p className="text-orange-800 leading-relaxed">
                                            Profits cannot be distributed as dividends to members. All funds must be utilized for the charitable objectives only.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-200">
                                <div className="flex items-start gap-4 mb-6">
                                    <Globe className="w-8 h-8 text-blue-600 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-xl text-blue-900 font-bold mb-2">Foreign Contributions</h3>
                                        <p className="text-blue-800 leading-relaxed">
                                            To receive foreign donations, FCRA registration is mandatory, which can be applied for after 3 years of existence.
                                        </p>
                                    </div>
                                </div>
                                <p className="text-neutral-600 text-sm bg-white/50 p-4 rounded-lg">
                                    <strong>Tax Benefit:</strong> We also facilitate 12A & 80G registrations for income tax exemption.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Documents & Data */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Documents */}
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
                        {/* Data Needed */}
                        <div>
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Information Needed</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Details for filing SPICe+ and INC-12
                            </p>
                            <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 text-white">
                                <div className="space-y-3">
                                    {dataRequired.map((item, index) => (
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

            {/* Process */}
            <section className="py-16 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Registration Process</h2>
                        <p className="text-lg text-neutral-600">Timeline for NGO Registration</p>
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
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-200">
                        <div className="grid md:grid-cols-2">
                            {/* Left Side - The Offer (White) */}
                            <div className="p-8 md:p-12 bg-white flex flex-col justify-center border-b md:border-b-0 md:border-r border-neutral-100">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Complete NGO Setup</h3>
                                <div className="space-y-4">
                                    {[
                                        'Name Approval (RUN)',
                                        'DSC (2 Directors)',
                                        'Section 8 License (INC-12)',
                                        'MOA & AOA Drafting',
                                        'Certificate of Incorporation',
                                        'PAN & TAN Allotment'
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
                                        <span>Delivered in 20-30 days</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - The Price (Dark) */}
                            <div className="p-8 md:p-12 bg-primary text-white flex flex-col justify-center items-center text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                                <div className="relative z-10">
                                    <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 border border-white/20">
                                        All Inclusive
                                    </span>
                                    <div className="flex items-center justify-center gap-1 mb-2">
                                        <span className="text-6xl font-bold tracking-tight">₹24,999</span>
                                    </div>
                                    <p className="text-blue-100 mb-8">Professional Incorporation Fee</p>

                                    <button
                                        onClick={handleStartRegistration}
                                        className="w-full bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
                                    >
                                        Start NGO
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                    <p className="mt-4 text-xs text-blue-200">Secure Payment • Expert CA Support</p>
                                </div>
                            </div>
                        </div>
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
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Drive Social Change</h2>
                    <p className="text-xl text-blue-100 mb-10">
                        Register your Section 8 Company today and contribute to society with legal backing.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartRegistration}
                            className="px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl inline-flex items-center justify-center gap-2"
                        >
                            REGISTER NGO
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all">
                            Check Name Availability
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}





