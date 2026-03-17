import React, { useState, useRef, useEffect } from 'react';
import { Mail, ArrowRight, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface OTPVerificationProps {
    email?: string;
    onVerify?: (otp: string) => Promise<void>;
    onResend?: () => Promise<void>;
    type?: 'email' | 'password-reset';
}

export const OTPVerification: React.FC<OTPVerificationProps> = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    // Prioritize props, fallback to location state
    const email = props.email || location.state?.email || '';
    const type = props.type || location.state?.type || 'email';


    // Default handlers if not provided via props
    const defaultVerify = async (otp: string) => {
        const response = await fetch('http://localhost:5000/api/auth/verify-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Verification failed');
        }

        // Login successful
        if (data.token) {
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/dashboard');
        }
    };

    const defaultResend = async () => {
        const response = await fetch('http://localhost:5000/api/auth/resend-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, type: 'EMAIL_VERIFICATION' }),
        });

        if (!response.ok) {
            throw new Error('Failed to resend OTP');
        }
    };

    const handleVerify = props.onVerify || defaultVerify;
    const handleResendProp = props.onResend || defaultResend;

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendCooldown, setResendCooldown] = useState(0);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        // Focus first input on mount
        inputRefs.current[0]?.focus();
    }, []);

    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) {
            value = value[0];
        }

        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError('');

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-submit when all filled
        if (newOtp.every(digit => digit !== '') && index === 5) {
            handleSubmit(newOtp.join(''));
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
        setOtp(newOtp);

        // Focus last filled input
        const lastIndex = Math.min(pastedData.length, 5);
        inputRefs.current[lastIndex]?.focus();

        // Auto-submit if complete
        if (pastedData.length === 6) {
            handleSubmit(pastedData);
        }
    };

    const handleSubmit = async (otpValue?: string) => {
        const otpString = otpValue || otp.join('');

        if (otpString.length !== 6) {
            setError('Please enter all 6 digits');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await handleVerify(otpString);
        } catch (err: any) {
            setError(err.message || 'Invalid OTP. Please try again.');
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (resendCooldown > 0) return;

        try {
            await handleResendProp();
            setResendCooldown(60);
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } catch (err) {
            setError('Failed to resend OTP');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-secondary flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Precision Associates</h1>
                    <p className="text-neutral-100">Professional CA Services</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Mail className="w-8 h-8 text-primary" />
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
                        {type === 'email' ? 'Verify Your Email' : 'Reset Password'}
                    </h2>
                    <p className="text-center text-gray-600 mb-8">
                        We've sent a 6-digit code to<br />
                        <span className="font-semibold text-primary">{email}</span>
                    </p>

                    {/* OTP Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                            Enter Verification Code
                        </label>
                        <div className="flex gap-2 justify-center" onPaste={handlePaste}>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => { if (el) inputRefs.current[index] = el; }}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
                                    disabled={loading}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm text-center">
                            {error}
                        </div>
                    )}

                    {/* Verify Button */}
                    <button
                        onClick={() => handleSubmit()}
                        disabled={loading || otp.some(d => !d)}
                        className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-4"
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                Verifying...
                            </>
                        ) : (
                            <>
                                <CheckCircle className="w-5 h-5" />
                                Verify Code
                            </>
                        )}
                    </button>

                    {/* Resend */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">
                            Didn't receive the code?
                        </p>
                        <button
                            onClick={handleResend}
                            disabled={resendCooldown > 0}
                            className="text-primary hover:text-primary/80 font-semibold text-sm flex items-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <RefreshCw className="w-4 h-4" />
                            {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
                        </button>
                    </div>

                    {/* Timer Info */}
                    <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                        <p className="text-xs text-blue-700">
                            ⏱️ Code expires in 10 minutes
                        </p>
                    </div>
                </div>

                {/* Help Text */}
                <p className="text-center text-white/80 text-sm mt-6">
                    Check your spam folder if you don't see the email
                </p>
            </div>
        </div>
    );
};









