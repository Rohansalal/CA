import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    FileText, Shield, Loader, ChevronRight, CheckCircle, Upload, Play,
    AlertCircle, DollarSign, Building, Briefcase, FileSignature, UploadCloud
} from 'lucide-react';
import { useForm, useFieldArray } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';

const API_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// --- Types ---
type OrderItem = {
    id: number; // This is the OrderItem.id natively
    orderId?: number; // Keep orderId for payment purposes
    serviceId: number;
    serviceName: string;
    planType: string;
    price: number;
};

type Workflow = {
    id: number;
    currentStep: number;
    status: string;
    formData: string | null;
    documents: any[];
};

// --- Generic Dynamic Form Engine Component ---
const DynamicFormEngine = ({
    formSchema,
    workflowId,
    initialData,
    onComplete
}: {
    formSchema: any[],
    workflowId: number,
    initialData: any,
    onComplete: () => void
}) => {
    // Advanced: In a production app, we would dynamically generate the Zod schema
    // from the JSON. For speed, we will use a basic record schema 
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: initialData || {}
    });

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (initialData) reset(initialData);
    }, [initialData, reset]);

    const onSubmit = async (data: any) => {
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            const headers: any = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const res = await fetch(`${API_URL}/workflow/${workflowId}/form-data`, {
                method: 'PUT',
                headers,
                body: JSON.stringify({ formData: data }),
                credentials: 'include'
            });
            if (res.ok) {
                onComplete(); // Move to next step
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    if (!formSchema || formSchema.length === 0) {
        return (
            <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                <FileSignature className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">No Form Schema Configured</h3>
                <p className="text-gray-500 mt-2 text-xs">The CA admin has not attached a dynamic form template to this plan yet.</p>
                <div className="mt-6">
                    <button onClick={onComplete} className="px-6 py-3 bg-white text-black border-2 border-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-colors">Bypass Form Step</button>
                </div>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {formSchema.map((section: any, sIdx: number) => (
                <div key={sIdx} className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary/20"></div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-primary font-black text-sm">{sIdx + 1}</div>
                        <h3 className="text-xl font-black text-black tracking-tight">{section.section}</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {section.fields.map((field: any, fIdx: number) => (
                            <div key={fIdx}>
                                <label className="block text-[10px] font-black text-black uppercase tracking-widest mb-2 pl-1">
                                    {field.label} {field.required && <span className="text-red-500">*</span>}
                                </label>
                                <input
                                    type={field.type || 'text'}
                                    {...register(field.name, { required: field.required })}
                                    className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                                    placeholder={`Enter ${field.label.toLowerCase()}`}
                                />
                                {errors[field.name] && <span className="text-red-500 text-xs mt-1 block">This field is required</span>}
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 px-8 py-4 bg-white text-black border-2 border-black rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-gray-50 hover:scale-[1.02] transition-all disabled:opacity-50"
                >
                    {saving ? <Loader className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                    Save Data & Continue
                </button>
            </div>
        </form>
    );
};


const DocumentUploader = ({
    requiredDocs,
    workflowId,
    existingDocs = [],
    onComplete
}: {
    requiredDocs: any[],
    workflowId: number,
    existingDocs?: any[],
    onComplete: () => void
}) => {
    const [uploading, setUploading] = useState<Record<string, boolean>>({});

    // Initialize uploadedDocs state with existing documents from backend
    const [uploadedDocs, setUploadedDocs] = useState<Record<string, boolean>>(() => {
        const initialState: Record<string, boolean> = {};
        if (existingDocs && Array.isArray(existingDocs)) {
            existingDocs.forEach(doc => {
                const docKey = doc.documentType || doc.documentName;
                if (docKey) {
                    initialState[docKey] = true;
                }
            });
        }
        return initialState;
    });

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, docName: string) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(prev => ({ ...prev, [docName]: true }));

        try {
            const formData = new FormData();
            formData.append('documentName', docName);
            formData.append('document', file);

            const token = localStorage.getItem('token');
            const headers: any = {};
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const res = await fetch(`${API_URL}/workflow/${workflowId}/upload-document`, {
                method: 'POST',
                headers,
                body: formData,
                credentials: 'include'
            });

            if (res.ok) {
                setUploadedDocs(prev => ({ ...prev, [docName]: true }));
            }
        } catch (error) {
            console.error("Upload failed", error);
        } finally {
            setUploading(prev => ({ ...prev, [docName]: false }));
        }
    };

    const handleConfirm = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers: any = {};
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const res = await fetch(`${API_URL}/workflow/${workflowId}/confirm-docs`, {
                method: 'POST',
                headers,
                credentials: 'include'
            });
            if (res.ok) {
                onComplete();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const allUploaded = requiredDocs.every(doc => uploadedDocs[doc]);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {requiredDocs && requiredDocs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {requiredDocs.map((doc: string, idx: number) => {
                        const isUploaded = uploadedDocs[doc];
                        const isUploading = uploading[doc];

                        return (
                            <div key={idx} className={`bg-white rounded-2xl p-6 border ${isUploaded ? 'border-emerald-500 bg-emerald-50/30' : 'border-gray-100'} shadow-sm flex flex-col items-center justify-center text-center gap-4 group hover:border-primary/50 transition-all h-48 relative overflow-hidden`}>
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-transform ${isUploaded ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-50 text-primary group-hover:scale-110'}`}>
                                    {isUploading ? (
                                        <Loader className="w-8 h-8 animate-spin" />
                                    ) : isUploaded ? (
                                        <CheckCircle className="w-8 h-8" />
                                    ) : (
                                        <UploadCloud className="w-8 h-8" />
                                    )}
                                </div>
                                <div>
                                    <p className="font-black text-sm text-black">{doc}</p>
                                    <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${isUploaded ? 'text-emerald-600' : 'text-gray-400'}`}>
                                        {isUploaded ? 'Uploaded Successfully' : 'PDF, JPG, PNG up to 10MB'}
                                    </p>
                                </div>

                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={(e) => handleFileUpload(e, doc)}
                                    disabled={isUploaded || isUploading}
                                />
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="bg-emerald-50 text-emerald-700 p-8 rounded-2xl border border-emerald-100 text-center">
                    <CheckCircle className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="font-black text-lg">No Documents Required</h3>
                    <p className="opacity-80 text-sm font-medium">This service plan does not require any additional document uploads.</p>
                </div>
            )}

            <div className="flex justify-end pt-4">
                <button
                    onClick={handleConfirm}
                    disabled={requiredDocs.length > 0 && !allUploaded}
                    className="flex items-center gap-2 px-8 py-4 bg-white text-black border-2 border-black rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-gray-50 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Confirm Documents
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}


export const UniversalServicePanel = ({
    onInitiatePayment,
    initialServices
}: {
    onInitiatePayment?: (service: any) => void,
    initialServices?: any[]
}) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [purchasedServices, setPurchasedServices] = useState<OrderItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Active Workflow State
    const [activeWorkflowItem, setActiveWorkflowItem] = useState<OrderItem | null>(null);
    const [workflowState, setWorkflowState] = useState<Workflow | null>(null);
    const [formSchema, setFormSchema] = useState<any[]>([]);
    const [documentReqs, setDocumentReqs] = useState<any[]>([]);
    const [workflowLoading, setWorkflowLoading] = useState(false);

    // 1. Fetch User's Purchased Orders/Items
    useEffect(() => {
        const fetchServices = async () => {
            try {
                if (initialServices && initialServices.length > 0) {
                    const workspaces: OrderItem[] = initialServices.map((item: any) => ({
                        id: item.orderItemId || item.id,
                        orderId: item.orderId,
                        serviceId: item.serviceId,
                        serviceName: item.serviceName || item.service?.name,
                        planType: item.planName || item.plan?.planType,
                        price: item.price
                    }));
                    setPurchasedServices(workspaces);
                    setLoading(false);
                    return;
                }

                const token = localStorage.getItem('token');
                const headers: any = { 'Content-Type': 'application/json' };
                if (token) headers['Authorization'] = `Bearer ${token}`;

                const res = await fetch(`${API_URL}/services/my-services`, {
                    headers,
                    credentials: 'include'
                });
                if (res.ok) {
                    const data = await res.json();

                    // The backend returns an array of mapped services already
                    // We just need to ensure they fit the OrderItem interface for our local state
                    const workspaces: OrderItem[] = data.map((item: any) => ({
                        id: item.orderItemId, // Critical: this hits /workflow/:id 
                        orderId: item.orderId, // Critical: this hits /process/payment/:orderId
                        serviceId: item.serviceId,
                        serviceName: item.serviceName,
                        planType: item.planName,
                        price: item.price
                    }));

                    setPurchasedServices(workspaces);
                }
            } catch (error) {
                console.error("Failed to fetch services", error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    // 2. Load the Workflow Engine for a specific Service Plan
    const loadWorkflow = async (item: OrderItem) => {
        // If it's an ITR plan, use the dedicated unified single-page submission
        if (item.serviceName && (item.serviceName.toLowerCase().includes('itr') || item.serviceName.toLowerCase().includes('income tax'))) {
            navigate(`/dashboard/order/${item.orderId}/submit-details`);
            return;
        }

        setActiveWorkflowItem(item);
        setWorkflowLoading(true);
        try {
            const token = localStorage.getItem('token');
            const headers: any = {};
            if (token) headers['Authorization'] = `Bearer ${token}`;

            // Calls our new generic workflow API
            const res = await fetch(`${API_URL}/workflow/${item.id}`, {
                headers,
                credentials: 'include'
            });
            if (res.ok) {
                const data = await res.json();
                
                let fetchedFormSchema = data.formSchema || [];
                
                // Override for ITR Plans
                if (item.serviceName && (item.serviceName.toLowerCase().includes('itr') || item.serviceName.toLowerCase().includes('income tax'))) {
                    fetchedFormSchema = fetchedFormSchema.map((section: any) => ({
                        ...section,
                        fields: section.fields.map((field: any) => {
                            if (field.name === 'aadhaarNumber' || field.label.toLowerCase().includes('aadhaar')) {
                                return { ...field, required: false };
                            }
                            if (field.name === 'panNumber' || field.label.toLowerCase().includes('pan')) {
                                return { ...field, required: false };
                            }
                            return field;
                        })
                    }));
                }

                setWorkflowState(data.workflow);
                setFormSchema(fetchedFormSchema);
                setDocumentReqs(data.documentRequirements || []);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setWorkflowLoading(false);
        }
    };

    const advanceStep = () => {
        if (workflowState) {
            setWorkflowState({ ...workflowState, currentStep: workflowState.currentStep + 1 });
        }
    };

    if (loading) {
        return <div className="flex justify-center p-20"><Loader className="w-8 h-8 text-primary animate-spin" /></div>;
    }

    // --- RENDER WORKFLOW ENGINE ---
    if (activeWorkflowItem && workflowState) {
        return (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 pb-20">
                <div className="flex items-center justify-between bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-black border border-black rounded-full text-[10px] font-black uppercase tracking-widest">
                                {activeWorkflowItem.planType} PLAN
                            </div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-black border border-black rounded-full text-[10px] font-black uppercase tracking-widest">
                                ₹{activeWorkflowItem.price}
                            </div>
                        </div>
                        <h2 className="text-2xl font-black text-slate-800">{activeWorkflowItem.serviceName} Workspace</h2>
                    </div>
                    <button
                        onClick={() => setActiveWorkflowItem(null)}
                        className="px-6 py-2 bg-gray-100 text-gray-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
                    >
                        Save & Exit
                    </button>
                </div>

                {/* Progress Stepper */}
                <div className="flex items-center justify-between px-10 relative">
                    <div className="absolute left-10 right-10 top-1/2 h-1 bg-gray-100 -z-10 -translate-y-1/2 rounded-full hidden md:block"></div>
                    <div className={`absolute left-10 top-1/2 h-1 bg-primary -z-10 -translate-y-1/2 rounded-full transition-all duration-700 hidden md:block`} style={{ width: `${((workflowState.currentStep - 1) / 2) * 100}%` }}></div>

                    {[
                        { step: 1, label: 'Information', icon: FileText },
                        { step: 2, label: 'Documents', icon: UploadCloud },
                        { step: 3, label: 'Review & Pay', icon: DollarSign }
                    ].map((s) => (
                        <div key={s.step} className="flex flex-col items-center gap-3 bg-[#F1F5F9]/80 backdrop-blur pb-2 px-4 md:px-8">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black transition-all shadow-lg ${workflowState.currentStep >= s.step ? 'bg-primary text-black scale-110 shadow-primary/30' : 'bg-white text-gray-300 border-2 border-gray-100'}`}>
                                <s.icon className="w-5 h-5" />
                            </div>
                            <p className={`text-[10px] font-black uppercase tracking-widest ${workflowState.currentStep >= s.step ? 'text-primary' : 'text-gray-400'}`}>{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* Dynamic Content Area based on Step */}
                <div className="pt-6">
                    {workflowLoading ? (
                        <div className="flex justify-center p-20"><Loader className="w-8 h-8 text-primary animate-spin" /></div>
                    ) : (
                        <>
                            {workflowState.currentStep === 1 && (
                                <DynamicFormEngine
                                    formSchema={formSchema}
                                    workflowId={workflowState.id}
                                    initialData={workflowState.formData ? JSON.parse(workflowState.formData) : null}
                                    onComplete={advanceStep}
                                />
                            )}
                            {workflowState.currentStep === 2 && (
                                <DocumentUploader
                                    requiredDocs={documentReqs}
                                    workflowId={workflowState.id}
                                    existingDocs={workflowState.documents}
                                    onComplete={advanceStep}
                                />
                            )}
                            {workflowState.currentStep === 3 && (
                                <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm text-center max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Shield className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-800 mb-2">Workspace Preparation Complete</h3>
                                    <p className="text-gray-500 mb-10 leading-relaxed font-medium">Your data and documents have been secured. Proceed with payment to initialize CA processing for your {activeWorkflowItem.serviceName}.</p>

                                    <div className="bg-gray-50 rounded-2xl p-6 mb-10 border border-gray-100 flex justify-between items-center text-left">
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Service Plan</p>
                                            <p className="font-black text-lg text-black">{activeWorkflowItem.planType.replace(/_/g, ' ')}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Fee</p>
                                            <p className="font-black text-2xl text-black">₹{activeWorkflowItem.price}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            if (onInitiatePayment) {
                                                onInitiatePayment({
                                                    id: activeWorkflowItem.serviceId,
                                                    name: activeWorkflowItem.serviceName,
                                                    orderId: activeWorkflowItem.orderId,
                                                    price: activeWorkflowItem.price
                                                });
                                            }
                                        }}
                                        className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-white text-black border-2 border-black rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-gray-50 hover:scale-[1.02] transition-all"
                                    >
                                        <DollarSign className="w-5 h-5" />
                                        Complete Payment
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        )
    }

    // --- RENDER MAIN LIST ---
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Active Workspaces</h2>
                    <p className="text-gray-500 mt-2 font-medium">Configure forms and submit documents for your purchased CA services.</p>
                </div>
            </div>

            {purchasedServices.length === 0 ? (
                <div className="bg-white rounded-[2.5rem] p-16 text-center border border-gray-100 shadow-sm">
                    <Briefcase className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                    <h3 className="text-xl font-black text-slate-800 mb-2">No Active Workspaces</h3>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">You haven't purchased any services yet. Browse our catalog to initiate a new tax filing or compliance workflow.</p>
                    <button className="px-8 py-4 bg-[#0b1f3a] text-black rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all">Browse Services</button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {purchasedServices.map((item) => (
                        <div key={item.id} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all group flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 bg-blue-50 text-primary rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-500">
                                        <Building className="w-6 h-6" />
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className="px-4 py-1.5 bg-gray-50 text-gray-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-200">{item.planType} PLAN</span>
                                        <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">₹{item.price.toLocaleString()}</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-black text-slate-800 mb-2">{item.serviceName}</h3>
                                <p className="text-gray-500 text-sm font-medium line-clamp-2">Complete the dynamic form requirements for your {item.planType.toLowerCase()} subscription to proceed.</p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-gray-50 flex justify-between items-center">
                                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-md">Pending Setup</p>
                                <button
                                    onClick={() => loadWorkflow(item)}
                                    className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest hover:text-[#0b1f3a] transition-colors"
                                >
                                    Open Workspace <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};









