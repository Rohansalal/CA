import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToggleSwitch } from './ToggleSwitch';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

type Mode = 'login' | 'register';

interface AuthCardProps {
  initialMode?: Mode;
  onLoginSuccess: (role: string) => void;
  onRegisterSuccess: () => void;
  locationState: Record<string, unknown>;
  isMobile?: boolean;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  initialMode = 'login',
  onLoginSuccess,
  onRegisterSuccess,
  locationState,
  isMobile = false,
}) => {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [direction, setDirection] = useState<number>(0);
  const prevMode = useRef<Mode>(initialMode);

  const handleModeChange = (next: Mode) => {
    if (next === mode) return;
    setDirection(next === 'register' ? 1 : -1);
    prevMode.current = mode;
    setMode(next);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full bg-white"
      style={{
        borderRadius: isMobile ? '20px' : '28px',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: isMobile 
          ? '0 4px 24px rgba(0,0,0,0.08)' 
          : '0 1px 2px rgba(0,0,0,0.04), 0 6px 20px rgba(0,0,0,0.06), 0 20px 48px rgba(0,0,0,0.06)',
      }}
    >
      {/* Card body */}
      <div className={`${isMobile ? 'p-5 sm:p-6' : 'p-8 sm:p-10'}`}>

        {/* Toggle */}
        <div className={`${isMobile ? 'mb-5' : 'mb-8'}`}>
          <ToggleSwitch mode={mode} onChange={handleModeChange} isMobile={isMobile} />
        </div>

        {/* Animated form */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            {mode === 'login' ? (
              <LoginForm
                key="login"
                direction={direction}
                onSwitchToRegister={() => handleModeChange('register')}
                onSuccess={onLoginSuccess}
                locationState={locationState}
                isMobile={isMobile}
              />
            ) : (
              <SignupForm
                key="register"
                direction={direction}
                onSwitchToLogin={() => handleModeChange('login')}
                onSuccess={onRegisterSuccess}
                locationState={locationState}
                isMobile={isMobile}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
