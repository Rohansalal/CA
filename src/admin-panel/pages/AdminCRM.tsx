import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Users, RefreshCw, TrendingUp, MessageSquare, Calendar, Phone, Mail,
  Clock, Activity, DollarSign, X, CheckCircle, Plus, Trash2, Star,
  Zap, ChevronRight, ChevronDown, ArrowUpRight, ArrowDownRight,
  Search, Filter, Eye, FileText, ClipboardList, AlertTriangle,
  BarChart3, Target, Briefcase, UserCheck, UserX, Send,
} from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { toast } from 'sonner';
import api from '../../utils/api';

// ═══════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════

interface HealthScore {
  id: number; userId: number; score: number; churnRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  engagementScore: number; paymentScore: number; documentScore: number;
  lastActivity: string | null; servicesCount: number; pendingDocs: number;
  user: { id: number; name: string; email: string } | null;
}

interface CrossSell {
  id: number; userId: number; serviceName: string; status: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW'; potentialRevenue: number; reason: string;
  client: { name: string; email: string; phone: string } | null;
}

interface Renewal {
  id: number; userId: number; serviceName: string; status: string;
  expiresAt: string; planType: string; amount: number;
  client: { name: string; email: string } | null;
}

interface ClientNote {
  id: number; clientId: number; adminId: number; type: string;
  content: string; followUpDate: string | null; isImportant: number;
  createdAt: string;
}

interface Client360 {
  client: { id: number; name: string; email: string; phone: string; createdAt: string; profile: any };
  healthScore: { score: number; churnRisk: string; engagementScore?: number; paymentScore?: number; documentScore?: number };
  summary: { totalOrders: number; totalRevenue: number; activeServices: number; openTickets: number; totalDocuments: number };
  orders: any[];
  renewals: any[];
  tasks: any[];
  documents: any[];
  tickets: any[];
  notes: any[];
  crossSellOpportunities: any[];
}

// ═══════════════════════════════════════════════════════════════
// REUSABLE COMPONENTS
// ═══════════════════════════════════════════════════════════════

const KPICard: React.FC<{
  label: string; value: string | number; change?: string; trend?: 'up' | 'down' | 'neutral';
  icon: React.ElementType; color: string;
}> = ({ label, value, change, trend, icon: Icon, color }) => (
  <div className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg hover:shadow-slate-100 transition-all duration-300">
    <div className="flex items-start justify-between mb-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      {change && (
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg
          ${trend === 'up' ? 'text-emerald-600 bg-emerald-50' : trend === 'down' ? 'text-red-500 bg-red-50' : 'text-slate-500 bg-slate-50'}`}>
          {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : trend === 'down' ? <ArrowDownRight className="w-3 h-3" /> : null}
          {change}
        </div>
      )}
    </div>
    <p className="text-2xl font-black text-slate-900 tracking-tight">{value}</p>
    <p className="text-xs text-slate-400 font-medium mt-1">{label}</p>
  </div>
);

const Badge: React.FC<{ text: string; variant: string }> = ({ text, variant }) => {
  const styles: Record<string, string> = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    warning: 'bg-amber-50 text-amber-700 border-amber-100',
    danger: 'bg-red-50 text-red-700 border-red-100',
    info: 'bg-blue-50 text-blue-700 border-blue-100',
    neutral: 'bg-slate-50 text-slate-600 border-slate-100',
    purple: 'bg-violet-50 text-violet-700 border-violet-100',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${styles[variant] || styles.neutral}`}>
      {text}
    </span>
  );
};

const EmptyState: React.FC<{ icon: React.ElementType; title: string; subtitle?: string }> = ({ icon: Icon, title, subtitle }) => (
  <div className="text-center py-16">
    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
      <Icon className="w-7 h-7 text-slate-300" />
    </div>
    <p className="text-slate-500 font-semibold">{title}</p>
    {subtitle && <p className="text-slate-400 text-sm mt-1">{subtitle}</p>}
  </div>
);

const ScoreRing: React.FC<{ value: number; size?: number; color?: string }> = ({ value, size = 48, color = '#6366f1' }) => {
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#f1f5f9" strokeWidth={4} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={4}
          strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
          className="transition-all duration-700" />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-slate-700">{value}</span>
    </div>
  );
};

