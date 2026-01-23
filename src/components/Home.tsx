// import { ArrowRight, TrendingUp, Shield, Users, Award, CheckCircle, Star, FileText, Calculator, Building, BarChart3, Globe } from 'lucide-react';
// import { ImageWithFallback } from './figma/ImageWithFallback';
// import { FAQ } from './FAQ';
// import { ConsultingFormNew } from './ConsultingFormNew';
// import { TrustAndSocialProof } from './TrustAndSocialProof';

// export function Home() {
//   const services = [
//     {
//       icon: FileText,
//       title: 'Taxation Services',
//       description: 'Expert tax planning, ITR filing, and compliance for individuals and businesses.',
//     },
//     {
//       icon: Calculator,
//       title: 'GST Services',
//       description: 'Complete GST registration, filing, compliance, and advisory solutions.',
//     },
//     {
//       icon: Shield,
//       title: 'Audit & Assurance',
//       description: 'Statutory, internal, and tax audits with comprehensive assurance services.',
//     },
//     {
//       icon: Building,
//       title: 'Company Registration',
//       description: 'Seamless incorporation, registration, and statutory compliance services.',
//     },
//     {
//       icon: BarChart3,
//       title: 'Virtual CFO',
//       description: 'Strategic financial planning and CFO services for growing businesses.',
//     },
//     {
//       icon: Globe,
//       title: 'NRI Taxation',
//       description: 'Specialized tax services for Non-Resident Indians and global taxation.',
//     },
//   ];

//   const stats = [
//     { number: '1000+', label: 'Clients Served', icon: Users },
//     { number: '10+', label: 'Years Experience', icon: Award },
//     { number: '100%', label: 'Compliance Focus', icon: Shield },
//     { number: '₹500Cr+', label: 'Assets Managed', icon: TrendingUp },
//   ];

//   const testimonials = [
//     {
//       name: 'Rajesh Kumar',
//       company: 'Tech Innovations Pvt Ltd',
//       role: 'CEO',
//       content: 'Avinash Payal & Co. has been instrumental in managing our complex tax structure. Their proactive approach saved us significant costs.',
//       rating: 5,
//     },
//     {
//       name: 'Priya Sharma',
//       company: 'Fashion Retail Chain',
//       role: 'CFO',
//       content: 'Outstanding service quality and deep expertise in GST compliance. They are true partners in our business growth.',
//       rating: 5,
//     },
//     {
//       name: 'Amit Patel',
//       company: 'Manufacturing Group',
//       role: 'Managing Director',
//       content: 'Their audit services are thorough and professional. We trust them completely with our financial compliance.',
//       rating: 5,
//     },
//   ];

//   const certifications = [
//     'ICAI Registered',
//     'ISO 9001:2015',
//     'Data Security Certified',
//     'Professional Indemnity Insured',
//   ];

//   return (
//     <div className="bg-white">
//       {/* Hero Section */}
//       <section className="relative bg-gradient-to-br from-primary via-primary to-secondary text-white overflow-hidden">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute inset-0" style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h6V4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//           }} />
//         </div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div className="space-y-8">
//               <div className="inline-block">
//                 <span className="px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-semibold border border-accent/30">
//                   Trusted Financial Partners Since 2014
//                 </span>
//               </div>
//               <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white">
//                 Trusted Chartered Accountants for Tax, Audit & Business Growth
//               </h1>
//               <p className="text-xl text-neutral-100 leading-relaxed">
//                 Precision. Compliance. Growth. We provide comprehensive financial solutions that empower your business with expert tax planning, audit, and strategic advisory services.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <button className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 group">
//                   BOOK CONSULTATION
//                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </button>
//                 <button className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-neutral-50 transition-all hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2">
//                   GET EXPERT ADVICE
//                 </button>
//               </div>
//               <div className="flex flex-wrap gap-6 pt-4">
//                 {certifications.map((cert, index) => (
//                   <div key={index} className="flex items-center gap-2">
//                     <CheckCircle className="w-5 h-5 text-accent" />
//                     <span className="text-sm font-medium">{cert}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="hidden lg:block">
//               <div className="relative">
//                 <div className="absolute -inset-4 bg-accent/20 rounded-2xl blur-2xl" />
//                 <ImageWithFallback
//                   src="https://images.unsplash.com/photo-1692133226337-55e513450a32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhY2NvdW50YW50JTIwb2ZmaWNlfGVufDF8fHx8MTc2ODc0NzA0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
//                   alt="Professional Accounting Services"
//                   className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="bg-white py-16 -mt-12 relative z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-white rounded-2xl shadow-2xl border border-neutral-100 p-8">
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
//               {stats.map((stat, index) => (
//                 <div key={index} className="text-center">
//                   <div className="flex justify-center mb-4">
//                     <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
//                       <stat.icon className="w-8 h-8 text-accent" />
//                     </div>
//                   </div>
//                   <div className="text-3xl lg:text-4xl text-primary mb-2">{stat.number}</div>
//                   <div className="text-sm text-neutral-600 font-medium">{stat.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Trust & Social Proof Section */}
//       <TrustAndSocialProof />

