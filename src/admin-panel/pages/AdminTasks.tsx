import React, { useState, useEffect } from 'react';
import { TaskBoard } from '../components/tasks/TaskBoard';
import { KeyboardShortcuts } from '../components/tasks/KeyboardShortcuts';
import { Task, TaskStatus } from '../components/tasks/types';
import { toast } from 'sonner';
import api from '../../utils/api';
import { Zap, Plus, X } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';

export const AdminTasks: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [clients, setClients] = useState<any[]>([]);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        clientId: '',
        type: 'GENERAL',
        priority: 'MEDIUM',
        dueDate: ''
    });

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await api.get('/tasks/admin');
            // Normalize status mapping if needed
            const normalizedTasks = (response.data.tasks || []).map((t: any) => ({
                ...t,
                status: t.status === 'PENDING' ? 'TODO' : t.status === 'IN_PROGRESS' ? 'IN_PROGRESS' : t.status
            }));
            setTasks(normalizedTasks);
        } catch (err) {
            console.error('Task fetch error:', err);
            toast.error('Workflow synchronization failed');
        } finally {
            setLoading(false);
        }
    };

    const fetchClients = async () => {
        try {
            const res = await api.get('/admin/users');
            setClients(res.data.users || []);
        } catch (err: any) {
            console.error('Failed to fetch clients');
        }
    };

    useEffect(() => {
        fetchTasks();
        fetchClients();
    }, []);

    const handleTaskMove = async (taskId: string | number, newStatus: TaskStatus) => {
        try {
            // Map back to backend status if necessary
            const backendStatus = newStatus === 'TODO' ? 'PENDING' : newStatus === 'IN_PROGRESS' ? 'IN_PROGRESS' : newStatus;
            await api.put(`/tasks/admin/${taskId}`, { status: backendStatus });
            toast.success('Task status updated');
        } catch (err) {
            toast.error('Failed to update task status');
            fetchTasks(); // Revert on failure
        }
    };

    const handleTaskUpdate = async (updatedTask: Task) => {
        try {
            await api.put(`/tasks/admin/${updatedTask.id}`, updatedTask);
            setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
            toast.success('Record updated successfully');
        } catch (err) {
            toast.error('Update synchronization failed');
        }
    };

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/tasks/admin', {
                ...formData,
                clientId: parseInt(formData.clientId)
            });
            toast.success('Task created successfully');
            setShowModal(false);
            setFormData({ title: '', description: '', clientId: '', type: 'GENERAL', priority: 'MEDIUM', dueDate: '' });
            fetchTasks();
        } catch (err: any) {
            toast.error(err.response?.data?.error || 'Failed to create task');
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center font-outfit">
                    <div className="flex flex-col items-center gap-6">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-indigo-500/10 border-t-indigo-600 rounded-full animate-spin"></div>
                            <Zap className="w-6 h-6 text-indigo-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                        </div>
                        <div className="text-center space-y-1">
                            <p className="text-[#0F172A] font-bold text-sm uppercase tracking-[0.2em]">Synchronizing Workflow</p>
                            <p className="text-slate-400 text-[10px] font-medium uppercase tracking-widest">Accessing Secure Task Registry...</p>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="min-h-screen bg-[#F8FAFC] overflow-hidden">
                <KeyboardShortcuts 
                    onRefresh={fetchTasks}
                    onSearch={() => document.querySelector('input')?.focus()}
                    onNewTask={() => setShowModal(true)}
                    onEsc={() => setShowModal(false)}
                />
                
                <TaskBoard 
                    initialTasks={tasks} 
                    onTaskMove={handleTaskMove}
                    onTaskUpdate={handleTaskUpdate}
                />

                {/* Modal - Modern Enterprise Style */}
                {showModal && (
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200 font-outfit">
                        <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200/60">
                            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <div className="space-y-1">
                                    <h2 className="font-bold text-xl text-[#0F172A] tracking-tight">Create New Task</h2>
                                    <p className="text-xs font-medium text-slate-500">Initialize a new administrative workflow record</p>
                                </div>
                                <button 
                                    onClick={() => setShowModal(false)} 
                                    className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm text-slate-400 hover:text-rose-500 transition-all border border-transparent hover:border-slate-100"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            
                            <form onSubmit={handleCreateTask} className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Task Identification</label>
                                    <input 
                                        required 
                                        type="text" 
                                        className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-[#0F172A] focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all" 
                                        value={formData.title} 
                                        onChange={e => setFormData({ ...formData, title: e.target.value })} 
                                        placeholder="e.g. GST Compliance Audit - Q1 2026" 
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Target Entity / Client</label>
                                    <select 
                                        required 
                                        className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-[#0F172A] focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all appearance-none" 
                                        value={formData.clientId} 
                                        onChange={e => setFormData({ ...formData, clientId: e.target.value })}
                                    >
                                        <option value="">Select a verified entity...</option>
                                        {clients.map(c => <option key={c.id} value={c.id}>{c.name} ({c.email})</option>)}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Category</label>
                                        <select 
                                            className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-[#0F172A] focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all" 
                                            value={formData.type} 
                                            onChange={e => setFormData({ ...formData, type: e.target.value })}
                                        >
                                            <option value="GENERAL">General</option>
                                            <option value="GST">GST Compliance</option>
                                            <option value="ITR">Income Tax</option>
                                            <option value="ROC">ROC / MCA</option>
                                            <option value="AUDIT">Audit & Assurance</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Priority</label>
                                        <select 
                                            className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-[#0F172A] focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all" 
                                            value={formData.priority} 
                                            onChange={e => setFormData({ ...formData, priority: e.target.value })}
                                        >
                                            <option value="LOW">Low</option>
                                            <option value="MEDIUM">Medium</option>
                                            <option value="HIGH">High</option>
                                            <option value="URGENT">Urgent</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Due Date Protocol</label>
                                    <input 
                                        type="date" 
                                        className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-[#0F172A] focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all" 
                                        value={formData.dueDate} 
                                        onChange={e => setFormData({ ...formData, dueDate: e.target.value })} 
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Intelligence / Instructions</label>
                                    <textarea 
                                        rows={3} 
                                        className="w-full p-4 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-[#0F172A] focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all resize-none" 
                                        value={formData.description} 
                                        onChange={e => setFormData({ ...formData, description: e.target.value })} 
                                        placeholder="Enter detailed task instructions..."
                                    ></textarea>
                                </div>

                                <div className="pt-4 flex justify-end gap-3">
                                    <button 
                                        type="button" 
                                        onClick={() => setShowModal(false)} 
                                        className="h-12 px-6 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
                                    >
                                        Discard
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="h-12 px-8 text-xs font-bold uppercase tracking-widest text-white bg-[#0F172A] hover:bg-slate-800 rounded-xl shadow-xl shadow-slate-200 transition-all active:scale-95"
                                    >
                                        Initialize Task
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};
