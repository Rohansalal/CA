import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Target, ShoppingBag, Bell, ArrowLeft } from 'lucide-react';

import { AdminTasks } from './AdminTasks';
import { AdminLeads } from './AdminLeads';
import { AdminOrders } from './AdminOrders';
import { AdminNotifications } from './AdminNotifications';

export function AdminCRM() {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<'tasks' | 'leads' | 'orders' | 'notifications'>('tasks');

    useEffect(() => {
        if (location.state && (location.state as any).tab) {
            setActiveTab((location.state as any).tab);
        }
    }, [location.state]);

    const navItems = [
        { id: 'tasks', label: 'Task Management', icon: CheckSquare, description: 'Workflow & compliance tracking' },
        { id: 'leads', label: 'Lead Pipeline', icon: Target, description: 'Client acquisition funnel' },
        { id: 'orders', label: 'Process Orders', icon: ShoppingBag, description: 'Service fulfillment engine' },
        { id: 'notifications', label: 'Communication Hub', icon: Bell, description: 'System alerts & broadcasts' },
    ] as const;

    return (
        <div className="flex min-h-screen bg-slate-50/50 font-outfit">
            {/* Sidebar Navigation */}
            <div className="w-72 bg-[#0F172A] flex flex-col shadow-2xl hidden md:flex">
                <div className="p-8 border-b border-slate-800/50">
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="flex items-center text-slate-400 hover:text-white transition-all mb-8 text-xs font-bold uppercase tracking-widest group"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Main Dashboard
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                            <LayoutDashboard className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white tracking-tight">CRM Portal</h2>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Management Suite</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto py-8 px-4 space-y-2">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full group flex flex-col p-4 rounded-2xl transition-all duration-200 border ${activeTab === item.id
                                ? 'bg-indigo-500/10 border-indigo-500/30 text-white shadow-lg shadow-indigo-500/5'
                                : 'border-transparent text-slate-400 hover:bg-white/5 hover:text-slate-200'
                                }`}
                        >
                            <div className="flex items-center gap-3 w-full">
                                <item.icon className={`w-5 h-5 transition-colors ${activeTab === item.id ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                                <span className="font-bold text-sm">{item.label}</span>
                            </div>
                            <span className={`text-[10px] mt-1 ml-8 font-medium transition-colors ${activeTab === item.id ? 'text-indigo-300/60' : 'text-slate-600'}`}>
                                {item.description}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Sidebar Footer */}
                <div className="p-6 border-t border-slate-800/50">
                    <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/30">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">System Status</p>
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="text-xs font-semibold text-slate-300">Operations Online</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <div className="md:hidden bg-[#0F172A] border-b border-slate-800 p-4 shrink-0 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <LayoutDashboard className="w-6 h-6 text-indigo-400" />
                        <h2 className="text-lg font-bold text-white tracking-tight">CRM Portal</h2>
                    </div>
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="p-2 text-slate-400 rounded-xl bg-white/5 border border-white/10"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                </div>

                {/* Mobile Navigation Tabs */}
                <div className="md:hidden flex overflow-x-auto bg-[#0F172A] border-b border-slate-800 scrollbar-hide">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`px-6 py-4 font-bold text-xs uppercase tracking-widest whitespace-nowrap border-b-2 transition-all ${activeTab === item.id
                                ? 'border-indigo-500 text-white bg-indigo-500/5'
                                : 'border-transparent text-slate-500'
                                }`}
                        >
                            {item.id}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="h-full animate-in fade-in duration-500">
                        {activeTab === 'tasks' && <AdminTasks />}
                        {activeTab === 'leads' && <AdminLeads />}
                        {activeTab === 'orders' && <AdminOrders />}
                        {activeTab === 'notifications' && <AdminNotifications />}
                    </div>
                </div>
            </div>
        </div>
    );
}











