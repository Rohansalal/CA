import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard,
  Search,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Edit2,
  ChevronDown,
  FileText,
  ExternalLink,
  DollarSign,
  Receipt,
  User,
  Package,
  ArrowUpRight,
  BadgeCheck,
  Layers,
} from 'lucide-react';
import { AdminLayout } from "../components/AdminLayout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "../../components/ui/dropdown-menu";
import { Badge } from "../../components/ui/badge";
import { cn } from "../../components/ui/utils";
import api from '../../utils/api';
import { toast } from 'sonner';
import { API_BASE_URL } from '../../utils/constants';

interface Order {
    id: number;
    orderNumber: string;
    totalAmount: number;
    status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
    createdAt: string;
    notes: string;
    user: { name: string; email: string, phone: string };
    items: any[];
    documents: any[];
}

// ─── Plan helpers ─────────────────────────────────────────────────────────────
const PLAN_BADGE: Record<string, { label: string; cls: string }> = {
    BASIC:    { label: 'Basic',    cls: 'bg-blue-50 text-blue-700 border-blue-100' },
    STANDARD: { label: 'Standard', cls: 'bg-amber-50 text-amber-700 border-amber-100' },
    PREMIUM:  { label: 'Premium',  cls: 'bg-purple-50 text-purple-700 border-purple-100' },
    ELITE:    { label: 'Elite',    cls: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
};
const getPlanBadge = (planType: string) => {
    const key = (planType || '').toUpperCase();
    if (key.includes('ELITE'))    return PLAN_BADGE.ELITE;
    if (key.includes('PREMIUM'))  return PLAN_BADGE.PREMIUM;
    if (key.includes('STANDARD')) return PLAN_BADGE.STANDARD;
    return PLAN_BADGE.BASIC;
};
const isItrService = (name: string) =>
    (name || '').toLowerCase().includes('itr') || (name || '').toLowerCase().includes('income tax');

const DOC_TYPE_ICON: Record<string, string> = {
    'Aadhaar Card — Front': '🪪',
    'Aadhaar Card — Back':  '🪪',
    'PAN Card — Front':     '💳',
    'PAN Card — Back':      '💳',
};

export const AdminPayments: React.FC = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [newNote, setNewNote] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const res = await api.get('/admin/orders');
            setOrders(res.data.orders || []);
        } catch (err: any) {
            toast.error(err.response?.data?.error || 'Failed to fetch payment records');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (orderId: number) => {
        if (!selectedStatus && !newNote) return;

        try {
            await api.put(`/admin/orders/${orderId}`, {
                status: selectedStatus || undefined,
                notes: newNote || undefined,
            });
            toast.success('Transaction status synchronized');
            setExpandedId(null);
            setNewNote('');
            setSelectedStatus('');
            fetchOrders();
        } catch (err: any) {
            toast.error('Failed to update transaction node');
        }
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'COMPLETED': return "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20";
            case 'PROCESSING': return "bg-blue-500 text-black shadow-lg shadow-blue-500/20";
            case 'CANCELLED': return "bg-red-500 text-black shadow-lg shadow-red-500/20";
            default: return "bg-slate-400 text-black shadow-lg shadow-slate-400/20";
        }
    };

    const filteredOrders = orders.filter(o => {
        const matchesSearch = 
            o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            o.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            o.user.email.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'ALL' || o.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    return (
        <AdminLayout>
            <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Financial Records</span>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Payments & Orders</h1>
                        <p className="text-slate-500 font-medium">Track and manage platform transactions and service fulfillment.</p>
                    </div>
                    <Button className="h-10 px-4 rounded-lg font-semibold text-xs bg-slate-900 text-black hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all uppercase tracking-wider">
                        <Download className="h-3.5 w-3.5 mr-2" /> Export Data
                    </Button>
                </div>

                {/* KPI Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 group">
                        <div className="space-y-4">
                            <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-black">
                                <DollarSign className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Gross Revenue</p>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">₹{orders.reduce((acc, curr) => acc + curr.totalAmount, 0).toLocaleString()}</h3>
                            </div>
                        </div>
                    </Card>
                    <StatCard 
                        title="Active Orders" 
                        value={orders.filter(o => o.status === 'PROCESSING').length.toString()} 
                        icon={Package} 
                        status="info"
                    />
                    <StatCard 
                        title="Completed" 
                        value={orders.filter(o => o.status === 'COMPLETED').length.toString()} 
                        icon={CheckCircle2} 
                        status="success"
                    />
                    <StatCard 
                        title="Pending" 
                        value={orders.filter(o => o.status === 'PENDING').length.toString()} 
                        icon={Clock} 
                        status="warning"
                    />
                </div>

                {/* Filters */}
                <Card className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                    <CardContent className="p-4 md:p-6 bg-white">
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input 
                                    placeholder="Search by order ID, client name, or email..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 h-11 border-slate-200 rounded-lg focus:ring-indigo-500/10 focus:border-indigo-500/20"
                                />
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <div className="relative min-w-[180px]">
                                    <select 
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500/10 outline-none appearance-none cursor-pointer pr-10"
                                    >
                                        <option value="ALL">All Statuses</option>
                                        <option value="PENDING">Pending</option>
                                        <option value="PROCESSING">Processing</option>
                                        <option value="COMPLETED">Completed</option>
                                        <option value="CANCELLED">Cancelled</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Ledger Table */}
                <Card className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                    <CardContent className="p-0 bg-white">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/30 border-b border-slate-100">
                                        <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Order ID</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Client Profile</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Service Module</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Transaction</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {loading ? (
                                        [1, 2, 3, 4, 5].map((i) => (
                                            <tr key={i} className="animate-pulse">
                                                <td colSpan={6} className="px-6 py-8">
                                                    <div className="h-12 bg-slate-100 rounded-lg w-full" />
                                                </td>
                                            </tr>
                                        ))
                                    ) : filteredOrders.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-24 text-center">
                                                <div className="flex flex-col items-center gap-3">
                                                    <Receipt className="h-12 w-12 text-slate-200" />
                                                    <p className="text-lg font-bold text-slate-900">No orders found</p>
                                                    <p className="text-sm text-slate-500 mb-2">Try adjusting your search or filters.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredOrders.map((order) => {
                                            let parsedNotes: any = null;
                                            try { if (order.notes) parsedNotes = JSON.parse(order.notes); } catch (e) {}
                                            const displayName = parsedNotes?.fullName || order.user.name;
                                            const displayEmail = parsedNotes?.emailId || order.user.email;

                                            return (
                                                <React.Fragment key={order.id}>
                                                    <tr 
                                                        className={cn(
                                                            "group hover:bg-slate-50/50 transition-all duration-200 cursor-pointer",
                                                            expandedId === order.id && "bg-slate-50/80"
                                                        )}
                                                        onClick={() => {
                                                            setExpandedId(expandedId === order.id ? null : order.id);
                                                            setNewNote('');
                                                            setSelectedStatus(order.status);
                                                        }}
                                                    >
                                                        <td className="px-6 py-5">
                                                            <div>
                                                                <p className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">{order.orderNumber}</p>
                                                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                                                                    <Calendar className="h-3 w-3 text-slate-300" />
                                                                    {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <div className="flex items-center gap-3">
                                                                <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 font-bold group-hover:bg-indigo-600 group-hover:text-black transition-all">
                                                                    {displayName.charAt(0).toUpperCase()}
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{displayName}</p>
                                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{displayEmail}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            {(() => {
                                                                const item = order.items[0];
                                                                const badge = getPlanBadge(item?.planType || '');
                                                                return (
                                                                    <div className="space-y-1.5">
                                                                        <div className="flex items-center gap-2">
                                                                            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                                                                                <Package className="h-3.5 w-3.5" />
                                                                            </div>
                                                                            <p className="text-sm font-semibold text-slate-700 truncate max-w-[140px]">
                                                                                {item?.serviceName || 'Service Order'}
                                                                            </p>
                                                                        </div>
                                                                        {item?.planType && (
                                                                            <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border', badge.cls)}>
                                                                                <Layers className="h-2.5 w-2.5" />
                                                                                {badge.label}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })()}
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <p className="text-base font-bold text-slate-900 tracking-tight">₹{order.totalAmount.toLocaleString()}</p>
                                                            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-0.5">Payment Verified</p>
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <div className={cn(
                                                                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                                                                order.status === 'COMPLETED' ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                                                                order.status === 'PROCESSING' ? "bg-indigo-50 text-indigo-700 border border-indigo-100" :
                                                                order.status === 'CANCELLED' ? "bg-rose-50 text-rose-700 border border-rose-100" :
                                                                "bg-slate-100 text-slate-600"
                                                            )}>
                                                                <div className={cn("h-1 w-1 rounded-full", order.status === 'PROCESSING' ? "bg-indigo-600 animate-pulse" : order.status === 'COMPLETED' ? "bg-emerald-600" : "bg-slate-400")}></div>
                                                                {order.status}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-5 text-right">
                                                            <Button 
                                                                variant="ghost" 
                                                                size="icon" 
                                                                className={cn(
                                                                    "h-9 w-9 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 transition-all",
                                                                    expandedId === order.id && "bg-white text-indigo-600 rotate-180 shadow-sm border-slate-100"
                                                                )}
                                                            >
                                                                <ChevronDown className="h-4 w-4" />
                                                            </Button>
                                                        </td>
                                                    </tr>

                                                    {/* Expanded Panel */}
                                                    {expandedId === order.id && (
                                                        <tr className="bg-slate-50/40">
                                                            <td colSpan={6} className="px-8 py-8 border-b border-slate-100">
                                                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                                                    {/* Management Column */}
                                                                    <div className="space-y-4">
                                                                        <div className="flex items-center gap-2.5">
                                                                            <div className="h-7 w-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                                                                <Edit2 className="h-3.5 w-3.5" />
                                                                            </div>
                                                                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Execution Controls</h4>
                                                                        </div>
                                                                        <div className="space-y-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                                                            <div className="space-y-2">
                                                                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Workflow Status</label>
                                                                                <select 
                                                                                    className="w-full h-11 px-4 rounded-lg bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/10 cursor-pointer appearance-none"
                                                                                    value={selectedStatus}
                                                                                    onChange={e => setSelectedStatus(e.target.value)}
                                                                                >
                                                                                    <option value="PENDING">Pending Approval</option>
                                                                                    <option value="PROCESSING">In Processing</option>
                                                                                    <option value="COMPLETED">Fulfillment Done</option>
                                                                                    <option value="CANCELLED">Void Transaction</option>
                                                                                </select>
                                                                            </div>
                                                                            <div className="space-y-2">
                                                                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Administrative Notes</label>
                                                                                <textarea 
                                                                                    className="w-full h-24 p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500/10 resize-none placeholder:text-slate-400"
                                                                                    placeholder="Enter internal updates or client notes..."
                                                                                    value={newNote}
                                                                                    onChange={e => setNewNote(e.target.value)}
                                                                                />
                                                                            </div>
                                                                            <Button 
                                                                                className="w-full h-11 rounded-lg font-bold text-xs bg-slate-900 text-black hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 uppercase tracking-widest"
                                                                                onClick={() => handleUpdateStatus(order.id)}
                                                                            >
                                                                                Update Transaction
                                                                            </Button>
                                                                        </div>
                                                                    </div>

                                                                    {/* Service Details Column */}
                                                                    <div className="space-y-4">
                                                                        <div className="flex items-center gap-2.5">
                                                                            <div className="h-7 w-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                                                                <FileText className="h-3.5 w-3.5" />
                                                                            </div>
                                                                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Service Details</h4>
                                                                        </div>
                                                                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-[300px] overflow-y-auto custom-scrollbar flex flex-col">
                                                                            {(() => {
                                                                                const item = order.items[0];
                                                                                const badge = getPlanBadge(item?.planType || '');
                                                                                const isItr = isItrService(item?.serviceName || '');
                                                                                const formSubmitted = ['UNDER_REVIEW', 'PROCESSING', 'COMPLETED'].includes(order.status);
                                                                                return (
                                                                                    <div className="p-5 flex flex-col gap-5 flex-1">
                                                                                        {/* Service + Plan */}
                                                                                        <div className="space-y-3">
                                                                                            <div className="flex flex-col gap-1.5">
                                                                                                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Service</span>
                                                                                                <p className="text-sm font-bold text-slate-800">{item?.serviceName || 'N/A'}</p>
                                                                                            </div>
                                                                                            <div className="flex items-center gap-2">
                                                                                                <span className={cn('inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border', badge.cls)}>
                                                                                                    <Layers className="h-2.5 w-2.5" /> {badge.label} Plan
                                                                                                </span>
                                                                                                {formSubmitted && isItr && (
                                                                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold uppercase tracking-wider">
                                                                                                        <BadgeCheck className="h-3 w-3" /> Form Submitted
                                                                                                    </span>
                                                                                                )}
                                                                                            </div>
                                                                                        </div>
                                                                                        {/* Client contact */}
                                                                                        <div className="grid grid-cols-1 gap-3 border-t border-slate-50 pt-4">
                                                                                            {[
                                                                                                { label: 'Client Name',   val: displayName },
                                                                                                { label: 'Email',         val: displayEmail },
                                                                                                { label: 'Phone',         val: order.user?.phone || parsedNotes?.mobileNo || '—' },
                                                                                                { label: 'Order Amount',  val: `₹${order.totalAmount.toLocaleString('en-IN')}` },
                                                                                            ].map(({ label, val }) => (
                                                                                                <div key={label} className="flex flex-col border-b border-slate-50 pb-2.5 last:border-0">
                                                                                                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{label}</span>
                                                                                                    <span className="text-[12px] font-semibold text-slate-700">{val || '—'}</span>
                                                                                                </div>
                                                                                            ))}
                                                                                        </div>
                                                                                        {/* ITR form link */}
                                                                                        {isItr && (
                                                                                            <button
                                                                                                onClick={() => navigate('/admin/itr')}
                                                                                                className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-indigo-700 transition-colors"
                                                                                            >
                                                                                                <FileText className="h-3.5 w-3.5" />
                                                                                                View ITR Form Details
                                                                                                <ArrowUpRight className="h-3.5 w-3.5" />
                                                                                            </button>
                                                                                        )}
                                                                                    </div>
                                                                                );
                                                                            })()}
                                                                        </div>
                                                                    </div>

                                                                    {/* Documents Column */}
                                                                    <div className="space-y-4">
                                                                        <div className="flex items-center gap-2.5">
                                                                            <div className="h-7 w-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                                                                <Package className="h-3.5 w-3.5" />
                                                                            </div>
                                                                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Asset Repository</h4>
                                                                        </div>
                                                                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-[300px] overflow-y-auto custom-scrollbar">
                                                                            {order.documents && order.documents.length > 0 ? (
                                                                                <div className="p-4 space-y-2">
                                                                                    {order.documents.map((doc: any) => {
                                                                                        const typeLabel = doc.documentType || doc.fileName || 'Document';
                                                                                        const emoji = DOC_TYPE_ICON[typeLabel] || '';
                                                                                        const isKyc = doc.fileType === 'KYC';
                                                                                        const isAtt = doc.fileType === 'ATTACHMENT';
                                                                                        return (
                                                                                            <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl group/doc hover:bg-white hover:shadow-md transition-all border border-slate-100 hover:border-indigo-100">
                                                                                                <div className="flex items-center gap-3 min-w-0">
                                                                                                    <div className={cn('h-9 w-9 rounded-xl flex items-center justify-center text-sm shadow-sm border shrink-0',
                                                                                                        isKyc ? 'bg-orange-50 border-orange-100 text-orange-600' :
                                                                                                        isAtt ? 'bg-teal-50 border-teal-100 text-teal-600' :
                                                                                                        'bg-white border-slate-100 text-slate-400'
                                                                                                    )}>
                                                                                                        {emoji || <FileText className="h-4 w-4" />}
                                                                                                    </div>
                                                                                                    <div className="min-w-0">
                                                                                                        <p className="text-[11px] font-bold text-slate-700 truncate">{typeLabel}</p>
                                                                                                        <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                                                                                                            {isKyc ? 'KYC Document' : isAtt ? 'Attachment' : 'File'}
                                                                                                        </p>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <a
                                                                                                    href={`${API_BASE_URL}/files/${(doc.filePath || '').replace(/^\//, '')}`}
                                                                                                    target="_blank"
                                                                                                    rel="noreferrer"
                                                                                                    className="h-8 w-8 rounded-lg bg-white flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:shadow-md border border-slate-100 transition-all shrink-0"
                                                                                                >
                                                                                                    <ExternalLink className="h-3.5 w-3.5" />
                                                                                                </a>
                                                                                            </div>
                                                                                        );
                                                                                    })}
                                                                                </div>
                                                                            ) : (
                                                                                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                                                                                    <XCircle className="h-8 w-8 mb-3 text-slate-300" />
                                                                                    <p className="text-[10px] font-bold uppercase tracking-widest">No documents uploaded</p>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </React.Fragment>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
};

interface StatCardProps {
    title: string;
    value: string;
    icon: any;
    status?: "default" | "success" | "warning" | "info";
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, status = "default" }) => {
    return (
        <Card className="rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 group">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className={cn(
                        "p-2.5 rounded-lg transition-colors duration-300",
                        status === "default" && "bg-slate-50 text-slate-600",
                        status === "success" && "bg-emerald-50 text-emerald-700",
                        status === "warning" && "bg-amber-50 text-amber-700",
                        status === "info" && "bg-indigo-50 text-indigo-700"
                    )}>
                        <Icon className="h-5 w-5" />
                    </div>
                </div>
                <div className="space-y-1">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{title}</p>
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
                </div>
            </CardContent>
        </Card>
    );
};