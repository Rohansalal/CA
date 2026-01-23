// import React, { useState, useEffect } from 'react';
// import { ChevronRight, ChevronLeft, Check, Phone, Mail, MapPin, Building2, Briefcase, FileText, Shield, Lock, CheckCircle2, ArrowRight, Lock as LockIcon, Eye, EyeOff, Zap, Clock, User, TrendingUp, MessageCircle, BarChart3 } from 'lucide-react';

// interface FormData {
//   // Step 1
//   fullName: string;
//   email: string;
//   mobile: string;
//   city: string;
//   preferredContact: 'phone' | 'email' | 'whatsapp';
  
//   // Step 2
//   clientType: string;
//   businessName: string;
//   industry: string;
//   annualTurnover: string;
  
//   // Step 3
//   services: string[];
//   description: string;
  
//   // Step 4 (implicit review)
// }

// export function ConsultingForm() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [submitted, setSubmitted] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [formData, setFormData] = useState<FormData>({
//     fullName: '',
//     email: '',
//     mobile: '',
//     city: '',
//     preferredContact: 'phone',
//     clientType: '',
//     businessName: '',
//     industry: '',
//     annualTurnover: '',
//     services: [],
//     description: '',
//   });

//   const caServices = [
//     { id: 'income-tax', label: 'Income Tax Filing & Planning' },
//     { id: 'gst', label: 'GST Registration & Compliance' },
//     { id: 'company-registration', label: 'Company Registration & Incorporation' },
//     { id: 'audit', label: 'Statutory Audit & Assurance' },
//     { id: 'accounting', label: 'Accounting & Bookkeeping' },
//     { id: 'payroll', label: 'Payroll & HR Compliance' },
//     { id: 'startup', label: 'Startup Advisory & Registration' },
//     { id: 'virtual-cfo', label: 'Virtual CFO Services' },
//     { id: 'nri', label: 'NRI Taxation Services' },
//     { id: 'business-advisory', label: 'Business Advisory & Planning' },
//   ];

//   const validateStep = (step: number): boolean => {
//     const newErrors: Record<string, string> = {};

//     if (step === 1) {
//       if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
//       if (!formData.email.trim()) newErrors.email = 'Email is required';
//       if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
//       if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
//       if (!/^[0-9]{10}$/.test(formData.mobile.replace(/[^\d]/g, ''))) newErrors.mobile = 'Please enter a valid 10-digit number';
//       if (!formData.city.trim()) newErrors.city = 'City/Location is required';
//     }

//     if (step === 2) {
//       if (!formData.clientType) newErrors.clientType = 'Please select client type';
//       if (formData.clientType !== 'individual' && !formData.businessName.trim()) {
//         newErrors.businessName = 'Business name is required';
//       }
//       if (!formData.industry) newErrors.industry = 'Please select industry type';
//       if (!formData.annualTurnover) newErrors.annualTurnover = 'Please select annual turnover range';
//     }

//     if (step === 3) {
//       if (formData.services.length === 0) newErrors.services = 'Please select at least one service';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleNext = () => {
//     const newErrors: Record<string, string> = {};

//     // Validate current step
//     if (currentStep === 1) {
//       if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
//       if (!formData.email.trim()) newErrors.email = 'Email is required';
//       if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
//       if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
//       if (formData.mobile && !/^[0-9]{10}$/.test(formData.mobile.replace(/[^\d]/g, ''))) newErrors.mobile = 'Please enter a valid 10-digit number';
//       if (!formData.city.trim()) newErrors.city = 'City/Location is required';
//     } else if (currentStep === 2) {
//       if (!formData.clientType) newErrors.clientType = 'Please select client type';
//       if (formData.clientType !== 'individual' && formData.clientType && !formData.businessName.trim()) {
//         newErrors.businessName = 'Business name is required';
//       }
//       if (!formData.industry) newErrors.industry = 'Please select industry type';
//       if (!formData.annualTurnover) newErrors.annualTurnover = 'Please select annual turnover range';
//     } else if (currentStep === 3) {
//       if (formData.services.length === 0) newErrors.services = 'Please select at least one service';
//     }

//     setErrors(newErrors);
//     if (Object.keys(newErrors).length === 0) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const handlePrevious = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleServiceToggle = (serviceId: string) => {
//     setFormData(prev => ({
//       ...prev,
//       services: prev.services.includes(serviceId)
//         ? prev.services.filter(s => s !== serviceId)
//         : [...prev.services, serviceId],
//     }));
//     if (errors.services) {
//       setErrors(prev => ({ ...prev, services: '' }));
//     }
//   };

//   const handleSubmit = async () => {
//     if (validateStep(3)) {
//       try {
//         // Backend API call
//         const response = await fetch('/api/consulting-form', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(formData),
//         });

//         if (response.ok) {
//           setSubmitted(true);
//           // Reset form after 3 seconds
//           setTimeout(() => {
//             setCurrentStep(1);
//             setSubmitted(false);
//             setFormData({
//               fullName: '',
//               email: '',
//               mobile: '',
//               city: '',
//               preferredContact: 'phone',
//               clientType: '',
//               businessName: '',
//               industry: '',
//               annualTurnover: '',
//               services: [],
//               description: '',
//             });
//           }, 3000);
//         }
//       } catch (error) {
//         console.error('Form submission error:', error);
//       }
//     }
//   };

