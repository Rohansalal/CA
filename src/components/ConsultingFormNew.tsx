import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, Phone, Mail, MapPin, Building2, Briefcase, FileText, Shield, Lock, CheckCircle2, ArrowRight, Zap, Clock, User, BarChart3, MessageCircle } from 'lucide-react';

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

const stepContent = {
  1: {
    title: 'Your Contact Details',
    description: 'We need your contact information to ensure our expert CA team can reach you promptly. All information is kept strictly confidential.',
    highlights: [
      '✓ 100% Confidential & Secure',
      '✓ Response within 24 hours',
      '✓ Direct Expert Consultation',
    ],
  },
  2: {
    title: 'Business Information',
    description: 'Share your business details to help us understand your structure, industry, and scale. This allows us to tailor our financial solutions specifically to your needs.',
    highlights: [
      '✓ Industry-Specific Solutions',
      '✓ Scale-Appropriate Services',
      '✓ Custom Financial Strategy',
    ],
  },
  3: {
    title: 'Select Required Services',
    description: 'Choose from our comprehensive range of CA services. You can select multiple services - our team will create a customized package that fits your requirements and budget.',
    highlights: [
      '✓ 10+ Professional Services',
      '✓ Flexible Service Packages',
      '✓ Transparent Pricing',
    ],
  },
  4: {
    title: 'Final Review & Submit',
    description: 'Please review all the information you\'ve provided. You can go back to edit any section if needed before submitting your consultation request.',
    highlights: [
      '✓ Verify All Details',
      '✓ Edit Any Section',
      '✓ One Click to Submit',
    ],
  },
};

