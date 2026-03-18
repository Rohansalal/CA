import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Phone, Calendar, Shield, ArrowLeft, Save, Edit2, ChevronRight, CreditCard, FileText } from 'lucide-react';

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
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/profile`, {
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
        <div className="min-h-screen bg-[#F1F5F9]/50 font-outfit">
            {/* Header / Navigation */}
            <header className="bg-[#F8FAFC]/95 backdrop-blur-md border-b border-gray-100 h-20 px-8 md:px-12 flex items-center justify-between sticky top-0 z-40">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="p-2 hover:bg-gray-100 rounded-xl transition-all group"
                        title="Back to Dashboard"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:-translate-x-1 transition-all" />
                    </button>
                    <div>
                        <h2 className="text-xl font-black text-[#0b1f3a] tracking-tight">Identity Profile</h2>
                        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Secure Member Workspace</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        disabled={loading}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest shadow-lg ${isEditing
                            ? 'bg-emerald-500 text-black hover:bg-emerald-600 shadow-emerald-500/20'
                            : 'bg-[#0b1f3a] text-black hover:bg-primary hover:text-black shadow-blue-500/20'
                            } ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-0.5 active:scale-95'}`}
                    >
                        {loading ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : isEditing ? (
                            <>
                                <Save className="w-3.5 h-3.5" /> Commit Changes
                            </>
                        ) : (
                            <>
                                <Edit2 className="w-3.5 h-3.5" /> Update Personal Data
                            </>
                        )}
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6 md:p-10 lg:p-12">
                {/* Hero Profile Section */}
                <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-[#0b1f3a] p-6 md:p-14 text-white shadow-2xl mb-8 md:mb-12 border border-blue-900/50">
                    <div className="absolute top-0 right-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-primary/20 rounded-full -mr-20 md:-mr-40 -mt-20 md:-mt-40 blur-[50px] md:blur-[100px]"></div>
                    <div className="absolute bottom-0 left-0 w-32 md:w-64 h-32 md:h-64 bg-emerald-500/10 rounded-full -ml-16 md:-ml-32 -mb-16 md:-mb-32 blur-[40px] md:blur-[80px]"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
                        <div className="relative">
                            <div className="w-24 h-24 md:w-40 md:h-40 bg-white/10 backdrop-blur-md rounded-[1.5rem] md:rounded-[2.5rem] p-4 border border-white/20 shadow-2xl flex items-center justify-center text-4xl md:text-6xl font-black text-white group cursor-pointer overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <span className="relative z-10">{formData.name.charAt(0).toUpperCase()}</span>
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 md:w-10 md:h-10 bg-emerald-500 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg border-2 md:border-4 border-[#0b1f3a]">
                                <Shield className="w-4 h-4 md:w-5 md:h-5 text-[#0b1f3a]" />
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-[9px] font-bold uppercase tracking-widest text-emerald-400 mb-3 md:mb-4">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                </span>
                                Verified Identity
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2 text-white">{user?.name}</h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4 text-xs md:text-sm text-gray-200 font-medium">
                                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 md:w-4 md:h-4" /> {user?.email}</span>
                                <span className="hidden md:block w-1 h-1 bg-gray-500 rounded-full my-auto"></span>
                                <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 md:w-4 md:h-4" /> {user?.role} Account</span>
                                {user?.phone && (
                                    <>
                                        <span className="hidden md:block w-1 h-1 bg-gray-500 rounded-full my-auto"></span>
                                        <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 md:w-4 md:h-4" /> {user.phone}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Sidebar Information / Navigation */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-gray-100 shadow-sm border-l-4 border-l-primary">
                            <h3 className="text-sm font-black text-[#0b1f3a] uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Shield className="w-4 h-4 text-primary" /> Governance Status
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                    <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-1">KYC STATUS</p>
                                    <p className="text-sm font-bold text-emerald-900">Fully Authenticated</p>
                                </div>
                                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                    <p className="text-[10px] font-black text-blue-800 uppercase tracking-widest mb-1">MEMBER SINCE</p>
                                    <p className="text-sm font-bold text-blue-900">{new Date(user?.createdAt || Date.now()).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-gray-100 shadow-sm">
                            <h3 className="text-sm font-black text-[#0b1f3a] uppercase tracking-widest mb-4">Security Insights</h3>
                            <p className="text-xs text-gray-800 leading-relaxed font-bold">
                                Your account is encrypted with 256-bit SSL technology. All business documents are stored in decentralized cloud nodes.
                            </p>
                            <div className="mt-6 pt-6 border-t border-gray-50 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                    <Shield className="w-4 h-4" />
                                </div>
                                <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Encrypted Data</span>
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
                        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 border border-gray-100 shadow-sm relative overflow-hidden group">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1.5 h-5 bg-[#ee7228] rounded-full"></div>
                                <h3 className="text-lg md:text-xl font-black text-[#0b1f3a] tracking-tight">Tax Credentials</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest px-1">GST Identification (GSTIN)</label>
                                    <input
                                        type="text"
                                        disabled={!isEditing}
                                        value={formData.gstNumber}
                                        onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                                        className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:bg-white focus:border-primary/30 transition-all outline-none font-bold text-[#0b1f3a] disabled:opacity-50 font-mono tracking-wider"
                                        placeholder="27AAAAA0000A1Z5"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest px-1">Permanent Account (PAN)</label>
                                    <input
                                        type="text"
                                        disabled={!isEditing}
                                        value={formData.panNumber}
                                        onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })}
                                        className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:bg-white focus:border-primary/30 transition-all outline-none font-bold text-[#0b1f3a] disabled:opacity-50 font-mono tracking-wider"
                                        placeholder="ABCDE1234F"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Location / Office */}
                        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1.5 h-5 bg-blue-500 rounded-full"></div>
                                <h3 className="text-lg md:text-xl font-black text-[#0b1f3a] tracking-tight">Registered Office</h3>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest px-1">Physical Address</label>
                                    <textarea
                                        rows={2}
                                        disabled={!isEditing}
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        className="w-full p-6 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:bg-white focus:border-primary/30 transition-all outline-none font-bold text-[#0b1f3a] disabled:opacity-50 resize-none"
                                        placeholder="Building, Street, Area..."
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest px-1">City Hub</label>
                                        <input
                                            type="text"
                                            disabled={!isEditing}
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:bg-white focus:border-primary/30 transition-all outline-none font-bold text-[#0b1f3a] disabled:opacity-50"
                                            placeholder="City"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest px-1">State Zone</label>
                                        <input
                                            type="text"
                                            disabled={!isEditing}
                                            value={formData.state}
                                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                            className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:bg-white focus:border-primary/30 transition-all outline-none font-bold text-[#0b1f3a] disabled:opacity-50"
                                            placeholder="State"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest px-1">Postal Code</label>
                                        <input
                                            type="text"
                                            disabled={!isEditing}
                                            value={formData.pincode}
                                            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                            className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:bg-white focus:border-primary/30 transition-all outline-none font-bold text-[#0b1f3a] disabled:opacity-50"
                                            placeholder="000 000"
                                        />
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
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/payments/my-payments`, {
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
            <div className="bg-white rounded-[2.5rem] p-8 md:p-16 border border-dashed border-gray-200 text-center shadow-inner">
                <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <CreditCard className="w-8 h-8 text-gray-300" />
                </div>
                <h4 className="text-xl font-black text-[#0b1f3a] tracking-tight mb-2">Clean Ledger</h4>
                <p className="text-sm text-gray-800 font-bold">No service history or transactions found in your account.</p>
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
                                            href={`${import.meta.env.VITE_API_BASE_URL}/files/${payment.paymentProof.replace(/^\//, '')}`}
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










