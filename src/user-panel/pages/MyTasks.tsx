import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, Calendar, AlertCircle, ArrowLeft, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';

interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
    type: string;
    priority: string;
    assignedTo?: { name: string; role: string };
}

export function MyTasks() {
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const res = await api.get('/tasks/my-tasks');
            setTasks(res.data.tasks || []);
        } catch (err: any) {
            toast.error(err.response?.data?.error || 'Failed to fetch tasks');
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
            fetchTasks();
        }
    }, [user]);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'COMPLETED': return <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border-green-200 border">COMPLETED</span>;
            case 'IN_PROGRESS': return <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border-blue-200 border">IN PROGRESS</span>;
            default: return <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border-orange-200 border">PENDING</span>;
        }
    };

    if (authLoading || (loading && user)) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <Loader className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Loading your tasks...</p>
            </div>
        </div>
    );

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8 flex items-center gap-4">
                <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">My Compliance Tasks</h1>
                    <p className="text-neutral-500 text-sm mt-1">Track pending filings, requests, and updates handled by your CA.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.map(task => (
                    <div key={task.id} className="bg-white rounded-xl p-5 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow relative">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-xs font-bold tracking-wide text-[#1e40af] uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{task.type}</span>
                            {getStatusBadge(task.status)}
                        </div>

                        <h3 className="font-bold text-lg text-neutral-900 mb-2">{task.title}</h3>
                        <p className="text-sm text-neutral-600 line-clamp-2 mb-4 h-10">{task.description}</p>

                        <div className="space-y-3 pt-4 border-t border-neutral-100">
                            <div className="flex items-center text-sm text-neutral-700 font-medium">
                                <Calendar className="w-4 h-4 mr-2 text-neutral-400" />
                                Due: <span className="ml-1 text-red-600">{task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-GB') : 'No deadline'}</span>
                            </div>
                            <div className="flex items-center text-sm text-neutral-700">
                                <CheckCircle className="w-4 h-4 mr-2 text-neutral-400" />
                                Assigned CA: {task.assignedTo ? task.assignedTo.name : 'Unassigned'}
                            </div>
                        </div>
                    </div>
                ))}
                {tasks.length === 0 && (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 bg-neutral-50 rounded-xl border-2 border-dashed border-neutral-200">
                        <Clock className="mx-auto h-12 w-12 text-neutral-300 mb-3" />
                        <h3 className="text-lg font-medium text-neutral-900">No active tasks</h3>
                        <p className="text-neutral-500 text-sm mt-1">You're all caught up with your compliances.</p>
                    </div>
                )}
            </div>
        </div>
    );
}