//   if (submitted) {
//     return (
//       <section className="py-20 bg-gradient-to-br from-primary via-primary to-secondary relative overflow-hidden">
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute inset-0" style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h6V4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//           }} />
//         </div>
//         <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-16 text-center animate-fadeIn">
//             <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
//               <CheckCircle2 className="w-12 h-12 text-green-600 animate-bounce" />
//             </div>
//             <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">Thank You!</h2>
//             <div className="w-20 h-1 bg-gradient-to-r from-accent to-secondary mx-auto mb-8"></div>
//             <p className="text-xl text-neutral-700 mb-2 font-semibold">Your consulting request has been submitted successfully.</p>
//             <p className="text-lg text-neutral-600 mb-10">Our CA expert will contact you shortly to discuss your financial needs and provide customized solutions.</p>
            
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-10 border border-blue-100">
//               <div className="space-y-4">
//                 <div className="flex items-center justify-center gap-3 text-blue-900">
//                   <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
//                   <p className="font-medium">Response Time: Within 24 business hours</p>
//                 </div>
//                 <div className="flex items-center justify-center gap-3 text-blue-900">
//                   <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
//                   <p className="font-medium">We'll reach out via {formData.preferredContact.charAt(0).toUpperCase() + formData.preferredContact.slice(1)}</p>
//                 </div>
//                 <div className="flex items-center justify-center gap-3 text-blue-900">
//                   <Lock className="w-5 h-5 text-blue-600 flex-shrink-0" />
//                   <p className="font-medium">Your data is encrypted & 100% confidential</p>
//                 </div>
//               </div>
//             </div>

//             <div className="grid md:grid-cols-3 gap-6 mb-10">
//               <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
//                 <div className="text-2xl font-bold text-accent mb-2">24/7</div>
//                 <p className="text-sm text-neutral-700 font-medium">Expert Support</p>
//               </div>
//               <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
//                 <div className="text-2xl font-bold text-accent mb-2">100%</div>
//                 <p className="text-sm text-neutral-700 font-medium">Data Security</p>
//               </div>
//               <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
//                 <div className="text-2xl font-bold text-accent mb-2">1000+</div>
//                 <p className="text-sm text-neutral-700 font-medium">Happy Clients</p>
//               </div>
//             </div>

//             <p className="text-sm text-neutral-600 mb-8">
//               <strong>Reference ID:</strong> <span className="font-mono text-accent">{Math.random().toString(36).substring(2, 15).toUpperCase()}</span>
//             </p>

//             <button 
//               onClick={() => window.location.href = '/'}
//               className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 mx-auto group"
//             >
//               RETURN TO HOME
//               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </button>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-24 bg-gradient-to-b from-white via-neutral-50 to-neutral-100 relative overflow-hidden">
//       {/* Background decorative elements */}
//       <div className="absolute inset-0 opacity-40 pointer-events-none">
//         <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* Header Section */}
//         <div className="text-center mb-16 animate-fadeIn">
//           <div className="flex items-center justify-center gap-3 mb-6">
//             <div className="hidden sm:block h-1 w-12 bg-gradient-to-r from-accent to-transparent"></div>
//             <div className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-accent/10 to-secondary/10 text-accent rounded-full border border-accent/30">
//               <Zap className="w-4 h-4" />
//               <span className="text-xs font-semibold uppercase tracking-wider">Premium Consultation Form</span>
//             </div>
//             <div className="hidden sm:block h-1 w-12 bg-gradient-to-l from-accent to-transparent"></div>
//           </div>
          
//           <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent mb-4">
//             Get Expert CA Guidance
//           </h2>
//           <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
//             Share your financial goals with our team of expert Chartered Accountants. We'll provide personalized solutions tailored specifically to your business needs.
//           </p>
//         </div>

//         {/* Progress Indicator - Compact */}
//         <div className="mb-8">
//           <div className="flex items-center justify-center gap-2 mb-4">
//             {[1, 2, 3, 4].map((step) => (
//               <React.Fragment key={step}>
//                 <button
//                   onClick={() => step < currentStep && setCurrentStep(step)}
//                   className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
//                     step === currentStep
//                       ? 'bg-gradient-to-br from-accent to-secondary text-white shadow-lg scale-125'
//                       : step < currentStep
//                       ? 'bg-green-500 text-white cursor-pointer hover:bg-green-600'
//                       : 'bg-neutral-200 text-neutral-600'
//                   }`}
//                 >
//                   {step < currentStep ? <Check className="w-5 h-5" /> : step}
//                 </button>
//                 {step < 4 && (
//                   <div
//                     className={`w-8 h-1 transition-all ${
//                       step < currentStep ? 'bg-green-500' : 'bg-neutral-200'
//                     }`}
//                   ></div>
//                 )}
//               </React.Fragment>
//             ))}
//           </div>
//           <div className="flex justify-center gap-4 text-xs font-medium text-neutral-600">
//             <span>Info</span>
//             <span>Business</span>
//             <span>Services</span>
//             <span>Review</span>
//           </div>
//         </div>

//         {/* Main Container - Two Column Layout */}
//         <div className="grid lg:grid-cols-2 gap-8 items-stretch">
//           {/* Left Side - Form */}
//           <div className="bg-white rounded-3xl shadow-2xl border border-neutral-200/50 p-8 lg:p-10 backdrop-blur-sm">
//             <style>{`
//               @keyframes fadeIn {
//                 from {
//                   opacity: 0;
//                   transform: translateY(20px);
//                 }
//                 to {
//                   opacity: 1;
//                   transform: translateY(0);
//                 }
//               }
//               .animate-fadeIn {
//                 animation: fadeIn 0.5s ease-out;
//               }
//             `}</style>

//             {/* Step 1: Basic Details */}
//             {currentStep === 1 && (
//               <div className="space-y-6 animate-fadeIn">
//                 <div className="space-y-2 mb-8">
//                   <h3 className="text-2xl font-bold text-primary flex items-center gap-3">
//                     <User className="w-6 h-6 text-accent" />
//                     Your Contact Info
//                   </h3>
//                   <p className="text-sm text-neutral-600">Help us know who we're working with</p>
//                 </div>
                
//                 {/* Full Name */}
//                 <div className="group">
//                   <label className="block text-sm font-semibold text-neutral-800 mb-2 flex items-center gap-2">
//                     <span>Full Name</span>
//                     <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleInputChange}
//                     placeholder="E.g., Rajesh Kumar Singh"
//                     className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all duration-300 group-hover:border-accent/40 ${
//                       errors.fullName
//                         ? 'border-red-500 focus:ring-4 focus:ring-red-200 focus:border-red-500'
//                         : 'border-neutral-300 focus:border-accent focus:ring-4 focus:ring-accent/20'
//                     }`}
//                   />
//                   {errors.fullName && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><span>⚠</span> {errors.fullName}</p>}
//                 </div>

