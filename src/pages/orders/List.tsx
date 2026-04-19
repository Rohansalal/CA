// @ts-nocheck
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders, useUpdateOrderStatus } from '../../api/hooks/useOrders';
import { DataTable, StatusBadge } from '../../components/common/DataTable';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Eye, Loader2, ShoppingCart, Calendar, User, CreditCard, Filter, ArrowRight, Hash } from 'lucide-react';
import type { Order } from '../../types';
import { toast } from 'sonner';

const statusOptions = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];

export function OrderList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string>('');
  
  const { data, isLoading, refetch } = useOrders({ page, limit: 10, status: status || undefined });
  const updateStatus = useUpdateOrderStatus();

  const formatPrice = (price: string | number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(Number(price));
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await updateStatus.mutateAsync({ id: orderId, status: newStatus });
      toast.success('Order status updated', { description: `Order #${orderId} is now ${newStatus.replace('_', ' ')}.` });
      refetch();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const columns = [
    {
      key: 'id',
      header: 'Order Reference',
      render: (order: Order) => (
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all duration-500 shadow-sm">
            <Hash size={20} />
          </div>
          <div>
            <p className="font-black text-slate-900 leading-none">#{order.id}</p>
            <div className="flex items-center gap-1.5 mt-1.5 text-slate-400">
              <Calendar size={12} />
              <p className="text-[10px] font-bold uppercase tracking-wider">
                {new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'user',
      header: 'Client',
      render: (order: Order) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <User size={14} />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-xs leading-none">{order.user?.name || `User #${order.userId}`}</p>
            <p className="text-[10px] font-medium text-slate-400 mt-1">{order.user?.email || ''}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'totalAmount',
      header: 'Total Value',
      render: (order: Order) => (
        <div className="flex items-center gap-1.5 font-black text-slate-900">
          <CreditCard size={14} className="text-slate-400" />
          <span className="text-sm">{formatPrice(order.totalAmount || 0)}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (order: Order) => (
        <div className="group/select relative">
          <Select
            value={order.status}
            onValueChange={(value) => handleStatusChange(order.id, value)}
            disabled={updateStatus.isPending && updateStatus.variables?.id === order.id}
          >
            <SelectTrigger className="w-36 h-9 rounded-xl border-slate-200 bg-slate-50/50 font-bold text-[10px] uppercase tracking-wider focus:ring-4 focus:ring-blue-500/10 transition-all">
              {updateStatus.isPending && updateStatus.variables?.id === order.id ? (
                <Loader2 className="h-4 w-4 animate-spin mx-auto text-blue-500" />
              ) : (
                <SelectValue />
              )}
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-slate-200 shadow-2xl">
              {statusOptions.map((s) => (
                <SelectItem key={s} value={s} className="text-[10px] font-black uppercase tracking-widest rounded-lg my-1">
                  {s.replace('_', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ),
    },
  ];

  const actions = (order: Order) => (
    <Button
      variant="outline"
      size="icon"
      className="h-9 w-9 rounded-xl border-slate-200 hover:bg-white hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm group"
      onClick={() => navigate(`/dashboard/orders/${order.id}`)}
    >
      <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
    </Button>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-900/5 border border-slate-100">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-[1.5rem] bg-amber-500 flex items-center justify-center text-white shadow-xl shadow-amber-900/20">
            <ShoppingCart size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Order Lifecycle</h2>
            <p className="text-slate-500 font-medium mt-1">Track filings, payments, and service delivery progress.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-2 px-3">
            <Filter size={16} className="text-slate-400" />
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Filter:</span>
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-44 h-11 rounded-xl border-none bg-white shadow-sm font-bold text-xs focus:ring-4 focus:ring-blue-500/5 transition-all">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-slate-200 shadow-2xl">
              <SelectItem value="all" className="font-bold text-xs">All Activity</SelectItem>
              {statusOptions.map((s) => (
                <SelectItem key={s} value={s} className="font-bold text-xs uppercase tracking-widest my-1 rounded-lg">
                  {s.replace('_', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Table Content */}
      <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-900/5 border border-slate-100 p-2">
        <DataTable
          data={data?.orders || []}
          columns={columns}
          loading={isLoading}
          totalCount={data?.count || 0}
          page={page}
          onPageChange={setPage}
          actions={actions}
          keyExtractor={(order) => order.id}
          emptyMessage="No orders found matching your filters."
        />
      </div>
    </div>
  );
}

