export function GovernmentRegistrationsCompliances() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-teal-900 to-teal-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Government Registrations & Special Regulatory Compliances</h1>
                        <p className="text-xl text-teal-100">
                            Specialized government registrations including MSME, trademark, FSSAI, and other regulatory licenses and compliance services.
                        </p>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            title: 'MSME/Udyam Registration',
                            description: 'Micro, Small & Medium Enterprise registration for government benefits and schemes.',
                            features: ['Udyam Certificate', 'Government Schemes', 'Loan Benefits', 'Tax Benefits']
                        },
                        {
                            title: 'Trademark Registration',
                            description: 'Brand name and logo protection through trademark registration.',
                            features: ['TM Search', 'Application Filing', 'Objection Handling', 'Registration Certificate']
                        },
                        {
                            title: 'FSSAI License',
                            description: 'Food Safety and Standards Authority license for food businesses.',
                            features: ['Basic Registration', 'State License', 'Central License', 'Renewal']
                        },
                        {
                            title: 'Trade License',
                            description: 'Municipal corporation trade license for business operations.',
                            features: ['Shop License', 'Factory License', 'Renewal', 'Compliance']
                        },
                        {
                            title: 'Shops & Establishment',
                            description: 'Shops and Establishment Act registration for workplace compliance.',
                            features: ['Registration', 'Employee Coverage', 'Working Hours', 'Leave Policy']
                        },
                        {
                            title: 'EPFO/ESIC Returns',
                            description: 'Employee Provident Fund and ESI compliance and return filing.',
                            features: ['Monthly Returns', 'Employee Coverage', 'Contribution Calculation', 'Compliance']
                        },
                        {
                            title: 'FCRA Registration',
                            description: 'Foreign Contribution Regulation Act registration for NGOs.',
                            features: ['FCRA Certificate', 'Foreign Funding', 'Annual Returns', 'Compliance']
                        },
                        {
                            title: 'DARPAN Registration',
                            description: 'NGO DARPAN portal registration for government grants and schemes.',
                            features: ['Unique ID', 'Government Schemes', 'CSR Funding', 'Credibility']
                        },
                        {
                            title: 'CSR-1 Filing',
                            description: 'Corporate Social Responsibility compliance and filing.',
                            features: ['CSR Policy', 'CSR Committee', 'Annual Filing', 'Project Monitoring']
                        },
                        {
                            title: 'ISO Certification',
                            description: 'ISO certification support for quality management systems.',
                            features: ['ISO 9001', 'ISO 14001', 'ISO 27001', 'Audit Support']
                        }
                    ].map((service, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                            <p className="text-gray-600 mb-4">{service.description}</p>
                            <ul className="space-y-2">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start text-sm text-gray-700">
                                        <span className="text-teal-900 mr-2">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button className="mt-6 w-full py-2 bg-teal-900 text-white rounded hover:bg-teal-800 transition-colors">
                                Register Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