//                 {/* Email */}
//                 <div className="group">
//                   <label className="block text-sm font-semibold text-neutral-800 mb-2 flex items-center gap-2">
//                     <Mail className="w-4 h-4 text-accent" />
//                     Email Address
//                     <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="your.email@example.com"
//                     className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all duration-300 group-hover:border-accent/40 ${
//                       errors.email
//                         ? 'border-red-500 focus:ring-4 focus:ring-red-200 focus:border-red-500'
//                         : 'border-neutral-300 focus:border-accent focus:ring-4 focus:ring-accent/20'
//                     }`}
//                   />
//                   {errors.email && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><span>⚠</span> {errors.email}</p>}
//                 </div>

//                 {/* Mobile */}
//                 <div className="group">
//                   <label className="block text-sm font-semibold text-neutral-800 mb-2 flex items-center gap-2">
//                     <Phone className="w-4 h-4 text-accent" />
//                     Mobile Number
//                     <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="tel"
//                     name="mobile"
//                     value={formData.mobile}
//                     onChange={handleInputChange}
//                     placeholder="+91 98765 43210"
//                     className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all duration-300 group-hover:border-accent/40 ${
//                       errors.mobile
//                         ? 'border-red-500 focus:ring-4 focus:ring-red-200 focus:border-red-500'
//                         : 'border-neutral-300 focus:border-accent focus:ring-4 focus:ring-accent/20'
//                     }`}
//                   />
//                   {errors.mobile && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><span>⚠</span> {errors.mobile}</p>}
//                 </div>

//                 {/* City */}
//                 <div className="group">
//                   <label className="block text-sm font-semibold text-neutral-800 mb-2 flex items-center gap-2">
//                     <MapPin className="w-4 h-4 text-accent" />
//                     City / Location
//                     <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleInputChange}
//                     placeholder="E.g., Mumbai, Delhi, Bangalore"
//                     className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all duration-300 group-hover:border-accent/40 ${
//                       errors.city
//                         ? 'border-red-500 focus:ring-4 focus:ring-red-200 focus:border-red-500'
//                         : 'border-neutral-300 focus:border-accent focus:ring-4 focus:ring-accent/20'
//                     }`}
//                   />
//                   {errors.city && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><span>⚠</span> {errors.city}</p>}
//                 </div>

//                 {/* Preferred Contact Method */}
//                 <div className="pt-4">
//                   <label className="block text-sm font-semibold text-neutral-800 mb-3 flex items-center gap-2">
//                     <Phone className="w-4 h-4 text-accent" />
//                     How should we contact you?
//                   </label>
//                   <div className="grid grid-cols-3 gap-3">
//                     {[
//                       { value: 'phone', label: 'Phone', icon: Phone },
//                       { value: 'email', label: 'Email', icon: Mail },
//                       { value: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
//                     ].map((method) => (
//                       <button
//                         key={method.value}
//                         onClick={() => setFormData(prev => ({ ...prev, preferredContact: method.value as 'phone' | 'email' | 'whatsapp' }))}
//                         className={`p-4 rounded-xl border-2 font-semibold transition-all duration-300 transform hover:scale-105 flex flex-col items-center gap-2 ${
//                           formData.preferredContact === method.value
//                             ? 'border-accent bg-gradient-to-br from-accent/10 to-secondary/5 text-accent shadow-lg'
//                             : 'border-neutral-300 text-neutral-700 hover:border-accent/50 hover:bg-neutral-50'
//                         }`}
//                       >
//                         <method.icon className="w-5 h-5" />
//                         <span className="text-xs">{method.label}</span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//                 <label className="block text-sm font-semibold text-neutral-800 mb-2 flex items-center gap-2">
//                   <span>Full Name</span>
//                   <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleInputChange}
//                   placeholder="E.g., Rajesh Kumar Singh"
//                   className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all duration-300 group-hover:border-accent/40 ${
//                     errors.fullName
//                       ? 'border-red-500 focus:ring-4 focus:ring-red-200 focus:border-red-500'
//                       : 'border-neutral-300 focus:border-accent focus:ring-4 focus:ring-accent/20'
//                   }`}
//                 />
//                 {errors.fullName && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><span>⚠</span> {errors.fullName}</p>}
//               </div>

//               {/* Email */}
//               <div className="group">
//                 <label className="block text-sm font-semibold text-neutral-800 mb-2 flex items-center gap-2">
//                   <Mail className="w-4 h-4 text-accent" />
//                   Email Address
//                   <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   placeholder="your.email@example.com"
//                   className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all duration-300 group-hover:border-accent/40 ${
//                     errors.email
//                       ? 'border-red-500 focus:ring-4 focus:ring-red-200 focus:border-red-500'
//                       : 'border-neutral-300 focus:border-accent focus:ring-4 focus:ring-accent/20'
//                   }`}
//                 />
//                 {errors.email && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><span>⚠</span> {errors.email}</p>}
//               </div>

//               {/* Mobile */}
//               <div className="group">
//                 <label className="block text-sm font-semibold text-neutral-800 mb-2 flex items-center gap-2">
//                   <Phone className="w-4 h-4 text-accent" />
//                   Mobile Number
//                   <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="tel"
//                   name="mobile"
//                   value={formData.mobile}
//                   onChange={handleInputChange}
//                   placeholder="+91 98765 43210"
//                   className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all duration-300 group-hover:border-accent/40 ${
//                     errors.mobile
//                       ? 'border-red-500 focus:ring-4 focus:ring-red-200 focus:border-red-500'
//                       : 'border-neutral-300 focus:border-accent focus:ring-4 focus:ring-accent/20'
//                   }`}
//                 />
//                 {errors.mobile && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><span>⚠</span> {errors.mobile}</p>}
//               </div>

