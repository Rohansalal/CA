import { Utensils, CheckCircle, FileText, Clock, ArrowRight, AlertCircle, Shield, Award, ChefHat, Store, Factory } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function FSSAIRegistration() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartRegistration = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'FSSAI Registration' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'FSSAI Registration' } });
        }
    };

    const licenseTypes = [
        {
            type: 'Basic Registration',
            description: 'For petty food businesses with turnover up to ₹12 Lakhs per annum',
            icon: Store,
            features: ['Small street vendors', 'Petty retailers', 'Temporary stall holders', 'Cottage industries'],
        },
        {
            type: 'State License',
            description: 'For medium-sized food businesses with turnover between ₹12 Lakhs and ₹20 Crores',
            icon: ChefHat,
            features: ['Restaurants & Hotels', 'Mid-sized manufacturers', 'Distributors/Wholesalers', 'Transporters'],
        },
        {
            type: 'Central License',
            description: 'For large businesses with turnover > ₹20 Crores or Importers/Exporters',
            icon: Factory,
            features: ['Importers & Exporters', 'Large manufacturers', 'Central Govt agencies', 'Operating in multiple states'],
        },
    ];

    const benefits = [
        'Legal authorization to operate food business',
        'Consumer trust and safety assurance',
        'Mandatory for Swiggy, Zomato & online platforms',
        'Access to government tenders and corporate orders',
        'Standardization of hygiene processes',
        'Avoidance of heavy legal penalties',
        'Brand value enhancement with FSSAI Logo',
        'Facilitates business expansion and loans',
    ];

    const criticalConsiderations = [
        {
            title: 'Mandatory Display',
            description: 'Display of FSSAI 14-digit number at premises is compulsory',
            icon: AlertCircle,
        },
        {
            title: 'Hygiene Rating',
            description: 'Subject to hygiene audits and scoring inspection by FSO',
            icon: Shield,
        },
        {
            title: 'Validity Period',
            description: 'License is issued for 1 to 5 years (renewal required before expiry)',
            icon: Clock,
        },
        {
            title: 'Heavy Penalties',
            description: 'Operating without license attracts fine up to ₹5 Lakhs & imprisonment',
            icon: AlertCircle,
        },
    ];

    const documents = [
        'Passport size photo of Food Business Operator',
        'Identity Proof (Aadhaar/PAN/Voter ID)',
        'Proof of business premises (Rent Agreement/NOC)',
        'Water Testing Report (for Manufacturing)',
        'List of Food Products/Categories',
        'Blueprint/Layout Plan (for Manufacturers)',
        'List of Equipment and Machinery',
        'NOC from Municipality/Panchayat',
    ];

    const mandatoryDeclarations = [
        'Form IX: Nomination of Person in Charge',
        'Food Safety Management System (FSMS) Plan',
        'Source of Raw Material (Milk/Meat) declaration',
        'Recall Plan (for Manufacturers)',
        'Declaration regarding Non-GM Foods',
        'Self-Declaration for Proprietorship',
        'NOC from Manufacturer (for Relabellers)',
        'Certificate from Ministry of Tourism (for Hotels)',
    ];

    const registrationSteps = [
        {
            step: 'Form Selection & Drafting',
            description: 'Determine correct category (Basic/State/Central) and draft Form A or Form B',
            time: '1 Day',
        },
        {
            step: 'Document Validation',
            description: 'Verification of premises proof, FSMS plan, and product categorization',
            time: '1-2 Days',
        },
        {
            step: 'FoSCoS Application',
            description: 'Online submission of application via Food Safety Compliance System',
            time: '1 Day',
        },
        {
            step: 'Fee Payment',
            description: 'Payment of government challan fees (per year basis)',
            time: 'Instant',
        },
        {
            step: 'Department Scrutiny',
            description: 'Food Safety Officer reviews application and may raise queries',
            time: '3-5 Days',
        },
        {
            step: 'Premises Inspection',
            description: 'Physical inspection by FSO (mandatory for State/Central License)',
            time: '7-10 Days',
        },
        {
            step: 'License Issuance',
            description: 'Digital issuance of 14-digit FSSAI License Number',
            time: 'Final Step',
        },
    ];

    const annualCompliances = [
        {
            compliance: 'Annual Return',
            form: 'Form D-1',
            frequency: 'Annual',
            dueDate: '31st May (for Manufacturers/Importers)',
        },
        {
            compliance: 'Half-Yearly Return',
            form: 'Form D-2',
            frequency: 'Every 6 Months',
            dueDate: 'For Milk/Meat Producers Only',
        },
        {
            compliance: 'License Renewal',
            form: 'Form A/B',
            frequency: 'Periodical',
            dueDate: '30 days before expiry',
        },
    ];

    const upgradePaths = [
        {
            from: 'Basic Registration',
            to: 'State License',
            benefit: 'Required if annual turnover crosses ₹12 Lakhs',
            process: 'Apply for modification of license',
        },
        {
            from: 'State License',
            to: 'Central License',
            benefit: 'Required if turnover crosses ₹20 Crores or for Export',
            process: 'Fresh application under Central category',
        },
    ];

    const faqs = [
        {
            q: 'Do I need FSSAI for selling homemade food online?',
            a: 'Yes, any food business operator, including home bakers or cloud kitchens selling via aggregators like Swiggy/Zomato, must have a valid FSSAI registration.',
        },
        {
            q: 'What is the validity of the FSSAI License?',
            a: 'You can choose a validity period between 1 to 5 years at the time of application. The fee increases proportionally with the number of years chosen.',
        },
        {
            q: 'Is physical inspection mandatory for all?',
            a: 'Not for Basic Registration usually. However, for State and Central licenses, a Food Safety Officer inspection of the premises is a standard part of the process.',
        },
        {
            q: 'What happens if I forget to renew my license?',
            a: 'If not renewed before the expiry date, the license becomes invalid. You will have to stop business and apply for a fresh license. Late renewal attracts heavy per-day penalties.',
        },
        {
            q: 'Is FSSAI required for export of food products?',
            a: 'Yes, a Central FSSAI License is mandatory for any food export-import business, regardless of the turnover amount.',
        },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4">
                            Food Safety & Standards
                        </div>
                        <h1 className="text-3xl lg:text-5xl text-white mb-4">FSSAI Registration & License</h1>
                        <p className="text-xl text-neutral-100 leading-relaxed mb-6">
                            Essential compliance for every food business operator (FBO) in India. From home bakers to large manufacturers, ensure food quality and consumer trust.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Clock className="w-5 h-5 text-accent" />
                                <span>3-7 Days Process</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Award className="w-5 h-5 text-accent" />
                                <span>FoSCoS Compliant</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* License Types */}
            <section className="py-16 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        {licenseTypes.map((type, index) => (
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Key Benefits</h2>
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Compliance Criticals</h2>
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Documents Required</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Prepare these documents for FSSAI application
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Safety Declarations</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Additional declarations for License categories
                            </p>
                            <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 text-white">
                                <div className="space-y-3">
                                    {mandatoryDeclarations.slice(0, 8).map((clause, index) => (
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

            {/* Registration Process */}
            <section className="py-16 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Licensing Process</h2>
                        <p className="text-lg text-neutral-600">Step-by-step procedure to get your food license</p>
                    </div>
                    <div className="max-w-4xl mx-auto space-y-6">
                        {registrationSteps.map((step, index) => (
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
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Mandatory Compliance</h2>
                        <p className="text-lg text-neutral-600">Avoid penalties by filing returns on time</p>
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
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Scaling Up?</h2>
                        <p className="text-lg text-neutral-600">Upgrade your license as your turnover grows</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {upgradePaths.map((option, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg border border-neutral-200 p-8 hover:shadow-2xl transition-all"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <Store className="w-8 h-8 text-secondary" />
                                    <ArrowRight className="w-6 h-6 text-neutral-400" />
                                    <Factory className="w-8 h-8 text-primary" />
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
                    <h2 className="text-3xl lg:text-4xl text-white mb-4">Ready to Get Your Food License?</h2>
                    <p className="text-xl text-neutral-100 mb-8">
                        Expert assistance with FSSAI registration, document preparation, and faster approval.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartRegistration}
                            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                            START REGISTRATION
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-neutral-100 transition-all">
                            CHECK ELIGIBILITY
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
