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
import { TrendingUp, Users, DollarSign, ShoppingBag, Calendar } from 'lucide-react';

interface GrowthData {
    name: string;
    users: number;
    revenue: number;
}

interface ServiceAnalytics {
    id: number;
    name: string;
    price: number;
    totalPurchases: number;
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
            const token = localStorage.getItem('adminToken');
            if (!token) throw new Error('No authentication token');

            const headers = { 'Authorization': `Bearer ${token}` };
            const baseUrl = import.meta.env.VITE_API_BASE_URL;

            const [growthRes, servicesRes, revenueRes] = await Promise.all([
                fetch(`${baseUrl}/admin/analytics/growth`, { headers }),
                fetch(`${baseUrl}/admin/analytics/services`, { headers }),
                fetch(`${baseUrl}/admin/analytics/revenue`, { headers })
            ]);

            if (!growthRes.ok || !servicesRes.ok || !revenueRes.ok) {
                throw new Error('Failed to fetch analytics data');
            }

            const growth = await growthRes.json();
            const services = await servicesRes.json();
            const revenue = await revenueRes.json();

            setGrowthData(growth.growth);
            setServiceData(services.analytics);
            setRevenueData(revenue);

        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'Failed to load analytics');
        } finally {
            setLoading(false);
        }
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600 p-8">
                <p>{error}</p>
                <button onClick={fetchAnalytics} className="mt-4 text-primary hover:underline">Retry</button>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-6 bg-slate-50 min-h-screen">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Analytics Dashboard</h1>
                    <p className="text-slate-600 mt-1">Real-time insights and performance metrics</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={fetchAnalytics}
                        className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 transition shadow-sm ml-auto"
                    >
                        Refresh Data
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Total Revenue</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-2">₹{revenueData?.totalRevenue.toLocaleString() || 0}</h3>
                        </div>
                        <div className="p-3 bg-emerald-50 rounded-lg">
                            <DollarSign className="w-6 h-6 text-emerald-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
                        <span className="text-emerald-500 font-medium">12%</span>
                        <span className="text-slate-400 ml-1">vs last month</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Total Transactions</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-2">{revenueData?.totalTransactions || 0}</h3>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <ShoppingBag className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className="text-slate-400">Lifetime orders</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Active Services</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-2">{serviceData.length}</h3>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                            <Calendar className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className="text-slate-400">Available in catalog</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500">User Growth</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-2">
                                {growthData.length > 0 ? growthData[growthData.length - 1].users : 0}
                            </h3>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-lg">
                            <Users className="w-6 h-6 text-orange-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className="text-slate-400">New users this month</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Revenue & User Growth Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Growth Trends (Last 6 Months)</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={growthData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend />
                                <Area yAxisId="left" type="monotone" dataKey="revenue" stackId="1" stroke="#10B981" fill="url(#colorRevenue)" name="Revenue (₹)" />
                                <Area yAxisId="right" type="monotone" dataKey="users" stackId="2" stroke="#3B82F6" fill="url(#colorUsers)" name="New Users" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Service Popularity Pie Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Service Distribution</h3>
                    <div className="h-[300px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={serviceData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="totalPurchases"
                                    nameKey="name"
                                >
                                    {serviceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '12px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Service Performance Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900">Service Performance</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-600 font-medium">
                            <tr>
                                <th className="px-6 py-4">Service Name</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Total Sales</th>
                                <th className="px-6 py-4">Est. Revenue</th>
                                <th className="px-6 py-4">Status Breakdown</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {serviceData.map((service) => (
                                <tr key={service.id} className="hover:bg-slate-50 transition">
                                    <td className="px-6 py-4 font-medium text-slate-900">{service.name}</td>
                                    <td className="px-6 py-4 text-slate-600">₹{service.price.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-slate-600">{service.totalPurchases}</td>
                                    <td className="px-6 py-4 text-emerald-600 font-medium">
                                        ₹{(service.price * service.totalPurchases).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2 text-xs">
                                            {Object.entries(service.statusBreakdown).map(([status, count]) => (
                                                count > 0 && (
                                                    <span key={status} className={`px-2 py-1 rounded-full ${status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                                                        status === 'ACTIVE' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-gray-100 text-gray-700'
                                                        }`}>
                                                        {status}: {count}
                                                    </span>
                                                )
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