//               {/* City */}
//               <div className="group">
//                 <label className="block text-sm font-semibold text-neutral-800 mb-2 flex items-center gap-2">
//                   <MapPin className="w-4 h-4 text-accent" />
//                   City / Location
//                   <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleInputChange}
//                   placeholder="E.g., Mumbai, Delhi, Bangalore"
//                   className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all duration-300 group-hover:border-accent/40 ${
//                     errors.city
//                       ? 'border-red-500 focus:ring-4 focus:ring-red-200 focus:border-red-500'
//                       : 'border-neutral-300 focus:border-accent focus:ring-4 focus:ring-accent/20'
//                   }`}
//                 />
//                 {errors.city && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><span>⚠</span> {errors.city}</p>}
//               </div>

//               {/* Preferred Contact Method */}
//               <div className="pt-4">
//                 <label className="block text-sm font-semibold text-neutral-800 mb-3 flex items-center gap-2">
//                   <Phone className="w-4 h-4 text-accent" />
//                   How should we contact you?
//                 </label>
//                 <div className="grid grid-cols-3 gap-3">
//                   {[
//                     { value: 'phone', label: 'Phone', icon: Phone },
//                     { value: 'email', label: 'Email', icon: Mail },
//                     { value: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
//                   ].map((method) => (
//                     <button
//                       key={method.value}
//                       onClick={() => setFormData(prev => ({ ...prev, preferredContact: method.value as 'phone' | 'email' | 'whatsapp' }))}
//                       className={`p-4 rounded-xl border-2 font-semibold transition-all duration-300 transform hover:scale-105 flex flex-col items-center gap-2 ${
//                         formData.preferredContact === method.value
//                           ? 'border-accent bg-gradient-to-br from-accent/10 to-secondary/5 text-accent shadow-lg'
//                           : 'border-neutral-300 text-neutral-700 hover:border-accent/50 hover:bg-neutral-50'
//                       }`}
//                     >
//                       <method.icon className="w-5 h-5" />
//                       <span className="text-xs">{method.label}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 2: Business Details */}
//           {currentStep === 2 && (
//             <div className="space-y-6 animate-fadeIn">
//               <div className="space-y-2 mb-8">
//                 <h3 className="text-3xl font-bold text-primary flex items-center gap-3">
//                   <Building2 className="w-8 h-8 text-accent" />
//                   Tell Us About Your Business
//                 </h3>
//                 <p className="text-neutral-600">Help us understand your business structure & scale</p>
//               </div>

//               {/* Client Type */}
//               <div className="group">
//                 <label className="block text-sm font-semibold text-neutral-800 mb-2 flex items-center gap-2">
//                   <Briefcase className="w-4 h-4 text-accent" />
//                   Client Type
//                   <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   name="clientType"
//                   value={formData.clientType}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all duration-300 appearance-none group-hover:border-accent/40 cursor-pointer ${
//                     errors.clientType
//                       ? 'border-red-500 focus:ring-4 focus:ring-red-200 focus:border-red-500'
//                       : 'border-neutral-300 focus:border-accent focus:ring-4 focus:ring-accent/20'
//                   }`}
//                 >
//                   <option value="">Select client type</option>
//                   <option value="individual">Individual / Salaried Professional</option>
//                   <option value="startup">Startup / Newly Registered Business</option>
//                   <option value="company">Company (Pvt/Ltd)</option>
//                   <option value="llp">Limited Liability Partnership (LLP)</option>
//                   <option value="partnership">Partnership Firm</option>
//                   <option value="sole">Sole Proprietorship</option>
//                   <option value="ngo">NGO / Non-Profit Organization</option>
//                   <option value="other">Other</option>
//                 </select>
//                 {errors.clientType && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><span>⚠</span> {errors.clientType}</p>}
//               </div>

//               {/* Business Name */}
//               {formData.clientType !== 'individual' && formData.clientType !== '' && (
//                 <div className="group animate-fadeIn">
//                   <label className="block text-sm font-semibold text-neutral-800 mb-2">Business Name *</label>
//                   <input
//                     type="text"
//                     name="businessName"
//                     value={formData.businessName}
//                     onChange={handleInputChange}
//                     placeholder="E.g., TechVision Solutions Pvt Ltd"
//                     className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all duration-300 group-hover:border-accent/40 ${
//                       errors.businessName
//                         ? 'border-red-500 focus:ring-4 focus:ring-red-200 focus:border-red-500'
//                         : 'border-neutral-300 focus:border-accent focus:ring-4 focus:ring-accent/20'
//                     }`}
//                   />
//                   {errors.businessName && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><span>⚠</span> {errors.businessName}</p>}
//                 </div>
//               )}

//               {/* Industry Type */}
//               <div className="group">
//                 <label className="block text-sm font-semibold text-neutral-800 mb-2 flex items-center gap-2">
//                   <TrendingUp className="w-4 h-4 text-accent" />
//                   Industry Type
//                   <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   name="industry"
//                   value={formData.industry}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all duration-300 appearance-none group-hover:border-accent/40 cursor-pointer ${
//                     errors.industry
//                       ? 'border-red-500 focus:ring-4 focus:ring-red-200 focus:border-red-500'
//                       : 'border-neutral-300 focus:border-accent focus:ring-4 focus:ring-accent/20'
//                   }`}
//                 >
//                   <option value="">Select industry type</option>
//                   <option value="technology">Technology & IT Services</option>
//                   <option value="e-commerce">E-commerce & Retail</option>
//                   <option value="healthcare">Healthcare & Pharma</option>
//                   <option value="manufacturing">Manufacturing & Production</option>
//                   <option value="finance">Finance & Banking</option>
//                   <option value="education">Education & Training</option>
//                   <option value="real-estate">Real Estate & Construction</option>
//                   <option value="hospitality">Hospitality & Tourism</option>
//                   <option value="logistics">Logistics & Transport</option>
//                   <option value="other">Other</option>
//                 </select>
//                 {errors.industry && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><span>⚠</span> {errors.industry}</p>}
//               </div>

