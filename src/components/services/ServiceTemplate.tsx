import React, { useState } from 'react';
import {
    CheckCircle,
    X,
    ChevronRight,
    ArrowRight,
    Shield,
    FileText,
    AlertCircle,
    ShoppingCart
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
    const [toastMessage, setToastMessage] = useState<string | null>(null);

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

        const cartItem = {
            id: plan.id || Date.now() + Math.random(),
            name: plan.name,
            price: priceValue,
            serviceSlug: serviceSlug,
            serviceId: serviceId,
            gst: priceValue * 0.18,
            total: priceValue * 1.18,
        };

        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
        existingCart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(existingCart));

        window.dispatchEvent(new Event('cartUpdated'));

        setToastMessage(`${plan.name} has been added to your cart.`);
        setTimeout(() => setToastMessage(null), 3500);
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
                                color: "#000000ffff",
                                fontSize: 11.5,
                                fontWeight: 600,
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                                padding: "6px 16px",
                                borderRadius: 99,
                                marginBottom: 22,
                                border: "1px solid #000000ff",
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

                                    {typeof plan.price === 'number' && (
                                        <div style={{ fontSize: 13, fontWeight: 500, color: featured ? "rgba(255,255,255,0.8)" : "#059669", marginBottom: 16 }}>
                                            ₹{(plan.price * 1.18).toLocaleString(undefined, { maximumFractionDigits: 0 })} <span style={{ fontSize: 11, fontWeight: 400, color: featured ? "rgba(255,255,255,0.6)" : "#64748b" }}>(incl. 18% GST)</span>
                                        </div>
                                    )}

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

                                    {/* CTA Buttons */}
                                    <div style={{ display: "flex", gap: "10px", marginTop: "auto", width: "100%", position: "relative", zIndex: 20 }}>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleAddToCart(plan); }}
                                            className={`flex-1 flex items-center justify-center gap-2 py-3 px-2 rounded-xl font-bold text-[13px] transition-all duration-300 shadow-sm border-2 ${featured ? 'bg-[#0d3b82] border-white/30 text-white hover:bg-white/10 hover:border-white' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600'}`}
                                            title="Add this plan to your cart"
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                            Add to Cart
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handlePlanClick(plan); document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' }); }}
                                            className={`flex-1 py-3 px-2 rounded-xl font-bold text-[13px] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 ${featured ? 'bg-white text-[#0d3b82] hover:bg-gray-100' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                                            title="View plan details and proceed"
                                        >
                                            Select Plan
                                        </button>
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

            {/* Tax & Financial Compliances Recommended Sub-services */}
            {window.location.pathname.includes('tax-compliances') && (
                <section className="py-16 bg-blue-50/50 border-t border-b border-blue-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-10">
                            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 font-display">Recommended Tax Compliances</h3>
                            <p className="text-gray-500 max-w-2xl mx-auto">Explore other essential tax services that fit perfectly with your current selection.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {[
                                { name: 'ITR Filing', link: '/services/tax-compliances/itr-filing', icon: FileText },
                                { name: 'Advance Tax Calculation', link: '/services/tax-compliances/advance-tax-calculation', icon: Shield },
                                { name: 'TDS Return Filing', link: '/services/tax-compliances/tds-return-filing', icon: AlertCircle },
                                { name: 'GST Return Filing', link: '/services/tax-compliances/gst-return-filing', icon: FileText },
                                { name: 'GST Annual Return', link: '/services/tax-compliances/gst-annual-return', icon: CheckCircle }
                            ].map((sub, i) => (
                                <div key={i} onClick={() => { navigate(sub.link); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center gap-3 group">
                                    <div className="w-12 h-12 bg-blue-50 group-hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                                        <sub.icon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-sm group-hover:text-blue-600 transition-colors leading-tight mb-1">{sub.name}</h4>
                                        <span className="text-xs text-blue-500 font-medium">View details →</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

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
                <div
                    className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm transition-all animate-in fade-in duration-300"
                    onClick={() => setSelectedPlan(null)}
                >
                    <div
                        className="bg-white rounded-t-3xl sm:rounded-[2rem] w-full max-w-4xl max-h-[92vh] sm:max-h-[85vh] shadow-2xl flex flex-col animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300 overflow-hidden relative mt-auto sm:m-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Mobile handle indicator */}
                        <div className="w-full flex justify-center pt-3 pb-1 sm:hidden absolute top-0 left-0 z-20 pointer-events-none">
                            <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
                        </div>

                        {/* Shared Scrollable area for mobile vertical stacking */}
                        <div className="flex-1 overflow-y-auto w-full custom-scrollbar flex flex-col md:flex-row pt-8 sm:pt-0 relative">
                            {/* Left Side: Plan Info & Features */}
                            <div className="w-full md:w-5/12 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col flex-shrink-0">
                                <div className="p-5 sm:p-8 border-b border-slate-200 bg-white relative">
                                    {/* Mobile Close Button */}
                                    <button
                                        onClick={() => setSelectedPlan(null)}
                                        className="md:hidden absolute top-2 right-2 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors z-10"
                                    >
                                        <X className="w-4 h-4 text-slate-600" />
                                    </button>

                                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 pr-8 md:pr-0 mt-2 sm:mt-0">{selectedPlan.name}</h3>
                                    <div className="mt-2.5 sm:mt-3 flex flex-col gap-1 sm:gap-1.5">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl sm:text-3xl font-bold text-blue-600 tabular-nums tracking-tight">
                                                {typeof selectedPlan.price === 'number' ? `₹${selectedPlan.price.toLocaleString('en-IN')}` : selectedPlan.price}
                                            </span>
                                            <span className="text-[11px] sm:text-sm font-medium text-slate-500 uppercase tracking-wider">Base Fee</span>
                                        </div>
                                        {typeof selectedPlan.price === 'number' && (
                                            <div className="text-[11px] sm:text-sm font-semibold text-emerald-600 bg-emerald-50 w-fit px-2 py-0.5 rounded-md border border-emerald-100 mt-1">
                                                Total ₹{(selectedPlan.price * 1.18).toLocaleString('en-IN', { maximumFractionDigits: 0 })} (incl. 18% GST)
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-5 sm:p-8 flex-1">
                                        <h4 className="font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                                            <CheckCircle className="w-4 h-4 text-blue-500" /> What's Included:
                                        </h4>
                                        <ul className="space-y-3 sm:space-y-3.5">
                                            {selectedPlan.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-3 group">
                                                    <div className="bg-emerald-100/80 p-1 rounded-full flex-shrink-0 mt-0.5 border border-emerald-200/50 group-hover:bg-emerald-200 transition-colors">
                                                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                                                    </div>
                                                    <span className="text-[13px] sm:text-[15px] text-slate-700 leading-relaxed font-medium">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Right Side: Terms & Content */}
                                <div className="w-full md:w-7/12 flex flex-col bg-white flex-shrink-0 border-t sm:border-t-0 border-slate-100 pb-4">
                                    <div className="hidden md:flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
                                        <h4 className="font-bold text-slate-900 text-lg">Plan Details</h4>
                                        <button
                                            onClick={() => setSelectedPlan(null)}
                                            className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full transition-colors"
                                        >
                                            <X className="w-5 h-5 text-slate-500" />
                                        </button>
                                    </div>

                                    <div className="p-5 sm:p-8 space-y-6 sm:space-y-8">
                                        {/* Checklist */}
                                        {content.checklist && (
                                            <div>
                                                <h5 className="font-semibold text-slate-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                                                    <FileText className="w-4.5 h-4.5 text-blue-500" />
                                                    Required Documents
                                                </h5>
                                                <div className="bg-blue-50/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-blue-100/50">
                                                    <ul className="space-y-2.5">
                                                        {content.checklist.map((item, idx) => (
                                                            <li key={idx} className="text-[13px] sm:text-sm text-blue-900/80 flex items-start gap-2.5 font-medium leading-relaxed">
                                                                <span className="text-blue-400 mt-1 sm:mt-0.5 text-[10px] sm:text-xs">▶</span>
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
                                                <h5 className="font-semibold text-slate-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                                                    <AlertCircle className="w-4.5 h-4.5 text-amber-500" />
                                                    Terms & Conditions
                                                </h5>
                                                <ul className="space-y-2.5 bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-100">
                                                    {content.termsAndConditions.map((term, idx) => (
                                                        <li key={idx} className="text-xs sm:text-[13px] text-slate-600 flex items-start gap-2.5 leading-relaxed">
                                                            <span className="text-slate-400 mt-0.5">•</span>
                                                            {term}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Fixed Actions Bottom Bar */}
                        <div className="p-4 sm:p-6 border-t border-slate-100 bg-white w-full z-20 flex-shrink-0 shadow-[0_-15px_30px_-15px_rgba(0,0,0,0.1)]">
                            <button
                                onClick={handleProceedToPayment}
                                className="w-full py-4 bg-blue-600 text-white font-bold text-[15px] sm:text-[16px] rounded-xl hover:bg-blue-500 shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
                            >
                                Proceed to Form <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] sm:text-xs font-medium text-slate-400">
                                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                                <span>Secure checkout & instant invoice</span>
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

                    {/* Professional Toast Notification */}
                    {toastMessage && (
                        <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 left-4 sm:left-auto z-[9999] animate-in slide-in-from-bottom-5 fade-in duration-300">
                            <div className="bg-white border-[0.5px] border-emerald-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl p-4 sm:pr-12 flex items-start gap-3.5 relative max-w-sm w-full mx-auto">
                                <div className="bg-emerald-500 rounded-full p-1.5 flex-shrink-0 shadow-sm shadow-emerald-500/20 mt-0.5">
                                    <CheckCircle className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-[15px] leading-snug">Added to Cart!</h4>
                                    <p className="text-[13px] text-slate-500 mt-1 leading-relaxed font-medium">{toastMessage}</p>
                                </div>
                                <button
                                    onClick={() => setToastMessage(null)}
                                    className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            );
}
