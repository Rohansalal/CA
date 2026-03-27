import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft, Lock, Eye, EyeOff, Loader2, ShieldCheck } from 'lucide-react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { AuthInput } from '../components/auth/AuthInput';
import { toast } from 'sonner';

const API = import.meta.env.VITE_API_BASE_URL || '/api';

export const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState<'email' | 'otp' | 'newPassword'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetToken, setResetToken] = useState('');
  const navigate = useNavigate();
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  /* ── Step 1: Send OTP ── */
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Failed to send OTP. Please check your email address.');
      setStep('otp');
      toast.success('Reset code sent to your email');
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  /* ── Step 2: Verify OTP ── */
  const handleVerifyOTP = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) { setError('Please enter all 6 digits'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/auth/verify-reset-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpString }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid OTP');
      setResetToken(data.resetToken);
      setStep('newPassword');
    } catch (err: any) {
      setError(err.message || 'Invalid OTP');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  /* ── Step 3: Reset password ── */
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) { setError('Passwords do not match'); return; }
    if (newPassword.length < 8) { setError('Password must be at least 8 characters'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resetToken, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to reset password');
      toast.success('Password reset successfully! Please sign in.');
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  /* ── OTP input handler ── */
  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
    if (newOtp.every((d) => d !== '') && index === 5) handleVerifyOTP();
  };

  const handleOTPKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOTP = async () => {
    try {
      await fetch(`${API}/auth/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'PASSWORD_RESET' }),
      });
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      toast.success('OTP resent successfully!');
    } catch {
      setError('Failed to resend OTP');
    }
  };

  /* ── Shared error block ── */
  const ErrorBlock = () =>
    error ? (
      <div className="mb-5 flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-100 rounded-xl">
        <svg className="w-4 h-4 text-red-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <p className="text-red-600 text-sm leading-snug">{error}</p>
      </div>
    ) : null;

  return (
    <AuthLayout variant="forgot">
      {/* Back link */}
      <Link
        to="/login"
        className="inline-flex items-center gap-2 text-[13px] font-medium text-[#6b7280] hover:text-[#136da1] transition-colors mb-7 group"
      >
        <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
        Back to Sign In
      </Link>

      {/* ══ Step 1: Email ══ */}
      {step === 'email' && (
        <>
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
            style={{ background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)' }}
          >
            <Lock className="w-7 h-7 text-[#136da1]" />
          </div>

          <div className="mb-7">
            <h2
              className="text-[24px] font-bold text-[#0b1f3a] mb-1.5"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Forgot password?
            </h2>
            <p className="text-sm text-[#6b7280]">
              Enter your registered email and we'll send you a 6-digit reset code.
            </p>
          </div>

          <ErrorBlock />

          <form onSubmit={handleSendOTP} className="space-y-5" noValidate>
            <AuthInput
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              icon={<Mail className="w-4 h-4" />}
              disabled={loading}
              autoComplete="email"
              required
            />

            <button
              type="submit"
              disabled={!email || loading}
              className="w-full h-[46px] rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #1a7bbf 0%, #136da1 50%, #0e5a8a 100%)',
                boxShadow: email ? '0 4px 20px rgba(19,109,161,0.35)' : 'none',
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending code...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  Send Reset Code
                </>
              )}
            </button>
          </form>
        </>
      )}

      {/* ══ Step 2: OTP ══ */}
      {step === 'otp' && (
        <>
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
            style={{ background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)' }}
          >
            <Mail className="w-7 h-7 text-[#136da1]" />
          </div>

          <div className="mb-7">
            <h2
              className="text-[24px] font-bold text-[#0b1f3a] mb-1.5"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Enter reset code
            </h2>
            <p className="text-sm text-[#6b7280]">
              We've sent a 6-digit code to{' '}
              <span className="font-semibold text-[#0b1f3a]">{email}</span>
            </p>
          </div>

          <ErrorBlock />

          {/* OTP boxes */}
          <div className="flex gap-2.5 justify-center mb-7">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { if (el) inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOTPChange(index, e.target.value)}
                onKeyDown={(e) => handleOTPKeyDown(index, e)}
                className="w-11 h-14 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all duration-200"
                style={{
                  borderColor: digit ? '#136da1' : '#dde3ec',
                  background: digit ? '#eff8ff' : 'white',
                  color: '#0b1f3a',
                  boxShadow: digit ? '0 0 0 3px rgba(19,109,161,0.1)' : 'none',
                }}
                disabled={loading}
              />
            ))}
          </div>

          <button
            onClick={handleVerifyOTP}
            disabled={loading || otp.some((d) => !d)}
            className="w-full h-[46px] rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            style={{
              background: 'linear-gradient(135deg, #1a7bbf 0%, #136da1 50%, #0e5a8a 100%)',
              boxShadow: '0 4px 20px rgba(19,109,161,0.35)',
            }}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify Code'
            )}
          </button>

          <p className="text-center text-sm text-[#6b7280]">
            Didn't receive it?{' '}
            <button
              type="button"
              onClick={handleResendOTP}
              className="font-bold text-[#136da1] hover:text-[#0b1f3a] transition-colors"
            >
              Resend code
            </button>
          </p>
        </>
      )}

      {/* ══ Step 3: New password ══ */}
      {step === 'newPassword' && (
        <>
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
            style={{ background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)' }}
          >
            <ShieldCheck className="w-7 h-7 text-[#16a34a]" />
          </div>

          <div className="mb-7">
            <h2
              className="text-[24px] font-bold text-[#0b1f3a] mb-1.5"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Create new password
            </h2>
            <p className="text-sm text-[#6b7280]">
              Choose a strong password to secure your account.
            </p>
          </div>

          <ErrorBlock />

          <form onSubmit={handleResetPassword} className="space-y-4" noValidate>
            <AuthInput
              label="New password"
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Create a strong password"
              icon={<Lock className="w-4 h-4" />}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#9ca3af] hover:text-[#374151] transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              disabled={loading}
              autoComplete="new-password"
            />

            <AuthInput
              label="Confirm new password"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              icon={<Lock className="w-4 h-4" />}
              error={
                confirmPassword.length > 0 && newPassword !== confirmPassword
                  ? 'Passwords do not match'
                  : undefined
              }
              disabled={loading}
              autoComplete="new-password"
            />

            <button
              type="submit"
              disabled={!newPassword || !confirmPassword || loading}
              className="w-full h-[46px] rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              style={{
                background: 'linear-gradient(135deg, #1a7bbf 0%, #136da1 50%, #0e5a8a 100%)',
                boxShadow: '0 4px 20px rgba(19,109,161,0.35)',
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Resetting...
                </>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
        </>
      )}
    </AuthLayout>
  );
};
