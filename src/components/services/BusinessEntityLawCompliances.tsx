export function BusinessEntityLawCompliances() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Business Entity Law & Operational Compliances</h1>
                        <p className="text-xl text-purple-100">
                            Comprehensive ROC compliance, annual filings, and operational compliance services for companies and LLPs to ensure regulatory adherence.
                        </p>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            title: 'ROC Annual Filings',
                            description: 'Annual compliance filings for companies including AOC-4, MGT-7, and financial statements.',
                            features: ['AOC-4 Filing', 'MGT-7 Filing', 'Financial Statements', 'Annual Returns']
                        },
                        {
                            title: 'LLP Annual Filings',
                            description: 'Annual return and statement of accounts filing for Limited Liability Partnerships.',
                            features: ['Form 8 Filing', 'Form 11 Filing', 'Income Tax Return', 'Audit Reports']
                        },
                        {
                            title: 'Director KYC',
                            description: 'Annual KYC compliance for directors and designated partners.',
                            features: ['DIR-3 KYC', 'Digital Signature', 'Document Verification', 'Timely Filing']
                        },
                        {
                            title: 'Board Meetings & AGM',
                            description: 'Complete support for conducting board meetings and annual general meetings.',
                            features: ['Meeting Notice', 'Minutes Preparation', 'Resolutions', 'ROC Filing']
                        },
                        {
                            title: 'Share Transfer',
                            description: 'Share transfer and transmission procedures with ROC compliance.',
                            features: ['SH-4 Filing', 'Share Certificates', 'Register Updates', 'Stamp Duty']
                        },
                        {
                            title: 'Change in Directors',
                            description: 'Addition, removal, or change in directors/partners with necessary filings.',
                            features: ['DIR-12 Filing', 'Consent Letters', 'DIN Allocation', 'Register Updates']
                        },
                        {
                            title: 'Registered Office Change',
                            description: 'Change of registered office address with ROC and other authorities.',
                            features: ['INC-22 Filing', 'Address Proof', 'NOC Documents', 'Multi-Authority Update']
                        }
                    ].map((service, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                            <p className="text-gray-600 mb-4">{service.description}</p>
                            <ul className="space-y-2">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start text-sm text-gray-700">
                                        <span className="text-purple-900 mr-2">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button className="mt-6 w-full py-2 bg-purple-900 text-white rounded hover:bg-purple-800 transition-colors">
                                Get Started
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
