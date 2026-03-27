import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    FileText, Upload, CheckCircle, Trash2, Plus, Loader2, ArrowLeft,
    Phone, Mail, Building2, Globe, Paperclip, X, AlertCircle, Eye,
    FileCheck, User, CreditCard, ShieldCheck, Info, ArrowRight,
    Lock, BadgeCheck,
} from 'lucide-react';
import { toast } from 'sonner';
import { DirectorshipsSection } from './DirectorshipsSection';
import { ForeignIncomeSection } from './ForeignIncomeSection';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Directorship {
    companyName: string; companyPan: string; companyType: string;
    isListed: boolean; din: string;
    openingNoOfShares: number; openingCostOfAcquisition: number;
    acquiredNoOfShares: number; acquiredDate: string; acquiredFaceValue: number;
    acquiredIssuePrice: number; acquiredPurchasePrice: number;
    transferredNoOfShares: number; transferredSaleConsideration: number;
    closingNoOfShares: number; closingCostOfAcquisition: number;
}

interface ForeignAsset {
    assetType: string; countryName: string; incomeSource: string;
    amount: number; remark: string;
}

interface AdditionalAttachment { file: File; remark: string; }

interface OrderItem {
    id: number; planType: string; serviceName: string; price: number;
    plan?: { scopes?: Array<{ id: number; title: string; isIncluded: boolean }> };
}

interface Order { id: number; items: OrderItem[]; }

// ─── Plan Config ─────────────────────────────────────────────────────────────

type PlanKey = 'BASIC' | 'STANDARD' | 'PREMIUM' | 'ELITE';

interface PlanMeta {
    label: string; subtitle: string;
    gradient: string; accentFrom: string; accentTo: string;
    badgeCls: string; apiKey: string;
    borderAccent: string; ringAccent: string;
    icon: string;
    checklist: string[];
}

