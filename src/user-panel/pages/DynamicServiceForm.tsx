import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, CheckCircle, Loader2, Upload, X, FileText,
  Save, Send, ChevronRight, AlertCircle, Info, Phone, Mail,
  BadgeCheck, RefreshCw,
} from 'lucide-react';
import { toast } from 'sonner';
import api from '../../utils/api';

// ── Types ─────────────────────────────────────────────────────────────────────
interface FormField {
  key: string;
  label: string;
  type: string;
  options?: any[];          // string[] for select; TableColumn[] for table
  placeholder?: string;
  required: boolean;
  validation?: { pattern?: string; message?: string };
}
interface FormSection { [group: string]: FormField[] }
interface DocRequirement {
  key: string; label: string; mandatory: boolean;
  acceptedTypes: string; maxSizeMb: number;
}
interface FormSchema {
  service: { id: number; name: string; slug: string };
  planType: string;
  formSections: FormSection;
  documentRequirements: DocRequirement[];
}
interface Submission {
  id: number; status: string;
  formData: Record<string, any>;
  serviceId: number; planId: number;
}

// ── Plan colours ───────────────────────────────────────────────────────────────
const PLAN_STYLE: Record<string, string> = {
  BASIC: 'bg-slate-100 text-slate-700',
  STANDARD: 'bg-blue-100 text-blue-700',
  PREMIUM: 'bg-violet-100 text-violet-700',
  ELITE: 'bg-amber-100 text-amber-700',
};

// ── Group label map ────────────────────────────────────────────────────────────
const GROUP_LABELS: Record<string, string> = {
  general: 'General Information', personal: 'Personal Details',
  applicant: 'Applicant Details', owner: 'Owner Details',
  karta: 'Karta Details', huf: 'HUF Details',
  contact: 'Contact Information', address: 'Address Details',
  business: 'Business Details', firm: 'Firm Details',
  company: 'Company Details', llp: 'LLP Details',
  director: 'Director Details', directors: 'Directors Information',
  partners: 'Partners Information', nominee: 'Nominee Details',
  finance: 'Financial Details', financials: 'Financial Information',
  income: 'Income Details', business_income: 'Business Income',
  capital_gains: 'Capital Gains', other_income: 'Other Income',
  gst: 'GST Details', figures: 'Tax Figures',
  bank: 'Bank Details', tax: 'Tax Details',
  dsc: 'DSC Details', startup: 'Startup Details',
  preferences: 'Preferences', enterprise: 'Enterprise Details',
  operator: 'Operator Details', audit: 'Audit Details',
  trademark: 'Trademark Details', shareholders: 'Shareholders',
  aadhaar: 'Aadhaar Details', details: 'Application Details',
};
const groupLabel = (key: string) =>
  GROUP_LABELS[key] || key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

// ── Repeatable table (field_type = 'table') ───────────────────────────────────
interface TableColumn { key: string; label: string; type?: string }

