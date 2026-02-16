import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FileText, Upload, CheckCircle, ArrowRight, X, AlertCircle, Check } from 'lucide-react';
import { toast } from 'sonner';

export const OrderDocuments = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [documents, setDocuments] = useState<any[]>([]);
    const [order, setOrder] = useState<any>(null);

    // Mock required documents - should come from backend ideally based on Service
    const requiredDocs = [
        { name: 'PAN Card', key: 'pan_card' },
        { name: 'Aadhaar Card', key: 'aadhaar_card' },
        { name: 'Address Proof', key: 'address_proof' }
    ];

    useEffect(() => {
        fetchOrder();
    }, [id]);

    const fetchOrder = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/orders/${id}`, {
                credentials: 'include'
            });
            if (!res.ok) throw new Error('Failed to load order');
            const data = await res.json();
            setOrder(data.order);
            setDocuments(data.order.documents || []);
        } catch (err) {
            toast.error('Failed to load order details');
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>, docType: string) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('document', file);
        formData.append('type', docType);

        try {
            setUploading(true);
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/orders/${id}/documents`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            if (!res.ok) throw new Error('Upload failed');

            const data = await res.json();
            setDocuments([...documents, data.document]);
            toast.success(`${docType} uploaded successfully`);
        } catch (err) {
            console.error(err);
            toast.error('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleNext = () => {
        // Navigate to requirements
        navigate(`/dashboard/order/${id}/requirements`);
    };

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Progress Steps */}
                <div className="mb-8 flex justify-center items-center space-x-4 text-sm font-medium text-gray-500">
                    <span className="text-primary flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Service Selection</span>
                    <div className="h-px w-8 bg-gray-300"></div>
                    <span className="text-primary font-bold flex items-center gap-1"><div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">2</div> Document Upload</span>
                    <div className="h-px w-8 bg-gray-300"></div>
                    <span>Requirements</span>
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

                    {/* Right Column: Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            <div className="bg-primary px-8 py-6">
                                <h1 className="text-2xl font-bold text-white">Upload Documents</h1>
                                <p className="text-primary-100 mt-2">Please upload the following documents for {order?.items?.[0]?.serviceName}.</p>
                                <p className="text-xs text-white/70 mt-1">Order #{order?.orderNumber}</p>
                            </div>

                            <div className="p-8 space-y-6">
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3 text-sm text-yellow-800">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <p>Ensure documents are clear and legible. Accepted formats: PDF, JPG, PNG.</p>
                                </div>

                                <div className="grid gap-6">
                                    {requiredDocs.map((doc, idx) => {
                                        const uploadedDoc = documents.find(d => d.fileName.includes(doc.key) || true); // Simple check, ideally map by type
                                        // Since backend doesn't store 'type' in Document model effectively yet without migration, we just list generic uploaders or check current docs count
                                        // For now, I will just list generic slots or check if *any* doc is uploaded

                                        return (
                                            <div key={idx} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition">
                                                <div className="flex items-center gap-4">
                                                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                                                        <FileText className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                                                        <p className="text-xs text-gray-500">Required</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    {/* File Input Label */}
                                                    <label className="cursor-pointer px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary relative overflow-hidden">
                                                        <span className="relative z-10 flex items-center gap-2">
                                                            <Upload className="w-4 h-4" /> Upload
                                                        </span>
                                                        <input
                                                            type="file"
                                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                                            onChange={(e) => handleUpload(e, doc.key)}
                                                            accept=".pdf,.jpg,.jpeg,.png"
                                                            disabled={uploading}
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Uploaded List */}
                                {documents.length > 0 && (
                                    <div className="mt-8 pt-8 border-t border-gray-100">
                                        <h3 className="font-semibold text-gray-900 mb-4">Uploaded Files ({documents.length})</h3>
                                        <div className="space-y-2">
                                            {documents.map((doc: any) => (
                                                <div key={doc.id} className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded">
                                                    <span className="flex items-center gap-2 truncate">
                                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                                        {doc.fileName}
                                                    </span>
                                                    <span className="text-gray-400 text-xs">{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="pt-6 flex justify-end">
                                    <button
                                        onClick={handleNext}
                                        disabled={documents.length === 0}
                                        className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        Continue to Requirements <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
