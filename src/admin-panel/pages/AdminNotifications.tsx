import React, { useState, useEffect } from 'react';
import { Bell, Send, AlertTriangle, MessageSquare, CheckCircle, Search, Users, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { toast } from 'sonner';

interface Notification {
    id: number;
    userId: number;
    message: string;
    type: 'DEADLINE' | 'PAYMENT' | 'GENERAL';
    isRead: boolean;
    createdAt: string;
    user?: { name: string; email: string };
}

export function AdminNotifications() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState<any[]>([]);

    // Compose State
    const [formData, setFormData] = useState({
        userId: 'all', // "all" for broadcast
        message: '',
        type: 'GENERAL',
    });

    const fetchClients = async () => {
        try {
            const res = await api.get('/admin/users');
            setClients(res.data.users || []);
        } catch (err: any) {
            console.error('Failed to fetch clients');
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleSendNotification = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (formData.userId === 'all') {
                const res = await api.post('/notifications/admin/broadcast', {
                    message: formData.message,
                    type: formData.type,
                });
                toast.success(res.data.message || 'Broadcast sent to all users');
            } else {
                await api.post('/notifications/admin/create', {
                    userId: parseInt(formData.userId),
                    message: formData.message,
                    type: formData.type,
                });
                toast.success('Notification sent to user');
            }
            setFormData({ ...formData, message: '' });
        } catch (err: any) {
            toast.error(err.response?.data?.error || 'Failed to send notification');
        } finally {
            setLoading(false);
        }
    };

    const handleTriggerAlerts = async () => {
        try {
            const res = await api.post('/notifications/admin/trigger-alerts');
            if (res.data.count === 0) {
                toast.info('No urgent tasks due within 24h');
            } else {
                toast.success(res.data.message || 'Deadline alerts fired!');
            }
        } catch (err: any) {
            toast.error(err.response?.data?.error || 'Failed to trigger alerts');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 lg:p-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Communication Hub</h1>
                    <p className="text-slate-500 mt-1">Manage system-wide alerts, broadcast updates, and automated reminders.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleTriggerAlerts}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-rose-200 text-rose-600 rounded-xl font-semibold text-sm hover:bg-rose-50 transition-all shadow-sm active:scale-95"
                    >
                        <Bell className="w-4 h-4" />
                        Trigger 24h Alerts
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Main Compose Panel */}
                <div className="lg:col-span-7 xl:col-span-8">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
                            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                                <div className="p-1.5 bg-indigo-50 rounded-lg">
                                    <Send className="w-4 h-4 text-indigo-600" />
                                </div>
                                Compose New Broadcast
                            </h3>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                                Internal System
                            </span>
                        </div>

                        <form onSubmit={handleSendNotification} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Recipient Selection */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                        <Users className="w-4 h-4 text-slate-400" />
                                        Recipient Target
                                    </label>
                                    <select
                                        className="w-full h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1rem' }}
                                        value={formData.userId}
                                        onChange={e => setFormData({ ...formData, userId: e.target.value })}
                                    >
                                        <option value="all">Global Broadcast (All Clients)</option>
                                        <optgroup label="Individual Clients">
                                            {clients.map(c => (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            ))}
                                        </optgroup>
                                    </select>
                                </div>

                                {/* Alert Type Selection */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4 text-slate-400" />
                                        Message Severity
                                    </label>
                                    <select
                                        className="w-full h-11 px-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1rem' }}
                                        value={formData.type}
                                        onChange={e => setFormData({ ...formData, type: e.target.value })}
                                    >
                                        <option value="GENERAL">Standard Notice</option>
                                        <option value="DEADLINE">High Priority Deadline</option>
                                        <option value="PAYMENT">Financial Remittance</option>
                                    </select>
                                </div>
                            </div>

                            {/* Message Content */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Message Content</label>
                                <textarea
                                    required
                                    rows={5}
                                    placeholder="Enter your system notification here. Be clear and professional..."
                                    className="w-full p-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none"
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                                <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium px-1">
                                    <span>Supports plain text messaging</span>
                                    <span>{formData.message.length} characters</span>
                                </div>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={loading || !formData.message}
                                    className="w-full h-12 bg-[#0F172A] text-black rounded-xl font-bold text-sm shadow-lg shadow-slate-200 hover:bg-slate-800 hover:translate-y-[-1px] active:translate-y-[0px] transition-all disabled:opacity-50 disabled:hover:translate-y-0 flex justify-center items-center gap-2"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Dispatch {formData.userId === 'all' ? 'System Broadcast' : 'Direct Notification'}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Sidebar Info/Status */}
                <div className="lg:col-span-5 xl:col-span-4 space-y-6">
                    {/* Visual Guidelines */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/30">
                            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                                <MessageSquare className="w-4 h-4 text-indigo-600" />
                                Alert Protocols
                            </h3>
                        </div>
                        <div className="p-6 space-y-5">
                            <div className="flex gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center shrink-0 border border-rose-100 group-hover:scale-110 transition-transform">
                                    <AlertTriangle className="w-5 h-5 text-rose-600" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-bold text-slate-900">Deadline Alerts</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed">Urgent compliance alerts (DSC, ROC, Tax filings). These trigger high-visibility system flags for clients.</p>
                                </div>
                            </div>

                            <div className="flex gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100 group-hover:scale-110 transition-transform">
                                    <MessageSquare className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-bold text-slate-900">General Notices</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed">System updates, policy changes, or firm announcements. Displayed in standard dashboard feed.</p>
                                </div>
                            </div>

                            <div className="flex gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100 group-hover:scale-110 transition-transform">
                                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-bold text-slate-900">Financial Remittance</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed">Professional reminders for outstanding invoices or advance tax payments due for reconciliation.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats/Info */}
                    <div className="bg-[#0F172A] rounded-2xl p-6 text-black shadow-xl shadow-slate-200 relative overflow-hidden">
                        <div className="relative z-10">
                            <h4 className="text-indigo-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Automated Engine</h4>
                            <h3 className="text-lg font-bold mb-4">Smart Task Monitoring</h3>
                            <p className="text-slate-400 text-xs leading-relaxed mb-6">
                                The system automatically monitors all active tasks. Clicking "Trigger 24h Alerts" will identify tasks due within the next business day and dispatch reminders to assigned clients.
                            </p>
                            <div className="flex items-center gap-2 text-[11px] font-medium text-slate-300 bg-white/5 border border-white/10 w-fit px-3 py-1.5 rounded-lg">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                System Status: Monitoring Active
                            </div>
                        </div>
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
                    </div>
                </div>
            </div>
        </div>
    );
}