const RepeatableTable: React.FC<{
  field: FormField;
  value: any;
  onChange: (k: string, v: any) => void;
}> = ({ field, value, onChange }) => {
  // columns come from field.options (parsed from DB field_options JSON)
  const columns: TableColumn[] = Array.isArray(field.options)
    ? field.options as unknown as TableColumn[]
    : [];
  const rows: Record<string, string>[] = Array.isArray(value) ? value : [];

  const addRow = () => {
    const empty = Object.fromEntries(columns.map(c => [c.key, '']));
    onChange(field.key, [...rows, empty]);
  };

  const updateCell = (rowIdx: number, colKey: string, val: string) => {
    onChange(field.key, rows.map((r, i) => i === rowIdx ? { ...r, [colKey]: val } : r));
  };

  const removeRow = (rowIdx: number) => {
    onChange(field.key, rows.filter((_, i) => i !== rowIdx));
  };

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-3 py-2.5 text-[10px] font-black text-slate-400 uppercase tracking-wider text-center w-8">#</th>
              {columns.map(col => (
                <th key={col.key} className="px-3 py-2.5 text-[10px] font-black text-slate-500 uppercase tracking-wider text-left whitespace-nowrap">
                  {col.label}
                </th>
              ))}
              <th className="w-9 px-2" />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="text-center py-8 text-slate-300 text-xs font-medium"
                >
                  No entries yet — click <strong className="text-indigo-500">+ Add Row</strong> below
                </td>
              </tr>
            ) : rows.map((row, rowIdx) => (
              <tr key={rowIdx} className="border-b border-slate-100 last:border-0 hover:bg-indigo-50/20 transition-colors">
                <td className="px-3 py-2 text-center text-[10px] font-black text-slate-400">{rowIdx + 1}</td>
                {columns.map(col => (
                  <td key={col.key} className="px-2 py-1.5">
                    <input
                      type={col.type === 'date' ? 'date' : col.type === 'number' ? 'number' : 'text'}
                      value={row[col.key] ?? ''}
                      onChange={e => updateCell(rowIdx, col.key, e.target.value)}
                      className="w-full min-w-[90px] px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100/50 outline-none font-medium text-slate-700 placeholder:text-slate-300 transition-all"
                      placeholder={col.label}
                    />
                  </td>
                ))}
                <td className="px-2 py-1.5">
                  <button
                    type="button"
                    onClick={() => removeRow(rowIdx)}
                    className="w-7 h-7 rounded-lg border border-red-100 bg-red-50 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-100 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        onClick={addRow}
        className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors group"
      >
        <span className="w-6 h-6 rounded-lg bg-indigo-100 group-hover:bg-indigo-200 flex items-center justify-center text-indigo-600 font-black text-sm leading-none transition-colors">+</span>
        Add Row
      </button>
    </div>
  );
};

// ── Field renderer ─────────────────────────────────────────────────────────────
const FieldInput: React.FC<{
  field: FormField; value: any;
  onChange: (k: string, v: any) => void; error?: string;
}> = ({ field, value, onChange, error }) => {
  const base = `w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all font-medium placeholder:text-slate-400 placeholder:font-normal ${
    error
      ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100'
      : 'border-slate-200 bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'
  }`;

  // Dynamic row table (e.g. director details, share schedule)
  if (field.type === 'table') {
    return <RepeatableTable field={field} value={value} onChange={onChange} />;
  }

  if (field.type === 'select' && field.options?.length) {
    return (
      <select className={base} value={value ?? ''} onChange={e => onChange(field.key, e.target.value)}>
        <option value="">Select {field.label}</option>
        {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    );
  }
  if (field.type === 'textarea') {
    return (
      <textarea
        className={`${base} resize-none min-h-[90px]`}
        value={value ?? ''} placeholder={field.placeholder}
        onChange={e => onChange(field.key, e.target.value)} rows={3}
      />
    );
  }
  // Phone / email with icon prefix
  if (field.type === 'email' || field.type === 'phone' || field.key.includes('mobile') || field.key.includes('phone')) {
    const Icon = (field.type === 'email' || field.key.includes('email')) ? Mail : Phone;
    return (
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <input
          type={field.type === 'email' || field.key.includes('email') ? 'email' : 'tel'}
          className={`${base} pl-9`}
          value={value ?? ''} placeholder={field.placeholder || field.label}
          onChange={e => onChange(field.key, e.target.value)}
        />
      </div>
    );
  }
  return (
    <input
      type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
      className={base}
      value={value ?? ''} placeholder={field.placeholder}
      onChange={e => onChange(field.key, e.target.value)}
    />
  );
};

// ── Document upload card ───────────────────────────────────────────────────────
const DocUploadCard: React.FC<{
  doc: DocRequirement; submissionId: number;
  onUploaded: (key: string, name: string) => void; uploaded?: string;
}> = ({ doc, submissionId, onUploaded, uploaded }) => {
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    if (file.size > doc.maxSizeMb * 1024 * 1024) {
      toast.error(`Max size: ${doc.maxSizeMb}MB`); return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('docKey', doc.key);
      await api.post(`/submissions/${submissionId}/documents`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onUploaded(doc.key, file.name);
      toast.success(`${doc.label} uploaded`);
    } catch (e: any) {
      toast.error(e.response?.data?.error || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) upload(f); }}
      onClick={() => !uploading && inputRef.current?.click()}
      className={`relative cursor-pointer rounded-2xl border-2 p-4 transition-all ${
        uploaded
          ? 'border-emerald-200 bg-emerald-50'
          : dragging
          ? 'border-indigo-400 bg-indigo-50'
          : 'border-dashed border-slate-200 bg-slate-50/50 hover:border-indigo-300 hover:bg-indigo-50/20'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
          uploaded ? 'bg-emerald-100' : 'bg-white border border-slate-200'
        }`}>
          {uploading
            ? <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
            : uploaded
            ? <CheckCircle className="w-4 h-4 text-emerald-600" />
            : <Upload className="w-4 h-4 text-slate-400" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-800 truncate">{doc.label}</p>
          <p className="text-xs font-medium mt-0.5">
            {doc.mandatory
              ? <span className="text-red-500">Required</span>
              : <span className="text-slate-400">Optional</span>}
            {' · '}<span className="text-slate-400">Max {doc.maxSizeMb}MB</span>
          </p>
          {uploaded && (
            <p className="text-xs text-emerald-600 font-semibold mt-1 truncate">✓ {uploaded}</p>
          )}
          {!uploaded && !uploading && (
            <p className="text-xs text-indigo-500 font-semibold mt-1">
              Click to upload or drag & drop
            </p>
          )}
        </div>
        {uploaded && (
          <span className="shrink-0 text-[10px] font-black px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700 uppercase tracking-wider">
            Done
          </span>
        )}
      </div>
      <input
        ref={inputRef} type="file" className="hidden"
        accept={doc.acceptedTypes || 'image/*,application/pdf'}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ''; }}
        disabled={uploading}
      />
    </div>
  );
};

