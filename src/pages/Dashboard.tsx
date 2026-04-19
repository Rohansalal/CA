import { Link } from 'react-router-dom';
import { useDashboardStats, useGrowthAnalytics, useServicesAnalytics } from '../api/hooks/useDashboard';
import { useLeadStats } from '../api/hooks/useLeads';
import { Badge } from '../components/ui/badge';
import {
  AlertTriangle,
  Clock,
  FileWarning,
  Users,
  Target,
  CheckSquare,
  UserCog,
  ArrowRight,
  RefreshCw,
  Activity,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import { useAuthStore } from '../store';

// ── Reusable alert card (top red/yellow banners) ──────────────────────────────
function AlertCard({
  icon: Icon,
  title,
  value,
  subtitle,
  color,
}: {
  icon: React.ElementType;
  title: string;
  value: number;
  subtitle: string;
  color: 'red' | 'orange' | 'rose';
}) {
  const colors = {
    red: 'border-red-400 text-red-600',
    orange: 'border-orange-400 text-orange-600',
    rose: 'border-rose-400 text-rose-600',
  };
  const iconColors = {
    red: 'text-red-500',
    orange: 'text-orange-500',
    rose: 'text-rose-500',
  };
  return (
    <div className={`bg-white rounded-xl border-l-4 ${colors[color]} shadow-sm p-5 flex items-start justify-between`}>
      <div>
        <p className="text-sm font-semibold text-slate-700">{title}</p>
        <p className={`text-3xl font-black mt-1 ${colors[color].split(' ')[1]}`}>{value}</p>
        <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
      </div>
      <Icon className={`w-6 h-6 ${iconColors[color]}`} />
    </div>
  );
}

// ── Stat card ──────────────────────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  iconBg,
  title,
  value,
  subtitle,
}: {
  icon: React.ElementType;
  iconBg: string;
  title: string;
  value: number | string;
  subtitle: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg} shrink-0`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-black text-slate-900">{value}</p>
        <p className="text-sm font-semibold text-slate-700 truncate">{title}</p>
        <p className="text-xs text-slate-400 mt-0.5 truncate">{subtitle}</p>
      </div>
    </div>
  );
}

const LEAD_COLORS: Record<string, string> = {
  'Closed Won': '#22d3ee',
  'Fee Finalization': '#3b82f6',
  NEW: '#6366f1',
  FOLLOW_UP: '#f59e0b',
  LOST: '#ef4444',
};

export function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const { data: stats, isLoading: statsLoading, refetch: refetchStats } = useDashboardStats();
  const { data: growth, isLoading: growthLoading } = useGrowthAnalytics();
  const { data: servicesAnalytics, isLoading: servicesLoading } = useServicesAnalytics();
  const { data: leadStats } = useLeadStats();

  const isLoading = statsLoading || growthLoading || servicesLoading;

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-slate-400 text-sm font-medium">Loading dashboard…</p>
      </div>
    );
  }

  const dashStats = (stats as any)?.stats;
  const recentActivity = (stats as any)?.recentActivity;
  const recentClients = recentActivity?.clients || recentActivity?.users || [];
  const recentLeads = recentActivity?.leads || [];

  // Monthly clients & renewals — from growth data
  const monthlyData = ((growth as any)?.growth || []).map((d: any) => ({
    month: d.name,
    clients: d.clients ?? d.users ?? 0,
    renewals: d.renewals ?? 0,
  }));

  // Lead pipeline donut
  const leadPipelineData = [
    { name: 'Closed Won', value: leadStats?.closedWon ?? 0 },
    { name: 'Fee Finalization', value: leadStats?.feeFinalization ?? 0 },
    { name: 'NEW', value: leadStats?.new ?? 0 },
    { name: 'FOLLOW_UP', value: leadStats?.followUp ?? 0 },
  ].filter((d) => d.value > 0);

  // Service trends
  const predefinedColors = ['#3b82f6', '#22d3ee', '#f59e0b', '#10b981', '#6366f1', '#ec4899'];
  const serviceTrendData = ((servicesAnalytics as any)?.analytics || [])
    .slice(0, 4)
    .map((s: any) => ({ name: s.name, value: s.totalPurchases }));

  // Build line chart data from monthly if available
  const serviceTrendMonthly = ((growth as any)?.growth || []).map((d: any) => {
    const row: Record<string, string | number> = { month: d.name };
    ((servicesAnalytics as any)?.analytics || []).slice(0, 4).forEach((s: any, i: number) => {
      row[s.name] = d[s.name] ?? i; // fallback for demo
    });
    return row;
  });

  const serviceNames = ((servicesAnalytics as any)?.analytics || []).slice(0, 4).map((s: any) => s.name);

  // Task / KPI numbers
  const overdueTasks = dashStats?.tasks?.overdue ?? 0;
  const expiringLicenses = 0; // From expiry API — placeholder
  const kycExpiring = 0;
  const totalClients = dashStats?.clients?.total ?? dashStats?.users?.total ?? 0;
  const totalLeads = leadStats?.total ?? dashStats?.leads?.total ?? 0;
  const activeTasks = dashStats?.tasks?.active ?? 0;
  const employees = dashStats?.employees?.total ?? 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-0.5">Welcome back, {user?.name ?? 'Admin'}</p>
        </div>
        <button
          onClick={() => refetchStats()}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Alert row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AlertCard icon={AlertTriangle} title="Overdue Tasks" value={overdueTasks} subtitle="Tasks past their due date" color="red" />
        <AlertCard icon={FileWarning} title="Expiring Licenses" value={expiringLicenses} subtitle="Expiring within 30 days" color="orange" />
        <AlertCard icon={Clock} title="KYC Expiring Soon" value={kycExpiring} subtitle="Documents needing renewal" color="rose" />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} iconBg="bg-green-500" title="Total Clients" value={totalClients} subtitle={`${dashStats?.clients?.active ?? 0} active`} />
        <StatCard icon={Target} iconBg="bg-blue-500" title="Total Leads" value={totalLeads} subtitle={`${leadStats?.converted ?? 0} successfully converted`} />
        <StatCard icon={CheckSquare} iconBg="bg-indigo-500" title="Active Tasks" value={activeTasks} subtitle="1 work items open" />
        <StatCard icon={UserCog} iconBg="bg-teal-500" title="Employees" value={employees} subtitle={`${employees} active team members`} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Clients & Renewals */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
          <h3 className="text-base font-bold text-slate-900">Monthly Clients &amp; Renewals</h3>
          <p className="text-xs text-slate-400 mt-0.5">New clients and renewals over the last 6 months</p>
          <div className="h-[220px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} allowDecimals={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Legend iconType="square" iconSize={10} wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="clients" fill="#3b82f6" radius={[4, 4, 0, 0]} name="clients" />
                <Bar dataKey="renewals" fill="#22d3ee" radius={[4, 4, 0, 0]} name="renewals" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Pipeline Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
          <h3 className="text-base font-bold text-slate-900">Lead Pipeline Distribution</h3>
          <p className="text-xs text-slate-400 mt-0.5">Breakdown of leads by status</p>
          <div className="flex items-center justify-between mt-2">
            <div className="h-[200px] w-[200px]">
              {leadPipelineData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={leadPipelineData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="none"
                    >
                      {leadPipelineData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={LEAD_COLORS[entry.name] ?? predefinedColors[index % predefinedColors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-300">
                  <Activity className="w-10 h-10" />
                </div>
              )}
            </div>
            <div className="flex-1 pl-4 space-y-2">
              {leadPipelineData.map((entry, i) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-sm shrink-0"
                    style={{ backgroundColor: LEAD_COLORS[entry.name] ?? predefinedColors[i % predefinedColors.length] }}
                  />
                  <span className="text-xs font-medium text-slate-600 flex-1 truncate">{entry.name}</span>
                  <span className="text-xs font-bold text-slate-900">{entry.value}</span>
                </div>
              ))}
              {leadPipelineData.length === 0 && (
                <p className="text-xs text-slate-400">No lead data yet</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Service Trends */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <h3 className="text-base font-bold text-slate-900">Service Trends</h3>
        <p className="text-xs text-slate-400 mt-0.5">Service usage trends over the last 6 months</p>
        <div className="h-[200px] mt-4">
          {serviceTrendMonthly.length > 0 && serviceNames.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={serviceTrendMonthly}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} allowDecimals={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                {serviceNames.map((name: string, i: number) => (
                  <Line
                    key={name}
                    type="monotone"
                    dataKey={name}
                    stroke={predefinedColors[i % predefinedColors.length]}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-sm text-slate-300">No service trend data yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom 3-column section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Clients */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Clients</h3>
              <p className="text-xs text-slate-400">Latest registered clients</p>
            </div>
            <Link
              to="/dashboard/clients"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentClients.length > 0 ? (
              recentClients.slice(0, 5).map((c: any) => (
                <div key={c.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs shrink-0">
                    {(c.name || c.businessName || '?').charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-800 truncate">{c.name || c.businessName}</p>
                    {(c.licenseNumber || c.email) && (
                      <p className="text-[11px] text-slate-400 truncate">
                        {c.licenseNumber ? `License: ${c.licenseNumber}` : c.email}
                      </p>
                    )}
                    <p className="text-[10px] text-slate-300">
                      Added: {new Date(c.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {c.status && (
                    <Badge
                      className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                        c.status === 'ACTIVE'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {c.status?.toLowerCase()}
                    </Badge>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400 py-4 text-center">No clients yet</p>
            )}
          </div>
        </div>

        {/* Recent Leads */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Leads</h3>
              <p className="text-xs text-slate-400">Latest captured leads</p>
            </div>
            <Link
              to="/dashboard/leads"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentLeads.length > 0 ? (
              recentLeads.slice(0, 5).map((lead: any) => (
                <div key={lead.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <Target className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-800 truncate">{lead.name}</p>
                    <p className="text-[11px] text-slate-400">
                      Captured: {new Date(lead.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <LeadStatusBadge status={lead.status} />
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400 py-4 text-center">No leads yet</p>
            )}
          </div>
        </div>

        {/* Upcoming Expiries */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">Upcoming Expiries</h3>
                <p className="text-xs text-slate-400">Documents expiring in the next 30 days</p>
              </div>
            </div>
            <Link
              to="/dashboard/expiry"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="py-8 text-center">
            <p className="text-sm text-slate-400">No upcoming expiries in the next 30 days</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeadStatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    FEE_FINALIZATION: { label: 'Fee Finalization', cls: 'bg-blue-100 text-blue-700' },
    CLOSED_WON: { label: 'Closed Won', cls: 'bg-cyan-100 text-cyan-700' },
    NEW: { label: 'New', cls: 'bg-slate-100 text-slate-600' },
    FOLLOW_UP: { label: 'Follow Up', cls: 'bg-amber-100 text-amber-700' },
    CONVERTED: { label: 'Converted', cls: 'bg-green-100 text-green-700' },
    LOST: { label: 'Lost', cls: 'bg-red-100 text-red-600' },
  };
  const cfg = map[status] ?? { label: status, cls: 'bg-slate-100 text-slate-600' };
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold whitespace-nowrap ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
}
