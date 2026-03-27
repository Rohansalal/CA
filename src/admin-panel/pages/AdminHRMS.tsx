import React, { useState, useEffect, useCallback } from 'react';
import {
  Clock, Users, BookOpen, DollarSign, CheckCircle, X, Plus,
  Download, BarChart2, AlertCircle, RefreshCw, Trash2,
  Edit2, User, Phone, Mail, Shield
} from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { toast } from 'sonner';
import api from '../../utils/api';

// ─── Shared Components ─────────────────────────────────────────────────────────

const Stat: React.FC<{ label: string; value: string | number; icon: React.ElementType; color: string }> = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-xl font-black text-slate-900">{value}</p>
    </div>
  </div>
);

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const map: Record<string, string> = {
    APPROVED: 'bg-emerald-100 text-emerald-700',
    PAID: 'bg-emerald-100 text-emerald-700',
    REJECTED: 'bg-red-100 text-red-700',
    PENDING: 'bg-amber-100 text-amber-700',
    ACTIVE: 'bg-blue-100 text-blue-700',
    INACTIVE: 'bg-slate-100 text-slate-500',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${map[status] || 'bg-slate-100 text-slate-500'}`}>
      {status}
    </span>
  );
};

const Empty: React.FC<{ icon: React.ElementType; label: string }> = ({ icon: Icon, label }) => (
  <div className="text-center py-16 text-slate-400">
    <Icon className="w-10 h-10 mx-auto mb-3 opacity-30" />
    <p className="text-sm">{label}</p>
  </div>
);

const inputCls = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition";

// ─── Workload Tab ──────────────────────────────────────────────────────────────

const WorkloadTab: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const r = await api.get('/hrms/workload');
        setData(r.data);
      } catch { toast.error('Failed to load workload'); }
      finally { setLoading(false); }
    })();
  }, []);

  if (loading) return <div className="flex justify-center py-16"><RefreshCw className="w-6 h-6 text-slate-300 animate-spin" /></div>;
  if (!data) return null;

  const employees: any[] = data.workload || data.employees || [];

  const totalActive = employees.reduce((s: number, e: any) => s + (e.activeTasks || 0), 0);
  const totalUrgent = employees.reduce((s: number, e: any) => s + (e.urgentTasks || 0), 0);
  const avgUtil = employees.length ? Math.round(employees.reduce((s: number, e: any) => s + (e.utilizationPercent || 0), 0) / employees.length) : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Team Members" value={employees.length} icon={Users} color="text-blue-600 bg-blue-50" />
        <Stat label="Active Tasks" value={totalActive} icon={BarChart2} color="text-indigo-600 bg-indigo-50" />
        <Stat label="Urgent Tasks" value={totalUrgent} icon={AlertCircle} color="text-red-600 bg-red-50" />
        <Stat label="Avg Utilization" value={`${avgUtil}%`} icon={Clock} color="text-emerald-600 bg-emerald-50" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {employees.length === 0 ? (
          <div className="col-span-2"><Empty icon={Users} label="No employee data — add employees first" /></div>
        ) : employees.map((emp: any) => {
          const util = emp.utilizationPercent || 0;
          const barColor = util >= 80 ? 'bg-red-500' : util >= 60 ? 'bg-amber-500' : 'bg-emerald-500';
          const badgeColor = util >= 80 ? 'bg-red-100 text-red-700' : util >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700';
          return (
            <div key={emp.employee?.id || emp.employeeId} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-indigo-200 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-slate-800 font-bold text-sm">{emp.employee?.name || `Employee #${emp.employee?.id}`}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{emp.employee?.role}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${badgeColor}`}>
                  {util.toFixed(0)}% util
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center mb-4">
                <div>
                  <p className="text-2xl font-black text-slate-900">{emp.activeTasks || 0}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">Active</p>
                </div>
                <div>
                  <p className={`text-2xl font-black ${emp.urgentTasks > 0 ? 'text-red-600' : 'text-slate-900'}`}>{emp.urgentTasks || 0}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">Urgent</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">{(emp.monthlyHours || 0).toFixed(0)}h</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">This Month</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] text-slate-400 mb-1 uppercase tracking-widest">
                  <span>Capacity</span><span>{(emp.monthlyHours || 0).toFixed(0)} / 176h</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${Math.min(100, util)}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Timesheets Tab ─────────────────────────────────────────────────────────────

const TimesheetsTab: React.FC = () => {
  const [sheets, setSheets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    clientId: '', date: new Date().toISOString().split('T')[0],
    hoursWorked: '', description: '', billable: true, billableRate: '', category: 'GENERAL'
  });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await api.get('/hrms/timesheets/all');
      setSheets(r.data.timesheets || []);
    } catch { toast.error('Failed to load timesheets'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const submit = async () => {
    if (!form.hoursWorked || !form.date) return toast.error('Date and hours are required');
    try {
      await api.post('/hrms/timesheets', {
        date: form.date,
        hoursWorked: parseFloat(form.hoursWorked),
        description: form.description || undefined,
        billable: form.billable,
        billableRate: form.billableRate ? parseFloat(form.billableRate) : 0,
        category: form.category,
        clientId: form.clientId ? parseInt(form.clientId) : undefined,
      });
      toast.success('Timesheet logged');
      setShowForm(false);
      setForm({ clientId: '', date: new Date().toISOString().split('T')[0], hoursWorked: '', description: '', billable: true, billableRate: '', category: 'GENERAL' });
      load();
    } catch { toast.error('Failed to log timesheet'); }
  };

  const approve = async (id: number) => {
    try {
      await api.put(`/hrms/timesheets/${id}/approve`);
      toast.success('Approved');
      load();
    } catch { toast.error('Failed to approve'); }
  };

  const totalHours = sheets.reduce((s, t) => s + (t.hoursWorked || 0), 0);
  const billableHours = sheets.filter(t => t.billable).reduce((s, t) => s + (t.hoursWorked || 0), 0);
  const utilRate = totalHours > 0 ? ((billableHours / totalHours) * 100).toFixed(0) : '0';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <Stat label="Total Hours" value={`${totalHours.toFixed(1)}h`} icon={Clock} color="text-indigo-600 bg-indigo-50" />
        <Stat label="Billable Hours" value={`${billableHours.toFixed(1)}h`} icon={CheckCircle} color="text-emerald-600 bg-emerald-50" />
        <Stat label="Utilization" value={`${utilRate}%`} icon={BarChart2} color="text-amber-600 bg-amber-50" />
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800">All Timesheets</h3>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-indigo-600 text-black rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" /> Log Time
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
          <p className="text-sm font-bold text-slate-700">New Timesheet Entry</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} type="date" className={inputCls} />
            <input value={form.hoursWorked} onChange={e => setForm(f => ({ ...f, hoursWorked: e.target.value }))} placeholder="Hours worked *" type="number" step="0.5" min="0" max="24" className={inputCls} />
            <input value={form.clientId} onChange={e => setForm(f => ({ ...f, clientId: e.target.value }))} placeholder="Client ID (optional)" type="number" className={inputCls} />
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className={inputCls}>
              <option value="GENERAL">General</option>
              <option value="AUDIT">Audit</option>
              <option value="TAXATION">Taxation</option>
              <option value="COMPLIANCE">Compliance</option>
              <option value="ADVISORY">Advisory</option>
            </select>
            <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Description" className={`${inputCls} sm:col-span-2`} />
            <div className="flex items-center gap-4 sm:col-span-2">
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input type="checkbox" checked={form.billable} onChange={e => setForm(f => ({ ...f, billable: e.target.checked }))} className="rounded accent-indigo-600" />
                Billable
              </label>
              {form.billable && (
                <input value={form.billableRate} onChange={e => setForm(f => ({ ...f, billableRate: e.target.value }))} placeholder="Rate per hour (₹)" type="number" className={`${inputCls} w-48`} />
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={submit} className="px-5 py-2 bg-indigo-600 text-black rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all">Save</button>
            <button onClick={() => setShowForm(false)} className="px-5 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all">Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12"><RefreshCw className="w-6 h-6 text-slate-300 animate-spin" /></div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          {sheets.length === 0 ? <Empty icon={Clock} label="No timesheets logged yet" /> : (
            <div className="divide-y divide-slate-100">
              {sheets.map(t => (
                <div key={t.id} className="px-5 py-4 flex items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-800 text-sm font-semibold truncate">{t.description || '—'}</p>
                    <p className="text-slate-400 text-xs mt-0.5">
                      {new Date(t.date).toLocaleDateString('en-IN')}
                      {t.employee && ` · ${t.employee.name}`}
                      {t.clientId && ` · Client #${t.clientId}`}
                      {t.category && ` · ${t.category}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <p className="text-slate-900 font-bold text-sm">{t.hoursWorked}h</p>
                      <p className={`text-[10px] font-bold uppercase tracking-widest ${t.billable ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {t.billable ? `₹${t.billableRate || 0}/hr` : 'Non-bill'}
                      </p>
                    </div>
                    <StatusBadge status={t.approvedBy ? 'APPROVED' : 'PENDING'} />
                    {!t.approvedBy && (
                      <button onClick={() => approve(t.id)} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-[10px] font-bold hover:bg-emerald-100 transition-all">
                        Approve
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ─── E-Diary Tab ───────────────────────────────────────────────────────────────

const AREAS = ['TAXATION', 'AUDIT', 'ACCOUNTS', 'CORPORATE', 'OTHER'] as const;

const EDiaryTab: React.FC = () => {
  const [entries, setEntries] = useState<any[]>([]);
  const [pending, setPending] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'pending' | 'all'>('pending');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    area: 'TAXATION' as typeof AREAS[number],
    taskDescription: '',
    hoursSpent: '',
    clientId: '',
    remarks: '',
  });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [allRes, pendRes] = await Promise.allSettled([
        api.get('/hrms/e-diary'),
        api.get('/hrms/e-diary/pending'),
      ]);
      if (allRes.status === 'fulfilled') setEntries(allRes.value.data.entries || []);
      if (pendRes.status === 'fulfilled') setPending(pendRes.value.data.entries || []);
    } catch { toast.error('Failed to load E-Diary'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const submit = async () => {
    if (!form.date || !form.area || !form.taskDescription || !form.hoursSpent) return toast.error('Date, area, description and hours are required');
    try {
      await api.post('/hrms/e-diary', {
        date: form.date,
        area: form.area,
        taskDescription: form.taskDescription,
        hoursSpent: parseFloat(form.hoursSpent),
        clientId: form.clientId ? parseInt(form.clientId) : undefined,
        remarks: form.remarks || undefined,
      });
      toast.success('Entry added');
      setShowForm(false);
      setForm({ date: new Date().toISOString().split('T')[0], area: 'TAXATION', taskDescription: '', hoursSpent: '', clientId: '', remarks: '' });
      load();
    } catch { toast.error('Failed to add entry'); }
  };

  const approve = async (id: number) => {
    try {
      await api.put(`/hrms/e-diary/${id}/approve`);
      toast.success('Entry approved');
      load();
    } catch { toast.error('Approval failed'); }
  };

  const exportDiary = async () => {
    try {
      const r = await api.get('/hrms/e-diary/export');
      const blob = new Blob([JSON.stringify(r.data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'icai-ediary-export.json'; a.click();
      URL.revokeObjectURL(url);
      toast.success('Exported successfully');
    } catch { toast.error('Export failed'); }
  };

  const display = view === 'pending' ? pending : entries;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-800">ICAI E-Diary</h3>
          <p className="text-slate-400 text-xs mt-0.5">{pending.length} entries pending principal approval</p>
        </div>
        <div className="flex gap-2">
          <button onClick={exportDiary} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all flex items-center gap-2">
            <Download className="w-4 h-4" /> Export ICAI
          </button>
          <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-indigo-600 text-black rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Entry
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={() => setView('pending')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${view === 'pending' ? 'bg-indigo-600 text-black' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
          Pending ({pending.length})
        </button>
        <button onClick={() => setView('all')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${view === 'all' ? 'bg-indigo-600 text-black' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
          All Entries ({entries.length})
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
          <p className="text-sm font-bold text-slate-700">New E-Diary Entry</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} type="date" className={inputCls} />
            <select value={form.area} onChange={e => setForm(f => ({ ...f, area: e.target.value as any }))} className={inputCls}>
              {AREAS.map(a => <option key={a} value={a}>{a.charAt(0) + a.slice(1).toLowerCase()}</option>)}
            </select>
            <textarea value={form.taskDescription} onChange={e => setForm(f => ({ ...f, taskDescription: e.target.value }))} placeholder="Task description *"
              className={`${inputCls} sm:col-span-2 resize-none h-20`} />
            <input value={form.hoursSpent} onChange={e => setForm(f => ({ ...f, hoursSpent: e.target.value }))} placeholder="Hours spent *" type="number" step="0.5" min="0" max="24" className={inputCls} />
            <input value={form.clientId} onChange={e => setForm(f => ({ ...f, clientId: e.target.value }))} placeholder="Client ID (optional)" type="number" className={inputCls} />
            <input value={form.remarks} onChange={e => setForm(f => ({ ...f, remarks: e.target.value }))} placeholder="Remarks (optional)" className={`${inputCls} sm:col-span-2`} />
          </div>
          <div className="flex gap-2">
            <button onClick={submit} className="px-5 py-2 bg-indigo-600 text-black rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all">Save</button>
            <button onClick={() => setShowForm(false)} className="px-5 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all">Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12"><RefreshCw className="w-6 h-6 text-slate-300 animate-spin" /></div>
      ) : (
        <div className="space-y-3">
          {display.length === 0 ? (
            <Empty icon={BookOpen} label={view === 'pending' ? 'No entries pending approval' : 'No diary entries yet'} />
          ) : display.map((entry: any) => (
            <div key={entry.id} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-indigo-200 transition-all">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-slate-800 font-bold text-sm">{entry.area}</span>
                    <StatusBadge status={entry.principalApproved ? 'APPROVED' : 'PENDING'} />
                    <span className="text-slate-400 text-[11px]">
                      {new Date(entry.date).toLocaleDateString('en-IN')} · {entry.hoursSpent}h
                    </span>
                    {entry.article && <span className="text-slate-400 text-[11px]">· {entry.article.name}</span>}
                  </div>
                  <p className="text-slate-600 text-sm">{entry.taskDescription}</p>
                  {entry.remarks && <p className="text-slate-400 text-xs mt-1">Remarks: {entry.remarks}</p>}
                </div>
              </div>
              {!entry.principalApproved && (
                <div className="flex gap-2 mt-3 pt-3 border-t border-slate-50">
                  <button onClick={() => approve(entry.id)} className="px-4 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-all flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" /> Approve
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Stipends Tab ──────────────────────────────────────────────────────────────

const StipendsTab: React.FC = () => {
  const [stipends, setStipends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    articleId: '',
    month: new Date().toISOString().slice(0, 7),
    amount: '',
    status: 'PAID',
    paymentMethod: '',
  });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await api.get('/hrms/stipends');
      setStipends(r.data.stipends || []);
    } catch { toast.error('Failed to load stipends'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const submit = async () => {
    if (!form.articleId || !form.amount || !form.month) return toast.error('Article ID, month and amount are required');
    try {
      await api.post('/hrms/stipends', {
        articleId: parseInt(form.articleId),
        month: form.month,
        amount: parseFloat(form.amount),
        status: form.status,
        paymentMethod: form.paymentMethod || undefined,
      });
      toast.success('Stipend recorded');
      setShowForm(false);
      setForm({ articleId: '', month: new Date().toISOString().slice(0, 7), amount: '', status: 'PAID', paymentMethod: '' });
      load();
    } catch { toast.error('Failed to record stipend'); }
  };

  const totalPaid = stipends.filter(s => s.status === 'PAID').reduce((sum, s) => sum + (s.amount || 0), 0);
  const totalPending = stipends.filter(s => s.status === 'PENDING').reduce((sum, s) => sum + (s.amount || 0), 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Stat label="Total Records" value={stipends.length} icon={DollarSign} color="text-indigo-600 bg-indigo-50" />
        <Stat label="Total Paid" value={`₹${totalPaid.toLocaleString()}`} icon={CheckCircle} color="text-emerald-600 bg-emerald-50" />
        <Stat label="Pending Payment" value={`₹${totalPending.toLocaleString()}`} icon={AlertCircle} color="text-amber-600 bg-amber-50" />
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800">Article Stipend Tracker</h3>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-indigo-600 text-black rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" /> Record Stipend
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
          <p className="text-sm font-bold text-slate-700">New Stipend Record</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input value={form.articleId} onChange={e => setForm(f => ({ ...f, articleId: e.target.value }))} placeholder="Article (Employee) ID *" type="number" className={inputCls} />
            <input value={form.month} onChange={e => setForm(f => ({ ...f, month: e.target.value }))} type="month" className={inputCls} />
            <input value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} placeholder="Amount (₹) *" type="number" className={inputCls} />
            <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className={inputCls}>
              <option value="PAID">Paid</option>
              <option value="PENDING">Pending</option>
            </select>
            <input value={form.paymentMethod} onChange={e => setForm(f => ({ ...f, paymentMethod: e.target.value }))} placeholder="Payment method (e.g. Bank Transfer)" className={`${inputCls} sm:col-span-2`} />
          </div>
          <div className="flex gap-2">
            <button onClick={submit} className="px-5 py-2 bg-indigo-600 text-black rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all">Save</button>
            <button onClick={() => setShowForm(false)} className="px-5 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all">Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12"><RefreshCw className="w-6 h-6 text-slate-300 animate-spin" /></div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          {stipends.length === 0 ? <Empty icon={DollarSign} label="No stipend records yet" /> : (
            <div className="divide-y divide-slate-100">
              {stipends.map(s => (
                <div key={s.id} className="px-5 py-4 flex items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors">
                  <div>
                    <p className="text-slate-800 font-semibold text-sm">
                      {s.article?.name || `Article #${s.articleId}`}
                    </p>
                    <p className="text-slate-400 text-xs mt-0.5">
                      {s.month}
                      {s.paymentMethod && ` · ${s.paymentMethod}`}
                      {s.paidAt && ` · Paid ${new Date(s.paidAt).toLocaleDateString('en-IN')}`}
                    </p>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <div>
                      <p className="text-slate-900 font-black text-lg">₹{(s.amount || 0).toLocaleString()}</p>
                    </div>
                    <StatusBadge status={s.status || 'PENDING'} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ─── Employees Tab ─────────────────────────────────────────────────────────────

const ROLES = ['ARTICLE', 'STAFF', 'MANAGER', 'PRINCIPAL'] as const;

const EmployeesTab: React.FC = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'ARTICLE' as typeof ROLES[number], phone: '' });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await api.get('/employees');
      setEmployees(r.data.employees || []);
    } catch { toast.error('Failed to load employees'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => {
    setEditing(null);
    setForm({ name: '', email: '', password: '', role: 'ARTICLE', phone: '' });
    setShowForm(true);
  };

  const openEdit = (emp: any) => {
    setEditing(emp);
    setForm({ name: emp.name, email: emp.email, password: '', role: emp.role, phone: emp.phone || '' });
    setShowForm(true);
  };

  const submit = async () => {
    if (!form.name || !form.email) return toast.error('Name and email are required');
    if (!editing && !form.password) return toast.error('Password is required for new employee');
    try {
      const payload: any = { name: form.name, email: form.email, role: form.role, phone: form.phone || undefined };
      if (!editing) payload.password = form.password;
      if (editing) {
        await api.put(`/employees/${editing.id}`, payload);
        toast.success('Employee updated');
      } else {
        await api.post('/employees', payload);
        toast.success('Employee added');
      }
      setShowForm(false);
      load();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save employee');
    }
  };

  const remove = async (id: number) => {
    if (!window.confirm('Remove this employee?')) return;
    try {
      await api.delete(`/employees/${id}`);
      toast.success('Employee removed');
      load();
    } catch { toast.error('Failed to remove employee'); }
  };

  const roleColor: Record<string, string> = {
    PRINCIPAL: 'bg-purple-100 text-purple-700',
    MANAGER: 'bg-blue-100 text-blue-700',
    ARTICLE: 'bg-indigo-100 text-indigo-700',
    STAFF: 'bg-slate-100 text-slate-600',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Team Members</h3>
          <p className="text-slate-400 text-xs mt-0.5">{employees.length} employees on record</p>
        </div>
        <button onClick={openAdd} className="px-4 py-2 bg-indigo-600 text-black rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Employee
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
          <p className="text-sm font-bold text-slate-700">{editing ? 'Edit Employee' : 'New Employee'}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name *" className={inputCls} />
            <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="Email address *" type="email" className={inputCls} />
            {!editing && (
              <input value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="Password *" type="password" className={inputCls} />
            )}
            <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value as any }))} className={inputCls}>
              {ROLES.map(r => <option key={r} value={r}>{r.charAt(0) + r.slice(1).toLowerCase()}</option>)}
            </select>
            <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="Phone (optional)" className={inputCls} />
          </div>
          <div className="flex gap-2">
            <button onClick={submit} className="px-5 py-2 bg-indigo-600 text-black rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all">{editing ? 'Update' : 'Add'}</button>
            <button onClick={() => setShowForm(false)} className="px-5 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all">Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12"><RefreshCw className="w-6 h-6 text-slate-300 animate-spin" /></div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          {employees.length === 0 ? <Empty icon={Users} label="No employees yet — add your first team member" /> : (
            <div className="divide-y divide-slate-100">
              {employees.map(emp => (
                <div key={emp.id} className="px-5 py-4 flex items-center gap-4 hover:bg-slate-50/50 transition-colors">
                  <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-sm font-bold text-indigo-600 shrink-0">
                    {emp.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-slate-800 font-semibold text-sm">{emp.name}</p>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${roleColor[emp.role] || 'bg-slate-100 text-slate-500'}`}>
                        {emp.role}
                      </span>
                      {!emp.isActive && <StatusBadge status="INACTIVE" />}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-slate-400 text-xs flex items-center gap-1"><Mail className="w-3 h-3" />{emp.email}</span>
                      {emp.phone && <span className="text-slate-400 text-xs flex items-center gap-1"><Phone className="w-3 h-3" />{emp.phone}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => openEdit(emp)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => remove(emp.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ─── Main Component ─────────────────────────────────────────────────────────────

const TABS = [
  { id: 'workload', label: 'Workload', icon: BarChart2 },
  { id: 'employees', label: 'Employees', icon: Users },
  { id: 'timesheets', label: 'Timesheets', icon: Clock },
  { id: 'ediary', label: 'E-Diary', icon: BookOpen },
  { id: 'stipends', label: 'Stipends', icon: DollarSign },
] as const;

type TabId = typeof TABS[number]['id'];

export function AdminHRMS() {
  const [activeTab, setActiveTab] = useState<TabId>('workload');

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">HRMS</h1>
          <p className="text-slate-400 text-sm mt-1">Human Resource Management — CA Firm Edition</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 bg-white border border-slate-200 rounded-2xl p-1.5 flex-wrap">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex-1 justify-center min-w-[100px]
                ${activeTab === tab.id ? 'bg-indigo-600 text-black shadow-md shadow-indigo-500/20' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="animate-in fade-in duration-300">
          {activeTab === 'workload'   && <WorkloadTab />}
          {activeTab === 'employees'  && <EmployeesTab />}
          {activeTab === 'timesheets' && <TimesheetsTab />}
          {activeTab === 'ediary'     && <EDiaryTab />}
          {activeTab === 'stipends'   && <StipendsTab />}
        </div>
      </div>
    </AdminLayout>
  );
}
