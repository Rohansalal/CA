import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InputField } from './InputField';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

interface LoginFormProps {
  direction: number;
  onSwitchToRegister: () => void;
  onSuccess: (role: string) => void;
  locationState: Record<string, unknown>;
  isMobile?: boolean;
}

const slideVariants: Variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: {
    x: 0, opacity: 1,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -48 : 48, opacity: 0,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
  }),
};

export const LoginForm: React.FC<LoginFormProps> = ({
  direction, onSwitchToRegister, onSuccess, locationState, isMobile = false,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { login, loading, error, clearError } = useAuth();

  const validate = () => {
    const e: typeof errors = {};
    if (!email) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email address';
    if (!password) e.password = 'Password is required';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    clearError();
    if (!validate()) return;
    try {
      const user = await login(email, password);
      toast.success('Welcome back!');
      onSuccess(user?.role || 'USER');
    } catch {
      toast.error('Invalid email or password.');
    }
  };

  return (
    <motion.div
      key="login"
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      role="tabpanel"
      id="panel-login"
      aria-labelledby="tab-login"
    >
      {/* Heading - hidden on mobile as it's in the page header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.06 }}
        className={`${isMobile ? 'hidden' : 'mb-7'}`}
      >
        <h2
          className="text-[1.75rem] font-bold text-[#0b2c4d] tracking-[-0.03em] leading-tight"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          Sign into your account
        </h2>
        <p className="text-[14.5px] text-[#64748b] mt-2 leading-relaxed">
          Welcome back — enter your credentials to continue.
        </p>
      </motion.div>

      {/* API Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 p-3 sm:p-4 mb-4 sm:mb-5 bg-red-50 border border-red-100 rounded-xl sm:rounded-2xl"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-red-600 text-[13px] sm:text-[13.5px] leading-snug">{error}</p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-3 sm:space-y-4">
        <InputField
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setErrors((er) => ({ ...er, email: undefined })); }}
          placeholder="Enter your email"
          icon={<Mail className="w-5 h-5" />}
          error={errors.email}
          delay={0.09}
          disabled={loading}
          autoComplete="email"
          aria-label="Email address"
        />

        {/* Password with inline forgot link */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[13px] sm:text-[13.5px] font-semibold text-[#2d3748] tracking-[-0.01em]">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-[11.5px] sm:text-[12.5px] font-semibold text-[#136da1] hover:text-[#0b2c4d] transition-colors"
              tabIndex={loading ? -1 : 0}
            >
              Forgot password?
            </Link>
          </div>
          <InputField
            type={showPwd ? 'text' : 'password'}
            value={password}
            onChange={(e) => { setPassword(e.target.value); setErrors((er) => ({ ...er, password: undefined })); }}
            placeholder="Enter your password"
            icon={<Lock className="w-5 h-5" />}
            rightElement={
              <motion.button
                type="button"
                onClick={() => setShowPwd((p) => !p)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-[#94a3b8] hover:text-[#475569] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1"
                tabIndex={-1}
                aria-label={showPwd ? 'Hide password' : 'Show password'}
              >
                {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </motion.button>
            }
            error={errors.password}
            delay={0.13}
            disabled={loading}
            autoComplete="current-password"
            aria-label="Password"
          />
        </div>

        {/* Submit button */}
        <motion.button
          type="submit"
          disabled={loading}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, delay: 0.2 }}
          whileHover={!loading ? {
            scale: 1.015,
            boxShadow: '0 8px 24px rgba(13,93,145,0.4)',
            y: -1,
          } : {}}
          whileTap={!loading ? { scale: 0.985 } : {}}
          className="w-full h-[48px] sm:h-[54px] rounded-xl sm:rounded-2xl text-white text-[14px] sm:text-[15px] font-bold flex items-center justify-center gap-2.5 mt-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          style={{
            background: 'linear-gradient(135deg, #2196f3 0%, #136da1 50%, #0d5a8e 100%)',
            boxShadow: '0 4px 16px rgba(19,109,161,0.3)',
          }}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            'Log In'
          )}
        </motion.button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-5 sm:my-6">
        <div className="flex-1 h-px bg-[#e2e8f0]" />
        <span className="text-[11px] sm:text-[11.5px] text-[#a0aec0] font-medium tracking-widest uppercase">or</span>
        <div className="flex-1 h-px bg-[#e2e8f0]" />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="text-center text-[13px] sm:text-[14px] text-[#64748b]"
      >
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="font-bold text-[#136da1] hover:text-[#0b2c4d] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1"
        >
          Sign up free →
        </button>
      </motion.p>
    </motion.div>
  );
};
