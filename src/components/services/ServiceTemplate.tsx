import React, { useState } from 'react';
import {
    CheckCircle,
    X,
    ChevronRight,
    ArrowRight,
    Shield,
    FileText,
    AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';


// --- Types ---
export interface ServicePlan {
    id?: number; // Added for backend integration
    name: string;
    price: number | string; // e.g. 2500 or "Custom"
    description?: string;
    features: string[]; // Scope of work summary
    color?: string; // e.g. "bg-blue-500"
    recommended?: boolean;
}

export interface ServiceContent {
    title: string;
    subtitle: string;
    description: string;
    // Hero features (small badges)
    heroFeatures?: { icon: React.ElementType, text: string }[];
    // Main types section (e.g. ITR-1, ITR-2)
    typesTitle?: string;
    types?: { title: string, description: string, icon: React.ElementType, features: string[] }[];
    // Plans
    plans: ServicePlan[];
    // Detailed Modal Content
    termsAndConditions?: string[];
    checklist?: string[];
    // Standard Sections
    benefits: string[];
    criticalConsiderations?: { title: string, description: string, icon: React.ElementType }[];
    documentsRequired?: string[];
    dataRequired?: string[];
    faqs?: { q: string, a: string }[];

    // New Content Fields
    descriptionTitle?: string;
    descriptionContent?: string;
    process?: { step: string, title: string, description: string }[];
    testimonials?: { name: string, role?: string, review: string, rating: number }[];
}

interface ServiceTemplateProps {
    serviceSlug: string; // for routing/backend
    serviceId?: number; // Added for backend integration
    content: ServiceContent;
}

export function ServiceTemplate({ serviceSlug, serviceId, content }: ServiceTemplateProps) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [selectedPlan, setSelectedPlan] = useState<ServicePlan | null>(null);
    const [plans, setPlans] = useState<ServicePlan[]>(content.plans); // Initialize with static content

    // Update plans if content changes (e.g. after fetch in parent)
    React.useEffect(() => {
        setPlans(content.plans);
    }, [content.plans]);

    const handlePlanClick = (plan: ServicePlan) => {
        setSelectedPlan(plan);
    };

    const handleProceedToPayment = () => {
        if (!selectedPlan) return;

        // Convert price string to number if possible, else 0
        const priceValue = typeof selectedPlan.price === 'string'
            ? parseInt(selectedPlan.price.toString().replace(/[^0-9]/g, '')) || 0
            : selectedPlan.price;

        const planData = {
            id: selectedPlan.id,
            name: selectedPlan.name,
            price: priceValue,
            serviceSlug: serviceSlug,
            serviceId: serviceId
        };

        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedServiceSlug: serviceSlug, selectedPlan: planData } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedServiceSlug: serviceSlug, selectedPlan: planData } });
        }
    };

    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-20 lg:py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-semibold mb-6 border border-white/20">
                            {content.title}
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                            {content.subtitle}
                        </h1>
                        <p className="text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl">
                            {content.description}
                        </p>

                        {content.heroFeatures && (
                            <div className="flex flex-wrap gap-4">
                                {content.heroFeatures.map((feat, idx) => (
                                    <div key={idx} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-sm">
                                        <feat.icon className="w-5 h-5 text-accent" />
                                        <span className="font-medium">{feat.text}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <br />
                        <br />
                        <div className="mt-10">
                            <button
                                onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 bg-accent hover:bg-accent/90 text-white font-bold rounded-xl shadow-lg shadow-accent/20 transition-all flex items-center gap-2"
                            >
                                View Plans <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <br />
            <br />
            <br />
            <br />

            {/* About / Description Section - Moved Here */}
            {/* About / Description Section (Modern & Clean) */}
            {(content.descriptionTitle || content.descriptionContent) && (
                <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row items-start gap-12 lg:gap-24">
                            {/* Left: Title & Visual */}
                            <div className="w-full md:w-1/3 sticky top-24">
                                {content.descriptionTitle && (
                                    <>
                                        <div className="inline-block p-3 bg-blue-50 rounded-2xl mb-6">
                                            <FileText className="w-8 h-8 text-primary" />
                                        </div>
                                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4 font-display">
                                            {content.descriptionTitle}
                                        </h2>
                                        <div className="h-1.5 w-20 bg-accent rounded-full"></div>
                                    </>
                                )}
                            </div>

                            {/* Right: Content */}
                            <div className="w-full md:w-2/3">
                                {content.descriptionContent && (
                                    <div className="prose prose-xl text-gray-600 leading-loose font-light tracking-wide">
                                        <p>
                                            {content.descriptionContent}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <br />
            <br />
            <br />
            <br />

            {/* Application Process Section */}


            {/* Service Types / Categories (Optional) */}
            {content.types && (
                <section className="py-20 bg-neutral-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {content.typesTitle && (
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900">{content.typesTitle}</h2>
                            </div>
                        )}
                        <div className="grid md:grid-cols-3 gap-8">
                            {content.types.map((item, index) => (
                                <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                                    <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                                        <item.icon className="w-7 h-7 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>
                                    <ul className="space-y-3">
                                        {item.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-sm text-gray-700 font-medium">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <br />
            <br />
            <br />
            <br />

            {/* --- PLANS SECTION --- */}
            <section id="plans" className="py-24 lg:py-32 relative bg-slate-50 border-y border-slate-200/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Transparent pricing tailored to your needs. No hidden fees.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {plans.map((plan, index) => ( // Use 'plans' state
                            <div
                                key={index}
                                onClick={() => handlePlanClick(plan)}
                                className={`
                                    relative bg-white rounded-xl border cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex flex-col
                                    ${plan.recommended ? 'border-accent ring-2 ring-accent/10' : 'border-gray-100 hover:border-blue-200'}
                                `}
                            >
                                {plan.recommended && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-3 py-0.5 rounded-full text-xs font-bold shadow-sm uppercase tracking-wider whitespace-nowrap">
                                        Best Value
                                    </div>
                                )}

                                <div className={`p-4 border-b border-gray-50 ${plan.recommended ? 'bg-accent/5' : ''}`}>
                                    <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                                    <div className="mt-2 flex items-baseline">
                                        <span className="text-3xl font-bold text-gray-900">
                                            {typeof plan.price === 'number' ? `₹${plan.price.toLocaleString()}` : plan.price}
                                        </span>
                                        {typeof plan.price === 'number' && <span className="text-gray-500 ml-1 text-xs font-medium">/ year</span>}
                                    </div>
                                    {plan.description && <p className="text-xs text-gray-500 mt-1">{plan.description}</p>}
                                </div>

                                <div className="p-4 flex-1 bg-gray-50/30">
                                    <ul className="space-y-3">
                                        {/* Show only top 5 features in card to keep height balanced */}
                                        {plan.features.slice(0, 5).map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <CheckCircle className="w-2.5 h-2.5 text-green-600" />
                                                </div>
                                                <span className="text-xs text-gray-700 leading-tight">{feature}</span>
                                            </li>
                                        ))}
                                        {plan.features.length > 5 && (
                                            <li className="text-[10px] text-blue-600 font-semibold pt-1 pl-6">
                                                + {plan.features.length - 5} more...
                                            </li>
                                        )}
                                    </ul>
                                </div>

                                <div className="p-4 mt-auto">
                                    <button
                                        className={`w-full py-2.5 rounded-lg text-sm font-bold transition-colors ${plan.recommended
                                            ? 'bg-accent text-white hover:bg-accent/90'
                                            : 'bg-white text-primary border border-primary hover:bg-primary hover:text-white'
                                            }`}
                                    >
                                        Select Plan
                                    </button>
                                </div>
                            </div>
                        ))}
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>
                </div>
            </section>

            {/* Application Process Section (Moved below Plans) */}
            {content.process && (
                <section className="py-24 lg:py-32 bg-white relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-display">How It Works</h2>
                            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
                                Simple, transparent, and efficient process to get your work done.
                            </p>
                        </div>

                        <br />
                        <br />
                        <div className="relative">
                            {/* Desktop Connected Line */}
                            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-0 -translate-y-1/2"></div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                                {content.process.map((step, idx) => (
                                    <div key={idx} className="flex flex-col items-center text-center group">
                                        <div className="w-20 h-20 bg-white border-4 border-white shadow-xl shadow-blue-900/5 rounded-full flex items-center justify-center text-2xl font-bold text-primary mb-8 group-hover:scale-110 group-hover:border-accent group-hover:text-accent transition-all duration-300 relative z-10">
                                            {idx + 1}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-accent transition-colors">{step.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}


            {/* Plan Details Modal */}
            {selectedPlan && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div
                        className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Left Side: Plan Info & Features */}
                        <div className="w-full md:w-5/12 bg-slate-50 border-r border-gray-200 flex flex-col">
                            <div className="p-8 border-b border-gray-200 bg-white">
                                <h3 className="text-2xl font-bold text-gray-900">{selectedPlan.name}</h3>
                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-primary">
                                        {typeof selectedPlan.price === 'number' ? `₹${selectedPlan.price.toLocaleString()}` : selectedPlan.price}
                                    </span>
                                    <span className="text-sm text-gray-500">Total Fee</span>
                                </div>
                            </div>

                            <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
                                <h4 className="font-semibold text-gray-900 mb-4">What's Included:</h4>
                                <ul className="space-y-3">
                                    {selectedPlan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <div className="bg-green-100 p-1 rounded-full flex-shrink-0 mt-0.5">
                                                <CheckCircle className="w-4 h-4 text-green-600" />
                                            </div>
                                            <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right Side: Terms & Content */}
                        <div className="w-full md:w-7/12 flex flex-col bg-white">
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <h4 className="font-bold text-gray-900">Plan Details</h4>
                                <button
                                    onClick={() => setSelectedPlan(null)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6 text-gray-500" />
                                </button>
                            </div>

                            <div className="p-8 overflow-y-auto flex-1 custom-scrollbar space-y-8">
                                {/* Checklist */}
                                {content.checklist && (
                                    <div>
                                        <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <FileText className="w-5 h-5 text-blue-500" />
                                            Document Checklist
                                        </h5>
                                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                            <ul className="space-y-2">
                                                {content.checklist.map((item, idx) => (
                                                    <li key={idx} className="text-sm text-blue-900 flex items-start gap-2">
                                                        <span className="font-bold text-blue-400">•</span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {/* Terms */}
                                {content.termsAndConditions && (
                                    <div>
                                        <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <AlertCircle className="w-5 h-5 text-orange-500" />
                                            Terms & Conditions
                                        </h5>
                                        <ul className="space-y-2">
                                            {content.termsAndConditions.map((term, idx) => (
                                                <li key={idx} className="text-xs text-gray-500 flex items-start gap-2">
                                                    <span>•</span>
                                                    {term}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="p-6 border-t border-gray-100 bg-gray-50">
                                <button
                                    onClick={handleProceedToPayment}
                                    className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2"
                                >
                                    Proceed to Filling Form <ArrowRight className="w-5 h-5" />
                                </button>
                                <p className="text-center text-xs text-gray-400 mt-3">
                                    Secure payment via Razorpay. Invoice generated instantly.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <br />
            <br />
            <br />
            <br />

            {/* Common Sections (Benefits, Docs, FAQs) */}
            <div className="bg-neutral-50 py-20 border-t border-gray-200">
                {/* This can be customized further, using standard blocks from ITR page */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Benefits */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us?</h3>
                            <div className="space-y-4">
                                {content.benefits.map((benefit, idx) => (
                                    <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span className="font-medium text-gray-700">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Critical or Docs */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Important Information</h3>
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                                <ul className="space-y-4">
                                    {content.criticalConsiderations?.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <div className="bg-orange-50 p-2 rounded-lg text-orange-600">
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                                                <p className="text-sm text-gray-500">{item.description}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQs Section (New) */}
            {content.faqs && (
                <section className="py-20 bg-white border-t border-gray-100">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                        </div>
                        <div className="space-y-4">
                            {content.faqs.map((faq, index) => (
                                <details
                                    key={index}
                                    className="bg-neutral-50 rounded-xl border border-gray-200 overflow-hidden group hover:bg-white hover:shadow-md transition-all"
                                >
                                    <summary className="px-6 py-4 cursor-pointer font-medium text-gray-900 flex items-center justify-between list-none">
                                        <span>{faq.q}</span>
                                        <ArrowRight className="w-5 h-5 text-gray-400 transform group-open:rotate-90 transition-transform" />
                                    </summary>
                                    <div className="px-6 pb-4 text-gray-600 leading-relaxed border-t border-gray-100 mt-2 pt-4">
                                        {faq.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
            )}

        </div>
    );
}
