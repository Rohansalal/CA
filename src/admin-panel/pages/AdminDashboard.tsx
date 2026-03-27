import React, { useState, useEffect } from "react";
import { 
  Users, 
  ShoppingCart, 
  DollarSign, 
  MessageSquare, 
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  MoreVertical,
  ExternalLink,
  Shield,
  Search,
  Activity
} from "lucide-react";
import { AdminLayout } from "../components/AdminLayout";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { cn } from "../../components/ui/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import api from "../../utils/api";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

interface DashboardStats {
  totalUsers: number;
  totalAdmins: number;
  totalServices: number;
  totalServicesPurchased: number;
  totalRevenue: number;
  totalPayments: number;
  totalTickets: number;
  openTickets: number;
}

const data = [
  { name: "Jan", revenue: 4000, target: 3500, users: 240 },
  { name: "Feb", revenue: 3000, target: 3800, users: 139 },
  { name: "Mar", revenue: 5000, target: 4200, users: 980 },
  { name: "Apr", revenue: 4780, target: 4500, users: 390 },
  { name: "May", revenue: 5890, target: 5000, users: 480 },
  { name: "Jun", revenue: 6390, target: 5500, users: 380 },
];

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastSynced, setLastSynced] = useState<string>("");

  useEffect(() => {
    fetchDashboardData();
    setLastSynced(new Date().toLocaleTimeString());
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/dashboard/admin');
      const dashData = res.data;
      setStats({
        totalUsers: dashData.stats.users.total,
        totalAdmins: 0,
        totalServices: dashData.stats.services,
        totalServicesPurchased: dashData.stats.payments.total,
        totalRevenue: dashData.stats.payments.totalRevenue,
        totalPayments: dashData.stats.payments.total,
        totalTickets: dashData.stats.tickets.total,
        openTickets: dashData.stats.tickets.open
      });
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/20 border-t-primary"></div>
          <p className="text-muted-foreground font-medium animate-pulse">Syncing administrative intelligence...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8 pb-10">
        {/* Modern Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Analytics Dashboard</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">System Overview</h1>
            <p className="text-slate-500 font-medium">
              Welcome back, Admin. Here's what's happening with your platform today.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="h-10 px-4 rounded-lg font-semibold text-xs border-slate-200 hover:bg-slate-50 shadow-sm transition-all flex items-center gap-2 uppercase tracking-wider">
              <ExternalLink className="h-3.5 w-3.5" /> View Portal
            </Button>
            <Button className="h-10 px-4 rounded-lg font-semibold text-xs bg-indigo-600 text-black hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 uppercase tracking-wider">
              <TrendingUp className="h-3.5 w-3.5" /> Export Report
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Revenue" 
            value={`₹${stats?.totalRevenue.toLocaleString()}`} 
            icon={DollarSign} 
            trend="+12.5%" 
            trendUp={true}
            description="vs. last month"
            color="text-emerald-600 bg-emerald-50"
          />
          <StatCard 
            title="Total Users" 
            value={stats?.totalUsers.toString() || "0"} 
            icon={Users} 
            trend="+5.2%" 
            trendUp={true}
            description="vs. last month"
            color="text-indigo-600 bg-indigo-50"
          />
          <StatCard 
            title="Service Orders" 
            value={stats?.totalServicesPurchased.toString() || "0"} 
            icon={ShoppingCart} 
            trend="+18.4%" 
            trendUp={true}
            description="vs. last month"
            color="text-purple-600 bg-purple-50"
          />
          <StatCard 
            title="Active Tickets" 
            value={stats?.openTickets.toString() || "0"} 
            icon={MessageSquare} 
            trend="-2.1%" 
            trendUp={false}
            description="vs. last month"
            color="text-amber-600 bg-amber-50"
          />
        </div>

        {/* Analytics Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Revenue Chart */}
          <Card className="lg:col-span-8 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <CardHeader className="p-6 border-b border-slate-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold text-slate-900">Revenue Performance</CardTitle>
                  <CardDescription className="text-xs font-medium text-slate-500 mt-1">Monthly financial overview and targets</CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Actual</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Target</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#94a3b8" 
                      fontSize={11} 
                      fontWeight={500}
                      tickLine={false} 
                      axisLine={false} 
                      dy={10}
                    />
                    <YAxis 
                      stroke="#94a3b8" 
                      fontSize={11} 
                      fontWeight={500}
                      tickLine={false} 
                      axisLine={false} 
                      dx={-10}
                      tickFormatter={(value) => `₹${value}`} 
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#fff", 
                        border: "1px solid #E2E8F0", 
                        borderRadius: "12px",
                        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                        padding: "12px"
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="target" 
                      stroke="#E2E8F0" 
                      strokeWidth={2} 
                      fill="transparent"
                      strokeDasharray="5 5"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#4f46e5" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorRev)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* User Growth */}
          <Card className="lg:col-span-4 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <CardHeader className="p-6 border-b border-slate-50">
              <CardTitle className="text-lg font-bold text-slate-900">User Growth</CardTitle>
              <CardDescription className="text-xs font-medium text-slate-500 mt-1">Monthly new registrations</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#94a3b8" 
                      fontSize={11} 
                      fontWeight={500}
                      tickLine={false} 
                      axisLine={false} 
                      dy={10}
                    />
                    <YAxis 
                      stroke="#94a3b8" 
                      fontSize={11} 
                      fontWeight={500}
                      tickLine={false} 
                      axisLine={false} 
                      dx={-10}
                    />
                    <Tooltip 
                      cursor={{fill: "#F8FAFC", radius: 8}}
                      contentStyle={{ 
                        backgroundColor: "#fff", 
                        border: "1px solid #E2E8F0", 
                        borderRadius: "12px",
                        padding: "12px"
                      }}
                    />
                    <Bar 
                      dataKey="users" 
                      fill="#0f172a" 
                      radius={[6, 6, 0, 0]} 
                      barSize={24} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Global Activity Feed */}
        <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <CardHeader className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-bold text-slate-900">Recent Activity</CardTitle>
              <CardDescription className="text-xs font-medium text-slate-500 mt-1">Real-time log of system events and transactions</CardDescription>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Filter logs..."
                  className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400"
                />
              </div>
              <Button variant="ghost" className="h-10 px-4 rounded-lg text-[11px] font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-50 transition-all border border-slate-200">View All</Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">User</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Action / Service</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Time</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-all duration-200">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-700">
                            {['JD', 'AS', 'RK', 'MP', 'NL'][i-1]}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">{['John Doe', 'Anita Sharma', 'Rahul Kumar', 'Meera Patel', 'Nitin Lal'][i-1]}</p>
                            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Verified User</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm font-semibold text-slate-700">{['Private Limited Company', 'GST Return filing', 'Income Tax Audit', 'Trust Registration', 'PF Compliance'][i-1]}</p>
                        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">#ORD-2026-X0{i}</p>
                      </td>
                      <td className="px-6 py-5">
                        <div className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          i % 3 === 0 ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        )}>
                          <div className={cn("h-1 w-1 rounded-full", i % 3 === 0 ? "bg-amber-600 animate-pulse" : "bg-emerald-600")}></div>
                          {i % 3 === 0 ? "In Progress" : "Completed"}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Clock className="h-3.5 w-3.5" /> 
                          <span className="text-xs font-medium">{i * 2}h ago</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-slate-300 hover:text-indigo-600 hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-100">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: any;
  trend: string;
  trendUp: boolean;
  description: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, trendUp, color }) => {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", color)}>
          <Icon className="w-5 h-5" />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-[11px] font-bold",
          trendUp ? "text-emerald-600" : "text-rose-600"
        )}>
          {trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {trend}
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
      </div>
    </Card>
  );
};
