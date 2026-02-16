import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';
import {
    Plus, Edit2, Trash2, ArrowLeft, Loader2, Save, X, ChevronDown, ChevronRight, Tag, DollarSign, ListChecks
} from 'lucide-react';
import { toast } from 'sonner';

interface Service {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    isActive: boolean;
    categoryId: number;
    plans?: ServicePlan[];
}

interface ServiceCategory {
    id: number;
    name: string;
    description: string;
    services: Service[];
}

interface PlanScope {
    id?: number;
    title: string;
    isIncluded: boolean;
}

interface ServicePlan {
    id?: number; // Optional because new plans won't have an ID
    planType: string;
    price: number;
    discountedPrice?: number;
    shortTitle?: string;
    scopeSummary?: string;
    isActive: boolean;
    scopes?: PlanScope[];
    displayOrder?: number;
}

export const AdminServices = () => {
    const navigate = useNavigate();
    const { adminUser } = useAdmin();
    const [categories, setCategories] = useState<ServiceCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedCategories, setExpandedCategories] = useState<Record<number, boolean>>({});

    // Service Modal & Form
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        categoryId: ''
    });

    // Plans Modal State
    const [isPlansModalOpen, setIsPlansModalOpen] = useState(false);
    const [selectedServiceForPlans, setSelectedServiceForPlans] = useState<Service | null>(null);
    const [plans, setPlans] = useState<ServicePlan[]>([]);
    const [loadingPlans, setLoadingPlans] = useState(false);
    const [editingPlanId, setEditingPlanId] = useState<number | null>(null); // Track which plan is being edited inline

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/categories`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Failed to fetch data');

            const data = await response.json();
            setCategories(data.categories || []);

            // Auto expand
            const expanded = (data.categories || []).reduce((acc: any, cat: any) => ({
                ...acc, [cat.id]: true
            }), {});
            setExpandedCategories(expanded);

        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to load services');
        } finally {
            setLoading(false);
        }
    };

    const fetchPlans = async (serviceId: number) => {
        try {
            setLoadingPlans(true);
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/services/${serviceId}/plans`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Failed to fetch plans');

            const data = await response.json();
            setPlans(data.plans || []);
        } catch (error) {
            console.error(error);
            toast.error("Could not load plans");
        } finally {
            setLoadingPlans(false);
        }
    };

    const handleOpenPlans = (service: Service) => {
        setSelectedServiceForPlans(service);
        setIsPlansModalOpen(true);
        fetchPlans(service.id);
    };

    const handleSaveAllPlans = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/services/${selectedServiceForPlans!.id}/plans`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    plans: plans
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || errorData.message || 'Failed to update plans');
            }

            const data = await response.json();
            toast.success('All plans updated successfully');
            setIsPlansModalOpen(false); // Close on success
            setPlans(data.plans || []);
            fetchData(); // Refresh main list to show updated prices
        } catch (error) {
            console.error(error);
            toast.error(error instanceof Error ? error.message : 'Failed to save plans');
        }
    };

    const handleAddPlan = () => {
        const newPlan: ServicePlan = {
            planType: 'CUSTOM',
            price: 0,
            isActive: true,
            scopes: [],
            displayOrder: plans.length
        };
        setPlans([...plans, newPlan]);
    };

    const handleDeletePlan = (index: number) => {
        if (window.confirm('Delete this plan?')) {
            const newPlans = plans.filter((_, i) => i !== index);
            setPlans(newPlans);
        }
    };

    const toggleCategory = (id: number) => {
        setExpandedCategories(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleCreate = () => {
        setEditingService(null);
        setFormData({ name: '', description: '', price: '', categoryId: categories.length > 0 ? categories[0].id.toString() : '' });
        setIsModalOpen(true);
    };

    const handleEdit = (service: Service, categoryId: number) => {
        setEditingService(service);
        setFormData({
            name: service.name,
            description: service.description,
            price: service.price ? service.price.toString() : '0',
            categoryId: categoryId.toString()
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const token = localStorage.getItem('adminToken');
            await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/services/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            toast.success('Service deleted');
            fetchData();
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('adminToken');
            const slug = formData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            const payload = {
                name: formData.name,
                slug,
                description: formData.description,
                price: parseFloat(formData.price),
                categoryId: parseInt(formData.categoryId),
                isActive: true
            };
            const url = editingService
                ? `${import.meta.env.VITE_API_BASE_URL}/admin/services/${editingService.id}`
                : `${import.meta.env.VITE_API_BASE_URL}/admin/services`;

            const res = await fetch(url, {
                method: editingService ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Failed');
            toast.success('Saved successfully');
            setIsModalOpen(false);
            fetchData();
        } catch (err) {
            toast.error('Failed to save');
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>;

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate('/admin/dashboard')} className="p-2 hover:bg-gray-100 rounded-full transition">
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Services & Plans</h1>
                            <p className="text-sm text-gray-500">Configure offerings and pricing tiers</p>
                        </div>
                    </div>
                    <button onClick={handleCreate} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 shadow-sm text-sm font-medium">
                        <Plus className="w-4 h-4" /> New Service
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
                {categories.map((category) => (
                    <div key={category.id} className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
                        <div className="p-4 bg-gray-50 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition" onClick={() => toggleCategory(category.id)}>
                            <div className="flex items-center gap-3">
                                {expandedCategories[category.id] ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
                                <h3 className="text-lg font-bold text-gray-800">{category.name}</h3>
                            </div>
                            <span className="text-xs font-semibold bg-gray-100 border border-gray-200 px-2 py-1 rounded-md text-gray-500">{category.services?.length || 0} Services</span>
                        </div>
                        {expandedCategories[category.id] && (
                            <div className="divide-y divide-gray-100">
                                {category.services?.map(service => (
                                    <div key={service.id} className="p-4 flex items-center justify-between hover:bg-blue-50/30 transition group">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-semibold text-gray-900">{service.name}</h4>
                                                {!service.isActive && <span className="text-[10px] bg-red-100 text-red-600 px-1 rounded">Inactive</span>}
                                            </div>
                                            <div className="flex items-center gap-3 mt-1.5">
                                                <div className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded border border-gray-200 flex items-center gap-1.5 flex-shrink-0">
                                                    <Tag className="w-3 h-3 text-gray-400" />
                                                    <span className="font-semibold text-gray-700">{service.plans?.filter((p: any) => p.isActive).length || 0}</span> Active
                                                    <span className="text-gray-300">|</span>
                                                    <span className="text-gray-500">{service.plans?.length || 0} Total</span>
                                                </div>
                                                <p className="text-sm text-gray-500 line-clamp-1">{service.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleOpenPlans(service); }}
                                                className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md border border-blue-200 flex items-center gap-1.5 transition shadow-sm"
                                            >
                                                <ListChecks className="w-3.5 h-3.5" /> Manage Plans
                                            </button>

                                            <div className="flex items-center gap-1 pl-2 border-l border-gray-200">
                                                <button onClick={(e) => { e.stopPropagation(); handleEdit(service, category.id); }} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition"><Edit2 className="w-4 h-4" /></button>
                                                <button onClick={(e) => { e.stopPropagation(); handleDelete(service.id); }} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Service Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-xl">{editingService ? 'Edit Service' : 'New Service'}</h3>
                            <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Service Name" className="w-full border p-2 rounded" required />
                            <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Description" className="w-full border p-2 rounded" />


                            {!editingService ? (
                                <input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} placeholder="Base Price (Initial Plan)" className="w-full border p-2 rounded" required />
                            ) : (
                                <div className="p-3 bg-yellow-50 text-yellow-800 text-sm rounded border border-yellow-200">
                                    <p>Pricing is managed through plans.</p>
                                    <p>Click "Plans" on the service list to update prices.</p>
                                </div>
                            )}

                            {/* Category Select Logic Omitted for Brevity in this specific block but in real code needs to be there */}
                            {!editingService && (
                                <select value={formData.categoryId} onChange={e => setFormData({ ...formData, categoryId: e.target.value })} className="w-full border p-2 rounded">
                                    <option value="">Select Category</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            )}
                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-primary text-black rounded">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* PLANS MANAGEMENT MODAL */}
            {isPlansModalOpen && selectedServiceForPlans && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-hidden">
                    <div className="bg-white rounded-lg shadow-2xl w-full max-w-[95vw] lg:max-w-7xl max-h-[70vh] flex flex-col animate-in zoom-in-95 duration-200">
                        {/* Header - Fixed at Top */}
                        <div className="px-4 py-2 border-b border-gray-200 bg-gray-50 flex justify-between items-center shrink-0">
                            <div>
                                <h2 className="font-bold text-base text-gray-900 flex items-center gap-2">
                                    <ListChecks className="w-4 h-4 text-blue-600" />
                                    <span className="truncate max-w-[200px] md:max-w-md">Plans: <span className="text-blue-700">{selectedServiceForPlans.name}</span></span>
                                </h2>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleAddPlan}
                                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs font-bold flex items-center gap-1 shadow-sm uppercase tracking-wide"
                                >
                                    <Plus className="w-3 h-3" /> Add
                                </button>
                                <button
                                    onClick={handleSaveAllPlans}
                                    className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-bold flex items-center gap-1 shadow-sm uppercase tracking-wide"
                                >
                                    <Save className="w-3 h-3" /> Save
                                </button>
                                <button
                                    onClick={() => setIsPlansModalOpen(false)}
                                    className="p-1 hover:bg-gray-200 rounded transition text-gray-500"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Content Area - Scrollable */}
                        <div className="flex-1 overflow-y-auto p-4 bg-gray-100/50 custom-scrollbar min-h-0">
                            {loadingPlans ? (
                                <div className="flex flex-col justify-center items-center py-20">
                                    <Loader2 className="animate-spin text-primary w-8 h-8 mb-2" />
                                    <p className="text-gray-500 text-sm">Loading plans...</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pb-10">
                                    {plans.map((plan, index) => {
                                        // Define theme colors based on index
                                        const themes = [
                                            { bg: 'bg-blue-600', light: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', ring: 'ring-blue-100' },
                                            { bg: 'bg-teal-600', light: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', ring: 'ring-teal-100' },
                                            { bg: 'bg-violet-600', light: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700', ring: 'ring-violet-100' },
                                            { bg: 'bg-amber-600', light: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', ring: 'ring-amber-100' },
                                        ];
                                        const theme = themes[index % themes.length];

                                        return (
                                            <div
                                                key={index}
                                                className={`bg-white rounded-lg border flex flex-col relative group transition-all duration-200 shadow-sm hover:shadow-md ${plan.isActive ? `${theme.border} ring-1 ${theme.ring}` : 'border-gray-200 opacity-70 grayscale'}`}
                                            >
                                                {/* Header with Light Theme for Visibility */}
                                                <div className={`${theme.light} border-b ${theme.border} rounded-t-lg p-2.5 flex justify-between items-center relative overflow-hidden`}>
                                                    <div className="flex items-center gap-2 z-10 w-full pr-8">
                                                        <div className="bg-white p-1 rounded-md mb-0.5 shadow-sm border border-gray-100">
                                                            <Tag className={`w-3.5 h-3.5 ${theme.text}`} />
                                                        </div>
                                                        <input
                                                            value={plan.planType}
                                                            onChange={(e) => {
                                                                const newPlans = plans.map((p, i) =>
                                                                    i === index ? { ...p, planType: e.target.value.toUpperCase() } : p
                                                                );
                                                                setPlans(newPlans);
                                                            }}
                                                            placeholder="PLAN NAME"
                                                            className="font-bold text-gray-900 uppercase text-xs w-full bg-transparent border-none focus:ring-0 p-0 placeholder-gray-400 tracking-wide"
                                                        />
                                                    </div>

                                                    {/* Delete Button - Shows on Hover, Right Side, Red */}
                                                    <button
                                                        onClick={() => handleDeletePlan(index)}
                                                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition-all duration-200 z-20 shadow-md opacity-0 group-hover:opacity-100"
                                                        title="Delete Plan"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                </div>

                                                {/* Plan Body */}
                                                <div className="p-2.5 flex-1 flex flex-col min-h-0 gap-2.5">

                                                    {/* Pricing Section */}
                                                    <div className="flex gap-2">
                                                        <div className="flex-1 space-y-0.5">
                                                            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Base Price</label>
                                                            <div className="relative group/input">
                                                                <input
                                                                    type="number"
                                                                    value={plan.price}
                                                                    className="w-full pl-2 pr-6 py-1 text-xs font-bold border border-gray-200 rounded focus:border-gray-400 focus:ring-0 transition-colors bg-gray-50 group-hover/input:bg-white h-7 text-right"
                                                                    placeholder="0"
                                                                    onChange={(e) => {
                                                                        const val = e.target.value === '' ? 0 : parseFloat(e.target.value);
                                                                        const newPlans = plans.map((p, i) =>
                                                                            i === index ? { ...p, price: val } : p
                                                                        );
                                                                        setPlans(newPlans);
                                                                    }}
                                                                />
                                                                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] font-medium">₹</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 space-y-0.5">
                                                            <label className={`text-[9px] font-bold ${theme.text} uppercase tracking-wider block`}>Offer Price</label>
                                                            <div className="relative group/input">
                                                                <input
                                                                    type="number"
                                                                    value={plan.discountedPrice || ''}
                                                                    placeholder="Optional"
                                                                    className={`w-full pl-2 pr-6 py-1 text-xs font-bold border ${theme.border} rounded focus:ring-1 ${theme.ring} focus:border-${theme.bg} text-gray-800 bg-white h-7 text-right`}
                                                                    onChange={(e) => {
                                                                        const val = e.target.value ? parseFloat(e.target.value) : undefined;
                                                                        const newPlans = plans.map((p, i) =>
                                                                            i === index ? { ...p, discountedPrice: val } : p
                                                                        );
                                                                        setPlans(newPlans);
                                                                    }}
                                                                />
                                                                <span className={`absolute right-2 top-1/2 -translate-y-1/2 ${theme.text} text-[10px] font-medium`}>₹</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Description */}
                                                    <div className="space-y-0.5">
                                                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Summary</label>
                                                        <textarea
                                                            rows={1}
                                                            value={plan.scopeSummary || ''}
                                                            placeholder="Brief description..."
                                                            className="w-full text-[10px] border border-gray-200 rounded px-2 py-1.5 focus:border-blue-400 focus:ring-0 resize-none h-7 min-h-[28px] overflow-hidden bg-gray-50/30 text-gray-600"
                                                            onChange={(e) => {
                                                                const val = e.target.value;
                                                                const newPlans = plans.map((p, i) =>
                                                                    i === index ? { ...p, scopeSummary: val } : p
                                                                );
                                                                setPlans(newPlans);
                                                            }}
                                                        />
                                                    </div>

                                                    {/* Features List Container - Fixed Height Small */}
                                                    <div className="border border-gray-200 rounded-lg overflow-hidden flex flex-col h-[100px] bg-white shadow-sm shrink-0">
                                                        <div className="flex justify-between items-center px-2 py-1.5 border-b border-gray-100 bg-gray-50/80 shrink-0">
                                                            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                                                                <ListChecks className="w-3 h-3" /> Features
                                                            </span>
                                                            <button
                                                                onClick={() => {
                                                                    const newScope: PlanScope = { title: 'New Feature', isIncluded: true };
                                                                    const newPlans = plans.map((p, i) => {
                                                                        if (i === index) {
                                                                            const newScopes = [...(p.scopes || [])];
                                                                            return { ...p, scopes: [...newScopes, newScope] };
                                                                        }
                                                                        return p;
                                                                    });
                                                                    setPlans(newPlans);
                                                                }}
                                                                className={`text-[9px] ${theme.text} hover:bg-white font-bold px-2 py-0.5 rounded border border-transparent hover:shadow-sm hover:border-gray-200 transition-all`}
                                                            >
                                                                + ADD
                                                            </button>
                                                        </div>

                                                        <div className="p-0 overflow-y-auto custom-scrollbar flex-1 relative bg-white">
                                                            {plan.scopes && plan.scopes.length > 0 ? (
                                                                <div className="divide-y divide-gray-50">
                                                                    {plan.scopes.map((scope, scopeIdx) => (
                                                                        <div key={scopeIdx} className="flex items-center gap-2 px-2 py-1 hover:bg-gray-50 group/item transition-colors">
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={scope.isIncluded}
                                                                                onChange={(e) => {
                                                                                    const val = e.target.checked;
                                                                                    const newPlans = plans.map((p, i) => {
                                                                                        if (i === index) {
                                                                                            const newScopes = [...(p.scopes || [])];
                                                                                            newScopes[scopeIdx] = { ...newScopes[scopeIdx], isIncluded: val };
                                                                                            return { ...p, scopes: newScopes };
                                                                                        }
                                                                                        return p;
                                                                                    });
                                                                                    setPlans(newPlans);
                                                                                }}
                                                                                className={`rounded text-green-600 w-2.5 h-2.5 flex-shrink-0 cursor-pointer border-gray-300 focus:ring-0 focus:ring-offset-0`}
                                                                            />
                                                                            <input
                                                                                type="text"
                                                                                value={scope.title}
                                                                                onChange={(e) => {
                                                                                    const val = e.target.value;
                                                                                    const newPlans = plans.map((p, i) => {
                                                                                        if (i === index) {
                                                                                            const newScopes = [...(p.scopes || [])];
                                                                                            newScopes[scopeIdx] = { ...newScopes[scopeIdx], title: val };
                                                                                            return { ...p, scopes: newScopes };
                                                                                        }
                                                                                        return p;
                                                                                    });
                                                                                    setPlans(newPlans);
                                                                                }}
                                                                                className="flex-1 text-[10px] border-none bg-transparent p-0 focus:ring-0 text-gray-700 h-auto leading-normal placeholder-gray-300"
                                                                                placeholder="Feature description..."
                                                                            />
                                                                            <button
                                                                                onClick={() => {
                                                                                    const newPlans = plans.map((p, i) => {
                                                                                        if (i === index) {
                                                                                            return { ...p, scopes: p.scopes?.filter((_, si) => si !== scopeIdx) };
                                                                                        }
                                                                                        return p;
                                                                                    });
                                                                                    setPlans(newPlans);
                                                                                }}
                                                                                className="text-gray-300 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity p-0.5 hover:bg-red-50 rounded"
                                                                            >
                                                                                <X className="w-2.5 h-2.5" />
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-50 p-4">
                                                                    <ListChecks className="w-5 h-5 text-gray-200 mb-1" />
                                                                    <p className="text-[9px] text-gray-400">No features.</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Plan Footer */}
                                                <div className={`p-2 border-t border-gray-100 ${theme.light} flex justify-between items-center rounded-b-lg`}>
                                                    <label className="flex items-center gap-2 cursor-pointer select-none hover:opacity-80 transition-opacity">
                                                        <div className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${plan.isActive ? 'bg-green-500' : 'bg-gray-300'}`}>
                                                            <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${plan.isActive ? 'translate-x-3.5' : 'translate-x-0.5'}`} />
                                                        </div>
                                                        <input
                                                            type="checkbox"
                                                            checked={plan.isActive}
                                                            onChange={(e) => {
                                                                const val = e.target.checked;
                                                                const newPlans = plans.map((p, i) =>
                                                                    i === index ? { ...p, isActive: val } : p
                                                                );
                                                                setPlans(newPlans);
                                                            }}
                                                            className="sr-only"
                                                        />
                                                        <span className={`font-bold text-[10px] uppercase ${plan.isActive ? 'text-green-700' : 'text-gray-400'}`}>{plan.isActive ? 'Active' : 'Draft'}</span>
                                                    </label>
                                                    <span className="text-[9px] font-mono text-gray-400">#{index + 1}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Footer - Always Visible Save Button */}
                        <div className="px-4 py-2 border-t border-gray-200 bg-white flex justify-end gap-2 shrink-0">
                            <button
                                onClick={() => setIsPlansModalOpen(false)}
                                className="px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveAllPlans}
                                className="px-4 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-bold flex items-center gap-1.5 shadow-sm"
                            >
                                <Save className="w-3.5 h-3.5" /> Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
