// @ts-nocheck
import { useState } from 'react';
import { useConsultations, useUpdateConsultation, useDeleteConsultation } from '../../api/hooks/useConsultations';
import { DataTable, StatusBadge } from '../../components/common/DataTable';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Textarea } from '../../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../../components/ui/dialog';
import { Edit, Trash2, Loader2, MessageSquare, User, Mail, Calendar, Hash, CheckCircle2, AlertCircle, Clock, ChevronRight } from 'lucide-react';
import type { Consultation } from '../../types';
import { toast } from 'sonner';

const statusOptions = ['PENDING', 'SCHEDULED', 'COMPLETED', 'CANCELLED'];

export function ConsultationList() {
  const [page, setPage] = useState(1);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');
  
  const { data, isLoading, refetch } = useConsultations({ page, limit: 10 });
  const updateConsultation = useUpdateConsultation();
  const deleteConsultation = useDeleteConsultation();

  const handleUpdate = async () => {
    if (!selectedConsultation) return;
    
    try {
      await updateConsultation.mutateAsync({
        id: selectedConsultation.id,
        status,
        notes: notes || undefined,
      });
      toast.success('Consultation updated', { description: 'The consultation record has been successfully modified.' });
      setSelectedConsultation(null);
      setNotes('');
      setStatus('');
      refetch();
    } catch (error) {
      toast.error('Update failed');
    }
  };

  const handleDelete = async (id: number) => {
    toast.custom((t) => (
      <div className="bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 max-w-sm">
        <h3 className="text-lg font-black text-slate-900">Delete Record?</h3>
        <p className="text-sm font-medium text-slate-500 mt-2">This consultation request will be permanently removed from your history.</p>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={() => toast.dismiss(t)} className="font-bold rounded-xl">Cancel</Button>
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-900/20"
            onClick={async () => {
              toast.dismiss(t);
              try {
                await deleteConsultation.mutateAsync(id);
                toast.success('Record deleted');
                refetch();
              } catch (error) {
                toast.error('Failed to delete');
              }
            }}
          >
            Delete Request
          </Button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  const openEditModal = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    setStatus(consultation.status);
    setNotes(consultation.notes || '');
  };

  const columns = [
    {
      key: 'user',
      header: 'Lead / Client',
      render: (consultation: Consultation) => (
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-sm">
            <User size={20} />
          </div>
          <div>
            <p className="font-black text-slate-900 leading-none group-hover:text-indigo-600 transition-colors">{consultation.user?.name || consultation.fullName}</p>
            <div className="flex items-center gap-2 mt-1.5 text-slate-400">
              <Mail size={12} />
              <p className="text-[10px] font-bold uppercase tracking-wider">{consultation.user?.email || consultation.email}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'topic',
      header: 'Consultation Topic',
      render: (consultation: Consultation) => (
        <div className="max-w-xs">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            <p className="text-xs font-black text-slate-700 truncate">{consultation.topic}</p>
          </div>
          <p className="text-[10px] font-medium text-slate-400 mt-1 line-clamp-1 italic">"{consultation.message}"</p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Consultation Status',
      render: (consultation: Consultation) => <StatusBadge status={consultation.status} />,
    },
    {
      key: 'createdAt',
      header: 'Requested On',
      render: (consultation: Consultation) => (
        <div className="flex items-center gap-2 text-slate-500 font-bold">
          <Calendar size={14} className="text-slate-300" />
          <span className="text-[10px] uppercase tracking-wider">
            {new Date(consultation.createdAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>
      ),
    },
  ];

  const actions = (consultation: Consultation) => (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-xl border-slate-200 hover:bg-white hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm"
        onClick={() => openEditModal(consultation)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-xl border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm"
        onClick={() => handleDelete(consultation.id)}
        disabled={deleteConsultation.isPending}
      >
        {deleteConsultation.isPending && deleteConsultation.variables === consultation.id ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-900/5 border border-slate-100">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-900/20">
            <MessageSquare size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Expert Consultations</h2>
            <p className="text-slate-500 font-medium mt-1">Review and manage appointment requests from potential clients.</p>
          </div>
        </div>
        <div className="bg-indigo-50 px-6 py-3 rounded-2xl border border-indigo-100">
          <div className="flex items-center gap-2 text-indigo-600">
            <Clock size={18} className="animate-pulse" />
            <span className="text-sm font-black uppercase tracking-widest">{data?.count || 0} Total Requests</span>
          </div>
        </div>
      </div>

      {/* Main Table Content */}
      <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-900/5 border border-slate-100 p-2">
        <DataTable
          data={data?.items || []}
          columns={columns}
          loading={isLoading}
          totalCount={data?.count || 0}
          page={page}
          onPageChange={setPage}
          actions={actions}
          keyExtractor={(consultation) => consultation.id}
          emptyMessage="No consultation requests found."
        />
      </div>

      {/* Modern Modal */}
      <Dialog open={!!selectedConsultation} onOpenChange={() => setSelectedConsultation(null)}>
        <DialogContent className="max-w-xl p-0 bg-white border-none rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
          <DialogHeader className="p-10 pb-0">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white">
                <Edit size={24} />
              </div>
              <div>
                <DialogTitle className="text-2xl font-black text-slate-900 tracking-tight">Manage Appointment</DialogTitle>
                <DialogDescription className="text-sm font-medium text-slate-500 mt-1">Update status and internal notes for this request.</DialogDescription>
              </div>
            </div>
          </DialogHeader>
          
          <div className="p-10 space-y-8">
            {selectedConsultation && (
              <>
                <div className="grid grid-cols-2 gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Requester</p>
                    <p className="text-sm font-bold text-slate-900">{selectedConsultation.fullName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Topic</p>
                    <p className="text-sm font-bold text-slate-900 truncate">{selectedConsultation.topic}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Workflow Status</label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="h-14 rounded-2xl border-slate-200 bg-white font-bold text-sm focus:ring-4 focus:ring-blue-500/10 transition-all">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-slate-200 shadow-2xl">
                      {statusOptions.map((s) => (
                        <SelectItem key={s} value={s} className="font-bold text-xs uppercase tracking-widest my-1 rounded-lg">
                          {s.replace('_', ' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Internal Professional Notes</label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Document your findings or next steps..."
                    className="min-h-[120px] rounded-2xl border-slate-200 bg-white p-4 font-medium text-sm focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
                  />
                </div>
              </>
            )}
          </div>
          
          <DialogFooter className="p-10 pt-0 flex gap-4">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedConsultation(null)} 
              className="flex-1 h-14 rounded-2xl font-bold text-slate-500 hover:bg-slate-100"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUpdate}
              disabled={updateConsultation.isPending}
              className="flex-1 h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-xl shadow-indigo-900/20 gap-2 transition-all hover:scale-[1.02]"
            >
              {updateConsultation.isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <CheckCircle2 size={20} />
              )}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

