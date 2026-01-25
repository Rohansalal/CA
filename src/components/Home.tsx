import { ArrowRight, TrendingUp, Shield, Users, Award, CheckCircle, Star, FileText, Calculator, Building, BarChart3, Globe, Calendar, BookOpen, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { FAQ } from './FAQ';
import { ConsultingFormNew } from './ConsultingFormNew';
import { TrustAndSocialProof } from './TrustAndSocialProof';
import { WhyChooseUs } from "./WhyChooseUs";
import { FeaturedInsights } from './FeaturedInsights';
import { Testimonials } from './Testimonials';

export function Home() {
  const services = [
    {
      icon: FileText,
      title: 'Taxation Services',
      description: 'Expert tax planning, ITR filing, and compliance for individuals and businesses.',
      gradient: 'from-[#136da1] to-[#136da1]',
    },
    {
      icon: Calculator,
      title: 'GST Services',
      description: 'Complete GST registration, filing, compliance, and advisory solutions.',
      gradient: 'from-[#136da1] to-[#136da1]',
    },
    {
      icon: Shield,
      title: 'Audit & Assurance',
      description: 'Statutory, internal, and tax audits with comprehensive assurance services.',
      gradient: 'from-[#136da1] to-[#136da1]',
    },
    {
      icon: Building,
      title: 'Company Registration',
      description: 'Seamless incorporation, registration, and statutory compliance services.',
      gradient: 'from-[#136da1] to-[#136da1]',
    },
    {
      icon: BarChart3,
      title: 'Virtual CFO',
      description: 'Strategic financial planning and CFO services for growing businesses.',
      gradient: 'from-[#136da1] to-[#136da1]',
    },
    {
      icon: Globe,
      title: 'NRI Taxation',
      description: 'Specialized tax services for Non-Resident Indians and global taxation.',
      gradient: 'from-[#136da1] to-[#136da1]',
    },
  ];

  const stats = [
    { number: '1000+', label: 'Clients Served', icon: Users, color: 'from-[#136da1] to-[#136da1]' },
    { number: '10+', label: 'Years Experience', icon: Award, color: 'from-[#136da1] to-[#136da1]' },
    { number: '100%', label: 'Compliance Focus', icon: Shield, color: 'from-[#136da1] to-[#136da1]' },
    { number: '₹500Cr+', label: 'Assets Managed', icon: TrendingUp, color: 'from-[#136da1] to-[#136da1]' },
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
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-12 lg:py-13 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="px-4 py-2 bg-accent text-white rounded-full text-sm font-semibold border border-accent/30 shadow-lg">
                  Trusted Financial Partners Since 2014
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-bold leading-tight">
                Trusted Chartered Accountants for Tax, Audit & Business Growth
              </h1>
              <p className="text-xl text-neutral-100 leading-relaxed">
                Precision. Compliance. Growth. We provide comprehensive financial solutions that empower your business with expert tax planning, audit, and strategic advisory services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 group">
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
            <div className="mt-x8 lg:mt-0">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/20 rounded-2xl blur-2xl" />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1692133226337-55e513450a32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhY2NvdW50YW50JTIwb2ZmaWNlfGVufDF8fHx8MTc2ODc0NzA0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Professional Accounting Services"
                  className="relative rounded-2xl shadow-2xl w-full h-[600px] sm:h-[600px] lg:h-[600px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="bg-white py-16 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl border border-neutral-100 p-8 md:p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300" style={{ backgroundColor: '#136da1' }}>
                      <stat.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-neutral-600 font-medium uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Trust & Social Proof Section */}
      {/* <TrustAndSocialProof /> */}

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <br />
            <br />
            <br />
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">Our Expertise</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">Our Core Services</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Comprehensive financial solutions tailored to your business needs with expert guidance every step of the way
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 border border-neutral-100 overflow-hidden text-center"
              >
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5 rounded-bl-full" style={{ backgroundColor: '#136da1' }} />

                {/* Centered Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300" style={{ backgroundColor: '#136da1' }}>
                    <service.icon className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Centered Text Content */}
                <h3 className="text-2xl font-bold text-primary mb-4">{service.title}</h3>
                <p className="text-base text-neutral-600 mb-6 leading-relaxed">{service.description}</p>
                <button className="text-accent font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 mb-16">
            <button className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center gap-2 group">
              VIEW ALL SERVICES
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Premium Consulting Form Section */}
      <ConsultingFormNew />




      {/* CTA Section */}
      {/* <section className="py-24 bg-gradient-to-r from-primary via-secondary to-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h6V4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Ready to Transform Your Financial Management?</h2>
          <p className="text-xl text-neutral-100 mb-10 leading-relaxed">
            Schedule a free consultation with our expert chartered accountants today and discover how we can help your business thrive
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-2 group">
              BOOK FREE CONSULTATION
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-neutral-50 transition-all hover:shadow-2xl transform hover:-translate-y-1">
              CALL US NOW
            </button>
          </div>
        </div>
      </section> */}
      {/* 
      <section className="py-32 bg-white text-neutral-800 relative overflow-hidden">

        <div className="absolute inset-0">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
            Ready to Transform Your Financial Management?
          </h2>

          <p className="text-xl text-neutral-600 mb-12 leading-relaxed">
            Schedule a free consultation with our expert Chartered Accountants and
            discover smarter, compliant, and growth-driven financial solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">

            <button className="px-12 py-4 bg-primary text-white font-semibold rounded-xl 
        hover:bg-primary/90 transition-all duration-300 
        hover:shadow-xl transform hover:-translate-y-1 
        flex items-center justify-center gap-2 group">
              BOOK FREE CONSULTATION
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="px-12 py-4 border-2 border-primary text-primary 
        font-semibold rounded-xl hover:bg-primary hover:text-white 
        transition-all duration-300 hover:shadow-xl 
        transform hover:-translate-y-1">
              CALL US NOW
            </button> 

          </div>
        </div >
      </section > */}

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* Featured Blog/Insights Section */}
      < FeaturedInsights />
    </div >
  );
}