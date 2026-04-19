import { useState } from 'react';
import { useLeads, useDeleteLead, useLeadStats, useCreateLead, useUpdateLead } from '../../api/hooks/useLeads';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Target, Users, TrendingUp, CheckCircle, DollarSign, Loader2, Trash2, Edit, Plus, Search, Phone, Mail, X } from 'lucide-react';
import type { Lead } from '../../types';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';

const STATUS_OPTIONS = [
  { value: 'NEW', label: 'New', cls: 'bg-slate-100 text-slate-600' },
  { value: 'FOLLOW_UP', label: 'Follow Up', cls: 'bg-amber-100 text-amber-700' },
  { value: 'FEE_FINALIZATION', label: 'Fee Finalization', cls: 'bg-blue-100 text-blue-700' },
  { value: 'CLOSED_WON', label: 'Closed Won', cls: 'bg-cyan-100 text-cyan-700' },
  { value: 'CONVERTED', label: 'Converted', cls: 'bg-green-100 text-green-700' },
  { value: 'LOST', label: 'Lost', cls: 'bg-red-100 text-red-600' },
];

function LeadStatusBadge({ status }: { status: string }) {
  const cfg = STATUS_OPTIONS.find((s) => s.value === status) ?? { label: status, cls: 'bg-slate-100 text-slate-600' };
  return <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${cfg.cls}`}>{cfg.label}</span>;
}

function LeadFormModal({ onClose, editLead }: { onClose: () => void; editLead?: Lead }) {
  const createLead = useCreateLead();
  const updateLead = useUpdateLead();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: editLead
      ? { name: editLead.name, email: editLead.email ?? '', phone: editLead.phone ?? '', source: editLead.source ?? '', interestedService: editLead.interestedService ?? '', status: editLead.status, notes: editLead.notes ?? '' }
      : { status: 'NEW' as const },
  });

  const onSubmit = async (data: any) => {
    try {
      if (editLead) {
        await updateLead.mutateAsync({ id: editLead.id, ...data });
      } else {
        await createLead.mutateAsync(data);
      }
      onClose();
    } catch { /* handled */ }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h3 className="font-bold text-slate-900">{editLead ? 'Edit Lead' : 'Add New Lead'}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name *</label>
            <Input {...register('name', { required: 'Name is required' })} placeholder="Enter full name" className="rounded-xl" />
            {errors.name && <p className="text-xs text-red-500 mt-1">{String(errors.name.message)}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
              <Input {...register('email')} type="email" placeholder="Email address" className="rounded-xl" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Phone</label>
              <Input {...register('phone')} placeholder="Phone number" className="rounded-xl" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Source</label>
              <Input {...register('source')} placeholder="e.g. Website, Referral" className="rounded-xl" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Status</label>
              <select {...register('status')} className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Interested Service</label>
            <Input {...register('interestedService')} placeholder="e.g. VAT Filing, Trade License" className="rounded-xl" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Notes</label>
            <textarea {...register('notes')} placeholder="Additional notes…" rows={3} className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>
          <div className="flex gap-3 justify-end pt-2 border-t border-slate-100">
            <Button type="button" variant="ghost" onClick={onClose} className="rounded-xl">Cancel</Button>
            <Button type="submit" disabled={createLead.isPending || updateLead.isPending} className="bg-blue-600 text-white rounded-xl">
              {(createLead.isPending || updateLead.isPending) ? <Loader2 className="w-4 h-4 animate-spin" /> : (editLead ? 'Update Lead' : 'Add Lead')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function Pipeline() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string>('');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editLead, setEditLead] = useState<Lead | undefined>();

  const { data, isLoading } = useLeads({ page, limit: 15, status: status || undefined });
  const { data: stats } = useLeadStats();
  const deleteLead = useDeleteLead();

  const leads: Lead[] = (data as any)?.items ?? [];
  const total: number = (data as any)?.count ?? 0;
  const totalPages = Math.ceil(total / 15);

  const handleDelete = async (id: number, name: string) => {
    toast.custom((t) => (
      <div className="bg-white p-5 rounded-2xl shadow-2xl border border-slate-100 w-80">
        <h3 className="font-bold text-slate-900">Delete Lead?</h3>
        <p className="text-sm text-slate-500 mt-1">Remove <strong>{name}</strong>?</p>
        <div className="flex gap-2 mt-4 justify-end">
          <Button variant="ghost" size="sm" onClick={() => toast.dismiss(t)} className="rounded-xl">Cancel</Button>
          <Button size="sm" className="bg-red-600 text-white rounded-xl" onClick={async () => { toast.dismiss(t); try { await deleteLead.mutateAsync(id); } catch { /* */ } }}>Delete</Button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Leads</h1>
            <p className="text-xs text-slate-400">Sales pipeline management</p>
          </div>
        </div>
        <Button onClick={() => { setEditLead(undefined); setShowForm(true); }} className="bg-blue-600 text-white rounded-xl gap-2">
          <Plus className="w-4 h-4" />
          Add Lead
        </Button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center">
              <Target className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <p className="text-lg font-black text-slate-900">{stats.total}</p>
              <p className="text-xs text-slate-500">Total Leads</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-lg font-black text-slate-900">{stats.feeFinalization ?? 0}</p>
              <p className="text-xs text-slate-500">Fee Finalization</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-cyan-500" />
            </div>
            <div>
              <p className="text-lg font-black text-slate-900">{stats.closedWon ?? 0}</p>
              <p className="text-xs text-slate-500">Closed Won</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-lg font-black text-slate-900">{stats.conversionRate.toFixed(1)}%</p>
              <p className="text-xs text-slate-500">Conversion Rate</p>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search leads…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { setSearch(searchInput); setPage(1); } }}
            className="pl-9 bg-white border-slate-200 rounded-xl"
          />
        </div>
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="text-sm border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              {['Lead', 'Contact', 'Source', 'Interested Service', 'Status', 'Created', 'Actions'].map((h) => (
                <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(8)].map((_, i) => (
                <tr key={i} className="border-b border-slate-50">
                  {[...Array(7)].map((_, j) => (
                    <td key={j} className="py-3 px-4"><div className="h-4 bg-slate-100 rounded animate-pulse" /></td>
                  ))}
                </tr>
              ))
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-16 text-center text-slate-400 text-sm">
                  No leads found.{' '}
                  <button onClick={() => setShowForm(true)} className="text-blue-600 hover:underline font-medium">Add first lead</button>
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="border-b border-slate-50 hover:bg-slate-50/50 group">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs shrink-0">
                        {lead.name.charAt(0).toUpperCase()}
                      </div>
                      <p className="font-semibold text-slate-900">{lead.name}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-0.5">
                      {lead.email && <p className="flex items-center gap-1 text-xs text-slate-500"><Mail className="w-3 h-3" />{lead.email}</p>}
                      {lead.phone && <p className="flex items-center gap-1 text-xs text-slate-500"><Phone className="w-3 h-3" />{lead.phone}</p>}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-500">{lead.source ?? '—'}</td>
                  <td className="py-3 px-4 text-xs text-slate-600">{lead.interestedService ?? '—'}</td>
                  <td className="py-3 px-4"><LeadStatusBadge status={lead.status} /></td>
                  <td className="py-3 px-4 text-xs text-slate-400">
                    {new Date(lead.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => { setEditLead(lead); setShowForm(true); }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(lead.id, lead.name)}
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

      {/* Modal */}
      {showForm && <LeadFormModal onClose={() => { setShowForm(false); setEditLead(undefined); }} editLead={editLead} />}
    </div>
  );
}
