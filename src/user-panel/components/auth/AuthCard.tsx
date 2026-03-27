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
}

export const AuthCard: React.FC<AuthCardProps> = ({
  initialMode = 'login',
  onLoginSuccess,
  onRegisterSuccess,
  locationState,
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
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full rounded-[28px] overflow-hidden bg-white"
      style={{
        border: '1px solid rgba(0,0,0,0.07)',
        boxShadow:
          '0 1px 2px rgba(0,0,0,0.04), 0 6px 20px rgba(0,0,0,0.06), 0 20px 48px rgba(0,0,0,0.06)',
      }}
    >
      {/* Card body */}
      <div className="p-8 sm:p-10">

        {/* Toggle */}
        <div className="mb-8">
          <ToggleSwitch mode={mode} onChange={handleModeChange} />
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
              />
            ) : (
              <SignupForm
                key="register"
                direction={direction}
                onSwitchToLogin={() => handleModeChange('login')}
                onSuccess={onRegisterSuccess}
                locationState={locationState}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
