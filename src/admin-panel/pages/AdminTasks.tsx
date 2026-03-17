import React, { useState, useEffect } from 'react';
import { Settings, Plus, Calendar, Clock, AlertCircle, FileText, CheckCircle2, MoreVertical, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { toast } from 'sonner';

interface Task {
    id: number;
    title: string;
    description: string;
    clientId: number;
    assignedToId: number;
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
    type: string;
    dueDate: string;
    client?: { id: number; name: string; email: string };
    assignedTo?: { id: number; name: string; role: string };
}

export function AdminTasks() {
    const navigate = useNavigate();
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
            const res = await api.get('/tasks/admin');
            setTasks(res.data.tasks || []);
        } catch (err: any) {
            toast.error(err.response?.data?.error || 'Failed to fetch tasks');
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

    const updateTaskStatus = async (taskId: number, newStatus: string) => {
        try {
            await api.put(`/tasks/admin/${taskId}`, { status: newStatus });
            toast.success('Task updated');
            fetchTasks();
        } catch (err: any) {
            toast.error('Failed to update task');
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'URGENT': return 'bg-red-100 text-red-800 border-red-200';
            case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'MEDIUM': return 'bg-blue-100 text-blue-800 border-blue-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const renderColumn = (status: Task['status'], title: string) => {
        const columnTasks = tasks.filter(t => t.status === status);

        return (
            <div className="flex-1 min-w-[300px] bg-neutral-50 rounded-xl p-4 border border-neutral-200">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-neutral-800">{title}</h3>
                    <span className="bg-white text-neutral-500 text-xs px-2 py-1 rounded-full border border-neutral-200">
                        {columnTasks.length}
                    </span>
                </div>

                <div className="space-y-3">
                    {columnTasks.map(task => (
                        <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${getPriorityColor(task.priority)}`}>
                                    {task.priority}
                                </span>
                                <select
                                    className="text-xs border-none bg-transparent cursor-pointer text-neutral-500 hover:text-neutral-800 outline-none"
                                    value={task.status}
                                    onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                                >
                                    <option value="PENDING">Pending</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="COMPLETED">Completed</option>
                                </select>
                            </div>

                            <h4 className="font-medium text-sm text-neutral-900 mb-1">{task.title}</h4>
                            <p className="text-xs text-neutral-500 line-clamp-2 mb-3">{task.description}</p>

                            <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-neutral-100">
                                <div className="flex items-center text-xs text-neutral-600">
                                    <FileText className="w-3 h-3 mr-1" />
                                    {task.client?.name || 'Unknown Client'}
                                </div>
                                {task.dueDate && (
                                    <div className="flex items-center text-xs text-neutral-600">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {new Date(task.dueDate).toLocaleDateString('en-IN')}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {columnTasks.length === 0 && (
                        <div className="text-center py-6 text-sm text-neutral-400 border-2 border-dashed border-neutral-200 rounded-lg">
                            No tasks
                        </div>
                    )}
                </div>
            </div>
        );
    };

    if (loading) return <div className="p-8 text-center text-neutral-500">Loading tasks...</div>;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Task Management</h1>
                    <p className="text-neutral-500 text-sm mt-1">Track and manage client compliance tasks</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-[#1e40af] text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors flex items-center gap-2 text-sm"
                >
                    <Plus className="w-4 h-4" />
                    Create Task
                </button>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-4">
                {renderColumn('PENDING', 'Pending')}
                {renderColumn('IN_PROGRESS', 'In Progress')}
                {renderColumn('COMPLETED', 'Completed')}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="p-4 border-b border-neutral-100 flex justify-between items-center">
                            <h2 className="font-bold text-lg">Create New Task</h2>
                            <button onClick={() => setShowModal(false)} className="text-neutral-400 hover:text-neutral-600">&times;</button>
                        </div>
                        <form onSubmit={handleCreateTask} className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Title</label>
                                <input required type="text" className="w-full p-2 border border-neutral-200 rounded-lg text-sm" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. GST Return R1" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Client</label>
                                <select required className="w-full p-2 border border-neutral-200 rounded-lg text-sm" value={formData.clientId} onChange={e => setFormData({ ...formData, clientId: e.target.value })}>
                                    <option value="">Select Client...</option>
                                    {clients.map(c => <option key={c.id} value={c.id}>{c.name} ({c.email})</option>)}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Type</label>
                                    <select className="w-full p-2 border border-neutral-200 rounded-lg text-sm" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                        <option value="GENERAL">General</option>
                                        <option value="GST">GST</option>
                                        <option value="ITR">ITR</option>
                                        <option value="ROC">ROC</option>
                                        <option value="AUDIT">Audit</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Priority</label>
                                    <select className="w-full p-2 border border-neutral-200 rounded-lg text-sm" value={formData.priority} onChange={e => setFormData({ ...formData, priority: e.target.value })}>
                                        <option value="LOW">Low</option>
                                        <option value="MEDIUM">Medium</option>
                                        <option value="HIGH">High</option>
                                        <option value="URGENT">Urgent</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Due Date</label>
                                <input type="date" className="w-full p-2 border border-neutral-200 rounded-lg text-sm" value={formData.dueDate} onChange={e => setFormData({ ...formData, dueDate: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                                <textarea rows={3} className="w-full p-2 border border-neutral-200 rounded-lg text-sm" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                            </div>
                            <div className="pt-2 flex justify-end gap-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">Cancel</button>
                                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-[#1e40af] hover:bg-blue-800 rounded-lg transition-colors">Create Task</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}