//       {/* Services Section */}
//       <section className="py-20 bg-neutral-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl lg:text-4xl text-primary mb-4">Our Core Services</h2>
//             <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
//               Comprehensive financial solutions tailored to your business needs
//             </p>
//           </div>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {services.map((service, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 border border-neutral-100"
//               >
//                 <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent transition-colors">
//                   <service.icon className="w-7 h-7 text-white" />
//                 </div>
//                 <h3 className="text-xl text-primary mb-3">{service.title}</h3>
//                 <p className="text-neutral-600 mb-4">{service.description}</p>
//                 <button className="text-accent font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
//                   Learn More
//                   <ArrowRight className="w-4 h-4" />
//                 </button>
//               </div>
//             ))}
//           </div>
//           <div className="text-center mt-12">
//             <button className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all hover:shadow-lg">
//               VIEW ALL SERVICES
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Premium Consulting Form Section */}
//       <ConsultingFormNew />

//       {/* Why Choose Us Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <ImageWithFallback
//                 src="https://images.unsplash.com/photo-1759310610325-2c7cb621e5e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzaGFrZSUyMHRydXN0fGVufDF8fHx8MTc2ODgwOTM2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
//                 alt="Trusted Business Partnership"
//                 className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
//               />
//             </div>
//             <div className="space-y-6">
//               <h2 className="text-3xl lg:text-4xl text-primary">Why Choose Avinash Payal & Co.?</h2>
//               <p className="text-lg text-neutral-600">
//                 We combine deep financial expertise with a commitment to excellence, ensuring your business stays compliant while maximizing growth opportunities.
//               </p>
//               <div className="space-y-4">
//                 {[
//                   'ICAI Registered Chartered Accountants',
//                   '10+ Years of Industry Experience',
//                   '1000+ Satisfied Clients Across Industries',
//                   '100% Compliance & Accuracy Guarantee',
//                   'Proactive Tax Planning & Advisory',
//                   'Dedicated Relationship Manager',
//                 ].map((item, index) => (
//                   <div key={index} className="flex items-start gap-3">
//                     <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
//                     <span className="text-neutral-700 font-medium">{item}</span>
//                   </div>
//                 ))}
//               </div>
//               <button className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-lg mt-6">
//                 LEARN MORE ABOUT US
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-20 bg-neutral-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl lg:text-4xl text-primary mb-4">What Our Clients Say</h2>
//             <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
//               Trusted by businesses across industries for excellence and reliability
//             </p>
//           </div>
//           <div className="grid md:grid-cols-3 gap-8">
//             {testimonials.map((testimonial, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-neutral-100"
//               >
//                 <div className="flex gap-1 mb-4">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <Star key={i} className="w-5 h-5 fill-accent text-accent" />
//                   ))}
//                 </div>
//                 <p className="text-neutral-700 mb-6 italic">"{testimonial.content}"</p>
//                 <div className="border-t border-neutral-200 pt-4">
//                   <div className="text-primary font-semibold">{testimonial.name}</div>
//                   <div className="text-sm text-neutral-600">{testimonial.role}</div>
//                   <div className="text-sm text-neutral-500">{testimonial.company}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <FAQ />

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl lg:text-4xl text-white mb-6">Ready to Transform Your Financial Management?</h2>
//           <p className="text-xl text-neutral-100 mb-8">
//             Schedule a free consultation with our expert chartered accountants today
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-xl transform hover:-translate-y-1">
//               BOOK FREE CONSULTATION
//             </button>
//             <button className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-neutral-50 transition-all hover:shadow-xl transform hover:-translate-y-1">
//               CALL US NOW
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

