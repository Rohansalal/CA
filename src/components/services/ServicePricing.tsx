import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ServicePricingProps {
    serviceSlug: string;
    serviceName: string; // Used for navigation state
    fallbackContent?: React.ReactNode;
}

export function ServicePricing({ serviceSlug, serviceName, fallbackContent }: ServicePricingProps) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [serviceData, setServiceData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchService = async () => {
            try {
                // Ensure the URL is correct based on environment
                const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
                const response = await fetch(`${baseUrl}/services/${serviceSlug}`);
                const data = await response.json();
                if (data.service) setServiceData(data.service);
            } catch (e) {
                console.error("Failed to fetch service pricing", e);
            } finally {
                setLoading(false);
            }
        };
        fetchService();
    }, [serviceSlug]);

    const handleStartRegistration = async (plan?: any) => {
        if (!isAuthenticated) {
            const state = {
                selectedService: serviceName,
                selectedServiceSlug: serviceSlug,
                selectedPlan: plan ? {
                    name: plan.planType,
                    price: plan.discountedPrice || plan.price,
                    id: plan.id
                } : undefined
            };
            navigate('/login', { state: { returnTo: '/dashboard', ...state } });
            return;
        }

        // Call API to create order
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/services/select`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({
                    serviceId: serviceData.id,
                    planId: plan.id
                })
            });

            if (!response.ok) {
                throw new Error('Failed to select service');
            }

            const data = await response.json();

            // Redirect to dashboard with order ID
            navigate('/dashboard', {
                state: {
                    orderId: data.orderId,
                    selectedService: serviceName,
                    selectedPlan: plan.planType
                }
            });

        } catch (error) {
            console.error('Error selecting service:', error);
            alert('Failed to select service. Please try again.');
        }
    };

    if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>;

    if (!serviceData || !serviceData.plans || serviceData.plans.length === 0) {
        return <>{fallbackContent}</>;
    }

    // Sort plans: BASIC, STANDARD, PREMIUM, ELITE, then others
    const sortOrder = { 'BASIC': 1, 'STANDARD': 2, 'PREMIUM': 3, 'ELITE': 4 };
    const sortedPlans = [...serviceData.plans].sort((a, b) => {
        const oA = sortOrder[a.planType as keyof typeof sortOrder] || 99;
        const oB = sortOrder[b.planType as keyof typeof sortOrder] || 99;
        return oA - oB || (a.displayOrder || 0) - (b.displayOrder || 0);
    });

    return (
        <div>
            <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl text-primary mb-4">Choose Your Plan</h2>
                <p className="text-lg text-neutral-600">Select the package that fits your business needs</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {sortedPlans.map((plan: any) => (
                    <div key={plan.id} className={`bg-white rounded-xl shadow-lg border flex flex-col relative h-full ${plan.planType === 'PREMIUM' ? 'border-accent shadow-xl scale-[1.02] z-10' : 'border-gray-200'}`}>
                        {plan.planType === 'PREMIUM' && (
                            <div className="bg-accent text-white text-center py-1 text-[10px] font-bold uppercase tracking-wider absolute top-0 w-full rounded-t-xl">Most Popular</div>
                        )}
                        <div className={`p-5 flex flex-col h-full ${plan.planType === 'PREMIUM' ? 'pt-8' : ''}`}>
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tight">{plan.planType}</h3>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-2 min-h-[2.5em]">{plan.shortTitle || plan.scopeSummary}</p>
                            </div>

                            <div className="mb-4">
                                {plan.discountedPrice ? (
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold text-primary">₹{Math.floor(Number(plan.discountedPrice)).toLocaleString('en-IN')}</span>
                                        <span className="text-xs text-gray-400 line-through">₹{Math.floor(Number(plan.price)).toLocaleString('en-IN')}</span>
                                    </div>
                                ) : (
                                    <span className="text-2xl font-bold text-primary">₹{Math.floor(Number(plan.price)).toLocaleString('en-IN')}</span>
                                )}
                                <span className="text-[10px] text-gray-500 block mt-1 font-medium">+ Govt Fees Actuals</span>
                            </div>

                            <button
                                onClick={() => handleStartRegistration(plan)}
                                className={`w-full py-2.5 rounded-lg font-bold text-sm mb-4 transition-all shadow-sm ${plan.planType === 'PREMIUM'
                                    ? 'bg-accent text-white hover:bg-accent/90 shadow-md hover:shadow-lg'
                                    : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                                    }`}
                            >
                                Get Started
                            </button>

                            <div className="flex-1 min-h-0 border-t border-gray-100 pt-3 mt-1">
                                <p className="text-[10px] font-bold text-gray-900 uppercase mb-2">Includes:</p>
                                <ul className="space-y-1.5 overflow-y-auto max-h-[140px] pr-1 custom-scrollbar">
                                    {plan.scopes && plan.scopes.length > 0 ? (
                                        <>
                                            {plan.scopes.filter((s: any) => s.isIncluded).map((scope: any, idx: number) => (
                                                <li key={`inc-${idx}`} className="flex items-start gap-2 text-xs text-gray-600">
                                                    <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                                                    <span className="leading-tight">{scope.title}</span>
                                                </li>
                                            ))}
                                            {plan.scopes.filter((s: any) => !s.isIncluded).map((scope: any, idx: number) => (
                                                <li key={`exc-${idx}`} className="flex items-start gap-2 text-xs text-gray-400 opacity-60">
                                                    <div className="w-3.5 h-3.5 flex items-center justify-center rounded-full border border-gray-300 flex-shrink-0 mt-0.5">
                                                        <span className="text-[8px] font-bold">×</span>
                                                    </div>
                                                    <span className="leading-tight">{scope.title}</span>
                                                </li>
                                            ))}
                                        </>
                                    ) : (
                                        <p className="text-xs text-gray-400 italic">Core features included</p>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
