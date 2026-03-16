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

    return (
        <div className="flex min-h-screen bg-neutral-50 font-inter">
            {/* Sidebar Navigation */}
            <div className="w-64 bg-white border-r border-neutral-200 flex flex-col shadow-sm hidden md:flex">
                <div className="p-6 border-b border-neutral-200">
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="flex items-center text-neutral-500 hover:text-[#1e40af] transition-colors mb-4 text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Admin Dashboard
                    </button>
                    <h2 className="text-xl font-bold text-[#1e40af] flex items-center gap-2">
                        <LayoutDashboard className="w-6 h-6" />
                        CRM Portal
                    </h2>
                </div>
                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('tasks')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${activeTab === 'tasks' ? 'bg-blue-50 text-[#1e40af] shadow-sm ring-1 ring-blue-200' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'}`}
                    >
                        <CheckSquare className="w-5 h-5" />
                        Task Management
                    </button>
                    <button
                        onClick={() => setActiveTab('leads')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${activeTab === 'leads' ? 'bg-blue-50 text-[#1e40af] shadow-sm ring-1 ring-blue-200' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'}`}
                    >
                        <Target className="w-5 h-5" />
                        Lead Pipeline
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${activeTab === 'orders' ? 'bg-blue-50 text-[#1e40af] shadow-sm ring-1 ring-blue-200' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'}`}
                    >
                        <ShoppingBag className="w-5 h-5" />
                        Process Orders
                    </button>
                    <button
                        onClick={() => setActiveTab('notifications')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${activeTab === 'notifications' ? 'bg-blue-50 text-[#1e40af] shadow-sm ring-1 ring-blue-200' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'}`}
                    >
                        <Bell className="w-5 h-5" />
                        Communication Hub
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto w-full">
                {/* Mobile Header */}
                <div className="md:hidden bg-white border-b border-neutral-200 p-4 shrink-0 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-[#1e40af] flex items-center gap-2">
                        <LayoutDashboard className="w-6 h-6" />
                        CRM Portal
                    </h2>
                    <button onClick={() => navigate('/admin/dashboard')} className="p-2 text-neutral-500 rounded-lg hover:bg-neutral-100">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                </div>
                {/* Mobile Navigation */}
                <div className="md:hidden flex overflow-x-auto bg-white border-b border-neutral-200">
                    <button onClick={() => setActiveTab('tasks')} className={`px-4 py-3 font-semibold whitespace-nowrap border-b-2 transition-colors ${activeTab === 'tasks' ? 'border-[#1e40af] text-[#1e40af]' : 'border-transparent text-neutral-500'}`}>Tasks</button>
                    <button onClick={() => setActiveTab('leads')} className={`px-4 py-3 font-semibold whitespace-nowrap border-b-2 transition-colors ${activeTab === 'leads' ? 'border-[#1e40af] text-[#1e40af]' : 'border-transparent text-neutral-500'}`}>Leads</button>
                    <button onClick={() => setActiveTab('orders')} className={`px-4 py-3 font-semibold whitespace-nowrap border-b-2 transition-colors ${activeTab === 'orders' ? 'border-[#1e40af] text-[#1e40af]' : 'border-transparent text-neutral-500'}`}>Orders</button>
                    <button onClick={() => setActiveTab('notifications')} className={`px-4 py-3 font-semibold whitespace-nowrap border-b-2 transition-colors ${activeTab === 'notifications' ? 'border-[#1e40af] text-[#1e40af]' : 'border-transparent text-neutral-500'}`}>Alerts</button>
                </div>

                <div className="h-full">
                    {activeTab === 'tasks' && <AdminTasks />}
                    {activeTab === 'leads' && <AdminLeads />}
                    {activeTab === 'orders' && <AdminOrders />}
                    {activeTab === 'notifications' && <AdminNotifications />}
                </div>
            </div>
        </div>
    );
}
