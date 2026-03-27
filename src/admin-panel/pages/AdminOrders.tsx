import React, { useState, useEffect } from 'react';
import { PackageSearch, Search, AlertCircle, FileText, ExternalLink, Calendar, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

export function AdminOrders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [newNote, setNewNote] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    const fetchOrders = async () => {
        try {
            const res = await api.get('/admin/orders');
            setOrders(res.data.orders || []);
        } catch (err: any) {
            toast.error(err.response?.data?.error || 'Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleUpdateStatus = async (orderId: number) => {
        if (!selectedStatus && !newNote) return;

        try {
            await api.put(`/admin/orders/${orderId}`, {
                status: selectedStatus || undefined,
                notes: newNote || undefined,
            });
            toast.success('Order updated');
            setExpandedId(null);
            setNewNote('');
            setSelectedStatus('');
            fetchOrders();
        } catch (err: any) {
            toast.error('Failed to update order');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'COMPLETED': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'PROCESSING': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-neutral-100 text-neutral-800 border-neutral-200';
        }
    };

    const filteredOrders = orders.filter(o =>
        o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="p-8 text-center text-neutral-500">Loading orders...</div>;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Order Management</h1>
                    <p className="text-neutral-500 text-sm mt-1">Process client service requests</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                        type="text"
                        placeholder="Search orders, clients..."
                        className="pl-10 pr-4 py-2 border border-neutral-200 rounded-lg text-sm w-64 focus:ring-2 focus:ring-[#1e40af] outline-none"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left font-inter">
                        <thead className="bg-neutral-50 text-xs text-neutral-500 uppercase font-semibold border-b border-neutral-200">
                            <tr>
                                <th className="px-6 py-4">Order Details</th>
                                <th className="px-6 py-4">Client</th>
                                <th className="px-6 py-4">Service</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {filteredOrders.map(order => {
                                let parsedNotes: any = null;
                                try {
                                    if (order.notes) parsedNotes = JSON.parse(order.notes);
                                } catch (e) {
                                    // Not json
                                }

                                const displayName = parsedNotes?.fullName || order.user.name;
                                const displayEmail = parsedNotes?.emailId || order.user.email;
                                const displayPhone = parsedNotes?.mobileNo || order.user.phone || 'N/A';

                                return (
                                <React.Fragment key={order.id}>
                                    <tr className="hover:bg-neutral-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-neutral-900 text-sm">{order.orderNumber}</div>
                                            <div className="text-xs text-neutral-500 mt-1 flex items-center">
                                                <Calendar className="w-3 h-3 mr-1" />
                                                {new Date(order.createdAt).toLocaleDateString('en-GB')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-neutral-800 text-sm">{displayName}</div>
                                            <div className="text-xs text-neutral-500">{displayEmail}</div>
                                            <div className="text-xs text-neutral-500">{displayPhone}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-neutral-700">
                                            <div className="flex flex-col">
                                                <span>{order.items.length > 0 ? order.items[0].serviceName || 'Service Package' : 'Unknown Service'}</span>
                                                {order.items.length > 0 && order.items[0].quantity > 1 && (
                                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-0.5">
                                                        Quantity: {order.items[0].quantity}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-neutral-800 text-sm">
                                            <div className="flex flex-col">
                                                <span>₹{order.totalAmount}</span>
                                                {order.items.length > 0 && order.items[0].quantity > 1 && (
                                                    <span className="text-[9px] font-bold text-neutral-400 italic mt-0.5">
                                                        ₹{(order.totalAmount / order.items[0].quantity).toLocaleString()} / unit
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded border uppercase tracking-wider ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => {
                                                    setExpandedId(expandedId === order.id ? null : order.id);
                                                    setNewNote('');
                                                    setSelectedStatus(order.status);
                                                }}
                                                className="text-sm font-medium text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded bg-blue-50 transition-colors"
                                            >
                                                {expandedId === order.id ? 'Close' : 'Manage'}
                                            </button>
                                        </td>
                                    </tr>

                                    {/* Expanded Audit Trail / Management row */}
                                    {expandedId === order.id && (
                                        <tr className="bg-slate-50 border-b-2 border-[#1e40af]">
                                            <td colSpan={6} className="px-6 py-6">
                                                <div className="flex gap-8">
                                                    {/* Updates Panel */}
                                                    <div className="flex-1 bg-white p-4 rounded-lg border border-neutral-200">
                                                        <h4 className="text-sm font-bold text-neutral-800 mb-3 flex items-center gap-2">
                                                            <CheckCircle2 className="w-4 h-4 text-[#1e40af]" />
                                                            Update Order
                                                        </h4>
                                                        <div className="space-y-4">
                                                            <div>
                                                                <label className="block text-xs font-semibold text-neutral-600 mb-1">SET STATUS</label>
                                                                <select
                                                                    className="w-full text-sm rounded border-neutral-300 p-2 border outline-none focus:ring-2 focus:ring-blue-100"
                                                                    value={selectedStatus}
                                                                    onChange={e => setSelectedStatus(e.target.value)}
                                                                >
                                                                    <option value="PENDING">Pending (Awaiting Doc)</option>
                                                                    <option value="PROCESSING">Processing</option>
                                                                    <option value="COMPLETED">Completed</option>
                                                                    <option value="CANCELLED">Cancelled</option>
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-semibold text-neutral-600 mb-1">ADD ADMIN NOTE (Triggers Audit Trail)</label>
                                                                <textarea
                                                                    rows={2}
                                                                    className="w-full text-sm rounded border-neutral-300 border p-2 outline-none focus:ring-2 focus:ring-blue-100"
                                                                    placeholder="E.g. Verified documents. Moving to ROC filing."
                                                                    value={newNote}
                                                                    onChange={e => setNewNote(e.target.value)}
                                                                ></textarea>
                                                            </div>
                                                            <button
                                                                onClick={() => handleUpdateStatus(order.id)}
                                                                className="w-full bg-[#1e40af] text-black py-2 rounded text-sm font-semibold hover:bg-blue-800 transition shadow-sm"
                                                            >
                                                                Save Changes
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Audit Trail Panel */}
                                                    <div className="flex-[1.5]">
                                                        <h4 className="text-sm font-bold text-neutral-800 mb-3 flex items-center gap-2">
                                                            <FileText className="w-4 h-4 text-neutral-500" />
                                                            Client Notes & Audit Trail
                                                        </h4>
                                                        <div className="bg-white p-4 rounded-lg border border-neutral-200 h-48 overflow-y-auto">
                                                            {parsedNotes ? (
                                                                <div className="text-xs text-neutral-600 font-mono whitespace-pre-wrap leading-relaxed">
                                                                    <strong>Form Data:</strong>
                                                                    <pre>{JSON.stringify(parsedNotes, null, 2)}</pre>
                                                                </div>
                                                            ) : order.notes ? (
                                                                <pre className="text-xs text-neutral-600 font-mono whitespace-pre-wrap leading-relaxed">
                                                                    {order.notes}
                                                                </pre>
                                                            ) : (
                                                                <p className="text-sm text-neutral-400 italic text-center mt-12">No notes or audit logs yet.</p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Documents Panel */}
                                                    <div className="flex-[1]">
                                                        <h4 className="text-sm font-bold text-neutral-800 mb-3 flex items-center gap-2">
                                                            <FileText className="w-4 h-4 text-neutral-500" />
                                                            Uploaded Documents
                                                        </h4>
                                                        <div className="bg-white p-4 rounded-lg border border-neutral-200 h-48 overflow-y-auto">
                                                            {order.documents && order.documents.length > 0 ? (
                                                                <ul className="space-y-2">
                                                                    {order.documents.map((doc: any) => (
                                                                        <li key={doc.id} className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded">
                                                                            <span className="truncate">{doc.documentType || doc.fileName}</span>
                                                                            <a href={`${API_BASE_URL}/files/${doc.filePath.replace(/^\//, '')}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                                                                                View
                                                                            </a>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            ) : (
                                                                <p className="text-sm text-neutral-400 italic text-center mt-12">No documents uploaded.</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            )})}
                            {filteredOrders.length === 0 && !loading && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-neutral-500">
                                        <PackageSearch className="w-12 h-12 text-neutral-300 mb-3 mx-auto" />
                                        <p>No orders found comparing "{searchTerm}"</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}











