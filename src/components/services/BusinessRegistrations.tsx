export function BusinessRegistrations() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Business Registrations</h1>
                        <p className="text-xl text-blue-100">
                            Complete business registration services for all types of entities. From company incorporation to LLP formation, we handle all legal formalities for your business setup.
                        </p>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            title: 'Company Incorporation',
                            description: 'Register Private Limited, Public Limited, or One Person Company with complete ROC compliance.',
                            features: ['Private Limited Company', 'Public Limited Company', 'One Person Company (OPC)', 'Section 8 Company (NGO)']
                        },
                        {
                            title: 'LLP Formation',
                            description: 'Limited Liability Partnership registration with minimal compliance requirements.',
                            features: ['LLP Agreement Drafting', 'ROC Filing', 'DPIN & DSC', 'Partnership Deed']
                        },
                        {
                            title: 'Partnership Firm',
                            description: 'Traditional partnership firm registration with partnership deed preparation.',
                            features: ['Partnership Deed', 'PAN & TAN Registration', 'Bank Account Opening', 'GST Registration']
                        },
                        {
                            title: 'Sole Proprietorship',
                            description: 'Simplest form of business registration for individual entrepreneurs.',
                            features: ['Business Name Registration', 'Tax Registrations', 'MSME Registration', 'Bank Account Setup']
                        },
                        {
                            title: 'Section 8 Company',
                            description: 'Non-profit organization registration for charitable and social welfare activities.',
                            features: ['NGO Registration', '12A & 80G Certification', 'FCRA Registration', 'CSR Compliance']
                        },
                        {
                            title: 'Producer Company',
                            description: 'Special company structure for farmers and agricultural producers.',
                            features: ['Agricultural Focus', 'Member Benefits', 'Government Schemes', 'Cooperative Structure']
                        }
                    ].map((service, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                            <p className="text-gray-600 mb-4">{service.description}</p>
                            <ul className="space-y-2">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start text-sm text-gray-700">
                                        <span className="text-blue-900 mr-2">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button className="mt-6 w-full py-2 bg-blue-900 text-white rounded hover:bg-blue-800 transition-colors">
                                Learn More
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
