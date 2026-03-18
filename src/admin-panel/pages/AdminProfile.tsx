import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import {
    User, Mail, Shield, ArrowLeft, Save, Edit2, Lock,
    Activity, Server, Database, CheckCircle, AlertTriangle,
    Camera, Clock, Key, ShieldCheck, Globe, Cpu, LogOut,
    Eye, EyeOff, Upload, Trash2, Smartphone, Monitor, Tablet
} from 'lucide-react';
import { toast } from 'sonner';
import api from '../../utils/api';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogFooter,
    DialogDescription 
} from '../../components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { cn } from '../../components/ui/utils';

interface AdminProfileData {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
}

interface AuditLog {
    id: number;
    action: string;
    details: string;
    createdAt: string;
}

export const AdminProfile: React.FC = () => {
    const { adminUser, verifyAdminAccess } = useAdmin();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [profile, setProfile] = useState<AdminProfileData | null>(null);
    const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);

    // Form States
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        fetchProfile();
        fetchAuditLogs();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const response = await api.get('/admin/profile');
            const data = response.data;
            setProfile(data.admin);
            setName(data.admin.name || '');
            setEmail(data.admin.email || '');
        } catch (err) {
            console.error(err);
            toast.error('Failed to load system identity');
        } finally {
            setLoading(false);
        }
    };

    const fetchAuditLogs = async () => {
        try {
            const response = await api.get('/admin/audit-logs');
            const logs = response.data.logs || [];
            setAuditLogs(logs.slice(0, 5));
        } catch (err) {
            console.error('Failed to fetch audit logs');
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!name.trim()) {
            toast.error('Administrative name is required');
            return;
        }
        if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
            toast.error('A valid secure email gateway is required');
            return;
        }

        if (newPassword && newPassword !== confirmPassword) {
            toast.error('Credential mismatch: New passphrases do not match');
            return;
        }

        if (newPassword && newPassword.length < 8) {
            toast.error('Security Protocol: New passphrase must be at least 8 characters');
            return;
        }

        try {
            setIsUpdating(true);
            const response = await api.put('/admin/profile', {
                name,
                email,
                newPassword: newPassword || undefined
            });

            setProfile(response.data.admin);
            toast.success('System credentials synchronized successfully');
            setIsEditing(false);

            // Cleanup
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');

            // Update global state
            verifyAdminAccess();
            fetchAuditLogs();

        } catch (err: any) {
            const msg = err.response?.data?.error || 'Update synchronization failed';
            toast.error(msg);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Size validation (2MB)
        if (file.size > 2 * 1024 * 1024) {
            toast.error('File size exceeds 2MB limit');
            return;
        }

        const formData = new FormData();
        formData.append('avatar', file);

        try {
            setUploadingAvatar(true);
            const response = await api.post('/admin/upload-avatar', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            setProfile(prev => prev ? { ...prev, avatar: response.data.avatarUrl } : null);
            toast.success('System avatar updated');
            setShowAvatarModal(false);
            fetchAuditLogs();
        } catch (err: any) {
            toast.error(err.response?.data?.error || 'Avatar upload failed');
        } finally {
            setUploadingAvatar(false);
        }
    };

    const handleRemoveAvatar = async () => {
        try {
            setUploadingAvatar(true);
            await api.delete('/admin/remove-avatar');
            setProfile(prev => prev ? { ...prev, avatar: undefined } : null);
            toast.success('System avatar removed');
            setShowAvatarModal(false);
            fetchAuditLogs();
        } catch (err: any) {
            toast.error('Failed to remove avatar');
        } finally {
            setUploadingAvatar(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center font-outfit">
                <div className="flex flex-col items-center gap-6">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-indigo-500/10 border-t-indigo-600 rounded-full animate-spin"></div>
                        <Shield className="w-6 h-6 text-indigo-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                    </div>
                    <div className="text-center space-y-1">
                        <p className="text-[#0F172A] font-bold text-sm uppercase tracking-[0.2em]">Initialising Secure Session</p>
                        <p className="text-slate-400 text-[10px] font-medium uppercase tracking-widest">Verifying Administrative Clearance...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 lg:p-10 font-outfit">
            <div className="max-w-7xl mx-auto space-y-10">
                
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-indigo-600 mb-2">
                            <ShieldCheck className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Security Management Center</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight">Administrative Profile</h1>
                        <p className="text-slate-500 text-sm font-medium">Manage system credentials and oversight parameters</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            onClick={() => navigate('/admin/dashboard')}
                            className="rounded-xl border-slate-200 text-slate-600 font-bold text-xs h-11 px-5 hover:bg-slate-50 transition-all group"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Overview
                        </Button>
                        {!isEditing ? (
                            <Button
                                onClick={() => setIsEditing(true)}
                                className="rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs h-11 px-6 shadow-lg shadow-slate-200 transition-all active:scale-95"
                            >
                                <Edit2 className="w-4 h-4 mr-2" />
                                Edit Credentials
                            </Button>
                        ) : (
                            <Button
                                variant="ghost"
                                onClick={() => setIsEditing(false)}
                                className="rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-bold text-xs h-11 px-6 transition-all"
                            >
                                Discard Changes
                            </Button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Profile Card & Identity */}
                    <div className="lg:col-span-8 space-y-8">
                        
                        {/* Profile Overview Card */}
                        <Card className="border-slate-200 overflow-hidden rounded-[32px] shadow-sm group">
                            <div className="h-48 bg-gradient-to-br from-[#0F172A] via-[#1e293b] to-[#334155] relative overflow-hidden">
                                {/* Decorative elements */}
                                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30L0 0m60 0L30 30m0 0l30 30M30 30L0 60' stroke='%23fff' stroke-width='1' fill='none'/%3E%3C/svg%3E")` }} />
                                <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
                                <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
                                
                                <div className="absolute -bottom-16 left-8 flex items-end gap-6">
                                    <div className="relative">
                                        <div className="w-36 h-36 bg-white rounded-[40px] p-1.5 shadow-2xl ring-8 ring-[#F8FAFC]">
                                            <Avatar className="w-full h-full rounded-[34px] border border-slate-100">
                                                <AvatarImage src={profile?.avatar} />
                                                <AvatarFallback className="bg-slate-50 text-[#0F172A]">
                                                    <User className="w-16 h-16" />
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <button 
                                            onClick={() => setShowAvatarModal(true)}
                                            className="absolute bottom-1 right-1 p-2.5 bg-indigo-600 text-white rounded-2xl shadow-lg border-4 border-white hover:bg-indigo-700 transition-all transform hover:scale-110 active:scale-95 group-hover:rotate-12"
                                        >
                                            <Camera className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="pb-20 hidden md:block">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h2 className="text-3xl font-bold text-white tracking-tight">{profile?.name}</h2>
                                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 font-bold text-[10px] uppercase tracking-widest px-2.5 py-0.5">Verified</Badge>
                                        </div>
                                        <p className="text-slate-300 text-sm font-medium flex items-center gap-2">
                                            <Shield className="w-4 h-4 text-indigo-400" />
                                            {profile?.role} • Security Level 01
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <CardContent className="pt-24 pb-8 px-8">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                    <div className="md:hidden space-y-1 mb-4">
                                        <h2 className="text-2xl font-bold text-[#0F172A]">{profile?.name}</h2>
                                        <p className="text-slate-500 text-sm font-medium">{profile?.role}</p>
                                    </div>

                                    <div className="grid grid-cols-2 sm:flex items-center gap-4 md:gap-8">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System ID</p>
                                            <p className="text-sm font-bold text-[#0F172A]">#{profile?.id?.toString().padStart(4, '0')}</p>
                                        </div>
                                        <div className="w-px h-8 bg-slate-100 hidden sm:block" />
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Access Role</p>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                                                <p className="text-sm font-bold text-indigo-600 uppercase tracking-tight">{profile?.role}</p>
                                            </div>
                                        </div>
                                        <div className="w-px h-8 bg-slate-100 hidden sm:block" />
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Member Since</p>
                                            <p className="text-sm font-bold text-[#0F172A]">{new Date(profile?.createdAt || '').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden">
                                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} alt="Active" />
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">+12 Peers Online</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Settings Form */}
                        <Card className="border-slate-200 rounded-[32px] shadow-sm overflow-hidden bg-white">
                            <CardHeader className="px-8 py-7 border-b border-slate-50 bg-slate-50/30">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-indigo-50 rounded-2xl">
                                            <Lock className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg font-bold text-[#0F172A]">Security & Identity</CardTitle>
                                            <CardDescription className="text-xs font-medium text-slate-500">Update your administrative access parameters</CardDescription>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="rounded-lg border-slate-200 text-slate-400 text-[10px] font-bold uppercase tracking-widest">Section 01/02</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-8">
                                <form onSubmit={handleUpdate} className="space-y-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] ml-1">Administrative Name</label>
                                            <div className="relative group">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 p-1 bg-slate-50 rounded-lg border border-slate-100 group-focus-within:border-indigo-200 group-focus-within:bg-indigo-50 transition-all">
                                                    <User className="w-3.5 h-3.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                                </div>
                                                <Input
                                                    disabled={!isEditing || isUpdating}
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="h-13 pl-14 bg-white border-slate-200 rounded-[18px] text-sm font-semibold text-[#0F172A] focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-400"
                                                    placeholder="Full administrative name"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] ml-1">Secure Email Gateway</label>
                                            <div className="relative group">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 p-1 bg-slate-50 rounded-lg border border-slate-100 group-focus-within:border-indigo-200 group-focus-within:bg-indigo-50 transition-all">
                                                    <Mail className="w-3.5 h-3.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                                </div>
                                                <Input
                                                    type="email"
                                                    disabled={!isEditing || isUpdating}
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="h-13 pl-14 bg-white border-slate-200 rounded-[18px] text-sm font-semibold text-[#0F172A] focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-400"
                                                    placeholder="admin@enterprise.com"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {isEditing && (
                                        <div className="p-8 bg-slate-50/50 rounded-[28px] border border-slate-100 space-y-8 animate-in zoom-in-95 duration-500">
                                            <div className="flex items-center justify-between pb-6 border-b border-slate-200/60">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100">
                                                        <Key className="w-4 h-4 text-indigo-600" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-bold text-[#0F172A]">Passphrase Update Protocol</h4>
                                                        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Leave fields blank to retain current credentials</p>
                                                    </div>
                                                </div>
                                                <Badge className="bg-white text-slate-500 border-slate-200 font-bold text-[9px] uppercase tracking-widest px-2 py-0.5">Sensitive</Badge>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-3">
                                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] ml-1">New Secure Passphrase</label>
                                                    <div className="relative group">
                                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 p-1 bg-white rounded-lg border border-slate-100 group-focus-within:border-indigo-200 group-focus-within:bg-indigo-50 transition-all">
                                                            <Lock className="w-3.5 h-3.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                                        </div>
                                                        <Input
                                                            type={showPassword ? "text" : "password"}
                                                            value={newPassword}
                                                            onChange={(e) => setNewPassword(e.target.value)}
                                                            className="h-13 pl-14 pr-12 bg-white border-slate-200 rounded-[18px] text-sm font-semibold text-[#0F172A] focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all"
                                                            placeholder="••••••••••••"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
                                                        >
                                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] ml-1">Confirm Passphrase</label>
                                                    <div className="relative group">
                                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 p-1 bg-white rounded-lg border border-slate-100 group-focus-within:border-indigo-200 group-focus-within:bg-indigo-50 transition-all">
                                                            <ShieldCheck className="w-3.5 h-3.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                                        </div>
                                                        <Input
                                                            type={showPassword ? "text" : "password"}
                                                            value={confirmPassword}
                                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                                            className="h-13 pl-14 bg-white border-slate-200 rounded-[18px] text-sm font-semibold text-[#0F172A] focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all"
                                                            placeholder="••••••••••••"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {isEditing && (
                                        <div className="flex justify-end pt-4">
                                            <Button
                                                type="submit"
                                                disabled={isUpdating}
                                                className="min-w-[200px] h-14 bg-[#0F172A] hover:bg-slate-800 text-white rounded-[20px] font-bold text-sm shadow-xl shadow-slate-200 transition-all active:scale-95 disabled:opacity-50"
                                            >
                                                {isUpdating ? (
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                ) : (
                                                    <>
                                                        <Save className="w-4 h-4 mr-2" />
                                                        Synchronize Changes
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    )}
                                </form>
                            </CardContent>
                        </Card>

                        {/* Activity History */}
                        <Card className="border-slate-200 rounded-[32px] shadow-sm overflow-hidden bg-white">
                            <CardHeader className="px-8 py-7 border-b border-slate-50 bg-slate-50/30">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-slate-100 rounded-2xl">
                                            <Activity className="w-5 h-5 text-slate-600" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg font-bold text-[#0F172A]">Operational Audit Trail</CardTitle>
                                            <CardDescription className="text-xs font-medium text-slate-500">History of your recent administrative actions</CardDescription>
                                        </div>
                                    </div>
                                    <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 hover:bg-indigo-50 rounded-lg">View Full Log</Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                {auditLogs.length > 0 ? (
                                    <div className="divide-y divide-slate-50">
                                        {auditLogs.map((log) => (
                                            <div key={log.id} className="p-6 md:px-8 flex items-start gap-5 hover:bg-slate-50/80 transition-all group cursor-default">
                                                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shrink-0 group-hover:border-indigo-100 group-hover:shadow-sm transition-all">
                                                    <Cpu className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                                                </div>
                                                <div className="flex-1 min-w-0 py-1">
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                                                        <h4 className="text-sm font-bold text-[#0F172A] uppercase tracking-tight group-hover:text-indigo-900 transition-colors">{log.action}</h4>
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="w-3.5 h-3.5 text-slate-300" />
                                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                                {new Date(log.createdAt).toLocaleString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-2xl">{log.details}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-20 flex flex-col items-center justify-center text-center">
                                        <div className="w-20 h-20 bg-slate-50 rounded-[30px] flex items-center justify-center mb-6 border border-slate-100">
                                            <Clock className="w-8 h-8 text-slate-200" />
                                        </div>
                                        <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">No Recent Activity Detected</p>
                                        <p className="text-xs text-slate-300 mt-2">Operational history is clear</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Status & Vitals */}
                    <div className="lg:col-span-4 space-y-8">
                        
                        {/* Session Vitals */}
                        <Card className="bg-[#0F172A] border-none rounded-[32px] p-8 text-white shadow-2xl shadow-slate-300 relative overflow-hidden group">
                            <div className="relative z-10 space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                                        <Monitor className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-indigo-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Session Protocol</h4>
                                        <h3 className="text-xl font-bold tracking-tight">Active Node Status</h3>
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    {[
                                        { label: 'Security Clearance', value: 'Level 01', icon: ShieldCheck, color: 'emerald' },
                                        { label: 'IP Address', value: '192.168.1.104', icon: Globe, color: 'indigo' },
                                        { label: 'Device ID', value: 'PA-MAC-2026', icon: Smartphone, color: 'indigo' }
                                    ].map((vital, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-default group/vital">
                                            <div className="flex items-center gap-3">
                                                <vital.icon className="w-4 h-4 text-slate-400 group-hover/vital:text-white transition-colors" />
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{vital.label}</span>
                                            </div>
                                            <span className={cn(
                                                "text-[10px] font-bold uppercase tracking-widest",
                                                vital.color === 'emerald' ? 'text-emerald-400' : 'text-indigo-300'
                                            )}>{vital.value}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-white/10">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Token Lifespan</span>
                                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">23:45:12</span>
                                    </div>
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500 rounded-full w-[85%] animate-pulse" />
                                    </div>
                                </div>
                            </div>

                            {/* Decorative blur */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-indigo-500/20 transition-all duration-700" />
                        </Card>

                        {/* System Health */}
                        <Card className="border-slate-200 rounded-[32px] shadow-sm overflow-hidden bg-white">
                            <CardHeader className="px-8 py-7 border-b border-slate-50 bg-slate-50/30">
                                <CardTitle className="text-base font-bold text-[#0F172A] flex items-center gap-3">
                                    <Server className="w-4 h-4 text-indigo-600" />
                                    Environment Health
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                {[
                                    { label: 'API Gateway', status: 'Optimal', icon: Globe, color: 'emerald' },
                                    { label: 'Database Node', status: 'Stable', icon: Database, color: 'emerald' },
                                    { label: 'Cloud Storage', status: 'Connected', icon: Server, color: 'indigo' }
                                ].map((node, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-[#F8FAFC] border border-slate-100 hover:border-indigo-100 hover:bg-white hover:shadow-sm transition-all group">
                                        <div className="flex items-center gap-3">
                                            <node.icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                                            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">{node.label}</span>
                                        </div>
                                        <Badge className={cn(
                                            "font-bold text-[9px] uppercase tracking-widest rounded-lg px-2 py-0.5",
                                            node.color === 'emerald' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-indigo-50 text-indigo-600 border-indigo-100"
                                        )}>
                                            {node.status}
                                        </Badge>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Meta Info */}
                        <div className="px-6 text-center space-y-4">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-loose">
                                Security Protocol Version: 4.2.0-STABLE<br />
                                Last Meta Sync: {new Date(profile?.updatedAt || '').toLocaleDateString('en-US', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                            </p>
                            <Button
                                variant="ghost"
                                onClick={() => navigate('/admin/login')}
                                className="w-full h-12 rounded-2xl text-rose-500 hover:text-rose-600 hover:bg-rose-50 font-bold text-xs uppercase tracking-[0.15em] border border-transparent hover:border-rose-100 transition-all"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Terminate Session
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Avatar Upload Modal */}
            <Dialog open={showAvatarModal} onOpenChange={setShowAvatarModal}>
                <DialogContent className="sm:max-w-md rounded-[32px] border-none p-0 overflow-hidden font-outfit">
                    <DialogHeader className="p-8 bg-slate-50 border-b border-slate-100">
                        <DialogTitle className="text-xl font-bold text-[#0F172A]">System Identity Avatar</DialogTitle>
                        <DialogDescription className="text-xs font-medium text-slate-500">Update your administrative visual identifier</DialogDescription>
                    </DialogHeader>
                    <div className="p-10 flex flex-col items-center gap-8">
                        <div className="relative group">
                            <div className="w-40 h-40 bg-slate-50 rounded-[44px] p-2 ring-8 ring-slate-50 border border-slate-100 shadow-inner overflow-hidden">
                                <Avatar className="w-full h-full rounded-[38px]">
                                    <AvatarImage src={profile?.avatar} />
                                    <AvatarFallback className="bg-white text-slate-200">
                                        <User className="w-20 h-20" />
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            {uploadingAvatar && (
                                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-[44px] flex items-center justify-center">
                                    <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 w-full gap-4">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleAvatarUpload}
                                accept="image/*"
                                className="hidden"
                            />
                            <Button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploadingAvatar}
                                className="h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[20px] font-bold text-sm shadow-xl shadow-indigo-100 transition-all active:scale-95"
                            >
                                <Upload className="w-4 h-4 mr-2" />
                                Upload New Image
                            </Button>
                            {profile?.avatar && (
                                <Button
                                    variant="outline"
                                    onClick={handleRemoveAvatar}
                                    disabled={uploadingAvatar}
                                    className="h-14 border-slate-200 text-rose-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 rounded-[20px] font-bold text-sm transition-all"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Remove Avatar
                                </Button>
                            )}
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Supports JPG, PNG, GIF (Max 2MB)</p>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};










