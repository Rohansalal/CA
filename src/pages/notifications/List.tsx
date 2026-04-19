import { useState } from 'react';
import { useNotifications, useBroadcastNotification } from '../../api/hooks/useNotifications';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Bell, Send, Loader2, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export function Notifications() {
  const { data: notifications, isLoading } = useNotifications();
  const broadcast = useBroadcastNotification();
  
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('INFO');

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) {
      toast.error('Missing fields');
      return;
    }
    await broadcast.mutateAsync({ title, message, type });
    setTitle('');
    setMessage('');
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'WARNING': return <AlertTriangle className="text-amber-500" />;
      case 'SUCCESS': return <CheckCircle className="text-emerald-500" />;
      default: return <Info className="text-blue-500" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-900/5 border border-slate-100">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-900/20">
            <Bell size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Broadcast Center</h2>
            <p className="text-slate-500 font-medium mt-1">Manage platform notifications and dispatch alerts.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="border-none shadow-xl shadow-slate-900/5 bg-white rounded-[2rem] overflow-hidden">
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
              <Send size={20} className="text-indigo-600" />
              <h3 className="font-black text-slate-900">New Broadcast</h3>
            </div>
            <CardContent className="p-6">
              <form onSubmit={handleBroadcast} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Subject Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full h-12 rounded-xl bg-slate-50 border-none px-4 text-slate-900 font-medium focus:ring-2 focus:ring-indigo-600 outline-none"
                    placeholder="E.g., Server Maintenance"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Message Content</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-xl bg-slate-50 border-none px-4 py-3 text-slate-900 font-medium focus:ring-2 focus:ring-indigo-600 outline-none min-h-[100px]"
                    placeholder="Enter the broadcast payload..."
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Priority Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full h-12 rounded-xl bg-slate-50 border-none px-4 text-slate-900 font-medium focus:ring-2 focus:ring-indigo-600 outline-none"
                  >
                    <option value="INFO">Informational</option>
                    <option value="WARNING">Warning</option>
                    <option value="SUCCESS">Success</option>
                  </select>
                </div>
                <Button 
                  type="submit" 
                  disabled={broadcast.isPending}
                  className="w-full rounded-xl h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-black shadow-lg shadow-indigo-900/20 mt-2"
                >
                  {broadcast.isPending ? <Loader2 className="animate-spin mb-0 h-5 w-5" /> : 'Dispatch Broadcast'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="border-none shadow-xl shadow-slate-900/5 bg-white rounded-[2rem] overflow-hidden">
            <div className="p-6 bg-slate-50 border-b border-slate-100">
              <h3 className="font-black text-slate-900">Broadcast History</h3>
            </div>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-indigo-600 w-8 h-8" /></div>
              ) : notifications && notifications.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-6 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                      <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 mt-1">
                        {getIcon(n.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-slate-900">{n.title}</h4>
                          <span className="text-xs font-bold text-slate-400">
                            {new Date(n.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-slate-500 mt-1">{n.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full mx-auto flex items-center justify-center text-slate-300 mb-4">
                    <Bell size={24} />
                  </div>
                  <p className="text-slate-400 font-bold">No broadcast history found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
