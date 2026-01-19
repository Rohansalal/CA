export function TaxFinancialCompliances() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-orange-900 to-orange-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Tax & Financial Compliances</h1>
                        <p className="text-lg text-orange-100 mb-2">(Direct + Indirect Taxes)</p>
                        <p className="text-xl text-orange-100">
                            Complete tax compliance services including income tax returns, GST filings, TDS returns, tax audits, and all direct and indirect tax compliances.
                        </p>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            title: 'Income Tax Return Filing',
                            description: 'ITR filing for individuals, businesses, and all entity types (ITR-1 to ITR-7).',
                            features: ['Individual ITR', 'Business ITR', 'Capital Gains', 'Loss Carry Forward']
                        },
                        {
                            title: 'GST Return Filing',
                            description: 'Monthly, quarterly, and annual GST return filing with complete compliance.',
                            features: ['GSTR-1', 'GSTR-3B', 'GSTR-9', 'Input Tax Credit']
                        },
                        {
                            title: 'TDS Return Filing',
                            description: 'Quarterly TDS return filing for salary, payments, and other deductions.',
                            features: ['24Q - Salary TDS', '26Q - Non-Salary TDS', '27Q - NRI TDS', 'TDS Certificates']
                        },
                        {
                            title: 'Tax Audit',
                            description: 'Statutory tax audit under Income Tax Act with Form 3CA/3CB and 3CD.',
                            features: ['Form 3CA/3CB', 'Form 3CD', 'Audit Report', 'Tax Planning']
                        },
                        {
                            title: 'Transfer Pricing',
                            description: 'Transfer pricing documentation and compliance for international transactions.',
                            features: ['TP Study', 'Form 3CEB', 'APA Filing', 'Benchmarking']
                        },
                        {
                            title: 'Advance Tax Payment',
                            description: 'Calculation and payment of advance tax in quarterly installments.',
                            features: ['Tax Calculation', 'Payment Schedule', 'Interest Savings', 'Compliance']
                        },
                        {
                            title: 'E-Invoicing & E-Way Bill',
                            description: 'E-invoice generation and e-way bill compliance for GST.',
                            features: ['E-Invoice Setup', 'E-Way Bill', 'IRN Generation', 'Portal Integration']
                        },
                        {
                            title: 'Labour Law Compliance',
                            description: 'PF, ESI, and other labour law compliance and return filing.',
                            features: ['PF Returns', 'ESI Returns', 'Bonus Calculation', 'Gratuity']
                        }
                    ].map((service, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                            <p className="text-gray-600 mb-4">{service.description}</p>
                            <ul className="space-y-2">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start text-sm text-gray-700">
                                        <span className="text-orange-900 mr-2">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button className="mt-6 w-full py-2 bg-orange-900 text-white rounded hover:bg-orange-800 transition-colors">
                                File Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
