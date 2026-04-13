import React, { useState, useEffect } from "react";
import { 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Ticket, 
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Clock,
  MoreHorizontal,
  Filter,
  Download,
  RefreshCw,
  FileText,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Clock3
} from "lucide-react";
import { AdminLayout } from "../components/AdminLayout";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { cn } from "../../components/ui/utils";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
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
  Area,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";

interface DashboardStats {
  totalUsers: number;
  totalServices: number;
  totalRevenue: number;
  totalOrders: number;
  totalTickets: number;
  openTickets: number;
  revenueGrowth: number;
  userGrowth: number;
}

const revenueData = [
  { month: "Jan", revenue: 125000, target: 100000 },
  { month: "Feb", revenue: 145000, target: 120000 },
  { month: "Mar", revenue: 165000, target: 140000 },
  { month: "Apr", revenue: 190000, target: 160000 },
  { month: "May", revenue: 210000, target: 180000 },
  { month: "Jun", revenue: 245000, target: 200000 },
];

const serviceData = [
  { name: "Company Registration", value: 35, color: "#2563eb" },
  { name: "GST Filing", value: 25, color: "#7c3aed" },
  { name: "ITR Filing", value: 20, color: "#059669" },
  { name: "Compliance", value: 20, color: "#ea580c" },
];

const recentActivity = [
  { id: 1, user: "Rahul Sharma", action: "Purchased GST Registration", time: "2 min ago", status: "completed", amount: "₹2,999" },
  { id: 2, user: "Priya Patel", action: "Submitted ITR Documents", time: "15 min ago", status: "pending", amount: "-" },
  { id: 3, user: "Amit Kumar", action: "Payment Received", time: "1 hr ago", status: "completed", amount: "₹5,499" },
  { id: 4, user: "Sneha Gupta", action: "New Ticket Created", time: "2 hrs ago", status: "open", amount: "-" },
  { id: 5, user: "Vikram Singh", action: "Company Incorporation", time: "3 hrs ago", status: "completed", amount: "₹7,999" },
];

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState("Last 30 days");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/dashboard/admin');
      const dashData = res.data;
      setStats({
        totalUsers: dashData.stats.users.total || 0,
        totalServices: dashData.stats.services || 0,
        totalRevenue: dashData.stats.payments.totalRevenue || 0,
        totalOrders: dashData.stats.payments.total || 0,
        totalTickets: dashData.stats.tickets.total || 0,
        openTickets: dashData.stats.tickets.open || 0,
        revenueGrowth: 12.5,
        userGrowth: 8.3
      });
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to fetch dashboard data");
      // Set default stats for demo
      setStats({
        totalUsers: 1248,
        totalServices: 56,
        totalRevenue: 245000,
        totalOrders: 342,
        totalTickets: 28,
        openTickets: 12,
        revenueGrowth: 12.5,
        userGrowth: 8.3
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="flex flex-col items-center gap-3">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-slate-500">Loading dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Dashboard Overview</h1>
            <p className="text-slate-500 mt-1">Monitor your firm's performance and activities</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="h-4 w-4" />
              {dateRange}
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={fetchDashboardData}>
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Revenue"
            value={formatCurrency(stats?.totalRevenue || 0)}
            change={`+${stats?.revenueGrowth}%`}
            trend="up"
            icon={DollarSign}
            description="vs last month"
          />
          <StatCard 
            title="Active Clients"
            value={(stats?.totalUsers || 0).toLocaleString()}
            change={`+${stats?.userGrowth}%`}
            trend="up"
            icon={Users}
            description="vs last month"
          />
          <StatCard 
            title="Total Orders"
            value={(stats?.totalOrders || 0).toLocaleString()}
            change="+18.2%"
            trend="up"
            icon={ShoppingCart}
            description="vs last month"
          />
          <StatCard 
            title="Open Tickets"
            value={(stats?.openTickets || 0).toString()}
            change="-5.3%"
            trend="down"
            icon={Ticket}
            description="vs last month"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Revenue Overview</CardTitle>
                  <CardDescription>Monthly revenue vs targets</CardDescription>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    <span className="text-slate-600">Revenue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                    <span className="text-slate-600">Target</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      tickFormatter={(value) => `₹${value/1000}k`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value: number) => formatCurrency(value)}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#2563eb" 
                      strokeWidth={2}
                      fill="url(#colorRevenue)" 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="target" 
                      stroke="#94a3b8" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Service Distribution */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Service Distribution</CardTitle>
              <CardDescription>By order volume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={serviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {serviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {serviceData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-slate-600">{item.name}</span>
                    </div>
                    <span className="font-medium text-slate-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
                  <CardDescription>Latest transactions and updates</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-blue-600">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 bg-slate-100">
                        <AvatarFallback className="text-xs font-medium text-slate-600">
                          {activity.user.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{activity.user}</p>
                        <p className="text-xs text-slate-500">{activity.action}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-900">{activity.amount}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "text-xs",
                            activity.status === "completed" && "border-green-200 text-green-700 bg-green-50",
                            activity.status === "pending" && "border-amber-200 text-amber-700 bg-amber-50",
                            activity.status === "open" && "border-blue-200 text-blue-700 bg-blue-50"
                          )}
                        >
                          {activity.status}
                        </Badge>
                        <span className="text-xs text-slate-400">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Quick Stats</CardTitle>
              <CardDescription>This month's highlights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <QuickStat 
                icon={FileText}
                label="ITR Filings"
                value="48"
                trend="+12"
                color="text-blue-600 bg-blue-50"
              />
              <QuickStat 
                icon={Briefcase}
                label="Company Reg."
                value="23"
                trend="+5"
                color="text-violet-600 bg-violet-50"
              />
              <QuickStat 
                icon={CheckCircle2}
                label="Completed"
                value="156"
                trend="+28"
                color="text-green-600 bg-green-50"
              />
              <QuickStat 
                icon={Clock3}
                label="Pending"
                value="42"
                trend="-8"
                color="text-amber-600 bg-amber-50"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

// Stat Card Component
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ElementType;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, trend, icon: Icon, description }) => {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="p-2 bg-slate-100 rounded-lg">
            <Icon className="h-5 w-5 text-slate-600" />
          </div>
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium",
            trend === "up" ? "text-green-600" : "text-red-600"
          )}>
            {trend === "up" ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {change}
          </div>
        </div>
        <div className="mt-3">
          <p className="text-sm text-slate-500">{title}</p>
          <p className="text-2xl font-semibold text-slate-900 mt-1">{value}</p>
          <p className="text-xs text-slate-400 mt-1">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

// Quick Stat Component
interface QuickStatProps {
  icon: React.ElementType;
  label: string;
  value: string;
  trend: string;
  color: string;
}

const QuickStat: React.FC<QuickStatProps> = ({ icon: Icon, label, value, trend, color }) => {
  const isPositive = trend.startsWith('+');
  return (
    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className={cn("p-2 rounded-lg", color)}>
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-900">{value}</p>
          <p className="text-xs text-slate-500">{label}</p>
        </div>
      </div>
      <span className={cn(
        "text-xs font-medium",
        isPositive ? "text-green-600" : "text-red-600"
      )}>
        {trend}
      </span>
    </div>
  );
};
