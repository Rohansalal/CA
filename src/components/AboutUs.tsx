import { Users, Award, Target, Heart, TrendingUp, Shield, CheckCircle, Building, Briefcase, Handshake, Lightbulb, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AboutUs() {
  const values = [
    {
      icon: Shield,
      title: 'Integrity',
      description: 'Unwavering commitment to ethical practices and transparent communication.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Delivering superior quality in every engagement with attention to detail.',
    },
    {
      icon: Heart,
      title: 'Client-Centric',
      description: 'Your success is our priority. We build lasting partnerships.',
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'Leveraging technology and modern practices for efficient solutions.',
    },
  ];

  const team = [
    {
      name: 'CA Avinash Agarwalla',
      designation: 'Managing Partner',
      qualification: 'FCA (2003)',
      experience: '22+ Years',
      description: 'Awarded by ICSI for All-India Highest Marks in Tax Laws. Expert in taxation, audits, and regulatory compliances.',
      image: '/team-images/team-1.png'
    },
    {
      name: 'CA Payal Agarwal',
      designation: 'Partner',
      qualification: 'FCA (2005)',
      experience: '20+ Years',
      description: 'Founder Partner with rich experience in audit planning, execution, and coordination of statutory & bank audits.',
      image: '/team-images/team-2.jpeg'
    },
    {
      name: 'CA Deep Agrawal',
      designation: 'Associate Partner',
      qualification: 'FCA (2001)',
      experience: '25+ Years',
      description: 'Specialises in Internal audit and bank audits.',
      image: '/team-images/team-3.jpeg'
    },
    {
      name: 'CA Rekha Daga',
      designation: 'Associate Partner',
      qualification: 'FCA',
      experience: 'Experienced',
      description: 'Specialises in GST and indirect taxation matters.',
      image: '/team-images/team-4.jpeg'
    },
    {
      name: 'CA Mohit Gupta',
      designation: 'Associate Partner',
      qualification: 'ACA (2013)',
      experience: '12+ Years',
      description: 'Specialises in GST and indirect taxation matters.',
      image: '/team-images/team-5.png'
    },
  ];

  const journeyMilestones = [
    {
      year: '2005',
      label: 'INCEPTION',
      title: 'Foundation of the Firm',
      tag: 'Established',
      description: 'Started as a proprietorship with a focused mission to deliver exceptional audit and assurance services to emerging local businesses.',
      footerIcon: Building,
      footerText: 'First Client Acquisition',
      color: 'from-primary to-blue-600',
      shadow: 'shadow-primary/20',
      tagColor: 'bg-primary/5 text-primary border-primary/10',
      footerColor: 'text-primary'
    },
    {
      year: '2011',
      label: 'EXPANSION',
      title: 'Partnership & Growth',
      tag: 'Strategic Move',
      description: 'Reconstituted as a partnership firm, integrating diverse expertise and expanding our service portfolio to include comprehensive corporate advisory solutions.',
      footerIcon: Briefcase,
      footerText: 'Service Portfolio Expanded',
      color: 'from-accent to-orange-600',
      shadow: 'shadow-accent/20',
      tagColor: 'bg-accent/5 text-accent border-accent/10',
      footerColor: 'text-accent'
    },
    {
      year: '2016',
      label: 'RECOGNITION',
      title: 'National Empanelment',
      tag: 'Prestigious',
      description: 'Recognized by the C&AG of India and entrusted with statutory audits for major Public Sector Banks, validating our technical excellence and reliability.',
      footerIcon: Award,
      footerText: 'Industry Recognition Achieved',
      color: 'from-secondary to-slate-800',
      shadow: 'shadow-secondary/20',
      tagColor: 'bg-secondary/5 text-secondary border-secondary/10',
      footerColor: 'text-secondary'
    },
    {
      year: '2019',
      label: 'ALLIANCES',
      title: 'Corporate Partnerships',
      tag: 'Enduring',
      description: 'Forged lasting relationships with leading corporates and institutions, establishing ourselves as a key strategic partner in their financial growth journey.',
      footerIcon: Handshake,
      footerText: 'Long-term Partnerships Formed',
      color: 'from-primary to-blue-500',
      shadow: 'shadow-primary/20',
      tagColor: 'bg-primary/5 text-primary border-primary/10',
      footerColor: 'text-primary'
    },
    {
      year: 'Present',
      label: 'LEADERSHIP',
      title: 'Domain Expertise',
      tag: 'Industry Leader',
      description: 'Established deep specialization in complex audits, appellate representations, and strategic financial consulting across diverse industry sectors.',
      footerIcon: Lightbulb,
      footerText: 'Continuous Innovation & Growth',
      color: 'from-accent to-orange-500',
      shadow: 'shadow-accent/20',
      tagColor: 'bg-accent/5 text-accent border-accent/10',
      footerColor: 'text-accent'
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl text-white mb-6">About Avinash Payal & Associates.</h1>
            <p className="text-xl text-neutral-100 leading-relaxed">
              <span className="block">Avinash Payal & Associates is a chartered accountancy firm dedicated to delivering precise and reliable financial services with a commitment to integrity and excellence.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl text-primary mb-6">Our Story</h2>
              <div className="space-y-4 text-neutral-700 leading-relaxed">
                <p>
                  <b>Avinash Payal & Associates (APA)</b> is a professionally managed Chartered Accountancy firm with over 20 years of experience in delivering reliable and result-driven assurance, taxation, accounting, and regulatory services. Established in <b>July 2005</b> and reconstituted as a partnership firm in <b>2011</b>, APA has built a strong reputation for <b>professional integrity, independence, and technical excellence</b>.
                </p>
                <p>
                  With operational offices in <b>Delhi, Noida, and Assam</b>, Avinash Payal & Associates serves a wide spectrum of clients including corporates, SMEs, startups, professionals, and individuals across multiple industries. The firm is known for offering practical, compliant, and cost-effective solutions aligned with the latest regulatory frameworks and business needs.
                </p>
                <p>
                  APA combines deep domain expertise, up-to-date knowledge of tax laws and regulations, and a client-centric approach to help <b>businesses stay compliant, reduce risk, and achieve sustainable growth</b>. Our team of experienced Chartered Accountants and professionals ensures timely delivery, confidentiality, and the highest standards of ethical practice.
                </p>
              </div>
            </div>
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1748346918817-0b1b6b2f9bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWFtfGVufDF8fHx8MTc2ODc4ODMwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Our Professional Team"
                className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-2xl shadow-lg border border-neutral-200">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl text-primary mb-4">Our Mission</h3>
              <p className="text-neutral-700 leading-relaxed">
                To deliver timely, accurate, and practical professional services with a strong emphasis on quality, confidentiality, independence, and compliance with ICAI standards.
              </p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-lg border border-neutral-200">
              <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl text-primary mb-4">Our Vision</h3>
              <p className="text-neutral-700 leading-relaxed">
                To deliver timely, accurate, and practical professional services with a strong emphasis on <b>quality, confidentiality, independence, and compliance with ICAI standards</b>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl text-primary mb-4">Our Core Values & Professional Philosophy</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              The principles that guide every decision and client interaction
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-neutral-100 text-center group hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent transition-colors">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl text-primary mb-3">{value.title}</h3>
                <p className="text-neutral-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl text-primary mb-4">Our Leadership Team</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Experienced chartered accountants dedicated to your financial success
            </p>
          </div>

          {/* 1. Top Row: 2 Leaders (Managing Partner & Partner) */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto mb-16">
            {team.slice(0, 2).map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all border border-neutral-200 group relative flex flex-col"
              >
                <div className="h-2 bg-gradient-to-r from-primary to-accent" />
                <div className="p-8 flex-1 flex flex-col items-center text-center">
                  <div className="w-40 h-40 aspect-square rounded-full overflow-hidden mb-6 border-4 border-white shadow-lg ring-2 ring-primary/10 group-hover:ring-accent transition-all duration-300 bg-neutral-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top rounded-full transform group-hover:scale-110 transition duration-500"
                    />
                  </div>

                  <h3 className="text-2xl text-primary font-bold mb-2">{member.name}</h3>
                  <div className="text-accent font-semibold tracking-wide uppercase text-sm mb-3">{member.designation}</div>
                  <div className="text-sm font-medium text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full mb-4 inline-block">{member.qualification}</div>

                  <p className="text-neutral-600 italic mb-6 leading-relaxed flex-1">
                    "{member.description}"
                  </p>

                  <div className="w-full border-t border-neutral-100 pt-4 mt-auto">
                    <div className="flex items-center justify-center gap-2 text-sm font-medium text-neutral-700">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>{member.experience}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 2. Bottom Row: 3 Associate Partners */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {team.slice(2, 5).map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-neutral-200 group overflow-hidden"
              >
                <div className="p-6 text-center">
                  <div className="w-24 h-24 aspect-square rounded-full overflow-hidden mx-auto mb-4 border-2 border-neutral-100 shadow-sm group-hover:border-accent/50 transition-colors bg-neutral-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top rounded-full transform group-hover:scale-110 transition duration-500"
                    />
                  </div>

                  <h3 className="text-lg text-primary font-bold mb-1">{member.name}</h3>
                  <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">{member.designation}</div>
                  <div className="text-xs font-semibold text-neutral-600 bg-neutral-50 px-2 py-1 rounded inline-block mb-3 border border-neutral-100">{member.qualification}</div>

                  <div className="text-sm text-neutral-600 mb-4 min-h-[40px] px-2 leading-snug line-clamp-3">
                    {member.description}
                  </div>

                  <div className="border-t border-neutral-50 pt-3">
                    <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-500">
                      <CheckCircle className="w-3.5 h-3.5 text-accent" />
                      <span>{member.experience}</span>
                    </div>
                  </div>
                </div>
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent group-hover:via-accent/50 transition-colors"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connected Journey Timeline */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Our Journey of Excellence</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Connecting our past achievements to our future vision through a legacy of trust and expertise.
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* The Central Spine (Gradient) */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/5 via-primary/30 to-primary/5 transform md:-translate-x-1/2 rounded-full"></div>

            <div className="space-y-12">
              {journeyMilestones.map((item, index) => (
                <div key={index} className="relative group">
                  {/* Layout Container */}
                  <div className={`flex flex-col md:flex-row items-center transition-all duration-300 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>

                    {/* Empty Space for Balance */}
                    <div className="hidden md:block md:w-1/2"></div>

                    {/* Central Connector Node */}
                    <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10 my-auto h-full">
                      {/* The Dot */}
                      <div className={`w-6 h-6 rounded-full border-4 border-slate-50 bg-white ring-2 ring-primary/20 group-hover:ring-accent/50 transition-all duration-500 scale-100 group-hover:scale-125 z-20 relative`}>
                        <div className={`w-full h-full rounded-full bg-gradient-to-br ${item.color} opacity-80 group-hover:opacity-100`}></div>
                      </div>
                    </div>

                    {/* Connector Arm (Desktop Only) - The physical link */}
                    <div className={`hidden md:block absolute left-1/2 top-1/2 w-16 h-[2px] bg-primary/20 -translate-y-1/2 z-0 
                        ${index % 2 === 1 ? '-translate-x-full origin-right' : 'origin-left'} 
                        group-hover:bg-accent/40 group-hover:w-20 transition-all duration-500`}>
                      {/* Little ball at the end of the arm */}
                      <div className={`absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary/40 rounded-full ${index % 2 === 1 ? 'left-0' : 'right-0'}`}></div>
                    </div>

                    {/* Content Card */}
                    <div className={`w-full pl-20 md:pl-0 md:w-1/2 md:py-4 relative z-10 ${index % 2 === 1 ? 'md:pr-20 md:text-right' : 'md:pl-20 md:text-left'}`}>
                      <div className={`relative bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/10`}>

                        <div className={`flex flex-col ${index % 2 === 1 ? 'md:items-end' : 'md:items-start'}`}>
                          {/* Year Label */}
                          <div className="inline-block mb-2">
                            <span className={`text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br ${item.color} leading-none`}>
                              {item.year}
                            </span>
                          </div>

                          {/* Title with Tag */}
                          <div className={`flex flex-wrap items-center gap-3 mb-4 ${index % 2 === 1 ? 'md:justify-end' : 'md:justify-start'}`}>
                            <h3 className="text-xl font-bold text-slate-800">{item.title}</h3>
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${item.tagColor} uppercase tracking-wider`}>
                              {item.label}
                            </span>
                          </div>

                          <p className="text-slate-600 mb-6 text-sm leading-relaxed font-light">
                            {item.description}
                          </p>

                          {/* Footer Meta */}
                          <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide ${item.footerColor || 'text-primary'} ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} bg-slate-50 px-3 py-1.5 rounded-lg`}>
                            <item.footerIcon className="w-4 h-4" />
                            <span>{item.footerText}</span>
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl text-white mb-6">Join Our Growing Family of Satisfied Clients</h2>
          <p className="text-xl text-neutral-100 mb-8">
            Experience the difference of working with dedicated chartered accountants
          </p>
          <button className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1">
            SCHEDULE A MEETING
          </button>
        </div>
      </section>
    </div>
  );
}