//               {/* Annual Turnover */}
//               <div className="group">
//                 <label className="block text-sm font-semibold text-neutral-800 mb-2 flex items-center gap-2">
//                   <BarChart3 className="w-4 h-4 text-accent" />
//                   Annual Turnover Range
//                   <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   name="annualTurnover"
//                   value={formData.annualTurnover}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all duration-300 appearance-none group-hover:border-accent/40 cursor-pointer ${
//                     errors.annualTurnover
//                       ? 'border-red-500 focus:ring-4 focus:ring-red-200 focus:border-red-500'
//                       : 'border-neutral-300 focus:border-accent focus:ring-4 focus:ring-accent/20'
//                   }`}
//                 >
//                   <option value="">Select annual turnover</option>
//                   <option value="0-5">₹0 - ₹5 Lakhs</option>
//                   <option value="5-25">₹5 - ₹25 Lakhs</option>
//                   <option value="25-100">₹25 - ₹100 Lakhs</option>
//                   <option value="100-500">₹1 - ₹5 Crores</option>
//                   <option value="500+">₹5+ Crores</option>
//                 </select>
//                 {errors.annualTurnover && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><span>⚠</span> {errors.annualTurnover}</p>}
//               </div>
//             </div>
//           )}

//           {/* Step 3: Services */}
//           {currentStep === 3 && (
//             <div className="space-y-6 animate-fadeIn">
//               <div className="space-y-2 mb-8">
//                 <h3 className="text-3xl font-bold text-primary flex items-center gap-3">
//                   <FileText className="w-8 h-8 text-accent" />
//                   Select Required CA Services
//                 </h3>
//                 <p className="text-neutral-600">Choose all services relevant to your business needs</p>
//               </div>
              
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {caServices.map((service) => (
//                   <button
//                     key={service.id}
//                     onClick={() => handleServiceToggle(service.id)}
//                     className={`p-5 rounded-xl border-2 text-left transition-all duration-300 transform hover:scale-105 hover:shadow-lg group ${
//                       formData.services.includes(service.id)
//                         ? 'border-accent bg-gradient-to-br from-accent/10 to-secondary/5 shadow-md'
//                         : 'border-neutral-300 hover:border-accent/50 bg-white hover:bg-neutral-50'
//                     }`}
//                   >
//                     <div className="flex items-start gap-4">
//                       <div className={`w-6 h-6 rounded-lg border-2 mt-1 flex items-center justify-center flex-shrink-0 transition-all ${
//                         formData.services.includes(service.id)
//                           ? 'bg-gradient-to-br from-accent to-secondary border-accent shadow-md'
//                           : 'border-neutral-400 group-hover:border-accent'
//                       }`}>
//                         {formData.services.includes(service.id) && (
//                           <Check className="w-4 h-4 text-white font-bold" />
//                         )}
//                       </div>
//                       <span className={`font-semibold ${formData.services.includes(service.id) ? 'text-primary' : 'text-neutral-800'}`}>
//                         {service.label}
//                       </span>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//               {errors.services && <p className="text-red-500 text-sm mt-3 flex items-center gap-1"><span>⚠</span> {errors.services}</p>}

//               {/* Brief Description */}
//               <div className="pt-4">
//                 <label className="block text-sm font-semibold text-neutral-800 mb-3">Brief Description or Specific Needs</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   placeholder="E.g., We need GST compliance help, company registration for our startup, and tax planning advice. We have questions about..."
//                   rows={5}
//                   className="w-full px-4 py-3.5 border-2 border-neutral-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all resize-none hover:border-accent/40"
//                 />
//                 <p className="text-xs text-neutral-500 mt-2">Optional, but helps us prepare better for your consultation</p>
//               </div>

//               {/* Trust Building Section */}
//               <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 flex gap-4">
//                 <Lock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
//                 <div>
//                   <p className="text-sm font-bold text-blue-900 mb-1">🔒 Your Data is 100% Secure & Confidential</p>
//                   <p className="text-sm text-blue-800 leading-relaxed">
//                     Your information is encrypted with industry-standard security protocols. We comply with GDPR, CCPA, and all data protection regulations. Your details will never be shared with third parties or used for marketing without your consent.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 4: Review */}
//           {currentStep === 4 && (
//             <div className="space-y-8 animate-fadeIn">
//               <div className="space-y-2 mb-8">
//                 <h3 className="text-3xl font-bold text-primary flex items-center gap-3">
//                   <CheckCircle2 className="w-8 h-8 text-green-600" />
//                   Review Your Information
//                 </h3>
//                 <p className="text-neutral-600">Please verify your details before submitting</p>
//               </div>

//               {/* Review Cards - Premium Layout */}
//               <div className="space-y-6">
//                 {/* Contact Info Card */}
//                 <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-100 p-8">
//                   <h4 className="text-lg font-bold text-primary mb-6 flex items-center gap-3">
//                     <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                       <User className="w-5 h-5 text-blue-600" />
//                     </div>
//                     Contact Information
//                   </h4>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                     <div className="bg-white rounded-xl p-4">
//                       <p className="text-xs font-semibold text-neutral-600 uppercase mb-2">Full Name</p>
//                       <p className="text-base font-semibold text-primary">{formData.fullName}</p>
//                     </div>
//                     <div className="bg-white rounded-xl p-4">
//                       <p className="text-xs font-semibold text-neutral-600 uppercase mb-2">Email Address</p>
//                       <p className="text-base font-semibold text-primary">{formData.email}</p>
//                     </div>
//                     <div className="bg-white rounded-xl p-4">
//                       <p className="text-xs font-semibold text-neutral-600 uppercase mb-2">Mobile Number</p>
//                       <p className="text-base font-semibold text-primary">{formData.mobile}</p>
//                     </div>
//                     <div className="bg-white rounded-xl p-4">
//                       <p className="text-xs font-semibold text-neutral-600 uppercase mb-2">Location</p>
//                       <p className="text-base font-semibold text-primary">{formData.city}</p>
//                     </div>
//                     <div className="sm:col-span-2 bg-white rounded-xl p-4">
//                       <p className="text-xs font-semibold text-neutral-600 uppercase mb-2">Preferred Contact Method</p>
//                       <div className="flex items-center gap-2">
//                         {formData.preferredContact === 'phone' && <Phone className="w-5 h-5 text-accent" />}
//                         {formData.preferredContact === 'email' && <Mail className="w-5 h-5 text-accent" />}
//                         {formData.preferredContact === 'whatsapp' && <MessageCircle className="w-5 h-5 text-accent" />}
//                         <p className="text-base font-semibold text-primary capitalize">{formData.preferredContact}</p>
//                       </div>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setCurrentStep(1)}
//                     className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
//                   >
//                     Edit <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                   </button>
//                 </div>

//                 {/* Business Info Card */}
//                 <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-100 p-8">
//                   <h4 className="text-lg font-bold text-primary mb-6 flex items-center gap-3">
//                     <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
//                       <Building2 className="w-5 h-5 text-amber-600" />
//                     </div>
//                     Business Details
//                   </h4>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                     <div className="bg-white rounded-xl p-4">
//                       <p className="text-xs font-semibold text-neutral-600 uppercase mb-2">Client Type</p>
//                       <p className="text-base font-semibold text-primary capitalize">{formData.clientType}</p>
//                     </div>
//                     {formData.businessName && (
//                       <div className="bg-white rounded-xl p-4">
//                         <p className="text-xs font-semibold text-neutral-600 uppercase mb-2">Business Name</p>
//                         <p className="text-base font-semibold text-primary">{formData.businessName}</p>
//                       </div>
//                     )}
//                     <div className="bg-white rounded-xl p-4">
//                       <p className="text-xs font-semibold text-neutral-600 uppercase mb-2">Industry Type</p>
//                       <p className="text-base font-semibold text-primary capitalize">{formData.industry}</p>
//                     </div>
//                     <div className="bg-white rounded-xl p-4">
//                       <p className="text-xs font-semibold text-neutral-600 uppercase mb-2">Annual Turnover</p>
//                       <p className="text-base font-semibold text-primary">{formData.annualTurnover}</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setCurrentStep(2)}
//                     className="mt-4 text-sm font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 group"
//                   >
//                     Edit <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                   </button>
//                 </div>

//                 {/* Services Card */}
//                 <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-100 p-8">
//                   <h4 className="text-lg font-bold text-primary mb-6 flex items-center gap-3">
//                     <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
//                       <Briefcase className="w-5 h-5 text-purple-600" />
//                     </div>
//                     Required Services
//                   </h4>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
//                     {formData.services.map((serviceId) => {
//                       const service = caServices.find(s => s.id === serviceId);
//                       return (
//                         <div key={serviceId} className="bg-white rounded-xl p-4 flex items-start gap-3">
//                           <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5 font-bold" />
//                           <span className="text-sm font-semibold text-neutral-900">{service?.label}</span>
//                         </div>
//                       );
//                     })}
//                   </div>
//                   {formData.description && (
//                     <div className="bg-white rounded-xl p-4 border-2 border-purple-100">
//                       <p className="text-xs font-semibold text-neutral-600 uppercase mb-2">Additional Notes</p>
//                       <p className="text-sm text-neutral-900 leading-relaxed">{formData.description}</p>
//                     </div>
//                   )}
//                   <button
//                     onClick={() => setCurrentStep(3)}
//                     className="mt-4 text-sm font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1 group"
//                   >
//                     Edit <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                   </button>
//                 </div>
//               </div>

//               {/* Final Confirmation Message */}
//               <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 flex gap-4">
//                 <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
//                 <div>
//                   <p className="text-sm font-bold text-green-900 mb-1">All Set! Ready to Submit?</p>
//                   <p className="text-sm text-green-800">Click submit below to send your consulting request. A CA expert will review and contact you shortly.</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Navigation Buttons - Enhanced */}
//           <div className="flex gap-4 mt-12">
//             <button
//               onClick={handlePrevious}
//               disabled={currentStep === 1}
//               className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 ${
//                 currentStep === 1
//                   ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
//                   : 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300 hover:shadow-lg'
//               }`}
//             >
//               <ChevronLeft className="w-5 h-5" />
//               Previous Step
//             </button>

//             {currentStep < 4 ? (
//               <button
//                 onClick={handleNext}
//                 className="flex-1 px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 group"
//               >
//                 Continue to Next
//                 <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </button>
//             ) : (
//               <button
//                 onClick={handleSubmit}
//                 className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 group"
//               >
//                 <Check className="w-5 h-5" />
//                 Submit Application
//               </button>
//             )}
//           </div>

//           {/* Step Indicator Text */}
//           <p className="text-center text-sm text-neutral-600 mt-6 font-medium">
//             <Clock className="w-4 h-4 inline mr-1 text-accent" />
//             Step {currentStep} of 4 • Est. time: {5 - (currentStep - 1)} min remaining
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }


import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, Phone, Mail, MapPin, Building2, Briefcase, FileText, Lock, CheckCircle2, ArrowRight, Zap, Clock, User, TrendingUp, MessageCircle, BarChart3 } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  mobile: string;
  city: string;
  preferredContact: 'phone' | 'email' | 'whatsapp';
  clientType: string;
  businessName: string;
  industry: string;
  annualTurnover: string;
  services: string[];
  description: string;
}

