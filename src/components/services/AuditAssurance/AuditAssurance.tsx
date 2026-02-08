import { useNavigate } from 'react-router-dom';
import {
    Shield,
    FileText,
    BarChart,
    CheckCircle,
    PieChart
} from 'lucide-react';

export function AuditAssurance() {
    const navigate = useNavigate();

    const services = [
        {
            title: 'Statutory Audit',
            description: 'Mandatory audit of financial statements under Companies Act to ensure accuracy and compliance.',
            icon: Shield,
            path: '/services/audit-assurance/statutory-audit'
        },
        {
            title: 'Tax Audit',
            description: 'Audit of accounts under Income Tax Act for businesses/professions exceeding turnover limits.',
            icon: FileText,
            path: '/services/audit-assurance/tax-audit'
        },
        {
            title: 'GST Audit',
            description: 'Reconciliation of GSTR 9 & 9C, department audit support, and special audits.',
            icon: PieChart,
            path: '/services/audit-assurance/gst-audit'
        },
        {
            title: 'Internal Audit',
            description: 'Independent appraisal of operations to improve risk management and control processes.',
            icon: BarChart,
            path: '/services/audit-assurance/internal-audit'
        }
    ];

    return (
        <div className="bg-neutral-50 min-h-screen">
            <div className="bg-primary text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl text-white md:text-5xl font-bold mb-6">Audit & Assurance Services</h1>
                    <p className="text-xl text-blue-100 max-w-3xl">
                        Reliable audit services to enhance stakeholder confidence, ensure compliance, and improve business processes.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(service.path)}
                            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-neutral-100 group"
                        >
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                                <service.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                            <p className="text-neutral-600 mb-4">{service.description}</p>
                            <div className="flex items-center text-accent font-semibold text-sm">
                                Learn More <CheckCircle className="w-4 h-4 ml-2" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
