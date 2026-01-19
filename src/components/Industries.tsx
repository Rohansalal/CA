import { Building2, ShoppingBag, Factory, Heart, GraduationCap, Home, Truck, Laptop, ArrowRight, CheckCircle } from 'lucide-react';

export function Industries() {
  const industries = [
    {
      icon: Building2,
      title: 'Real Estate & Construction',
      description: 'Specialized services for developers, contractors, and property consultants.',
      services: [
        'Project-specific accounting',
        'GST on real estate transactions',
        'TDS compliance for contractors',
        'Income recognition advisory',
      ],
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: ShoppingBag,
      title: 'Retail & E-commerce',
      description: 'Complete financial solutions for online and offline retail businesses.',
      services: [
        'E-commerce accounting',
        'Marketplace reconciliation',
        'Inventory valuation',
        'Multi-state GST compliance',
      ],
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Factory,
      title: 'Manufacturing',
      description: 'Comprehensive support for manufacturing units and industrial enterprises.',
      services: [
        'Cost accounting & analysis',
        'Excise & customs advisory',
        'Working capital management',
        'Export incentive schemes',
      ],
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: Heart,
      title: 'Healthcare & Pharma',
      description: 'Financial services tailored for hospitals, clinics, and pharmaceutical companies.',
      services: [
        'Medical practice accounting',
        'Regulatory compliance',
        'Drug licensing support',
        'Healthcare GST advisory',
      ],
      color: 'from-red-500 to-red-600',
    },
    {
      icon: GraduationCap,
      title: 'Education & Training',
      description: 'Compliance and advisory for educational institutions and training centers.',
      services: [
        'Trust & society accounting',
        'GST exemption advisory',
        '80G/12A registrations',
        'Fee management systems',
      ],
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Home,
      title: 'Hospitality & Tourism',
      description: 'Financial management for hotels, restaurants, and travel businesses.',
      services: [
        'Daily revenue accounting',
        'Multiple outlet consolidation',
        'Tourism GST compliance',
        'Foreign exchange advisory',
      ],
      color: 'from-pink-500 to-pink-600',
    },
    {
      icon: Truck,
      title: 'Logistics & Transportation',
      description: 'Specialized services for transport operators and logistics companies.',
      services: [
        'E-way bill compliance',
        'Vehicle depreciation planning',
        'Freight accounting',
        'Fleet management advisory',
      ],
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      icon: Laptop,
      title: 'IT & Software Services',
      description: 'Tech-focused financial solutions for software companies and startups.',
      services: [
        'Startup incorporation',
        'ESOP accounting',
        'SEZ compliance',
        'Export of services taxation',
      ],
      color: 'from-teal-500 to-teal-600',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl text-white mb-6">Industries We Serve</h1>
            <p className="text-xl text-neutral-100 leading-relaxed">
              Deep domain expertise across diverse sectors with tailored financial solutions that address industry-specific challenges and opportunities
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-neutral-200 group"
              >
                <div className={`bg-gradient-to-r ${industry.color} p-6 flex items-center gap-4`}>
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <industry.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl text-white mb-1">{industry.title}</h3>
                    <p className="text-white/90 text-sm">{industry.description}</p>
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="text-sm text-primary mb-4 font-semibold uppercase tracking-wide">
                    Specialized Services:
                  </h4>
                  <div className="space-y-3 mb-6">
                    {industry.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700">{service}</span>
                      </div>
                    ))}
                  </div>
                  <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all hover:shadow-lg flex items-center gap-2 group-hover:gap-3">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Industry Expertise Matters */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-primary mb-4">Why Industry Expertise Matters</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Understanding your industry means better compliance, smarter tax planning, and strategic growth
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Regulatory Knowledge',
                description: 'Deep understanding of industry-specific regulations, tax laws, and compliance requirements.',
              },
              {
                title: 'Benchmarking',
                description: 'Access to industry benchmarks and best practices to optimize your financial performance.',
              },
              {
                title: 'Risk Management',
                description: 'Proactive identification of industry-specific financial and compliance risks.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-neutral-200"
              >
                <h3 className="text-xl text-primary mb-3">{item.title}</h3>
                <p className="text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-10 lg:p-16 text-white">
            <div className="max-w-3xl">
              <div className="inline-block px-4 py-2 bg-accent/30 rounded-full text-sm font-semibold mb-6">
                SUCCESS STORY
              </div>
              <h2 className="text-3xl lg:text-4xl text-white mb-6">
                Helped a Manufacturing Client Save ₹25 Lakhs in Tax Through Strategic Planning
              </h2>
              <p className="text-xl text-neutral-100 mb-8">
                Our deep understanding of manufacturing sector incentives and export benefits enabled significant tax optimization while maintaining full compliance.
              </p>
              <button className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl">
                READ MORE CASE STUDIES
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl text-primary mb-6">
            Don't See Your Industry Listed?
          </h2>
          <p className="text-xl text-neutral-600 mb-8">
            We serve businesses across all sectors. Contact us to discuss your specific needs.
          </p>
          <button className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1">
            SCHEDULE A CONSULTATION
          </button>
        </div>
      </section>
    </div>
  );
}
