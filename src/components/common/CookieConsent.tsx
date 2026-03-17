import React, { useState, useEffect } from 'react';
import { Cookie, X, Shield, CheckCircle2 } from "lucide-react";

interface Toast {
    id: string;
    type: 'success' | 'error';
    message: string;
}

export const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [toasts, setToasts] = useState<Toast[]>([]);

    const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

    useEffect(() => {
        // const storedConsent = localStorage.getItem('cookie-consent');
        // if (!storedConsent) {
        const timer = setTimeout(() => setIsVisible(true), 1500);
        return () => clearTimeout(timer);
        // }
    }, []);

    const showToast = (type: 'success' | 'error', message: string) => {
        const id = Date.now().toString();
        setToasts(prev => [...prev, { id, type, message }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 4000);
    };

    const saveToBackend = async (status: 'accepted' | 'declined') => {
        try {
            const response = await fetch(`${API_BASE}/cookies/consent`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status,
                    userAgent: navigator.userAgent,
                    timestamp: new Date().toISOString(),
                    url: window.location.href,
                }),
                credentials: 'include',
            });

            if (!response.ok) throw new Error('API Error');
            return await response.json();
        } catch (error) {
            console.error('[CookieConsent] API Error:', error);
            throw error;
        }
    };

    const handleDecision = async (status: 'accepted' | 'declined') => {
        setIsLoading(true);
        try {
            localStorage.setItem('cookie-consent', status);
            localStorage.setItem('cookie-consent-timestamp', new Date().toISOString());

            // Dispatch event immediately so the app reacts
            window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: { status } }));

            // Try to sync with backend, but don't block UI if it fails
            try {
                await saveToBackend(status);
            } catch (backendError) {
                console.warn('Backend sync failed:', backendError);
                // Fail silently for user, as local preference is saved
            }

            // setIsVisible(false);
            showToast('success', '✓ Preferences saved');
        } catch (error) {
            console.error('Cookie consent error:', error);
            showToast('error', 'Failed to save preferences');
        } finally {
            setIsLoading(false);
        }
    };

    // Only return null if both modal is hidden AND no toasts to show
    if (!isVisible && toasts.length === 0) return null;

    return (
        <>
            {isVisible && (
                <>
                    {/* DARK OVERLAY - Z-INDEX 100000 */}
                    <div
                        className="fixed inset-0 z-[100000] bg-black/50 backdrop-blur-sm"
                        onClick={() => !isLoading && setIsVisible(false)}
                    />

                    {/* WHITE MODAL - Z-INDEX 100001 (ON TOP) */}
                    <div className="fixed inset-0 z-[100001] flex items-center justify-center p-4">
                        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

                            {/* Top Gradient Line */}
                            <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600" />

                            {/* Close Button */}
                            <button
                                onClick={() => !isLoading && setIsVisible(false)}
                                disabled={isLoading}
                                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors z-10"
                            >
                                <X size={20} strokeWidth={2.5} />
                            </button>

                            {/* Main Content - WHITE BACKGROUND WITH DARK TEXT */}
                            <div className="p-8">
                                {/* Header with Icon */}
                                <div className="flex gap-4 mb-5">
                                    <div className="p-3 bg-blue-100 rounded-xl text-blue-700 shrink-0">
                                        <Cookie size={28} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Cookie Settings</h2>
                                        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-300 mt-2">
                                            <Shield size={12} strokeWidth={2.5} />
                                            <span>GDPR Compliant</span>
                                        </div>
                                        <p className="text-xs font-semibold text-gray-500 mt-2">
                                            Avinash Payal & Associates
                                        </p>
                                    </div>
                                </div>

                                {/* Description Text - DARK GRAY ON WHITE */}
                                <p className="text-base text-gray-700 leading-relaxed mb-6">
                                    We use cookies to enhance your experience, analyze performance, and personalize content. Essential cookies are always enabled.
                                </p>

                                {/* Cookie Info Grid */}
                                <div className="grid grid-cols-2 gap-4 mb-7 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                                        <span className="text-sm font-semibold text-gray-700">Essential: Always</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>
                                        <span className="text-sm font-semibold text-gray-700">Analytics: Optional</span>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex flex-col gap-3 mb-5">
                                    <button
                                        onClick={() => handleDecision('accepted')}
                                        disabled={isLoading}
                                        className="w-full h-12 bg-blue-700 hover:bg-blue-800 text-white text-base font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 transition-all"
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle2 size={20} />
                                                Accept All
                                            </>
                                        )}
                                    </button>

                                    <button
                                        onClick={() => handleDecision('declined')}
                                        disabled={isLoading}
                                        className="w-full h-12 bg-white text-gray-800 text-base font-bold rounded-xl border-2 border-gray-300 hover:bg-gray-50 disabled:opacity-60 transition-all"
                                    >
                                        Decline
                                    </button>
                                </div>

                                {/* Footer Links - DARK TEXT */}
                                <div className="pt-5 border-t border-gray-200 flex flex-wrap justify-center gap-4 text-xs font-semibold text-gray-600">
                                    <a href="/privacy-policy" className="hover:text-blue-700 hover:underline">Privacy Policy</a>
                                    <span className="text-gray-300">|</span>
                                    <a href="/cookie-policy" className="hover:text-blue-700 hover:underline">Cookie Policy</a>
                                    <span className="text-gray-300">|</span>
                                    <a href="/terms-conditions" className="hover:text-blue-700 hover:underline">Terms</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* TOAST NOTIFICATIONS - Z-INDEX 100002 */}
            <div className="fixed top-6 right-6 z-[100002] flex flex-col gap-3">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`px-5 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 shadow-lg animate-in fade-in slide-in-from-top-5 ${toast.type === 'success'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-red-100 text-red-800 border border-red-300'
                            }`}
                    >
                        {toast.type === 'success' ? '✓' : '✕'} {toast.message}
                    </div>
                ))}
            </div>
        </>
    );
};



