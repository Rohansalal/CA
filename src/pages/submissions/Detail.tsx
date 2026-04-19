// @ts-nocheck
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, User, FileText, CheckCircle, Clock, AlertCircle,
  XCircle, Eye, RefreshCw, Download, StickyNote, Save,
  Mail, Phone, Calendar, Tag, Paperclip, IndianRupee,
  CreditCard, Receipt, ClipboardList, Building2, ShieldCheck,
  BadgeCheck, ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  useAdminSubmission,
  useUpdateSubmissionStatus,
  useSaveAdminNotes,
} from '../../api/hooks/useSubmissions';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  DRAFT:          { label: 'Draft',          color: 'text-slate-600',   bg: 'bg-slate-100',   icon: Clock },
  SUBMITTED:      { label: 'Submitted',      color: 'text-blue-700',    bg: 'bg-blue-100',    icon: FileText },
  UNDER_REVIEW:   { label: 'Under Review',   color: 'text-violet-700',  bg: 'bg-violet-100',  icon: Eye },
  INFO_REQUESTED: { label: 'Info Requested', color: 'text-amber-700',   bg: 'bg-amber-100',   icon: AlertCircle },
  COMPLETED:      { label: 'Completed',      color: 'text-emerald-700', bg: 'bg-emerald-100', icon: CheckCircle },
  REJECTED:       { label: 'Rejected',       color: 'text-red-700',     bg: 'bg-red-100',     icon: XCircle },
};

const PLAN_COLORS: Record<string, { bg: string; text: string; accent: string }> = {
  BASIC:    { bg: 'bg-slate-100',  text: 'text-slate-700',  accent: '#64748B' },
  STANDARD: { bg: 'bg-blue-100',   text: 'text-blue-700',   accent: '#2563EB' },
  PREMIUM:  { bg: 'bg-violet-100', text: 'text-violet-700', accent: '#7C3AED' },
  ELITE:    { bg: 'bg-amber-100',  text: 'text-amber-700',  accent: '#D97706' },
};

const PAY_STATUS: Record<string, { label: string; color: string; bg: string }> = {
  SUCCESS:  { label: 'Payment Received', color: 'text-emerald-700', bg: 'bg-emerald-100' },
  PENDING:  { label: 'Awaiting Approval', color: 'text-amber-700',  bg: 'bg-amber-100' },
  REJECTED: { label: 'Payment Rejected', color: 'text-red-700',     bg: 'bg-red-100' },
  CREATED:  { label: 'Awaiting Payment', color: 'text-sky-700',     bg: 'bg-sky-100' },
};

const ADMIN_STATUSES = ['UNDER_REVIEW', 'INFO_REQUESTED', 'COMPLETED', 'REJECTED'];

function prettifyKey(key: string) {
  return key
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim();
}

