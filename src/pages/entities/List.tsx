import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Plus, Eye, Edit, Trash2, Search, Calendar, MapPin } from 'lucide-react';
import { useEntities, useDeleteEntity } from '../../api/hooks/useEntities';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import type { Entity } from '../../types';
import { toast } from 'sonner';

function EntityStatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    ACTIVE: 'bg-green-100 text-green-700',
    INACTIVE: 'bg-slate-100 text-slate-500',
    EXPIRED: 'bg-red-100 text-red-700',
    CANCELLED: 'bg-orange-100 text-orange-700',
  };
  return <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${map[status] ?? 'bg-slate-100 text-slate-500'}`}>{status}</span>;
}

export function EntityList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const { data, isLoading } = useEntities({ page, limit: 15, search });
  const deleteEntity = useDeleteEntity();

  const entities: Entity[] = (data as any)?.entities ?? (data as any)?.items ?? [];
  const total: number = (data as any)?.count ?? 0;
  const totalPages = Math.ceil(total / 15);

  const handleDelete = (id: number, name: string) => {
    toast.custom((t) => (
      <div className="bg-white p-5 rounded-2xl shadow-2xl border border-slate-100 w-80">
        <h3 className="font-bold text-slate-900">Delete Entity?</h3>
        <p className="text-sm text-slate-500 mt-1">Remove <strong>{name}</strong>?</p>
        <div className="flex gap-2 mt-4 justify-end">
          <Button variant="ghost" size="sm" onClick={() => toast.dismiss(t)} className="rounded-xl">Cancel</Button>
          <Button size="sm" className="bg-red-600 text-white rounded-xl" onClick={async () => { toast.dismiss(t); try { await deleteEntity.mutateAsync(id); } catch { /* */ } }}>Delete</Button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Entities</h1>
            <p className="text-xs text-slate-400">{total} business entities</p>
          </div>
        </div>
        <Button onClick={() => navigate('/dashboard/entities/new')} className="bg-blue-600 text-white rounded-xl gap-2">
          <Plus className="w-4 h-4" />
          Add Entity
        </Button>
      </div>

      <div className="flex gap-3">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search entities…"
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
              {['Entity Name', 'Type', 'License / Reg No.', 'Authority', 'Emirate', 'License Expiry', 'Status', 'Client', 'Actions'].map((h) => (
                <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <tr key={i} className="border-b border-slate-50">
                  {[...Array(9)].map((_, j) => (
                    <td key={j} className="py-3 px-4"><div className="h-4 bg-slate-100 rounded animate-pulse" /></td>
                  ))}
                </tr>
              ))
            ) : entities.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-16 text-center text-slate-400 text-sm">
                  No entities found.{' '}
                  <button onClick={() => navigate('/dashboard/entities/new')} className="text-blue-600 hover:underline font-medium">Add first entity</button>
                </td>
              </tr>
            ) : (
              entities.map((entity) => (
                <tr key={entity.id} className="border-b border-slate-50 hover:bg-slate-50/50 group">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs shrink-0">
                        {entity.name.charAt(0).toUpperCase()}
                      </div>
                      <p className="font-semibold text-slate-900">{entity.name}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">{entity.entityType ?? '—'}</span>
                  </td>
                  <td className="py-3 px-4 text-xs font-mono text-slate-500">
                    {entity.licenseNumber ?? entity.registrationNumber ?? '—'}
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-600">{entity.licenseAuthority ?? '—'}</td>
                  <td className="py-3 px-4">
                    {entity.emirate ? (
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="w-3 h-3" />{entity.emirate}
                      </span>
                    ) : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="py-3 px-4">
                    {entity.licenseExpiry ? (
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Calendar className="w-3 h-3" />
                        {new Date(entity.licenseExpiry).toLocaleDateString('en-GB')}
                      </span>
                    ) : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="py-3 px-4"><EntityStatusBadge status={entity.status} /></td>
                  <td className="py-3 px-4">
                    {entity.client ? <span className="text-blue-600 text-xs font-medium">{entity.client.name}</span> : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => navigate(`/dashboard/entities/${entity.id}`)} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => navigate(`/dashboard/entities/${entity.id}/edit`)} className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(entity.id, entity.name)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
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
