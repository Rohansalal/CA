import { useState } from 'react';
import { Radio, Plus, Edit, Trash2, ToggleLeft, ToggleRight, TrendingUp, Users } from 'lucide-react';
import { useLeadChannels, useCreateLeadChannel, useUpdateLeadChannel, useDeleteLeadChannel } from '../../api/hooks/useLeadChannels';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import type { LeadChannel } from '../../types';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';

function ChannelForm({ onSubmit, defaultValues, onCancel }: { onSubmit: (data: any) => void; defaultValues?: Partial<LeadChannel>; onCancel: () => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: defaultValues ?? { isActive: true } });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-5">
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Channel Name *</label>
        <Input {...register('name', { required: 'Name is required' })} placeholder="e.g. WhatsApp, Website, Referral" className="rounded-xl" />
        {errors.name && <p className="text-xs text-red-500 mt-1">{String(errors.name.message)}</p>}
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Description</label>
        <Input {...register('description')} placeholder="Brief description of this channel" className="rounded-xl" />
      </div>
      <div className="flex gap-3 justify-end pt-2">
        <Button type="button" variant="ghost" onClick={onCancel} className="rounded-xl">Cancel</Button>
        <Button type="submit" className="bg-blue-600 text-white rounded-xl">
          {defaultValues?.id ? 'Update Channel' : 'Add Channel'}
        </Button>
      </div>
    </form>
  );
}

export function LeadChannelList() {
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<LeadChannel | null>(null);

  const { data, isLoading } = useLeadChannels();
  const createChannel = useCreateLeadChannel();
  const updateChannel = useUpdateLeadChannel();
  const deleteChannel = useDeleteLeadChannel();

  const channels: LeadChannel[] = (data as any)?.channels ?? (data as any)?.items ?? [];

  const handleCreate = async (form: any) => {
    await createChannel.mutateAsync(form);
    setShowForm(false);
  };

  const handleUpdate = async (form: any) => {
    if (!editItem) return;
    await updateChannel.mutateAsync({ id: editItem.id, ...form });
    setEditItem(null);
  };

  const handleDelete = (id: number, name: string) => {
    toast.custom((t) => (
      <div className="bg-white p-5 rounded-2xl shadow-2xl border border-slate-100 w-80">
        <h3 className="font-bold text-slate-900">Delete Channel?</h3>
        <p className="text-sm text-slate-500 mt-1">Remove <strong>{name}</strong>?</p>
        <div className="flex gap-2 mt-4 justify-end">
          <Button variant="ghost" size="sm" onClick={() => toast.dismiss(t)} className="rounded-xl">Cancel</Button>
          <Button size="sm" className="bg-red-600 text-white rounded-xl" onClick={async () => { toast.dismiss(t); try { await deleteChannel.mutateAsync(id); } catch { /* */ } }}>Delete</Button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-600 flex items-center justify-center">
            <Radio className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Lead Channels</h1>
            <p className="text-xs text-slate-400">Manage your lead acquisition sources</p>
          </div>
        </div>
        {!showForm && !editItem && (
          <Button onClick={() => setShowForm(true)} className="bg-blue-600 text-white rounded-xl gap-2">
            <Plus className="w-4 h-4" />
            Add Channel
          </Button>
        )}
      </div>

      {/* Inline form */}
      {(showForm || editItem) && (
        <div className="bg-white rounded-xl border border-blue-200 shadow-sm">
          <div className="px-5 pt-4 pb-0">
            <h3 className="text-sm font-bold text-slate-900">{editItem ? 'Edit Channel' : 'New Lead Channel'}</h3>
          </div>
          <ChannelForm
            defaultValues={editItem ?? undefined}
            onSubmit={editItem ? handleUpdate : handleCreate}
            onCancel={() => { setShowForm(false); setEditItem(null); }}
          />
        </div>
      )}

      {/* Channels grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <div key={i} className="h-28 bg-white rounded-xl border border-slate-100 animate-pulse" />)}
        </div>
      ) : channels.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-100 py-16 text-center">
          <Radio className="w-10 h-10 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">No channels yet. Add your first lead channel.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {channels.map((channel) => (
            <div key={channel.id} className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center">
                    <Radio className="w-4 h-4 text-cyan-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{channel.name}</p>
                    {channel.description && <p className="text-xs text-slate-400 mt-0.5">{channel.description}</p>}
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full mt-1.5 ${channel.isActive ? 'bg-green-500' : 'bg-slate-300'}`} />
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{channel.leadsCount ?? 0} leads</span>
                {channel.conversionRate !== undefined && (
                  <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" />{channel.conversionRate.toFixed(1)}% conv.</span>
                )}
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                <button onClick={() => setEditItem(channel)} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 transition-colors">
                  <Edit className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => updateChannel.mutateAsync({ id: channel.id, isActive: !channel.isActive })}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors"
                >
                  {channel.isActive ? <ToggleLeft className="w-3.5 h-3.5" /> : <ToggleRight className="w-3.5 h-3.5" />}
                  {channel.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button onClick={() => handleDelete(channel.id, channel.name)} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-600 transition-colors ml-auto">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