export function ConsultingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fadeOut, setFadeOut] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    preferredContact: 'phone',
    clientType: '',
    businessName: '',
    industry: '',
    annualTurnover: '',
    services: [],
    description: '',
  });

  const caServices = [
    { id: 'income-tax', label: 'Income Tax Filing & Planning' },
    { id: 'gst', label: 'GST Registration & Compliance' },
    { id: 'company-registration', label: 'Company Registration & Incorporation' },
    { id: 'audit', label: 'Statutory Audit & Assurance' },
    { id: 'accounting', label: 'Accounting & Bookkeeping' },
    { id: 'payroll', label: 'Payroll & HR Compliance' },
    { id: 'startup', label: 'Startup Advisory & Registration' },
    { id: 'virtual-cfo', label: 'Virtual CFO Services' },
    { id: 'nri', label: 'NRI Taxation Services' },
    { id: 'business-advisory', label: 'Business Advisory & Planning' },
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
      if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
      if (!/^[0-9]{10}$/.test(formData.mobile.replace(/[^\d]/g, ''))) newErrors.mobile = 'Please enter a valid 10-digit number';
      if (!formData.city.trim()) newErrors.city = 'City/Location is required';
    }

    if (step === 2) {
      if (!formData.clientType) newErrors.clientType = 'Please select client type';
      if (formData.clientType !== 'individual' && !formData.businessName.trim()) {
        newErrors.businessName = 'Business name is required';
      }
      if (!formData.industry) newErrors.industry = 'Please select industry type';
      if (!formData.annualTurnover) newErrors.annualTurnover = 'Please select annual turnover range';
    }

    if (step === 3) {
      if (formData.services.length === 0) newErrors.services = 'Please select at least one service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setFadeOut(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setFadeOut(false);
      }, 300);
    }
  };

  const handlePrevious = () => {
    setFadeOut(true);
    setTimeout(() => {
      setCurrentStep(currentStep - 1);
      setFadeOut(false);
    }, 300);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId],
    }));
    if (errors.services) {
      setErrors(prev => ({ ...prev, services: '' }));
    }
  };

  const handleSubmit = async () => {
    if (validateStep(3)) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 relative overflow-hidden min-h-screen flex items-center">
        <div className="max-w-2xl mx-auto px-4 w-full">
          <style>{`
            @keyframes scaleIn {
              from { opacity: 0; transform: scale(0.9); }
              to { opacity: 1; transform: scale(1); }
            }
            @keyframes bounce-gentle {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
            .animate-scale-in {
              animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .animate-bounce-gentle {
              animation: bounce-gentle 2s infinite;
            }
          `}</style>
          
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-16 text-center animate-scale-in">
            <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg animate-bounce-gentle">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-blue-600 mb-4">Thank You!</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 mb-2 font-semibold">Your consulting request has been submitted successfully.</p>
            <p className="text-lg text-gray-600 mb-10">Our CA expert will contact you shortly to discuss your financial needs and provide customized solutions.</p>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-10 border border-blue-100">
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 text-blue-900">
                  <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <p className="font-medium">Response Time: Within 24 business hours</p>
                </div>
                <div className="flex items-center justify-center gap-3 text-blue-900">
                  <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <p className="font-medium">We'll reach out via {formData.preferredContact.charAt(0).toUpperCase() + formData.preferredContact.slice(1)}</p>
                </div>
                <div className="flex items-center justify-center gap-3 text-blue-900">
                  <Lock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <p className="font-medium">Your data is encrypted & 100% confidential</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="text-2xl font-bold text-blue-600 mb-2">24/7</div>
                <p className="text-sm text-gray-700 font-medium">Expert Support</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="text-2xl font-bold text-blue-600 mb-2">100%</div>
                <p className="text-sm text-gray-700 font-medium">Data Security</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="text-2xl font-bold text-blue-600 mb-2">1000+</div>
                <p className="text-sm text-gray-700 font-medium">Happy Clients</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-8">
              <strong>Reference ID:</strong> <span className="font-mono text-blue-600">{Math.random().toString(36).substring(2, 15).toUpperCase()}</span>
            </p>

            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 mx-auto group"
            >
              SUBMIT NEW FORM
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-gray-100 relative overflow-hidden min-h-screen flex items-center">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOutDown {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(20px); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out;
        }
        .animate-fadeOutDown {
          animation: fadeOutDown 0.3s ease-in;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-blue-600 mb-4">Get Expert CA Guidance</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Share your financial goals with our team of expert Chartered Accountants.</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            {[1, 2, 3, 4].map((step) => (
              <React.Fragment key={step}>
                <button
                  onClick={() => step < currentStep && setCurrentStep(step)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    step === currentStep
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg scale-125'
                      : step < currentStep
                      ? 'bg-green-500 text-white cursor-pointer hover:bg-green-600'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step < currentStep ? <Check className="w-5 h-5" /> : step}
                </button>
                {step < 4 && (
                  <div
                    className={`w-8 h-1 transition-all ${
                      step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-center gap-4 text-xs font-medium text-gray-600">
            <span>Info</span>
            <span>Business</span>
            <span>Services</span>
            <span>Review</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 lg:p-10">
            <div className={fadeOut ? 'animate-fadeOutDown' : 'animate-fadeInUp'}>
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2 mb-8">
                    <h3 className="text-2xl font-bold text-blue-600 flex items-center gap-3">
                      <User className="w-6 h-6 text-blue-500" />
                      Your Contact Info
                    </h3>
                    <p className="text-sm text-gray-600">Help us know who we're working with</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Full Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="E.g., Rajesh Kumar Singh"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                        errors.fullName
                          ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                      }`}
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">⚠ {errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-500" />
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                        errors.email
                          ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">⚠ {errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-500" />
                      Mobile <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                        errors.mobile
                          ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                      }`}
                    />
                    {errors.mobile && <p className="text-red-500 text-sm mt-1">⚠ {errors.mobile}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="E.g., Mumbai, Delhi, Bangalore"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                        errors.city
                          ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                      }`}
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">⚠ {errors.city}</p>}
                  </div>

                  <div className="pt-4">
                    <label className="block text-sm font-semibold text-gray-800 mb-3">How should we contact you?</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'phone', label: 'Phone', icon: Phone },
                        { value: 'email', label: 'Email', icon: Mail },
                        { value: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
                      ].map((method) => (
                        <button
                          key={method.value}
                          onClick={() => setFormData(prev => ({ ...prev, preferredContact: method.value as 'phone' | 'email' | 'whatsapp' }))}
                          className={`p-4 rounded-lg border-2 font-semibold transition-all flex flex-col items-center gap-2 ${
                            formData.preferredContact === method.value
                              ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-lg'
                              : 'border-gray-300 text-gray-700 hover:border-blue-400'
                          }`}
                        >
                          <method.icon className="w-5 h-5" />
                          <span className="text-xs">{method.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2 mb-8">
                    <h3 className="text-2xl font-bold text-blue-600 flex items-center gap-3">
                      <Building2 className="w-6 h-6 text-blue-500" />
                      Business Details
                    </h3>
                    <p className="text-sm text-gray-600">Help us understand your business</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Client Type <span className="text-red-500">*</span></label>
                    <select
                      name="clientType"
                      value={formData.clientType}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all cursor-pointer ${
                        errors.clientType
                          ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                      }`}
                    >
                      <option value="">Select client type</option>
                      <option value="individual">Individual / Salaried</option>
                      <option value="startup">Startup</option>
                      <option value="company">Company</option>
                      <option value="llp">LLP</option>
                      <option value="partnership">Partnership</option>
                      <option value="sole">Sole Proprietorship</option>
                    </select>
                    {errors.clientType && <p className="text-red-500 text-sm mt-1">⚠ {errors.clientType}</p>}
                  </div>

                  {formData.clientType !== 'individual' && formData.clientType && (
                    <div className="animate-fadeInUp">
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Business Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        placeholder="Business name"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                          errors.businessName ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                        }`}
                      />
                      {errors.businessName && <p className="text-red-500 text-sm mt-1">⚠ {errors.businessName}</p>}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Industry <span className="text-red-500">*</span></label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all cursor-pointer ${
                        errors.industry ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                      }`}
                    >
                      <option value="">Select industry</option>
                      <option value="technology">Technology</option>
                      <option value="e-commerce">E-commerce</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="finance">Finance</option>
                      <option value="education">Education</option>
                      <option value="real-estate">Real Estate</option>
                      <option value="hospitality">Hospitality</option>
                    </select>
                    {errors.industry && <p className="text-red-500 text-sm mt-1">⚠ {errors.industry}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Annual Turnover <span className="text-red-500">*</span></label>
                    <select
                      name="annualTurnover"
                      value={formData.annualTurnover}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all cursor-pointer ${
                        errors.annualTurnover ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                      }`}
                    >
                      <option value="">Select turnover</option>
                      <option value="0-5">₹0 - ₹5 Lakhs</option>
                      <option value="5-25">₹5 - ₹25 Lakhs</option>
                      <option value="25-100">₹25 - ₹100 Lakhs</option>
                      <option value="100-500">₹1 - ₹5 Crores</option>
                      <option value="500+">₹5+ Crores</option>
                    </select>
                    {errors.annualTurnover && <p className="text-red-500 text-sm mt-1">⚠ {errors.annualTurnover}</p>}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2 mb-8">
                    <h3 className="text-2xl font-bold text-blue-600 flex items-center gap-3">
                      <FileText className="w-6 h-6 text-blue-500" />
                      Select Services
                    </h3>
                    <p className="text-sm text-gray-600">Choose all services you need</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {caServices.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => handleServiceToggle(service.id)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          formData.services.includes(service.id)
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-gray-300 hover:border-blue-400'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded border-2 mt-0.5 flex items-center justify-center flex-shrink-0 ${
                            formData.services.includes(service.id)
                              ? 'bg-blue-500 border-blue-500'
                              : 'border-gray-400'
                          }`}>
                            {formData.services.includes(service.id) && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className="text-sm font-semibold text-gray-800">{service.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  {errors.services && <p className="text-red-500 text-sm">⚠ {errors.services}</p>}

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Additional Notes (Optional)</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your needs..."
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
                    />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="space-y-2 mb-8">
                    <h3 className="text-2xl font-bold text-blue-600 flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                      Review Information
                    </h3>
                    <p className="text-sm text-gray-600">Verify your details</p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-sm font-semibold text-gray-800 mb-3">Contact Info</p>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-semibold">Name:</span> {formData.fullName}</p>
                      <p><span className="font-semibold">Email:</span> {formData.email}</p>
                      <p><span className="font-semibold">Mobile:</span> {formData.mobile}</p>
                      <p><span className="font-semibold">City:</span> {formData.city}</p>
                    </div>
                  </div>

                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <p className="text-sm font-semibold text-gray-800 mb-3">Business Info</p>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-semibold">Type:</span> {formData.clientType}</p>
                      {formData.businessName && <p><span className="font-semibold">Business:</span> {formData.businessName}</p>}
                      <p><span className="font-semibold">Industry:</span> {formData.industry}</p>
                      <p><span className="font-semibold">Turnover:</span> {formData.annualTurnover}</p>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <p className="text-sm font-semibold text-gray-800 mb-3">Services ({formData.services.length})</p>
                    <div className="space-y-1 text-sm">
                      {formData.services.map(id => {
                        const service = caServices.find(s => s.id === id);
                        return <p key={id}>✓ {service?.label}</p>;
                      })}
                    </div>
                  </div>

                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                    <p className="text-sm font-semibold text-green-900">Ready to submit? Click below to send your application!</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-2xl border border-blue-200 p-8 lg:p-10 h-fit">
            <h3 className="text-xl font-bold text-blue-600 mb-6 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Why Choose Us?
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-800">Expert CAs</p>
                  <p className="text-sm text-gray-600">Certified professionals with years of experience</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-800">100% Secure</p>
                  <p className="text-sm text-gray-600">Your data is encrypted and confidential</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-800">Quick Response</p>
                  <p className="text-sm text-gray-600">Within 24 business hours</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-800">Personalized</p>
                  <p className="text-sm text-gray-600">Customized solutions for your needs</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-800">1000+ Clients</p>
                  <p className="text-sm text-gray-600">Trusted by businesses across India</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-blue-200">
              <p className="text-xs text-gray-600 text-center">
                <strong>Step {currentStep} of 4</strong><br/>
                Est. time: {5 - (currentStep - 1)} min remaining
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8 max-w-2xl mx-auto">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`flex-1 px-6 py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              Continue
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              Submit Application
            </button>
          )}
        </div>
      </div>
    </section>
  );
}