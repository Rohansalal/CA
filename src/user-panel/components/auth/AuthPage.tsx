import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LeftPanel } from './LeftPanel';
import { AuthCard } from './AuthCard';

type Mode = 'login' | 'register';

interface AuthPageProps {
  initialMode: Mode;
  returnTo?: string;
  locationState?: Record<string, unknown>;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode,
  returnTo = '/dashboard',
  locationState = {},
}) => {
  const navigate = useNavigate();

  const handleLoginSuccess = (role: string) => {
    setTimeout(() => {
      navigate(role === 'ADMIN' ? '/admin/dashboard' : returnTo, {
        state: locationState,
        replace: true,
      });
    }, 700);
  };

  const handleRegisterSuccess = () => {
    setTimeout(() => {
      navigate(returnTo, { state: locationState, replace: true });
    }, 700);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex relative overflow-hidden"
      style={{
        fontFamily: "'Inter', 'Poppins', sans-serif",
        background: 'linear-gradient(145deg, #071428 0%, #0b1e38 40%, #0d2244 70%, #091830 100%)',
      }}
    >
      {/* ── Global decorative blobs (visible on both sides) ── */}
      <div
        className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(19,109,161,0.18) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        className="absolute bottom-[-5%] right-[10%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 65%)',
          filter: 'blur(55px)',
        }}
      />
      <div
        className="absolute top-[60%] left-[45%] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 65%)',
          filter: 'blur(45px)',
        }}
      />

      {/* ── Left branding panel ── */}
      <LeftPanel />

      {/* ── Vertical separator ── */}
      <div
        className="hidden lg:block w-px self-stretch my-8 shrink-0"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)' }}
      />

      {/* ── Right form panel — white background ── */}
      <div
        className="flex-1 flex items-center justify-center overflow-y-auto relative z-10 px-5 pt-0 pb-8 sm:px-10"
        style={{ background: '#ffffff' }}
      >
        <div className="w-full max-w-[500px]">

          {/* Mobile logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex justify-center mb-8 lg:hidden"
          >
            <img src="/logo.png" alt="CA India" className="h-12 w-auto" />
          </motion.div>

          {/* Auth card */}
          <AuthCard
            initialMode={initialMode}
            onLoginSuccess={handleLoginSuccess}
            onRegisterSuccess={handleRegisterSuccess}
            locationState={locationState}
          />

          {/* SSL note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center justify-center gap-2 mt-6"
          >
            <svg
              width="13" height="13" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              className="shrink-0 text-[#b0bec5]"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <p className="text-[12px] text-[#b0bec5]">
              256-bit SSL encrypted &middot; Your data is safe
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
