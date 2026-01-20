import { Users, Award, Target, Heart, TrendingUp, Shield, CheckCircle } from 'lucide-react';
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
      name: 'DUMMY CONTENT',
      designation: 'Managing Partner',
      qualification: 'FCA, DISA (ICAI)',
      experience: '15+ Years',
      specialization: 'Taxation & Audit',
    },
    {
      name: 'DUMMY CONTENT',
      designation: 'Senior Partner',
      qualification: 'ACA, CFA',
      experience: '12+ Years',
      specialization: 'Corporate Finance & Advisory',
    },
    {
      name: 'DUMMY CONTENT',
      designation: 'Partner',
      qualification: 'FCA, DISA',
      experience: '10+ Years',
      specialization: 'GST & Compliance',
    },
  ];

  const milestones = [
    { year: '2014', event: 'Firm Established' },
    { year: '2016', event: '100+ Clients Milestone' },
    { year: '2018', event: 'Expanded to Corporate Advisory' },
    { year: '2020', event: '500+ Clients Across India' },
    { year: '2022', event: 'ISO 9001:2015 Certified' },
    { year: '2024', event: '1000+ Satisfied Clients' },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl text-white mb-6">About Avinash Payal & Co.</h1>
            <p className="text-xl text-neutral-100 leading-relaxed">
              DUMMY CONTENT DUMMY CONTENT
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
                {/* <p>
                  Founded in 2014, Avinash Payal & Co. began with a vision to provide reliable, ethical, and innovative chartered accountancy services to businesses of all sizes. What started as a small practice has grown into a trusted firm serving over 1000 clients across diverse industries.
                </p>
                <p>
                  Our journey has been marked by continuous learning, adaptation to regulatory changes, and an unwavering focus on client satisfaction. We've expanded our service offerings from traditional compliance to comprehensive business advisory, helping our clients navigate complex financial landscapes.
                </p>
                <p>
                  Today, we stand as a team of qualified chartered accountants, tax consultants, and financial advisors committed to delivering precision in every engagement. Our success is measured by the growth and compliance excellence of our clients.
                </p> */}
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim quibusdam, molestiae veniam nostrum, maiores obcaecati atque cum, tempora eum dicta temporibus odio sed exercitationem iusto quidem officiis laborum eligendi ut.
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
                To empower businesses with expert financial guidance, ensuring compliance excellence while enabling sustainable growth through innovative solutions and personalized service.
              </p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-lg border border-neutral-200">
              <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl text-primary mb-4">Our Vision</h3>
              <p className="text-neutral-700 leading-relaxed">
                To be the most trusted chartered accountancy firm in India, recognized for our integrity, expertise, and commitment to client success across all sectors of the economy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl text-primary mb-4">Our Core Values</h2>
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
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all border border-neutral-200"
              >
                <div className="h-4 bg-gradient-to-r from-primary to-accent" />
                <div className="p-8">
                  <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl text-primary mb-2">{member.name}</h3>
                    <div className="text-accent font-semibold mb-1">{member.designation}</div>
                    <div className="text-sm text-neutral-600 mb-4">{member.qualification}</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-accent" />
                        <span className="text-neutral-700">{member.experience} Experience</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-accent" />
                        <span className="text-neutral-700">{member.specialization}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl text-primary mb-4">Our Journey</h2>
            <p className="text-lg text-neutral-600">
              Key milestones that shaped Avinash Payal & Co.
            </p>
          </div>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6 items-start group">
                <div className="flex-shrink-0 w-24 text-right">
                  <div className="text-2xl text-accent font-bold">{milestone.year}</div>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-accent rounded-full mt-2 group-hover:scale-150 transition-transform" />
                <div className="flex-1">
                  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-neutral-200 group-hover:-translate-y-1">
                    <p className="text-neutral-800 font-medium">{milestone.event}</p>
                  </div>
                </div>
              </div>
            ))}
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
