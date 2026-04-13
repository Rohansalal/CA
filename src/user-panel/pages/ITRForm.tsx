/**
 * ITR Filing Form — Dynamic per plan:
 *   BASIC:            Aadhaar, PAN, Mobile, Email, Attachments, Notes
 *   STANDARD:         + Directorship/Unlisted Shares tables
 *   PREMIUM / ELITE:  + Foreign Income/Foreign Assets
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload, X, Plus, Trash2, FileText, CheckCircle, Loader2,
  Phone, Mail, StickyNote, Paperclip, Building2, Globe,
  ChevronDown, ChevronUp, AlertCircle, Save, Send, Info,
} from 'lucide-react';
import { toast } from 'sonner';
import api from '../../utils/api';

// ── Plan hierarchy ─────────────────────────────────────────────────────────────
const PLAN_LEVEL: Record<string, number> = { BASIC: 0, STANDARD: 1, PREMIUM: 2, ELITE: 3 };
const atLeast = (plan: string, min: string) => (PLAN_LEVEL[plan] ?? 0) >= (PLAN_LEVEL[min] ?? 0);

// ── Types ──────────────────────────────────────────────────────────────────────
interface UploadSlot { file: File | null; preview: string | null; docKey: string; uploaded?: boolean; }
interface Attachment { id: string; file: File | null; remark: string; uploaded?: boolean; }
interface DirectorshipRow {
  id: string;
  companyName: string; companyPan: string;
  companyType: string; listedStatus: string; din: string;
  // Share details
  openingShares: string; openingCost: string;
  acquiredShares: string; acquiredDate: string;
  faceValue: string; issuePrice: string; purchasePrice: string;
  transferredShares: string; saleConsideration: string;
  closingShares: string; closingCost: string;
}

const mkDir = (id: string): DirectorshipRow => ({
  id, companyName: '', companyPan: '', companyType: 'Domestic', listedStatus: 'Unlisted', din: '',
  openingShares: '', openingCost: '',
  acquiredShares: '', acquiredDate: '', faceValue: '', issuePrice: '', purchasePrice: '',
  transferredShares: '', saleConsideration: '',
  closingShares: '', closingCost: '',
});

// ── File Upload Zone ───────────────────────────────────────────────────────────
const UploadZone: React.FC<{
  label: string; sub?: string; slot: UploadSlot;
  onChange: (s: UploadSlot) => void; required?: boolean;
}> = ({ label, sub, slot, onChange, required = true }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  const handle = (file: File) => {
    if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
      toast.error('Only JPG, PNG, PDF'); return;
    }
    if (file.size > 5 * 1024 * 1024) { toast.error('Max 5 MB'); return; }
    onChange({ ...slot, file, preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null });
  };

  if (slot.uploaded) {
    return (
      <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2.5">
        <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
        <span className="text-xs font-semibold text-green-700 truncate">{label} — uploaded</span>
        <label className="ml-auto text-xs text-green-600 cursor-pointer hover:text-green-800 shrink-0">
          Replace<input type="file" className="hidden" accept="image/*,application/pdf" onChange={(e) => { const f = e.target.files?.[0]; if (f) handle(f); e.target.value = ''; }} />
        </label>
      </div>
    );
  }

  if (slot.file) {
    return (
      <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2.5">
        {slot.preview
          ? <img src={slot.preview} alt="" className="w-10 h-10 rounded-lg object-cover border border-emerald-200 shrink-0" />
          : <div className="w-10 h-10 rounded-lg bg-white border border-emerald-200 flex items-center justify-center shrink-0"><FileText className="w-4 h-4 text-emerald-600" /></div>}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-emerald-800 truncate">{slot.file.name}</p>
          <p className="text-[11px] text-emerald-500">{(slot.file.size / 1024).toFixed(0)} KB</p>
        </div>
        <button type="button" onClick={() => onChange({ ...slot, file: null, preview: null })}
          className="p-1.5 rounded-lg hover:bg-emerald-100 text-emerald-600 transition-colors shrink-0"><X className="w-3.5 h-3.5" /></button>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs font-semibold text-gray-600 mb-1">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</p>
      {sub && <p className="text-[11px] text-gray-400 mb-1.5">{sub}</p>}
      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) handle(f); }}
        onClick={() => ref.current?.click()}
        className={`cursor-pointer flex items-center justify-center gap-2 py-4 px-3 rounded-xl border-2 border-dashed transition-all ${drag ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50/30'}`}
      >
        <Upload className="w-4 h-4 text-gray-400" />
        <p className="text-xs text-gray-500"><span className="font-semibold text-indigo-600">Click</span> or drag & drop · JPG, PNG, PDF</p>
        <input ref={ref} type="file" className="hidden" accept="image/jpeg,image/png,application/pdf"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handle(f); e.target.value = ''; }} />
      </div>
    </div>
  );
};

// ── Step badge ─────────────────────────────────────────────────────────────────
const Step: React.FC<{ n: number | string; label: string }> = ({ n, label }) => (
  <div className="flex items-center gap-2 mb-3">
    <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
      <span className="text-xs font-bold text-white">{n}</span>
    </div>
    <h3 className="font-bold text-gray-800 text-sm">{label}</h3>
  </div>
);

// ── Main ITR Form Component ────────────────────────────────────────────────────
interface Props {
  submissionId: number;
  orderItemId: number | string;
  planType: string;
  initialData?: Record<string, any>;
  uploadedDocs?: Record<string, string>;
  onSubmitted: () => void;
}

export const ITRFormContent: React.FC<Props> = ({
  submissionId, orderItemId, planType, initialData = {}, uploadedDocs = {}, onSubmitted,
}) => {
  const navigate = useNavigate();

  // ── Basic fields ──────────────────────────────────────────────────────────
  const [mobile, setMobile] = useState(initialData.mobile || '');
  const [email, setEmail] = useState(initialData.email || '');

  // ── Document uploads (front/back) ─────────────────────────────────────────
  const [aadhaarFront, setAadhaarFront] = useState<UploadSlot>({ file: null, preview: null, docKey: 'aadhaar_front', uploaded: !!uploadedDocs['aadhaar_front'] });
  const [aadhaarBack, setAadhaarBack] = useState<UploadSlot>({ file: null, preview: null, docKey: 'aadhaar_back', uploaded: !!uploadedDocs['aadhaar_back'] });
  const [panFront, setPanFront] = useState<UploadSlot>({ file: null, preview: null, docKey: 'pan_front', uploaded: !!uploadedDocs['pan_front'] });
  const [panBack, setPanBack] = useState<UploadSlot>({ file: null, preview: null, docKey: 'pan_back', uploaded: !!uploadedDocs['pan_back'] });

  // ── Attachments (dynamic) ────────────────────────────────────────────────
  const [attachments, setAttachments] = useState<Attachment[]>(
    initialData.attachments || []
  );
  const attachInputRef = useRef<HTMLInputElement>(null);

  // ── Directorship (STANDARD+) ─────────────────────────────────────────────
  const [dirRows, setDirRows] = useState<DirectorshipRow[]>(
    initialData.directorships?.length ? initialData.directorships.map((d: any, i: number) => ({ ...mkDir(String(i)), ...d })) : []
  );
  const [dirExpanded, setDirExpanded] = useState(true);

  // ── Foreign income (PREMIUM+) ────────────────────────────────────────────
  const [foreignItems, setForeignItems] = useState<{ id: string; description: string; amount: string; country: string; }[]>(
    initialData.foreignIncome?.length ? initialData.foreignIncome : []
  );
  const [foreignExpanded, setForeignExpanded] = useState(true);

  // ── Notes ────────────────────────────────────────────────────────────────
  const [notes, setNotes] = useState(initialData.notes || '');

  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, boolean>>({});

  // ── Upload a file slot ────────────────────────────────────────────────────
  const uploadSlot = async (slot: UploadSlot): Promise<boolean> => {
    if (!slot.file || slot.uploaded) return true;
    try {
      const fd = new FormData();
      fd.append('file', slot.file);
      fd.append('docKey', slot.docKey);
      await api.post(`/submissions/${submissionId}/documents`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return true;
    } catch {
      return false;
    }
  };

  // ── Upload attachment ─────────────────────────────────────────────────────
  const uploadAttachment = async (att: Attachment, idx: number): Promise<boolean> => {
    if (!att.file || att.uploaded) return true;
    try {
      const fd = new FormData();
      fd.append('file', att.file);
      fd.append('docKey', `attachment_${idx}`);
      await api.post(`/submissions/${submissionId}/documents`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return true;
    } catch {
      return false;
    }
  };

  // ── Save form data ────────────────────────────────────────────────────────
  const saveFormData = async () => {
    await api.put(`/submissions/${submissionId}`, {
      formData: {
        mobile, email, notes,
        directorships: dirRows,
        foreignIncome: foreignItems,
        attachments: attachments.map(a => ({ id: a.id, remark: a.remark, hasFile: !!a.file })),
      },
    });
  };

  // ── Save & continue ───────────────────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    try {
      await saveFormData();
      toast.success('Progress saved');
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    // Validate
    if (!/^[6-9]\d{9}$/.test(mobile)) { toast.error('Enter valid 10-digit mobile number'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast.error('Enter valid email address'); return; }
    if (!aadhaarFront.file && !aadhaarFront.uploaded) { toast.error('Aadhaar Front is required'); return; }
    if (!aadhaarBack.file && !aadhaarBack.uploaded) { toast.error('Aadhaar Back is required'); return; }
    if (!panFront.file && !panFront.uploaded) { toast.error('PAN Front is required'); return; }
    if (!panBack.file && !panBack.uploaded) { toast.error('PAN Back is required'); return; }

    setSubmitting(true);
    try {
      // 1. Save form data
      await saveFormData();

      // 2. Upload doc slots
      const docSlots = [aadhaarFront, aadhaarBack, panFront, panBack];
      for (const slot of docSlots) {
        const ok = await uploadSlot(slot);
        if (!ok) toast.warning(`Could not upload ${slot.docKey.replace('_', ' ')} — you can re-upload from dashboard`);
      }

      // 3. Upload attachments
      for (let i = 0; i < attachments.length; i++) {
        await uploadAttachment(attachments[i], i);
      }

      // 4. Submit for review
      await api.post(`/submissions/${submissionId}/submit`);
      toast.success('Application submitted successfully!');
      onSubmitted();
    } catch (err: any) {
      const d = err.response?.data;
      if (d?.missingFields?.length) {
        toast.error(`Missing: ${d.missingFields.map((f: any) => f.label).join(', ')}`);
      } else if (d?.missingDocs?.length) {
        toast.error(`Missing docs: ${d.missingDocs.map((f: any) => f.label).join(', ')}`);
      } else {
        toast.error(d?.error || 'Submission failed');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const isStandard = atLeast(planType, 'STANDARD');
  const isPremium = atLeast(planType, 'PREMIUM');

  return (
    <div className="space-y-5">

      {/* ── Section 1 & 2: Aadhaar + PAN ──────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <Step n={1} label="Aadhaar Card" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <UploadZone label="Aadhaar — Front" sub="Upload front side of Aadhaar card" slot={aadhaarFront} onChange={setAadhaarFront} />
          <UploadZone label="Aadhaar — Back" sub="Upload back side of Aadhaar card" slot={aadhaarBack} onChange={setAadhaarBack} />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <Step n={2} label="PAN Card" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <UploadZone label="PAN — Front" sub="Upload front side of PAN card" slot={panFront} onChange={setPanFront} />
          <UploadZone label="PAN — Back" sub="Upload back side of PAN card" slot={panBack} onChange={setPanBack} />
        </div>
      </div>

      {/* ── Section 3 & 4: Mobile + Email ──────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Step n={3} label="Mobile Number" />
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
              <span className="px-3 py-2.5 bg-gray-50 border-r border-gray-200 text-gray-500 text-sm">
                <Phone className="w-4 h-4" />
              </span>
              <input
                type="tel" value={mobile} maxLength={10}
                onChange={e => setMobile(e.target.value.replace(/\D/g, ''))}
                placeholder="10-digit mobile number"
                className="flex-1 px-3 py-2.5 text-sm outline-none bg-white"
              />
            </div>
          </div>
          <div>
            <Step n={4} label="Email Address" />
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
              <span className="px-3 py-2.5 bg-gray-50 border-r border-gray-200 text-gray-500 text-sm">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email" value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-3 py-2.5 text-sm outline-none bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 8: Attachments (dynamic) ───────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-white">8</span>
            </div>
            <h3 className="font-bold text-gray-800 text-sm">Attachments</h3>
          </div>
          <label
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-semibold cursor-pointer hover:bg-indigo-100 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Attachment
            <input
              type="file"
              className="hidden"
              accept="image/jpeg,image/png,application/pdf"
              ref={attachInputRef}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                if (f.size > 5 * 1024 * 1024) { toast.error('Max 5 MB'); return; }
                setAttachments(prev => [...prev, { id: Date.now().toString(), file: f, remark: '' }]);
                e.target.value = '';
              }}
            />
          </label>
        </div>

        {attachments.length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
            <Paperclip className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-400">No attachments yet</p>
            <p className="text-xs text-gray-300 mt-1">Click "Add Attachment" to add files</p>
          </div>
        ) : (
          <div className="space-y-3">
            {attachments.map((att, idx) => (
              <div key={att.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                  {att.file ? (
                    att.file.type.startsWith('image/') ? (
                      <img src={URL.createObjectURL(att.file)} alt="" className="w-full h-full rounded-lg object-cover" />
                    ) : (
                      <FileText className="w-5 h-5 text-indigo-500" />
                    )
                  ) : (
                    <Paperclip className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-600 truncate mb-1">{att.file?.name || 'File'}</p>
                  <input
                    type="text"
                    value={att.remark}
                    onChange={e => setAttachments(prev => prev.map(a => a.id === att.id ? { ...a, remark: e.target.value } : a))}
                    placeholder="Remarks / Name of Attachment"
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setAttachments(prev => prev.filter(a => a.id !== att.id))}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Section 9: Directorship / Unlisted Shares (STANDARD+) ──────────── */}
      {isStandard && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-white">9</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm">Directorship / Unlisted Shares</h3>
                <p className="text-xs text-gray-400">Company directorships and unlisted share holdings</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDirRows(prev => [...prev, mkDir(Date.now().toString())])}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-semibold hover:bg-indigo-100 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Row
              </button>
              <button type="button" onClick={() => setDirExpanded(v => !v)} className="p-1.5 text-gray-400 hover:text-gray-600">
                {dirExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {dirExpanded && (
            <div className="space-y-4">
              {dirRows.length === 0 ? (
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                  <Building2 className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">No entries yet — click "Add Row" to add</p>
                </div>
              ) : (
                dirRows.map((row, idx) => (
                  <div key={row.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Entry {idx + 1}</span>
                      <button type="button" onClick={() => setDirRows(prev => prev.filter(r => r.id !== row.id))}
                        className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Table A: Company Info */}
                    <div className="mb-3">
                      <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Directorship Details</p>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {[
                          { label: 'Company Name (1)', key: 'companyName', span: 2, cls: 'sm:col-span-2' },
                          { label: 'PAN (2)', key: 'companyPan', cls: '' },
                          { label: 'Company Type (3)', key: 'companyType', type: 'select', options: ['Domestic', 'Foreign'], cls: '' },
                          { label: 'Listed/Unlisted (4)', key: 'listedStatus', type: 'select', options: ['Listed', 'Unlisted'], cls: '' },
                          { label: 'DIN (5)', key: 'din', cls: '' },
                        ].map(({ label, key, type, options, cls = '' }) => (
                          <div key={key} className={cls}>
                            <label className="text-[11px] text-gray-500 mb-0.5 block">{label}</label>
                            {type === 'select' ? (
                              <select
                                value={(row as any)[key]}
                                onChange={e => setDirRows(prev => prev.map(r => r.id === row.id ? { ...r, [key]: e.target.value } : r))}
                                className="w-full px-2 py-1.5 rounded-lg border border-gray-200 text-xs bg-white outline-none focus:border-indigo-400"
                              >
                                {options!.map(o => <option key={o}>{o}</option>)}
                              </select>
                            ) : (
                              <input
                                type="text"
                                value={(row as any)[key]}
                                onChange={e => setDirRows(prev => prev.map(r => r.id === row.id ? { ...r, [key]: e.target.value } : r))}
                                className="w-full px-2 py-1.5 rounded-lg border border-gray-200 text-xs bg-white outline-none focus:border-indigo-400"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Table B: Share Details */}
                    <div>
                      <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Share Details</p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs border-collapse">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="px-2 py-1.5 text-left text-[11px] font-semibold text-gray-600 border border-gray-200 whitespace-nowrap" colSpan={2}>Opening Balance</th>
                              <th className="px-2 py-1.5 text-left text-[11px] font-semibold text-gray-600 border border-gray-200 whitespace-nowrap" colSpan={5}>Shares Acquired During the Year</th>
                              <th className="px-2 py-1.5 text-left text-[11px] font-semibold text-gray-600 border border-gray-200 whitespace-nowrap" colSpan={2}>Shares Transferred</th>
                              <th className="px-2 py-1.5 text-left text-[11px] font-semibold text-gray-600 border border-gray-200 whitespace-nowrap" colSpan={2}>Closing Balance</th>
                            </tr>
                            <tr className="bg-gray-50 text-[11px] text-gray-500">
                              {['No. of Shares (4)', 'Cost of Acquisition (5)', 'No. of Shares (6)', 'Date (7)', 'Face Value/Share (8)', 'Issue Price/Share (9)', 'Purchase Price/Share (10)', 'No. of Shares (11)', 'Sale Consideration (12)', 'No. of Shares (13)', 'Cost (14)'].map(h => (
                                <th key={h} className="px-2 py-1 font-medium border border-gray-200 whitespace-nowrap">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              {[
                                { key: 'openingShares', placeholder: '0' },
                                { key: 'openingCost', placeholder: '0' },
                                { key: 'acquiredShares', placeholder: '0' },
                                { key: 'acquiredDate', placeholder: 'DD/MM/YYYY', type: 'date' },
                                { key: 'faceValue', placeholder: '10' },
                                { key: 'issuePrice', placeholder: '0' },
                                { key: 'purchasePrice', placeholder: '0' },
                                { key: 'transferredShares', placeholder: '0' },
                                { key: 'saleConsideration', placeholder: '0' },
                                { key: 'closingShares', placeholder: '0' },
                                { key: 'closingCost', placeholder: '0' },
                              ].map(({ key, placeholder, type }) => (
                                <td key={key} className="border border-gray-200 p-1">
                                  <input
                                    type={type || 'text'}
                                    value={(row as any)[key]}
                                    placeholder={placeholder}
                                    onChange={e => setDirRows(prev => prev.map(r => r.id === row.id ? { ...r, [key]: e.target.value } : r))}
                                    className="w-full min-w-[70px] px-1.5 py-1 text-xs bg-white border border-gray-100 rounded focus:border-indigo-400 outline-none"
                                  />
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Section 10: Foreign Income / Foreign Assets (PREMIUM+) ─────────── */}
      {isPremium && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-white">10</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm">Foreign Income / Foreign Assets</h3>
                <p className="text-xs text-gray-400">Declare foreign income and overseas assets</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setForeignItems(prev => [...prev, { id: Date.now().toString(), description: '', amount: '', country: '' }])}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-semibold hover:bg-indigo-100 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Row
              </button>
              <button type="button" onClick={() => setForeignExpanded(v => !v)} className="p-1.5 text-gray-400">
                {foreignExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {foreignExpanded && (
            <div className="space-y-3">
              {foreignItems.length === 0 ? (
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                  <Globe className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">No foreign income/assets declared — click "Add Row"</p>
                </div>
              ) : (
                foreignItems.map((fi, idx) => (
                  <div key={fi.id} className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="sm:col-span-2">
                      <label className="text-[11px] text-gray-500 mb-0.5 block">Description / Type of Income or Asset</label>
                      <input type="text" value={fi.description}
                        placeholder="e.g. Salary, Interest, Bank Account, Property"
                        onChange={e => setForeignItems(prev => prev.map(f => f.id === fi.id ? { ...f, description: e.target.value } : f))}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs bg-white outline-none focus:border-indigo-400" />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-500 mb-0.5 block">Country</label>
                      <input type="text" value={fi.country} placeholder="USA, UK, etc."
                        onChange={e => setForeignItems(prev => prev.map(f => f.id === fi.id ? { ...f, country: e.target.value } : f))}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs bg-white outline-none focus:border-indigo-400" />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-500 mb-0.5 block">Amount (₹ equivalent)</label>
                      <div className="flex gap-1">
                        <input type="number" value={fi.amount} placeholder="0"
                          onChange={e => setForeignItems(prev => prev.map(f => f.id === fi.id ? { ...f, amount: e.target.value } : f))}
                          className="flex-1 px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs bg-white outline-none focus:border-indigo-400 min-w-0" />
                        <button type="button" onClick={() => setForeignItems(prev => prev.filter(f => f.id !== fi.id))}
                          className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors shrink-0">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Section 11: Other Notes ─────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <Step n={isPremium ? 11 : isStandard ? 10 : 9} label="Other Notes / Remarks" />
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Any additional notes or remarks for the CA team…"
          rows={3}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 resize-none"
        />
      </div>

      {/* ── Action buttons ──────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between pb-8 gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Progress
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50"
        >
          {submitting ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
          ) : (
            <><Send className="w-4 h-4" /> Submit Application</>
          )}
        </button>
      </div>
    </div>
  );
};
