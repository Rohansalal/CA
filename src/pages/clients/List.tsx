// @ts-nocheck
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Eye, Search, Mail, Phone, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useUsers } from '../../api/hooks/useUsers';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import type { User } from '../../types';

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    ACTIVE:   { label: 'Active',   cls: 'bg-green-100 text-green-700 border-green-200' },
    INACTIVE: { label: 'Inactive', cls: 'bg-slate-100 text-slate-500 border-slate-200' },
    DELETED:  { label: 'Deleted',  cls: 'bg-red-100 text-red-600 border-red-200' },
  };
  const cfg = map[status] ?? { label: status, cls: 'bg-slate-100 text-slate-500 border-slate-200' };
  return (
    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
}

function KycBadge({ status }: { status?: string }) {
  if (!status) return <span className="text-slate-300 text-xs">—</span>;
  const map: Record<string, { label: string; cls: string }> = {
    VERIFIED: { label: 'Verified',  cls: 'bg-emerald-100 text-emerald-700' },
    PENDING:  { label: 'Pending',   cls: 'bg-amber-100 text-amber-700' },
    REJECTED: { label: 'Rejected',  cls: 'bg-red-100 text-red-700' },
  };
  const cfg = map[status] ?? { label: status, cls: 'bg-slate-100 text-slate-500' };
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
}

export function ClientList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Fetch all users (client portal registrations)
  const { data, isLoading } = useUsers({ page, limit: 15, search: search || undefined });

  const allUsers: User[] = (data as any)?.users ?? [];
  const total: number = (data as any)?.count ?? 0;
  const totalPages = Math.ceil(total / 15);

  // Filter by status client-side (backend may not support status filter)
  const users = statusFilter
    ? allUsers.filter((u) => u.status === statusFilter)
    : allUsers;

  // Stats from current page data
  const activeCount  = allUsers.filter((u) => u.status === 'ACTIVE').length;
  const inactiveCount = allUsers.filter((u) => u.status === 'INACTIVE').length;

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Clients</h1>
            <p className="text-xs text-slate-400">Users registered from client portal</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Total Clients</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{total}</p>
          <p className="text-xs text-slate-400 mt-0.5">All registered users</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Active</p>
          </div>
          <p className="text-2xl font-bold text-green-600 mt-1">{activeCount}</p>
          <p className="text-xs text-slate-400 mt-0.5">Currently active</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-slate-400" />
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Inactive</p>
          </div>
          <p className="text-2xl font-bold text-slate-500 mt-1">{inactiveCount}</p>
          <p className="text-xs text-slate-400 mt-0.5">Inactive accounts</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search clients…"
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
          <option value="">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              {['Client', 'Contact', 'Email Verified', 'KYC Status', 'Status', 'Joined', 'Actions'].map((h) => (
                <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(8)].map((_, i) => (
                <tr key={i} className="border-b border-slate-50">
                  {[...Array(7)].map((_, j) => (
                    <td key={j} className="py-3 px-4">
                      <div className="h-4 bg-slate-100 rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-16 text-center text-slate-400 text-sm">
                  No clients found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                  {/* Client name + initial */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
                        {(user.name || '?').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 leading-none">{user.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Phone */}
                  <td className="py-3 px-4">
                    {user.phone ? (
                      <p className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Phone className="w-3 h-3" /> {user.phone}
                      </p>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>

                  {/* Email verified */}
                  <td className="py-3 px-4">
                    {user.isEmailVerified ? (
                      <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                        <CheckCircle className="w-3.5 h-3.5" /> Verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-amber-500 font-medium">
                        <Clock className="w-3.5 h-3.5" /> Pending
                      </span>
                    )}
                  </td>

                  {/* KYC */}
                  <td className="py-3 px-4">
                    <KycBadge status={user.kycStatus} />
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4">
                    <StatusBadge status={user.status} />
                  </td>

                  {/* Joined date */}
                  <td className="py-3 px-4 text-xs text-slate-500">
                    {new Date(user.createdAt).toLocaleDateString('en-AE', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => navigate(`/dashboard/users/${user.id}`)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                        title="View client details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Showing {(page - 1) * 15 + 1}–{Math.min(page * 15, total)} of {total} clients
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="rounded-lg text-xs">
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} className="rounded-lg text-xs">
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
