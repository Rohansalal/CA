import { useState } from 'react';
import { Building2, FileText, Shield, Globe, Users, Calculator, TrendingUp, Briefcase, ArrowRight } from 'lucide-react';
import { CompanyIncorporation } from './services/CompanyIncorporation';
import { LLPFormation } from './services/LLPFormation';
import { PartnershipFirm } from './services/PartnershipFirm';
import { TaxRegistrations } from './services/TaxRegistrations';
import { TaxCompliances } from './services/TaxCompliances';
import { GovernmentRegistrations } from './services/GovernmentRegistrations';

export function ServicesIndex() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  interface ServiceItem {
    id: string;
    name: string;
    description: string;
    icon: any;
    popular?: boolean;
    comingSoon?: boolean;
    linkedTo?: string;
  }

  interface ServiceCategory {
    category: string;
    icon: any;
    color: string;
    services: ServiceItem[];
  }

  const serviceCategories: ServiceCategory[] = [
    {
      category: 'Business Registrations',
      icon: Building2,
      color: 'from-blue-500 to-blue-600',
      services: [
        {
          id: 'company-incorporation',
          name: 'Company Incorporation',
          description: 'Private Ltd, Public Ltd, OPC, Section 8 Company',
          icon: Building2,
          popular: true,
        },
        {
          id: 'llp-formation',
          name: 'LLP Formation',
          description: 'Limited Liability Partnership registration',
          icon: Users,
        },
        {
          id: 'partnership-firm',
          name: 'Partnership Firm',
          description: 'General & Limited Partnership registration',
          icon: Briefcase,
        },
        {
          id: 'huf-formation',
          name: 'HUF Formation',
          description: 'Hindu Undivided Family formation and PAN',
          icon: Users,
          comingSoon: true,
        },
        {
          id: 'trust-registration',
          name: 'Trust Registration',
          description: 'Private Trust, Public Trust, Charitable Trust',
          icon: Shield,
          comingSoon: true,
        },
      ],
    },
    {
      category: 'Tax Registrations',
      icon: FileText,
      color: 'from-green-500 to-green-600',
      services: [
        {
          id: 'tax-registrations',
          name: 'PAN, GST & TAN',
          description: 'All essential tax registrations',
          icon: FileText,
          popular: true,
        },
      ],
    },
    {
      category: 'Tax & Financial Compliances',
      icon: Calculator,
      color: 'from-purple-500 to-purple-600',
      services: [
        {
          id: 'tax-compliances',
          name: 'Income Tax Return (ITR) Filing',
          description: 'ITR-1 to ITR-6 for all taxpayers',
          icon: FileText,
          popular: true,
        },
        {
          id: 'tax-audit',
          name: 'Tax Audit',
          description: 'Form 3CA/3CB, 3CD audit services',
          icon: Shield,
          linkedTo: 'tax-compliances',
        },
        {
          id: 'advance-tax',
          name: 'Advance Tax',
          description: 'Quarterly advance tax calculation & payment',
          icon: Calculator,
          linkedTo: 'tax-compliances',
        },
        {
          id: 'tds-return',
          name: 'TDS Deduction & Return',
          description: '24Q, 26Q, 27Q quarterly filing',
          icon: FileText,
          linkedTo: 'tax-compliances',
        },
        {
          id: 'gst-return',
          name: 'GST Return',
          description: 'GSTR-1, GSTR-3B, GSTR-9 filing',
          icon: FileText,
          linkedTo: 'tax-compliances',
        },
        {
          id: 'e-invoicing',
          name: 'E-Invoicing & E-Way Bill',
          description: 'GST e-invoice & e-way bill compliance',
          icon: Globe,
          linkedTo: 'tax-compliances',
        },
      ],
    },
    {
      category: 'Government Registrations & Licenses',
      icon: Shield,
      color: 'from-orange-500 to-orange-600',
      services: [
        {
          id: 'government-registrations',
          name: 'MSME/Udyam Registration',
          description: 'Micro, Small & Medium Enterprise registration',
          icon: Briefcase,
          popular: true,
        },
        {
          id: 'darpan-id',
          name: 'DARPAN ID (for NGOs)',
          description: 'NITI Aayog NGO registration',
          icon: Users,
          linkedTo: 'government-registrations',
        },
        {
          id: 'fssai-license',
          name: 'FSSAI License',
          description: 'Food business license registration',
          icon: Shield,
          linkedTo: 'government-registrations',
        },
        {
          id: 'iec-code',
          name: 'Import Export Code (IEC)',
          description: 'Import-export business registration',
          icon: Globe,
          linkedTo: 'government-registrations',
        },
        {
          id: 'trade-license',
          name: 'Trade License',
          description: 'Municipal corporation business license',
          icon: Building2,
          linkedTo: 'government-registrations',
        },
        {
          id: 'trademark',
          name: 'Trademark Registration',
          description: 'Brand name & logo protection',
          icon: Shield,
          linkedTo: 'government-registrations',
        },
        {
          id: 'epfo-esic',
          name: 'EPFO / ESIC Return',
          description: 'Employee provident fund & insurance',
          icon: Users,
          linkedTo: 'government-registrations',
        },
        {
          id: 'shops-establishment',
          name: 'Shops & Establishment License',
          description: 'State commercial establishment license',
          icon: Building2,
          linkedTo: 'government-registrations',
        },
        {
          id: 'fcra-registration',
          name: 'FCRA Registration',
          description: 'Foreign funding registration for NGOs',
          icon: Globe,
          linkedTo: 'government-registrations',
        },
        {
          id: 'csr-filing',
          name: 'CSR-1 Filing',
          description: 'Corporate Social Responsibility filing',
          icon: FileText,
          comingSoon: true,
        },
      ],
    },
    {
      category: 'ROC & MCA Compliances',
      icon: FileText,
      color: 'from-red-500 to-red-600',
      services: [
        {
          id: 'roc-filings',
          name: 'ROC Filings',
          description: 'AOC-4, MGT-7 annual filings',
          icon: FileText,
          comingSoon: true,
        },
        {
          id: 'llp-filings',
          name: 'LLP Filings',
          description: 'Form 8, Form 11 annual compliance',
          icon: FileText,
          comingSoon: true,
        },
        {
          id: 'director-kyc',
          name: 'Director KYC (DIR-3)',
          description: 'Annual KYC for directors',
          icon: Users,
          comingSoon: true,
        },
        {
          id: 'board-meetings',
          name: 'Board Meetings, AGM',
          description: 'Meeting minutes and resolutions',
          icon: Users,
          comingSoon: true,
        },
        {
          id: 'auditor-appointment',
          name: 'Auditor Appointment (ADT-1)',
          description: 'Statutory auditor appointment filing',
          icon: Shield,
          comingSoon: true,
        },
      ],
    },
    {
      category: 'Labour Law Compliances',
      icon: Users,
      color: 'from-indigo-500 to-indigo-600',
      services: [
        {
          id: 'pf-esi',
          name: 'PF, ESI, Bonus, Gratuity',
          description: 'Labour law compliance management',
          icon: Users,
          comingSoon: true,
        },
        {
          id: 'msme-return',
          name: 'MSME-1 Return',
          description: 'Delayed payment reporting',
          icon: FileText,
          comingSoon: true,
        },
        {
          id: 'loan-borrowings',
          name: 'Return of Loan & Borrowings',
          description: 'MCA loan reporting compliance',
          icon: TrendingUp,
          comingSoon: true,
        },
      ],
    },
  ];

  const handleServiceClick = (serviceId: string, linkedTo?: string) => {
    const targetId = linkedTo || serviceId;
    setSelectedService(targetId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToIndex = () => {
    setSelectedService(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render individual service pages
  if (selectedService === 'company-incorporation') {
    return (
      <div>
        <button
          onClick={handleBackToIndex}
          className="fixed top-24 left-4 z-40 px-4 py-2 bg-white shadow-lg rounded-lg text-primary font-semibold hover:bg-neutral-50 transition-all flex items-center gap-2"
        >
          ← Back to All Services
        </button>
        <CompanyIncorporation />
      </div>
    );
  }

  if (selectedService === 'llp-formation') {
    return (
      <div>
        <button
          onClick={handleBackToIndex}
          className="fixed top-24 left-4 z-40 px-4 py-2 bg-white shadow-lg rounded-lg text-primary font-semibold hover:bg-neutral-50 transition-all flex items-center gap-2"
        >
          ← Back to All Services
        </button>
        <LLPFormation />
      </div>
    );
  }

  if (selectedService === 'partnership-firm') {
    return (
      <div>
        <button
          onClick={handleBackToIndex}
          className="fixed top-24 left-4 z-40 px-4 py-2 bg-white shadow-lg rounded-lg text-primary font-semibold hover:bg-neutral-50 transition-all flex items-center gap-2"
        >
          ← Back to All Services
        </button>
        <PartnershipFirm />
      </div>
    );
  }

  if (selectedService === 'tax-registrations') {
    return (
      <div>
        <button
          onClick={handleBackToIndex}
          className="fixed top-24 left-4 z-40 px-4 py-2 bg-white shadow-lg rounded-lg text-primary font-semibold hover:bg-neutral-50 transition-all flex items-center gap-2"
        >
          ← Back to All Services
        </button>
        <TaxRegistrations />
      </div>
    );
  }

  if (selectedService === 'tax-compliances') {
    return (
      <div>
        <button
          onClick={handleBackToIndex}
          className="fixed top-24 left-4 z-40 px-4 py-2 bg-white shadow-lg rounded-lg text-primary font-semibold hover:bg-neutral-50 transition-all flex items-center gap-2"
        >
          ← Back to All Services
        </button>
        <TaxCompliances />
      </div>
    );
  }

  if (selectedService === 'government-registrations') {
    return (
      <div>
        <button
          onClick={handleBackToIndex}
          className="fixed top-24 left-4 z-40 px-4 py-2 bg-white shadow-lg rounded-lg text-primary font-semibold hover:bg-neutral-50 transition-all flex items-center gap-2"
        >
          ← Back to All Services
        </button>
        <GovernmentRegistrations />
      </div>
    );
  }

  // Services Index/Directory
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl text-white mb-6">Complete CA Services Directory</h1>
            <p className="text-xl text-neutral-100 leading-relaxed">
              Browse our comprehensive range of chartered accountancy services including business registrations, tax compliances, audits, and regulatory filings
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl border border-neutral-100 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl text-primary mb-1">35+</div>
                <div className="text-sm text-neutral-600">Services Offered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl text-primary mb-1">100%</div>
                <div className="text-sm text-neutral-600">Compliance Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl text-primary mb-1">24/7</div>
                <div className="text-sm text-neutral-600">Expert Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl text-primary mb-1">1000+</div>
                <div className="text-sm text-neutral-600">Clients Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {serviceCategories.map((category, catIndex) => (
              <div key={catIndex}>
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary">
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl text-primary">{category.category}</h2>
                    <div className="text-sm text-neutral-600">{category.services.length} services available</div>
                  </div>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.services.map((service, serviceIndex) => (
                    <button
                      key={serviceIndex}
                      onClick={() => !service.comingSoon && handleServiceClick(service.id, service.linkedTo)}
                      disabled={service.comingSoon}
                      className={`bg-white rounded-xl shadow-md border border-neutral-200 p-6 text-left transition-all group ${service.comingSoon
                        ? 'opacity-60 cursor-not-allowed'
                        : 'hover:shadow-2xl hover:-translate-y-1'
                        }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <service.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex flex-col gap-2">
                          {service.popular && (
                            <span className="px-2 py-1 bg-accent text-white text-xs font-semibold rounded-full">
                              Popular
                            </span>
                          )}
                          {service.comingSoon && (
                            <span className="px-2 py-1 bg-neutral-300 text-neutral-700 text-xs font-semibold rounded-full">
                              Coming Soon
                            </span>
                          )}
                        </div>
                      </div>
                      <h3 className="text-lg text-primary mb-2 font-semibold group-hover:text-accent transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-sm text-neutral-600 mb-4">{service.description}</p>
                      {!service.comingSoon && (
                        <div className="flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all">
                          Learn More
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl text-white mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl text-neutral-100 mb-8">
            Speak with our CA experts to discuss your specific requirements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1">
              SCHEDULE CONSULTATION
            </button>
            <button className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-neutral-100 transition-all">
              CALL US NOW
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