const TabButton: React.FC<{
  active: boolean; onClick: () => void; icon: React.ElementType; label: string; count?: number;
}> = ({ active, onClick, icon: Icon, label, count }) => (
  <button onClick={onClick}
    className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap
      ${active ? 'bg-indigo-600 text-black shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}>
    <Icon className="w-4 h-4" />
    <span>{label}</span>
    {count !== undefined && count > 0 && (
      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md min-w-[20px] text-center
        ${active ? 'bg-white/20 text-black' : 'bg-slate-100 text-slate-500'}`}>
        {count}
      </span>
    )}
  </button>
);

// ═══════════════════════════════════════════════════════════════
// CRM OVERVIEW TAB
// ═══════════════════════════════════════════════════════════════

const OverviewTab: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [healthRes, crossRes, renewRes, dormantRes] = await Promise.allSettled([
          api.get('/crm/health-scores'),
          api.get('/crm/cross-sell?status=OPEN'),
          api.get('/crm/renewals'),
          api.get('/crm/dormant-clients'),
        ]);
        const scores = healthRes.status === 'fulfilled' ? healthRes.value.data.scores || [] : [];
        const opps = crossRes.status === 'fulfilled' ? crossRes.value.data.opportunities || [] : [];
        const renewals = renewRes.status === 'fulfilled' ? renewRes.value.data.renewals || [] : [];
        const dormant = dormantRes.status === 'fulfilled' ? dormantRes.value.data.clients || [] : [];

        setStats({
          totalClients: scores.length,
          atRisk: scores.filter((s: any) => s.churnRisk === 'HIGH').length,
          avgHealth: scores.length ? Math.round(scores.reduce((a: number, s: any) => a + s.score, 0) / scores.length) : 0,
          openOpps: opps.length,
          oppRevenue: opps.reduce((a: number, o: any) => a + (o.potentialRevenue || 0), 0),
          expiringSoon: renewals.filter((r: any) => r.status === 'EXPIRING_SOON').length,
          dormantCount: dormant.length,
          totalRenewals: renewals.length,
          dormantClients: dormant.slice(0, 5),
          topAtRisk: scores.filter((s: any) => s.churnRisk === 'HIGH').slice(0, 4),
          topOpps: opps.sort((a: any, b: any) => (b.potentialRevenue || 0) - (a.potentialRevenue || 0)).slice(0, 4),
        });
      } catch { /* silent */ }
      finally { setLoading(false); }
    })();
  }, []);

  if (loading) return <div className="flex items-center justify-center py-20"><RefreshCw className="w-6 h-6 text-slate-300 animate-spin" /></div>;
  if (!stats) return <EmptyState icon={BarChart3} title="Unable to load CRM overview" />;

  return (
    <div className="space-y-8">
      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Total Clients Tracked" value={stats.totalClients} icon={Users} color="bg-indigo-50 text-indigo-600" />
        <KPICard label="Clients At Risk" value={stats.atRisk} icon={AlertTriangle} color="bg-red-50 text-red-500"
          change={stats.atRisk > 0 ? 'Action needed' : 'All clear'} trend={stats.atRisk > 0 ? 'down' : 'up'} />
        <KPICard label="Cross-Sell Pipeline" value={`₹${(stats.oppRevenue / 1000).toFixed(0)}K`} icon={TrendingUp} color="bg-emerald-50 text-emerald-600"
          change={`${stats.openOpps} open`} trend="up" />
        <KPICard label="Dormant Clients" value={stats.dormantCount} icon={ClipboardList} color="bg-amber-50 text-amber-600"
          change={stats.expiringSoon > 0 ? `${stats.expiringSoon} expiring` : ''} trend={stats.dormantCount > 0 ? 'down' : 'neutral'} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* At-Risk Clients */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-red-500" />
              </div>
              <h3 className="font-bold text-slate-800">At-Risk Clients</h3>
            </div>
            <button onClick={() => onNavigate('health')} className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              View All <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {stats.topAtRisk.length === 0 ? (
              <div className="px-6 py-8 text-center text-slate-400 text-sm">No at-risk clients</div>
            ) : stats.topAtRisk.map((s: any) => (
              <div key={s.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold text-slate-600">
                    {(s.user?.name || '?').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{s.user?.name || `User #${s.userId}`}</p>
                    <p className="text-xs text-slate-400">{s.user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ScoreRing value={s.score} size={40} color={s.score < 40 ? '#ef4444' : s.score < 70 ? '#f59e0b' : '#22c55e'} />
                  <Badge text="HIGH RISK" variant="danger" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Cross-Sell Opportunities */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="font-bold text-slate-800">Top Revenue Opportunities</h3>
            </div>
            <button onClick={() => onNavigate('crosssell')} className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              View All <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {stats.topOpps.length === 0 ? (
              <div className="px-6 py-8 text-center text-slate-400 text-sm">No open opportunities</div>
            ) : stats.topOpps.map((o: any) => (
              <div key={o.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{o.client?.name || `User #${o.userId}`}</p>
                  <p className="text-xs text-slate-400">{o.serviceName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-emerald-600">₹{(o.potentialRevenue || 0).toLocaleString()}</p>
                  <Badge text={o.priority} variant={o.priority === 'HIGH' ? 'danger' : o.priority === 'MEDIUM' ? 'warning' : 'info'} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dormant Clients */}
      {stats.dormantClients.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <h3 className="font-bold text-slate-800">Dormant Clients (90+ days inactive)</h3>
            </div>
            <button onClick={() => onNavigate('client360')} className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              View 360 <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {stats.dormantClients.map((c: any) => (
              <div key={c.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-amber-50 rounded-full flex items-center justify-center text-xs font-bold text-amber-600">
                    {(c.name || '?').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{c.name}</p>
                    <p className="text-xs text-slate-400">{c.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge text="DORMANT" variant="warning" />
                  {c.lastActivity && (
                    <p className="text-[10px] text-slate-400 mt-1">
                      Last: {new Date(c.lastActivity).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// HEALTH SCORES TAB
// ═══════════════════════════════════════════════════════════════

const HealthScoresTab: React.FC = () => {
  const [scores, setScores] = useState<HealthScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [riskFilter, setRiskFilter] = useState('');
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await api.get('/crm/health-scores' + (riskFilter ? `?risk=${riskFilter}` : ''));
      setScores(r.data.scores || []);
    } catch { toast.error('Failed to load health scores'); }
    finally { setLoading(false); }
  }, [riskFilter]);

  useEffect(() => { load(); }, [load]);

  const filtered = scores.filter(s =>
    !search || s.user?.name?.toLowerCase().includes(search.toLowerCase()) || s.user?.email?.toLowerCase().includes(search.toLowerCase())
  );

  const riskColor = (risk: string) => risk === 'HIGH' ? '#ef4444' : risk === 'MEDIUM' ? '#f59e0b' : '#22c55e';

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search clients..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition" />
        </div>
        <div className="flex gap-2">
          {[{ k: '', l: 'All' }, { k: 'HIGH', l: 'High Risk' }, { k: 'MEDIUM', l: 'Medium' }, { k: 'LOW', l: 'Healthy' }].map(f => (
            <button key={f.k} onClick={() => setRiskFilter(f.k)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border
                ${riskFilter === f.k ? 'bg-indigo-600 text-black border-indigo-600 shadow-md shadow-indigo-200' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}>
              {f.l}
            </button>
          ))}
        </div>
      </div>

      {loading ? <div className="flex justify-center py-16"><RefreshCw className="w-6 h-6 text-slate-300 animate-spin" /></div> : (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          {filtered.length === 0 ? (
            <EmptyState icon={Activity} title="No health scores found" subtitle="Run the automation engine to calculate scores" />
          ) : (
            <div className="divide-y divide-slate-50">
              {filtered.map(s => (
                <div key={s.id} className="px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-slate-50/50 transition-colors">
                  {/* Avatar + Info */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-11 h-11 bg-gradient-to-br from-indigo-100 to-slate-100 rounded-full flex items-center justify-center text-sm font-bold text-indigo-600 shrink-0">
                      {(s.user?.name || '?').charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-bold text-slate-800 truncate">{s.user?.name || `User #${s.userId}`}</p>
                        <Badge text={s.churnRisk} variant={s.churnRisk === 'HIGH' ? 'danger' : s.churnRisk === 'MEDIUM' ? 'warning' : 'success'} />
                      </div>
                      <p className="text-xs text-slate-400 truncate">{s.user?.email}</p>
                      {s.lastActivity && (
                        <p className="text-[10px] text-slate-300 mt-0.5">Last active: {new Date(s.lastActivity).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                      )}
                    </div>
                  </div>

                  {/* Score Bars */}
                  <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-4">
                      {[
                        { label: 'Engage', val: s.engagementScore, col: '#6366f1' },
                        { label: 'Payment', val: s.paymentScore, col: '#22c55e' },
                        { label: 'Docs', val: s.documentScore, col: '#a855f7' },
                      ].map(sub => (
                        <div key={sub.label} className="w-16 text-center">
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1">
                            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${sub.val}%`, backgroundColor: sub.col }} />
                          </div>
                          <span className="text-[9px] text-slate-400 font-medium">{sub.label}</span>
                        </div>
                      ))}
                    </div>
                    <ScoreRing value={s.score} size={48} color={riskColor(s.churnRisk)} />
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

// ═══════════════════════════════════════════════════════════════
// CROSS-SELL PIPELINE TAB
// ═══════════════════════════════════════════════════════════════

const CrossSellTab: React.FC = () => {
  const [opps, setOpps] = useState<CrossSell[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('OPEN');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await api.get(`/crm/cross-sell?status=${statusFilter}`);
      setOpps(r.data.opportunities || []);
    } catch { toast.error('Failed to load pipeline'); }
    finally { setLoading(false); }
  }, [statusFilter]);

  useEffect(() => { load(); }, [load]);

  const act = async (id: number, action: string) => {
    try { await api.post(`/crm/cross-sell/${id}/${action}`); toast.success(`Updated`); load(); }
    catch { toast.error('Action failed'); }
  };

  const totalRevenue = opps.reduce((s, o) => s + (o.potentialRevenue || 0), 0);

  return (
    <div className="space-y-6">
      {/* Summary Bar */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-black">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-emerald-100 text-xs font-semibold uppercase tracking-widest">Pipeline Value</p>
            <p className="text-3xl font-black mt-1">₹{totalRevenue.toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-black">{opps.length}</p>
              <p className="text-emerald-100 text-[10px] uppercase tracking-widest">Opportunities</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black">{opps.filter(o => o.priority === 'HIGH').length}</p>
              <p className="text-emerald-100 text-[10px] uppercase tracking-widest">High Priority</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['OPEN', 'CONTACTED', 'CONVERTED', 'DISMISSED'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border
              ${statusFilter === s ? 'bg-indigo-600 text-black border-indigo-600 shadow-md shadow-indigo-200' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}>
            {s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {loading ? <div className="flex justify-center py-16"><RefreshCw className="w-6 h-6 text-slate-300 animate-spin" /></div> : (
        <div className="space-y-3">
          {opps.length === 0 ? (
            <EmptyState icon={TrendingUp} title={`No ${statusFilter.toLowerCase()} opportunities`} />
          ) : opps.map(o => (
            <div key={o.id} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md hover:shadow-slate-100 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                    ${o.priority === 'HIGH' ? 'bg-red-50 text-red-500' : o.priority === 'MEDIUM' ? 'bg-amber-50 text-amber-500' : 'bg-blue-50 text-blue-500'}`}>
                    <Target className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-bold text-slate-800">{o.client?.name || `User #${o.userId}`}</p>
                      <Badge text={o.priority} variant={o.priority === 'HIGH' ? 'danger' : o.priority === 'MEDIUM' ? 'warning' : 'info'} />
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">Recommend: <strong>{o.serviceName}</strong></p>
                    <p className="text-xs text-slate-400 mt-0.5">{o.reason}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-lg font-black text-emerald-600">₹{(o.potentialRevenue || 0).toLocaleString()}</p>
                </div>
              </div>
              {o.status === 'OPEN' && (
                <div className="flex gap-2 mt-4 pt-4 border-t border-slate-50">
                  <button onClick={() => act(o.id, 'contact')} className="px-4 py-2 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl text-xs font-semibold hover:bg-blue-100 transition flex items-center gap-1.5">
                    <Phone className="w-3 h-3" /> Contacted
                  </button>
                  <button onClick={() => act(o.id, 'convert')} className="px-4 py-2 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl text-xs font-semibold hover:bg-emerald-100 transition flex items-center gap-1.5">
                    <CheckCircle className="w-3 h-3" /> Converted
                  </button>
                  <button onClick={() => act(o.id, 'dismiss')} className="px-4 py-2 bg-slate-50 text-slate-500 border border-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-100 transition flex items-center gap-1.5">
                    <X className="w-3 h-3" /> Dismiss
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

// ═══════════════════════════════════════════════════════════════
// RENEWALS TAB
// ═══════════════════════════════════════════════════════════════

const RenewalsTab: React.FC = () => {
  const [renewals, setRenewals] = useState<Renewal[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await api.get('/crm/renewals' + (statusFilter ? `?status=${statusFilter}` : ''));
      setRenewals(r.data.renewals || []);
    } catch { toast.error('Failed to load renewals'); }
    finally { setLoading(false); }
  }, [statusFilter]);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        {[{ k: '', l: 'All' }, { k: 'ACTIVE', l: 'Active' }, { k: 'EXPIRING_SOON', l: 'Expiring Soon' }, { k: 'EXPIRED', l: 'Expired' }, { k: 'RENEWED', l: 'Renewed' }].map(f => (
          <button key={f.k} onClick={() => setStatusFilter(f.k)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border
              ${statusFilter === f.k ? 'bg-indigo-600 text-black border-indigo-600 shadow-md shadow-indigo-200' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}>
            {f.l}
          </button>
        ))}
      </div>

      {loading ? <div className="flex justify-center py-16"><RefreshCw className="w-6 h-6 text-slate-300 animate-spin" /></div> : (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          {renewals.length === 0 ? (
            <EmptyState icon={Calendar} title="No renewals found" />
          ) : (
            <div className="divide-y divide-slate-50">
              {renewals.map(r => {
                const daysLeft = r.expiresAt ? Math.ceil((new Date(r.expiresAt).getTime() - Date.now()) / 86400000) : null;
                const urgency = daysLeft !== null ? (daysLeft <= 0 ? 'danger' : daysLeft <= 30 ? 'warning' : 'success') : 'neutral';
                return (
                  <div key={r.id} className="px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-slate-50/50 transition-colors">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                      ${urgency === 'danger' ? 'bg-red-50 text-red-500' : urgency === 'warning' ? 'bg-amber-50 text-amber-500' : 'bg-emerald-50 text-emerald-500'}`}>
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-bold text-slate-800">{r.client?.name || `User #${r.userId}`}</p>
                        <Badge text={r.status.replace('_', ' ')} variant={urgency} />
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{r.serviceName} {r.planType && `· ${r.planType}`}</p>
                      <p className="text-xs text-slate-400">{r.client?.email}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-slate-700">
                        {r.expiresAt ? new Date(r.expiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                      </p>
                      {daysLeft !== null && (
                        <p className={`text-[10px] font-bold uppercase tracking-widest
                          ${urgency === 'danger' ? 'text-red-500' : urgency === 'warning' ? 'text-amber-500' : 'text-emerald-500'}`}>
                          {daysLeft <= 0 ? `${Math.abs(daysLeft)}d overdue` : `${daysLeft}d left`}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// CLIENT 360 TAB
// ═══════════════════════════════════════════════════════════════

const Client360Tab: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [data, setData] = useState<Client360 | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('orders');

  const load = async () => {
    if (!userId.trim()) return toast.error('Enter a User ID');
    setLoading(true); setData(null);
    try {
      const r = await api.get(`/crm/client-360/${userId}`);
      setData(r.data);
    } catch (e: any) {
      toast.error(e?.response?.data?.error || 'Client not found');
    } finally { setLoading(false); }
  };

  const riskColor = (risk: string) => risk === 'HIGH' ? '#ef4444' : risk === 'MEDIUM' ? '#f59e0b' : '#22c55e';
  const typeConfig: Record<string, { color: string; icon: React.ElementType }> = {
    CALL: { color: 'bg-blue-50 text-blue-600 border-blue-100', icon: Phone },
    MEETING: { color: 'bg-violet-50 text-violet-600 border-violet-100', icon: Users },
    EMAIL: { color: 'bg-cyan-50 text-cyan-600 border-cyan-100', icon: Mail },
    WHATSAPP: { color: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: Send },
    NOTE: { color: 'bg-slate-50 text-slate-600 border-slate-100', icon: FileText },
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Look Up Client by User ID</p>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={userId} onChange={e => setUserId(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && load()}
              placeholder="Enter User ID (e.g. 42)" type="number"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition" />
          </div>
          <button onClick={load} disabled={loading}
            className="px-6 py-2.5 bg-indigo-600 text-black rounded-xl text-sm font-bold hover:bg-indigo-700 transition shadow-md shadow-indigo-200 disabled:opacity-50 flex items-center gap-2">
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />} View 360
          </button>
        </div>
      </div>

      {loading && <div className="flex justify-center py-16"><RefreshCw className="w-6 h-6 text-slate-300 animate-spin" /></div>}

      {data && (
        <div className="space-y-6">
          {/* Client Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-black">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-black">
                  {data.client.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-black">{data.client.name}</h2>
                  <p className="text-indigo-200 text-sm">{data.client.email} · {data.client.phone || 'No phone'}</p>
                  <p className="text-indigo-300 text-xs mt-0.5">
                    Client since {new Date(data.client.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ScoreRing value={data.healthScore.score} size={56} color={riskColor(data.healthScore.churnRisk)} />
                <div>
                  <p className="text-sm font-bold">Health Score</p>
                  <Badge text={data.healthScore.churnRisk + ' RISK'}
                    variant={data.healthScore.churnRisk === 'HIGH' ? 'danger' : data.healthScore.churnRisk === 'MEDIUM' ? 'warning' : 'success'} />
                </div>
              </div>
            </div>
          </div>

          {/* Summary KPIs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { label: 'Total Orders', value: data.summary.totalOrders, color: 'bg-indigo-50 text-indigo-600' },
              { label: 'Revenue', value: `₹${(data.summary.totalRevenue / 1000).toFixed(1)}K`, color: 'bg-emerald-50 text-emerald-600' },
              { label: 'Active Services', value: data.summary.activeServices, color: 'bg-blue-50 text-blue-600' },
              { label: 'Open Tickets', value: data.summary.openTickets, color: 'bg-amber-50 text-amber-600' },
              { label: 'Documents', value: data.summary.totalDocuments, color: 'bg-violet-50 text-violet-600' },
            ].map(s => (
              <div key={s.label} className={`${s.color} rounded-xl p-4 text-center`}>
                <p className="text-2xl font-black">{s.value}</p>
                <p className="text-[10px] font-semibold uppercase tracking-widest opacity-70 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Section Tabs */}
          <div className="flex gap-2 flex-wrap">
            {[
              { k: 'orders', l: 'Orders', count: data.orders.length },
              { k: 'renewals', l: 'Renewals', count: data.renewals.length },
              { k: 'crosssell', l: 'Cross-Sell', count: data.crossSellOpportunities.length },
              { k: 'tickets', l: 'Tickets', count: data.tickets.length },
              { k: 'notes', l: 'Notes', count: data.notes.length },
            ].map(s => (
              <button key={s.k} onClick={() => setActiveSection(s.k)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border flex items-center gap-1.5
                  ${activeSection === s.k ? 'bg-indigo-600 text-black border-indigo-600 shadow-md shadow-indigo-200' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}>
                {s.l}
                {s.count > 0 && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded min-w-[16px] text-center
                    ${activeSection === s.k ? 'bg-white/20' : 'bg-slate-100'}`}>{s.count}</span>
                )}
              </button>
            ))}
          </div>

          {/* Orders */}
          {activeSection === 'orders' && (
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              {data.orders.length === 0 ? <EmptyState icon={Briefcase} title="No orders found" /> : (
                <div className="divide-y divide-slate-50">
                  {data.orders.map((o: any) => (
                    <div key={o.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">Order #{o.id}</p>
                        <p className="text-xs text-slate-400">{new Date(o.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{o.items?.length || 0} items</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-emerald-600">₹{(o.totalAmount || 0).toLocaleString()}</p>
                        <Badge text={o.status || 'PENDING'}
                          variant={o.status === 'COMPLETED' ? 'success' : o.status === 'CANCELLED' ? 'danger' : 'warning'} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Renewals */}
          {activeSection === 'renewals' && (
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              {data.renewals.length === 0 ? <EmptyState icon={Calendar} title="No renewals" /> : (
                <div className="divide-y divide-slate-50">
                  {data.renewals.map((r: any) => {
                    const daysLeft = r.expiresAt ? Math.ceil((new Date(r.expiresAt).getTime() - Date.now()) / 86400000) : null;
                    const urgency = daysLeft !== null ? (daysLeft <= 0 ? 'danger' : daysLeft <= 30 ? 'warning' : 'success') : 'neutral';
                    return (
                      <div key={r.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{r.serviceName}</p>
                          <p className="text-xs text-slate-400">{r.planType}</p>
                        </div>
                        <div className="text-right">
                          <Badge text={r.status?.replace('_', ' ')} variant={urgency} />
                          {daysLeft !== null && (
                            <p className={`text-[10px] font-bold mt-1 ${urgency === 'danger' ? 'text-red-500' : urgency === 'warning' ? 'text-amber-500' : 'text-emerald-500'}`}>
                              {daysLeft <= 0 ? `${Math.abs(daysLeft)}d overdue` : `${daysLeft}d left`}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Cross-Sell Opportunities */}
          {activeSection === 'crosssell' && (
            <div className="space-y-3">
              {data.crossSellOpportunities.length === 0 ? <EmptyState icon={TrendingUp} title="No open opportunities" /> : (
                data.crossSellOpportunities.map((o: any) => (
                  <div key={o.id} className="bg-white rounded-2xl border border-slate-100 p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-slate-800">{o.serviceName}</p>
                          <Badge text={o.priority} variant={o.priority === 'HIGH' ? 'danger' : o.priority === 'MEDIUM' ? 'warning' : 'info'} />
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{o.reason}</p>
                      </div>
                      <p className="text-lg font-black text-emerald-600">₹{(o.potentialRevenue || 0).toLocaleString()}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tickets */}
          {activeSection === 'tickets' && (
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              {data.tickets.length === 0 ? <EmptyState icon={MessageSquare} title="No tickets" /> : (
                <div className="divide-y divide-slate-50">
                  {data.tickets.map((t: any) => (
                    <div key={t.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{t.subject}</p>
                        <p className="text-xs text-slate-400">{new Date(t.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                      </div>
                      <Badge text={t.status} variant={t.status === 'OPEN' ? 'warning' : t.status === 'CLOSED' ? 'success' : 'neutral'} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Notes */}
          {activeSection === 'notes' && (
            <div className="space-y-3">
              {data.notes.length === 0 ? <EmptyState icon={FileText} title="No notes yet" /> : (
                data.notes.map((n: any) => {
                  const cfg = typeConfig[n.type] || typeConfig.NOTE;
                  const Icon = cfg.icon;
                  return (
                    <div key={n.id} className={`bg-white rounded-2xl border p-5 ${n.isImportant ? 'border-amber-200' : 'border-slate-100'}`}>
                      <div className="flex items-start gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${cfg.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge text={n.type} variant="neutral" />
                            {n.isImportant === 1 && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                            <span className="text-[10px] text-slate-300">{new Date(n.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                          </div>
                          <p className="text-sm text-slate-700">{n.content}</p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      )}

      {!data && !loading && (
        <EmptyState icon={Eye} title="Enter a User ID to view the complete client profile" subtitle="Orders, renewals, health score, tickets, and communication history" />
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// CLIENT NOTES TAB
// ═══════════════════════════════════════════════════════════════

const NotesTab: React.FC = () => {
  const [clientId, setClientId] = useState('');
  const [clientName, setClientName] = useState('');
  const [notes, setNotes] = useState<ClientNote[]>([]);
  const [loading, setLoading] = useState(false);
  const [newNote, setNewNote] = useState({ type: 'NOTE', content: '', followUpDate: '', isImportant: false });

  const load = async () => {
    if (!clientId) return;
    setLoading(true);
    try {
      const r = await api.get(`/crm/notes/${clientId}`);
      setNotes(r.data.notes || []);
      setClientName(r.data.clientName || `Client #${clientId}`);
    } catch { toast.error('Failed to load notes'); }
    finally { setLoading(false); }
  };

  const addNote = async () => {
    if (!clientId || !newNote.content.trim()) return toast.error('Content is required');
    try {
      await api.post(`/crm/notes/${clientId}`, newNote);
      toast.success('Note added');
      setNewNote({ type: 'NOTE', content: '', followUpDate: '', isImportant: false });
      load();
    } catch { toast.error('Failed to add note'); }
  };

  const deleteNote = async (noteId: number) => {
    try {
      await api.delete(`/crm/notes/${noteId}`);
      toast.success('Deleted');
      setNotes(n => n.filter(x => x.id !== noteId));
    } catch { toast.error('Failed to delete'); }
  };

  const typeConfig: Record<string, { color: string; icon: React.ElementType }> = {
    CALL: { color: 'bg-blue-50 text-blue-600 border-blue-100', icon: Phone },
    MEETING: { color: 'bg-violet-50 text-violet-600 border-violet-100', icon: Users },
    EMAIL: { color: 'bg-cyan-50 text-cyan-600 border-cyan-100', icon: Mail },
    WHATSAPP: { color: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: Send },
    NOTE: { color: 'bg-slate-50 text-slate-600 border-slate-100', icon: FileText },
  };

  return (
    <div className="space-y-6">
      {/* Client Search */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Search Client</p>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={clientId} onChange={e => setClientId(e.target.value)}
              placeholder="Enter Client User ID" type="number"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition" />
          </div>
          <button onClick={load} className="px-6 py-2.5 bg-indigo-600 text-black rounded-xl text-sm font-bold hover:bg-indigo-700 transition shadow-md shadow-indigo-200">
            Load
          </button>
        </div>
      </div>

      {/* Add Note Form */}
      {clientId && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            New Entry {clientName && `· ${clientName}`}
          </p>
          <div className="flex gap-2 flex-wrap mb-4">
            {Object.entries(typeConfig).map(([key, cfg]) => {
              const Icon = cfg.icon;
              return (
                <button key={key} onClick={() => setNewNote(n => ({ ...n, type: key }))}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border flex items-center gap-1.5
                    ${newNote.type === key ? 'bg-indigo-600 text-black border-indigo-600' : `${cfg.color} border hover:opacity-80`}`}>
                  <Icon className="w-3.5 h-3.5" /> {key}
                </button>
              );
            })}
          </div>
          <textarea value={newNote.content} onChange={e => setNewNote(n => ({ ...n, content: e.target.value }))}
            placeholder="Write your note..."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none h-24 mb-3" />
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <input type="date" value={newNote.followUpDate} onChange={e => setNewNote(n => ({ ...n, followUpDate: e.target.value }))}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
              <label className="flex items-center gap-2 text-sm text-slate-500 cursor-pointer select-none">
                <input type="checkbox" checked={newNote.isImportant} onChange={e => setNewNote(n => ({ ...n, isImportant: e.target.checked }))}
                  className="w-4 h-4 rounded accent-amber-500" />
                <Star className="w-3.5 h-3.5 text-amber-400" /> Important
              </label>
            </div>
            <button onClick={addNote} className="px-6 py-2.5 bg-indigo-600 text-black rounded-xl text-sm font-bold hover:bg-indigo-700 transition shadow-md shadow-indigo-200 flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" /> Add Note
            </button>
          </div>
        </div>
      )}

      {/* Notes Timeline */}
      {loading ? <div className="flex justify-center py-12"><RefreshCw className="w-6 h-6 text-slate-300 animate-spin" /></div> : (
        <div className="space-y-3">
          {notes.map(n => {
            const cfg = typeConfig[n.type] || typeConfig.NOTE;
            const Icon = cfg.icon;
            return (
              <div key={n.id} className={`bg-white rounded-2xl border p-5 hover:shadow-md hover:shadow-slate-100 transition-all
                ${n.isImportant ? 'border-amber-200' : 'border-slate-100'}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${cfg.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <Badge text={n.type} variant={n.type === 'CALL' ? 'info' : n.type === 'MEETING' ? 'purple' : n.type === 'EMAIL' ? 'info' : n.type === 'WHATSAPP' ? 'success' : 'neutral'} />
                      {n.isImportant === 1 && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                      <span className="text-[10px] text-slate-300">
                        {new Date(n.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{n.content}</p>
                    {n.followUpDate && (
                      <div className="flex items-center gap-1.5 mt-2 text-amber-600">
                        <Calendar className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Follow-up: {new Date(n.followUpDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  <button onClick={() => deleteNote(n.id)} className="p-2 text-slate-300 hover:text-red-400 hover:bg-red-50 rounded-lg transition shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
          {clientId && notes.length === 0 && !loading && (
            <EmptyState icon={MessageSquare} title="No notes yet" subtitle="Add your first communication log above" />
          )}
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// AUTOMATION TAB
// ═══════════════════════════════════════════════════════════════

const AutomationTab: React.FC = () => {
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<any>(null);

  const run = async () => {
    setRunning(true); setResult(null);
    try {
      const r = await api.get('/crm/run-automation');
      setResult(r.data);
      toast.success('Automation completed!');
    } catch { toast.error('Automation failed'); }
    finally { setRunning(false); }
  };

  const engines = [
    { title: 'Service Expiry Check', desc: 'Marks services as EXPIRING_SOON or EXPIRED based on dates', icon: Clock, color: 'bg-amber-50 text-amber-600 border-amber-100' },
    { title: 'Client Health Scoring', desc: 'Recalculates engagement, payment, and document scores (0–100)', icon: Activity, color: 'bg-blue-50 text-blue-600 border-blue-100' },
    { title: 'Cross-Sell Detection', desc: 'Identifies clients missing high-value services', icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { title: 'Compliance Calendar', desc: 'Populates GST, ITR, TDS, ROC, PF/ESI deadline entries', icon: Calendar, color: 'bg-violet-50 text-violet-600 border-violet-100' },
  ];

  return (
    <div className="space-y-6">
      {/* Engine Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {engines.map(item => (
          <div key={item.title} className={`bg-white rounded-2xl border p-5 flex items-start gap-4 ${item.color.includes('border') ? '' : 'border-slate-100'}`}>
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${item.color}`}>
              <item.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">{item.title}</p>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Run Button */}
      <button onClick={run} disabled={running}
        className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-50 text-black rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-3 shadow-lg shadow-indigo-200">
        {running ? <><RefreshCw className="w-5 h-5 animate-spin" /> Running all engines...</> : <><Zap className="w-5 h-5" /> Run Daily Automation</>}
      </button>

      {/* Results */}
      {result && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <p className="text-sm font-bold text-emerald-800">Automation completed successfully</p>
          </div>
          <pre className="text-xs text-emerald-700 bg-emerald-100/50 rounded-xl p-4 overflow-auto max-h-64">{JSON.stringify(result.results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN CRM PAGE
// ═══════════════════════════════════════════════════════════════

export function AdminCRM() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (location.state && (location.state as any).tab) {
      setActiveTab((location.state as any).tab);
    }
  }, [location.state]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'health', label: 'Client Health', icon: Activity },
    { id: 'crosssell', label: 'Cross-Sell', icon: TrendingUp },
    { id: 'renewals', label: 'Renewals', icon: Calendar },
    { id: 'client360', label: 'Client 360', icon: Eye },
    { id: 'notes', label: 'Client Notes', icon: MessageSquare },
    { id: 'automation', label: 'Automation', icon: Zap },
  ];

  const tabTitles: Record<string, { title: string; subtitle: string }> = {
    overview: { title: 'CRM Overview', subtitle: 'Client growth, retention metrics, and pipeline at a glance' },
    health: { title: 'Client Health Scores', subtitle: 'Monitor engagement, payment behavior, and churn risk' },
    crosssell: { title: 'Cross-Sell Pipeline', subtitle: 'Revenue opportunities from existing clients' },
    renewals: { title: 'Service Renewals', subtitle: 'Track expiring and upcoming renewals' },
    client360: { title: 'Client 360 View', subtitle: 'Complete client profile — orders, renewals, tickets, and notes' },
    notes: { title: 'Client Notes', subtitle: 'Communication log — calls, meetings, emails, and notes' },
    automation: { title: 'Automation Engine', subtitle: 'Run daily scoring, expiry detection, and compliance checks' },
  };

  const current = tabTitles[activeTab] || tabTitles.overview;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">{current.title}</h1>
          <p className="text-sm text-slate-400 mt-1">{current.subtitle}</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {tabs.map(tab => (
            <TabButton
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              icon={tab.icon}
              label={tab.label}
            />
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-in fade-in duration-300">
          {activeTab === 'overview'   && <OverviewTab onNavigate={setActiveTab} />}
          {activeTab === 'health'     && <HealthScoresTab />}
          {activeTab === 'crosssell'  && <CrossSellTab />}
          {activeTab === 'renewals'   && <RenewalsTab />}
          {activeTab === 'client360'  && <Client360Tab />}
          {activeTab === 'notes'      && <NotesTab />}
          {activeTab === 'automation' && <AutomationTab />}
        </div>
      </div>
    </AdminLayout>
  );
}
