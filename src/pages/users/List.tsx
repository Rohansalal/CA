import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers, useDeleteUser } from '../../api/hooks/useUsers';
import { DataTable, StatusBadge } from '../../components/common/DataTable';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Edit, Trash2, Eye, Loader2, Plus, UserPlus, Shield, Mail, Calendar, Users } from 'lucide-react';
import type { User } from '../../types';
import { toast } from 'sonner';

export function UserList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  
  const { data, isLoading, refetch } = useUsers({ page, limit: 10, search });
  const deleteUser = useDeleteUser();

  const handleDelete = async (id: number) => {
    toast.custom((t) => (
      <div className="bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 max-w-sm">
        <h3 className="text-lg font-black text-slate-900">Confirm Deletion</h3>
        <p className="text-sm font-medium text-slate-500 mt-2">Are you sure you want to permanently remove this user? This action cannot be undone.</p>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={() => toast.dismiss(t)} className="font-bold rounded-xl">Cancel</Button>
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-900/20"
            onClick={async () => {
              toast.dismiss(t);
              try {
                await deleteUser.mutateAsync(id);
                toast.success('User deleted successfully');
                refetch();
              } catch (error) {
                toast.error('Failed to delete user');
              }
            }}
          >
            Delete User
          </Button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  const columns = [
    {
      key: 'name',
      header: 'Client / User',
      render: (user: User) => (
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center font-black text-slate-500 group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-500">
              {user.name.charAt(0).toUpperCase()}
            </div>
            {user.status === 'ACTIVE' && (
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
            )}
          </div>
          <div>
            <p className="font-bold text-slate-900 leading-none">{user.name}</p>
            <div className="flex items-center gap-2 mt-1.5 text-slate-400">
              <Mail size={12} />
              <p className="text-xs font-medium">{user.email}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Account Type',
      render: (user: User) => (
        <div className="flex items-center gap-2">
          {user.role === 'ADMIN' ? (
            <Badge className="bg-indigo-600 text-white border-none rounded-lg px-2 py-0.5 text-[10px] font-black uppercase tracking-wider gap-1.5">
              <Shield size={10} />
              Administrator
            </Badge>
          ) : (
            <Badge variant="outline" className="border-slate-200 text-slate-500 bg-slate-50 rounded-lg px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
              Client
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Account Status',
      render: (user: User) => <StatusBadge status={user.status} />,
    },
    {
      key: 'createdAt',
      header: 'Registration Date',
      render: (user: User) => (
        <div className="flex items-center gap-2 text-slate-500 font-bold">
          <Calendar size={14} className="text-slate-300" />
          <span className="text-xs">
            {new Date(user.createdAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>
      ),
    },
  ];

  const actions = (user: User) => (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-xl border-slate-200 hover:bg-white hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
        onClick={() => navigate(`/dashboard/users/${user.id}`)}
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-xl border-slate-200 hover:bg-white hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm"
        onClick={() => navigate(`/dashboard/users/${user.id}/edit`)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-xl border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm"
        onClick={() => handleDelete(user.id)}
        disabled={deleteUser.isPending}
      >
        {deleteUser.isPending && deleteUser.variables === user.id ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-900/5 border border-slate-100">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-[1.5rem] bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-900/20">
            <Users size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Client Directory</h2>
            <p className="text-slate-500 font-medium mt-1">Manage, audit, and organize your firm's user base.</p>
          </div>
        </div>
        <Button 
          onClick={() => navigate('/dashboard/users/new')}
          className="rounded-2xl h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg gap-3 shadow-xl shadow-blue-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <UserPlus size={22} />
          Add New Client
        </Button>
      </div>

      {/* Main Table Content */}
      <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-900/5 border border-slate-100 p-2">
        <DataTable
          data={data?.users || []}
          columns={columns}
          loading={isLoading}
          totalCount={data?.count || 0}
          page={page}
          onPageChange={setPage}
          onSearch={setSearch}
          actions={actions}
          keyExtractor={(user) => user.id}
          emptyMessage="No clients matching your search criteria."
        />
      </div>
    </div>
  );
}

