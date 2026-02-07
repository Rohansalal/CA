import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Phone, Calendar, Shield, ArrowLeft, Save, Edit2 } from 'lucide-react';

export const UserProfile: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const { user, login } = useAuth(); // login used here to potentially update local user state if we had an update function
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
            });
        }
    }, [user]);

    // If the URL username doesn't match the logged-in user, we might want to redirect or show an error
    // unless we allow viewing other profiles. For now, let's assume it's personal.
    /*
    if (user && username && user.name !== username) {
        // Handle mismatch?
    } 
    */

    const handleSave = async () => {
        // API call to update profile would go here
        setIsEditing(false);
        alert("Profile update functionality would be implemented here connecting to a backend endpoint.");
    };

    return (
        <div className="min-h-screen bg-neutral-50 p-6">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="mb-6 flex items-center text-gray-600 hover:text-primary transition"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                </button>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header Cover */}
                    <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
                        <div className="absolute -bottom-16 left-8">
                            <div className="w-32 h-32 bg-white rounded-full p-2 shadow-lg">
                                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-4xl font-bold text-gray-500">
                                    {formData.name.charAt(0).toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-20 pb-8 px-8">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
                                <p className="text-gray-500 flex items-center gap-2 mt-1">
                                    <Shield className="w-4 h-4 text-primary" />
                                    {user?.role} Account
                                </p>
                            </div>

                            <button
                                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition font-medium ${isEditing
                                        ? 'bg-green-600 text-white hover:bg-green-700'
                                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {isEditing ? (
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Personal Information */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">
                                    Personal Information
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                                        <div className="relative">
                                            <User className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                                            <input
                                                type="text"
                                                disabled={!isEditing}
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                                                disabled={true} // Email usually immutable
                                                value={formData.email}
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                                            <input
                                                type="tel"
                                                disabled={!isEditing}
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Account Statistics */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">
                                    Account Overview
                                </h3>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                        <div className="text-blue-500 text-sm font-semibold mb-1">Member Since</div>
                                        <div className="flex items-center gap-2 text-gray-900 font-bold">
                                            <Calendar className="w-4 h-4" />
                                            {new Date().getFullYear()} {/* Mock date */}
                                        </div>
                                    </div>

                                    <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                        <div className="text-green-500 text-sm font-semibold mb-1">Verification Status</div>
                                        <div className="flex items-center gap-2 text-gray-900 font-bold">
                                            <Shield className="w-4 h-4" />
                                            Verified
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                    <h4 className="font-semibold text-gray-900 mb-2">Security Settings</h4>
                                    <button className="text-primary hover:text-blue-700 text-sm font-medium flex items-center gap-1 transition">
                                        Change Password <ArrowLeft className="w-3 h-3 rotate-180" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
