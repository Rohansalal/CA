import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle, X, ArrowRight, Tag, Zap, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../user-panel/contexts/AuthContext';
import { useCart } from '../../user-panel/contexts/CartContext';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../utils/api';

interface ServicePricingProps {
    serviceSlug: string;
    serviceName: string;
    fallbackContent?: React.ReactNode;
}

const PLAN_CONFIG: Record<string, { gradient: string; badge?: string; ring: string; labelColor: string; cta: string }> = {
    BASIC: {
        gradient: 'from-slate-50 to-white',
        ring: 'ring-slate-200',
        labelColor: 'text-slate-700',
        cta: 'bg-slate-800 hover:bg-slate-700',
    },
    STANDARD: {
        gradient: 'from-blue-50 to-white',
        ring: 'ring-blue-200',
        labelColor: 'text-blue-700',
        cta: 'bg-blue-600 hover:bg-blue-700',
    },
    PREMIUM: {
        gradient: 'from-indigo-600 to-blue-700',
        badge: 'Most Popular',
        ring: 'ring-indigo-500',
        labelColor: 'text-white',
        cta: 'bg-white hover:bg-indigo-50 !text-indigo-700',
    },
    ELITE: {
        gradient: 'from-amber-50 to-orange-50',
        badge: 'Best Value',
        ring: 'ring-amber-300',
        labelColor: 'text-amber-800',
        cta: 'bg-amber-500 hover:bg-amber-600',
    },
};