const PLAN_META: Record<PlanKey, PlanMeta> = {
    BASIC: {
        label: 'Basic Plan', subtitle: 'Salary / Pension — Single Form 16',
        gradient: 'from-blue-600 to-blue-500',
        accentFrom: 'from-blue-600', accentTo: 'to-blue-500',
        badgeCls: 'bg-blue-100 text-blue-700 border-blue-200',
        apiKey: 'basic',
        borderAccent: 'border-blue-500', ringAccent: 'focus:ring-blue-200 focus:border-blue-400',
        icon: '💼',
        checklist: ['Aadhaar card (front & back)', 'PAN card (front & back)', 'Mobile number & email ID'],
    },
    STANDARD: {
        label: 'Standard Plan', subtitle: 'Multiple Income Sources & Directorship / Unlisted Shares',
        gradient: 'from-amber-600 to-orange-500',
        accentFrom: 'from-amber-600', accentTo: 'to-orange-500',
        badgeCls: 'bg-amber-100 text-amber-700 border-amber-200',
        apiKey: 'standard',
        borderAccent: 'border-amber-500', ringAccent: 'focus:ring-amber-200 focus:border-amber-400',
        icon: '📊',
        checklist: [
            'Aadhaar card (front & back) + PAN card (front & back)',
            'Directorship / unlisted share details (if applicable)',
            'Bank statements, Form 16 or other income proofs (optional)',
        ],
    },
    PREMIUM: {
        label: 'Premium Plan', subtitle: 'Foreign Income, Assets & Complex Tax Filing',
        gradient: 'from-purple-600 to-purple-500',
        accentFrom: 'from-purple-600', accentTo: 'to-purple-500',
        badgeCls: 'bg-purple-100 text-purple-700 border-purple-200',
        apiKey: 'premium',
        borderAccent: 'border-purple-500', ringAccent: 'focus:ring-purple-200 focus:border-purple-400',
        icon: '🌐',
        checklist: [
            'Aadhaar card (front & back) + PAN card (front & back)',
            'Full name, PAN number, Aadhaar number',
            'Directorship details (company name, PAN, DIN, share movement)',
            'Foreign asset / income details (type, country, amount)',
            'Supporting docs: overseas bank statements, Form 67, etc.',
        ],
    },
    ELITE: {
        label: 'Elite Plan', subtitle: 'High Net Worth — Global Compliance & All Income Types',
        gradient: 'from-emerald-600 to-teal-600',
        accentFrom: 'from-emerald-600', accentTo: 'to-teal-600',
        badgeCls: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        apiKey: 'elite',
        borderAccent: 'border-emerald-500', ringAccent: 'focus:ring-emerald-200 focus:border-emerald-400',
        icon: '👑',
        checklist: [
            'Aadhaar card (front & back) + PAN card (front & back)',
            'Complete personal identifiers (name, PAN, Aadhaar)',
            'All directorships and unlisted share holdings',
            'All foreign assets and income sources, every jurisdiction',
            'Capital gains statements, audit reports, complex documents',
        ],
    },
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

const resolvePlanKey = (planType: string): PlanKey => {
    const p = planType.toUpperCase();
    if (p.includes('ELITE')) return 'ELITE';
    if (p.includes('PREMIUM') || p.includes('PROFESSIONAL')) return 'PREMIUM';
    if (p.includes('STANDARD')) return 'STANDARD';
    return 'BASIC';
};

const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

// ─── Section Card ─────────────────────────────────────────────────────────────

const SectionCard = ({ icon, title, subtitle, accent, children }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    accent: string; // tailwind color name e.g. 'blue'
    children: React.ReactNode;
}) => {
    const accentMap: Record<string, string> = {
        blue: 'border-l-blue-500 bg-blue-50/30',
        amber: 'border-l-amber-500 bg-amber-50/20',
        purple: 'border-l-purple-500 bg-purple-50/20',
        emerald: 'border-l-emerald-500 bg-emerald-50/20',
        indigo: 'border-l-indigo-500 bg-indigo-50/20',
        teal: 'border-l-teal-500 bg-teal-50/20',
    };
    const iconBgMap: Record<string, string> = {
        blue: 'bg-blue-100 text-blue-600',
        amber: 'bg-amber-100 text-amber-600',
        purple: 'bg-purple-100 text-purple-600',
        emerald: 'bg-emerald-100 text-emerald-600',
        indigo: 'bg-indigo-100 text-indigo-600',
        teal: 'bg-teal-100 text-teal-600',
    };
    return (
        <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 border-l-4 ${accentMap[accent] || accentMap.blue} overflow-hidden`}>
            {/* Section header */}
            <div className="flex items-center gap-3.5 px-7 py-5 border-b border-gray-100">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBgMap[accent] || iconBgMap.blue}`}>
                    {icon}
                </div>
                <div>
                    <h2 className="font-black text-gray-900 text-base leading-tight">{title}</h2>
                    {subtitle && <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>}
                </div>
            </div>
            {/* Content */}
            <div className="p-7 pt-6">
                {children}
            </div>
        </div>
    );
};

// ─── Input helpers ────────────────────────────────────────────────────────────

const inputCls = (error?: string) =>
    `w-full px-4 py-3 border rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 transition ${
        error
            ? 'border-red-400 bg-red-50/30 focus:ring-red-200 focus:border-red-500'
            : 'border-gray-200 focus:ring-blue-200 focus:border-blue-400'
    }`;

const FieldError = ({ msg }: { msg?: string }) =>
    msg ? (
        <p className="mt-1.5 text-[11px] text-red-500 font-medium flex items-center gap-1">
            <AlertCircle className="w-3 h-3 flex-shrink-0" /> {msg}
        </p>
    ) : null;

// ─── File Upload Zone ─────────────────────────────────────────────────────────

