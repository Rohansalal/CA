import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, FileText, Shield, Globe, Users, Calculator, Briefcase, ArrowRight, TrendingUp, CheckCircle, Sparkles, Building } from 'lucide-react';
import SEO from '../SEO';

export function AllServices() {
  interface ServiceItem {
    name: string;
    description: string;
    icon: any;
    link: string;
    popular?: boolean;
    comingSoon?: boolean;
  }

  interface ServiceCategory {
    category: string;
    icon: any;
    description: string;
    services: ServiceItem[];
  }

  const serviceCategories: ServiceCategory[] = [
    {
      category: 'Business Registrations',
      icon: Building2,
      description: 'Start your entrepreneurial journey with the right legal structure and compliance foundation.',
      services: [
        {
          name: 'Company Incorporation',
          description: 'Private Ltd, Public Ltd, OPC, Section 8 Company registration.',
          icon: Building2,
          link: '/services/business-registrations/private-limited-company',
          popular: true,
        },
        {
          name: 'LLP Formation',
          description: 'Limited Liability Partnership registration for balanced growth.',
          icon: Users,
          link: '/services/business-registrations/llp-registration',
        },
        {
          name: 'Partnership Firm',
          description: 'General & Limited Partnership registration services.',
          icon: Briefcase,
          link: '/services/business-registrations/partnership-firm',
        },
        {
          name: 'HUF Formation',
          description: 'Hindu Undivided Family formation and PAN card application.',
          icon: Users,
          link: '/services/business-registrations/huf',
        },
        {
          name: 'Trust Registration',
          description: 'Private Trust, Public Trust, and Charitable Trust setup.',
          icon: Shield,
          link: '/services/business-registrations/trust-registration',
        },
        {
          name: 'Society Registration',
          description: 'Registration of Societies for charitable purposes.',
          icon: Users,
          link: '/services/business-registrations/society-registration',
        },
        {
          name: 'One Person Company',
          description: 'Single-owner company registration with limited liability.',
          icon: Users,
          link: '/services/business-registrations/one-person-company',
        },
        {
          name: 'Section 8 Company',
          description: 'Non-profit organization registration under Section 8.',
          icon: Building2,
          link: '/services/business-registrations/section-8-company',
        }
      ],
    },
    {
      category: 'Tax Registrations',
      icon: FileText,
      description: 'Essential tax identification and registration services for compliant business operations.',
      services: [
        {
          name: 'GST Registration',
          description: 'Get your Goods and Services Tax identification number.',
          icon: FileText,
          link: '/services/tax-registrations/gst-registration',
          popular: true,
        },
        {
          name: 'PAN Application',
          description: 'Permanent Account Number for individuals and entities.',
          icon: FileText,
          link: '/services/tax-registrations/pan-application',
        },
        {
          name: 'TAN Application',
          description: 'Tax Deduction and Collection Account Number application.',
          icon: FileText,
          link: '/services/tax-registrations/tan-application',
        },
        {
          name: 'Professional Tax',
          description: 'State-level Professional Tax enrollment and registration.',
          icon: Calculator,
          link: '/services/tax-registrations/professional-tax',
        }
      ],
    },
    {
      category: 'Tax & Financial Compliances',
      icon: Calculator,
      description: 'Timely filing, accurate calculations, and comprehensive tax management solutions.',
      services: [
        {
          name: 'ITR Filing',
          description: 'Comprehensive Income Tax Return filing for all.',
          icon: FileText,
          link: '/services/tax-compliances/itr-filing',
          popular: true,
        },
        {
          name: 'Advance Tax',
          description: 'Accurate quarterly advance tax calculation & payment.',
          icon: Calculator,
          link: '/services/tax-compliances/advance-tax-calculation',
        },
        {
          name: 'TDS Return',
          description: 'Timely filing of TDS returns and certificate issuance.',
          icon: FileText,
          link: '/services/tax-compliances/tds-return-filing',
        },
        {
          name: 'GST Return',
          description: 'Monthly/Quarterly GSTR-1, GSTR-3B filings.',
          icon: FileText,
          link: '/services/tax-compliances/gst-return-filing',
        },
        {
          name: 'GST Annual Return',
          description: 'Annual GSTR-9 and reconciliation statement filing.',
          icon: FileText,
          link: '/services/tax-compliances/gst-annual-return',
        },
      ],
    },
    {
      category: 'Audit & Assurance',
      icon: Shield,
      description: 'Independent verification and assurance services to ensure financial accuracy and compliance.',
      services: [
        {
          name: 'Statutory Audit',
          description: 'Mandatory audit compliance under Companies Act, 2013.',
          icon: FileText,
          link: '/services/audit-assurance/statutory-audit',
        },
        {
          name: 'Tax Audit',
          description: 'Form 3CA/3CB & 3CD audit under Income Tax Act.',
          icon: Calculator,
          link: '/services/audit-assurance/tax-audit',
        },
        {
          name: 'Internal Audit',
          description: 'Risk assessment and operational efficiency reviews.',
          icon: Shield,
          link: '/services/audit-assurance/internal-audit',
        },
        {
          name: 'GST Audit',
          description: 'GSTR-9C reconciliation audit and certification.',
          icon: FileText,
          link: '/services/audit-assurance/gst-audit',
        },
      ],
    },
    {
      category: 'Government Registrations & Licenses',
      icon: Users,
      description: 'Secure crucial licenses and registrations for specific business activities and benefits.',
      services: [
        {
          name: 'MSME/Udyam Registration',
          description: 'Registration for Micro, Small & Medium Enterprises.',
          icon: Briefcase,
          link: '/services/other-registrations/msme',
          popular: true,
        },
        {
          name: 'FSSAI License',
          description: 'Food license registration for food business operators.',
          icon: Shield,
          link: '/services/other-registrations/fssai',
        },
        {
          name: 'Import Export Code (IEC)',
          description: 'Mandatory license for import/export businesses.',
          icon: Globe,
          link: '/services/other-registrations/iec',
        },
        {
          name: 'Trade License',
          description: 'Municipal trade license for commercial establishments.',
          icon: Building2,
          link: '/services/other-registrations/trade-license',
        },
        {
          name: 'Trademark Registration',
          description: 'Protect your brand identity with trademark filing.',
          icon: Shield,
          link: '/services/other-registrations/trademark',
        },
        {
          name: 'Digital Signature (DSC)',
          description: 'Class 3 DSC for e-filing and digital authentication.',
          icon: Shield,
          link: '/services/other-registrations/dsc',
        },
        {
          name: 'PF & ESIC Registration',
          description: 'Social security registration for employees.',
          icon: Users,
          link: '/services/other-registrations/pf-esic',
        },
        {
          name: 'Start-up India Registration',
          description: 'DPIIT recognition for tax benefits and support.',
          icon: TrendingUp,
          link: '/services/other-registrations/startup-india',
        },
        {
          name: 'Copyright Registration',
          description: 'Legal protection for your creative works.',
          icon: FileText,
          link: '/services/other-registrations/copyright',
        },
        {
          name: 'Labour Registration',
          description: 'Shop & Establishment and Labour Law registrations.',
          icon: Users,
          link: '/services/other-registrations/labour-registration',
        },
        {
          name: 'Drug License',
          description: 'License for pharmaceutical and drug businesses.',
          icon: Shield,
          link: '/services/other-registrations/drug-license',
        },
        {
          name: 'Pollution Control',
          description: 'Consent to Establish/Operate from Pollution Board.',
          icon: Globe,
          link: '/services/other-registrations/pollution-control',
        }
      ],
    },
    {
      category: 'Business Compliances',
      icon: FileText,
      description: 'Routine filings, corporate governance, and statutory record maintenance.',
      services: [
        {
          name: 'Book Keeping',
          description: 'Professional maintenance of daily accounts.',
          icon: FileText,
          link: '/services/business-compliances/book-keeping',
        },
        {
          name: 'Book Supervision',
          description: 'Review and supervision of internal accounting.',
          icon: FileText,
          link: '/services/business-compliances/book-supervision',
        },
        {
          name: 'Change in Directors',
          description: 'DIR-12 filing for appointment or resignation.',
          icon: Users,
          link: '/services/business-compliances/change-directors-kmp',
        },
        {
          name: 'Registered Office Change',
          description: 'INC-22 filing for change of business address.',
          icon: Building2,
          link: '/services/business-compliances/change-registered-office',
        },
        {
          name: 'ROC Annual Filings',
          description: 'Mandatory annual returns (AOC-4, MGT-7).',
          icon: FileText,
          link: '/services/business-compliances/annual-filing-company',
        },
        {
          name: 'LLP Annual Filings',
          description: 'Form 11 and Form 8 filing for LLPs.',
          icon: FileText,
          link: '/services/business-compliances/annual-filing-llp',
        },
        {
          name: 'Director KYC',
          description: 'Annual DIR-3 KYC for DIN holders.',
          icon: Users,
          link: '/services/business-compliances/din-dir3-kyc',
        },
        {
          name: 'Minutes Book',
          description: 'Drafting and maintenance of meeting minutes.',
          icon: FileText,
          link: '/services/business-compliances/minutes-book',
        },
        {
          name: 'Statutory Record',
          description: 'Maintenance of statutory registers and records.',
          icon: FileText,
          link: '/services/business-compliances/statutory-record',
        },
      ],
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO
        title="All Services"
        description="Explore our comprehensive range of financial, legal, and compliance services for businesses and individuals."
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-secondary text-white overflow-hidden py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h6V4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-block mb-6">
            <br />
            <br />
            <span className="px-4 py-2 bg-accent text-white rounded-full text-sm font-semibold border border-accent/30 shadow-lg">
              Comprehensive Financial Solutions
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
            Our Complete Service Directory
          </h1>
          <p className="text-xl text-neutral-100 max-w-3xl mx-auto leading-relaxed">
            From company incorporation to complex tax audits, find the exact professional service you need to scale your business.
          </p>
        </div>
        <br />
        <br />
        <br />
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24 mt-10">
        {serviceCategories.map((category, index) => (
          <section
            key={index}
            id={category.category.toLowerCase().replace(/\s+/g, '-')}
            className="pt-16 first:pt-0"
          >
            {/* Category Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-neutral-100 pb-8">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-primary text-white shadow-lg space-y-2 shrink-0">
                  <category.icon className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-primary mb-3">{category.category}</h2>
                  <p className="text-neutral-600 max-w-2xl text-lg leading-relaxed">{category.description}</p>
                </div>
              </div>
              <div className="hidden md:block">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-50 text-primary text-sm font-bold rounded-full border border-neutral-100">
                  <CheckCircle className="w-4 h-4" />
                  {category.services.length} Services
                </span>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 mb-10">
              {category.services.map((service, sIndex) => (
                <Link
                  key={sIndex}
                  to={service.link}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg border border-neutral-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full overflow-hidden"
                >
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-primary/0 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:scale-110" />

                  {service.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6 relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md">
                      <service.icon className="w-7 h-7" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors relative z-10">
                    {service.name}
                  </h3>

                  <p className="text-neutral-600 mb-6 leading-relaxed flex-grow relative z-10">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-bold text-accent group-hover:gap-3 transition-all mt-auto pt-4 border-t border-neutral-50 relative z-10">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
            <br />
            <br />
            <br />
            <br />
          </section>
        ))}
      </div>

      <br />

      {/* CTA Section - Matching Home Theme */}
      <section className="py-24 bg-gradient-to-r from-primary via-secondary to-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h6V4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <br />
          <br />
          <br />
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Need a Custom Solution?</h2>
          <p className="text-xl text-neutral-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Our experts are ready to help you navigate complex financial and legal requirements tailored specifically to your business.
          </p>
          <br />
          <br />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                if (window.location.pathname === '/') {
                  document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/#consultation-form';
                }
              }}
              className="px-10 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-2xl transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2 group"
            >
              GET EXPERT CA GUIDANCE
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
              to="/contact"
              className="px-10 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-neutral-50 hover:shadow-2xl transform hover:-translate-y-1 transition-all flex items-center justify-center"
            >
              CONTACT SUPPORT
            </Link>
            <br />

          </div>
        </div>
        <br />
        <br />
        <br />
      </section>
    </div>
  );
}




