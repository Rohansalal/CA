import { Building, CheckCircle, FileText, Clock, ArrowRight, Shield, Briefcase, Users, Globe } from 'lucide-react';

export function GovernmentRegistrations() {
  const registrations = [
    {
      name: 'Udyam Registration (MSME)',
      icon: Briefcase,
      description: 'Mandatory registration for Micro, Small & Medium Enterprises to avail government benefits',
      benefits: [
        'Priority sector lending from banks',
        'Collateral-free loans up to ₹1 crore (micro), ₹10 crore (small)',
        'Reduced electricity bills',
        'Patent/trademark registration subsidies',
        'Government tender preferences',
        'Easy access to credit & subsidies',
        'CLCSS subsidy benefits',
      ],
      eligibility: {
        micro: 'Investment < ₹1 crore, Turnover < ₹5 crore',
        small: 'Investment < ₹10 crore, Turnover < ₹50 crore',
        medium: 'Investment < ₹50 crore, Turnover < ₹250 crore',
      },
      documents: [
        'Aadhaar number of proprietor/partner',
        'PAN of the business',
        'GSTIN (if applicable)',
        'Bank account details',
        'Business address proof',
      ],
      timeline: '1-2 days',
      fees: 'Free (self-registration)',
      validity: 'Lifetime (no renewal required)',
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'FSSAI License',
      icon: Shield,
      description: 'Food Safety and Standards Authority of India license for food businesses',
      types: [
        {
          type: 'Basic Registration',
          turnover: '< ₹12 lakhs',
          validity: '1-5 years',
          fee: '₹100',
        },
        {
          type: 'State License',
          turnover: '₹12 lakhs - ₹20 crores',
          validity: '1-5 years',
          fee: '₹2,000 - ₹5,000',
        },
        {
          type: 'Central License',
          turnover: '> ₹20 crores',
          validity: '1-5 years',
          fee: '₹7,500',
        },
      ],
      applicableTo: [
        'Manufacturers of food products',
        'Restaurants, cafes, cloud kitchens',
        'Food traders, wholesalers, retailers',
        'Food storage & warehousing',
        'Food transporters',
        'Online food delivery platforms',
      ],
      documents: [
        'Form B (application form)',
        'PAN card',
        'Photo identity & address proof',
        'Business incorporation certificate',
        'Food safety management plan',
        'List of food products',
        'Water testing report',
        'Layout plan of processing unit',
      ],
      timeline: '7-15 days (State), 30-45 days (Central)',
      color: 'from-green-500 to-green-600',
    },
    {
      name: 'Import Export Code (IEC)',
      icon: Globe,
      description: '10-digit code required for import/export of goods and services',
      whoNeeds: [
        'Businesses involved in import/export',
        'Service exporters under GST',
        'Required for customs clearance',
        'For remittance receipt from abroad',
        'For availing export benefits/incentives',
      ],
      notRequired: [
        'Individuals importing/exporting for personal use',
        'Importing/exporting goods through courier up to ₹5 lakhs',
      ],
      documents: [
        'PAN card of the entity',
        'Aadhaar of proprietor/authorized signatory',
        'Bank certificate/cancelled cheque',
        'Current account mandatory',
        'Digital photograph',
        'Business premises address proof',
      ],
      process: [
        'Fill online application on DGFT portal',
        'Upload required documents',
        'Pay application fee (₹500)',
        'DGFT verification',
        'IEC issued (10-digit code)',
        'Digital certificate downloaded',
      ],
      timeline: '2-5 working days',
      fees: '₹500',
      validity: 'Permanent (no renewal)',
      additionalBenefits: [
        'MEIS/SEIS export benefit schemes',
        'Access to export credit',
        'Duty drawback schemes',
        'EPCG scheme benefits',
      ],
      color: 'from-purple-500 to-purple-600',
    },
    {
      name: 'Trade License',
      icon: Building,
      description: 'Municipal license required for commercial establishments',
      issuingAuthority: 'Local Municipal Corporation/Panchayat',
      applicableTo: [
        'Retail shops and showrooms',
        'Manufacturing units',
        'Restaurants and food outlets',
        'Service centers',
        'Warehouses and godowns',
        'Professional offices (in some areas)',
      ],
      documents: [
        'Application form',
        'Identity & address proof of proprietor',
        'Business premises ownership/rent agreement',
        'NOC from property owner',
        'NOC from Fire Department (if required)',
        'Pollution certificate (for certain businesses)',
        'Partnership deed/Company incorporation certificate',
      ],
      timeline: '7-30 days (varies by municipality)',
      fees: '₹500 - ₹10,000 (varies by location & business type)',
      validity: '1 year (annual renewal required)',
      penalties: 'Fine + possible closure for operating without license',
      color: 'from-orange-500 to-orange-600',
    },
    {
      name: 'Trademark Registration',
      icon: Shield,
      description: 'Legal protection for your brand name, logo, and identity',
      benefits: [
        'Exclusive rights to use the mark',
        'Legal protection against infringement',
        'Brand value and credibility',
        'Asset for business valuation',
        'Licensing and franchising opportunities',
        'Use ® symbol after registration',
      ],
      classes: '45 classes of goods and services (Nice Classification)',
      process: [
        'Trademark search for availability',
        'Filing application with IPO',
        'Examination by Trademark Registry',
        'Publication in Trade Mark Journal',
        'Opposition period (4 months)',
        'If no opposition, registration granted',
        'Certificate of Registration issued',
      ],
      timeline: '12-18 months',
      fees: '₹4,500 (individual), ₹9,000 (company) per class',
      validity: '10 years (renewable indefinitely)',
      documents: [
        'Applicant details (individual/company)',
        'Address proof',
        'Trademark logo/word mark (in JPG format)',
        'List of goods/services',
        'Date of first use (if applicable)',
        'Power of Attorney (if filed through agent)',
      ],
      color: 'from-red-500 to-red-600',
    },
    {
      name: 'EPFO & ESIC Registration',
      icon: Users,
      description: 'Mandatory social security registrations for employees',
      epfo: {
        fullName: 'Employees Provident Fund Organization',
        applicability: 'Establishments with 20+ employees (10+ in some states)',
        coverage: 'Retirement benefits, pension, insurance',
        contribution: 'Employee: 12%, Employer: 12% (or 10% for new establishments)',
        documents: [
          'Certificate of Incorporation/Registration',
          'PAN & TAN',
          'Cancelled cheque',
          'Address proof of establishment',
          'List of employees with Aadhaar & bank details',
        ],
      },
      esic: {
        fullName: 'Employees State Insurance Corporation',
        applicability: 'Establishments with 10+ employees',
        coverage: 'Medical benefits, sickness, maternity, disability',
        contribution: 'Employee: 0.75%, Employer: 3.25%',
        documents: [
          'Business registration certificate',
          'PAN of establishment',
          'List of employees with salaries',
          'Rent agreement/ownership proof',
          'Bank account details',
        ],
      },
      returns: [
        { return: 'ECR (EPFO)', frequency: 'Monthly', dueDate: '15th of next month' },
        { return: 'ESI Return', frequency: 'Half-yearly', dueDate: '11th Nov & 11th May' },
      ],
      timeline: '3-7 days',
      penalties: 'Interest + damages + imprisonment for non-compliance',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      name: 'Shops & Establishment License',
      icon: Building,
      description: 'State-specific registration for commercial establishments',
      applicableTo: [
        'Shops, retail stores',
        'Commercial establishments',
        'Restaurants and eateries',
        'Entertainment venues (theaters, cinema)',
        'Residential hotels',
        'Offices and godowns',
      ],
      stateSpecific: 'Rules vary by state (working hours, leave, holidays)',
      documents: [
        'Application form (state-specific)',
        'PAN card',
        'Identity & address proof of owner',
        'Ownership/rental agreement',
        'Employee details',
        'NOC from landlord (if rented)',
      ],
      timeline: '7-15 days',
      fees: '₹100 - ₹5,000 (varies by state)',
      validity: '1-5 years (renewal required)',
      importance: [
        'Required for opening bank current account',
        'Needed for GST registration in some states',
        'Employee welfare compliance',
        'Required for other licenses',
      ],
      color: 'from-teal-500 to-teal-600',
    },
    {
      name: 'FCRA Registration',
      icon: Globe,
      description: 'Foreign Contribution Regulation Act registration for NGOs receiving foreign funds',
      whoNeeds: [
        'NGOs/Trusts/Societies',
        'Organizations receiving foreign donations',
        'Required for foreign grants/contributions',
      ],
      eligibility: [
        'Organization must be registered for 3 years',
        'Should have spent at least ₹15 lakhs on core activities in last 3 years',
        'Clean financial records',
        'Must have specific social/educational/cultural objectives',
      ],
      documents: [
        'Registration certificate of NGO (Trust/Society/Section 8)',
        'Audited financial statements (last 3 years)',
        'Activity report with details of fund utilization',
        'Copy of PAN',
        'List of board members with details',
        'Commitment letter from foreign donor',
        'Bank account details (separate FCRA account required)',
      ],
      process: [
        'Submit online application on FCRA portal',
        'Upload all documents',
        'Ministry scrutiny (may seek clarifications)',
        'Physical inspection of office (in some cases)',
        'Approval/rejection within 90-120 days',
      ],
      timeline: '90-180 days',
      validity: 'Permanent (annual returns mandatory)',
      annualCompliance: 'FC-4 return filing by 31st December every year',
      penalties: 'Cancellation of registration, imprisonment, fines',
      color: 'from-pink-500 to-pink-600',
    },
    {
      name: 'DARPAN ID (for NGOs)',
      icon: Users,
      description: 'Unique ID for NGOs to access government grants and CSR funding',
      issuedBy: 'NITI Aayog',
      whoNeeds: [
        'NGOs/Voluntary Organizations',
        'Trusts and Societies',
        'Section 8 Companies',
        'Required for government scheme participation',
        'Access to CSR funds',
      ],
      documents: [
        'Registration certificate of NGO',
        'PAN of the organization',
        '12A/80G registration (if available)',
        'FCRA certificate (if applicable)',
        'Audited financial statements (latest)',
        'List of board members/trustees',
        'Bank account details',
        'Activities and achievements report',
      ],
      timeline: '2-5 days (instant if documents verified)',
      fees: 'Free',
      benefits: [
        'Access to government grants',
        'Eligibility for CSR partnerships',
        'Enhanced credibility',
        'Easy application to schemes',
        'Single-window database',
      ],
      color: 'from-yellow-500 to-yellow-600',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-semibold mb-4">
              Government Registrations & Licenses
            </div>
            <h1 className="text-3xl lg:text-5xl text-white mb-4">Regulatory Compliance & Special Registrations</h1>
            <p className="text-xl text-neutral-100 leading-relaxed">
              Complete support for industry-specific licenses, government registrations, and regulatory compliance including MSME, FSSAI, IEC, Trademark, EPFO, ESIC, and NGO registrations.
            </p>
          </div>
        </div>
      </section>

      {/* Registration Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {registrations.map((reg, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-neutral-200"
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${reg.color} p-6 lg:p-8 text-white`}>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <reg.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl lg:text-3xl text-white mb-2">{reg.name}</h2>
                      <p className="text-white/90">{reg.description}</p>
                      {reg.issuingAuthority && (
                        <p className="text-sm text-white/80 mt-2">Issuing Authority: {reg.issuingAuthority}</p>
                      )}
                      {reg.issuedBy && (
                        <p className="text-sm text-white/80 mt-2">Issued by: {reg.issuedBy}</p>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      {reg.timeline && (
                        <>
                          <div className="text-sm opacity-90">Timeline</div>
                          <div className="text-lg font-bold flex items-center gap-1">
                            <Clock className="w-5 h-5" />
                            {reg.timeline}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                  {/* Quick Info Bar */}
                  {(reg.fees || reg.validity) && (
                    <div className="grid md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-neutral-200">
                      {reg.fees && (
                        <div>
                          <div className="text-sm font-semibold text-primary mb-1">Fees</div>
                          <div className="text-xl text-accent font-bold">{reg.fees}</div>
                        </div>
                      )}
                      {reg.validity && (
                        <div>
                          <div className="text-sm font-semibold text-primary mb-1">Validity</div>
                          <div className="text-neutral-700 font-medium">{reg.validity}</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Main Content Grid */}
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column - Benefits/Eligibility/Who Needs */}
                    <div className="space-y-6">
                      {reg.benefits && (
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-4">Key Benefits:</h3>
                          <div className="space-y-2">
                            {reg.benefits.map((benefit, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-neutral-700">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {reg.whoNeeds && (
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-4">Who Needs This:</h3>
                          <div className="space-y-2">
                            {reg.whoNeeds.map((need, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-neutral-700">{need}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {reg.applicableTo && (
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-4">Applicable To:</h3>
                          <div className="space-y-2">
                            {reg.applicableTo.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-neutral-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {reg.eligibility && typeof reg.eligibility === 'object' && (
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-4">MSME Classification:</h3>
                          <div className="space-y-2">
                            {Object.entries(reg.eligibility).map(([key, value], idx) => (
                              <div key={idx} className="p-3 bg-neutral-50 rounded-lg">
                                <div className="text-sm font-semibold text-primary capitalize">{key} Enterprise:</div>
                                <div className="text-xs text-neutral-600 mt-1">{value as string}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {reg.importance && (
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-4">Why It's Important:</h3>
                          <div className="space-y-2">
                            {reg.importance.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-neutral-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column - Documents/Process */}
                    <div className="space-y-6">
                      {reg.documents && (
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-4">Documents Required:</h3>
                          <div className="space-y-2">
                            {reg.documents.map((doc, idx) => (
                              <div key={idx} className="flex items-start gap-2 p-2 bg-neutral-50 rounded">
                                <FileText className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-neutral-700">{doc}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {reg.process && (
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-4">Process Steps:</h3>
                          <div className="space-y-3">
                            {reg.process.map((step, idx) => (
                              <div key={idx} className="flex gap-3">
                                <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="text-xs font-bold text-accent">{idx + 1}</span>
                                </div>
                                <span className="text-sm text-neutral-700">{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {reg.types && (
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-4">License Types:</h3>
                          <div className="space-y-3">
                            {reg.types.map((type, idx) => (
                              <div key={idx} className="p-4 bg-neutral-50 rounded-lg">
                                <div className="text-sm font-semibold text-primary mb-2">{type.type}</div>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div>
                                    <span className="text-neutral-500">Turnover:</span>
                                    <div className="text-neutral-800 font-medium">{type.turnover}</div>
                                  </div>
                                  <div>
                                    <span className="text-neutral-500">Fee:</span>
                                    <div className="text-accent font-bold">{type.fee}</div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* EPFO/ESIC Special Section */}
                  {reg.epfo && reg.esic && (
                    <div className="mt-8 grid md:grid-cols-2 gap-6">
                      <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="text-lg font-semibold text-blue-900 mb-4">EPF Registration</h4>
                        <div className="space-y-2 text-sm">
                          <p><strong>Coverage:</strong> {reg.epfo.coverage}</p>
                          <p><strong>Contribution:</strong> {reg.epfo.contribution}</p>
                          <p><strong>Applicability:</strong> {reg.epfo.applicability}</p>
                        </div>
                      </div>
                      <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="text-lg font-semibold text-green-900 mb-4">ESI Registration</h4>
                        <div className="space-y-2 text-sm">
                          <p><strong>Coverage:</strong> {reg.esic.coverage}</p>
                          <p><strong>Contribution:</strong> {reg.esic.contribution}</p>
                          <p><strong>Applicability:</strong> {reg.esic.applicability}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all hover:shadow-lg flex items-center justify-center gap-2">
                      Apply Now
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all">
                      Get Consultation
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl text-white mb-4">Need Help with Government Registrations?</h2>
          <p className="text-xl text-neutral-100 mb-8">
            Our experts will guide you through the entire registration and compliance process
          </p>
          <button className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center gap-2">
            TALK TO AN EXPERT
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