import { ArrowRight, TrendingUp, Shield, Users, Award, CheckCircle, Star, FileText, Calculator, Building, BarChart3, Globe, Calendar, BookOpen, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { FAQ } from './FAQ';
import { ConsultingFormNew } from './ConsultingFormNew';
import { TrustAndSocialProof } from './TrustAndSocialProof';
// import { WhyChooseUs } from './WhyChooseUs';
import { WhyChooseUs } from './WhyChooseUs';
import { FeaturedInsights } from './FeaturedInsights';

export function Home() {
  const services = [
    {
      icon: FileText,
      title: 'Taxation Services',
      description: 'Expert tax planning, ITR filing, and compliance for individuals and businesses.',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: Calculator,
      title: 'GST Services',
      description: 'Complete GST registration, filing, compliance, and advisory solutions.',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: Shield,
      title: 'Audit & Assurance',
      description: 'Statutory, internal, and tax audits with comprehensive assurance services.',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: Building,
      title: 'Company Registration',
      description: 'Seamless incorporation, registration, and statutory compliance services.',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: BarChart3,
      title: 'Virtual CFO',
      description: 'Strategic financial planning and CFO services for growing businesses.',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: Globe,
      title: 'NRI Taxation',
      description: 'Specialized tax services for Non-Resident Indians and global taxation.',
      gradient: 'from-blue-500 to-blue-600',
    },
  ];

  const stats = [
    { number: '1000+', label: 'Clients Served', icon: Users, color: 'from-blue-500 to-blue-600' },
    { number: '10+', label: 'Years Experience', icon: Award, color: 'from-blue-500 to-blue-600' },
    { number: '100%', label: 'Compliance Focus', icon: Shield, color: 'from-blue-500 to-blue-600' },
    { number: '₹500Cr+', label: 'Assets Managed', icon: TrendingUp, color: 'from-blue-500 to-blue-600' },
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      company: 'Tech Innovations Pvt Ltd',
      role: 'CEO',
      content: 'Avinash Payal & Co. has been instrumental in managing our complex tax structure. Their proactive approach saved us significant costs.',
      rating: 5,
      avatar: 'RK',
    },
    {
      name: 'Priya Sharma',
      company: 'Fashion Retail Chain',
      role: 'CFO',
      content: 'Outstanding service quality and deep expertise in GST compliance. They are true partners in our business growth.',
      rating: 5,
      avatar: 'PS',
    },
    {
      name: 'Amit Patel',
      company: 'Manufacturing Group',
      role: 'Managing Director',
      content: 'Their audit services are thorough and professional. We trust them completely with our financial compliance.',
      rating: 5,
      avatar: 'AP',
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
      <section className="bg-white py-16 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl border border-neutral-100 p-8 md:p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="flex justify-center mb-4">
                    <div className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
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
      </section>

      {/* Trust & Social Proof Section */}
      {/* <TrustAndSocialProof /> */}

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
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
                className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 border border-neutral-100 overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.gradient} opacity-5 rounded-bl-full`} />
                <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                <p className="text-neutral-600 mb-6 leading-relaxed">{service.description}</p>
                <button className="text-accent font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 mb-16">
            <button className="px-26 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/80 transition-all hover:shadow-xl transform hover:-translate-y-1">
              VIEW ALL SERVICES
            </button>
          </div>
        </div>
      </section>

      {/* Premium Consulting Form Section */}
      <ConsultingFormNew />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* FAQ Section */}
      <FAQ />

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

      <section className="pt-24 pb-80 mb-13 bg-gradient-to-br from-primary via-primary to-secondary relative overflow-hidden">
        {/* Professional Visible Texture */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h6V4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 mt-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4">
              <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
              <span className="text-sm font-semibold text-white uppercase tracking-wide">Client Success Stories</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">What Our Clients Say</h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Trusted by businesses across industries for excellence and reliability
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 group hover:-translate-y-2"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent/10 to-primary/10 rounded-bl-full" />
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-neutral-700 mb-6 italic leading-relaxed text-lg">"{testimonial.content}"</p>
                <div className="flex items-center gap-4 pt-6 border-t border-neutral-200">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-primary font-bold text-lg">{testimonial.name}</div>
                    <div className="text-sm text-neutral-600">{testimonial.role}</div>
                    <div className="text-sm text-neutral-500">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Featured Blog/Insights Section */}
      < FeaturedInsights />
    </div >
  );
}