function FormValue({ value, label }: { value: any; label: string }) {
  if (value === null || value === undefined || value === '') {
    return <span className="text-slate-300 text-xs">—</span>;
  }
  if (Array.isArray(value)) {
    // Array of objects = table rows (e.g. director_details, share_details)
    if (value.length > 0 && typeof value[0] === 'object') {
      const cols = Object.keys(value[0]);
      return (
        <div className="overflow-x-auto mt-2 rounded-xl border border-slate-200">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {cols.map(col => (
                  <th key={col} className="px-3 py-2 text-left text-[10px] font-black text-slate-400 uppercase tracking-wider whitespace-nowrap">
                    {prettifyKey(col)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {value.map((row, i) => (
                <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                  {cols.map(col => (
                    <td key={col} className="px-3 py-2 text-slate-700 font-medium whitespace-nowrap">
                      {row[col] || <span className="text-slate-300">—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    // Primitive array = tag list
    return (
      <div className="flex flex-wrap gap-1.5 mt-1">
        {value.map((item, i) => (
          <span key={i} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-lg border border-indigo-100">
            {String(item)}
          </span>
        ))}
      </div>
    );
  }
  if (typeof value === 'object') {
    return (
      <div className="mt-1 space-y-1 pl-3 border-l-2 border-slate-100">
        {Object.entries(value).map(([k, v]) => (
          <div key={k} className="text-xs">
            <span className="text-slate-400 font-medium">{prettifyKey(k)}: </span>
            <span className="text-slate-700 font-semibold">{String(v)}</span>
          </div>
        ))}
      </div>
    );
  }
  const str = String(value);
  // Detect PAN / Aadhaar patterns to mask (security)
  return <span className="text-slate-800 font-semibold text-sm">{str}</span>;
}

// ── Section card wrapper ──────────────────────────────────────────────────────
function Section({ icon: Icon, title, accent = '#6366F1', children }: {
  icon: React.ElementType; title: string; accent?: string; children: React.ReactNode;
}) {
  return (
    <Card className="rounded-3xl shadow-xl shadow-slate-900/5 border border-slate-100 overflow-hidden">
      <div className="flex items-center gap-4 px-6 py-5 border-b border-slate-100"
        style={{ background: `linear-gradient(135deg, ${accent}08, transparent)` }}>
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: `${accent}15` }}>
          <Icon size={18} style={{ color: accent }} />
        </div>
        <h3 className="text-base font-black text-slate-900">{title}</h3>
      </div>
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  );
}

// ── Info row ─────────────────────────────────────────────────────────────────
function InfoRow({ label, value, mono = false }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-slate-50 last:border-0">
      <span className="text-xs text-slate-400 font-semibold w-36 shrink-0 pt-0.5">{label}</span>
      <span className={`text-xs font-bold text-slate-800 flex-1 ${mono ? 'font-mono' : ''}`}>{value || '—'}</span>
    </div>
  );
}

export function SubmissionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [newStatus, setNewStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [notesReady, setNotesReady] = useState(false);

  const { data, isLoading, refetch } = useAdminSubmission(parseInt(id!));
  const updateStatus = useUpdateSubmissionStatus();
  const saveNotes = useSaveAdminNotes();

  const sub = data?.submission;
  const docs = data?.documents || [];
  const deliverables = data?.deliverables || [];
  const formSchema = data?.formSchema || [];
  const order = data?.order;
  const payment = data?.payment;

  // Populate notes once loaded
  if (sub && !notesReady) {
    setAdminNotes(sub.adminNotes || '');
    setNotesReady(true);
  }

  const handleStatusUpdate = async () => {
    if (!newStatus) return;
    await updateStatus.mutateAsync({ id: parseInt(id!), status: newStatus, adminNotes });
    toast.success('Status updated');
    setNewStatus('');
    refetch();
  };

  const handleSaveNotes = async () => {
    await saveNotes.mutateAsync({ id: parseInt(id!), notes: adminNotes });
    toast.success('Notes saved');
    refetch();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] gap-3 text-slate-400">
        <RefreshCw size={20} className="animate-spin" />
        <span className="text-sm font-semibold">Loading application…</span>
      </div>
    );
  }

  if (!sub) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <XCircle size={40} className="text-slate-200" />
        <p className="text-slate-400 font-semibold">Application not found</p>
        <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="rounded-xl">
          <ArrowLeft size={14} className="mr-2" /> Go Back
        </Button>
      </div>
    );
  }

  const statusCfg = STATUS_CONFIG[sub.status] || STATUS_CONFIG.DRAFT;
  const StatusIcon = statusCfg.icon;
  const planStyle = PLAN_COLORS[sub.planType] || PLAN_COLORS.BASIC;
  const formDataEntries = Object.entries(sub.formData || {});

  // Build label map from formSchema
  const labelMap: Record<string, string> = {};
  for (const f of formSchema) {
    labelMap[f.fieldKey] = f.fieldLabel;
  }

  // Group formData by sections from schema
  const sectionMap: Record<string, { label: string; fields: [string, any][] }> = {};
  for (const f of formSchema) {
    const group = f.fieldGroup || 'general';
    if (!sectionMap[group]) sectionMap[group] = { label: group, fields: [] };
    if (sub.formData[f.fieldKey] !== undefined) {
      sectionMap[group].fields.push([f.fieldKey, sub.formData[f.fieldKey]]);
    }
  }
  // Ungrouped fields (submitted but not in schema)
  const schemaKeys = new Set(formSchema.map(f => f.fieldKey));
  const extraFields = formDataEntries.filter(([k]) => !schemaKeys.has(k));
  if (extraFields.length) {
    sectionMap['_extra'] = { label: 'Additional Information', fields: extraFields };
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl">

      {/* ── Top header ── */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-900/5 border border-slate-100 overflow-hidden">
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 px-8 py-7">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-5">
              <button
                onClick={() => navigate(-1)}
                className="mt-0.5 w-10 h-10 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-all shrink-0"
              >
                <ArrowLeft size={18} />
              </button>
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${planStyle.bg} ${planStyle.text}`}>
                    {sub.planType}
                  </span>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full ${statusCfg.bg} ${statusCfg.color}`}>
                    <StatusIcon size={10} /> {statusCfg.label}
                  </span>
                </div>
                <h1 className="text-2xl font-black text-white leading-tight">{sub.serviceName}</h1>
                <p className="text-indigo-300 text-sm font-semibold mt-1">
                  Application #{sub.id}
                  {order?.orderNumber && <span className="ml-3 opacity-70">· {order.orderNumber}</span>}
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              {sub.planPrice > 0 && (
                <div className="flex items-center gap-1 text-2xl font-black text-white justify-end">
                  <IndianRupee size={20} strokeWidth={2.5} />
                  {Number(sub.planPrice).toLocaleString('en-IN')}
                </div>
              )}
              <p className="text-indigo-300 text-xs font-semibold mt-1">{sub.planTitle || sub.planType} Plan</p>
            </div>
          </div>
        </div>

        {/* Quick stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-100">
          {[
            { label: 'Submitted', value: sub.submittedAt ? new Date(sub.submittedAt).toLocaleDateString('en-IN') : 'Not yet', icon: Calendar },
            { label: 'Documents', value: `${docs.length} uploaded`, icon: Paperclip },
            { label: 'Payment Mode', value: order?.paymentMode === 'PAY_LATER' ? 'Pay Later (7 days)' : 'Pay Now', icon: CreditCard },
            { label: 'Payment Status', value: payment ? PAY_STATUS[payment.status]?.label || payment.status : (order?.paymentMode === 'PAY_LATER' ? 'Pending (7-day)' : 'Not paid'), icon: ShieldCheck },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3 px-6 py-4">
              <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <Icon size={15} className="text-slate-400" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{label}</p>
                <p className="text-xs font-black text-slate-800 mt-0.5">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── LEFT COLUMN (2/3) ── */}
        <div className="lg:col-span-2 space-y-8">

          {/* Client Info */}
          <Section icon={User} title="Client Information" accent="#6366F1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              <InfoRow label="Full Name" value={sub.userName} />
              <InfoRow label="Email" value={
                <a href={`mailto:${sub.userEmail}`} className="text-indigo-600 hover:underline flex items-center gap-1">
                  <Mail size={11} />{sub.userEmail}
                </a>
              } />
              <InfoRow label="Phone" value={sub.userPhone && (
                <a href={`tel:${sub.userPhone}`} className="text-indigo-600 hover:underline flex items-center gap-1">
                  <Phone size={11} />{sub.userPhone}
                </a>
              )} />
              <InfoRow label="Submitted" value={sub.submittedAt ? new Date(sub.submittedAt).toLocaleString('en-IN') : '—'} />
            </div>
          </Section>

          {/* Form Data */}
          {formDataEntries.length > 0 ? (
            <Section icon={ClipboardList} title="Application Form Data" accent="#7C3AED">
              {Object.entries(sectionMap).length > 0 ? (
                <div className="space-y-6">
                  {Object.entries(sectionMap).map(([group, { fields }]) => (
                    <div key={group}>
                      <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <ChevronRight size={12} />
                        {group === '_extra' ? 'Additional Info' : group.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 bg-slate-50/50 rounded-2xl px-4 py-2">
                        {fields.map(([key, value]) => (
                          <div key={key} className="py-2.5 border-b border-slate-100 last:border-0">
                            <p className="text-[10px] text-slate-400 font-semibold mb-1">
                              {labelMap[key] || prettifyKey(key)}
                            </p>
                            <FormValue value={value} label={key} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 bg-slate-50/50 rounded-2xl px-4 py-2">
                  {formDataEntries.map(([key, value]) => (
                    <div key={key} className="py-2.5 border-b border-slate-100 last:border-0">
                      <p className="text-[10px] text-slate-400 font-semibold mb-1">{prettifyKey(key)}</p>
                      <FormValue value={value} label={key} />
                    </div>
                  ))}
                </div>
              )}
            </Section>
          ) : (
            <Section icon={ClipboardList} title="Application Form Data" accent="#7C3AED">
              <div className="flex flex-col items-center justify-center py-12 text-slate-300 gap-3">
                <ClipboardList size={36} />
                <p className="text-sm font-semibold text-slate-400">Form not yet filled</p>
              </div>
            </Section>
          )}

          {/* Documents */}
          <Section icon={Paperclip} title={`Uploaded Documents (${docs.length})`} accent="#0EA5E9">
            {docs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-300 gap-3">
                <Paperclip size={36} />
                <p className="text-sm font-semibold text-slate-400">No documents uploaded yet</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {docs.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                      <FileText size={16} className="text-indigo-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-800 truncate">{doc.fileName}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                          {doc.docKey}
                        </span>
                        {doc.fileSize && (
                          <span className="text-[10px] text-slate-400 font-medium">
                            {(doc.fileSize / 1024).toFixed(0)} KB
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400">
                          {doc.uploadedBy === 'admin' ? '📋 Admin' : '👤 Client'}
                        </span>
                      </div>
                    </div>
                    <a
                      href={`/api/files/${doc.r2Key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-9 w-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Download size={14} />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* Deliverables */}
          {deliverables.length > 0 && (
            <Section icon={BadgeCheck} title={`Deliverables (${deliverables.length})`} accent="#10B981">
              <div className="space-y-2.5">
                {deliverables.map((d) => (
                  <div key={d.id} className="flex items-center gap-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <div className="w-10 h-10 rounded-xl bg-white border border-emerald-200 flex items-center justify-center shrink-0">
                      <BadgeCheck size={16} className="text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-emerald-900 truncate">{d.fileName || d.title}</p>
                      {d.description && <p className="text-xs text-emerald-600 mt-0.5">{d.description}</p>}
                    </div>
                    {d.r2Key && (
                      <a
                        href={`/api/files/${d.r2Key}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-9 w-9 rounded-xl border border-emerald-200 flex items-center justify-center text-emerald-600 hover:bg-emerald-100 transition-all"
                      >
                        <Download size={14} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* ── RIGHT COLUMN (1/3) ── */}
        <div className="space-y-6">

          {/* Order & Payment */}
          <Section icon={Receipt} title="Order & Payment" accent="#F59E0B">
            {order ? (
              <div className="space-y-0">
                <InfoRow label="Order #" value={<span className="font-mono text-xs">{order.orderNumber}</span>} />
                <InfoRow label="Amount" value={
                  <span className="font-black text-slate-900 text-sm flex items-center gap-0.5">
                    <IndianRupee size={12} />
                    {Number(order.totalAmount).toLocaleString('en-IN')}
                  </span>
                } />
                <InfoRow label="Payment Mode" value={
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-lg ${
                    order.paymentMode === 'PAY_LATER' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'
                  }`}>
                    {order.paymentMode === 'PAY_LATER' ? '⏱ Pay Later (7 days)' : '💳 Pay Now'}
                  </span>
                } />
                <InfoRow label="Order Status" value={order.status} />
                <InfoRow label="Created" value={new Date(order.createdAt).toLocaleDateString('en-IN')} />
              </div>
            ) : (
              <p className="text-xs text-slate-400 font-medium py-4 text-center">No order linked</p>
            )}

            {payment && (
              <>
                <div className="my-4 border-t border-slate-100" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Payment Record</p>
                <div className="space-y-0">
                  <InfoRow label="Status" value={
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-lg ${
                      PAY_STATUS[payment.status]?.bg || 'bg-slate-100'
                    } ${PAY_STATUS[payment.status]?.color || 'text-slate-600'}`}>
                      {PAY_STATUS[payment.status]?.label || payment.status}
                    </span>
                  } />
                  <InfoRow label="Amount Paid" value={
                    <span className="font-black text-emerald-700 flex items-center gap-0.5">
                      <IndianRupee size={11} />{Number(payment.amount).toLocaleString('en-IN')}
                    </span>
                  } />
                  {payment.paymentProof && (
                    <InfoRow label="Proof" value={
                      <a
                        href={`/api/files/${payment.paymentProof}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline flex items-center gap-1 font-bold text-xs"
                      >
                        <Download size={11} /> View Screenshot
                      </a>
                    } />
                  )}
                  <InfoRow label="Date" value={new Date(payment.createdAt).toLocaleString('en-IN')} />
                </div>
              </>
            )}

            {!payment && order?.paymentMode === 'PAY_LATER' && (
              <div className="mt-4 flex items-start gap-2.5 bg-amber-50 rounded-2xl p-3 border border-amber-100">
                <Clock size={14} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-amber-800">Pay Later Selected</p>
                  <p className="text-[10px] text-amber-600 font-medium mt-0.5">
                    Client must pay within 7 days of order creation.
                  </p>
                </div>
              </div>
            )}
          </Section>

          {/* Status Management */}
          <Section icon={Tag} title="Update Status" accent="#6366F1">
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Current Status</p>
                <span className={`inline-flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-xl ${statusCfg.bg} ${statusCfg.color}`}>
                  <StatusIcon size={12} /> {statusCfg.label}
                </span>
              </div>

              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Change To</p>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger className="w-full h-10 rounded-xl border-slate-200 font-bold text-xs focus:ring-2 focus:ring-indigo-500/20">
                    <SelectValue placeholder="Select new status…" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-slate-200 shadow-2xl">
                    {ADMIN_STATUSES.map(s => {
                      const cfg = STATUS_CONFIG[s];
                      return (
                        <SelectItem key={s} value={s} className="font-bold text-xs rounded-lg my-1">
                          {cfg?.label || s}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full rounded-xl text-xs font-black bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/25"
                disabled={!newStatus || updateStatus.isPending}
                onClick={handleStatusUpdate}
              >
                {updateStatus.isPending ? <RefreshCw size={14} className="animate-spin mr-2" /> : null}
                Update Status
              </Button>
            </div>
          </Section>

          {/* Admin Notes */}
          <Section icon={StickyNote} title="Internal Notes" accent="#F59E0B">
            <div className="space-y-3">
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add notes visible only to admin team…"
                className="w-full h-28 px-3.5 py-2.5 text-xs font-medium rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none resize-none transition-all"
              />
              <Button
                variant="outline"
                size="sm"
                className="w-full rounded-xl text-xs font-black border-slate-200 hover:bg-slate-50 hover:border-amber-300"
                disabled={saveNotes.isPending}
                onClick={handleSaveNotes}
              >
                {saveNotes.isPending ? <RefreshCw size={13} className="animate-spin mr-1.5" /> : <Save size={13} className="mr-1.5" />}
                Save Notes
              </Button>
            </div>
          </Section>

          {/* Timeline */}
          <Section icon={Calendar} title="Timeline" accent="#10B981">
            <div className="space-y-3">
              {[
                { label: 'Order Created', time: order?.createdAt, icon: Building2, color: 'text-slate-400', bg: 'bg-slate-100' },
                { label: 'Form Submitted', time: sub.submittedAt, icon: ClipboardList, color: 'text-blue-600', bg: 'bg-blue-100' },
                { label: 'Under Review', time: sub.reviewedAt, icon: Eye, color: 'text-violet-600', bg: 'bg-violet-100' },
                { label: 'Completed', time: sub.completedAt, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100' },
              ].map(({ label, time, icon: Icon, color, bg }) => (
                <div key={label} className={`flex items-center gap-3 ${!time ? 'opacity-30' : ''}`}>
                  <div className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                    <Icon size={14} className={color} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{label}</p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {time ? new Date(time).toLocaleString('en-IN') : 'Pending'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
