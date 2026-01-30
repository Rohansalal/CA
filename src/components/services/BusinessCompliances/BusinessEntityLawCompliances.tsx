import { useNavigate } from 'react-router-dom';
import { FileText, Shield, UserCheck, Users, Briefcase, UserPlus, MapPin } from 'lucide-react';

export function BusinessEntityLawCompliances() {
    const navigate = useNavigate();

    const services = [
        {
            title: 'ROC Annual Filings',
            description: 'Annual compliance filings for companies including AOC-4, MGT-7, and financial statements.',
            features: ['AOC-4 Filing', 'MGT-7 Filing', 'Financial Statements', 'Annual Returns'],
            icon: FileText,
            link: '/services/business-entity-law-compliances/roc-annual-filings'
        },
        {
            title: 'LLP Annual Filings',
            description: 'Annual return and statement of accounts filing for Limited Liability Partnerships.',
            features: ['Form 8 Filing', 'Form 11 Filing', 'Income Tax Return', 'Audit Reports'],
            icon: Briefcase,
            link: '/services/business-entity-law-compliances/llp-annual-filings'
        },
        {
            title: 'Director KYC',
            description: 'Annual KYC compliance for directors and designated partners to keep DIN active.',
            features: ['DIR-3 KYC', 'Digital Signature', 'Document Verification', 'Timely Filing'],
            icon: UserCheck,
            link: '/services/business-entity-law-compliances/director-kyc'
        },
        {
            title: 'Board Meetings & AGM',
            description: 'Complete support for conducting board meetings and annual general meetings.',
            features: ['Meeting Notice', 'Minutes Preparation', 'Resolutions', 'ROC Filing'],
            icon: Users,
            link: '/services/business-entity-law-compliances/board-meetings'
        },
        {
            title: 'Share Transfer',
            description: 'Share transfer and transmission procedures with ROC compliance and stamp duty.',
            features: ['SH-4 Filing', 'Share Certificates', 'Register Updates', 'Stamp Duty'],
            icon: Shield,
            link: '/services/business-entity-law-compliances/share-transfer'
        },
        {
            title: 'Change in Directors',
            description: 'Addition, removal, or change in directors/partners with necessary filings.',
            features: ['DIR-12 Filing', 'Consent Letters', 'DIN Allocation', 'Register Updates'],
            icon: UserPlus,
            link: '/services/business-entity-law-compliances/change-in-directors'
        },
        {
            title: 'Registered Office Change',
            description: 'Change of registered office address with ROC and other authorities.',
            features: ['INC-22 Filing', 'Address Proof', 'NOC Documents', 'Multi-Authority Update'],
            icon: MapPin,
            link: '/services/business-entity-law-compliances/registered-office-change'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Business Entity Law & Compliances</h1>
                        <p className="text-xl text-blue-100">
                            Comprehensive ROC compliance, annual filings, and operational compliance services for companies and LLPs to ensure regulatory adherence and zero penalties.
                        </p>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all hover:-translate-y-1">
                            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
                                <service.icon className="w-6 h-6 text-blue-900" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                            <p className="text-gray-600 mb-4 text-sm min-h-[60px]">{service.description}</p>
                            <ul className="space-y-2 mb-6">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start text-sm text-gray-700">
                                        <span className="text-blue-900 mr-2">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => navigate(service.link)}
                                className="w-full py-2 bg-blue-900 text-white rounded hover:bg-blue-800 transition-colors"
                            >
                                Learn More
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