export function ServicePricing({ serviceSlug, serviceName, fallbackContent }: ServicePricingProps) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { addToCart } = useCart();
    const [serviceData, setServiceData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [addingToCart, setAddingToCart] = useState<string | null>(null);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await api.get(`/services/slug/${serviceSlug}`);
                if (response.data.service) setServiceData(response.data.service);
            } catch (e) {
                console.error('Failed to fetch service pricing', e);
            } finally {
                setLoading(false);
            }
        };
        fetchService();
    }, [serviceSlug]);

    const handleBuyNow = async (plan?: any) => {
        const planData = plan ? {
            name: plan.planType,
            price: plan.discountedPrice || plan.price,
            id: plan.id,
            serviceSlug,
            serviceId: serviceData?.id,
        } : undefined;

        if (!isAuthenticated) {
            navigate('/login', {
                state: { returnTo: '/dashboard', selectedService: serviceName, selectedServiceSlug: serviceSlug, selectedPlan: planData },
            });
            return;
        }

        try {
            const response = await api.post('/services/select', { serviceId: serviceData.id, planId: plan.id });
            navigate('/dashboard', { state: { orderId: response.data.orderId, selectedService: serviceName, selectedPlan: plan.planType } });
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to select service. Please try again.');
        }
    };

    const handleAddToCart = async (plan: any) => {
        setAddingToCart(plan.id);
        addToCart({
            id: plan.id,
            name: plan.planType,
            price: plan.discountedPrice || plan.price,
            serviceSlug,
            serviceId: serviceData?.id,
            quantity: 1,
        });
        setTimeout(() => setAddingToCart(null), 700);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Loader2 className="animate-spin w-8 h-8 text-primary" />
                <p className="text-sm text-gray-500 font-medium">Loading plans...</p>
            </div>
        );
    }

    if (!serviceData || !serviceData.plans || serviceData.plans.length === 0) {
        return <>{fallbackContent}</>;
    }

    const sortOrder: Record<string, number> = { BASIC: 1, STANDARD: 2, PREMIUM: 3, ELITE: 4 };
    const sortedPlans = [...serviceData.plans].sort((a, b) => {
        const oA = sortOrder[a.planType] ?? 99;
        const oB = sortOrder[b.planType] ?? 99;
        return oA - oB || (a.displayOrder || 0) - (b.displayOrder || 0);
    });

    return (
        <section className="py-4">
            {/* Section Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-primary/5 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                    <Zap className="w-3.5 h-3.5" />
                    Transparent Pricing
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Choose Your Plan</h2>
                <p className="text-gray-500 text-base max-w-xl mx-auto">
                    All plans include GST filing, expert CA support, and a dedicated account manager.
                </p>
            </div>

            {/* Plans Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
                {sortedPlans.map((plan: any) => {
                    const config = PLAN_CONFIG[plan.planType] ?? PLAN_CONFIG.BASIC;
                    const isPremium = plan.planType === 'PREMIUM';
                    const discountPct = plan.discountedPrice && plan.price
                        ? Math.round((1 - Number(plan.discountedPrice) / Number(plan.price)) * 100)
                        : 0;
                    const isAdding = addingToCart === plan.id;

                    return (
                        <div
                            key={plan.id}
                            className={`relative flex flex-col rounded-2xl overflow-hidden ring-1 ${config.ring} shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl duration-300 ${isPremium ? 'lg:-mt-4 lg:mb-0' : ''}`}
                        >
                            {/* Badge */}
                            {config.badge && (
                                <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md z-10 ${isPremium ? 'bg-white text-indigo-700' : 'bg-amber-500 text-white'}`}>
                                    {config.badge}
                                </div>
                            )}

                            {/* Card Header */}
                            <div className={`bg-gradient-to-br ${config.gradient} px-6 pt-${config.badge ? '8' : '6'} pb-6`}>
                                <p className={`text-[11px] font-black uppercase tracking-[0.2em] mb-1 ${isPremium ? 'text-indigo-200' : 'text-gray-400'}`}>
                                    {plan.planType}
                                </p>
                                <h3 className={`text-base font-bold leading-snug mb-3 min-h-[2.8em] ${isPremium ? 'text-white' : 'text-gray-800'}`}>
                                    {plan.shortTitle || plan.scopeSummary || 'Professional Package'}
                                </h3>

                                {/* Price */}
                                <div className="mb-2">
                                    {plan.discountedPrice ? (
                                        <div className="flex items-baseline gap-2 flex-wrap">
                                            <span className={`text-3xl font-black ${isPremium ? 'text-white' : 'text-gray-900'}`}>
                                                ₹{Math.floor(Number(plan.discountedPrice)).toLocaleString('en-IN')}
                                            </span>
                                            <span className={`text-sm line-through ${isPremium ? 'text-indigo-200' : 'text-gray-400'}`}>
                                                ₹{Math.floor(Number(plan.price)).toLocaleString('en-IN')}
                                            </span>
                                            {discountPct > 0 && (
                                                <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full ${isPremium ? 'bg-green-400/20 text-green-300' : 'bg-green-100 text-green-700'}`}>
                                                    <Tag className="w-2.5 h-2.5" />
                                                    {discountPct}% OFF
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <span className={`text-3xl font-black ${isPremium ? 'text-white' : 'text-gray-900'}`}>
                                            ₹{Math.floor(Number(plan.price)).toLocaleString('en-IN')}
                                        </span>
                                    )}
                                    <p className={`text-[10px] mt-1 font-medium ${isPremium ? 'text-indigo-200' : 'text-gray-400'}`}>
                                        + Govt. fees at actuals
                                    </p>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className={`px-5 py-4 flex flex-col gap-2.5 ${isPremium ? 'bg-indigo-700' : 'bg-white'}`}>
                                {/* Add to Cart */}
                                <button
                                    onClick={() => handleAddToCart(plan)}
                                    disabled={isAdding}
                                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm border-2 transition-all duration-200 active:scale-95
                                        ${isPremium
                                            ? 'border-white/30 text-white hover:bg-white/10'
                                            : 'border-primary/20 text-primary hover:border-primary hover:bg-primary/5'
                                        } ${isAdding ? 'opacity-70' : ''}`}
                                >
                                    {isAdding ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <ShoppingCart className="w-4 h-4" />
                                    )}
                                    {isAdding ? 'Added!' : 'Add to Cart'}
                                </button>

                                {/* Buy Now */}
                                <button
                                    onClick={() => handleBuyNow(plan)}
                                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm text-white transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 ${config.cta}`}
                                >
                                    Get Started
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Features */}
                            <div className="flex-1 bg-white px-5 pt-4 pb-5 border-t border-gray-100">
                                <p className={`text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-1.5 ${isPremium ? 'text-indigo-600' : 'text-gray-500'}`}>
                                    <ShieldCheck className="w-3 h-3" />
                                    What's Included
                                </p>
                                <ul className="space-y-2 overflow-y-auto max-h-[160px] pr-1 custom-scrollbar">
                                    {plan.scopes && plan.scopes.length > 0 ? (
                                        <>
                                            {plan.scopes.filter((s: any) => s.isIncluded).map((scope: any, idx: number) => (
                                                <li key={`inc-${idx}`} className="flex items-start gap-2 text-xs text-gray-700">
                                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                                    <span className="leading-snug">{scope.title}</span>
                                                </li>
                                            ))}
                                            {plan.scopes.filter((s: any) => !s.isIncluded).map((scope: any, idx: number) => (
                                                <li key={`exc-${idx}`} className="flex items-start gap-2 text-xs text-gray-300">
                                                    <X className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                                                    <span className="leading-snug line-through">{scope.title}</span>
                                                </li>
                                            ))}
                                        </>
                                    ) : (
                                        <p className="text-xs text-gray-400 italic">Core professional features included</p>
                                    )}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Trust Footer */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 font-medium">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Secure payments via Razorpay</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-blue-500" /> CA-certified services</span>
                <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-amber-500" /> 24-48hr processing</span>
            </div>
        </section>
    );
}
