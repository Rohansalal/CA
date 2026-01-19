import { FileText, Calculator, Shield, BookOpen, Building, FileCheck, TrendingUp, Globe, Lightbulb, ArrowRight, CheckCircle } from 'lucide-react';
import { ServicesIndex } from './ServicesIndex';

export function Services() {
  return <ServicesIndex />;
}

// Keep the original detailed services page as backup
export function ServicesDetailed() {
  const services = [
    {
      icon: FileText,
      title: 'Taxation Services',
      description: 'Comprehensive tax planning, compliance, and advisory for optimal financial efficiency.',
      features: [
        'Income Tax Return (ITR) Filing',
        'Tax Planning & Optimization',
        'TDS Compliance & Returns',
        'Advance Tax Calculations',
        'Tax Notices & Assessments',
        'Transfer Pricing Services',
      ],
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Calculator,
      title: 'GST Services',
      description: 'End-to-end GST solutions for seamless compliance and maximum input tax credit benefits.',
      features: [
        'GST Registration & Amendments',
        'GST Return Filing (GSTR-1, 3B, 9)',
        'Input Tax Credit Reconciliation',
        'GST Audit & Advisory',
        'GST Notice Management',
        'E-way Bill Compliance',
      ],
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Shield,
      title: 'Audit & Assurance',
      description: 'Independent and thorough audit services ensuring accuracy, compliance, and transparency.',
      features: [
        'Statutory Audit',
        'Internal Audit',
        'Tax Audit (44AB)',
        'Stock & Inventory Audit',
        'Concurrent Audit',
        'Forensic Audit',
      ],
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: BookOpen,
      title: 'Accounting & Bookkeeping',
      description: 'Accurate financial records maintained with modern accounting practices and technologies.',
      features: [
        'Monthly Bookkeeping',
        'Financial Statement Preparation',
        'MIS Reporting',
        'Bank Reconciliation',
        'Accounts Payable/Receivable',
        'Tally Implementation & Training',
      ],
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: Building,
      title: 'Company Registration',
      description: 'Complete incorporation services with regulatory compliance and documentation support.',
      features: [
        'Private Limited Company Registration',
        'LLP Registration',
        'One Person Company (OPC)',
        'Partnership Firm Registration',
        'Proprietorship Setup',
        'MSME/Udyam Registration',
      ],
      color: 'from-red-500 to-red-600',
    },
    {
      icon: FileCheck,
      title: 'ROC Compliance',
      description: 'Ensure timely compliance with Ministry of Corporate Affairs (MCA) regulations.',
      features: [
        'Annual Filing (AOC-4, MGT-7)',
        'Board Meetings & Resolutions',
        'Director Appointments/Resignations',
        'Share Capital Alterations',
        'DIN/DSC Services',
        'Incorporation Certificate Changes',
      ],
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      icon: TrendingUp,
      title: 'Virtual CFO Services',
      description: 'Strategic financial leadership and planning without the cost of a full-time CFO.',
      features: [
        'Financial Strategy & Planning',
        'Cash Flow Management',
        'Budgeting & Forecasting',
        'Investor Relations',
        'KPI Dashboards',
        'Business Valuations',
      ],
      color: 'from-teal-500 to-teal-600',
    },
    {
      icon: Globe,
      title: 'NRI Taxation',
      description: 'Specialized tax services for Non-Resident Indians with global income and investments.',
      features: [
        'NRI Tax Return Filing',
        'Residential Status Determination',
        'DTAA Benefits & FEMA Compliance',
        'Capital Gains on Property',
        'Foreign Income Reporting',
        'TDS on NRI Transactions',
      ],
      color: 'from-pink-500 to-pink-600',
    },
    {
      icon: Lightbulb,
      title: 'Startup Advisory',
      description: 'Complete guidance for startups from incorporation to funding and compliance.',
      features: [
        'Business Structure Advisory',
        'Funding & Pitch Deck Support',
        'DPIIT Startup Registration',
        '80IAC Tax Exemption',
        'Financial Model Planning',
        'Compliance Roadmap',
      ],
      color: 'from-yellow-500 to-yellow-600',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl text-white mb-6">Our Services</h1>
          <p className="text-xl text-neutral-100 max-w-3xl mx-auto">
            Comprehensive financial solutions delivered by expert chartered accountants with proven track records across diverse industries
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-neutral-200 group"
              >
                <div className="grid lg:grid-cols-3 gap-0">
                  {/* Left Column - Icon & Title */}
                  <div className={`bg-gradient-to-br ${service.color} p-8 lg:p-12 text-white flex flex-col justify-center`}>
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl text-white mb-4">{service.title}</h3>
                    <p className="text-white/90 text-sm lg:text-base">{service.description}</p>
                  </div>

                  {/* Right Column - Features */}
                  <div className="lg:col-span-2 p-8 lg:p-12">
                    <h4 className="text-lg text-primary mb-6 font-semibold">What We Offer:</h4>
                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-neutral-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all hover:shadow-lg flex items-center gap-2 group-hover:gap-3">
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl text-primary mb-4">Our Service Process</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              A streamlined approach ensuring quality, compliance, and client satisfaction
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Initial Consultation', description: 'Understanding your needs and business requirements' },
              { step: '02', title: 'Proposal & Planning', description: 'Tailored solution design with clear timelines' },
              { step: '03', title: 'Execution & Delivery', description: 'Professional service delivery with regular updates' },
              { step: '04', title: 'Ongoing Support', description: 'Continuous advisory and compliance management' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl text-primary mb-2">{item.title}</h3>
                <p className="text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl text-white mb-6">Need Expert Financial Guidance?</h2>
          <p className="text-xl text-neutral-100 mb-8">
            Let our chartered accountants help you navigate complex compliance and grow your business
          </p>
          <button className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1">
            SCHEDULE A CONSULTATION
          </button>
        </div>
      </section>
    </div>
  );
}