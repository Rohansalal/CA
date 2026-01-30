import { Users, CheckCircle, FileText, Clock, ArrowRight, Shield, HeartPulse, HardHat, CalendarCheck, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function PFESICRegistration() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartService = () => {
        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedService: 'PF & ESIC Registration' } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedService: 'PF & ESIC Registration' } });
        }
    };

    const schemeTypes = [
        {
            type: 'EPF Registration',
            description: 'Employees Provident Fund',
            icon: Users,
            features: ['Mandatory > 20 Employees', 'Pension Scheme', 'Insurance Benefit'],
        },
        {
            type: 'ESIC Registration',
            description: 'Employees State Insurance',
            icon: HeartPulse,
            features: ['Mandatory > 10 Employees', 'Medical Cover', 'Maternity Benefit'],
        },
        {
            type: 'Voluntary Reg.',
            description: 'For < 20 Employees',
            icon: Shield,
            features: ['Director Decision', 'Employee Welfare', 'Tax Benefits'],
        },
    ];

    const benefits = [
        'Tax free returns for employees',
        'Retirement saving corpus (PF)',
        'Full medical care for family (ESIC)',
        'Maternity benefits for women (ESIC)',
        'Insurance up to 7 Lakhs (EDLI)',
        'Pension after retirement (EPS)',
        'Low interest loans against PF',
        'Compliant Business Reputation'
    ];

    const documents = [
        'PAN Card of Business (Company/Firm)',
        'Certificate of Incorporation/Partnership Deed',
        'Address Proof of Office (Rent Agreement)',
        'Cancelled Cheque of Bank Account',
        'DSC of Director/Partner',
        'Aadhaar & PAN of Director/Partners',
        'Specimen Signature Card'
    ];

    const process = [
        {
            step: 'Document Collection',
            description: 'Gathering entity and director KYC',
            time: '1 Day',
        },
        {
            step: 'Shram Suvidha',
            description: 'Account creation on Labor Ministry portal',
            time: '1 Day',
        },
        {
            step: 'DSC Verification',
            description: 'Signing application with Digital Signature',
            time: 'Instant',
        },
        {
            step: 'Code Allotment',
            description: 'Issuance of LIN / Establishment Code',
            time: '3-4 Days',
        },
    ];

    const compliances = [
        {
            compliance: 'PF Return',
            form: 'ECR Challan',
            frequency: 'Monthly',
            dueDate: '15th of next month',
        },
        {
            compliance: 'ESIC Return',
            form: 'Contribution',
            frequency: 'Monthly',
            dueDate: '15th of next month',
        },
        {
            compliance: 'ESIC Annual',
            form: 'Return of Contribution',
            frequency: 'Half Yearly',
            dueDate: '11th Nov & 12th May',
        }
    ];

    const pricing = [
        {
            plan: 'PF Registration',
            price: '₹2,499',
            desc: 'Individual',
            features: [
                'EPF Code Allotment',
                'Employer Login Creation',
                'Consultation',
                'DSC Support'
            ]
        },
        {
            plan: 'PF + ESIC',
            price: '₹3,999',
            desc: 'Best Value',
            features: [
                'EPF Code Allotment',
                'ESIC Code Allotment',
                'Shram Suvidha Profile',
                'Compliance Guidance'
            ]
        },
        {
            plan: 'Monthly Return',
            price: '₹499',
            desc: '/Month',
            features: [
                'Employee Data Mgmt',
                'Challan Generation',
                'Return Filing',
                'UAN Generation'
            ]
        }
    ];

    const faqs = [
        {
            q: 'Is it mandatory for startups?',
            a: 'Yes, if you cross the employee threshold (20 for PF, 10 for ESIC), it is mandatory regardless of whether you are a startup or old company.',
        },
        {
            q: 'Can I register voluntarily?',
            a: 'Yes, both PF and ESIC allow voluntary registration even if you have less than the required number of employees, with the consent of the majority of employees.',
        },
        {
            q: 'Who pays the contribution?',
            a: 'Both employer and employee contribute. For PF, it is usually 12% each. For ESIC, Employer pays 3.25% and Employee pays 0.75%.',
        },
        {
            q: 'What happens if I delay payment?',
            a: 'Delay in depositing PF/ESIC dues attracts damages (penalty) and interest. It also disallows the expense in Income Tax for the employer.',
        },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4">
                            Labor Compliance
                        </div>
                        <h1 className="text-3xl lg:text-5xl text-white mb-4">PF & ESIC Registration</h1>
                        <p className="text-xl text-neutral-100 leading-relaxed mb-6">
                            Secure your workforce with social security. Mandatory for businesses with 10/20+ employees.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Clock className="w-5 h-5 text-accent" />
                                <span>100% Online</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                <Shield className="w-5 h-5 text-accent" />
                                <span>Shram Suvidha</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scheme Types Grid */}
            <section className="py-16 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        {schemeTypes.map((type, index) => (
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Why Register?</h2>
                            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                                Apart from being a legal mandate, it improves employee retention and provides a safety net during emergencies.
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
                                <div className="absolute top-0 right-0 w-24 h-24 bg-red-100 rounded-bl-full -z-0"></div>
                                <h3 className="text-2xl font-bold text-primary mb-6 relative z-10">Penalty Alert</h3>
                                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl mb-6 relative z-10">
                                    <div className="flex gap-4">
                                        <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
                                        <div>
                                            <p className="text-red-800 font-bold text-lg">Heavy Fine</p>
                                            <p className="text-red-700 text-sm mt-1 leading-relaxed">
                                                Non-registration entails imprisonment and fine. Delay in payments attracts damages up to 100% of the arrears.
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Documents List</h2>
                            <p className="text-lg text-neutral-600 mb-6">
                                Documents needed for Shram Suvidha Portal
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
                            <h2 className="text-3xl lg:text-4xl text-primary mb-6">Process Timeline</h2>
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
                        <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">Our Packages</h2>
                        <p className="text-lg text-neutral-600">Transparent pricing for registration</p>
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

            {/* Compliances */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl text-primary mb-4">Monthly Compliances</h2>
                        <p className="text-lg text-neutral-600">Recurring filings required</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {compliances.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6 hover:shadow-2xl transition-all"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <CalendarCheck className="w-6 h-6 text-primary" />
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
                    <h2 className="text-3xl lg:text-4xl text-white mb-4">Be A Compliant Employer</h2>
                    <p className="text-xl text-neutral-100 mb-8">
                        Register for PF and ESIC without hassle.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleStartService}
                            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                            REGISTER NOW
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