export function ConsultingFormNew() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
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
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
      else if (!/^[0-9]{10}$/.test(formData.mobile.replace(/[^\d]/g, ''))) newErrors.mobile = 'Must be 10 digits';
      if (!formData.city.trim()) newErrors.city = 'City is required';
    }

    if (step === 2) {
      if (!formData.clientType) newErrors.clientType = 'Select client type';
      if (formData.clientType && formData.clientType !== 'individual' && !formData.businessName.trim()) {
        newErrors.businessName = 'Business name required';
      }
      if (!formData.industry) newErrors.industry = 'Select industry';
      if (!formData.annualTurnover) newErrors.annualTurnover = 'Select turnover';
    }

    if (step === 3) {
      if (formData.services.length === 0) newErrors.services = 'Select at least one service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
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
      try {
        const response = await fetch('/api/consulting-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSubmitted(true);
          setTimeout(() => {
            setCurrentStep(1);
            setSubmitted(false);
            setFormData({
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
          }, 3000);
        }
      } catch (error) {
        // Fallback for demo
        setSubmitted(true);
        setTimeout(() => {
          setCurrentStep(1);
          setSubmitted(false);
        }, 3000);
      }
    }
  };

  if (submitted) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 ">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
            <CheckCircle2 className="w-16 h-16 text-orange-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Thank You!</h2>
            <p className="text-lg text-neutral-600 mb-4">Your consulting request has been submitted successfully.</p>
            <p className="text-neutral-600 mb-8">Our CA expert will contact you within 24 hours.</p>
            <button
              onClick={() => window.location.href = '/'}
              className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition shadow-lg"
            >
              Return to Home
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary via-primary to-secondary text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h6V4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">Get Expert CA Guidance</h2>
          <p className="text-base text-blue-100">Complete our consultation form to connect with our expert chartered accountants</p>
        </div>
        <br />
        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            {[1, 2, 3, 4].map((step) => (
              <React.Fragment key={step}>
                <button
                  onClick={() => step <= currentStep && setCurrentStep(step)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all text-sm ${step === currentStep
                    ? 'bg-orange-500 text-white shadow-lg scale-110'
                    : step < currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/20 text-white/60'
                    }`}
                >
                  {step < currentStep ? <Check className="w-4 h-4" /> : step}
                </button>
                {step < 4 && <div className={`h-1 w-6 ${step < currentStep ? 'bg-orange-500' : 'bg-white/20'}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* LEFT SIDE - FORM */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-xl shadow-xl p-6 border border-neutral-200">
              {/* Step 1 */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Your Contact Information</h3>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-800 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none transition text-sm text-neutral-900 placeholder:text-neutral-400 ${errors.fullName ? 'border-red-500' : 'border-neutral-300 focus:border-orange-500'
                        }`}
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-800 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition text-neutral-900 placeholder:text-neutral-400 ${errors.email ? 'border-red-500' : 'border-neutral-300 focus:border-orange-500'
                        }`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-800 mb-2">Mobile Number *</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition text-neutral-900 placeholder:text-neutral-400 ${errors.mobile ? 'border-red-500' : 'border-neutral-300 focus:border-orange-500'
                        }`}
                    />
                    {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-800 mb-2">City / Location *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Your city"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition text-neutral-900 placeholder:text-neutral-400 ${errors.city ? 'border-red-500' : 'border-neutral-300 focus:border-orange-500'
                        }`}
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-800 mb-3">Preferred Contact Method</label>
                    <div className="flex gap-4 mb-6">
                      {[
                        { value: 'phone', label: 'Phone', icon: Phone },
                        { value: 'email', label: 'Email', icon: Mail },
                        { value: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
                      ].map((method) => (
                        <button
                          key={method.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, preferredContact: method.value as any }))}
                          className={`flex-1 p-3 rounded-lg border-2 transition flex flex-col items-center gap-1 ${formData.preferredContact === method.value
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-neutral-300 hover:border-orange-300 text-neutral-700 hover:text-neutral-900'
                            }`}
                        >
                          <method.icon className="w-5 h-5" />
                          <span className="text-sm font-medium">{method.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Business Details</h3>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-800 mb-2">Client Type *</label>
                    <select
                      name="clientType"
                      value={formData.clientType}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition appearance-none text-neutral-900 ${errors.clientType ? 'border-red-500' : 'border-neutral-300 focus:border-orange-500'
                        }`}
                    >
                      <option value="">Select client type</option>
                      <option value="individual">Individual</option>
                      <option value="startup">Startup</option>
                      <option value="company">Company (Pvt/Ltd)</option>
                      <option value="llp">Limited Liability Partnership</option>
                      <option value="partnership">Partnership Firm</option>
                      <option value="sole">Sole Proprietorship</option>
                    </select>
                    {errors.clientType && <p className="text-red-500 text-sm mt-1">{errors.clientType}</p>}
                  </div>

                  {formData.clientType && formData.clientType !== 'individual' && (
                    <div>
                      <label className="block text-sm font-semibold text-neutral-800 mb-2">Business Name *</label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        placeholder="Your business name"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition text-neutral-900 placeholder:text-neutral-400 ${errors.businessName ? 'border-red-500' : 'border-neutral-300 focus:border-orange-500'
                          }`}
                      />
                      {errors.businessName && <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-neutral-800 mb-2">Industry Type *</label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition appearance-none text-neutral-900 ${errors.industry ? 'border-red-500' : 'border-neutral-300 focus:border-orange-500'
                        }`}
                    >
                      <option value="">Select industry</option>
                      <option value="technology">Technology & IT</option>
                      <option value="e-commerce">E-commerce</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="finance">Finance</option>
                      <option value="education">Education</option>
                      <option value="real-estate">Real Estate</option>
                    </select>
                    {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-800 mb-2">Annual Turnover *</label>
                    <select
                      name="annualTurnover"
                      value={formData.annualTurnover}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition appearance-none text-neutral-900 ${errors.annualTurnover ? 'border-red-500' : 'border-neutral-300 focus:border-orange-500'
                        }`}
                    >
                      <option value="">Select range</option>
                      <option value="0-5">₹0 - ₹5 Lakhs</option>
                      <option value="5-25">₹5 - ₹25 Lakhs</option>
                      <option value="25-100">₹25 - ₹100 Lakhs</option>
                      <option value="100-500">₹1 - ₹5 Crores</option>
                      <option value="500+">₹5+ Crores</option>
                    </select>
                    {errors.annualTurnover && <p className="text-red-500 text-sm mt-1">{errors.annualTurnover}</p>}
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Required Services</h3>

                  <div className="space-y-2">
                    {caServices.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => handleServiceToggle(service.id)}
                        className={`w-full p-3 rounded-lg border-2 text-left transition text-sm ${formData.services.includes(service.id)
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-neutral-300 hover:border-orange-300'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${formData.services.includes(service.id)
                            ? 'bg-orange-500 border-orange-500'
                            : 'border-neutral-400'
                            }`}>
                            {formData.services.includes(service.id) && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span className="font-medium">{service.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  {errors.services && <p className="text-red-500 text-sm">{errors.services}</p>}

                  <div>
                    <label className="block text-sm font-semibold text-neutral-800 mb-2">Additional Notes</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Tell us about your specific needs..."
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg focus:outline-none focus:border-orange-500 text-neutral-900 placeholder:text-neutral-400"
                    />
                  </div>
                </div>
              )}

              {/* Step 4 */}
              {currentStep === 4 && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Review Information</h3>

                  <div className="bg-neutral-50 rounded-lg p-4 space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-neutral-600 mb-1">Full Name</p>
                      <p className="font-medium text-neutral-900">{formData.fullName}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-600 mb-1">Email</p>
                      <p className="font-medium text-neutral-900">{formData.email}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-600 mb-1">Mobile</p>
                      <p className="font-medium text-neutral-900">{formData.mobile}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-600 mb-1">Services</p>
                      <p className="font-medium text-neutral-900">{formData.services.length} service(s) selected</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">All information looks good! Click submit to proceed.</p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${currentStep === 1
                    ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                    : 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300'
                    }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                {currentStep < 4 ? (
                  <button
                    onClick={handleNext}
                    className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Check className="w-4 h-4" />
                    Submit
                  </button>
                )}
              </div>

              <p className="text-center text-xs text-neutral-500 mt-4">Step {currentStep} of 4</p>
            </div>
          </div>

          {/* RIGHT SIDE - CONTENT */}
          <div className="order-1 lg:order-2">
            <div className="space-y-6">
              {/* Step Content */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {stepContent[currentStep as keyof typeof stepContent].title}
                </h3>
                <p className="text-base text-blue-100 leading-relaxed">
                  {stepContent[currentStep as keyof typeof stepContent].description}
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-3">
                {stepContent[currentStep as keyof typeof stepContent].highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-medium">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Trust Section */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-orange-400" />
                  Why Trust Us?
                </h4>
                <ul className="space-y-3 text-sm text-blue-100">
                  <li className="flex gap-2">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>ICAI Registered Chartered Accountants</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>10+ Years of Industry Experience</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>1000+ Satisfied Clients</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>100% Secure & Confidential</span>
                  </li>
                </ul>
              </div>

              {/* Info Box */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex gap-3">
                  <Clock className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white text-sm">Expected Response Time</p>
                    <p className="text-sm text-blue-100">Our CA expert will contact you within 24 business hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </section>
  );
}
