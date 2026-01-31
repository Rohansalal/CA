import { useNavigate } from 'react-router-dom';
import {
    FileText, Shield, UserCheck, Users, Briefcase, UserPlus, MapPin,
    BookOpen, CheckCircle, Clock, ArrowRight, Gavel, Building2
} from 'lucide-react';

export function BusinessEntityLawCompliances() {
    const navigate = useNavigate();

    const services = [
        {
            title: 'Change In Directors / KMP',
            description: 'Appoint or resign directors with complete DIR-12 compliance.',
            features: ['DIR-12 Filing', 'Board Resolution', 'Resignation Letter', 'DIN Allocation'],
            icon: UserPlus,
            link: '/services/business-compliances/change-directors-kmp'
        },
        {
            title: 'Change In Registered Office',
            description: 'Shift your business address within or outside state limits.',
            features: ['INC-22 Filing', 'Rent Agreement', 'NOC Drafting', 'State Change Support'],
            icon: MapPin,
            link: '/services/business-compliances/change-registered-office'
        },
        {
            title: 'Annual Filing - Company',
            description: 'Mandatory AOC-4 & MGT-7 filing for Pvt Ltd Companies.',
            features: ['Balance Sheet', 'Annual Return', 'XBRL Filing', 'Compliance Cert.'],
            icon: FileText,
            link: '/services/business-compliances/annual-filing-company'
        },
        {
            title: 'DIN Application',
            description: 'Obtain Director Identification Number for new directors.',
            features: ['DIR-3 Filing', 'DSC Registration', 'Identity Verification', 'Lifetime Validity'],
            icon: UserCheck,
            link: '/services/business-compliances/din-dir3-kyc'
        },
        {
            title: 'DIR-3 KYC',
            description: 'Annual KYC compliance for all DIN holders.',
            features: ['Web KYC', 'OTP Verification', 'Passport Vrfy.', 'Active Status'],
            icon: UserCheck,
            link: '/services/business-compliances/din-dir3-kyc'
        },
        {
            title: 'DIR-3 Web KYC',
            description: 'Simplified KYC for directors with no change in details.',
            features: ['Instant Filing', 'OTP Based', 'No Documents', 'Mandatory Annual'],
            icon: UserCheck,
            link: '/services/business-compliances/din-dir3-kyc'
        },
        {
            title: 'Minutes Book',
            description: 'Maintenance of Board & General Meeting minutes.',
            features: ['Board Meeting', 'AGM / EGM', 'Attendance Sheet', 'Signed Minutes'],
            icon: BookOpen,
            link: '/services/business-compliances/minutes-book'
        },
        {
            title: 'Statutory Registers',
            description: 'Updating MGT-1, MGT-2 and other statutory registers.',
            features: ['Member Register', 'Director Register', 'Share Transfer', 'Charge Register'],
            icon: Gavel,
            link: '/services/business-compliances/statutory-record'
        },
        {
            title: 'Annual Filing - LLP',
            description: 'Form 11 and Form 8 filing for LLPs.',
            features: ['Statement of Accounts', 'Solvency Decl.', 'Partner Details', 'Income Tax'],
            icon: Briefcase,
            link: '/services/business-compliances/annual-filing-llp'
        }
    ];

    const benefits = [
        'Avoid heavy penalties (₹100/day)',
        'Maintain "Active" company status',
        'Eligible for government tenders',
        'Better credit rating for loans',
        'Director disqualification protection',
        'Peace of mind for management',
        'Investor due diligence readiness',
        'Legal protection against liabilities'
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10">
                    <Building2 className="w-96 h-96 -mr-20 -mt-20" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-semibold mb-6 border border-white/20">
                            Corporate Secretarial Services
                        </div>
                        <h1 className="text-4xl md:text-6xl text-white font-bold mb-6 leading-tight">
                            ROC / MCA Compliance <br />
                            <span className="text-white">Zero Non-Compliance</span>
                        </h1>
                        <p className="text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl">
                            Complete corporate law compliance management. From annual filings to event-based compliances, we ensure your company stays legally healthy.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg border border-white/20 backdrop-blur-sm">
                                <Clock className="w-5 h-5 text-white" />
                                <span className="font-medium text-white">Timely Filings</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg border border-white/20 backdrop-blur-sm">
                                <Shield className="w-5 h-5 text-white" />
                                <span className="font-medium text-white">Penalty Protection</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid Section */}
            <section className="py-20 -mt-20 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="group bg-white rounded-3xl p-8 border border-neutral-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col relative overflow-hidden">
                                {/* Hover Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-primary">
                                        <service.icon className="w-8 h-8" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed flex-1">{service.description}</p>

                                    <div className="space-y-3 mb-8 bg-neutral-50/50 p-4 rounded-xl border border-neutral-100/50">
                                        {service.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-3 text-[13px] font-medium text-gray-700">
                                                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => navigate(service.link)}
                                        className="w-full py-4 rounded-xl border border-neutral-200 text-gray-700 font-bold hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center gap-2 group/btn bg-white"
                                    >
                                        View Details
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Compliance Matters */}
            <section className="py-20 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">Why Compliance Matters?</h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Ignoring ROC compliance can lead to severe consequences including director disqualification and heavy late fees.
                            </p>
                            <div className="space-y-4">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm border border-neutral-200">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                        </div>
                                        <span className="text-gray-800 font-medium">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-white p-10 rounded-3xl shadow-2xl border border-neutral-100 relative z-10">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Expert Advisory</h3>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    Our team of Company Secretaries ensures your compliance calendar is always green. We handle the complexity of MCA filings so you can focus on business.
                                </p>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                                        <Users className="w-6 h-6 text-accent" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">Dedicated CS Team</div>
                                        <div className="text-sm text-gray-500">For ongoing support</div>
                                    </div>
                                </div>
                                <button onClick={() => navigate('/contact')} className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg">
                                    Request Callback
                                </button>
                            </div>
                            {/* Decorative background element */}
                            <div className="absolute top-10 -right-10 w-full h-full bg-accent/5 rounded-3xl -z-0 transform rotate-3"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">Stay Compliant, Stay Safe</h2>
                    <p className="text-xl text-blue-100 mb-12">
                        Get a free compliance health check for your company today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button
                            onClick={() => navigate('/contact')}
                            className="px-10 py-5 bg-white text-primary font-bold rounded-xl hover:bg-blue-50 transition-all shadow-2xl hover:scale-105 inline-flex items-center justify-center gap-2"
                        >
                            Contact Us
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
