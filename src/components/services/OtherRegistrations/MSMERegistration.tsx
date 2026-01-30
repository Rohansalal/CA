import { Factory, CheckCircle, FileText, Clock, ArrowRight, Shield, RefreshCcw, Landmark, Award, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function MSMERegistration() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartService = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'MSME/Udyam Registration' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'MSME/Udyam Registration' } });
        }
    };

    const criteria = [
        {
            type: 'Micro',
            description: 'Investment < ₹1 Cr & Turnover < ₹5 Cr',
            icon: Factory,
            features: ['Cheapest Loans', 'Full Protection', 'Maximum Subsidies'],
        },
        {
            type: 'Small',
            description: 'Investment < ₹10 Cr & Turnover < ₹50 Cr',
            icon: Factory,
            features: ['Priority Lending', 'Govt Tenders', 'Tax Benefits'],
        },
        {
            type: 'Medium',
            description: 'Investment < ₹50 Cr & Turnover < ₹250 Cr',
            icon: Factory,
            features: ['Global Exposure', 'Market Access', 'Scale Up Support'],
        },
    ];

    const benefits = [
        'Collateral Free Bank Loans (CGTMSE)',
        'Subsidy on Patent/Barcode Registration',
        'Overdraft Interest Rate Exemption (1%)',
        'Industrial Promotion Subsidy Eligibility',
        'Protection against delayed payments (MSMED Act)',
        'Concession in Electricity Bills',
        'ISO Certification Reimbursement',
        'Preference in Government Tenders'
    ];

    const documents = [
        'Aadhaar Card of Applicant',
        'PAN Card of Business/Proprietor',
        'GST Certificate (if registered)',
        'Bank Account Details (IFSC Code)',
        'Mobile No mapped with Aadhaar',
        'Number of Employees (Male/Female)',
    ];

    const process = [
        {
            step: 'Data Collection',
            description: 'Gathering basic details & Aadhaar verification',
            time: '15 Mins',
        },
        {
            step: 'Submission',
            description: 'Filing application on Udyam Registration Portal',
            time: '30 Mins',
        },
        {
            step: 'Validation',
            description: 'Automatic verification of PAN & GST with government database',
            time: '1-2 Days',
        },
        {
            step: 'Certificate',
            description: 'Generation of Lifetime Udyam Registration Certificate',
            time: 'Final Step',
        },
    ];

    const pricing = [
        {
            plan: 'New Registration',
            price: '₹999',
            desc: 'Best Value',
            features: [
                'Udyam Application',
                'Certificate Generation',
                'Printable Copy',
                'Consultation'
            ]
        },
        {
            plan: 'Update/Print',
            price: '₹499',
            features: [
                'Update Mobile/Email',
                'Add Branch/Plant',
                'Change Activity',
                'Retrieve Lost No'
            ]
        },
        {
            plan: 'ZED Certification',
            price: '₹2,499',
            features: [
                'Zero Defect Zero Effect',
                'Quality Certification',
                'Gold/Silver/Bronze',
                'Subsidy Guidance'
            ]
        }
    ];

    const upgradePaths = [
        {
            from: 'Udyam Registration',
            to: 'ZED Certification',
            benefit: 'Get certified for Quality & Environment. Heavy subsidies on certification cost.',
            process: 'Apply through ZED portal',
        },
        {
            from: 'Udyam Registration',
            to: 'GeM Portal',
            benefit: 'Sell directly to Government Departments via Government e-Marketplace.',
            process: 'Create Seller Account on GeM',
        },
    ];

    const faqs = [
        {
            q: 'Is GST mandatory for Udyam Registration?',
            a: 'Yes, GSTIN is mandatory fo all businesses that are required to be registered under the GST Law. For exempt businesses, it may not be needed, but usually recommended.',
        },
        {
            q: 'Do I need to renew Udyam Registration?',
            a: 'No, Udyam Registration is valid for a lifetime. However, you need to update information like turnover and investment details annually.',
        },
        {
            q: 'Can traders register as MSME?',
            a: 'Yes, Retail and Wholesale Traders are now allowed to register on Udyam Portal, but benefits are restricted to Priority Sector Lending only.',
        },
        {
            q: 'Is there any government fee?',
            a: 'No, registration on the Udyam government portal is free of cost. We charge professional fees for assisting you with correct data entry and classification to ensure no rejection.',
        },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4">
                            Small Business Growth
                        </div>
                        <h1 className="text-3xl lg:text-5xl text-white mb-4">MSME / Udyam Registration</h1>
                        <p className="text-xl text-neutral-100 leading-relaxed mb-6">
                            Unlock valid government benefits, loans, and subsidies. The first step for every Micro, Small, and Medium Enterprise.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Clock className="w-5 h-5 text-accent" />
                                <span>Instant Process</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Shield className="w-5 h-5 text-accent" />
                                <span>Govt Protection</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Criteria Grid */}
            <section className="py-16 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        {criteria.map((type, index) => (
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

            {/* Benefits Section */}
            <section className="py-16 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 text-left">
                        <div>
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">MSME Benefits</h2>
                            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                                The government creates specific schemes only for Udyam registered businesses.
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
                        <div>
                            <div className="bg-white p-8 lg:p-10 rounded-3xl shadow-xl border border-neutral-200 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-bl-full -z-0"></div>
                                <h3 className="text-2xl font-bold text-primary mb-6 relative z-10">Samadhaan</h3>
                                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-6 relative z-10">
                                    <div className="flex gap-4">
                                        <Shield className="w-8 h-8 text-blue-600 flex-shrink-0" />
                                        <div>
                                            <p className="text-blue-800 font-bold text-lg">Delayed Payments</p>
                                            <p className="text-blue-700 text-sm mt-1 leading-relaxed">
                                                If buyers don't pay within 45 days, MSME Act mandates them to pay compound interest at 3 times the bank rate. We help file cases on Samadhaan Portal.
                                            </p>
                                        </div>
                                    </div>
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Documents & Data</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Paperless process based on Aadhaar
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Process Flow</h2>
                            <div className="space-y-6">
                                {process.map((step, index) => (
                                    <div key={index} className="flex gap-6 group bg-white border border-neutral-200 p-6 rounded-xl hover:shadow-md transition-all">
                                        <div className="flex flex-col items-center">
                                            <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition-transform">
                                                {index + 1}
                                            </div>
                                            {index !== process.length - 1 && <div className="w-0.5 h-full bg-gray-200 my-2"></div>}
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center mb-2 gap-4">
                                                <h4 className="font-bold text-primary text-lg">{step.step}</h4>
                                                <span className="text-xs font-semibold bg-accent/10 text-accent px-2 py-1 rounded">{step.time}</span>
                                            </div>
                                            <p className="text-neutral-600 text-sm">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-16 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Registration Fees</h2>
                        <p className="text-lg text-neutral-600">Professional assistance for error-free filing</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {pricing.map((plan, index) => (
                            <div key={index} className={`relative bg-white rounded-2xl shadow-lg border ${index === 0 ? 'border-accent shadow-xl scale-105 z-10' : 'border-neutral-200'} p-8 flex flex-col`}>
                                {index === 0 && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                        {plan.desc}
                                    </div>
                                )}
                                <h3 className="text-xl font-bold text-gray-900 mb-6">{plan.plan}</h3>
                                <div className="mb-8">
                                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
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
                                    className={`w-full py-3 rounded-xl font-bold transition-all ${index === 0
                                        ? 'bg-accent text-white hover:bg-accent/90 shadow-lg hover:shadow-accent/30'
                                        : 'bg-primary/5 text-primary hover:bg-primary hover:text-white'
                                        }`}
                                >
                                    Get Registered
                                </button>
                                {index !== 2 && <p className="text-xs text-center mt-2 text-gray-400">*Govt Fee is Nil</p>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upgrade Paths */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Next Steps</h2>
                        <p className="text-lg text-neutral-600">After Udyam, what's next?</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {upgradePaths.map((option, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg border border-neutral-200 p-8 hover:shadow-2xl transition-all"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <Factory className="w-8 h-8 text-secondary" />
                                    <ArrowRight className="w-6 h-6 text-neutral-400" />
                                    <Award className="w-8 h-8 text-primary" />
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
            <section className="py-16 bg-neutral-50">
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
                    <h2 className="text-3xl lg:text-4xl text-white mb-4">Join 2 Crore+ MSMEs</h2>
                    <p className="text-xl text-neutral-100 mb-8">
                        Get your 19-digit Udyam Number today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartService}
                            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                            APPLY UDYAM
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
