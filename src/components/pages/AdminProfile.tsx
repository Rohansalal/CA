import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';
import {
    User, Mail, Shield, ArrowLeft, Save, Edit2, Lock,
    Activity, Server, Database, CheckCircle, AlertTriangle
} from 'lucide-react';

interface AdminProfileData {
    id: number;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

export const AdminProfile: React.FC = () => {
    const { adminUser, verifyAdminAccess } = useAdmin();
    const navigate = useNavigate();

    const [profile, setProfile] = useState<AdminProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [isEditing, setIsEditing] = useState(false);

    // Form States
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            setLoading(true);
            const token = localStorage.getItem('adminToken');

            const headers: HeadersInit = {};
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/profile`, {
                headers,
                credentials: 'include'
            });

            if (!res.ok) throw new Error('Failed to fetch profile');

            const data = await res.json();
            setProfile(data.admin);
            setName(data.admin.name);
            setEmail(data.admin.email);
        } catch (err) {
            console.error(err);
            setError('Failed to load profile data');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (newPassword && newPassword !== confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        if (newPassword && !currentPassword) {
            setError('Current password is required to set a new password');
            return;
        }

        try {
            const token = localStorage.getItem('adminToken');

            const headers: HeadersInit = {
                'Content-Type': 'application/json'
            };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/profile`, {
                method: 'PUT',
                headers,
                credentials: 'include',
                body: JSON.stringify({
                    name,
                    email,
                    password: currentPassword || undefined,
                    newPassword: newPassword || undefined
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to update profile');
            }

            setProfile(data.admin);
            setSuccess('Profile updated successfully');
            setIsEditing(false);

            // specific cleanup
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');

            // Verify context to update global state if needed
            verifyAdminAccess();

        } catch (err: any) {
            setError(err.message);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50 p-6">
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={() => navigate('/admin/dashboard')}
                    className="mb-6 flex items-center text-gray-600 hover:text-primary transition"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                </button>

                {/* Main Profile Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                    {/* Header Cover */}
                    <div className="h-48 bg-gradient-to-r from-gray-900 to-slate-800 relative">
                        <div className="absolute -bottom-16 left-8">
                            <div className="w-32 h-32 bg-white rounded-full p-2 shadow-lg">
                                <div className="w-full h-full bg-slate-200 rounded-full flex items-center justify-center text-4xl font-bold text-slate-600">
                                    <Shield className="w-16 h-16" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-20 pb-8 px-8">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{profile?.name}</h1>
                                <p className="text-gray-500 flex items-center gap-2 mt-1 uppercase tracking-wide font-semibold text-xs">
                                    <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                                        {profile?.role || 'ADMIN'}
                                    </span>
                                    <span>•</span>
                                    <span>ID: #{profile?.id}</span>
                                </p>
                            </div>

                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition font-medium ${isEditing
                                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    : 'bg-primary text-white hover:bg-primary-dark'
                                    }`}
                            >
                                {isEditing ? 'Cancel Editing' : (
                                    <>
                                        <Edit2 className="w-4 h-4" /> Edit Profile
                                    </>
                                )}
                            </button>
                        </div>

                        {error && (
                            <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5" />
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="mb-6 bg-green-50 text-green-600 p-4 rounded-lg flex items-center gap-2">
                                <CheckCircle className="w-5 h-5" />
                                {success}
                            </div>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column: Form */}
                            <div className="lg:col-span-2 space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">
                                    Account Details
                                </h3>

                                <form onSubmit={handleUpdate} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                                            <div className="relative">
                                                <User className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    disabled={!isEditing}
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                                            <div className="relative">
                                                <Mail className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                                                <input
                                                    type="email"
                                                    disabled={!isEditing}
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {isEditing && (
                                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                            <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                <Lock className="w-4 h-4" /> Security Update
                                            </h4>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-500 mb-1">Current Password (Required to save)</label>
                                                    <input
                                                        type="password"
                                                        value={currentPassword}
                                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-500 mb-1">New Password (Optional)</label>
                                                        <input
                                                            type="password"
                                                            value={newPassword}
                                                            onChange={(e) => setNewPassword(e.target.value)}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-500 mb-1">Confirm New Password</label>
                                                        <input
                                                            type="password"
                                                            value={confirmPassword}
                                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {isEditing && (
                                        <div className="flex justify-end gap-3 pt-4">
                                            <button
                                                type="button"
                                                onClick={() => setIsEditing(false)}
                                                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark font-medium transition flex items-center gap-2"
                                            >
                                                <Save className="w-4 h-4 block" />
                                                Save Changes
                                            </button>
                                        </div>
                                    )}
                                </form>
                            </div>

                            {/* Right Column: Advanced Info */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">
                                    System Status & Info
                                </h3>

                                <div className="space-y-4">
                                    {/* System Health Card */}
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                        <div className="flex items-center justify-center gap-2 mb-3">
                                            <Activity className="w-5 h-5 text-green-500" />
                                            <span className="font-semibold text-slate-700">System Healthy</span>
                                        </div>
                                        <div className="space-y-2 text-xs text-slate-500">
                                            <div className="flex justify-between items-center bg-white p-2 rounded border border-slate-100">
                                                <span className="flex items-center gap-2"><Server className="w-3 h-3" /> API Server</span>
                                                <span className="text-green-600 font-bold">Online</span>
                                            </div>
                                            <div className="flex justify-between items-center bg-white p-2 rounded border border-slate-100">
                                                <span className="flex items-center gap-2"><Database className="w-3 h-3" /> Database</span>
                                                <span className="text-green-600 font-bold">Connected</span>
                                            </div>
                                            <div className="flex justify-between items-center bg-white p-2 rounded border border-slate-100">
                                                <span className="flex items-center gap-2"><Lock className="w-3 h-3" /> SSL/TLS</span>
                                                <span className="text-green-600 font-bold">Active</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Admin Details */}
                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                        <h4 className="text-sm font-bold text-blue-900 mb-2">Access Level</h4>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full border border-blue-200">Full Access</span>
                                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full border border-blue-200">User Management</span>
                                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full border border-blue-200">Service Config</span>
                                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full border border-blue-200">Finances</span>
                                        </div>
                                    </div>

                                    <div className="text-xs text-gray-400 text-center pt-4">
                                        Account Created: {new Date(profile?.createdAt || '').toLocaleDateString()}
                                        <br />
                                        Last Updated: {new Date(profile?.updatedAt || '').toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
