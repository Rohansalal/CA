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

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'DEADLINE': return <AlertTriangle className="w-5 h-5 text-red-500" />;
            case 'PAYMENT': return <CheckCircle className="w-5 h-5 text-green-500" />;
            default: return <MessageSquare className="w-5 h-5 text-blue-500" />;
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Communication Hub</h1>
                    <p className="text-neutral-500 text-sm mt-1">Send alerts, reminders, and broadcast updates</p>
                </div>
                <button
                    onClick={handleTriggerAlerts}
                    className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold border border-red-200 hover:bg-red-100 transition-colors flex items-center gap-2 shadow-sm"
                >
                    <Bell className="w-5 h-5" />
                    Trigger Auto 24h Alerts
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Compose Panel */}
                <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                    <h3 className="text-lg font-bold text-neutral-800 mb-6 flex items-center gap-2">
                        <Send className="w-5 h-5 text-[#1e40af]" />
                        Compose Notification
                    </h3>

                    <form onSubmit={handleSendNotification} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-neutral-700 mb-2">Recipient</label>
                            <select
                                className="w-full p-3 border border-neutral-200 rounded-lg text-sm bg-neutral-50 outline-none focus:ring-2 focus:ring-blue-100 transition shadow-sm"
                                value={formData.userId}
                                onChange={e => setFormData({ ...formData, userId: e.target.value })}
                            >
                                <option value="all">📢 Broadcast to All Users</option>
                                <optgroup label="Individual Clients">
                                    {clients.map(c => (
                                        <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
                                    ))}
                                </optgroup>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-neutral-700 mb-2">Notice Type</label>
                                <select
                                    className="w-full p-3 border border-neutral-200 rounded-lg text-sm bg-neutral-50 outline-none focus:ring-2 focus:ring-blue-100 shadow-sm"
                                    value={formData.type}
                                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <option value="GENERAL">General Notice</option>
                                    <option value="DEADLINE">Deadline Alert (Red)</option>
                                    <option value="PAYMENT">Payment Reminder (Green)</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-neutral-700 mb-2">Message Content</label>
                            <textarea
                                required
                                rows={4}
                                placeholder="Type your alert message here..."
                                className="w-full p-3 border border-neutral-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100 transition shadow-sm"
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1e40af] text-white py-3 rounded-lg text-sm font-bold shadow hover:bg-blue-800 transition disabled:opacity-50 flex justify-center items-center gap-2"
                        >
                            {loading ? 'Sending...' : (
                                <>
                                    <Send className="w-4 h-4" />
                                    Send {formData.userId === 'all' ? 'Broadcast' : 'Alert'}
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Guidelines / Tips Panel */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 shadow-sm">
                        <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                            <Users className="w-5 h-5 text-blue-600" />
                            Guidelines & Tips
                        </h3>

                        <ul className="space-y-4">
                            <li className="flex gap-3 text-sm text-blue-800">
                                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                                <div>
                                    <strong>Deadline Alerts:</strong> Urgent action required. Appears with high visibility warning styling. Use for expiring DSC, ROC filing dates, etc.
                                </div>
                            </li>
                            <li className="flex gap-3 text-sm text-blue-800">
                                <MessageSquare className="w-5 h-5 text-blue-500 shrink-0" />
                                <div>
                                    <strong>General Broadcasts:</strong> General updates for all clients. Office closure, new GST rules, Budget 2026 highlights.
                                </div>
                            </li>
                            <li className="flex gap-3 text-sm text-blue-800">
                                <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                                <div>
                                    <strong>Payment Reminders:</strong> Friendly nudge for unpaid invoices or advance tax dues.
                                </div>
                            </li>
                            <li className="flex gap-3 mt-6 pt-4 border-t border-blue-200">
                                <Bell className="w-5 h-5 text-neutral-600 shrink-0 animate-bounce" />
                                <div className="text-neutral-700 text-sm">
                                    <strong>Auto 24h Alerts Button:</strong> Clicking this scans the `Tasks` table and automatically sends a notification to any client whose task is due tomorrow and not marked COMPLETED.
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}











