import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  User, Mail, Phone, Calendar, Shield, ArrowLeft, Save, Edit2, ChevronRight,
  CreditCard, FileText, Building2, MapPin, BadgeCheck, Lock, Fingerprint,
  Hash, Briefcase, Landmark, Inbox, Sparkles, ExternalLink, AlertCircle,
  CheckCircle2, Clock, TrendingUp, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const UserProfile: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const { user, loading: authLoading, setUserData } = useAuth();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        businessName: '',
        gstNumber: '',
        panNumber: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
    });

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
        }
    }, [user, authLoading, navigate]);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                businessName: user.profile?.businessName || '',
                gstNumber: user.profile?.gstNumber || '',
                panNumber: user.profile?.panNumber || '',
                address: user.profile?.address || '',
                city: user.profile?.city || '',
                state: user.profile?.state || '',
                pincode: user.profile?.pincode || '',
            });
        }
    }, [user]);

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Verifying identity...</p>
                </div>
            </div>
        );
    }

    const handleSave = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || '/api'}/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to update profile');
            }

            const data = await response.json();

            // Construct updated user object for local state
            const updatedUser = {
                ...user!,
                name: data.user.name,
                phone: data.user.phone,
                profile: data.profile
            };

            setUserData(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));

            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (err) {
            console.error(err);
            alert(err instanceof Error ? err.message : "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB] font-sans">
            {/* Header / Navigation */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                            title="Back to Dashboard"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
                        </button>
                        <div className="h-6 w-px bg-gray-200" />
                        <div>
                            <h1 className="text-lg font-semibold text-gray-900">My Profile</h1>
                            <p className="text-xs text-gray-500">Manage your account settings</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            disabled={loading}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isEditing
                                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                                : 'bg-gray-900 text-white hover:bg-gray-800 shadow-sm'
                                } ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-0.5 active:scale-95'}`}
                        >
                            {loading ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : isEditing ? (
                                <>
                                    <Save className="w-4 h-4" /> Save Changes
                                </>
                            ) : (
                                <>
                                    <Edit2 className="w-4 h-4" /> Edit Profile
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {/* Hero Profile Section - Redesigned */}
                <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-[#0b1f3a] via-[#0f2744] to-[#1a3a5c] p-6 md:p-10 lg:p-12 text-white shadow-xl mb-8 md:mb-12">
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full -ml-24 -mb-24 blur-3xl"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                        <div className="relative">
                            <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl shadow-2xl flex items-center justify-center text-4xl md:text-5xl font-bold text-[#0b1f3a] ring-4 ring-white/20">
                                {formData.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-white">
                                <BadgeCheck className="w-5 h-5 text-white" />
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-xs font-semibold text-emerald-300">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                                    </span>
                                    Verified
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs font-semibold text-blue-300">
                                    <Shield className="w-3.5 h-3.5" />
                                    {user?.role}
                                </span>
                            </div>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3 text-white">{user?.name}</h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 text-sm text-gray-300">
                                <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400" /> {user?.email}</span>
                                {user?.phone && (
                                    <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" /> {user.phone}</span>
                                )}
                            </div>
                        </div>

                        <div className="hidden md:flex flex-col gap-2">
                            <button
                                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                disabled={loading}
                                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${isEditing
                                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                    : 'bg-white text-[#0b1f3a] hover:bg-gray-100'
                                    } ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-0.5 active:scale-95 shadow-lg'}`}
                            >
                                {isEditing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                                {isEditing ? 'Save Changes' : 'Edit Profile'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Sidebar - Status Cards */}
                    <div className="space-y-6">
                        {/* Account Status Card */}
                        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Shield className="w-4 h-4 text-emerald-500" /> Account Status
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                                    <div>
                                        <p className="text-xs font-medium text-emerald-700 uppercase">KYC Status</p>
                                        <p className="text-sm font-semibold text-emerald-900">Verified</p>
                                    </div>
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                </div>
                                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                                    <div>
                                        <p className="text-xs font-medium text-blue-700 uppercase">Member Since</p>
                                        <p className="text-sm font-semibold text-blue-900">{new Date(user?.createdAt || Date.now()).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</p>
                                    </div>
                                    <Calendar className="w-5 h-5 text-blue-500" />
                                </div>
                            </div>
                        </div>

                        {/* Security Insights Card - Visually Distinct */}
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                    <Lock className="w-4 h-4 text-emerald-600" />
                                </div>
                                <h3 className="text-sm font-semibold text-emerald-900">Security Insights</h3>
                            </div>
                            <p className="text-xs text-emerald-700 leading-relaxed mb-4">
                                Your account is protected with 256-bit SSL encryption. All documents are stored securely with end-to-end encryption.
                            </p>
                            <div className="flex items-center gap-2 text-xs text-emerald-600">
                                <Fingerprint className="w-4 h-4" />
                                <span className="font-medium">Biometric Ready</span>
                            </div>
                        </div>
                    </div>

                    {/* Main Configuration Forms */}
                    <div className="lg:col-span-2 space-y-8 md:space-y-10">
                        {/* Account Settings */}
                        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 border border-gray-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 md:w-40 h-32 md:h-40 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1.5 h-5 bg-primary rounded-full"></div>
                                <h3 className="text-lg md:text-xl font-black text-[#0b1f3a] tracking-tight">Account Parameters</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest px-1">Full Legal Name</label>
                                    <div className={`relative transition-all ${isEditing ? 'scale-[1.02]' : ''}`}>
                                        <input
                                            type="text"
                                            disabled={!isEditing}
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:bg-white focus:border-primary/30 transition-all outline-none font-bold text-[#0b1f3a] disabled:opacity-50"
                                            placeholder="John Doe"
                                        />
                                        <User className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest px-1">Identity Mail</label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            disabled
                                            value={formData.email}
                                            className="w-full h-14 px-6 bg-gray-50/50 border border-gray-100 rounded-2xl outline-none font-bold text-gray-400 cursor-not-allowed"
                                            placeholder="john@example.com"
                                        />
                                        <Mail className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest px-1">Secure Contact</label>
                                    <div className={`relative transition-all ${isEditing ? 'scale-[1.02]' : ''}`}>
                                        <input
                                            type="tel"
                                            disabled={!isEditing}
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:bg-white focus:border-primary/30 transition-all outline-none font-bold text-[#0b1f3a] disabled:opacity-50"
                                            placeholder="+91 00000 00000"
                                        />
                                        <Phone className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest px-1">Business Identity</label>
                                    <div className={`relative transition-all ${isEditing ? 'scale-[1.02]' : ''}`}>
                                        <input
                                            type="text"
                                            disabled={!isEditing}
                                            value={formData.businessName}
                                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                            className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:bg-white focus:border-primary/30 transition-all outline-none font-bold text-[#0b1f3a] disabled:opacity-50"
                                            placeholder="Enterprise Name"
                                        />
                                        <Shield className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tax Credentials */}
                        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow duration-200">
                            <div className="absolute top-0 right-0 w-32 md:w-40 h-32 md:h-40 bg-orange-500/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1.5 h-5 bg-[#ee7228] rounded-full"></div>
                                <h3 className="text-lg md:text-xl font-black text-[#0b1f3a] tracking-tight">Tax Credentials</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* GSTIN */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest px-1">GST Identification (GSTIN)</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={formData.gstNumber}
                                            onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                                            className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:bg-white focus:border-primary/30 transition-all outline-none font-bold text-[#0b1f3a] font-mono tracking-wider"
                                            placeholder="27AAAAA0000A1Z5"
                                        />
                                    ) : (
                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                                                <Hash className="w-5 h-5 text-orange-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">GST Number</p>
                                                <p className="text-base font-semibold text-gray-900 font-mono tracking-wider">{formData.gstNumber || 'Not set'}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* PAN */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest px-1">Permanent Account (PAN)</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={formData.panNumber}
                                            onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })}
                                            className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:bg-white focus:border-primary/30 transition-all outline-none font-bold text-[#0b1f3a] font-mono tracking-wider"
                                            placeholder="ABCDE1234F"
                                        />
                                    ) : (
                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                                                <CreditCard className="w-5 h-5 text-amber-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">PAN Number</p>
                                                <p className="text-base font-semibold text-gray-900 font-mono tracking-wider">{formData.panNumber || 'Not set'}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Location / Office */}
                        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow duration-200">
                            <div className="absolute top-0 right-0 w-32 md:w-40 h-32 md:h-40 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1.5 h-5 bg-blue-500 rounded-full"></div>
                                <h3 className="text-lg md:text-xl font-black text-[#0b1f3a] tracking-tight">Registered Office</h3>
                            </div>

                            <div className="space-y-8">
                                {/* Address */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest px-1">Physical Address</label>
                                    {isEditing ? (
                                        <textarea
                                            rows={2}
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            className="w-full p-6 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:bg-white focus:border-primary/30 transition-all outline-none font-bold text-[#0b1f3a] resize-none"
                                            placeholder="Building, Street, Area..."
                                        />
                                    ) : (
                                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                                                <MapPin className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-500">Street Address</p>
                                                <p className="text-base font-semibold text-gray-900">{formData.address || 'Not set'}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* City */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest px-1">City Hub</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={formData.city}
                                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:bg-white focus:border-primary/30 transition-all outline-none font-bold text-[#0b1f3a]"
                                                placeholder="City"
                                            />
                                        ) : (
                                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                <Building2 className="w-5 h-5 text-gray-400 shrink-0" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">City</p>
                                                    <p className="text-base font-semibold text-gray-900">{formData.city || 'Not set'}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {/* State */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest px-1">State Zone</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={formData.state}
                                                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                                className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:bg-white focus:border-primary/30 transition-all outline-none font-bold text-[#0b1f3a]"
                                                placeholder="State"
                                            />
                                        ) : (
                                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                <Landmark className="w-5 h-5 text-gray-400 shrink-0" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">State</p>
                                                    <p className="text-base font-semibold text-gray-900">{formData.state || 'Not set'}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {/* Pincode */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest px-1">Postal Code</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={formData.pincode}
                                                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                                className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:bg-white focus:border-primary/30 transition-all outline-none font-bold text-[#0b1f3a]"
                                                placeholder="000 000"
                                            />
                                        ) : (
                                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">PIN Code</p>
                                                    <p className="text-base font-semibold text-gray-900">{formData.pincode || 'Not set'}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Transaction history at bottom */}
                        <div className="pt-8">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                                <h3 className="text-2xl font-black text-[#0b1f3a] tracking-tight">Ledger & Subscription Activity</h3>
                            </div>
                            <PaymentHistoryList />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const PaymentHistoryList = () => {
    const [payments, setPayments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || '/api'}/payments/my-payments`, {
                    credentials: 'include'
                });
                if (res.ok) {
                    const data = await res.json();
                    setPayments(data.payments || []);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPayments();
    }, []);

    if (loading) return (
        <div className="flex justify-center p-20 py-32 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-primary/10 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        </div>
    );

    if (payments.length === 0) {
        return (
            <div className="bg-white rounded-2xl md:rounded-3xl p-8 md:p-12 border border-gray-200 text-center">
                <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Inbox className="w-10 h-10 text-indigo-400" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">No Activity Yet</h4>
                <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                    Start using services to see your transactions here. Explore our audit and tax services to get started.
                </p>
                <button
                    onClick={() => window.location.href = '/services'}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-all hover:-translate-y-0.5"
                >
                    <Sparkles className="w-4 h-4" />
                    Explore Services
                    <ExternalLink className="w-3.5 h-3.5" />
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm relative">
            <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr className="bg-gray-50/80">
                            <th className="px-8 py-6 text-[10px] font-black text-gray-900 uppercase tracking-widest border-b border-gray-100">Timestamp</th>
                            <th className="px-8 py-6 text-[10px] font-black text-gray-900 uppercase tracking-widest border-b border-gray-100">Service Entity</th>
                            <th className="px-8 py-6 text-[10px] font-black text-gray-900 uppercase tracking-widest border-b border-gray-100">Asset Value</th>
                            <th className="px-8 py-6 text-[10px] font-black text-gray-900 uppercase tracking-widest border-b border-gray-100">Protocol</th>
                            <th className="px-8 py-6 text-[10px] font-black text-gray-900 uppercase tracking-widest border-b border-gray-100">Documentation</th>
                            <th className="px-8 py-6 text-[10px] font-black text-gray-900 uppercase tracking-widest border-b border-gray-100">Status</th>
                            <th className="px-10 py-6 text-[10px] font-black text-gray-900 uppercase tracking-widest border-b border-gray-100 text-right">Validation</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {payments.map((payment) => (
                            <tr key={payment.id} className="hover:bg-gray-50/80 transition-all group">
                                <td className="px-8 py-6">
                                    <p className="text-sm font-bold text-[#0b1f3a]">
                                        {new Date(payment.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </p>
                                    <p className="text-[10px] text-gray-700 font-bold uppercase tracking-widest">
                                        {new Date(payment.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </td>
                                <td className="px-8 py-6">
                                    <p className="text-sm font-black text-gray-900 tracking-tight">
                                        {payment.order?.items?.[0]?.serviceName || 'Account Ledger Entry'}
                                    </p>
                                    <p className="text-[10px] text-primary font-black uppercase tracking-widest">
                                        {payment.order?.orderNumber || 'GENERIC_AUTH'}
                                    </p>
                                </td>
                                <td className="px-8 py-6 text-lg font-black text-[#0b1f3a]">₹{payment.amount.toLocaleString('en-IN')}</td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-2">
                                        {payment.paymentId?.startsWith('MANUAL') ? (
                                            <div className="bg-orange-100 text-orange-900 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-orange-200 flex items-center gap-1.5 shadow-sm">
                                                <div className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" /> QR_DEPOSIT
                                            </div>
                                        ) : payment.paymentId?.startsWith('PAY_LATER') ? (
                                            <div className="bg-purple-100 text-purple-900 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-purple-200 flex items-center gap-1.5 shadow-sm">
                                                <div className="w-1.5 h-1.5 rounded-full bg-purple-600" /> POST_AUDIT
                                            </div>
                                        ) : (
                                            <div className="bg-blue-100 text-blue-900 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-200 flex items-center gap-1.5 shadow-sm">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> INSTANT_ACT
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-3">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[8px] font-black text-gray-400">
                                                    <FileText className="w-3 h-3" />
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">
                                            {payment.order?.documents?.length || 0} Files Attached
                                        </span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`px-4 py-2 rounded-2xl text-[10px] font-black tracking-[0.05em] uppercase border shadow-sm ${payment.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-900 border-emerald-200' :
                                        payment.status === 'PENDING_VERIFICATION' ? 'bg-indigo-100 text-indigo-900 border-indigo-200' :
                                            payment.status === 'PENDING' ? 'bg-amber-100 text-amber-900 border-amber-200' :
                                                'bg-rose-100 text-rose-900 border-rose-200'
                                        }`}>
                                        {payment.status.replace('_', ' ')}
                                    </span>
                                </td>
                                <td className="px-10 py-6 text-right">
                                    {payment.paymentProof ? (
                                        <a
                                            href={`${import.meta.env.VITE_API_BASE_URL || '/api'}/files/${payment.paymentProof.replace(/^\//, '')}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 text-xs font-black text-primary hover:text-[#0b1f3a] uppercase tracking-widest transition-all hover:translate-x-1"
                                        >
                                            View Reciept <ChevronRight className="w-3.5 h-3.5" />
                                        </a>
                                    ) : (
                                        <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">No Document</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};










