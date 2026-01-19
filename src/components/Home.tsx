import { ArrowRight, TrendingUp, Shield, Users, Award, CheckCircle, Star, FileText, Calculator, Building, BarChart3, Globe } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Home() {
  const services = [
    {
      icon: FileText,
      title: 'Taxation Services',
      description: 'Expert tax planning, ITR filing, and compliance for individuals and businesses.',
    },
    {
      icon: Calculator,
      title: 'GST Services',
      description: 'Complete GST registration, filing, compliance, and advisory solutions.',
    },
    {
      icon: Shield,
      title: 'Audit & Assurance',
      description: 'Statutory, internal, and tax audits with comprehensive assurance services.',
    },
    {
      icon: Building,
      title: 'Company Registration',
      description: 'Seamless incorporation, registration, and statutory compliance services.',
    },
    {
      icon: BarChart3,
      title: 'Virtual CFO',
      description: 'Strategic financial planning and CFO services for growing businesses.',
    },
    {
      icon: Globe,
      title: 'NRI Taxation',
      description: 'Specialized tax services for Non-Resident Indians and global taxation.',
    },
  ];

  const stats = [
    { number: '1000+', label: 'Clients Served', icon: Users },
    { number: '10+', label: 'Years Experience', icon: Award },
    { number: '100%', label: 'Compliance Focus', icon: Shield },
    { number: '₹500Cr+', label: 'Assets Managed', icon: TrendingUp },
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      company: 'Tech Innovations Pvt Ltd',
      role: 'CEO',
      content: 'Precision Associates has been instrumental in managing our complex tax structure. Their proactive approach saved us significant costs.',
      rating: 5,
    },
    {
      name: 'Priya Sharma',
      company: 'Fashion Retail Chain',
      role: 'CFO',
      content: 'Outstanding service quality and deep expertise in GST compliance. They are true partners in our business growth.',
      rating: 5,
    },
    {
      name: 'Amit Patel',
      company: 'Manufacturing Group',
      role: 'Managing Director',
      content: 'Their audit services are thorough and professional. We trust them completely with our financial compliance.',
      rating: 5,
    },
  ];

  const certifications = [
    'ICAI Registered',
    'ISO 9001:2015',
    'Data Security Certified',
    'Professional Indemnity Insured',
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-secondary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h6V4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-semibold border border-accent/30">
                  Trusted Financial Partners Since 2014
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white">
                Trusted Chartered Accountants for Tax, Audit & Business Growth
              </h1>
              <p className="text-xl text-neutral-100 leading-relaxed">
                Precision. Compliance. Growth. We provide comprehensive financial solutions that empower your business with expert tax planning, audit, and strategic advisory services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 group">
                  BOOK CONSULTATION
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-neutral-50 transition-all hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2">
                  GET EXPERT ADVICE
                </button>
              </div>
              <div className="flex flex-wrap gap-6 pt-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <span className="text-sm font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/20 rounded-2xl blur-2xl" />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1692133226337-55e513450a32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhY2NvdW50YW50JTIwb2ZmaWNlfGVufDF8fHx8MTc2ODc0NzA0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Professional Accounting Services"
                  className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 -mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl border border-neutral-100 p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                      <stat.icon className="w-8 h-8 text-accent" />
                    </div>
                  </div>
                  <div className="text-3xl lg:text-4xl text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-neutral-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl text-primary mb-4">Our Core Services</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Comprehensive financial solutions tailored to your business needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 border border-neutral-100"
              >
                <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent transition-colors">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl text-primary mb-3">{service.title}</h3>
                <p className="text-neutral-600 mb-4">{service.description}</p>
                <button className="text-accent font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all hover:shadow-lg">
              VIEW ALL SERVICES
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1759310610325-2c7cb621e5e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzaGFrZSUyMHRydXN0fGVufDF8fHx8MTc2ODgwOTM2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Trusted Business Partnership"
                className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl text-primary">Why Choose Precision Associates?</h2>
              <p className="text-lg text-neutral-600">
                We combine deep financial expertise with a commitment to excellence, ensuring your business stays compliant while maximizing growth opportunities.
              </p>
              <div className="space-y-4">
                {[
                  'ICAI Registered Chartered Accountants',
                  '10+ Years of Industry Experience',
                  '1000+ Satisfied Clients Across Industries',
                  '100% Compliance & Accuracy Guarantee',
                  'Proactive Tax Planning & Advisory',
                  'Dedicated Relationship Manager',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <button className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-lg mt-6">
                LEARN MORE ABOUT US
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl text-primary mb-4">What Our Clients Say</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Trusted by businesses across industries for excellence and reliability
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-neutral-100"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-neutral-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="border-t border-neutral-200 pt-4">
                  <div className="text-primary font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-neutral-600">{testimonial.role}</div>
                  <div className="text-sm text-neutral-500">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl text-white mb-6">Ready to Transform Your Financial Management?</h2>
          <p className="text-xl text-neutral-100 mb-8">
            Schedule a free consultation with our expert chartered accountants today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1">
              BOOK FREE CONSULTATION
            </button>
            <button className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-neutral-50 transition-all hover:shadow-xl transform hover:-translate-y-1">
              CALL US NOW
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
