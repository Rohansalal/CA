import React, { useEffect, useState } from 'react';
import { X, Check, Loader2 } from 'lucide-react';
import { useAuth } from '../../user-panel/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface PlanScope {
    id: number;
    title: string;
    isIncluded: boolean;
}

interface ServicePlan {
    id: number;
    planType: string;
    price: string;
    discountedPrice?: string;
    shortTitle?: string;
    scopeSummary?: string;
    scopes: PlanScope[];
}

interface PlanSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    serviceName: string; // We'll try to find by name or slug
}

export const PlanSelectionModal: React.FC<PlanSelectionModalProps> = ({ isOpen, onClose, serviceName }) => {
    const [plans, setPlans] = useState<ServicePlan[]>([]);
    const [loading, setLoading] = useState(true);
    const [serviceId, setServiceId] = useState<number | null>(null);
    const { isAuthenticated } = useAuth(); // Assuming useAuth provides auth status
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen && serviceName) {
            fetchPlans();
        }
    }, [isOpen, serviceName]);

    const fetchPlans = async () => {
        try {
            setLoading(true);
            // First find service by slug/name
            const slug = serviceName.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/services/slug/${slug}`, {
                credentials: 'include'
            });

            if (!res.ok) throw new Error('Service not found');

            const data = await res.json();
            setServiceId(data.service.id);
            setPlans(data.service.plans || []);
        } catch (error) {
            console.error(error);
            toast.error('Could not load plans');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectPlan = async (plan: ServicePlan) => {
        if (!isAuthenticated) {
            // Redirect to login with return path
            navigate('/login', { state: { returnTo: window.location.pathname, openPlanModal: serviceName } });
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/orders/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    serviceId: serviceId,
                    planId: plan.id
                }),
                credentials: 'include'
            });

            if (!response.ok) throw new Error('Failed to initiate order');

            const data = await response.json();
            const orderId = data.order.id;

            // Redirect to document upload unified page
            navigate(`/dashboard/order/${orderId}/submit-details`);

        } catch (error) {
            console.error(error);
            toast.error('Failed to create order');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Select a Plan</h2>
                        <p className="text-gray-500 text-sm mt-1">{serviceName}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                            <p className="text-gray-500">Loading plans...</p>
                        </div>
                    ) : plans.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-gray-500">No active plans found for this service.</p>
                            <p className="text-sm text-gray-400 mt-2">Please contact support for custom pricing.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {plans.map((plan) => (
                                <div key={plan.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col hover:border-primary/50 transition-all duration-300 relative group">
                                    {/* Badge */}
                                    {plan.planType === 'PREMIUM' || plan.planType === 'ELITE' ? (
                                        <div className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                                            RECOMMENDED
                                        </div>
                                    ) : null}

                                    <div className="p-6 border-b border-gray-50">
                                        <h3 className="text-sm font-bold text-primary uppercase tracking-wide mb-2">{plan.shortTitle || plan.planType}</h3>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-bold text-gray-900">₹{plan.discountedPrice || plan.price}</span>
                                            {plan.discountedPrice && (
                                                <span className="text-sm text-gray-400 line-through">₹{plan.price}</span>
                                            )}
                                        </div>
                                        {plan.scopeSummary && (
                                            <p className="text-sm text-gray-500 mt-3 leading-relaxed">{plan.scopeSummary}</p>
                                        )}
                                    </div>

                                    <div className="p-6 flex-1 bg-gray-50/30">
                                        <ul className="space-y-3">
                                            {plan.scopes.map((scope) => (
                                                <li key={scope.id} className="flex items-start gap-3">
                                                    <div className={`mt-0.5 rounded-full p-0.5 ${scope.isIncluded ? 'text-green-600 bg-green-100' : 'text-gray-300 bg-gray-100'}`}>
                                                        {scope.isIncluded ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                                                    </div>
                                                    <span className={`text-sm ${scope.isIncluded ? 'text-gray-700 font-medium' : 'text-gray-400 line-through'}`}>
                                                        {scope.title}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="p-6 pt-0 mt-auto bg-gray-50/30">
                                        <button
                                            onClick={() => handleSelectPlan(plan)}
                                            className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-all transform hover:-translate-y-1 shadow-md hover:shadow-lg"
                                        >
                                            Choose Plan
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};





