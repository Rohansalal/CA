export function TaxRegistrationsService() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-green-900 to-green-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Tax Registrations</h1>
                        <p className="text-xl text-green-100">
                            Complete tax registration services including PAN, TAN, GST, and other essential tax identifications for your business and personal needs.
                        </p>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            title: 'PAN Registration',
                            description: 'Permanent Account Number registration for individuals and businesses.',
                            features: ['Individual PAN', 'Company PAN', 'Quick Processing', 'Online Application']
                        },
                        {
                            title: 'TAN Registration',
                            description: 'Tax Deduction Account Number for entities deducting TDS.',
                            features: ['TDS Compliance', 'Employer Registration', 'Online Filing', 'Certificate Issuance']
                        },
                        {
                            title: 'GST Registration',
                            description: 'Goods and Services Tax registration for businesses.',
                            features: ['Regular GST', 'Composition Scheme', 'E-Commerce GST', 'Interstate Business']
                        },
                        {
                            title: 'Professional Tax',
                            description: 'State-level professional tax registration for businesses and professionals.',
                            features: ['State Compliance', 'Monthly Returns', 'Employee Coverage', 'Certificate']
                        },
                        {
                            title: 'Import Export Code',
                            description: 'IEC registration for international trade businesses.',
                            features: ['DGFT Registration', 'Import License', 'Export Benefits', 'Customs Clearance']
                        }
                    ].map((service, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                            <p className="text-gray-600 mb-4">{service.description}</p>
                            <ul className="space-y-2">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start text-sm text-gray-700">
                                        <span className="text-green-900 mr-2">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button className="mt-6 w-full py-2 bg-green-900 text-white rounded hover:bg-green-800 transition-colors">
                                Apply Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
