import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    FileText, Upload, CheckCircle, Save, ClipboardList, Check, X,
    User, Phone, Mail, CreditCard, Loader2, ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner';
import { DirectorshipsSection } from './DirectorshipsSection';
import { ForeignIncomeSection } from './ForeignIncomeSection';

// --------------------- Field / Doc type definitions ---------------------
interface FormField {
    label: string;
    name: string;
    type: string;
    required: boolean;
    placeholder?: string;
}

interface DocRequirement {
    name: string;
    key: string;
    required: boolean;
    hint?: string;
}

interface Directorship {
    companyName: string;
    companyPan: string;
    companyType: string;
    isListed: boolean;
    din: string;
    openingNoOfShares: number;
    openingCostOfAcquisition: number;
    acquiredNoOfShares: number;
    acquiredDate: string;
    acquiredFaceValue: number;
    acquiredIssuePrice: number;
    acquiredPurchasePrice: number;
    transferredNoOfShares: number;
    transferredSaleConsideration: number;
    closingNoOfShares: number;
    closingCostOfAcquisition: number;
}

interface ForeignAsset {
    assetType: string;
    countryName: string;
    incomeSource: string;
    amount: number;
    remark: string;
}

// --------------------- Per-plan config ---------------------
const PLAN_CONFIG: Record<string, {
    title: string;
    subtitle: string;
    accentColor: string;
    fields: FormField[];
    docs: DocRequirement[];
}> = {
    BASIC: {
        title: 'Salary / Pension Plan',
        subtitle: 'Single Form 16, Savings Interest & One House Property',
        accentColor: 'from-blue-600 to-blue-400',
        fields: [
            { label: 'Full Name', name: 'fullName', type: 'text', required: true, placeholder: 'Enter your full name' },
            { label: 'Mobile Number', name: 'mobileNo', type: 'tel', required: true, placeholder: 'Enter 10-digit mobile number' },
            { label: 'Email ID', name: 'emailId', type: 'email', required: true, placeholder: 'Enter email address' },
            { label: 'PAN Number', name: 'panNumber', type: 'text', required: true, placeholder: 'ABCDE1234F' },
            { label: 'Aadhaar Number', name: 'aadhaarNumber', type: 'text', required: true, placeholder: '12-digit aadhaar' },
            { label: 'Other Notes / Remarks', name: 'remarks', type: 'textarea', required: false, placeholder: 'Any specialized instructions...' },
        ],
        docs: [
            { name: 'PAN Card', key: 'pan_file', required: true, hint: 'Clear front copy' },
            { name: 'Aadhaar Card', key: 'aadhaar_file', required: true, hint: 'Front & Back' },
            { name: 'Form 16', key: 'form16_file', required: true, hint: 'Issued by employer' },
            { name: 'Additional Document', key: 'other_document', required: false },
        ],
    },
    STANDARD: {
        title: 'Elite ITR Plan',
        subtitle: 'High Net Worth Individuals & Global Compliance',
        accentColor: 'from-amber-600 to-yellow-500',
        fields: [
            { label: 'Full Name', name: 'fullName', type: 'text', required: true, placeholder: 'Enter your full name' },
            { label: 'Mobile Number', name: 'mobileNo', type: 'tel', required: true, placeholder: 'Enter 10-digit mobile number' },
            { label: 'Email ID', name: 'emailId', type: 'email', required: true, placeholder: 'Enter email address' },
            { label: 'PAN Number', name: 'panNumber', type: 'text', required: true, placeholder: 'ABCDE1234F' },
            { label: 'Aadhaar Number', name: 'aadhaarNumber', type: 'text', required: true, placeholder: '12-digit aadhaar' },
            { label: 'Other Notes / Remarks', name: 'remarks', type: 'textarea', required: false, placeholder: 'Any specialized instructions...' },
        ],
        docs: [
            { name: 'PAN Card (Front & Back)', key: 'pan_file', required: true },
            { name: 'Aadhaar Card (Front & Back)', key: 'aadhaar_file', required: true },
            { name: 'Global Income Proof', key: 'income_proof', required: true },
            { name: 'Foreign Asset Evidence', key: 'foreign_doc', required: true },
            { name: 'Full Year Bank Statement', key: 'bank_statement', required: true },
        ],
    },
    PREMIUM: {
        title: 'Premium ITR Plan',
        subtitle: 'Foreign Income, Assets & Complex Tax Filing',
        accentColor: 'from-purple-600 to-indigo-500',
        fields: [
            { label: 'Full Name', name: 'fullName', type: 'text', required: true, placeholder: 'Enter your full name' },
            { label: 'Mobile Number', name: 'mobileNo', type: 'tel', required: true, placeholder: 'Enter 10-digit mobile number' },
            { label: 'Email ID', name: 'emailId', type: 'email', required: true, placeholder: 'Enter email address' },
            { label: 'PAN Number', name: 'panNumber', type: 'text', required: true, placeholder: 'ABCDE1234F' },
            { label: 'Aadhaar Number', name: 'aadhaarNumber', type: 'text', required: true, placeholder: '12-digit aadhaar' },
            { label: 'Other Notes / Remarks', name: 'remarks', type: 'textarea', required: false, placeholder: 'Any additional details or context...' },
        ],
        docs: [
            { name: 'PAN Card (Front & Back)', key: 'pan_file', required: true, hint: 'Clear copy' },
            { name: 'Aadhaar Card (Front & Back)', key: 'aadhaar_file', required: true, hint: 'Front & Back' },
            { name: 'Form 16 / Income Proof', key: 'income_proof', required: true, hint: 'All sources of income' },
            { name: 'Foreign Asset Evidence', key: 'foreign_doc', required: false, hint: 'Statements/Certificates (optional)' },
            { name: 'Bank Statement', key: 'bank_statement', required: true, hint: 'Full year April–March' },
        ],
    },
    ELITE: {
        title: 'Salary / Pension Plus',
        subtitle: 'Multiple Form 16s, Multiple House Properties & Capital Gains',
        accentColor: 'from-emerald-600 to-teal-400',
        fields: [
            { label: 'Full Name', name: 'fullName', type: 'text', required: true, placeholder: 'Enter your full name' },
            { label: 'Mobile Number', name: 'mobileNo', type: 'tel', required: true, placeholder: 'Enter 10-digit mobile number' },
            { label: 'Email ID', name: 'emailId', type: 'email', required: true, placeholder: 'Enter email address' },
            { label: 'PAN Number', name: 'panNumber', type: 'text', required: true, placeholder: 'ABCDE1234F' },
            { label: 'Aadhaar Number', name: 'aadhaarNumber', type: 'text', required: true, placeholder: '12-digit aadhaar' },
            { label: 'Other Notes / Remarks', name: 'remarks', type: 'textarea', required: false, placeholder: 'Any specialized instructions...' },
        ],
        docs: [
            { name: 'PAN Card', key: 'pan_file', required: true, hint: 'Clear front copy' },
            { name: 'Aadhaar Card', key: 'aadhaar_file', required: true, hint: 'Front & Back' },
            { name: 'Form 16 (All Employers)', key: 'form16_file', required: true, hint: 'All Form 16s for the year' },
            { name: 'Bank Statement (Savings)', key: 'bank_statement', required: true, hint: 'April to March statement' },
            { name: 'Interest Certificates', key: 'interest_cert', required: false, hint: 'FD/Savings interest (optional)' },
        ],
    },
    DEFAULT: {
        title: 'Service Details & Documents',
        subtitle: 'Please fill in the required information',
        accentColor: 'from-gray-700 to-gray-500',
        fields: [
            { label: 'Full Name', name: 'fullName', type: 'text', required: true, placeholder: 'Enter your full name' },
            { label: 'Mobile Number', name: 'mobileNo', type: 'tel', required: true, placeholder: 'Enter mobile number' },
            { label: 'Email ID', name: 'emailId', type: 'email', required: true, placeholder: 'Enter email address' },
            { label: 'Remarks', name: 'remarks', type: 'textarea', required: false, placeholder: 'Any additional details...' },
        ],
        docs: [
            { name: 'PAN Card', key: 'pan_file', required: true },
            { name: 'Aadhaar Card', key: 'aadhaar_file', required: true },
            { name: 'Supporting Document', key: 'other_document', required: false },
        ],
    },
};

