import React, { useState } from 'react';
import {
    CheckCircle,
    X,
    ChevronRight,
    ArrowRight,
    Shield,
    FileText,
    AlertCircle,
    Zap,
    Clock,
    Phone
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../user-panel/contexts/AuthContext';
import { useCart } from '../../user-panel/contexts/CartContext';


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
    
    // New Detailed Content Fields
    serviceDetails?: { title: string, description: string, icon: React.ElementType }[];
    timeline?: { stage: string, duration: string }[];
}

interface ServiceTemplateProps {
    serviceSlug: string; // for routing/backend
    serviceId?: number; // Added for backend integration
    content: ServiceContent;
}

export function ServiceTemplate({ serviceSlug, serviceId, content }: ServiceTemplateProps) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { addToCart } = useCart();
    const [selectedPlan, setSelectedPlan] = useState<ServicePlan | null>(null);
    const [plans, setPlans] = useState<ServicePlan[]>(content.plans); // Initialize with static content

    // Update plans if content changes (e.g. after fetch in parent)
    React.useEffect(() => {
        setPlans(content.plans);
    }, [content.plans]);

    const handlePlanClick = (plan: ServicePlan) => {
        setSelectedPlan(plan);
    };

    const handleAddToCart = (plan: ServicePlan) => {
        const priceValue = typeof plan.price === 'string'
            ? parseInt(plan.price.toString().replace(/[^0-9]/g, '')) || 0
            : plan.price;

        const planData = {
            id: plan.id,
            name: plan.name,
            price: priceValue,
            serviceSlug: serviceSlug,
            serviceId: serviceId,
            quantity: 1
        };
        addToCart(planData);
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
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div>
                            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-semibold mb-6 border border-white/20">
                                {content.title}
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
                                {content.subtitle}
                            </h1>
                            <p className="text-xl text-blue-100 leading-relaxed mb-8">
                                {content.description}
                            </p>

                            {content.heroFeatures && (
                                <div className="flex flex-wrap gap-4 mb-8">
                                    {content.heroFeatures.map((feat, idx) => (
                                        <div key={idx} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-sm">
                                            <feat.icon className="w-5 h-5 text-accent" />
                                            <span className="font-medium">{feat.text}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <button
                                onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 bg-accent hover:bg-accent/90 text-white font-bold rounded-xl shadow-lg shadow-accent/20 transition-all flex items-center gap-2"
                            >
                                View Plans <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Right Form */}
                        <div className="bg-white rounded-2xl p-8 shadow-2xl">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Started Now</h3>
                            <p className="text-black mb-6">Fill in your details and our expert will call you back</p>
                            
                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="Enter your name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-gray-900 placeholder-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-1">Email Address</label>
                                    <input 
                                        type="email" 
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-gray-900 placeholder-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-1">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        placeholder="Enter your phone"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-gray-900 placeholder-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-1">Service Interested In</label>
                                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-gray-900 bg-white">
                                        <option value="" className="text-gray-900">Select a service</option>
                                        <option value="basic" className="text-gray-900">Basic Plan</option>
                                        <option value="standard" className="text-gray-900">Standard Plan</option>
                                        <option value="premium" className="text-gray-900">Premium Plan</option>
                                    </select>
                                </div>
                                <button 
                                    type="submit"
                                    onClick={() => navigate('/login')}
                                    className="w-full py-4 bg-accent hover:bg-accent/90 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                                >
                                    <Phone className="w-5 h-5" />
                                    Request Callback
                                </button>
                            </form>
                            <p className="text-xs text-black mt-4 text-center">
                                By submitting, you agree to our Terms & Privacy Policy
                            </p>
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
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        {content.descriptionTitle && (
                            <div className="mb-10 flex flex-col items-center">
                                <div className="inline-block p-4 bg-blue-50 rounded-full mb-6">
                                    <FileText className="w-8 h-8 text-primary" />
                                </div>
                                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4 font-display">
                                    {content.descriptionTitle}
                                </h2>
                                <div className="h-1.5 w-24 bg-accent rounded-full mx-auto"></div>
                            </div>
                        )}

                        {content.descriptionContent && (
                            <div className="prose prose-xl text-gray-600 leading-loose font-light tracking-wide mx-auto text-center">
                                <p>
                                    {content.descriptionContent}
                                </p>
                            </div>
                        )}
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

            {/* Detailed Service Info Section */}
            {(content.documentsRequired || content.dataRequired) && (
                <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Service Details</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Everything you need to know about our {content.title} service
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Documents Required */}
                            {content.documentsRequired && (
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                    <div className="bg-blue-600 px-6 py-4">
                                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                            <FileText className="w-6 h-6" />
                                            Documents Required
                                        </h3>
                                    </div>
                                    <div className="p-6">
                                        <ul className="space-y-3">
                                            {content.documentsRequired.map((doc, idx) => (
                                                <li key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                                                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <span className="text-white text-xs font-bold">{idx + 1}</span>
                                                    </div>
                                                    <span className="text-gray-700">{doc}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* Data/Information Required */}
                            {content.dataRequired && (
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                    <div className="bg-green-600 px-6 py-4">
                                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                            <Shield className="w-6 h-6" />
                                            Information We Need
                                        </h3>
                                    </div>
                                    <div className="p-6">
                                        <ul className="space-y-3">
                                            {content.dataRequired.map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                                                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <span className="text-white text-xs font-bold">{idx + 1}</span>
                                                    </div>
                                                    <span className="text-gray-700">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Additional Service Details */}
                        {content.serviceDetails && (
                            <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <Zap className="w-6 h-6 text-amber-500" />
                                    Service Features & Inclusions
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {content.serviceDetails.map((detail, idx) => (
                                        <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <detail.icon className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 mb-1">{detail.title}</h4>
                                                <p className="text-sm text-gray-600">{detail.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Timeline Info */}
                        {content.timeline && (
                            <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <Clock className="w-6 h-6" />
                                    Processing Timeline
                                </h3>
                                <div className="grid md:grid-cols-4 gap-4">
                                    {content.timeline.map((item, idx) => (
                                        <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                                            <div className="text-3xl font-bold mb-2">{item.duration}</div>
                                            <div className="text-sm text-white/80">{item.stage}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            <br />
            <br />
            <br />
            <br />

            {/* --- PLANS SECTION --- */}
            {/* --- PLANS SECTION --- */}
            <section id="plans" className="relative" style={{ background: "#ffffff", padding: "50px 20px 60px", fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0f172a" }}>
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600&display=swap');
                    .pricing-card {
                        transition: transform 0.25s, box-shadow 0.25s;
                    }
                    .pricing-card:hover {
                        transform: translateY(-6px);
                    }
                `}</style>
                <div className="max-w-7xl mx-auto">
                    <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 72px" }}>
                        <div
                            style={{
                                display: "inline-block",
                                background: "#dbeafe",
                                color: "#ffffff",
                                fontSize: 11.5,
                                fontWeight: 600,
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                                padding: "6px 16px",
                                borderRadius: 99,
                                marginBottom: 22,
                                border: "1px solid #bfdbfe",
                            }}
                        >
                            Pricing Plans
                        </div>
                        <h2
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "clamp(34px, 4.5vw, 52px)",
                                fontWeight: 600,
                                lineHeight: 1.15,
                                color: "#0d3b82",
                                marginBottom: 16,
                            }}
                        >
                            Simple pricing,{" "}
                            <span style={{ color: "#2563eb" }}>powerful results</span>
                        </h2>
                        <p style={{ fontSize: 15.5, fontWeight: 400, color: "#64748b", lineHeight: 1.75 }}>
                            Transparent plans designed for individuals, teams, and enterprises.
                            Start free — upgrade anytime, no hidden charges.
                        </p>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                            gap: 20,
                            maxWidth: 1280,
                            margin: "0 auto",
                            alignItems: "stretch"
                        }}
                    >
                        {plans.map((plan, index) => {
                            const featured = plan.recommended;
                            return (
                                <div
                                    key={index}
                                    onClick={() => handlePlanClick(plan)}
                                    className="pricing-card"
                                    style={{
                                        background: featured ? "#0d3b82" : "#ffffff",
                                        borderRadius: 18,
                                        border: `1.5px solid ${featured ? "#0d3b82" : "#bfdbfe"}`,
                                        padding: "32px 24px 36px",
                                        position: "relative",
                                        display: "flex",
                                        flexDirection: "column",
                                        cursor: "pointer",
                                        boxShadow: featured ? "0 16px 48px rgba(13,59,130,0.32)" : "none",
                                    }}
                                    onMouseEnter={(e) => {
                                        if (featured) {
                                            e.currentTarget.style.boxShadow = "0 24px 60px rgba(13,59,130,0.40)";
                                        } else {
                                            e.currentTarget.style.boxShadow = "0 20px 50px rgba(37,99,235,0.12)";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (featured) {
                                            e.currentTarget.style.boxShadow = "0 16px 48px rgba(13,59,130,0.32)";
                                        } else {
                                            e.currentTarget.style.boxShadow = "none";
                                        }
                                    }}
                                >
                                    {/* Popular Badge */}
                                    {featured && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: -1,
                                                right: 28,
                                                background: featured ? "#f59e0b" : "#2563eb",
                                                color: "#fff",
                                                fontSize: 10.5,
                                                fontWeight: 600,
                                                letterSpacing: "0.08em",
                                                textTransform: "uppercase",
                                                padding: "5px 14px",
                                                borderRadius: "0 0 10px 10px",
                                            }}
                                        >
                                            Most Popular
                                        </div>
                                    )}

                                    {/* Tier */}
                                    <p
                                        style={{
                                            fontSize: 11,
                                            fontWeight: 700,
                                            letterSpacing: "0.16em",
                                            textTransform: "uppercase",
                                            color: featured ? "rgba(255,255,255,0.5)" : "#1a56c4",
                                            marginBottom: 20,
                                        }}
                                    >
                                        {plan.name}
                                    </p>

                                    {/* Price */}
                                    <div style={{ display: "flex", alignItems: "flex-start", gap: 4, lineHeight: 1, marginBottom: 6 }}>
                                        <span
                                            style={{
                                                fontSize: 22,
                                                fontWeight: 600,
                                                color: featured ? "rgba(255,255,255,0.75)" : "#0d3b82",
                                                marginTop: 6,
                                            }}
                                        >
                                            ₹
                                        </span>
                                        <span
                                            style={{
                                                fontFamily: "'Playfair Display', serif",
                                                fontSize: 54,
                                                fontWeight: 600,
                                                color: featured ? "#ffffff" : "#0d3b82",
                                                letterSpacing: "-0.02em",
                                                lineHeight: 1,
                                            }}
                                        >
                                            {typeof plan.price === 'number' ? plan.price.toLocaleString() : plan.price}
                                        </span>
                                        {typeof plan.price === 'number' && (
                                            <span
                                                style={{
                                                    fontSize: 13,
                                                    fontWeight: 400,
                                                    color: featured ? "rgba(255,255,255,0.4)" : "#94a3b8",
                                                    marginTop: "auto",
                                                    marginBottom: 8,
                                                }}
                                            >
                                                &nbsp;/ year
                                            </span>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <p
                                        style={{
                                            fontSize: 13.5,
                                            fontWeight: 400,
                                            color: featured ? "rgba(255,255,255,0.6)" : "#64748b",
                                            lineHeight: 1.65,
                                            marginBottom: 28,
                                            minHeight: 42,
                                        }}
                                    >
                                        {plan.description}
                                    </p>

                                    {/* Divider */}
                                    <div
                                        style={{
                                            height: 1,
                                            background: featured ? "rgba(255,255,255,0.12)" : "#bfdbfe",
                                            marginBottom: 28,
                                        }}
                                    />

                                    {/* Features */}
                                    <ul style={{ listStyle: "none", marginBottom: 40, display: "flex", flexDirection: "column", gap: 13, flex: 1 }}>
                                        {plan.features.map((f, i) => (
                                            <li
                                                key={i}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "flex-start",
                                                    gap: 11,
                                                    fontSize: 14,
                                                    fontWeight: 400,
                                                    color: featured ? "rgba(255,255,255,0.82)" : "#334155",
                                                    lineHeight: 1.4,
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        flexShrink: 0,
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: "50%",
                                                        background: featured ? "rgba(255,255,255,0.12)" : "#eff6ff",
                                                        border: `1.5px solid ${featured ? "rgba(255,255,255,0.2)" : "#bfdbfe"}`,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                                        <path
                                                            d="M1 4l2.5 2.5L9 1"
                                                            stroke={featured ? "#93c5fd" : "#2563eb"}
                                                            strokeWidth="1.6"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </span>
                                                <span>{f}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA Button */}
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "8px",
                                            width: "100%",
                                            padding: "14px 20px",
                                            textAlign: "center",
                                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                                            fontSize: 14,
                                            fontWeight: 700,
                                            letterSpacing: "0.02em",
                                            borderRadius: 10,
                                            cursor: "pointer",
                                            textDecoration: "none",
                                            border: "none",
                                            color: "#ffffff",
                                            background: featured ? "#ffffff" : "linear-gradient(to right, #f97316, #ea580c)",
                                            boxShadow: featured ? "none" : "0 4px 12px rgba(249, 115, 22, 0.3)",
                                            transition: "all 0.22s",
                                            marginTop: "auto"
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!featured) {
                                                e.currentTarget.style.background = "linear-gradient(to right, #ea580c, #c2410c)";
                                                e.currentTarget.style.boxShadow = "0 6px 16px rgba(249, 115, 22, 0.4)";
                                                e.currentTarget.style.transform = "translateY(-1px)";
                                            } else {
                                                e.currentTarget.style.background = "#f3f4f6";
                                                e.currentTarget.style.color = "#0d3b82";
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!featured) {
                                                e.currentTarget.style.background = "linear-gradient(to right, #f97316, #ea580c)";
                                                e.currentTarget.style.boxShadow = "0 4px 12px rgba(249, 115, 22, 0.3)";
                                                e.currentTarget.style.transform = "translateY(0)";
                                            } else {
                                                e.currentTarget.style.background = "#ffffff";
                                                e.currentTarget.style.color = "#0d3b82";
                                            }
                                        }}
                                        onClick={(e) => { e.stopPropagation(); handleAddToCart(plan); }}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ flexShrink: 0 }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                        </svg>
                                        Add to Cart
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <p
                        style={{ textAlign: "center", marginTop: 44, fontSize: 13.5, fontWeight: 400, color: "#94a3b8" }}
                    >
                        All prices are inclusive of GST &nbsp;·&nbsp; Secure checkout &nbsp;·&nbsp; No hidden fees
                    </p>
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





