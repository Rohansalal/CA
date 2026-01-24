// import { Award, CheckCircle, TrendingUp, Shield, Users, Target, Zap, Heart } from 'lucide-react';
// import { ImageWithFallback } from './figma/ImageWithFallback';

// export function WhyChooseUs() {
//     const features = [
//         {
//             icon: Award,
//             title: 'ICAI Registered Chartered Accountants',
//             description: 'Certified professionals with proven expertise in taxation and compliance',
//             color: 'from-blue-500 to-blue-600',
//         },
//         {
//             icon: TrendingUp,
//             title: '10+ Years of Industry Experience',
//             description: 'Decade-long track record of delivering exceptional financial services',
//             color: 'from-blue-500 to-blue-600',
//         },
//         {
//             icon: Users,
//             title: '1000+ Satisfied Clients Across Industries',
//             description: 'Trusted by businesses from startups to large enterprises',
//             color: 'from-blue-500 to-blue-600',
//         },
//         {
//             icon: Shield,
//             title: '100% Compliance & Accuracy Guarantee',
//             description: 'Zero-error commitment with comprehensive quality checks',
//             color: 'from-blue-500 to-blue-600',
//         },
//         {
//             icon: Target,
//             title: 'Proactive Tax Planning & Advisory',
//             description: 'Strategic guidance to minimize tax liability and maximize savings',
//             color: 'from-blue-500 to-blue-600',
//         },
//         {
//             icon: Heart,
//             title: 'Dedicated Relationship Manager',
//             description: 'Personalized attention with a single point of contact',
//             color: 'from-blue-500 to-blue-600',
//         },
//     ];

//     return (
//         <section className="py-24 bg-gradient-to-b from-white via-neutral-50 to-white relative overflow-hidden">
//             {/* Background Decorative Elements */}
//             <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
//             <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent/5 to-transparent rounded-full blur-3xl" />

//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//                 {/* Section Header */}
//                 <div className="text-center mb-16 mt-12">
//                     <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-8">
//                         <Award className="w-4 h-4 text-primary" />
//                         <span className="text-sm font-semibold text-primary uppercase tracking-wide">Why Choose Us</span>
//                     </div>
//                     <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
//                         Why Choose Avinash Payal & Co.?
//                     </h2>
//                     <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
//                         We combine deep financial expertise with a commitment to excellence, ensuring your business stays compliant while maximizing growth opportunities. Here's what sets us apart.
//                     </p>
//                 </div>

//                 {/* Main Content Grid */}
//                 <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
//                     {/* Image Side */}
//                     <div className="order-2 lg:order-1">
//                         <div className="relative">
//                             {/* Glow Effect */}
//                             <div className="absolute -inset-6 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-3xl opacity-50" />

//                             {/* Main Image */}
//                             <div className="relative">
//                                 <ImageWithFallback
//                                     src="https://images.unsplash.com/photo-1759310610325-2c7cb621e5e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzaGFrZSUyMHRydXN0fGVufDF8fHx8MTc2ODgwOTM2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
//                                     alt="Trusted Business Partnership"
//                                     className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover"
//                                 />

//                                 {/* Floating Stats Card */}
//                                 <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-2xl p-6 border border-neutral-100">
//                                     <div className="flex items-center gap-4">
//                                         <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center">
//                                             <Award className="w-8 h-8 text-white" />
//                                         </div>
//                                         <div>
//                                             <div className="text-3xl font-bold text-primary">4.9/5</div>
//                                             <div className="text-sm text-neutral-600">Client Rating</div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Features Grid */}
//                     <div className="order-1 lg:order-2">
//                         <div className="grid gap-4">
//                             {features.map((feature, index) => (
//                                 <div
//                                     key={index}
//                                     className="group relative bg-white p-6 rounded-2xl border border-neutral-200 hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
//                                 >
//                                     {/* Background Gradient */}
//                                     <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-bl-full transition-opacity duration-300`} />

//                                     <div className="flex items-start gap-4 relative z-10">
//                                         {/* Icon */}
//                                         <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}>
//                                             <feature.icon className="w-6 h-6 text-white" />
//                                         </div>

//                                         {/* Content */}
//                                         <div className="flex-1">
//                                             <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors">
//                                                 {feature.title}
//                                             </h3>
//                                             <p className="text-sm text-neutral-600 leading-relaxed">
//                                                 {feature.description}
//                                             </p>
//                                         </div>

//                                         {/* Check Icon */}
//                                         <div className="flex-shrink-0">
//                                             <CheckCircle className="w-5 h-5 text-green-500" />
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

import { Award, CheckCircle, TrendingUp, Shield, Users, Target, Heart } from 'lucide-react';

export function WhyChooseUs() {
    const features = [
        {
            icon: Award,
            title: 'ICAI Registered Professionals',
            description: 'Certified experts in taxation & compliance.',
        },
        {
            icon: TrendingUp,
            title: '10+ Years Experience',
            description: 'Proven track record in financial growth.',
        },
        {
            icon: Users,
            title: '1000+ Satisfied Clients',
            description: 'Trusted by startups to large enterprises.',
        },
        {
            icon: Shield,
            title: '100% Compliance Guarantee',
            description: 'Zero-error commitment & quality checks.',
        },
        {
            icon: Target,
            title: 'Proactive Tax Planning',
            description: 'Strategic guidance to maximize savings.',
        },
        {
            icon: Heart,
            title: 'Dedicated Support',
            description: 'Personalized single point of contact.',
        },
    ];

    return (
        <section className="py-20 bg-slate-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 border border-[#136da1]/20" style={{ backgroundColor: 'rgba(19, 109, 161, 0.05)' }}>
                        <Award className="w-4 h-4" style={{ color: '#136da1' }} />
                        <span className="text-xs font-bold uppercase tracking-wide" style={{ color: '#136da1' }}>Why Choose Us</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                        Why Choose Avinash Payal & Co.?
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Deep financial expertise combined with a commitment to excellence.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-12 items-start">

                    {/* Left Column: Image */}
                    <div className="order-2 lg:order-1">
                        <div className="sticky top-8">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
                                <img
                                    src="https://images.unsplash.com/photo-1759310610325-2c7cb621e5e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzaGFrZSUyMHRydXN0fGVufDF8fHx8MTc2ODgwOTM2Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                                    alt="Professional CA Partnership"
                                    className="w-full h-[600px] object-cover"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent" />

                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="flex items-center gap-2 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                            <span className="text-xs font-bold text-slate-900 uppercase">ICAI Registered</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                                            <span className="text-xs font-bold text-slate-900 uppercase">ISO 9001</span>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white leading-tight">Trusted Financial Partner</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Feature Boxes - Vertical Stack */}
                    <div className="order-1 lg:order-2">
                        <div className="space-y-4">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="group flex items-start gap-6 p-6 bg-white rounded-xl border-2 border-slate-200 hover:border-[#136da1] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    {/* Icon Box */}
                                    <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300" style={{ backgroundColor: '#136da1' }}>
                                        <feature.icon className="w-7 h-7 text-white" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#136da1] transition-colors mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>

                                    {/* Check Icon */}
                                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom CTA Badge */}
                        {/* <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-blue-900 mb-1">Secure & Confidential</p>
                                    <p className="text-xs text-blue-700">Your data is protected with enterprise-grade security</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <Shield className="w-8 h-8 text-blue-600" />
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
}