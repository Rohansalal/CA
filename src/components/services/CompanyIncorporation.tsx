import { Building2, CheckCircle, FileText, Clock, ArrowRight, Users, Shield, TrendingUp, AlertCircle } from 'lucide-react';

export function CompanyIncorporation() {
  const companyTypes = [
    {
      type: 'Private Limited Company',
      icon: Building2,
      description: 'Most popular structure for startups and SMEs with limited liability protection',
      minMembers: '2 Directors, 2 Shareholders',
      maxMembers: 'Max 200 Members',
      liabilityType: 'Limited to share capital',
      suitableFor: 'Startups, SMEs, VC-funded businesses',
      benefits: [
        'Limited liability protection for directors',
        'Separate legal entity status',
        'Easy fundraising through equity',
        'Higher credibility with stakeholders',
        'Perpetual succession',
        'Tax benefits under Startup India',
      ],
      documents: [
        'PAN & Aadhaar of Directors/Shareholders',
        'Address proof of registered office',
        'Utility bill (electricity/water)',
        'NOC from property owner',
        'Passport size photos',
        'Digital Signature Certificate (DSC)',
      ],
      process: [
        'Obtain Digital Signature Certificate (DSC)',
        'Director Identification Number (DIN) application',
        'Name approval via RUN (Reserve Unique Name)',
        'File SPICe+ form with MCA',
        'Memorandum & Articles of Association (MoA/AoA)',
        'Certificate of Incorporation issued',
        'PAN & TAN allotment',
        'GST registration (if applicable)',
      ],
      timeline: '10-15 days',
      governmentFees: '₹8,000 - ₹12,000',
      color: 'from-blue-500 to-blue-600',
    },
    {
      type: 'Public Limited Company',
      icon: TrendingUp,
      description: 'For large-scale businesses planning IPO or seeking public investment',
      minMembers: '7 Directors, 7 Shareholders',
      maxMembers: 'No maximum limit',
      liabilityType: 'Limited to share capital',
      suitableFor: 'Large corporations, IPO-bound companies',
      benefits: [
        'Can raise funds from public via IPO',
        'Unlimited member capacity',
        'Enhanced credibility and prestige',
        'Easy transfer of shares',
        'Statutory compliance builds trust',
        'Better valuation opportunities',
      ],
      documents: [
        'PAN & Aadhaar of all Directors',
        'Registered office address proof',
        'Utility bills and NOC',
        'Bank account proof',
        'DSC for all directors',
        'Consent letters from directors',
      ],
      process: [
        'DSC & DIN for minimum 7 directors',
        'Name reservation with RUN',
        'Draft MoA & AoA (detailed)',
        'File INC-32 (SPICe+)',
        'Submit Form INC-33 & INC-34',
        'Certificate of Incorporation',
        'Commencement of Business Certificate',
        'Statutory registers maintenance',
      ],
      timeline: '15-20 days',
      governmentFees: '₹15,000 - ₹25,000',
      color: 'from-purple-500 to-purple-600',
    },
    {
      type: 'One Person Company (OPC)',
      icon: Users,
      description: 'Solo entrepreneur structure with limited liability benefits',
      minMembers: '1 Director, 1 Shareholder',
      maxMembers: '1 Member (+ 1 Nominee)',
      liabilityType: 'Limited to capital',
      suitableFor: 'Solo entrepreneurs, freelancers, consultants',
      benefits: [
        'Single person control',
        'Limited liability protection',
        'Separate legal entity',
        'Easy conversion to Private Ltd',
        'Lower compliance burden',
        'Suitable for bootstrapped ventures',
      ],
      documents: [
        'PAN & Aadhaar of sole member',
        'Nominee details & consent',
        'Registered office proof',
        'Utility bill & rent agreement',
        'DSC of the director',
        'Subscriber sheet',
      ],
      process: [
        'DSC & DIN for the sole director',
        'Nominee identification and consent',
        'Name approval via RUN',
        'SPICe+ form filing',
        'MoA & AoA preparation',
        'Certificate of Incorporation',
        'PAN, TAN & bank account',
      ],
      timeline: '7-12 days',
      governmentFees: '₹6,000 - ₹9,000',
      color: 'from-green-500 to-green-600',
    },
    {
      type: 'Section 8 Company',
      icon: Shield,
      description: 'Non-profit organization for charitable, educational, or social purposes',
      minMembers: '2 Directors minimum',
      maxMembers: 'No limit',
      liabilityType: 'Limited by guarantee',
      suitableFor: 'NGOs, charitable trusts, social enterprises',
      benefits: [
        'Tax exemption under 80G/12A',
        'No minimum capital requirement',
        'Limited liability structure',
        'Credibility for donors/grants',
        'Perpetual existence',
        'Professional governance structure',
      ],
      documents: [
        'PAN & Aadhaar of promoters',
        'Project report & objectives',
        'Financial projections for 3 years',
        'Details of funding sources',
        'Registered office proof',
        'Declaration of non-profit motive',
      ],
      process: [
        'Obtain DSC & DIN',
        'Name approval with RUN',
        'Draft detailed MoA (non-profit clause)',
        'Prepare activity report & financials',
        'File Form INC-12 (license application)',
        'MCA approval (scrutiny period)',
        'File SPICe+ after approval',
        'Certificate of Incorporation',
      ],
      timeline: '30-45 days',
      governmentFees: '₹5,000 - ₹8,000',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const postIncorporationServices = [
    'Current bank account opening assistance',
    'Startup India registration',
    '80IAC tax exemption application',
    'DPIIT recognition',
    'Trademark filing',
    'GST registration',
    'MSME/Udyam registration',
    'Professional Tax registration',
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4">
              Business Registration Services
            </div>
            <h1 className="text-3xl lg:text-5xl text-white mb-4">Company Incorporation Services</h1>
            <p className="text-xl text-neutral-100 leading-relaxed">
              Register your business with complete legal compliance. Choose from Private Limited, Public Limited, OPC, or Section 8 Company based on your business needs.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl border border-neutral-100 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Companies Registered', value: '500+' },
                { label: 'Average Timeline', value: '10-15 Days' },
                { label: 'Success Rate', value: '100%' },
                { label: 'Post-Inc Support', value: 'Lifetime' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl lg:text-3xl text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-neutral-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Types Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-primary mb-4">Choose Your Company Type</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Select the business structure that aligns with your vision, funding needs, and growth plans
            </p>
          </div>

          <div className="space-y-8">
            {companyTypes.map((company, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-neutral-200"
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${company.color} p-6 lg:p-8 text-white`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <company.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl lg:text-3xl text-white mb-2">{company.type}</h3>
                        <p className="text-white/90">{company.description}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm opacity-90">From</div>
                      <div className="text-xl font-bold">{company.governmentFees}</div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                  {/* Key Info Grid */}
                  <div className="grid md:grid-cols-4 gap-4 mb-8 pb-8 border-b border-neutral-200">
                    <div>
                      <div className="text-xs text-neutral-500 mb-1">Minimum Members</div>
                      <div className="text-sm font-semibold text-neutral-800">{company.minMembers}</div>
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500 mb-1">Maximum Members</div>
                      <div className="text-sm font-semibold text-neutral-800">{company.maxMembers}</div>
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500 mb-1">Liability Type</div>
                      <div className="text-sm font-semibold text-neutral-800">{company.liabilityType}</div>
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500 mb-1">Timeline</div>
                      <div className="text-sm font-semibold text-accent flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {company.timeline}
                      </div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Benefits */}
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wide">
                        Key Benefits
                      </h4>
                      <div className="space-y-2">
                        {company.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-neutral-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Documents */}
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wide">
                        Documents Required
                      </h4>
                      <div className="space-y-2">
                        {company.documents.map((doc, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <FileText className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-neutral-700">{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Process */}
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wide">
                        Registration Process
                      </h4>
                      <div className="space-y-3">
                        {company.process.map((step, idx) => (
                          <div key={idx} className="flex gap-3">
                            <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold text-accent">{idx + 1}</span>
                            </div>
                            <span className="text-sm text-neutral-700">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Suitable For */}
                  <div className="mt-8 p-4 bg-accent/5 rounded-lg border border-accent/20">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-primary mb-1">Best Suited For:</div>
                        <div className="text-sm text-neutral-700">{company.suitableFor}</div>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 flex gap-4">
                    <button className="flex-1 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all hover:shadow-lg">
                      Start Registration
                    </button>
                    <button className="px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all">
                      Get Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Post-Incorporation Services */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl text-primary mb-4">Post-Incorporation Services</h2>
            <p className="text-lg text-neutral-600">
              Complete support after company registration
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {postIncorporationServices.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-neutral-200 group hover:-translate-y-1"
              >
                <CheckCircle className="w-8 h-8 text-accent mb-3" />
                <div className="text-neutral-800 font-medium">{service}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl text-white mb-4">Ready to Incorporate Your Business?</h2>
          <p className="text-xl text-neutral-100 mb-8">
            Our CA experts will guide you through the entire process
          </p>
          <button className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center gap-2">
            GET STARTED NOW
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
