import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Plus, Eye, Edit, Trash2, Search, Calendar, CheckCircle } from 'lucide-react';
import { useFeeFinalizaions, useDeleteFeeFinalization } from '../../api/hooks/useFeeFinalizaions';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import type { FeeFinalization } from '../../types';
import { toast } from 'sonner';

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    DRAFT: { label: 'Draft', cls: 'bg-slate-100 text-slate-600' },
    SENT: { label: 'Sent', cls: 'bg-blue-100 text-blue-700' },
    NEGOTIATING: { label: 'Negotiating', cls: 'bg-amber-100 text-amber-700' },
    ACCEPTED: { label: 'Accepted', cls: 'bg-green-100 text-green-700' },
    REJECTED: { label: 'Rejected', cls: 'bg-red-100 text-red-700' },
    INVOICED: { label: 'Invoiced', cls: 'bg-purple-100 text-purple-700' },
  };
  const cfg = map[status] ?? { label: status, cls: 'bg-slate-100 text-slate-600' };
  return <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${cfg.cls}`}>{cfg.label}</span>;
}

export function FeeFinalizationList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const { data, isLoading } = useFeeFinalizaions({ page, limit: 15, search, status: statusFilter || undefined });
  const deleteFee = useDeleteFeeFinalization();

  const items: FeeFinalization[] = (data as any)?.feeFinalizaions ?? (data as any)?.items ?? [];
  const total: number = (data as any)?.count ?? 0;
  const totalPages = Math.ceil(total / 15);

  const formatCurrency = (amount: number, currency = 'AED') =>
    new Intl.NumberFormat('en-AE', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Fee Finalizations</h1>
            <p className="text-xs text-slate-400">{total} fee proposals</p>
          </div>
        </div>
        <Button onClick={() => navigate('/dashboard/fee-finalizations/new')} className="bg-blue-600 text-white rounded-xl gap-2">
          <Plus className="w-4 h-4" />
          New Proposal
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search fee proposals…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { setSearch(searchInput); setPage(1); } }}
            className="pl-9 bg-white border-slate-200 rounded-xl"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="text-sm border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Statuses</option>
          <option value="DRAFT">Draft</option>
          <option value="SENT">Sent</option>
          <option value="NEGOTIATING">Negotiating</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="REJECTED">Rejected</option>
          <option value="INVOICED">Invoiced</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              {['Service', 'Client / Lead', 'Proposed Fee', 'Final Fee', 'Valid Until', 'Status', 'Actions'].map((h) => (
                <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="border-b border-slate-50">
                  {[...Array(7)].map((_, j) => (
                    <td key={j} className="py-3 px-4"><div className="h-4 bg-slate-100 rounded animate-pulse" /></td>
                  ))}
                </tr>
              ))
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-16 text-center text-slate-400 text-sm">
                  No fee proposals yet.{' '}
                  <button onClick={() => navigate('/dashboard/fee-finalizations/new')} className="text-blue-600 hover:underline font-medium">Create first proposal</button>
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50 group">
                  <td className="py-3 px-4 font-semibold text-slate-800">{item.serviceName}</td>
                  <td className="py-3 px-4">
                    <div className="text-xs text-slate-600">
                      {item.client?.name && <p className="text-blue-600 font-medium">{item.client.name}</p>}
                      {item.lead?.name && <p className="text-slate-400">{item.lead.name}</p>}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800">
                    {formatCurrency(item.proposedFee, item.currency)}
                  </td>
                  <td className="py-3 px-4">
                    {item.finalFee ? (
                      <span className="flex items-center gap-1 text-green-700 font-semibold">
                        <CheckCircle className="w-3.5 h-3.5" />
                        {formatCurrency(item.finalFee, item.currency)}
                      </span>
                    ) : <span className="text-slate-300">Pending</span>}
                  </td>
                  <td className="py-3 px-4">
                    {item.validUntil ? (
                      <span className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Calendar className="w-3 h-3" />
                        {new Date(item.validUntil).toLocaleDateString('en-GB')}
                      </span>
                    ) : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="py-3 px-4"><StatusBadge status={item.status} /></td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => navigate(`/dashboard/fee-finalizations/${item.id}`)} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => navigate(`/dashboard/fee-finalizations/${item.id}/edit`)} className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"><Edit className="w-4 h-4" /></button>
                      <button
                        onClick={() => toast.custom((t) => (
                          <div className="bg-white p-5 rounded-2xl shadow-2xl border border-slate-100 w-80">
                            <h3 className="font-bold text-slate-900">Delete?</h3>
                            <div className="flex gap-2 mt-4 justify-end">
                              <Button variant="ghost" size="sm" onClick={() => toast.dismiss(t)} className="rounded-xl">Cancel</Button>
                              <Button size="sm" className="bg-red-600 text-white rounded-xl" onClick={async () => { toast.dismiss(t); try { await deleteFee.mutateAsync(item.id); } catch { /* */ } }}>Delete</Button>
                            </div>
                          </div>
                        ), { duration: Infinity })}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
            <p className="text-xs text-slate-500">Showing {(page-1)*15+1}–{Math.min(page*15,total)} of {total}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page===1} onClick={()=>setPage(p=>p-1)} className="rounded-lg text-xs">Prev</Button>
              <Button variant="outline" size="sm" disabled={page===totalPages} onClick={()=>setPage(p=>p+1)} className="rounded-lg text-xs">Next</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
