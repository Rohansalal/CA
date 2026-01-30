import { Building2, Landmark, Tv, Globe, Factory, Home, Heart, GraduationCap, Laptop, ArrowRight, CheckCircle2, Shield, TrendingUp, Users, FileText } from 'lucide-react';

export function Industries() {
  const stats = [
    { label: 'Sectors Served', value: '15+' },
    { label: 'Corporate Clients', value: '500+' },
    { label: 'Years of Experience', value: '25+' },
    { label: 'Government Audits', value: '100+' },
  ];

  const keySectors = [
    {
      icon: Tv,
      title: 'Media & Broadcasting',
      description: 'Strategic financial oversight for dynamic media houses and broadcasting giants.',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-100',
      assignments: [
        'Internal Audit of Times Group',
        'Audit & advisory assignments for media and broadcasting entities',
        'Revenue assurance and royalty audits',
        'Compliance with broadcasting regulations'
      ]
    },
    {
      icon: Landmark,
      title: 'Public Sector & Government',
      description: 'Ensuring transparency and accountability in government undertakings and infrastructure.',
      color: 'text-blue-700',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      assignments: [
        'Internal Audit of BSNL',
        'Audit assignments related to India Water projects',
        'Compliance assurance for PSU audits',
        'Grant utilization certification'
      ]
    },
    {
      icon: Building2,
      title: 'Banking & Finance',
      description: 'Rigorous audit and compliance verification for major nationalized and private banks.',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
      assignments: [
        'Statutory, Concurrent, and Revenue Audits of State Bank of India (SBI)',
        'Audit assignments of Punjab National Bank (PNB)',
        'NPA management and systematic stock audits',
        'Regulatory compliance with RBI guidelines'
      ]
    },
    {
      icon: Globe,
      title: 'Corporate & MNCs',
      description: 'Global standard tax and advisory solutions for multinational enterprises.',
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      border: 'border-indigo-100',
      assignments: [
        'Income Tax and assessment matters for GSK',
        'Income Tax representation and advisory for Colgate-Palmolive',
        'Internal Audit of M2K Group (Real Estate)',
        'Cross-border taxation and transfer pricing'
      ]
    }
  ];

  const otherIndustries = [
    { name: 'Manufacturing & Trading', icon: Factory, desc: 'Costing & Supply Chain' },
    { name: 'Real Estate & Constr.', icon: Home, desc: 'RERA & Project Finance' },
    { name: 'NGOs & Social Sector', icon: Heart, desc: 'FCRA & Grant Mgmt' },
    { name: 'Education & Welfare', icon: GraduationCap, desc: 'Trust Audits' },
    { name: 'IT & ITES', icon: Laptop, desc: 'STPI & Transfer Pricing' },
  ];

  return (
    <div className="bg-slate-50 font-sans">
      {/* Hero Section */}
      <section className="relative bg-primary pt-48 pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-secondary/90"></div>


        <br />
        <br />
        <br />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6 border border-white/20 backdrop-blur-sm">
            <Shield className="w-4 h-4" /> Trusted Industry Experts
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Industry-Specific <span className="text-accent">Financial Intelligence</span>
          </h1>
          <p className="text-xl text-neutral-200 max-w-3xl mx-auto leading-relaxed font-light">
            Bringing deep sectoral expertise to audit, taxation, and compliance. From media giants to public sector undertakings, we deliver value that goes beyond the balance sheet.
          </p>
        </div>
        <br />
        <br />
        <br />
        <br />
      </section>

      {/* Floating Stats Section */}
      <section className="relative z-20 -mt-20 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl border border-neutral-100 grid grid-cols-2 md:grid-cols-4 divide-x divide-neutral-100 overflow-hidden">
          {stats.map((stat, index) => (
            <div key={index} className="p-8 text-center bg-white hover:bg-slate-50 transition-colors group">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
              <div className="text-sm font-medium text-neutral-500 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Sectors Section */}
      <section className="py-24">
        <br />
        <br />
        <br />
        <br />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4 mt-10">Focus Sectors</h2>
            <div className="w-20 h-1.5 bg-accent mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Our firm has developed specialized competencies in high-impact industries, delivering tailored solutions for complex regulatory environments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {keySectors.map((sector, index) => (
              <div key={index} className={`bg-white rounded-2xl p-8 shadow-md border ${sector.border} hover:shadow-2xl transition-all duration-300 group`}>
                <div className="flex items-start justify-between mb-8">
                  <div className={`w-16 h-16 rounded-2xl ${sector.bg} flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300`}>
                    <sector.icon className={`w-8 h-8 ${sector.color}`} />
                  </div>
                  <div className={`px-4 py-1.5 rounded-full ${sector.bg} ${sector.color} text-xs font-bold uppercase tracking-wider`}>
                    Specialized
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-neutral-800 mb-3 group-hover:text-primary transition-colors">{sector.title}</h3>
                <p className="text-neutral-600 mb-8 leading-relaxed">{sector.description}</p>

                <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-100">
                  <h4 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Key Assignments
                  </h4>
                  <ul className="space-y-4">
                    {sector.assignments.map((assignment, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className={`w-5 h-5 ${sector.color} shrink-0 mt-0.5`} />
                        <span className="text-sm text-neutral-700 font-medium leading-relaxed">{assignment}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            <br />
            <br />
          </div>
        </div>
      </section>

      {/* Other Industries Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-2">Diverse Industry Experience</h2>
              <p className="text-neutral-600">Expertise across a wide spectrum of business verticals.</p>
            </div>
            <div className="h-px bg-neutral-200 flex-grow md:mx-8"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {otherIndustries.map((industry, index) => (
              <div key={index} className="group relative bg-slate-50 rounded-xl p-6 hover:bg-primary transition-colors duration-300 border border-neutral-100 text-center hover:-translate-y-2 cursor-pointer">
                <div className="w-14 h-14 mx-auto bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <industry.icon className="w-7 h-7 text-neutral-600 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-bold text-neutral-800 mb-1 group-hover:text-white transition-colors">{industry.name}</h3>
                <p className="text-xs text-neutral-500 group-hover:text-blue-200 transition-colors">{industry.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us / Approach */}
      <section className="py-24 bg-neutral-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-accent opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-primary opacity-20 rounded-full blur-3xl"></div>


        <br />
        <br />
        <br />
        <br />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Sector-Agnostic Approach to Excellence</h2>
              <p className="text-lg font-bold text-neutral-800 mb-8 leading-relaxed">
                While every industry has unique regulations, the principles of financial integrity remain constant. We combine deep vertical knowledge with broad horizontal expertise to deliver superior results.
              </p>
              <div className="space-y-6 ">
                {[
                  { title: 'Regulatory Mastery', desc: 'Staying ahead of changing industry-specific laws and compliance mandates.' },
                  { title: 'Risk Mitigation', desc: 'Proactive identification of sector-specific financial and operational risks.' },
                  { title: 'Strategic Growth', desc: 'Financial planning aligned with industry trends and market dynamics.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                      <TrendingUp className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-orange-500 mb-1">{item.title}</h4>
                      <p className="text-neutral-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
                <br />
                <br />
                <br />
                <br />
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
                  alt="Strategic Consulting"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 w-full">
                    <div className="flex items-center gap-4 mb-3">
                      <Users className="w-8 h-8 text-accent" />
                      <div className="text-2xl font-bold text-white">100%</div>
                    </div>
                    <p className="text-sm font-bold text-neutral-300">Commitment to client confidentiality and data security across all engagements.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary to-blue-900 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Elevate Your Financial Strategy?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Partner with a firm that understands the nuances of your industry.
          </p>
          <br />
          <br />
          <button className="px-10 py-4 bg-accent text-white font-bold rounded-lg hover:bg-white hover:text-primary transition-all shadow-[0_0_20px_rgba(238,114,40,0.5)] hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
            SCHEDULE A CONSULTATION
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
