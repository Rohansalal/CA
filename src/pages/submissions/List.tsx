// @ts-nocheck
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, User, Calendar, Filter, ArrowRight,
  CheckCircle, Clock, AlertCircle, XCircle, Eye,
  RefreshCw, Inbox, IndianRupee, CreditCard, Layers,
} from 'lucide-react';
import { useAdminSubmissions } from '../../api/hooks/useSubmissions';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  DRAFT:          { label: 'Draft',          color: 'bg-slate-100 text-slate-600',    icon: Clock },
  SUBMITTED:      { label: 'Submitted',      color: 'bg-blue-100 text-blue-700',      icon: FileText },
  UNDER_REVIEW:   { label: 'Under Review',   color: 'bg-violet-100 text-violet-700',  icon: Eye },
  INFO_REQUESTED: { label: 'Info Requested', color: 'bg-amber-100 text-amber-700',    icon: AlertCircle },
  COMPLETED:      { label: 'Completed',      color: 'bg-emerald-100 text-emerald-700',icon: CheckCircle },
  REJECTED:       { label: 'Rejected',       color: 'bg-red-100 text-red-700',        icon: XCircle },
};

const PLAN_COLORS: Record<string, string> = {
  BASIC:    'bg-slate-100 text-slate-600',
  STANDARD: 'bg-blue-100 text-blue-700',
  PREMIUM:  'bg-violet-100 text-violet-700',
  ELITE:    'bg-amber-100 text-amber-700',
};

const PAY_STATUS: Record<string, { label: string; color: string }> = {
  SUCCESS:  { label: 'Paid',      color: 'bg-emerald-100 text-emerald-700' },
  PENDING:  { label: 'Pending',   color: 'bg-amber-100 text-amber-700' },
  REJECTED: { label: 'Rejected',  color: 'bg-red-100 text-red-700' },
  CREATED:  { label: 'Awaiting',  color: 'bg-sky-100 text-sky-700' },
};

