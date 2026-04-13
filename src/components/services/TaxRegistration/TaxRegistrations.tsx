import { FileText, CheckCircle, ArrowRight, Shield, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const registrations = [
  {
    title: 'GST Registration',
    description: 'Mandatory for businesses with turnover above ₹20 lakhs. Get your GSTIN and start filing returns.',
    path: '/services/tax-registrations/gst-registration',
    badge: 'Most Popular',
    badgeColor: 'bg-indigo-100 text-indigo-700',
    features: ['GSTIN in 3-5 days', 'Expert guidance', 'Complete documentation'],
    icon: Shield,
  },
  {
    title: 'PAN Application',
    description: 'Permanent Account Number — mandatory for all financial transactions and income tax filing.',
    path: '/services/tax-registrations/pan-application',
    badge: 'Essential',
    badgeColor: 'bg-green-100 text-green-700',
    features: ['Individual & Business PAN', 'e-PAN available', 'Aadhaar-linked'],
    icon: CreditCard,
  },
  {
    title: 'TAN Application',
    description: 'Tax Deduction Account Number — required for businesses that deduct TDS from payments.',
    path: '/services/tax-registrations/tan-application',
    badge: 'For Employers',
    badgeColor: 'bg-amber-100 text-amber-700',
    features: ['TAN in 7-10 days', 'TDS filing enabled', 'NSDL registered'],
    icon: FileText,
  },
];

export function TaxRegistrations() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Tax Registrations</h2>
        <p className="text-gray-500 mt-2">Get your mandatory tax registrations done by expert CAs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {registrations.map((reg) => {
          const Icon = reg.icon;
          return (
            <div
              key={reg.title}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
              onClick={() => navigate(reg.path)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${reg.badgeColor}`}>
                  {reg.badge}
                </span>
              </div>

              <h3 className="font-bold text-gray-900 mb-2">{reg.title}</h3>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">{reg.description}</p>

              <ul className="space-y-1.5 mb-5">
                {reg.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 group-hover:text-indigo-700 transition-colors">
                View Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
