import React, { useState, useEffect } from 'react';
import { MessageSquare, Search, Filter, CheckCircle, Clock, XCircle, ChevronRight, User, Send } from 'lucide-react';
import { toast } from 'sonner';

interface Ticket {
    id: number;
    subject: string;
    message: string;
    status: 'OPEN' | 'RESOLVED' | 'CLOSED';
    adminReply: string | null;
    createdAt: string;
    userId: number;
    user: {
        name: string;
        email: string;
    };
}

export const AdminTickets: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState<string>('ALL');
    const [searchTerm, setSearchTerm] = useState('');

    // Reply Modal State
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [replyText, setReplyText] = useState('');
    const [replyStatus, setReplyStatus] = useState('RESOLVED');
    const [submittingReply, setSubmittingReply] = useState(false);

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tickets`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Failed to fetch tickets');

            const data = await response.json();
            setTickets(data);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to load tickets');
        } finally {
            setLoading(false);
        }
    };

    const handleReplySubmit = async () => {
        if (!selectedTicket || !replyText.trim()) return;

        try {
            setSubmittingReply(true);
            const token = localStorage.getItem('adminToken');

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tickets/${selectedTicket.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    adminReply: replyText,
                    status: replyStatus
                })
            });

            if (!response.ok) throw new Error('Failed to send reply');

            toast.success('Reply sent successfully');
            fetchTickets(); // Refresh list
            setSelectedTicket(null);
            setReplyText('');
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to send reply');
        } finally {
            setSubmittingReply(false);
        }
    };

    const filteredTickets = tickets.filter(ticket => {
        const matchesSearch =
            ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.user.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filterStatus === 'ALL' || ticket.status === filterStatus;

        return matchesSearch && matchesFilter;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'OPEN': return 'bg-blue-100 text-blue-800';
            case 'RESOLVED': return 'bg-green-100 text-green-800';
            case 'CLOSED': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6 bg-slate-50 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Support Tickets</h1>
                    <p className="text-slate-600 mt-1">Manage user support requests and inquiries</p>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search subject, user..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <select
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none bg-white min-w-[150px]"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="ALL">All Status</option>
                            <option value="OPEN">Open</option>
                            <option value="RESOLVED">Resolved</option>
                            <option value="CLOSED">Closed</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-medium">
                            <tr>
                                <th className="px-6 py-4">Ticket ID</th>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Subject</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Created At</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredTickets.map((ticket) => (
                                <tr key={ticket.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">#{ticket.id}</td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium text-gray-900">{ticket.user.name}</p>
                                            <p className="text-xs text-gray-500">{ticket.user.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{ticket.subject}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusColor(ticket.status)}`}>
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {new Date(ticket.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => setSelectedTicket(ticket)}
                                            className="text-primary hover:text-primary/80 font-medium text-xs border border-primary/20 hover:bg-primary/5 px-3 py-1.5 rounded-lg transition"
                                        >
                                            View & Reply
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredTickets.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center">
                                            <MessageSquare className="w-12 h-12 text-gray-300 mb-3" />
                                            <p>No tickets found matching your criteria</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Ticket Details & Reply Modal */}
            {selectedTicket && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h2 className="text-xl font-bold text-gray-900">ticket #{selectedTicket.id}</h2>
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusColor(selectedTicket.status)}`}>
                                        {selectedTicket.status}
                                    </span>
                                </div>
                                <p className="text-gray-500 text-sm">Created by {selectedTicket.user.name} ({selectedTicket.user.email})</p>
                            </div>
                            <button
                                onClick={() => setSelectedTicket(null)}
                                className="text-gray-400 hover:text-gray-600 transition"
                            >
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto flex-1 space-y-6">
                            {/* User Query */}
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <h3 className="text-sm font-semibold text-gray-900 mb-2">{selectedTicket.subject}</h3>
                                <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap">{selectedTicket.message}</p>
                            </div>

                            {/* Existing Admin Reply */}
                            {selectedTicket.adminReply && (
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 ml-8 relative">
                                    <div className="absolute -left-3 top-4 w-3 h-3 bg-blue-50 rotate-45 border-l border-b border-blue-100"></div>
                                    <h4 className="text-xs font-bold text-blue-800 uppercase mb-2 flex items-center gap-2">
                                        <User className="w-3 h-3" /> Previous Reply
                                    </h4>
                                    <p className="text-blue-900 text-sm whitespace-pre-wrap">{selectedTicket.adminReply}</p>
                                </div>
                            )}

                            {/* Action Area */}
                            <div className="border-t border-gray-100 pt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Your Reply</label>
                                <textarea
                                    className="w-full border border-gray-300 rounded-lg p-3 h-32 outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm resize-none"
                                    placeholder="Type your response here..."
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                ></textarea>

                                <div className="flex items-center gap-4 mt-4">
                                    <div className="flex items-center gap-2 border border-gray-200 rounded-lg p-1 bg-gray-50">
                                        <button
                                            onClick={() => setReplyStatus('RESOLVED')}
                                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${replyStatus === 'RESOLVED' ? 'bg-green-100 text-green-700 shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
                                        >
                                            Mark Resolved
                                        </button>
                                        <button
                                            onClick={() => setReplyStatus('CLOSED')}
                                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${replyStatus === 'CLOSED' ? 'bg-gray-200 text-gray-800 shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
                                        >
                                            Close Ticket
                                        </button>
                                        <button
                                            onClick={() => setReplyStatus('OPEN')}
                                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${replyStatus === 'OPEN' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
                                        >
                                            Keep Open
                                        </button>
                                    </div>
                                    <button
                                        onClick={handleReplySubmit}
                                        disabled={submittingReply || !replyText.trim()}
                                        className="ml-auto bg-primary text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-primary/90 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                                    >
                                        {submittingReply ? (
                                            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                                        ) : (
                                            <Send className="w-4 h-4" />
                                        )}
                                        Send Reply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
