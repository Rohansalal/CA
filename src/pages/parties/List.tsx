import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, Plus, Eye, Edit, Trash2, Search, Globe, Mail, Phone } from 'lucide-react';
import { useParties, useDeleteParty } from '../../api/hooks/useParties';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import type { Party } from '../../types';
import { toast } from 'sonner';

function RoleBadge({ role }: { role?: string }) {
  const map: Record<string, string> = {
    Director: 'bg-blue-100 text-blue-700',
    Shareholder: 'bg-purple-100 text-purple-700',
    Manager: 'bg-indigo-100 text-indigo-700',
    'Authorized Signatory': 'bg-amber-100 text-amber-700',
  };
  const cls = map[role ?? ''] ?? 'bg-slate-100 text-slate-500';
  return <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${cls}`}>{role ?? '—'}</span>;
}

export function PartyList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const { data, isLoading } = useParties({ page, limit: 15, search });
  const deleteParty = useDeleteParty();

  const parties: Party[] = (data as any)?.parties ?? (data as any)?.items ?? [];
  const total: number = (data as any)?.count ?? 0;
  const totalPages = Math.ceil(total / 15);

  const handleDelete = (id: number, name: string) => {
    toast.custom((t) => (
      <div className="bg-white p-5 rounded-2xl shadow-2xl border border-slate-100 w-80">
        <h3 className="font-bold text-slate-900">Delete Party?</h3>
        <p className="text-sm text-slate-500 mt-1">Remove <strong>{name}</strong>?</p>
        <div className="flex gap-2 mt-4 justify-end">
          <Button variant="ghost" size="sm" onClick={() => toast.dismiss(t)} className="rounded-xl">Cancel</Button>
          <Button size="sm" className="bg-red-600 text-white rounded-xl" onClick={async () => { toast.dismiss(t); try { await deleteParty.mutateAsync(id); } catch { /* */ } }}>
            Delete
          </Button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
            <UserCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Parties</h1>
            <p className="text-xs text-slate-400">{total} individuals</p>
          </div>
        </div>
        <Button onClick={() => navigate('/dashboard/parties/new')} className="bg-blue-600 text-white rounded-xl gap-2">
          <Plus className="w-4 h-4" />
          Add Party
        </Button>
      </div>

      <div className="flex gap-3">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search parties…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { setSearch(searchInput); setPage(1); } }}
            className="pl-9 bg-white border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              {['Party', 'Role', 'Nationality', 'Contact', 'Emirates ID / Passport', 'Client', 'Actions'].map((h) => (
                <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <tr key={i} className="border-b border-slate-50">
                  {[...Array(7)].map((_, j) => (
                    <td key={j} className="py-3 px-4"><div className="h-4 bg-slate-100 rounded animate-pulse" /></td>
                  ))}
                </tr>
              ))
            ) : parties.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-16 text-center text-slate-400 text-sm">
                  No parties found.{' '}
                  <button onClick={() => navigate('/dashboard/parties/new')} className="text-blue-600 font-medium hover:underline">Add first party</button>
                </td>
              </tr>
            ) : (
              parties.map((party) => (
                <tr key={party.id} className="border-b border-slate-50 hover:bg-slate-50/50 group">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 font-bold text-xs shrink-0">
                        {party.name.charAt(0).toUpperCase()}
                      </div>
                      <p className="font-semibold text-slate-900">{party.name}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4"><RoleBadge role={party.role} /></td>
                  <td className="py-3 px-4">
                    {party.nationality ? (
                      <span className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Globe className="w-3 h-3" /> {party.nationality}
                      </span>
                    ) : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-0.5">
                      {party.email && <p className="text-xs text-slate-500 flex items-center gap-1"><Mail className="w-3 h-3" />{party.email}</p>}
                      {party.phone && <p className="text-xs text-slate-500 flex items-center gap-1"><Phone className="w-3 h-3" />{party.phone}</p>}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-0.5">
                      {party.emiratesId && <p className="text-[11px] text-slate-500 font-mono">EID: {party.emiratesId}</p>}
                      {party.passportNumber && <p className="text-[11px] text-slate-500 font-mono">PP: {party.passportNumber}</p>}
                      {!party.emiratesId && !party.passportNumber && <span className="text-slate-300">—</span>}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {party.client ? (
                      <span className="text-blue-600 text-xs font-medium">{party.client.name}</span>
                    ) : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => navigate(`/dashboard/parties/${party.id}`)} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => navigate(`/dashboard/parties/${party.id}/edit`)} className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(party.id, party.name)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50">
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
            <p className="text-xs text-slate-500">Showing {(page - 1) * 15 + 1}–{Math.min(page * 15, total)} of {total}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="rounded-lg text-xs">Prev</Button>
              <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} className="rounded-lg text-xs">Next</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
