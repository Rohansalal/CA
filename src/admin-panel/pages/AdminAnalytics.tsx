import React, { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  ShoppingBag, 
  Calendar, 
  RefreshCw, 
  ArrowUpRight, 
  ArrowDownRight,
  PieChart as PieChartIcon,
  BarChart2,
  Activity,
  Zap,
  Shield,
  Clock
} from 'lucide-react';
import { AdminLayout } from "../components/AdminLayout";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { cn } from "../../components/ui/utils";
import { toast } from 'sonner';
import api from '../../utils/api';

interface GrowthData {
    name: string;
    users: number;
    revenue: number;
}

interface ServiceAnalytics {
    id: number;
    name: string;
    totalRevenue: number;
    totalPurchases: number;
    planBreakdown: Record<string, number>;
    statusBreakdown: Record<string, number>;
}

interface RevenueAnalytics {
    totalRevenue: number;
    totalTransactions: number;
    revenueByService: { userServiceId: number; _sum: { amount: number }; _count: number }[];
}

export const AdminAnalytics: React.FC = () => {
    const [growthData, setGrowthData] = useState<GrowthData[]>([]);
    const [serviceData, setServiceData] = useState<ServiceAnalytics[]>([]);
    const [revenueData, setRevenueData] = useState<RevenueAnalytics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const [growthRes, servicesRes, revenueRes] = await Promise.all([
                api.get('/admin/analytics/growth'),
                api.get('/admin/analytics/services'),
                api.get('/admin/analytics/revenue')
            ]);

            setGrowthData(growthRes.data.growth || []);
            setServiceData(servicesRes.data.analytics || []);
            setRevenueData(revenueRes.data);

        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || err.message || 'Failed to load analytics');
            toast.error('Failed to sync intelligence data');
        } finally {
            setLoading(false);
        }
    };

    const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-100 border-t-indigo-600"></div>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest animate-pulse">Syncing Analytics...</p>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Business Intelligence</span>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Analytics Hub</h1>
                        <p className="text-slate-500 font-medium">Deep-dive into platform performance and user growth trends.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button 
                            variant="outline" 
                            className="h-10 px-4 rounded-xl font-semibold text-xs border-slate-200 hover:bg-slate-50 shadow-sm transition-all"
                            onClick={fetchAnalytics}
                        >
                            <RefreshCw className={cn("h-3.5 w-3.5 mr-2", loading && "animate-spin")} /> Refresh
                        </Button>
                        <Button className="h-10 px-4 rounded-xl font-semibold text-xs bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all">
                            <BarChart2 className="h-3.5 w-3.5 mr-2" /> Export Report
                        </Button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <AnalyticsCard 
                        title="Total Revenue" 
                        value={`₹${(revenueData?.totalRevenue ?? 0).toLocaleString()}`}
                        icon={DollarSign} 
                        trend="+12.5%" 
                        trendUp={true}
                        status="success"
                    />
                    <AnalyticsCard 
                        title="Transactions" 
                        value={(revenueData?.totalTransactions ?? 0).toString()}
                        icon={ShoppingBag} 
                        trend="+5.2%" 
                        trendUp={true}
                        status="info"
                    />
                    <AnalyticsCard 
                        title="Active Services" 
                        value={serviceData.length.toString()} 
                        icon={Zap} 
                        trend="Healthy" 
                        trendUp={true}
                        status="default"
                    />
                    <AnalyticsCard 
                        title="New Users" 
                        value={growthData.length > 0 ? growthData[growthData.length - 1].users.toString() : "0"} 
                        icon={Users} 
                        trend="+18.4%" 
                        trendUp={true}
                        status="warning"
                    />
                </div>

                {/* Charts Matrix */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Growth Trends */}
                    <Card className="lg:col-span-8 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden group">
                        <CardHeader className="p-6 border-b border-slate-50 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-lg font-bold text-slate-900">Growth Trends</CardTitle>
                                <CardDescription className="text-xs font-medium text-slate-500 mt-1">Monthly platform performance metrics</CardDescription>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Revenue</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Users</span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="h-[320px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={growthData}>
                                        <defs>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis 
                                            dataKey="name" 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fill: '#94a3b8', fontWeight: 500, fontSize: 11 }} 
                                            dy={10}
                                        />
                                        <YAxis 
                                            yAxisId="left" 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fill: '#94a3b8', fontWeight: 500, fontSize: 11 }} 
                                            dx={-10}
                                        />
                                        <YAxis 
                                            yAxisId="right" 
                                            orientation="right" 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fill: '#94a3b8', fontWeight: 500, fontSize: 11 }} 
                                            dx={10}
                                        />
                                        <Tooltip
                                            contentStyle={{ 
                                                backgroundColor: "#fff", 
                                                border: "1px solid #e2e8f0", 
                                                borderRadius: "12px", 
                                                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                                                padding: "12px"
                                            }}
                                        />
                                        <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} fill="url(#colorRevenue)" name="Revenue" />
                                        <Area yAxisId="right" type="monotone" dataKey="users" stroke="#4f46e5" strokeWidth={3} fill="url(#colorUsers)" name="Users" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Distribution Matrix */}
                    <Card className="lg:col-span-4 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                        <CardHeader className="p-6 border-b border-slate-50">
                            <CardTitle className="text-lg font-bold text-slate-900">Service Mix</CardTitle>
                            <CardDescription className="text-xs font-medium text-slate-500 mt-1">Order distribution by category</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="h-[320px] flex items-center justify-center relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={serviceData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={65}
                                            outerRadius={95}
                                            paddingAngle={4}
                                            dataKey="totalPurchases"
                                            nameKey="name"
                                        >
                                            {serviceData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip 
                                            contentStyle={{ 
                                                backgroundColor: "#fff", 
                                                border: "1px solid #e2e8f0", 
                                                borderRadius: "12px", 
                                                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <PieChartIcon className="h-5 w-5 text-slate-200 mb-1" />
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Share</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Performance Ledger */}
                <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                    <CardHeader className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                            <CardTitle className="text-xl font-bold text-slate-900">Service Performance</CardTitle>
                            <CardDescription className="text-xs font-medium text-slate-500">Detailed breakdown of service metrics and conversion</CardDescription>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-8 px-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Live Insights</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/30">
                                    <tr>
                                        <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest rounded-tl-xl">Service Profile</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tiers</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Orders</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Revenue</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-right rounded-tr-xl">Status Mix</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {serviceData.map((service) => (
                                        <tr key={service.id} className="group hover:bg-slate-50/50 transition-all duration-200">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 font-bold group-hover:bg-indigo-600 group-hover:text-black transition-all">
                                                        {service.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">{service.name}</p>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Module ID: #{service.id}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-5">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {Object.entries(service.planBreakdown || {}).length > 0 ? (
                                                        Object.entries(service.planBreakdown || {}).map(([plan, count]) => (
                                                            <Badge key={plan} variant="outline" className="text-[9px] font-bold px-2 py-0.5 rounded-lg bg-white border-slate-200 text-slate-600 shadow-sm">
                                                                {plan}: {count}
                                                            </Badge>
                                                        ))
                                                    ) : (
                                                        <span className="text-xs font-medium text-slate-400 italic">No data</span>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="px-6 py-5">
                                                <p className="text-sm font-bold text-slate-900">{service.totalPurchases}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Units</p>
                                            </td>
                                            
                                            <td className="px-6 py-5">
                                                <p className="text-sm font-bold text-emerald-600">₹{(service.totalRevenue || 0).toLocaleString()}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Revenue</p>
                                            </td>
                                            
                                            <td className="px-6 py-5 text-right">
                                                <div className="flex flex-wrap justify-end gap-1.5">
                                                    {Object.entries(service.statusBreakdown || {}).map(([status, count]) => (
                                                        count > 0 && (
                                                            <Badge key={status} className={cn(
                                                                "text-[9px] font-bold uppercase px-2 py-1 rounded-lg border-none",
                                                                status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700' :
                                                                status === 'ACTIVE' ? 'bg-indigo-50 text-indigo-700' :
                                                                'bg-slate-100 text-slate-600'
                                                            )}>
                                                                {status}: {count}
                                                            </Badge>
                                                        )
                                                    ))}
                                                </div>
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

interface AnalyticsCardProps {
    title: string;
    value: string;
    icon: any;
    trend: string;
    trendUp: boolean;
    status?: "default" | "success" | "warning" | "info";
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, value, icon: Icon, trend, trendUp, status = "default" }) => {
    return (
        <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 group">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className={cn(
                        "p-2.5 rounded-xl transition-colors duration-300",
                        status === "default" && "bg-slate-50 text-slate-600",
                        status === "success" && "bg-emerald-50 text-emerald-600",
                        status === "warning" && "bg-amber-50 text-amber-600",
                        status === "info" && "bg-blue-50 text-blue-600"
                    )}>
                        <Icon className="h-5 w-5" />
                    </div>
                    <div className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded-xl text-[11px] font-bold",
                        trendUp ? "text-emerald-600 bg-emerald-50" : "text-red-600 bg-red-50"
                    )}>
                        {trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {trend}
                    </div>
                </div>
                <div className="space-y-1">
                    <p className="text-[12px] font-semibold text-slate-500">{title}</p>
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
                </div>
            </CardContent>
        </Card>
    );
};