// ── Progress bar ───────────────────────────────────────────────────────────────
const ProgressBar: React.FC<{ value: number; color?: string }> = ({ value, color = 'bg-indigo-500' }) => (
  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
    <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${Math.min(100, value)}%` }} />
  </div>
);

// ── Main Component ─────────────────────────────────────────────────────────────
export const DynamicServiceForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();   // orderItemId
  const navigate = useNavigate();

  const [schema, setSchema] = useState<FormSchema | null>(null);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<'form' | 'docs' | 'done'>('form');
  const [activeGroup, setActiveGroup] = useState('');

  // ── Init ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const itemRes = await api.get(`/orders/items/${id}`);
        const item = itemRes.data.orderItem || itemRes.data.item || itemRes.data;
        const serviceId = item.serviceId || item.service_id;
        const planType = (item.planType || item.plan_type || 'BASIC').toUpperCase();

        const schemaRes = await api.get(`/services/${serviceId}/form-schema/${planType}`);
        const s: FormSchema = schemaRes.data;
        setSchema(s);
        const groups = Object.keys(s.formSections);
        if (groups.length) setActiveGroup(groups[0]);

        // Try to find existing submission for this order item
        let sub: Submission;
        try {
          const listRes = await api.get(`/submissions?orderItemId=${id}`);
          const existing = listRes.data.submissions?.[0];
          if (existing) {
            const detailRes = await api.get(`/submissions/${existing.id}`);
            sub = { ...detailRes.data.submission, formData: detailRes.data.submission.formData || {} };
            const docs: Record<string, string> = {};
            (detailRes.data.documents || []).forEach((d: any) => { docs[d.docKey] = d.fileName; });
            setUploadedDocs(docs);
          } else {
            throw new Error('no existing');
          }
        } catch {
          const subRes = await api.post('/submissions', {
            serviceId,
            planId: item.planId || item.plan_id,
            orderItemId: parseInt(id!),
          });
          sub = { ...subRes.data.submission, formData: {} };
        }

        setSubmission(sub);
        setFormData(sub.formData || {});
      } catch (err: any) {
        toast.error(err.response?.data?.error || 'Failed to load form');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    if (id) init();
  }, [id]);

  const handleChange = useCallback((key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setErrors(prev => { const n = { ...prev }; delete n[key]; return n; });
  }, []);

  const validate = () => {
    if (!schema) return false;
    const newErrors: Record<string, string> = {};
    Object.values(schema.formSections).forEach(fields => {
      fields.forEach(f => {
        if (f.required && (!formData[f.key] || formData[f.key] === ''))
          newErrors[f.key] = `${f.label} is required`;
        else if (formData[f.key] && f.validation?.pattern) {
          if (!new RegExp(f.validation.pattern).test(formData[f.key]))
            newErrors[f.key] = f.validation.message || 'Invalid format';
        }
      });
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!submission) return;
    setSaving(true);
    try {
      await api.put(`/submissions/${submission.id}`, { formData });
      toast.success('Progress saved');
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  const handleContinueToDocs = async () => {
    if (!validate()) {
      toast.error('Please fix all required fields');
      if (schema) {
        for (const [group, fields] of Object.entries(schema.formSections)) {
          if (fields.some(f => errors[f.key])) { setActiveGroup(group); break; }
        }
      }
      return;
    }
    await handleSave();
    setStep('docs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitForReview = async () => {
    if (!submission) return;
    setSubmitting(true);
    try {
      await api.post(`/submissions/${submission.id}/submit`);
      setStep('done');
      toast.success('Application submitted for review!');
    } catch (err: any) {
      const data = err.response?.data;
      if (data?.missingFields?.length) {
        toast.error(`Missing: ${data.missingFields.map((f: any) => f.label).join(', ')}`);
        setStep('form');
      } else if (data?.missingDocs?.length) {
        toast.error(`Missing docs: ${data.missingDocs.map((d: any) => d.label).join(', ')}`);
      } else {
        toast.error(data?.error || 'Submission failed');
      }
    } finally { setSubmitting(false); }
  };

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center mx-auto mb-5 shadow-xl shadow-indigo-100">
            <Loader2 className="w-9 h-9 text-indigo-500 animate-spin" />
          </div>
          <p className="font-black text-slate-800 text-lg">Loading your form…</p>
          <p className="text-sm text-slate-400 font-medium mt-1">Fetching service details</p>
        </div>
      </div>
    );
  }

  if (!schema || !submission) return null;

  const groups = Object.keys(schema.formSections);
  const allRequiredFields = Object.values(schema.formSections).flat().filter(f => f.required);
  const filledRequired = allRequiredFields.filter(f => formData[f.key] && formData[f.key] !== '');
  const formProgress = allRequiredFields.length > 0
    ? Math.round((filledRequired.length / allRequiredFields.length) * 100)
    : 100;

  const mandatoryDocs = schema.documentRequirements.filter(d => d.mandatory);
  const optionalDocs = schema.documentRequirements.filter(d => !d.mandatory);
  const uploadedMandatory = mandatoryDocs.filter(d => uploadedDocs[d.key]).length;
  const docsProgress = mandatoryDocs.length > 0
    ? Math.round((uploadedMandatory / mandatoryDocs.length) * 100)
    : 100;

  // ── Done ──────────────────────────────────────────────────────────────────
  if (step === 'done') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-900/10 border border-slate-100 p-8 max-w-md w-full text-center">
          <div className="w-24 h-24 rounded-3xl bg-emerald-100 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-100">
            <CheckCircle className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-2">Application Submitted!</h1>
          <p className="text-slate-500 font-medium mb-1">
            Your <strong className="text-slate-700">{schema.service.name}</strong> application is under review.
          </p>
          <p className="text-sm text-slate-400 font-medium mb-6">
            Our CA team will reach out within 1–2 business days.
          </p>
          <div className="bg-slate-50 rounded-2xl p-4 mb-6 text-left space-y-2.5">
            {[
              { dot: 'bg-emerald-400', label: 'Application received' },
              { dot: 'bg-indigo-400', label: 'CA assigned within 24 hours' },
              { dot: 'bg-amber-400', label: 'Review & processing begins' },
              { dot: 'bg-slate-300', label: 'Completion & delivery' },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-2.5">
                <div className={`w-2 h-2 rounded-full shrink-0 ${s.dot}`} />
                <span className="text-xs text-slate-600 font-semibold">{s.label}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-indigo-600 text-white py-3.5 rounded-2xl font-black hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-xl shadow-indigo-500/25"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Sticky Header ── */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => step === 'docs' ? setStep('form') : navigate('/dashboard')}
              className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="font-black text-slate-900 text-sm sm:text-base truncate">{schema.service.name}</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${PLAN_STYLE[schema.planType] || PLAN_STYLE.BASIC}`}>
                  {schema.planType}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {step === 'form' ? `${filledRequired.length}/${allRequiredFields.length} required fields` : `${uploadedMandatory}/${mandatoryDocs.length} required docs`}
                </span>
              </div>
            </div>
            {/* Step pills */}
            <div className="hidden sm:flex items-center gap-1.5 shrink-0">
              {(['form', 'docs'] as const).map((s, i) => (
                <React.Fragment key={s}>
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-black transition-all ${
                    step === s ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                    : s === 'form' && step === 'docs' ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-slate-100 text-slate-400'
                  }`}>
                    {s === 'form' && step === 'docs'
                      ? <CheckCircle className="w-3 h-3" />
                      : <span className="w-4 h-4 rounded-full bg-current/20 flex items-center justify-center text-[9px]">{i + 1}</span>}
                    {s === 'form' ? 'Details' : 'Documents'}
                  </div>
                  {i === 0 && <ChevronRight className="w-3 h-3 text-slate-300" />}
                </React.Fragment>
              ))}
            </div>
            <button
              onClick={handleSave} disabled={saving}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all disabled:opacity-40 shrink-0"
            >
              {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
              Save
            </button>
          </div>
          {/* Progress bar */}
          <div className="mt-2.5">
            <ProgressBar value={step === 'form' ? formProgress : docsProgress} />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">

        {/* ══ FORM STEP ══ */}
        {step === 'form' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

            {/* Sidebar nav */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-900/5 p-4 sticky top-20">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-2">Sections</p>
                <nav className="space-y-0.5">
                  {groups.map(group => {
                    const fields = schema.formSections[group];
                    const hasErr = fields.some(f => errors[f.key]);
                    const done = fields.filter(f => f.required && formData[f.key] && formData[f.key] !== '').length
                      === fields.filter(f => f.required).length;
                    return (
                      <button
                        key={group}
                        onClick={() => {
                          setActiveGroup(group);
                          document.getElementById(`section-${group}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-center justify-between gap-2 transition-all font-semibold ${
                          activeGroup === group
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <span className="truncate">{groupLabel(group)}</span>
                        {hasErr
                          ? <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                          : done
                          ? <CheckCircle className={`w-3.5 h-3.5 shrink-0 ${activeGroup === group ? 'text-white/70' : 'text-emerald-500'}`} />
                          : null}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Form fields */}
            <div className="lg:col-span-3 space-y-5">
              {groups.length === 0 && (
                <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-900/5 p-8 text-center">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="font-black text-slate-900 text-lg mb-2">No Additional Details Required</h3>
                  <p className="text-sm text-slate-400 font-medium mb-6">
                    This service doesn't need any extra form fields. Proceed to upload your documents.
                  </p>
                </div>
              )}
              {groups.map(group => {
                const fields = schema.formSections[group];
                return (
                  <div
                    key={group} id={`section-${group}`}
                    className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-900/5 p-6"
                  >
                    <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-50">
                      <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                        <BadgeCheck className="w-4 h-4 text-indigo-600" />
                      </div>
                      <h3 className="font-black text-slate-900">{groupLabel(group)}</h3>
                      <span className="ml-auto text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                        {fields.length} field{fields.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {fields.map(field => (
                        <div
                          key={field.key}
                          className={
                            field.type === 'table' ||
                            field.type === 'textarea' ||
                            field.key.includes('address')
                              ? 'sm:col-span-2'
                              : ''
                          }
                        >
                          <label className="block text-xs font-bold text-slate-600 mb-1.5">
                            {field.label}
                            {field.required && <span className="text-red-400 ml-0.5">*</span>}
                          </label>
                          <FieldInput
                            field={field} value={formData[field.key]}
                            onChange={handleChange} error={errors[field.key]}
                          />
                          {errors[field.key] && (
                            <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                              <AlertCircle className="w-3 h-3 shrink-0" /> {errors[field.key]}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Bottom action row */}
              <div className="flex items-center justify-between pt-2 pb-10">
                <button
                  onClick={() => { handleSave(); navigate('/dashboard'); }}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Save & Exit
                </button>
                <button
                  onClick={handleContinueToDocs}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-black hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-xl shadow-indigo-500/25"
                >
                  Continue to Documents
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══ DOCS STEP ══ */}
        {step === 'docs' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Sidebar info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-900/5 p-5 sticky top-20 space-y-4">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Upload Progress</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-600">
                      <span>Required</span>
                      <span>{uploadedMandatory}/{mandatoryDocs.length}</span>
                    </div>
                    <ProgressBar value={docsProgress} color="bg-emerald-500" />
                  </div>
                </div>

                {mandatoryDocs.length > 0 && (
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Required Docs</p>
                    <div className="space-y-1.5">
                      {mandatoryDocs.map(d => (
                        <div key={d.key} className="flex items-center gap-2 text-xs font-semibold">
                          {uploadedDocs[d.key]
                            ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            : <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-200 shrink-0" />}
                          <span className={uploadedDocs[d.key] ? 'text-slate-400 line-through' : 'text-slate-700'}>
                            {d.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3">
                  <div className="flex items-start gap-2">
                    <Info className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                    <p className="text-[11px] text-blue-700 font-medium leading-relaxed">
                      Upload clear, readable copies. Supported: JPG, PNG, PDF. Max size per file is shown on each card.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Upload cards */}
            <div className="lg:col-span-2 space-y-5">
              {mandatoryDocs.length > 0 && (
                <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-900/5 p-6">
                  <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-50">
                    <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-red-500" />
                    </div>
                    <h3 className="font-black text-slate-900">Required Documents</h3>
                    <span className="ml-auto text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      {uploadedMandatory}/{mandatoryDocs.length} uploaded
                    </span>
                  </div>
                  <div className="space-y-3">
                    {mandatoryDocs.map(doc => (
                      <DocUploadCard
                        key={doc.key} doc={doc}
                        submissionId={submission.id}
                        onUploaded={(k, n) => setUploadedDocs(prev => ({ ...prev, [k]: n }))}
                        uploaded={uploadedDocs[doc.key]}
                      />
                    ))}
                  </div>
                </div>
              )}

              {optionalDocs.length > 0 && (
                <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-900/5 p-6">
                  <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-50">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                      <Upload className="w-4 h-4 text-slate-500" />
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900">Optional Documents</h3>
                      <p className="text-xs text-slate-400 font-medium">These are not required but help speed up processing</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {optionalDocs.map(doc => (
                      <DocUploadCard
                        key={doc.key} doc={doc}
                        submissionId={submission.id}
                        onUploaded={(k, n) => setUploadedDocs(prev => ({ ...prev, [k]: n }))}
                        uploaded={uploadedDocs[doc.key]}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Submit row */}
              <div className="flex items-center justify-between pt-2 pb-10">
                <button
                  onClick={() => setStep('form')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Form
                </button>
                <button
                  onClick={handleSubmitForReview}
                  disabled={submitting || (mandatoryDocs.length > 0 && uploadedMandatory < mandatoryDocs.length)}
                  className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl text-sm font-black hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-xl shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {submitting
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
                    : <><Send className="w-4 h-4" /> Submit Application</>}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
