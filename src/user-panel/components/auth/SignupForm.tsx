import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { User, Mail, Lock, Phone, Eye, EyeOff, Loader2, AlertCircle, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InputField } from './InputField';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

interface SignupFormProps {
  direction: number;
  onSwitchToLogin: () => void;
  onSuccess: () => void;
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

const STRENGTH_META: Record<number, { label: string; color: string; bg: string }> = {
  0: { label: '', color: '#e2e8f0', bg: '#e2e8f0' },
  1: { label: 'Weak', color: '#f56565', bg: '#fff5f5' },
  2: { label: 'Fair', color: '#ed8936', bg: '#fffaf0' },
  3: { label: 'Good', color: '#68d391', bg: '#f0fff4' },
  4: { label: 'Strong', color: '#48bb78', bg: '#f0fff4' },
};

export const SignupForm: React.FC<SignupFormProps> = ({
  direction, onSwitchToLogin, onSuccess, locationState, isMobile = false,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { register, loading, error, clearError } = useAuth();

  const [pwdChecks, setPwdChecks] = useState({
    len: false, upper: false, num: false, special: false, match: false,
  });

  useEffect(() => {
    setPwdChecks({
      len: password.length >= 8,
      upper: /[A-Z]/.test(password),
      num: /[0-9]/.test(password),
      special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
      match: password === confirm && confirm.length > 0,
    });
  }, [password, confirm]);

  const strength = [pwdChecks.len, pwdChecks.upper, pwdChecks.num, pwdChecks.special].filter(Boolean).length;
  const sm = STRENGTH_META[strength];

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Full name is required';
    if (!email) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email address';
    if (!phone || phone.length < 10) e.phone = 'Enter a valid 10-digit number';
    if (!pwdChecks.len) e.password = 'Password must be at least 8 characters';
    else if (!pwdChecks.upper) e.password = 'Password must contain at least one uppercase letter';
    else if (!pwdChecks.num) e.password = 'Password must contain at least one number';
    else if (!pwdChecks.special) e.password = 'Password must contain at least one special character (e.g. @#$!)';
    if (!pwdChecks.match) e.confirm = 'Passwords do not match';
    if (!agreed) e.terms = 'Please agree to the terms to continue';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    clearError();
    if (!validate()) return;
    try {
      await register(name, email, phone, password);
      toast.success('Account created! Redirecting...');
      onSuccess();
    } catch (err: any) {
      toast.error(err.message || 'Failed to create account.');
    }
  };

  const clearErr = (key: string) => setErrors((e) => { const n = { ...e }; delete n[key]; return n; });

  const EyeBtn = ({ show, toggle }: { show: boolean; toggle: () => void }) => (
    <motion.button
      type="button" onClick={toggle} tabIndex={-1}
      whileHover={{ scale: 1.18 }} whileTap={{ scale: 0.88 }}
      className="text-[#94a3b8] hover:text-[#475569] transition-colors focus:outline-none"
    >
      {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
    </motion.button>
  );

  return (
    <motion.div
      key="register"
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      role="tabpanel"
      id="panel-register"
      aria-labelledby="tab-register"
    >
      {/* Heading - hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.06 }}
        className={`${isMobile ? 'hidden' : 'mb-6'}`}
      >
        <h2
          className="text-[1.75rem] font-bold text-[#0b2c4d] tracking-[-0.03em] leading-tight"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          Create your account
        </h2>
        <p className="text-[14.5px] text-[#64748b] mt-2 leading-relaxed">
          Sign up and get 1 month free trial.
        </p>
      </motion.div>

      {/* API Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 p-3 sm:p-4 mb-4 sm:mb-5 bg-red-50 border border-red-100 rounded-xl sm:rounded-2xl"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-red-600 text-[13px] sm:text-[13.5px] leading-snug">{error}</p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">

        {/* Full Name */}
        <InputField
          label="Full name"
          type="text" value={name}
          onChange={(e) => { setName(e.target.value); clearErr('name'); }}
          placeholder="Enter your full name"
          icon={<User className="w-5 h-5" />}
          error={errors.name} delay={0.07}
          disabled={loading} autoComplete="name"
        />

        {/* Email + Phone — 2-col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Email" type="email" value={email}
            onChange={(e) => { setEmail(e.target.value); clearErr('email'); }}
            placeholder="Enter your email"
            icon={<Mail className="w-5 h-5" />}
            error={errors.email} delay={0.1}
            disabled={loading} autoComplete="email"
          />
          <InputField
            label="Phone" type="tel" value={phone}
            onChange={(e) => { setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10)); clearErr('phone'); }}
            placeholder="9876543210"
            icon={<Phone className="w-5 h-5" />}
            error={errors.phone} delay={0.1}
            disabled={loading} autoComplete="tel"
          />
        </div>

        {/* Password + strength */}
        <div className="space-y-2.5">
          <InputField
            label="Password"
            type={showPwd ? 'text' : 'password'} value={password}
            onChange={(e) => { setPassword(e.target.value); clearErr('password'); }}
            placeholder="Create a strong password"
            icon={<Lock className="w-5 h-5" />}
            rightElement={<EyeBtn show={showPwd} toggle={() => setShowPwd((p) => !p)} />}
            error={errors.password} delay={0.13}
            disabled={loading} autoComplete="new-password"
          />

          {/* Strength meter */}
          <AnimatePresence>
            {password.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2 overflow-hidden"
              >
                {/* Bar + label */}
                <div className="flex items-center gap-2.5">
                  <div className="flex gap-1.5 flex-1">
                    {[1, 2, 3, 4].map((lvl) => (
                      <motion.div
                        key={lvl}
                        className="h-[4px] flex-1 rounded-full"
                        animate={{ background: strength >= lvl ? sm.color : '#e2e8f0' }}
                        transition={{ duration: 0.35 }}
                      />
                    ))}
                  </div>
                  {sm.label && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[11.5px] font-bold shrink-0"
                      style={{ color: sm.color }}
                    >
                      {sm.label}
                    </motion.span>
                  )}
                </div>

                {/* Check badges */}
                <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                  {[
                    { ok: pwdChecks.len, text: '8+ chars' },
                    { ok: pwdChecks.upper, text: 'Uppercase' },
                    { ok: pwdChecks.num, text: 'Number' },
                    { ok: pwdChecks.special, text: 'Symbol (!@#$)' },
                  ].map((r, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1.5 text-[12px] font-medium transition-colors duration-200"
                      style={{ color: r.ok ? '#38a169' : '#a0aec0' }}
                    >
                      <span
                        className="inline-flex w-4 h-4 rounded-full items-center justify-center"
                        style={{ background: r.ok ? '#c6f6d5' : '#f0f0f0' }}
                      >
                        <Check className="w-2.5 h-2.5" strokeWidth={3} />
                      </span>
                      {r.text}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Confirm password */}
        <InputField
          label="Repeat the password"
          type={showConfirm ? 'text' : 'password'} value={confirm}
          onChange={(e) => { setConfirm(e.target.value); clearErr('confirm'); }}
          placeholder="Enter your password"
          icon={<Lock className="w-5 h-5" />}
          rightElement={<EyeBtn show={showConfirm} toggle={() => setShowConfirm((p) => !p)} />}
          error={errors.confirm}
          inputClassName={pwdChecks.match ? '!border-[#68d391] focus:!border-[#48bb78] focus:!shadow-[0_0_0_4px_rgba(72,187,120,0.12)]' : ''}
          delay={0.16}
          disabled={loading} autoComplete="new-password"
        />

        {/* ── Terms checkbox — double-layer animated ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.19 }}
          className="pt-1"
        >
          <label
            className="flex items-start gap-3.5 cursor-pointer select-none group"
            htmlFor="signup-terms"
          >
            {/* Custom double-layer checkbox */}
            <div className="relative shrink-0 mt-[2px]">
              <input
                id="signup-terms"
                type="checkbox"
                checked={agreed}
                onChange={(e) => { setAgreed(e.target.checked); clearErr('terms'); }}
                className="sr-only"
                disabled={loading}
              />

              {/* Outer ring */}
              <motion.div
                animate={{
                  borderColor: errors.terms
                    ? '#f56565'
                    : agreed
                    ? '#136da1'
                    : '#cbd5e0',
                  scale: agreed ? [1, 1.12, 1] : 1,
                }}
                transition={{ duration: 0.22, times: [0, 0.4, 1] }}
                className="w-[22px] h-[22px] rounded-[6px] border-2 relative overflow-hidden flex items-center justify-center"
                style={{ background: agreed ? '#136da1' : 'white' }}
              >
                {/* Checkmark */}
                <AnimatePresence>
                  {agreed && (
                    <motion.div
                      initial={{ scale: 0, rotate: -12 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    >
                      <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Ripple burst on check */}
              <AnimatePresence>
                {agreed && (
                  <motion.div
                    key="ripple"
                    initial={{ scale: 0.6, opacity: 0.6 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-lg bg-[#136da1] pointer-events-none"
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Label text */}
            <span className="text-[13.5px] text-[#64748b] leading-relaxed">
              I agree to the{' '}
              <Link
                to="/terms-conditions"
                className="font-semibold text-[#136da1] hover:text-[#0b2c4d] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Terms &amp; Conditions
              </Link>{' '}
              and{' '}
              <Link
                to="/privacy-policy"
                className="font-semibold text-[#136da1] hover:text-[#0b2c4d] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Privacy Policy
              </Link>
            </span>
          </label>

          {errors.terms && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-1.5 ml-[34px] text-[12.5px] text-red-500 font-medium"
            >
              {errors.terms}
            </motion.p>
          )}
        </motion.div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={loading}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, delay: 0.24 }}
          whileHover={!loading ? {
            scale: 1.015,
            boxShadow: '0 8px 24px rgba(13,93,145,0.4)',
            y: -1,
          } : {}}
          whileTap={!loading ? { scale: 0.985 } : {}}
          className="w-full h-[48px] sm:h-[54px] rounded-xl sm:rounded-2xl text-white text-[14px] sm:text-[15px] font-bold flex items-center justify-center gap-2.5 mt-1 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          style={{
            background: 'linear-gradient(135deg, #2196f3 0%, #136da1 50%, #0d5a8e 100%)',
            boxShadow: '0 4px 16px rgba(19,109,161,0.3)',
          }}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Creating account...</span>
            </>
          ) : (
            'Sign Up'
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
        transition={{ delay: 0.28 }}
        className="text-center text-[13px] sm:text-[14px] text-[#64748b]"
      >
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-bold text-[#136da1] hover:text-[#0b2c4d] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1"
        >
          Log in →
        </button>
      </motion.p>
    </motion.div>
  );
};
