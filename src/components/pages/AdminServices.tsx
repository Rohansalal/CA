import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';
import {
    Plus, Edit2, Trash2, ArrowLeft, Loader2, Save, X, ChevronDown, ChevronRight, Tag, DollarSign
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
}

interface ServiceCategory {
    id: number;
    name: string;
    description: string;
    services: Service[];
}

export const AdminServices = () => {
    const navigate = useNavigate();
    const { admin } = useAdmin();
    const [categories, setCategories] = useState<ServiceCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedCategories, setExpandedCategories] = useState<Record<number, boolean>>({});

    // Modal & Form State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        categoryId: ''
    });

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

            // Auto expand all categories by default
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

    const toggleCategory = (id: number) => {
        setExpandedCategories(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleCreate = () => {
        setEditingService(null);
        setFormData({
            name: '',
            description: '',
            price: '',
            categoryId: categories.length > 0 ? categories[0].id.toString() : ''
        });
        setIsModalOpen(true);
    };

    const handleEdit = (service: Service, categoryId: number) => {
        setEditingService(service);
        setFormData({
            name: service.name,
            description: service.description,
            price: service.price.toString(),
            categoryId: categoryId.toString()
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this service?')) return;

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/services/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to delete service');
            }

            toast.success('Service deleted successfully');
            fetchData();
        } catch (error: any) {
            console.error('Error:', error);
            toast.error(error.message);
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

            const method = editingService ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Failed to save service');

            toast.success(editingService ? 'Service updated' : 'Service created');
            setIsModalOpen(false);
            fetchData();
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to save service');
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>;

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/admin/dashboard')} className="p-2 hover:bg-gray-100 rounded-full">
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Manage Services</h1>
                            <p className="text-sm text-gray-500">Add, update, or remove services and prices</p>
                        </div>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add New Service
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="space-y-6">
                    {categories.map((category) => (
                        <div key={category.id} className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
                            <div
                                className="p-4 bg-gray-50 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition"
                                onClick={() => toggleCategory(category.id)}
                            >
                                <div className="flex items-center gap-3">
                                    {expandedCategories[category.id] ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">{category.name}</h3>
                                        <p className="text-xs text-gray-500">{category.description}</p>
                                    </div>
                                </div>
                                <span className="text-xs font-semibold bg-gray-200 px-2 py-1 rounded text-gray-600">
                                    {category.services ? category.services.length : 0} Services
                                </span>
                            </div>

                            {/* Services List inside Category */}
                            {expandedCategories[category.id] && (
                                <div className="divide-y divide-gray-100">
                                    {category.services && category.services.length > 0 ? (
                                        category.services.map(service => (
                                            <div key={service.id} className="p-4 flex items-center justify-between hover:bg-blue-50/30 transition group">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-semibold text-gray-900">{service.name}</h4>
                                                        {!service.isActive && <span className="text-[10px] bg-red-100 text-red-600 px-1 rounded">Inactive</span>}
                                                    </div>
                                                    <p className="text-sm text-gray-500 line-clamp-1">{service.description}</p>
                                                </div>

                                                <div className="flex items-center gap-6">
                                                    <div className="text-right">
                                                        <p className="text-xs text-gray-500 uppercase font-semibold">Price</p>
                                                        <p className="font-bold text-gray-900">
                                                            ₹{service.price !== undefined ? service.price : 'N/A'}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleEdit(service, category.id); }}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                                            title="Edit"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleDelete(service.id); }}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-8 text-center text-gray-400 text-sm">No services in this category.</div>
                                    )}
                                    <div className="p-3 bg-gray-50 text-center border-t border-gray-100">
                                        <button
                                            onClick={() => {
                                                setEditingService(null);
                                                setFormData({ name: '', description: '', price: '', categoryId: category.id.toString() });
                                                setIsModalOpen(true);
                                            }}
                                            className="text-sm text-primary font-medium flex items-center justify-center gap-1 hover:underline"
                                        >
                                            <Plus className="w-4 h-4" /> Add Service to {category.name}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-gray-900">{editingService ? 'Edit Service' : 'New Service'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                                <input
                                    type="text" required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    placeholder="e.g. GST Registration"
                                />
                            </div>

                            {!editingService && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select
                                        value={formData.categoryId}
                                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    placeholder="Brief description of the service..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                    <input
                                        type="number" required min="0" step="0.01"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition shadow-lg shadow-primary/30 flex items-center gap-2">
                                    <Save className="w-4 h-4" /> Save Service
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};


