import React, { useState, useEffect } from 'react';
import { Plus, Users, TrendingUp, Phone, Mail, Box, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { toast } from 'sonner';

interface Lead {
    id: number;
    name: string;
    source: string;
    phone: string;
    email: string;
    interestedService: string;
    status: 'NEW' | 'FOLLOW_UP' | 'CONVERTED';
    createdAt: string;
}

export function AdminLeads() {
    const navigate = useNavigate();
    const [leads, setLeads] = useState<Lead[]>([]);
    const [stats, setStats] = useState<any>({ total: 0, new: 0, followUp: 0, converted: 0 });
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        source: '',
        phone: '',
        email: '',
        interestedService: '',
        status: 'NEW'
    });

    const fetchLeads = async () => {
        try {
            const [leadsRes, statsRes] = await Promise.all([
                api.get('/leads'),
                api.get('/leads/stats')
            ]);
            setLeads(leadsRes.data.leads || []);
            setStats(statsRes.data.stats || { total: 0, new: 0, followUp: 0, converted: 0 });
        } catch (err: any) {
            toast.error(err.response?.data?.error || 'Failed to fetch leads');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const handleCreateLead = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/leads', formData);
            toast.success('Lead created successfully');
            setShowModal(false);
            setFormData({ name: '', source: '', phone: '', email: '', interestedService: '', status: 'NEW' });
            fetchLeads();
        } catch (err: any) {
            toast.error(err.response?.data?.error || 'Failed to create lead');
        }
    };

    const updateLeadStatus = async (leadId: number, newStatus: string) => {
        try {
            await api.put(`/leads/${leadId}`, { status: newStatus });
            toast.success('Lead status updated');
            fetchLeads();
        } catch (err: any) {
            toast.error('Failed to update lead');
        }
    };

    const renderColumn = (status: Lead['status'], title: string) => {
        const columnLeads = leads.filter(l => l.status === status);

        return (
            <div className="flex-1 min-w-[300px] bg-neutral-50 rounded-xl p-4 border border-neutral-200">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-neutral-800 flex items-center gap-2">
                        {title}
                    </h3>
                    <span className="bg-white text-neutral-500 text-xs px-2 py-1 rounded-full border border-neutral-200 font-medium">
                        {columnLeads.length}
                    </span>
                </div>

                <div className="space-y-3">
                    {columnLeads.map(lead => (
                        <div key={lead.id} className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-all">
                            <div className="flex justify-between items-start mb-3">
                                <h4 className="font-semibold text-sm text-neutral-900">{lead.name}</h4>
                                <select
                                    className="text-[10px] font-bold px-2 py-1 rounded bg-neutral-100 border border-neutral-200 cursor-pointer text-neutral-700 outline-none uppercase"
                                    value={lead.status}
                                    onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                                >
                                    <option value="NEW">New Lead</option>
                                    <option value="FOLLOW_UP">Follow Up</option>
                                    <option value="CONVERTED">Converted</option>
                                </select>
                            </div>

                            <div className="space-y-2 mt-2 pt-2 border-t border-neutral-100">
                                {lead.interestedService && (
                                    <div className="flex items-center text-xs text-neutral-600">
                                        <span className="inline-block w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2"><Box className="w-2.5 h-2.5" /></span>
                                        <span className="truncate">{lead.interestedService}</span>
                                    </div>
                                )}
                                {lead.phone && (
                                    <div className="flex items-center text-xs text-neutral-600">
                                        <span className="inline-block w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2"><Phone className="w-2.5 h-2.5" /></span>
                                        <span>{lead.phone}</span>
                                    </div>
                                )}
                                {lead.email && (
                                    <div className="flex items-center text-xs text-neutral-600">
                                        <span className="inline-block w-4 h-4 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-2"><Mail className="w-2.5 h-2.5" /></span>
                                        <span className="truncate">{lead.email}</span>
                                    </div>
                                )}
                            </div>

                            <div className="mt-3 pt-3 border-t border-neutral-100 flex justify-between items-center text-[10px] text-neutral-400">
                                <span className="bg-neutral-100 px-2 py-0.5 rounded text-neutral-600">{lead.source || 'Website'}</span>
                                <span>{new Date(lead.createdAt).toLocaleDateString('en-GB')}</span>
                            </div>
                        </div>
                    ))}
                    {columnLeads.length === 0 && (
                        <div className="text-center py-6 text-sm text-neutral-400 border-2 border-dashed border-neutral-200 rounded-lg">
                            No leads
                        </div>
                    )}
                </div>
            </div>
        );
    };

    if (loading) return <div className="p-8 text-center text-neutral-500">Loading leads...</div>;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Lead Management</h1>
                    <p className="text-neutral-500 text-sm mt-1">Track and convert potential clients</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-[#1e40af] text-black px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors flex items-center gap-2 text-sm"
                >
                    <Plus className="w-4 h-4" />
                    Add Lead
                </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg text-blue-600"><Users className="w-6 h-6" /></div>
                    <div><p className="text-sm text-neutral-500 font-medium">Total Leads</p><p className="text-2xl font-bold text-neutral-900">{stats.total}</p></div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-cyan-200 shadow-sm flex items-center gap-4">
                    <div className="bg-cyan-100 p-3 rounded-lg text-cyan-600"><div className="w-6 h-6 flex items-center justify-center font-bold text-lg">💡</div></div>
                    <div><p className="text-sm text-cyan-700 font-medium">New Leads</p><p className="text-2xl font-bold text-cyan-900">{stats.new}</p></div>
                </div>
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 shadow-sm flex items-center gap-4">
                    <div className="bg-amber-100 p-3 rounded-lg text-amber-600"><div className="w-6 h-6 flex items-center justify-center font-bold text-lg">⏳</div></div>
                    <div><p className="text-sm text-amber-700 font-medium">Follow Up</p><p className="text-2xl font-bold text-amber-900">{stats.followUp}</p></div>
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-sm flex items-center gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600"><TrendingUp className="w-6 h-6" /></div>
                    <div><p className="text-sm text-emerald-700 font-medium">Converted</p><p className="text-2xl font-bold text-emerald-900">{stats.converted}</p></div>
                </div>
            </div>

            {/* Pipeline Board */}
            <div className="flex gap-6 overflow-x-auto pb-4">
                {renderColumn('NEW', 'New Inquiries')}
                {renderColumn('FOLLOW_UP', 'In Discussion')}
                {renderColumn('CONVERTED', 'Converted Clients')}
            </div>

            {/* Create Lead Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="p-4 border-b border-neutral-100 flex justify-between items-center">
                            <h2 className="font-bold text-lg">Add New Lead</h2>
                            <button onClick={() => setShowModal(false)} className="text-neutral-400 hover:text-neutral-600">&times;</button>
                        </div>
                        <form onSubmit={handleCreateLead} className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Name / Company Name *</label>
                                <input required type="text" className="w-full p-2 border border-neutral-200 rounded-lg text-sm" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Phone</label>
                                    <input type="text" className="w-full p-2 border border-neutral-200 rounded-lg text-sm" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                                    <input type="email" className="w-full p-2 border border-neutral-200 rounded-lg text-sm" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Interested Service</label>
                                <input type="text" placeholder="e.g. GST Registration" className="w-full p-2 border border-neutral-200 rounded-lg text-sm" value={formData.interestedService} onChange={e => setFormData({ ...formData, interestedService: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Source</label>
                                    <input type="text" placeholder="e.g. Website, Referral" className="w-full p-2 border border-neutral-200 rounded-lg text-sm" value={formData.source} onChange={e => setFormData({ ...formData, source: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Status</label>
                                    <select className="w-full p-2 border border-neutral-200 rounded-lg text-sm" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                        <option value="NEW">New</option>
                                        <option value="FOLLOW_UP">Follow Up</option>
                                        <option value="CONVERTED">Converted</option>
                                    </select>
                                </div>
                            </div>
                            <div className="pt-2 flex justify-end gap-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">Cancel</button>
                                <button type="submit" className="px-4 py-2 text-sm font-medium text-black bg-[#1e40af] hover:bg-blue-800 rounded-lg transition-colors">Add Lead</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}











