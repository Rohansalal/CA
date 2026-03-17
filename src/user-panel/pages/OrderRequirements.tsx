import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, X, CheckCircle, ArrowRight, Save, ClipboardList } from 'lucide-react';
import { toast } from 'sonner';

export const OrderRequirements = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const [order, setOrder] = useState<any>(null);

    useEffect(() => {
        fetchOrder();
    }, [id]);

    const fetchOrder = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/orders/${id}`, {
                credentials: 'include'
            });
            if (res.ok) {
                const data = await res.json();
                setOrder(data.order);
            }
        } catch (err) {
            console.error('Failed to load order', err);
        }
    };

    // Dynamic form requirements based on Service and Plan
    const isITRBasic = order?.items?.[0]?.serviceName?.toLowerCase().includes('itr') || 
                       order?.items?.[0]?.serviceName?.toLowerCase().includes('income tax');
    const planType = order?.items?.[0]?.planType?.toUpperCase();
    const isBasicPlan = planType === 'BASIC';

    const getFormFields = () => {
        if (isITRBasic && isBasicPlan) {
            return [
                { label: 'Mobile No.', name: 'mobileNo', type: 'tel', required: true },
                { label: 'Email Id', name: 'emailId', type: 'email', required: true },
                { label: 'PAN Number', name: 'panNumber', type: 'text', required: false },
                { label: 'Aadhaar Number', name: 'aadhaarNumber', type: 'text', required: false },
                { label: 'Other notes / Remarks', name: 'remarks', type: 'textarea', required: false }
            ];
        }

        // Default (Incorporation etc.)
        return [
            { label: 'Proposed Company Name (Option 1)', name: 'companyName1', type: 'text', required: true },
            { label: 'Proposed Company Name (Option 2)', name: 'companyName2', type: 'text', required: false },
            { label: 'Principal Business Activity', name: 'activity', type: 'textarea', required: true },
            { label: 'Authorized Capital (in INR)', name: 'capital', type: 'number', required: true },
            { label: 'Director Details (Brief)', name: 'directors', type: 'textarea', required: true }
        ];
    };

    const formFields = getFormFields();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/orders/${id}/requirements`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ requirements: formData }),
                credentials: 'include'
            });

            if (!res.ok) throw new Error('Submission failed');

            // Update local order status or simply redirect
            toast.success('Requirements submitted successfully!');
            navigate('/dashboard'); // Or to Order Status page if it exists

        } catch (err) {
            console.error(err);
            toast.error('Failed to submit requirements');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Progress Steps */}
                <div className="mb-8 flex justify-center items-center space-x-4 text-sm font-medium text-gray-500">
                    <span className="flex items-center gap-1 text-green-600"><CheckCircle className="w-5 h-5" /> Service</span>
                    <div className="h-px w-8 bg-green-200"></div>
                    <span className="flex items-center gap-1 text-green-600"><CheckCircle className="w-5 h-5" /> Documents</span>
                    <div className="h-px w-8 bg-green-200"></div>
                    <span className="text-primary font-bold flex items-center gap-1"><div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">3</div> Requirements</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Plan Details */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-8">
                            <div className="bg-gray-900 text-white p-6">
                                <h2 className="text-xl font-bold">Plan Details</h2>
                                <p className="text-gray-400 text-sm mt-1">Your selected package</p>
                            </div>

                            <div className="p-6">
                                {order?.items?.[0] && (
                                    <>
                                        <div className="mb-6">
                                            <h3 className="text-lg font-bold text-gray-900">{order.items[0].plan?.shortTitle || order.items[0].plan?.planType}</h3>
                                            <p className="text-primary font-bold text-2xl mt-1">₹{order.items[0].price}</p>
                                            {order.items[0].plan?.scopeSummary && (
                                                <p className="text-sm text-gray-500 mt-2 leading-relaxed border-t border-gray-100 pt-2">
                                                    {order.items[0].plan.scopeSummary}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Included Features:</h4>
                                            <ul className="space-y-3">
                                                {order.items[0].plan?.scopes?.map((scope: any) => (
                                                    <li key={scope.id} className="flex items-start gap-3 text-sm">
                                                        <div className={`mt-0.5 rounded-full p-0.5 flex-shrink-0 ${scope.isIncluded ? 'text-green-600 bg-green-100' : 'text-gray-400 bg-gray-100'}`}>
                                                            {scope.isIncluded ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                                                        </div>
                                                        <span className={`${scope.isIncluded ? 'text-gray-700' : 'text-gray-400 line-through'}`}>{scope.title}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Requirements Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            <div className="bg-primary px-8 py-6">
                                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <ClipboardList className="w-6 h-6" /> Additional Details
                                </h1>
                                <p className="text-primary-100 mt-2">Please provide the following details to proceed with your application.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                <div className="grid gap-6">
                                    {formFields.map((field) => (
                                        <div key={field.name}>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {field.label} {field.required && <span className="text-red-500">*</span>}
                                            </label>
                                            {field.type === 'textarea' ? (
                                                <textarea
                                                    name={field.name}
                                                    required={field.required}
                                                    onChange={handleChange}
                                                    rows={3}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                                                />
                                            ) : (
                                                <input
                                                    type={field.type}
                                                    name={field.name}
                                                    required={field.required}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-6 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => navigate(-1)}
                                        className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-all disabled:opacity-70 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        {loading ? 'Submitting...' : 'Submit & Finish'} <Save className="w-4 h-4" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};









