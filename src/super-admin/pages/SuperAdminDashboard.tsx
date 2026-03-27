import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  DollarSign, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Ticket,
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  Search
} from 'lucide-react';
import { SuperAdminLayout } from '../components/SuperAdminLayout';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { cn } from '../../components/ui/utils';
import api from '../../utils/api';

interface DashboardStats {
  stats: {
    totalFirms: number;
    activeFirms: number;
    totalUsers: number;
    totalClients: number;
    totalRevenue: number;
    activeSubscriptions: number;
    openTickets: number;
    recentLeads: number;
  };
  growth: {
    firms: number;
    users: number;
    clients: number;
  };
}

const mockData = {
  stats: {
    totalFirms: 45,
    activeFirms: 38,
    totalUsers: 1250,
    totalClients: 8750,
    totalRevenue: 2456000,
    activeSubscriptions: 42,
    openTickets: 23,
    recentLeads: 156,
  },
  growth: {
    firms: 12,
    users: 8,
    clients: 15,
  },
  recentActivity: [
    { id: 1, user: 'ABC Consultants', action: 'New Firm Registration', time: '2 mins ago', status: 'completed' },
    { id: 2, user: 'Rahul Sharma', action: 'Upgraded to Premium Plan', time: '15 mins ago', status: 'completed' },
    { id: 3, user: 'XYZ & Associates', action: 'Payment Pending', time: '1 hour ago', status: 'pending' },
    { id: 4, user: 'John Doe', action: 'New Client Added', time: '2 hours ago', status: 'completed' },
    { id: 5, user: 'Tax Pros Ltd', action: 'Subscription Expired', time: '3 hours ago', status: 'warning' },
  ],
  monthlyRevenue: [
    { month: 'Jan', revenue: 180000 },
    { month: 'Feb', revenue: 195000 },
    { month: 'Mar', revenue: 210000 },
    { month: 'Apr', revenue: 225000 },
    { month: 'May', revenue: 240000 },
    { month: 'Jun', revenue: 265000 },
  ],
  planDistribution: {
    basic: 12,
    pro: 22,
    premium: 8,
    trial: 3,
  },
};

