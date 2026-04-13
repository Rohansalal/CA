import React, { useState, useEffect } from 'react';
import {
    CheckCircle,
    ArrowRight,
    Clock,
    FileText,
    Shield,
    Star,
    Users,
    Award,
    Phone,
    ChevronDown,
    ChevronUp,
    Sparkles,
    Zap,
    Crown,
    TrendingUp,
    Building2,
    Loader2,
    AlertCircle,
    RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../user-panel/contexts/AuthContext';
import { useCart } from '../../user-panel/contexts/CartContext';

// --- Types ---
export interface ServicePlan {
    id?: number;
    name: string;
    price: string;
    originalPrice?: string;
    badge?: string;
    description?: string;
    features: string[];
    recommended?: boolean;
    popular?: boolean;
    icon?: React.ElementType;
}

export interface ProcessStep {
    step: string;
    title: string;
    description: string;
    time?: string;
}

export interface TrustBadge {
    icon: React.ElementType;
    text: string;
    subtext?: string;
}

export interface ServiceContent {
    // Hero Section
    title: string;
    subtitle: string;
    description: string;
    categoryBadge?: string;
    trustBadges?: TrustBadge[];
    heroStats?: { value: string; label: string }[];
    
    // Plans
    plans: ServicePlan[];
    plansTitle?: string;
    plansSubtitle?: string;
    
    // Benefits
    benefits: string[];
    benefitsTitle?: string;
    benefitsDescription?: string;
    
    // Process/Timeline
    process?: ProcessStep[];
    processTitle?: string;
    processSubtitle?: string;
    
    // Documents
    documents?: string[];
    documentsTitle?: string;
    documentsDescription?: string;
    
    // Additional Info (for complex services)
    additionalInfo?: { title: string; items: string[] }[];
    
    // FAQs
    faqs?: { q: string; a: string }[];
    faqsTitle?: string;
    
    // CTA
    ctaTitle?: string;
    ctaDescription?: string;
    ctaPrimaryButton?: string;
    ctaSecondaryButton?: string;
}

interface UnifiedServiceTemplateProps {
    serviceSlug: string;
    serviceId?: number;
    content: ServiceContent;
    // API Configuration for dynamic pricing
    apiConfig?: {
        endpoint: string;
        method?: 'GET' | 'POST';
        headers?: Record<string, string>;
        body?: object;
    };
    // Fallback content if API fails
    fallbackContent?: Partial<ServiceContent>;
}

export function UnifiedServiceTemplate({ 
    serviceSlug, 
    serviceId, 
    content: initialContent,
    apiConfig,
    fallbackContent 
}: UnifiedServiceTemplateProps) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { addToCart } = useCart();
    const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [isVisible, setIsVisible] = useState(false);
    
    // API State
    const [content, setContent] = useState<ServiceContent>(initialContent);
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    // Fetch pricing from API
    useEffect(() => {
        const fetchPricing = async () => {
            if (!apiConfig) return;
            
            setIsLoading(true);
            setApiError(null);
            
            try {
                const response = await fetch(apiConfig.endpoint, {
                    method: apiConfig.method || 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        ...apiConfig.headers
                    },
                    body: apiConfig.body ? JSON.stringify(apiConfig.body) : undefined
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                
                // Merge API data with initial content
                setContent(prev => ({
                    ...prev,
                    ...data,
                    // Use fallback if API returns empty plans
                    plans: data.plans?.length > 0 ? data.plans : (fallbackContent?.plans || prev.plans)
                }));
            } catch (error) {
                console.error('Failed to fetch pricing:', error);
                setApiError('Failed to load latest pricing. Showing default rates.');
                
                // Apply fallback content if available
                if (fallbackContent) {
                    setContent(prev => ({
                        ...prev,
                        ...fallbackContent,
                        plans: fallbackContent.plans || prev.plans
                    }));
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchPricing();
    }, [apiConfig, fallbackContent]);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handlePlanSelect = (plan: ServicePlan, index: number) => {
        setSelectedPlan(index);
        
        const priceValue = parseInt(plan.price.replace(/[^0-9]/g, '')) || 0;
        const planData = {
            id: plan.id,
            name: plan.name,
            price: priceValue,
            serviceSlug: serviceSlug,
            serviceId: serviceId,
            quantity: 1
        };
        addToCart(planData);

        if (isAuthenticated) {
            navigate('/dashboard', { state: { selectedServiceSlug: serviceSlug, selectedPlan: planData } });
        } else {
            navigate('/login', { state: { returnTo: '/dashboard', selectedServiceSlug: serviceSlug, selectedPlan: planData } });
        }
    };

    const scrollToPlans = () => {
        document.getElementById('plans-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    const defaultTrustBadges: TrustBadge[] = [
        { icon: Star, text: '4.9/5', subtext: 'Google Rating' },
        { icon: Users, text: '10,000+', subtext: 'Happy Clients' },
        { icon: Award, text: '15+ Years', subtext: 'Experience' },
        { icon: Shield, text: '100%', subtext: 'Secure' },
    ];

    const trustBadges = content.trustBadges || defaultTrustBadges;

    return (
        <div className="bg-white min-h-screen font-sans overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
                    <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {/* Left Content */}
                        <div>
                            {/* Category Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium mb-6 border border-white/20">
                                <Sparkles className="w-4 h-4 text-yellow-400" />
                                {content.categoryBadge || 'Professional Service'}
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                                {content.title}
                            </h1>
                            
                            {/* Subtitle */}
                            <p className="text-xl text-blue-100 mb-4">
                                {content.subtitle}
                            </p>
                            
                            {/* Description */}
                            <p className="text-lg text-blue-200/80 mb-8 leading-relaxed max-w-xl">
                                {content.description}
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4 mb-10">
                                <button
                                    onClick={scrollToPlans}
                                    className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all hover:-translate-y-1 flex items-center gap-2"
                                >
                                    View Plans
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                                    <Phone className="w-5 h-5 inline mr-2" />
                                    Talk to Expert
                                </button>
                            </div>

                            {/* Trust Badges */}
                            <div className="flex flex-wrap gap-6">
                                {trustBadges.map((badge, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                            <badge.icon className="w-5 h-5 text-amber-400" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-white">{badge.text}</div>
                                            {badge.subtext && <div className="text-xs text-blue-300">{badge.subtext}</div>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right - Quick Info Card */}
                        <div className="hidden lg:block">
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                                <div className="grid grid-cols-2 gap-6">
                                    {content.heroStats?.map((stat, idx) => (
                                        <div key={idx} className="text-center">
                                            <div className="text-3xl font-bold text-amber-400">{stat.value}</div>
                                            <div className="text-sm text-blue-200">{stat.label}</div>
                                        </div>
                                    )) || (
                                        <>
                                            <div className="text-center">
                                                <div className="text-3xl font-bold text-amber-400">3-7 Days</div>
                                                <div className="text-sm text-blue-200">Processing Time</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-3xl font-bold text-amber-400">100%</div>
                                                <div className="text-sm text-blue-200">Online Process</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-3xl font-bold text-amber-400">Expert</div>
                                                <div className="text-sm text-blue-200">Assisted</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-3xl font-bold text-amber-400">24/7</div>
                                                <div className="text-sm text-blue-200">Support</div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
                    </svg>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="plans-section" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold mb-4">
                            Pricing Plans
                        </span>
                        <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4">
                            {content.plansTitle || 'Choose Your Plan'}
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            {content.plansSubtitle || 'Transparent pricing with no hidden charges. Select the plan that best fits your needs.'}
                        </p>
                        
                        {/* API Error Message */}
                        {apiError && (
                            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-lg text-sm">
                                <AlertCircle className="w-4 h-4" />
                                {apiError}
                                <button 
                                    onClick={() => window.location.reload()}
                                    className="ml-2 text-amber-800 hover:text-amber-900 underline"
                                >
                                    Retry
                                </button>
                            </div>
                        )}
                        
                        {/* Loading Indicator */}
                        {isLoading && (
                            <div className="mt-4 flex items-center justify-center gap-2 text-blue-600">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span className="text-sm">Loading latest pricing...</span>
                            </div>
                        )}
                    </div>

                    {/* Pricing Cards - Loading Skeleton */}
                    {isLoading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 animate-pulse">
                                    <div className="w-12 h-12 bg-slate-200 rounded-xl mb-4" />
                                    <div className="h-6 bg-slate-200 rounded w-3/4 mb-2" />
                                    <div className="h-8 bg-slate-200 rounded w-1/2 mb-4" />
                                    <div className="space-y-2">
                                        {[1, 2, 3, 4].map((j) => (
                                            <div key={j} className="h-4 bg-slate-200 rounded w-full" />
                                        ))}
                                    </div>
                                    <div className="h-12 bg-slate-200 rounded-xl mt-6" />
                                </div>
                            ))}
                        </div>
                    ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {content.plans.map((plan, index) => {
                            const Icon = plan.icon || (index === 0 ? Zap : index === 1 ? TrendingUp : index === 2 ? Crown : Building2);
                            const isPopular = plan.popular || plan.recommended;
                            
                            return (
                                <div
                                    key={index}
                                    className={`relative rounded-2xl transition-all duration-300 hover:-translate-y-2 ${
                                        isPopular 
                                            ? 'bg-gradient-to-br from-slate-900 to-blue-900 text-white shadow-2xl scale-105 z-10' 
                                            : 'bg-white border border-slate-200 text-slate-900 hover:shadow-xl'
                                    }`}
                                >
                                    {/* Badge */}
                                    {plan.badge && (
                                        <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-bold ${
                                            isPopular ? 'bg-amber-500 text-white' : 'bg-blue-100 text-blue-700'
                                        }`}>
                                            {plan.badge}
                                        </div>
                                    )}
                                    
                                    <div className="p-6">
                                        {/* Icon */}
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                                            isPopular ? 'bg-white/10' : 'bg-blue-50'
                                        }`}>
                                            <Icon className={`w-6 h-6 ${isPopular ? 'text-amber-400' : 'text-blue-600'}`} />
                                        </div>

                                        {/* Plan Name */}
                                        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                        
                                        {/* Price */}
                                        <div className="mb-4">
                                            <span className={`text-3xl font-bold ${isPopular ? 'text-white' : 'text-slate-900'}`}>
                                                {plan.price}
                                            </span>
                                            {plan.originalPrice && (
                                                <span className="text-sm text-slate-400 line-through ml-2">
                                                    {plan.originalPrice}
                                                </span>
                                            )}
                                        </div>

                                        {/* Description */}
                                        {plan.description && (
                                            <p className={`text-sm mb-4 ${isPopular ? 'text-blue-200' : 'text-slate-600'}`}>
                                                {plan.description}
                                            </p>
                                        )}

                                        {/* Features */}
                                        <ul className="space-y-3 mb-6">
                                            {plan.features.map((feature, fidx) => (
                                                <li key={fidx} className="flex items-start gap-2 text-sm">
                                                    <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                                                        isPopular ? 'text-amber-400' : 'text-green-500'
                                                    }`} />
                                                    <span className={isPopular ? 'text-blue-100' : 'text-slate-600'}>
                                                        {feature}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* CTA Button */}
                                        <button
                                            onClick={() => handlePlanSelect(plan, index)}
                                            className={`w-full py-3 rounded-xl font-semibold transition-all ${
                                                isPopular
                                                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:shadow-orange-500/30'
                                                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                                            }`}
                                        >
                                            Get Started
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    )}
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left - Image/Graphic */}
                        <div className="relative">
                            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white">
                                <Award className="w-16 h-16 text-amber-400 mb-6" />
                                <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
                                <p className="text-blue-100">
                                    With over 15 years of experience and 10,000+ satisfied clients, 
                                    we provide end-to-end professional services with complete transparency.
                                </p>
                                <div className="mt-6 flex gap-4">
                                    <div className="bg-white/10 backdrop-blur rounded-lg px-4 py-2">
                                        <div className="font-bold">15+</div>
                                        <div className="text-xs text-blue-200">Years Exp.</div>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur rounded-lg px-4 py-2">
                                        <div className="font-bold">10K+</div>
                                        <div className="text-xs text-blue-200">Clients</div>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur rounded-lg px-4 py-2">
                                        <div className="font-bold">4.9</div>
                                        <div className="text-xs text-blue-200">Rating</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right - Benefits List */}
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                                {content.benefitsTitle || 'Key Benefits'}
                            </h2>
                            <p className="text-lg text-slate-600 mb-8">
                                {content.benefitsDescription || 'Discover why thousands of businesses trust our services'}
                            </p>
                            
                            <div className="grid sm:grid-cols-2 gap-4">
                                {content.benefits.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        </div>
                                        <span className="text-slate-700 font-medium">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            {content.process && content.process.length > 0 && (
                <section className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold mb-4">
                                How It Works
                            </span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                                {content.processTitle || 'Simple Process'}
                            </h2>
                            <p className="text-lg text-slate-600">
                                {content.processSubtitle || 'Get started in just a few easy steps'}
                            </p>
                        </div>

                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200 hidden md:block" />
                            
                            <div className="space-y-8">
                                {content.process.map((step, index) => (
                                    <div key={index} className="relative flex gap-6">
                                        {/* Step Number */}
                                        <div className="hidden md:flex w-16 h-16 bg-blue-600 rounded-full items-center justify-center text-white font-bold text-xl flex-shrink-0 z-10">
                                            {index + 1}
                                        </div>
                                        <div className="md:hidden w-10 h-10 bg-blue-600 rounded-full items-center justify-center text-white font-bold flex-shrink-0">
                                            {index + 1}
                                        </div>
                                        
                                        {/* Content Card */}
                                        <div className="flex-1 bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                                                {step.time && (
                                                    <span className="flex items-center gap-1 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                                        <Clock className="w-4 h-4" />
                                                        {step.time}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-slate-600">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Documents Section */}
            {content.documents && content.documents.length > 0 && (
                <section className="py-20 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Documents Required */}
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                                    {content.documentsTitle || 'Documents Required'}
                                </h2>
                                <p className="text-slate-600 mb-6">
                                    {content.documentsDescription || 'Keep these documents ready for quick processing'}
                                </p>
                                <div className="space-y-3">
                                    {content.documents.map((doc, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm"
                                        >
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <FileText className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <span className="text-slate-700 font-medium">{doc}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Additional Info Cards */}
                            <div className="space-y-6">
                                {content.additionalInfo?.map((info, idx) => (
                                    <div key={idx} className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
                                        <h3 className="text-xl font-bold mb-4">{info.title}</h3>
                                        <ul className="space-y-2">
                                            {info.items.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-white">
                                                    <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )) || (
                                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
                                        <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                                        <p className="text-white/90 mb-4">
                                            Our experts are available to guide you through the document collection process.
                                        </p>
                                        <button className="flex items-center gap-2 text-amber-400 font-semibold hover:text-amber-300 transition-colors">
                                            <Phone className="w-5 h-5" />
                                            Schedule a Free Call
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* FAQs Section */}
            {content.faqs && content.faqs.length > 0 && (
                <section className="py-20 bg-white">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold mb-4">
                                FAQs
                            </span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                                {content.faqsTitle || 'Frequently Asked Questions'}
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {content.faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className={`border rounded-xl overflow-hidden transition-all ${
                                        openFaq === index ? 'border-blue-500 shadow-md' : 'border-slate-200'
                                    }`}
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                                    >
                                        <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                                        {openFaq === index ? (
                                            <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                        )}
                                    </button>
                                    {openFaq === index && (
                                        <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>
                
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                        {content.ctaTitle || 'Ready to Get Started?'}
                    </h2>
                    <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto">
                        {content.ctaDescription || 'Join thousands of satisfied clients. Get your service done right the first time.'}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={scrollToPlans}
                            className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            {content.ctaPrimaryButton || 'Get Started Now'}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                            <Phone className="w-5 h-5" />
                            {content.ctaSecondaryButton || 'Talk to Expert'}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default UnifiedServiceTemplate;
