import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  XCircle, 
  ChevronRight, 
  User, 
  Send, 
  Ticket, 
  MoreHorizontal,
  Mail,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Inbox,
  X
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
import { toast } from 'sonner';
import api from "../../utils/api";

interface TicketData {
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
    const [tickets, setTickets] = useState<TicketData[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState<string>('ALL');
    const [searchTerm, setSearchTerm] = useState('');

    // Reply Modal State
    const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null);
    const [replyText, setReplyText] = useState('');
    const [replyStatus, setReplyStatus] = useState('RESOLVED');
    const [submittingReply, setSubmittingReply] = useState(false);

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            setLoading(true);
            const response = await api.get('/tickets');
            setTickets(response.data.tickets || []);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to load support matrix');
        } finally {
            setLoading(false);
        }
    };

    const handleReplySubmit = async () => {
        if (!selectedTicket || !replyText.trim()) return;

        try {
            setSubmittingReply(true);
            await api.put(`/tickets/${selectedTicket.id}`, {
                adminReply: replyText,
                status: replyStatus
            });

            toast.success('Response synchronized with user node');
            fetchTickets();
            setSelectedTicket(null);
            setReplyText('');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to push response');
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

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'OPEN': return "bg-blue-500 text-black shadow-lg shadow-blue-500/20";
            case 'RESOLVED': return "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20";
            case 'CLOSED': return "bg-slate-400 text-black shadow-lg shadow-slate-400/20";
            default: return "bg-slate-400 text-black shadow-lg shadow-slate-400/20";
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Support Center</span>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Support Tickets</h1>
                        <p className="text-slate-500 font-medium">Manage and resolve user inquiries and technical issues.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-10 px-4 bg-white rounded-lg flex items-center gap-3 border border-slate-200 shadow-sm">
                            <Inbox className="h-4 w-4 text-slate-400" />
                            <span className="text-xs font-bold text-slate-600">
                                {tickets.filter(t => t.status === 'OPEN').length} Active Tickets
                            </span>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <Card className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                    <CardContent className="p-4 md:p-6 bg-white">
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input 
                                    placeholder="Search by subject, name, or email..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 h-11 border-slate-200 rounded-lg focus:ring-indigo-500/10 focus:border-indigo-500/20"
                                />
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <div className="relative min-w-[180px]">
                                    <select 
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                        className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500/10 outline-none appearance-none cursor-pointer pr-10"
                                    >
                                        <option value="ALL">All Statuses</option>
                                        <option value="OPEN">Open</option>
                                        <option value="RESOLVED">Resolved</option>
                                        <option value="CLOSED">Closed</option>
                                    </select>
                                    <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none rotate-90" />
                                </div>
                                <Button 
                                    variant="outline"
                                    className="h-11 px-6 rounded-lg font-semibold text-xs border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
                                    onClick={fetchTickets}
                                >
                                    <RefreshCw className={cn("h-3.5 w-3.5 mr-2", loading && "animate-spin")} /> Refresh
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tickets Table */}
                <Card className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                    <CardContent className="p-0 bg-white">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/30 border-b border-slate-100">
                                        <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">ID</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">User Profile</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Inquiry Subject</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Current Status</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Submission Date</th>
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
                                    ) : filteredTickets.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-24 text-center">
                                                <div className="flex flex-col items-center gap-3">
                                                    <MessageSquare className="h-12 w-12 text-slate-200" />
                                                    <p className="text-lg font-bold text-slate-900">No tickets found</p>
                                                    <p className="text-sm text-slate-500 mb-2">Try adjusting your search or filters.</p>
                                                    <Button variant="outline" className="rounded-lg" onClick={() => { setSearchTerm(""); setFilterStatus("ALL"); fetchTickets(); }}>Clear all filters</Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredTickets.map((ticket) => (
                                            <tr key={ticket.id} className="group hover:bg-slate-50/50 transition-all duration-200">
                                                <td className="px-6 py-5">
                                                    <p className="font-bold text-slate-900 text-sm">#{ticket.id.toString().padStart(4, '0')}</p>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 font-bold group-hover:bg-indigo-600 group-hover:text-black transition-all">
                                                            {ticket.user.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{ticket.user.name}</p>
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{ticket.user.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <p className="text-sm font-semibold text-slate-700 max-w-xs truncate">{ticket.subject}</p>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className={cn(
                                                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                                                        ticket.status === 'RESOLVED' ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                                                        ticket.status === 'OPEN' ? "bg-indigo-50 text-indigo-700 border border-indigo-100" :
                                                        "bg-slate-100 text-slate-600"
                                                    )}>
                                                        <div className={cn("h-1 w-1 rounded-full", ticket.status === 'OPEN' ? "bg-indigo-600 animate-pulse" : ticket.status === 'RESOLVED' ? "bg-emerald-600" : "bg-slate-400")}></div>
                                                        {ticket.status}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                                                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                                                        <span className="text-xs font-medium">
                                                            {new Date(ticket.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <Button 
                                                        variant="ghost"
                                                        className="h-9 px-4 rounded-lg font-bold text-[11px] text-slate-600 hover:text-indigo-600 hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-100"
                                                        onClick={() => setSelectedTicket(ticket)}
                                                    >
                                                        Respond
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Response Modal */}
                {selectedTicket && (
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-6 animate-in fade-in duration-300">
                        <Card className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
                            <CardHeader className="p-8 pb-4 border-b border-slate-100 shrink-0 bg-slate-50/50">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Ticket #{selectedTicket.id.toString().padStart(4, '0')}</h2>
                                            <Badge className={cn(
                                                "text-[10px] font-bold px-2.5 py-1 rounded-lg border-none shadow-none",
                                                selectedTicket.status === 'RESOLVED' ? "bg-emerald-50 text-emerald-700" :
                                                selectedTicket.status === 'OPEN' ? "bg-indigo-50 text-indigo-700" :
                                                "bg-slate-100 text-slate-600"
                                            )}>
                                                {selectedTicket.status}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                                            <div className="flex items-center gap-1.5">
                                                <User className="h-3.5 w-3.5 text-slate-400" /> {selectedTicket.user.name}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Mail className="h-3.5 w-3.5 text-slate-400" /> {selectedTicket.user.email}
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => setSelectedTicket(null)} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all">
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                            </CardHeader>

                            <CardContent className="p-0 overflow-y-auto custom-scrollbar flex-1">
                                <div className="p-8 space-y-8">
                                    {/* User Content */}
                                    <div className="space-y-3">
                                        <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-500 border border-slate-200 shadow-sm">
                                            Client Inquiry
                                        </div>
                                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 space-y-3">
                                            <h3 className="text-base font-bold text-slate-900 tracking-tight leading-tight">{selectedTicket.subject}</h3>
                                            <p className="text-[13px] text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">{selectedTicket.message}</p>
                                        </div>
                                    </div>

                                    {/* Previous Reply */}
                                    {selectedTicket.adminReply && (
                                        <div className="space-y-3">
                                            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-slate-900 text-black rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-lg">
                                                Our Response
                                            </div>
                                            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
                                                <p className="text-[13px] text-slate-300 font-medium leading-relaxed whitespace-pre-wrap">{selectedTicket.adminReply}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Area */}
                                    <div className="space-y-6 pt-8 border-t border-slate-100">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 ml-1">Update Response</label>
                                            <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200 w-fit">
                                                {['OPEN', 'RESOLVED', 'CLOSED'].map((s) => (
                                                    <button 
                                                        key={s}
                                                        onClick={() => setReplyStatus(s)}
                                                        className={cn(
                                                            "px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                                                            replyStatus === s ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                                                        )}
                                                    >
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <textarea 
                                            className="w-full min-h-[160px] p-5 bg-white border border-slate-200 rounded-2xl text-[13px] font-medium outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/20 transition-all resize-none shadow-sm placeholder:text-slate-400"
                                            placeholder="Enter your response to the user..."
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                        />
                                        <div className="flex gap-4">
                                            <Button variant="ghost" className="flex-1 h-11 rounded-lg font-bold text-xs uppercase tracking-widest text-slate-500" onClick={() => setSelectedTicket(null)}>Cancel</Button>
                                            <Button 
                                                className="flex-[2] h-11 rounded-lg font-bold text-xs bg-indigo-600 text-black hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all uppercase tracking-widest"
                                                onClick={handleReplySubmit}
                                                disabled={submittingReply || !replyText.trim()}
                                            >
                                                {submittingReply ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                                                Sync Response
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </AdminLayout>
    );

};