export const SuperAdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Use mock data for now, replace with API call
      // const response = await api.get('/super-admin/dashboard');
      // setStats(response.data);
      setTimeout(() => {
        setStats(mockData);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <SuperAdminLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium animate-pulse">Loading dashboard...</p>
          </div>
        </div>
      </SuperAdminLayout>
    );
  }

  return (
    <SuperAdminLayout>
      <div className="space-y-8 pb-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Platform Overview</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Super Admin Dashboard</h1>
            <p className="text-slate-500 font-medium">
              Monitor and manage your entire CA SaaS platform
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="h-10 px-4 rounded-lg font-semibold text-xs border-slate-200 hover:bg-slate-50 shadow-sm transition-all flex items-center gap-2">
              <ExternalLink className="h-3.5 w-3.5" /> View Public Site
            </Button>
            <Button className="h-10 px-4 rounded-lg font-semibold text-xs bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all">
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Revenue" 
            value={formatCurrency(stats?.stats.totalRevenue || 0)} 
            icon={DollarSign} 
            trend={`+${stats?.growth?.firms || 0}%`}
            trendUp={true}
            color="text-emerald-600 bg-emerald-50"
          />
          <StatCard 
            title="CA Firms" 
            value={(stats?.stats.totalFirms || 0).toString()} 
            icon={Building2} 
            trend={`+${stats?.growth?.firms || 0}%`}
            trendUp={true}
            color="text-indigo-600 bg-indigo-50"
          />
          <StatCard 
            title="Total Users" 
            value={(stats?.stats.totalUsers || 0).toString()} 
            icon={Users} 
            trend={`+${stats?.growth?.users || 0}%`}
            trendUp={true}
            color="text-purple-600 bg-purple-50"
          />
          <StatCard 
            title="Active Subscriptions" 
            value={(stats?.stats.activeSubscriptions || 0).toString()} 
            icon={CreditCard} 
            trend="+5%"
            trendUp={true}
            color="text-amber-600 bg-amber-50"
          />
        </div>

        {/* Charts & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Revenue Chart Placeholder */}
          <Card className="lg:col-span-8 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <CardHeader className="p-6 border-b border-slate-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold text-slate-900">Revenue Overview</CardTitle>
                  <CardDescription className="text-xs font-medium text-slate-500 mt-1">Monthly revenue trend</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-emerald-600">{formatCurrency(stats?.stats.totalRevenue || 0)}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[250px] flex items-end justify-between gap-2">
                {mockData.monthlyRevenue.map((item, index) => {
                  const maxRevenue = Math.max(...mockData.monthlyRevenue.map(m => m.revenue));
                  const height = (item.revenue / maxRevenue) * 200;
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-indigo-600 rounded-t-md transition-all hover:bg-indigo-700"
                        style={{ height: `${height}px` }}
                      ></div>
                      <span className="text-xs font-medium text-slate-500">{item.month}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Plan Distribution */}
          <Card className="lg:col-span-4 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <CardHeader className="p-6 border-b border-slate-50">
              <CardTitle className="text-lg font-bold text-slate-900">Plan Distribution</CardTitle>
              <CardDescription className="text-xs font-medium text-slate-500 mt-1">Active subscriptions by plan</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {Object.entries(mockData.planDistribution).map(([plan, count]) => (
                  <div key={plan} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-3 h-3 rounded-full",
                        plan === 'basic' ? "bg-blue-500" :
                        plan === 'pro' ? "bg-purple-500" :
                        plan === 'premium' ? "bg-amber-500" : "bg-slate-400"
                      )}></div>
                      <span className="text-sm font-medium text-slate-700 capitalize">{plan}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900">{count}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500">Total Active</span>
                  <span className="text-lg font-bold text-slate-900">
                    {Object.values(mockData.planDistribution).reduce((a, b) => a + b, 0)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <CardHeader className="p-6 border-b border-slate-50 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-slate-900">Recent Activity</CardTitle>
                <CardDescription className="text-xs font-medium text-slate-500 mt-1">Latest platform events</CardDescription>
              </div>
              <Button variant="ghost" className="text-xs font-semibold text-indigo-600 hover:bg-indigo-50">
                View All
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {mockData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        activity.status === 'completed' ? "bg-emerald-50" :
                        activity.status === 'pending' ? "bg-amber-50" : "bg-red-50"
                      )}>
                        {activity.status === 'completed' ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        ) : activity.status === 'pending' ? (
                          <Clock className="h-5 w-5 text-amber-600" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{activity.user}</p>
                        <p className="text-xs text-slate-500">{activity.action}</p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-emerald-600" />
              </div>
              <p className="text-2xl font-bold text-slate-900">{stats?.stats.totalClients?.toLocaleString() || 0}</p>
              <p className="text-xs font-medium text-slate-500 mt-1">Total Clients</p>
            </Card>
            
            <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                  <Ticket className="h-5 w-5 text-purple-600" />
                </div>
                <ArrowDownRight className="h-4 w-4 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-slate-900">{stats?.stats.openTickets || 0}</p>
              <p className="text-xs font-medium text-slate-500 mt-1">Open Tickets</p>
            </Card>
            
            <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-amber-600" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-emerald-600" />
              </div>
              <p className="text-2xl font-bold text-slate-900">{stats?.stats.activeFirms || 0}</p>
              <p className="text-xs font-medium text-slate-500 mt-1">Active Firms</p>
            </Card>
            
            <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-emerald-600" />
              </div>
              <p className="text-2xl font-bold text-slate-900">{stats?.stats.recentLeads || 0}</p>
              <p className="text-xs font-medium text-slate-500 mt-1">New Leads (30d)</p>
            </Card>
          </div>
        </div>
      </div>
    </SuperAdminLayout>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: any;
  trend: string;
  trendUp: boolean;
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

export default SuperAdminDashboard;