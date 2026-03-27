import React, { useState, useEffect } from 'react';
import { Bell, Check, Trash2, AlertTriangle, MessageSquare, CheckCircle, ArrowLeft, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';

interface Notification {
    id: number;
    message: string;
    type: 'DEADLINE' | 'PAYMENT' | 'GENERAL';
    isRead: boolean;
    createdAt: string;
}

export function MyNotifications() {
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {
        try {
            const res = await api.get('/notifications/my');
            setNotifications(res.data.notifications || []);
        } catch (err: any) {
            toast.error('Failed to fetch notifications');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
        }
    }, [user, authLoading, navigate]);

    useEffect(() => {
        if (user) {
            fetchNotifications();
        }
    }, [user]);

    const markAsRead = async (id: number) => {
        try {
            await api.put(`/notifications/my/${id}/read`);
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
        } catch {
            toast.error('Failed to mark read');
        }
    };

    const markAllAsRead = async () => {
        try {
            await api.put('/notifications/my/read-all');
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
            toast.success('All marked as read');
        } catch {
            toast.error('Failed to mark all read');
        }
    };

    const deleteNotification = async (id: number) => {
        try {
            await api.delete(`/notifications/my/${id}`);
            setNotifications(prev => prev.filter(n => n.id !== id));
            toast.success('Notification removed');
        } catch {
            toast.error('Failed to delete');
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'DEADLINE': return <AlertTriangle className="w-5 h-5 text-red-500" />;
            case 'PAYMENT': return <CheckCircle className="w-5 h-5 text-green-500" />;
            default: return <MessageSquare className="w-5 h-5 text-blue-500" />;
        }
    };

    const getBorderColor = (type: string) => {
        switch (type) {
            case 'DEADLINE': return 'border-l-red-500';
            case 'PAYMENT': return 'border-l-green-500';
            default: return 'border-l-blue-500';
        }
    };

    if (authLoading || (loading && user)) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <Loader className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Loading alerts...</p>
            </div>
        </div>
    );

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-lg transition self-start mt-1">
                        <ArrowLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-3 rounded-full relative">
                            <Bell className="w-6 h-6 text-blue-600" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-black text-[10px] w-5 h-5 rounded-full flex justify-center items-center font-bold border-2 border-white">
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-neutral-900">Notifications</h1>
                            <p className="text-neutral-500 text-sm mt-1">Updates and alerts from CA Avinash Team</p>
                        </div>
                    </div>
                </div>

                {unreadCount > 0 && (
                    <button
                        onClick={markAllAsRead}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2"
                    >
                        <Check className="w-4 h-4" />
                        Mark all read
                    </button>
                )}
            </div>

            <div className="space-y-4">
                {notifications.map(notif => (
                    <div
                        key={notif.id}
                        className={`flex items-start bg-white p-5 rounded-xl border border-neutral-200 shadow-sm transition-all hover:shadow-md border-l-4 ${getBorderColor(notif.type)} ${!notif.isRead ? 'bg-blue-50/30' : ''}`}
                    >
                        <div className="mt-1 mr-4 shrink-0 bg-neutral-100 p-2 rounded-full">
                            {getIcon(notif.type)}
                        </div>

                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className={`font-medium ${!notif.isRead ? 'text-neutral-900 font-bold' : 'text-neutral-700'}`}>
                                    {notif.type === 'DEADLINE' ? 'Upcoming Deadline' : notif.type === 'PAYMENT' ? 'Payment Reminder' : 'General Update'}
                                </h4>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-neutral-400 font-medium">
                                        {new Date(notif.createdAt).toLocaleDateString()}
                                    </span>
                                    {!notif.isRead && (
                                        <button
                                            onClick={() => markAsRead(notif.id)}
                                            title="Mark as read"
                                            className="text-blue-600 hover:text-blue-800 transition"
                                        >
                                            <Check className="w-4 h-4" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteNotification(notif.id)}
                                        title="Delete"
                                        className="text-neutral-400 hover:text-red-500 transition"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <p className={`text-sm ${!notif.isRead ? 'text-neutral-800' : 'text-neutral-500'}`}>
                                {notif.message}
                            </p>
                        </div>
                    </div>
                ))}
                {notifications.length === 0 && (
                    <div className="text-center py-16 bg-neutral-50 rounded-xl border-2 border-dashed border-neutral-200">
                        <Bell className="mx-auto h-12 w-12 text-neutral-300 mb-4" />
                        <h3 className="text-lg font-medium text-neutral-900">No notifications</h3>
                        <p className="text-neutral-500 text-sm mt-1">You're all caught up!</p>
                    </div>
                )}
            </div>
        </div>
    );
}