// =================== MAIN COMPONENT ===================
export const OrderSubmitDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [directorships, setDirectorships] = useState<Directorship[]>([]);
    const [foreignAssets, setForeignAssets] = useState<ForeignAsset[]>([]);
    const [files, setFiles] = useState<Record<string, File>>({});
    const [order, setOrder] = useState<any>(null);
    const [submitting, setSubmitting] = useState(false);

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
        } catch (err) {
            toast.error('Failed to load order details');
        } finally {
            setLoading(false);
        }
    };

    // Map plan type to config key
    const getPlanKey = (): string => {
        const pType = (order?.items?.[0]?.planType || '').toUpperCase();
        if (pType.includes('ELITE')) return 'ELITE';
        if (pType.includes('PREMIUM') || pType.includes('PROFESSIONAL')) return 'PREMIUM';
        if (pType.includes('STANDARD')) return 'STANDARD';
        if (pType.includes('BASIC')) return 'BASIC';
        return 'DEFAULT';
    };

    const planKey = getPlanKey();
    const config = PLAN_CONFIG[planKey];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        if (e.target.files?.[0]) {
            setFiles(prev => ({ ...prev, [key]: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate required files
        const missingFiles = config.docs.filter(doc => doc.required && !files[doc.key]);
        if (missingFiles.length > 0) {
            toast.error(`Please upload all required documents: ${missingFiles.map(d => d.name).join(', ')}`);
            return;
        }

        setSubmitting(true);

        const submissionData = new FormData();
        Object.entries(formData).forEach(([key, val]) => submissionData.append(key, val));
        Object.entries(files).forEach(([key, file]) => submissionData.append(key, file));
        
        if (planKey === 'STANDARD' || planKey === 'PREMIUM' || planKey === 'ELITE') {
            submissionData.append('directorships', JSON.stringify(directorships));
        }

        if (planKey === 'PREMIUM' || planKey === 'ELITE') {
            submissionData.append('foreignAssets', JSON.stringify(foreignAssets));
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/orders/${id}/submit-all`, {
                method: 'POST',
                body: submissionData,
                credentials: 'include'
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Submission failed');
            }

            toast.success('Details submitted successfully! Our CA team will review your information.');
            navigate('/dashboard');
        } catch (err: any) {
            toast.error(err.message || 'Failed to submit details');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">Loading your order...</p>
                </div>
            </div>
        );
    }

    const orderItem = order?.items?.[0];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-10 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">

                {/* Back Button */}
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 font-semibold transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </button>

                {/* Page Header */}
                <div className={`bg-gradient-to-r ${config.accentColor} rounded-2xl p-8 mb-8 text-black shadow-xl`}>
                    <div className="flex items-start justify-between flex-wrap gap-4">
                        <div>
                            <p className="text-black/70 text-xs font-bold uppercase tracking-widest mb-1">
                                {orderItem?.serviceName || 'ITR Filing'} &mdash; Submit Your Details
                            </p>
                            <h1 className="text-2xl md:text-3xl font-black mb-1">{config.title}</h1>
                            <p className="text-black/80 text-sm font-medium">{config.subtitle}</p>
                        </div>
                        {orderItem && (
                            <div className="bg-white/20 rounded-xl px-5 py-3 text-right backdrop-blur-sm">
                                <p className="text-black text-[10px] font-black uppercase tracking-widest">Selected Plan</p>
                                <p className="font-black text-lg">{orderItem.planType || planKey}</p>
                                <p className="text-black text-sm font-semibold">₹{orderItem.price}</p>
                            </div>
                        )}
                    </div>

                    {/* Step Indicator */}
                    <div className="flex items-center gap-3 mt-6">
                        <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-xs font-bold">Plan Selected</span>
                        </div>
                        <div className="h-px w-8 bg-white/40" />
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full text-gray-800">
                            <ClipboardList className="w-4 h-4 text-primary" />
                            <span className="text-xs font-black">Submit Details</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left: Plan Info Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-8">
                            <div className={`bg-gradient-to-r ${config.accentColor} p-5`}>
                                <h3 className="text-black font-black text-base">Plan Summary</h3>
                            </div>
                            <div className="p-6">
                                {orderItem?.plan?.scopes?.length > 0 ? (
                                    <ul className="space-y-3">
                                        {orderItem.plan.scopes.map((scope: any) => (
                                            <li key={scope.id} className="flex items-start gap-3 text-sm">
                                                <div className={`mt-0.5 rounded-full p-0.5 flex-shrink-0 ${scope.isIncluded ? 'text-green-600 bg-green-100' : 'text-gray-300 bg-gray-100'}`}>
                                                    {scope.isIncluded ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                                                </div>
                                                <span className={scope.isIncluded ? 'text-gray-700' : 'text-gray-400 line-through'}>
                                                    {scope.title}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="space-y-2 text-sm text-gray-600">
                                        <p className="font-semibold text-gray-800">{config.subtitle}</p>
                                        <p className="text-xs text-gray-400">Features are dynamically loaded from the admin panel.</p>
                                    </div>
                                )}

                                <div className="mt-6 pt-4 border-t border-gray-100">
                                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-2">Required Documents</p>
                                    <ul className="space-y-2">
                                        {config.docs.filter(d => d.required).map(doc => (
                                            <li key={doc.key} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                                                <FileText className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                                                {doc.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Information Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                                    <User className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h2 className="font-black text-gray-900 text-lg">Personal Information</h2>
                                    <p className="text-xs text-gray-400">Fields marked with <span className="text-red-500">*</span> are required</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {config.fields.map((field) => (
                                    <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                                            {field.label} {field.required && <span className="text-red-500">*</span>}
                                        </label>
                                        {field.type === 'textarea' ? (
                                            <textarea
                                                name={field.name}
                                                required={field.required}
                                                onChange={handleChange}
                                                rows={3}
                                                placeholder={field.placeholder}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm bg-gray-50/50 resize-none"
                                            />
                                        ) : (
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                required={field.required}
                                                onChange={handleChange}
                                                placeholder={field.placeholder}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition text-sm bg-gray-50/50"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* Directorship Section for Standard, Premium & Elite Plan */}
                        {(planKey === 'STANDARD' || planKey === 'PREMIUM' || planKey === 'ELITE') && (
                            <DirectorshipsSection
                                data={directorships}
                                onChange={setDirectorships}
                            />
                        )}

                        {/* Foreign Assets Section for Premium & Elite Plan */}
                        {(planKey === 'PREMIUM' || planKey === 'ELITE') && (
                            <ForeignIncomeSection
                                data={foreignAssets}
                                onChange={setForeignAssets}
                            />
                        )}

                        {/* Document Upload Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center">
                                    <Upload className="w-5 h-5 text-orange-500" />
                                </div>
                                <div>
                                    <h2 className="font-black text-gray-900 text-lg">Upload Documents</h2>
                                    <p className="text-xs text-gray-400">PDF, JPG, PNG – Max 10MB per file</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {config.docs.map((doc) => {
                                    const uploaded = !!files[doc.key];
                                    return (
                                        <label
                                            key={doc.key}
                                            className={`relative cursor-pointer block rounded-xl border-2 border-dashed p-5 transition-all group
                                                ${uploaded
                                                    ? 'border-emerald-400 bg-emerald-50'
                                                    : 'border-gray-200 bg-gray-50/50 hover:border-primary/50 hover:bg-primary/5'
                                                }`}
                                        >
                                            <input
                                                type="file"
                                                name={doc.key}
                                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                                onChange={(e) => handleFileChange(e, doc.key)}
                                                accept=".pdf,.jpg,.jpeg,.png"
                                            />
                                            <div className="flex items-start gap-3">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all
                                                    ${uploaded ? 'bg-emerald-500 text-black' : 'bg-white text-gray-400 border border-gray-200 group-hover:border-primary/30 group-hover:text-primary'}`}
                                                >
                                                    {uploaded ? <CheckCircle className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                                                </div>
                                                <div className="overflow-hidden">
                                                    <p className="font-bold text-sm text-gray-800 truncate">{doc.name}</p>
                                                    {doc.hint && <p className="text-[10px] text-gray-400 mt-0.5">{doc.hint}</p>}
                                                    <p className={`text-[10px] font-bold uppercase tracking-wider mt-1.5
                                                        ${uploaded ? 'text-emerald-600' : doc.required ? 'text-red-500' : 'text-gray-400'}`}
                                                    >
                                                        {uploaded
                                                            ? `✓ ${files[doc.key].name.slice(0, 20)}${files[doc.key].name.length > 20 ? '…' : ''}`
                                                            : doc.required ? 'Required' : 'Optional'
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="flex justify-between items-center bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <button
                                type="button"
                                onClick={() => navigate('/dashboard')}
                                className="px-6 py-3 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition text-sm flex items-center gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" /> Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className={`flex items-center gap-3 px-8 py-3.5 rounded-xl font-black text-black text-sm shadow-lg transition-all
                                    ${submitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : `bg-gradient-to-r ${config.accentColor} hover:shadow-xl hover:-translate-y-0.5 transform`
                                    }`}
                            >
                                {submitting
                                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                                    : <><Save className="w-4 h-4" /> Submit ITR Details</>
                                }
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};