const FileUploadZone = ({ label, hint, required, file, onFile, error, clearError }: {
    label: string; hint?: string; required?: boolean;
    file: File | null; onFile: (f: File | null) => void;
    error?: string; clearError?: () => void;
}) => {
    const ref = useRef<HTMLInputElement>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        if (f.size > 5 * 1024 * 1024) { toast.error(`${label}: file must be under 5 MB`); return; }
        onFile(f); clearError?.(); e.target.value = '';
    };
    const getIcon = (f: File) => {
        if (f.type === 'application/pdf') return <FileText className="w-4 h-4 text-red-500" />;
        if (f.type.startsWith('image/')) return <Eye className="w-4 h-4 text-blue-500" />;
        return <FileCheck className="w-4 h-4 text-gray-500" />;
    };
    return (
        <div>
            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">
                {label} {required && <span className="text-red-500">*</span>}
                {hint && <span className="text-gray-400 normal-case font-normal ml-1">— {hint}</span>}
            </label>
            <div
                onClick={() => ref.current?.click()}
                className={`cursor-pointer flex items-center gap-3 px-4 py-4 rounded-xl border-2 border-dashed transition-all select-none group ${
                    file ? 'border-emerald-400 bg-emerald-50'
                         : error ? 'border-red-400 bg-red-50/30 hover:border-red-500'
                         : 'border-gray-200 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/30'
                }`}
            >
                <input ref={ref} type="file" accept="image/*,.pdf" className="hidden" onChange={handleChange} />
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition ${
                    file ? 'bg-emerald-500 text-white' : 'bg-white border border-gray-200 text-gray-400 group-hover:border-blue-300'
                }`}>
                    {file ? <CheckCircle className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
                </div>
                <div className="min-w-0 flex-1">
                    {file ? (
                        <>
                            <div className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700 truncate">
                                {getIcon(file)} <span className="truncate">{file.name}</span>
                            </div>
                            <p className="text-[10px] text-emerald-500 mt-0.5">{formatBytes(file.size)} — uploaded</p>
                        </>
                    ) : (
                        <>
                            <p className="text-sm font-semibold text-gray-600">Click to upload</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">JPG, PNG or PDF — max 5 MB</p>
                        </>
                    )}
                </div>
                {file && (
                    <button type="button" onClick={e => { e.stopPropagation(); onFile(null); }}
                        className="p-1.5 rounded-lg hover:bg-red-100 text-gray-300 hover:text-red-500 transition flex-shrink-0">
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
            <FieldError msg={error} />
        </div>
    );
};

// ─── Attachments Section ──────────────────────────────────────────────────────

const AttachmentsSection = ({ attachments, onChange }: {
    attachments: AdditionalAttachment[];
    onChange: (rows: AdditionalAttachment[]) => void;
}) => {
    const ref = useRef<HTMLInputElement>(null);
    const handleNewFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        if (f.size > 5 * 1024 * 1024) { toast.error('File must be under 5 MB'); return; }
        onChange([...attachments, { file: f, remark: '' }]);
        e.target.value = '';
    };
    const getIcon = (f: File) => {
        if (f.type === 'application/pdf') return <FileText className="w-4 h-4 text-red-500" />;
        if (f.type.startsWith('image/')) return <Eye className="w-4 h-4 text-blue-500" />;
        return <FileCheck className="w-4 h-4 text-gray-500" />;
    };
    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Additional Documents</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Bank statements, Form 16, salary slips, etc. (optional)</p>
                </div>
                <button type="button" onClick={() => ref.current?.click()}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-black text-blue-600 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition uppercase tracking-wider">
                    <Plus className="w-3.5 h-3.5" /> Add File
                </button>
                <input ref={ref} type="file" accept="image/*,.pdf,.doc,.docx,.xls,.xlsx" className="hidden" onChange={handleNewFile} />
            </div>
            {attachments.length === 0 ? (
                <div className="py-9 text-center rounded-xl border-2 border-dashed border-gray-200 cursor-pointer hover:border-blue-300 hover:bg-blue-50/20 transition"
                    onClick={() => ref.current?.click()}>
                    <Paperclip className="w-6 h-6 text-gray-300 mx-auto mb-2" />
                    <p className="text-xs text-gray-400 font-semibold">Click to add supporting documents</p>
                    <p className="text-[10px] text-gray-400 mt-1">PDF, images, Word or Excel — max 5 MB each</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {attachments.map((row, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100">
                            <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                                {getIcon(row.file)}
                            </div>
                            <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-5 gap-2 items-center">
                                <p className="sm:col-span-2 text-xs font-semibold text-gray-700 truncate" title={row.file.name}>
                                    {row.file.name}
                                    <span className="ml-1 text-gray-400 font-normal">({formatBytes(row.file.size)})</span>
                                </p>
                                <input type="text" value={row.remark}
                                    onChange={e => {
                                        const next = [...attachments];
                                        next[idx] = { ...next[idx], remark: e.target.value };
                                        onChange(next);
                                    }}
                                    placeholder="Label / remark (e.g. Bank Statement Jan)"
                                    className="sm:col-span-3 text-xs px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition outline-none" />
                            </div>
                            <button type="button" onClick={() => onChange(attachments.filter((_, i) => i !== idx))}
                                className="p-2 rounded-lg hover:bg-red-100 text-gray-400 hover:text-red-500 transition flex-shrink-0">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={() => ref.current?.click()}
                        className="w-full py-2.5 text-xs text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg border border-dashed border-gray-200 hover:border-blue-300 transition font-medium flex items-center justify-center gap-1.5">
                        <Plus className="w-3.5 h-3.5" /> Add another file
                    </button>
                </div>
            )}
        </div>
    );
};

// ─── Progress Steps ───────────────────────────────────────────────────────────

const STEPS = [
    { label: 'Order Placed', done: true },
    { label: 'Fill Details', active: true },
    { label: 'Payment', done: false },
    { label: 'Under Review', done: false },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export const OrderSubmitDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [order, setOrder] = useState<Order | null>(null);
    const [loadingOrder, setLoadingOrder] = useState(true);

    const [mobileNo, setMobileNo] = useState('');
    const [emailId, setEmailId] = useState('');
    const [fullName, setFullName] = useState('');
    const [panNumber, setPanNumber] = useState('');
    const [aadhaarNumber, setAadhaarNumber] = useState('');

    const [aadhaarFront, setAadhaarFront] = useState<File | null>(null);
    const [aadhaarBack, setAadhaarBack] = useState<File | null>(null);
    const [panFront, setPanFront] = useState<File | null>(null);
    const [panBack, setPanBack] = useState<File | null>(null);

    const [attachments, setAttachments] = useState<AdditionalAttachment[]>([]);
    const [directorships, setDirectorships] = useState<Directorship[]>([]);
    const [foreignAssets, setForeignAssets] = useState<ForeignAsset[]>([]);
    const [otherNotes, setOtherNotes] = useState('');

    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoadingOrder(true);
                const token = localStorage.getItem('token');
                const res = await fetch(`${API_BASE}/orders/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    credentials: 'include',
                });
                if (!res.ok) throw new Error('Could not load order');
                const data = await res.json();
                setOrder(data.order);
            } catch {
                toast.error('Failed to load order details. Please try again.');
            } finally {
                setLoadingOrder(false);
            }
        };
        fetchOrder();
    }, [id]);

    const planKey: PlanKey = order?.items?.[0] ? resolvePlanKey(order.items[0].planType || '') : 'BASIC';
    const planMeta = PLAN_META[planKey];
    const orderItem = order?.items?.[0] ?? null;

    const isBasic = planKey === 'BASIC';
    const hasDirectorship = planKey === 'STANDARD' || planKey === 'PREMIUM' || planKey === 'ELITE';
    const hasForeignAssets = planKey === 'PREMIUM' || planKey === 'ELITE';

    const clearError = useCallback((key: string) => {
        setFieldErrors(prev => { if (!prev[key]) return prev; const n = { ...prev }; delete n[key]; return n; });
    }, []);

    const validate = (): boolean => {
        const errs: Record<string, string> = {};
        const mobile = mobileNo.trim();
        if (!mobile) errs.mobileNo = 'Mobile number is required';
        else if (!/^[6-9]\d{9}$/.test(mobile)) errs.mobileNo = 'Enter a valid 10-digit Indian mobile number';

        const email = emailId.trim();
        if (!email) errs.emailId = 'Email address is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.emailId = 'Enter a valid email address';


        if (!aadhaarFront) errs.aadhaarFront = 'Aadhaar front is required';
        if (!aadhaarBack) errs.aadhaarBack = 'Aadhaar back is required';
        if (!panFront) errs.panFront = 'PAN card front is required';
        if (!panBack) errs.panBack = 'PAN card back is required';

        setFieldErrors(errs);
        if (Object.keys(errs).length > 0) {
            toast.error('Please fix the highlighted fields before submitting.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setSubmitting(true);
        const token = localStorage.getItem('token');
        const formData = new FormData();

        formData.append('mobileNo', mobileNo.trim());
        formData.append('emailId', emailId.trim());
        formData.append('orderItemId', String(orderItem?.id ?? ''));


        formData.append('aadhaarFront', aadhaarFront!);
        formData.append('aadhaarBack', aadhaarBack!);
        formData.append('panFront', panFront!);
        formData.append('panBack', panBack!);

        attachments.forEach(a => formData.append('attachments', a.file));
        formData.append('attachmentRemarks', JSON.stringify(attachments.map(a => a.remark)));

        if (hasDirectorship) formData.append('directorships', JSON.stringify(directorships));
        if (hasForeignAssets) formData.append('foreignAssets', JSON.stringify(foreignAssets));

        formData.append('otherNotes', otherNotes.trim());

        try {
            const res = await fetch(`${API_BASE}/itr/${planMeta.apiKey}`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
                credentials: 'include',
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || err.message || 'Submission failed');
            }
            toast.success('Details submitted! Complete your payment to begin the review process.');
            navigate('/dashboard');
        } catch (err: any) {
            toast.error(err.message || 'Failed to submit. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    // ─── Loading ──────────────────────────────────────────────────────────────

    if (loadingOrder) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-4">
                        <Loader2 className="w-7 h-7 text-blue-500 animate-spin" />
                    </div>
                    <p className="text-gray-600 font-semibold text-sm">Loading your order…</p>
                </div>
            </div>
        );
    }

    // ─── Render ───────────────────────────────────────────────────────────────

    return (
        <div className="min-h-screen bg-slate-50">

            {/* ── Sticky top nav ── */}
            <div className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
                    <button onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 font-semibold text-sm transition-colors flex-shrink-0">
                        <ArrowLeft className="w-4 h-4" /> Dashboard
                    </button>

                    {/* Progress steps */}
                    <div className="hidden sm:flex items-center gap-1">
                        {STEPS.map((step, i) => (
                            <React.Fragment key={step.label}>
                                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition ${
                                    step.done ? 'bg-gray-100 text-gray-500' :
                                    (step as any).active ? `bg-gradient-to-r ${planMeta.gradient} text-white shadow-sm` :
                                    'text-gray-300'
                                }`}>
                                    {step.done && <CheckCircle className="w-3 h-3" />}
                                    {step.label}
                                </div>
                                {i < STEPS.length - 1 && (
                                    <div className="w-5 h-px bg-gray-200" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${planMeta.badgeCls}`}>
                        {planMeta.label}
                    </div>
                </div>
            </div>

            {/* ── Page content ── */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

                {/* ── Hero banner ── */}
                <div className={`relative bg-gradient-to-r ${planMeta.gradient} rounded-2xl p-7 mb-7 shadow-xl overflow-hidden`}>
                    {/* Decorative rings */}
                    <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/5" />
                    <div className="absolute -right-8 top-8 w-40 h-40 rounded-full bg-white/5" />

                    <div className="relative flex flex-wrap items-start justify-between gap-5">
                        <div>
                            <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-2">
                                {orderItem?.serviceName || 'ITR Filing'} — Submit Your Information
                            </p>
                            <h1 className="text-2xl md:text-3xl font-black text-white mb-1.5 leading-tight">
                                {planMeta.icon} {planMeta.label}
                            </h1>
                            <p className="text-white/80 text-sm font-medium max-w-md">{planMeta.subtitle}</p>
                        </div>

                        {orderItem && (
                            <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20 flex-shrink-0">
                                <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">Your Plan</p>
                                <p className="font-black text-xl text-white leading-tight">{orderItem.planType}</p>
                                <p className="text-white/90 text-base font-black mt-0.5">₹{orderItem.price?.toLocaleString('en-IN')}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                    {/* ── Main form ── */}
                    <form onSubmit={handleSubmit} noValidate className="lg:col-span-2 space-y-5">

                        {/* 1. Contact Details */}
                        <SectionCard
                            icon={<Phone className="w-4.5 h-4.5" />}
                            title="Contact Details"
                            subtitle="We'll use these to communicate updates about your filing"
                            accent={planMeta.apiKey === 'basic' ? 'blue' : planMeta.apiKey === 'standard' ? 'amber' : planMeta.apiKey === 'premium' ? 'purple' : 'emerald'}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">
                                        Mobile Number <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        <input
                                            type="tel" value={mobileNo} maxLength={10}
                                            onChange={e => { setMobileNo(e.target.value); clearError('mobileNo'); }}
                                            placeholder="10-digit mobile number"
                                            className={`${inputCls(fieldErrors.mobileNo)} pl-10`}
                                        />
                                    </div>
                                    <FieldError msg={fieldErrors.mobileNo} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        <input
                                            type="email" value={emailId}
                                            onChange={e => { setEmailId(e.target.value); clearError('emailId'); }}
                                            placeholder="your@email.com"
                                            className={`${inputCls(fieldErrors.emailId)} pl-10`}
                                        />
                                    </div>
                                    <FieldError msg={fieldErrors.emailId} />
                                </div>
                            </div>
                        </SectionCard>

                        {/* 2. KYC Documents */}
                        <SectionCard
                            icon={<FileText className="w-4.5 h-4.5" />}
                            title="KYC Documents"
                            subtitle="Upload clear, readable copies — image or PDF, max 5 MB per file"
                            accent="indigo"
                        >
                            {/* Aadhaar row */}
                            <div className="mb-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-6 h-6 rounded-md bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                                    </div>
                                    <p className="text-xs font-black text-gray-700 uppercase tracking-wider">Aadhaar Card</p>
                                    <div className="flex-1 h-px bg-gray-100" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FileUploadZone label="Front Side" required hint="your photo side"
                                        file={aadhaarFront} onFile={f => { setAadhaarFront(f); clearError('aadhaarFront'); }}
                                        error={fieldErrors.aadhaarFront} clearError={() => clearError('aadhaarFront')} />
                                    <FileUploadZone label="Back Side" required hint="address side"
                                        file={aadhaarBack} onFile={f => { setAadhaarBack(f); clearError('aadhaarBack'); }}
                                        error={fieldErrors.aadhaarBack} clearError={() => clearError('aadhaarBack')} />
                                </div>
                            </div>

                            {/* PAN row */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center flex-shrink-0">
                                        <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                                    </div>
                                    <p className="text-xs font-black text-gray-700 uppercase tracking-wider">PAN Card</p>
                                    <div className="flex-1 h-px bg-gray-100" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FileUploadZone label="Front Side" required hint="name & PAN number side"
                                        file={panFront} onFile={f => { setPanFront(f); clearError('panFront'); }}
                                        error={fieldErrors.panFront} clearError={() => clearError('panFront')} />
                                    <FileUploadZone label="Back Side" required hint="signature side"
                                        file={panBack} onFile={f => { setPanBack(f); clearError('panBack'); }}
                                        error={fieldErrors.panBack} clearError={() => clearError('panBack')} />
                                </div>
                            </div>
                        </SectionCard>

                        {/* 4. Directorship / Unlisted Shares */}
                        {hasDirectorship && (
                            <DirectorshipsSection data={directorships} onChange={setDirectorships} />
                        )}

                        {/* 5. Foreign Assets / Income */}
                        {hasForeignAssets && (
                            <ForeignIncomeSection data={foreignAssets} onChange={setForeignAssets} />
                        )}

                        {/* 6. Extra Documents & Notes */}
                        <SectionCard
                            icon={<Paperclip className="w-4.5 h-4.5" />}
                            title="Supporting Documents & Notes"
                            subtitle="Optional — any extra files or special instructions for your CA"
                            accent="teal"
                        >
                            <div className="space-y-6">
                                <AttachmentsSection attachments={attachments} onChange={setAttachments} />

                                {/* Notes & Remarks */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Info className="w-3.5 h-3.5 text-amber-500" />
                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Notes & Remarks</p>
                                        <span className="text-[10px] text-gray-400 font-normal">(optional)</span>
                                    </div>
                                    <div className="rounded-xl border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-amber-200 focus-within:border-amber-400 transition">
                                        <textarea
                                            value={otherNotes}
                                            onChange={e => setOtherNotes(e.target.value)}
                                            maxLength={2000}
                                            rows={4}
                                            placeholder="e.g. I have capital gains from mutual fund redemption in March. Please account for TDS already deducted on FD interest. My employer is in a special economic zone…"
                                            className="w-full px-4 py-3.5 text-sm text-gray-700 placeholder-gray-300 bg-white outline-none resize-none leading-relaxed"
                                        />
                                        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-t border-gray-100">
                                            <p className="text-[10px] text-gray-400">Visible only to your assigned CA</p>
                                            <p className="text-[10px] text-gray-400 font-mono">{otherNotes.length}/2000</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SectionCard>

                        {/* Submit bar */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                            <button type="button" onClick={() => navigate('/dashboard')}
                                className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition text-sm w-full sm:w-auto justify-center">
                                <ArrowLeft className="w-4 h-4" /> Cancel
                            </button>
                            <button type="submit" disabled={submitting}
                                className={`flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-black text-white text-sm shadow-lg transition-all w-full sm:w-auto justify-center ${
                                    submitting ? 'bg-gray-400 cursor-not-allowed'
                                    : `bg-gradient-to-r ${planMeta.gradient} hover:shadow-xl hover:-translate-y-0.5`
                                }`}>
                                {submitting
                                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
                                    : <><CreditCard className="w-4 h-4" /> Submit &amp; Proceed to Payment <ArrowRight className="w-4 h-4" /></>
                                }
                            </button>
                        </div>
                    </form>

                    {/* ── Sidebar ── */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-20 space-y-4">

                            {/* What to fill */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                                <div className="flex items-center gap-2.5 mb-4">
                                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${planMeta.gradient} flex items-center justify-center`}>
                                        <Info className="w-4 h-4 text-white" />
                                    </div>
                                    <p className="font-black text-gray-800 text-sm">What you need</p>
                                </div>
                                <ul className="space-y-2.5">
                                    {planMeta.checklist.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Security */}
                            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 text-white">
                                <div className="flex items-center gap-2 mb-3">
                                    <Lock className="w-4 h-4 text-emerald-400" />
                                    <p className="font-black text-sm">Secure Submission</p>
                                </div>
                                <ul className="space-y-2">
                                    {['All files encrypted at rest', 'Accessible only to your CA', 'Data retained per IT Act rules', '256-bit SSL in transit'].map(t => (
                                        <li key={t} className="flex items-center gap-2 text-xs text-slate-300">
                                            <BadgeCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> {t}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Plan price summary */}
                            {orderItem && (
                                <div className={`bg-gradient-to-br ${planMeta.gradient} rounded-2xl p-5 text-white shadow-lg`}>
                                    <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">Plan Total</p>
                                    <p className="text-3xl font-black">₹{orderItem.price?.toLocaleString('en-IN')}</p>
                                    <p className="text-white/70 text-xs mt-1 font-medium">Payable after form submission</p>
                                    <div className="mt-4 pt-4 border-t border-white/20 flex items-center gap-2 text-white/80 text-xs font-medium">
                                        <CreditCard className="w-3.5 h-3.5" /> Secure payment via Razorpay
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
