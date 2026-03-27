import React, { useState, useEffect } from 'react';
import {
  Search,
  FileText,
  Download,
  Eye,
  X,
  User,
  Phone,
  Mail,
  Building2,
  Globe,
  CreditCard,
  Loader2,
  AlertCircle,
  Calendar,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from 'lucide-react';
import api from '../../utils/api';
import { toast } from 'sonner';
import { API_BASE_URL } from '../../utils/constants';

// ─── Types ────────────────────────────────────────────────────────────────────

type Plan = 'basic' | 'standard' | 'premium' | 'elite';

interface ItrRecord {
  id: number;
  plan: Plan;
  userId: number | null;
  userName: string | null;
  userEmail: string | null;
  userPhone: string | null;
  orderItemId: number | null;
  orderId: number | null;
  orderAmount: number | null;
  mobileNo: string;
  emailId: string;
  status: string;
  createdAt: string;
}

interface Attachment {
  id: number;
  fileUrl: string;
  fileName: string;
  remark: string;
  url: string;
}

interface Directorship {
  [key: string]: any;
}

interface ForeignAsset {
  [key: string]: any;
}

interface ItrDetail extends ItrRecord {
  aadhaarFrontUrl?: string;
  aadhaarBackUrl?: string;
  panFrontUrl?: string;
  panBackUrl?: string;
  attachments?: Attachment[];
  directorships?: Directorship[];
  foreignAssets?: ForeignAsset[];
  notes?: string;
  otherNotes?: string;
  [key: string]: any;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PLAN_FILTERS: { label: string; value: Plan | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Basic', value: 'basic' },
  { label: 'Standard', value: 'standard' },
  { label: 'Premium', value: 'premium' },
  { label: 'Elite', value: 'elite' },
];

const planBadgeClass = (plan: Plan): string => {
  switch (plan) {
    case 'basic':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'standard':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'premium':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'elite':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    default:
      return 'bg-neutral-100 text-neutral-700 border-neutral-200';
  }
};

const planStatCardClass = (plan: Plan): string => {
  switch (plan) {
    case 'basic':
      return 'border-blue-200 bg-blue-50';
    case 'standard':
      return 'border-amber-200 bg-amber-50';
    case 'premium':
      return 'border-purple-200 bg-purple-50';
    case 'elite':
      return 'border-emerald-200 bg-emerald-50';
    default:
      return 'border-neutral-200 bg-neutral-50';
  }
};

const planStatTextClass = (plan: Plan): string => {
  switch (plan) {
    case 'basic':
      return 'text-blue-700';
    case 'standard':
      return 'text-amber-700';
    case 'premium':
      return 'text-purple-700';
    case 'elite':
      return 'text-emerald-700';
    default:
      return 'text-neutral-700';
  }
};

const planStatCountClass = (plan: Plan): string => {
  switch (plan) {
    case 'basic':
      return 'text-blue-900';
    case 'standard':
      return 'text-amber-900';
    case 'premium':
      return 'text-purple-900';
    case 'elite':
      return 'text-emerald-900';
    default:
      return 'text-neutral-900';
  }
};

const formatDate = (dateStr: string): string => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const formatDateTime = (dateStr: string): string => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const displayName = (record: ItrRecord): string =>
  record.userName || record.emailId || record.mobileNo || `Record #${record.id}`;

// ─── Sub-components ───────────────────────────────────────────────────────────

interface DocCardProps {
  label: string;
  url?: string;
}

const DocCard: React.FC<DocCardProps> = ({ label, url }) => {
  const handleDownload = () => {
    if (!url) return;
    const a = document.createElement('a');
    a.href = url;
    a.download = label.replace(/\s+/g, '_');
    a.target = '_blank';
    a.rel = 'noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex items-center justify-between bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
          <FileText className="w-4 h-4 text-blue-600" />
        </div>
        <span className="text-sm font-medium text-neutral-800">{label}</span>
      </div>
      {url ? (
        <div className="flex items-center gap-2">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            View
          </a>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </button>
        </div>
      ) : (
        <span className="text-xs text-neutral-400 italic">Not uploaded</span>
      )}
    </div>
  );
};

// ─── Detail Modal ─────────────────────────────────────────────────────────────

interface DetailModalProps {
  record: ItrDetail;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ record, onClose }) => {
  const [showDirectorships, setShowDirectorships] = useState(true);
  const [showForeignAssets, setShowForeignAssets] = useState(true);

  const hasDirectorships =
    ['standard', 'premium', 'elite'].includes(record.plan) &&
    Array.isArray(record.directorships) &&
    record.directorships.length > 0;

  const hasForeignAssets =
    ['premium', 'elite'].includes(record.plan) &&
    Array.isArray(record.foreignAssets) &&
    record.foreignAssets.length > 0;

  const hasAttachments =
    Array.isArray(record.attachments) && record.attachments.length > 0;

  // Collect directorship column keys dynamically
  const directorshipKeys =
    hasDirectorships
      ? Array.from(new Set(record.directorships!.flatMap(d => Object.keys(d))))
      : [];

  const foreignAssetKeys =
    hasForeignAssets
      ? Array.from(new Set(record.foreignAssets!.flatMap(f => Object.keys(f))))
      : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Slide-over panel */}
      <div
        className="relative w-full max-w-2xl h-full bg-white shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200 bg-neutral-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-900">ITR Submission Detail</h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Record #{record.id} &nbsp;&middot;&nbsp;
                <span className={`inline-block px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${planBadgeClass(record.plan)}`}>
                  {record.plan}
                </span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-200 rounded-lg transition-colors text-neutral-500 hover:text-neutral-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Client Info */}
          <section>
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3">Client Information</h3>
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-neutral-400 shrink-0" />
                <div>
                  <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Full Name</p>
                  <p className="text-sm font-semibold text-neutral-800">{record.userName || '—'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                <div>
                  <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Account Email</p>
                  <p className="text-sm text-neutral-700">{record.userEmail || '—'}</p>
                </div>
              </div>
              {record.emailId && record.emailId !== record.userEmail && (
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                  <div>
                    <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Form Email</p>
                    <p className="text-sm text-neutral-700">{record.emailId}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
                <div>
                  <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Account Phone</p>
                  <p className="text-sm text-neutral-700">{record.userPhone || '—'}</p>
                </div>
              </div>
              {record.mobileNo && record.mobileNo !== record.userPhone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
                  <div>
                    <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Form Mobile</p>
                    <p className="text-sm text-neutral-700">{record.mobileNo}</p>
                  </div>
                </div>
              )}
              {record.orderAmount != null && (
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 text-neutral-400 shrink-0" />
                  <div>
                    <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Order Amount</p>
                    <p className="text-sm font-semibold text-emerald-700">₹{record.orderAmount.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-neutral-400 shrink-0" />
                <div>
                  <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Submitted On</p>
                  <p className="text-sm text-neutral-700">{formatDateTime(record.createdAt)}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Other Notes (Basic plan) */}
          {record.plan === 'basic' && record.otherNotes && (
            <section>
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3">Other Notes</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-wrap">{record.otherNotes}</p>
              </div>
            </section>
          )}

          {/* Status */}
          <section>
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3">Status</h3>
            <span className={`inline-block text-[11px] font-bold px-3 py-1.5 rounded border uppercase tracking-wider ${
              record.status === 'COMPLETED'
                ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                : record.status === 'UNDER_REVIEW'
                ? 'bg-amber-100 text-amber-800 border-amber-200'
                : 'bg-neutral-100 text-neutral-700 border-neutral-200'
            }`}>
              {record.status.replace(/_/g, ' ')}
            </span>
          </section>

          {/* KYC Documents */}
          <section>
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3">KYC Documents</h3>
            <div className="space-y-2">
              <DocCard label="Aadhaar Front" url={record.aadhaarFrontUrl} />
              <DocCard label="Aadhaar Back" url={record.aadhaarBackUrl} />
              <DocCard label="PAN Front" url={record.panFrontUrl} />
              <DocCard label="PAN Back" url={record.panBackUrl} />
            </div>
          </section>

          {/* Additional Attachments */}
          {hasAttachments && (
            <section>
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3">
                Additional Attachments ({record.attachments!.length})
              </h3>
              <div className="space-y-2">
                {record.attachments!.map((att) => (
                  <div
                    key={att.id}
                    className="flex items-start justify-between bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3 gap-3"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <FileText className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-neutral-800 truncate">{att.fileName || 'Attachment'}</p>
                        {att.remark && (
                          <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">{att.remark}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {(att.fileUrl || att.url) && (
                        <>
                          <a
                            href={att.fileUrl || att.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View
                          </a>
                          <a
                            href={`${att.fileUrl || att.url}${(att.fileUrl || att.url).includes('?') ? '&' : '?'}download=true`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Download
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Directorships */}
          {hasDirectorships && (
            <section>
              <button
                onClick={() => setShowDirectorships(!showDirectorships)}
                className="flex items-center justify-between w-full text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3 hover:text-neutral-700 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Directorships ({record.directorships!.length})
                </span>
                {showDirectorships ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {showDirectorships && (
                <div className="overflow-x-auto rounded-xl border border-neutral-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50 border-b border-neutral-200">
                      <tr>
                        {directorshipKeys.map((k) => (
                          <th
                            key={k}
                            className="px-4 py-2.5 font-semibold text-neutral-500 uppercase tracking-wider whitespace-nowrap"
                          >
                            {k.replace(/([A-Z])/g, ' $1').trim()}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {record.directorships!.map((d, i) => (
                        <tr key={i} className="hover:bg-neutral-50 transition-colors">
                          {directorshipKeys.map((k) => (
                            <td key={k} className="px-4 py-2.5 text-neutral-700 whitespace-nowrap">
                              {d[k] != null ? String(d[k]) : '—'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {/* Foreign Assets */}
          {hasForeignAssets && (
            <section>
              <button
                onClick={() => setShowForeignAssets(!showForeignAssets)}
                className="flex items-center justify-between w-full text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3 hover:text-neutral-700 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Foreign Assets ({record.foreignAssets!.length})
                </span>
                {showForeignAssets ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {showForeignAssets && (
                <div className="overflow-x-auto rounded-xl border border-neutral-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50 border-b border-neutral-200">
                      <tr>
                        {foreignAssetKeys.map((k) => (
                          <th
                            key={k}
                            className="px-4 py-2.5 font-semibold text-neutral-500 uppercase tracking-wider whitespace-nowrap"
                          >
                            {k.replace(/([A-Z])/g, ' $1').trim()}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {record.foreignAssets!.map((f, i) => (
                        <tr key={i} className="hover:bg-neutral-50 transition-colors">
                          {foreignAssetKeys.map((k) => (
                            <td key={k} className="px-4 py-2.5 text-neutral-700 whitespace-nowrap">
                              {f[k] != null ? String(f[k]) : '—'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {/* Notes */}
          {record.notes && (
            <section>
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3">Other Notes</h3>
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">
                <p className="text-sm text-neutral-700 whitespace-pre-wrap leading-relaxed">{record.notes}</p>
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 px-6 py-4 border-t border-neutral-200 bg-neutral-50">
          <p className="text-[11px] text-neutral-400 text-center">
            Submitted: {formatDateTime(record.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export function AdminITR() {
  const [records, setRecords] = useState<ItrRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [planFilter, setPlanFilter] = useState<Plan | 'all'>('all');

  const [selectedRecord, setSelectedRecord] = useState<ItrDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // ── Fetch list ──
  const fetchRecords = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/itr');
      setRecords(res.data.records || []);
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to fetch ITR submissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // ── Fetch detail ──
  const handleViewDetail = async (record: ItrRecord) => {
    setDetailLoading(true);
    try {
      const res = await api.get(`/admin/itr/${record.plan}/${record.id}`);
      setSelectedRecord(res.data);
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to load submission details');
    } finally {
      setDetailLoading(false);
    }
  };

  // ── Stats ──
  const statPlans: Plan[] = ['basic', 'standard', 'premium', 'elite'];
  const statCounts = statPlans.reduce((acc, p) => {
    acc[p] = records.filter((r) => r.plan === p).length;
    return acc;
  }, {} as Record<Plan, number>);

  // ── Filtered list ──
  const filtered = records.filter((r) => {
    const matchesPlan = planFilter === 'all' || r.plan === planFilter;
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      !q ||
      (r.userName || '').toLowerCase().includes(q) ||
      (r.userEmail || '').toLowerCase().includes(q) ||
      r.emailId.toLowerCase().includes(q) ||
      r.mobileNo.includes(q);
    return matchesPlan && matchesSearch;
  });

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-neutral-900">ITR Submissions</h1>
            {!loading && (
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-200">
                {records.length}
              </span>
            )}
          </div>
          <p className="text-neutral-500 text-sm mt-1">View and manage Income Tax Return filings submitted by clients</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by name, email, mobile..."
            className="pl-10 pr-4 py-2.5 border border-neutral-200 rounded-lg text-sm w-72 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statPlans.map((plan) => (
          <button
            key={plan}
            onClick={() => setPlanFilter(planFilter === plan ? 'all' : plan)}
            className={`flex flex-col items-start p-4 rounded-xl border-2 transition-all text-left hover:shadow-md ${planStatCardClass(plan)} ${
              planFilter === plan ? 'ring-2 ring-offset-2 ' + (
                plan === 'basic' ? 'ring-blue-400' :
                plan === 'standard' ? 'ring-amber-400' :
                plan === 'premium' ? 'ring-purple-400' :
                'ring-emerald-400'
              ) : ''
            }`}
          >
            <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${planStatTextClass(plan)}`}>
              {plan}
            </p>
            <p className={`text-3xl font-extrabold ${planStatCountClass(plan)}`}>
              {loading ? '—' : statCounts[plan]}
            </p>
            <p className={`text-xs mt-1 ${planStatTextClass(plan)} opacity-80`}>
              submission{statCounts[plan] !== 1 ? 's' : ''}
            </p>
          </button>
        ))}
      </div>

      {/* ── Plan Filter Tabs ── */}
      <div className="flex items-center gap-1 mb-5 bg-neutral-100 rounded-lg p-1 w-fit">
        {PLAN_FILTERS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setPlanFilter(value)}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
              planFilter === value
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <p className="text-sm text-neutral-500">Loading ITR submissions...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <AlertCircle className="w-12 h-12 text-neutral-300" />
            <p className="text-neutral-500 font-medium">No submissions found</p>
            {(searchTerm || planFilter !== 'all') && (
              <p className="text-neutral-400 text-sm">
                Try adjusting your search or filter
              </p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-neutral-50 text-[11px] text-neutral-500 uppercase font-bold tracking-wider border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Mobile</th>
                  <th className="px-6 py-4">Plan</th>
                  <th className="px-6 py-4">Order Amount</th>
                  <th className="px-6 py-4">Submitted On</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filtered.map((record) => (
                  <tr key={`${record.plan}-${record.id}`} className="hover:bg-neutral-50 transition-colors">
                    {/* Client */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-neutral-800">{displayName(record)}</p>
                          <p className="text-xs text-neutral-500">{record.userEmail || record.emailId}</p>
                        </div>
                      </div>
                    </td>
                    {/* Mobile */}
                    <td className="px-6 py-4 text-sm text-neutral-700">
                      {record.mobileNo || record.userPhone || '—'}
                    </td>
                    {/* Plan */}
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded border uppercase tracking-wider ${planBadgeClass(record.plan)}`}
                      >
                        {record.plan}
                      </span>
                    </td>
                    {/* Order Amount */}
                    <td className="px-6 py-4 text-sm font-semibold text-neutral-800">
                      {record.orderAmount != null
                        ? `₹${record.orderAmount.toLocaleString('en-IN')}`
                        : <span className="text-neutral-400 font-normal text-xs">—</span>}
                    </td>
                    {/* Submitted On */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-neutral-600">
                        <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                        {formatDate(record.createdAt)}
                      </div>
                    </td>
                    {/* Action */}
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleViewDetail(record)}
                        disabled={detailLoading}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {detailLoading ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <ExternalLink className="w-3.5 h-3.5" />
                        )}
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Footer count */}
            <div className="px-6 py-3 border-t border-neutral-100 bg-neutral-50 text-xs text-neutral-400 font-medium">
              Showing {filtered.length} of {records.length} submissions
              {planFilter !== 'all' && ` (filtered: ${planFilter})`}
            </div>
          </div>
        )}
      </div>

      {/* ── Detail Loading Overlay ── */}
      {detailLoading && !selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            <p className="text-sm font-medium text-neutral-700">Loading submission details...</p>
          </div>
        </div>
      )}

      {/* ── Detail Modal ── */}
      {selectedRecord && !detailLoading && (
        <DetailModal record={selectedRecord} onClose={() => setSelectedRecord(null)} />
      )}
    </div>
  );
}