function PaymentBadge({ sub }: { sub: any }) {
  if (!sub.order) {
    return <span className="text-[10px] text-slate-300 font-semibold">—</span>;
  }
  if (sub.order.paymentMode === 'PAY_LATER' && !sub.payment) {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">
        <Clock size={10} /> Pay Later
      </span>
    );
  }
  if (sub.payment) {
    const cfg = PAY_STATUS[sub.payment.status] || PAY_STATUS.PENDING;
    return (
      <div className="space-y-1">
        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full ${cfg.color}`}>
          <CreditCard size={10} /> {cfg.label}
        </span>
        <p className="text-[10px] text-slate-400 font-semibold">
          ₹{Number(sub.payment.amount || 0).toLocaleString('en-IN')}
        </p>
      </div>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">
      <Clock size={10} /> Not Paid
    </span>
  );
}

export function SubmissionList() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useAdminSubmissions({
    status: status || undefined,
    page,
    limit: 15,
  });

  const submissions = data?.submissions || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / 15);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-900/5 border border-slate-100">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-900/20">
            <Layers size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Client Applications</h2>
            <p className="text-slate-500 font-medium mt-1">
              All service applications with form data, documents & payment status.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            className="h-11 w-11 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all"
          >
            <RefreshCw size={16} />
          </button>
          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-2 px-3">
              <Filter size={16} className="text-slate-400" />
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Status:</span>
            </div>
            <Select value={status} onValueChange={(v) => { setStatus(v === 'all' ? '' : v); setPage(1); }}>
              <SelectTrigger className="w-44 h-11 rounded-xl border-none bg-white shadow-sm font-bold text-xs focus:ring-4 focus:ring-blue-500/5">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-slate-200 shadow-2xl">
                <SelectItem value="all" className="font-bold text-xs">All Applications</SelectItem>
                {Object.entries(STATUS_CONFIG).map(([val, cfg]) => (
                  <SelectItem key={val} value={val} className="font-bold text-xs my-1 rounded-lg">
                    {cfg.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Status chips */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {Object.entries(STATUS_CONFIG).map(([val, cfg]) => {
          const allSubs = data?.submissions || [];
          // Count across ALL submissions fetched (not just current page)
          const count = allSubs.filter(s => s.status === val).length;
          const Icon = cfg.icon;
          return (
            <button
              key={val}
              onClick={() => { setStatus(status === val ? '' : val); setPage(1); }}
              className={`flex flex-col items-center gap-1.5 p-4 rounded-2xl border-2 transition-all ${
                status === val ? 'border-indigo-500 bg-indigo-50 shadow-lg shadow-indigo-500/10' : 'border-slate-100 bg-white hover:border-slate-200'
              }`}
            >
              <Icon size={18} className={status === val ? 'text-indigo-600' : 'text-slate-400'} />
              <span className={`text-xl font-black ${status === val ? 'text-indigo-700' : 'text-slate-800'}`}>{count}</span>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center leading-tight">{cfg.label}</span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <Card className="rounded-3xl shadow-xl shadow-slate-900/5 border border-slate-100 overflow-hidden">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-24 gap-3 text-slate-400">
              <RefreshCw size={20} className="animate-spin" />
              <span className="text-sm font-semibold">Loading applications…</span>
            </div>
          ) : submissions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-slate-400">
              <Inbox size={48} className="text-slate-200" />
              <p className="text-sm font-semibold">No applications found</p>
              <p className="text-xs text-slate-300">Applications appear here when clients select a plan and fill their form</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/60">
                    <th className="text-left px-5 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">#</th>
                    <th className="text-left px-5 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Client</th>
                    <th className="text-left px-5 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Service</th>
                    <th className="text-left px-5 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Plan & Price</th>
                    <th className="text-left px-5 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Payment</th>
                    <th className="text-left px-5 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Docs</th>
                    <th className="text-left px-5 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="text-left px-5 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                    <th className="px-5 py-4" />
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((sub) => {
                    const statusCfg = STATUS_CONFIG[sub.status] || STATUS_CONFIG.DRAFT;
                    const StatusIcon = statusCfg.icon;
                    return (
                      <tr
                        key={sub.id}
                        className="group border-b border-slate-50 hover:bg-slate-50/50 transition-colors cursor-pointer"
                        onClick={() => navigate(`/dashboard/submissions/${sub.id}`)}
                      >
                        <td className="px-5 py-4">
                          <span className="font-black text-slate-400 text-xs">#{sub.id}</span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 font-black text-indigo-600 text-xs">
                              {(sub.userName || 'U').charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 text-xs leading-none">{sub.userName || `User #${sub.userId}`}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5">{sub.userEmail}</p>
                              {sub.userPhone && <p className="text-[10px] text-slate-400">{sub.userPhone}</p>}
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 max-w-[180px]">
                          <p className="font-semibold text-slate-800 text-xs leading-snug line-clamp-2">{sub.serviceName}</p>
                          {sub.order?.orderNumber && (
                            <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                              {sub.order.orderNumber}
                            </p>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full mb-1 ${PLAN_COLORS[sub.planType] || PLAN_COLORS.BASIC}`}>
                            {sub.planType}
                          </span>
                          {sub.planPrice > 0 && (
                            <p className="text-xs font-black text-slate-700 flex items-center gap-0.5">
                              <IndianRupee size={10} />
                              {Number(sub.planPrice).toLocaleString('en-IN')}
                            </p>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <PaymentBadge sub={sub} />
                        </td>
                        <td className="px-5 py-4">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                            sub.documentsCount > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {sub.documentsCount} doc{sub.documentsCount !== 1 ? 's' : ''}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1.5 rounded-full ${statusCfg.color}`}>
                            <StatusIcon size={11} />
                            {statusCfg.label}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold">
                            <Calendar size={10} />
                            {new Date(sub.submittedAt || sub.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric', month: 'short', year: '2-digit',
                            })}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 rounded-xl border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm group-hover:border-indigo-200"
                            onClick={(e) => { e.stopPropagation(); navigate(`/dashboard/submissions/${sub.id}`); }}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
              <p className="text-xs text-slate-400 font-medium">
                Showing {((page - 1) * 15) + 1}–{Math.min(page * 15, total)} of {total} applications
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled={page === 1}
                  onClick={() => setPage(p => p - 1)} className="rounded-xl text-xs">
                  Previous
                </Button>
                <span className="text-xs font-black text-slate-700 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-200">
                  {page} / {totalPages}
                </span>
                <Button variant="outline" size="sm" disabled={page >= totalPages}
                  onClick={() => setPage(p => p + 1)} className="rounded-xl text-xs">
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
