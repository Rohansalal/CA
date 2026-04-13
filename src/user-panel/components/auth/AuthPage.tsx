import React, { useEffect, useState } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLoginSuccess = (role: string) => {
    setTimeout(() => {
      navigate(role === 'ADMIN' ? '/admin/dashboard' : returnTo, {
        state: locationState,
        replace: true,
      });
    }, 500);
  };

  const handleRegisterSuccess = () => {
    setTimeout(() => {
      navigate(returnTo, { state: locationState, replace: true });
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex relative overflow-hidden bg-white lg:bg-transparent"
      style={{
        fontFamily: "'Inter', 'Poppins', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Desktop background gradient - hidden on mobile */}
      <div 
        className="hidden lg:block absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(145deg, #071428 0%, #0b1e38 40%, #0d2244 70%, #091830 100%)',
        }}
      />
      
      {/* ── Global decorative blobs (desktop only) ── */}
      <div className="hidden lg:block absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(19,109,161,0.18) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }}
      />
      <div className="hidden lg:block absolute bottom-[-5%] right-[10%] w-[400px] h-[400px] rounded-full pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 65%)',
          filter: 'blur(55px)',
        }}
      />

      {/* ── Left branding panel ── */}
      <LeftPanel />

      {/* ── Vertical separator (desktop only) ── */}
      <div className="hidden lg:block w-px self-stretch my-8 shrink-0"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)' }}
      />

      {/* ── Right form panel ── */}
      <div className="flex-1 flex items-center justify-center overflow-y-auto relative z-10 w-full min-h-screen lg:min-h-0 lg:bg-white">
        <div className="w-full max-w-[480px] px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-0">

          {/* Mobile header with logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col items-center mb-6 lg:hidden"
          >
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="CA India" className="h-10 w-auto" />
              <div className="text-left">
                <p className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500">Chartered</p>
                <p className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500">Accountants</p>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 text-center">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-500 text-center mt-1">
              Sign in to access your account
            </p>
          </motion.div>

          {/* Auth card */}
          <AuthCard
            initialMode={initialMode}
            onLoginSuccess={handleLoginSuccess}
            onRegisterSuccess={handleRegisterSuccess}
            locationState={locationState}
            isMobile={isMobile}
          />

          {/* SSL security badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 mt-5"
          >
            <svg
              width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              className="shrink-0 text-gray-400"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <p className="text-xs text-gray-400 font-medium">
              256-bit SSL encrypted &middot; Your data is safe
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
