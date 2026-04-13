import React from 'react';
import { motion } from 'framer-motion';

interface ToggleSwitchProps {
  mode: 'login' | 'register';
  onChange: (mode: 'login' | 'register') => void;
  isMobile?: boolean;
}

const TABS: { key: 'register' | 'login'; label: string; ariaLabel: string }[] = [
  { key: 'register', label: 'Sign up', ariaLabel: 'Switch to sign up form' },
  { key: 'login', label: 'Log in', ariaLabel: 'Switch to login form' },
];

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ mode, onChange, isMobile = false }) => {
  return (
    <div
      className="flex rounded-2xl p-1.5 gap-1"
      style={{
        background: 'rgba(0,0,0,0.05)',
        border: '1px solid rgba(0,0,0,0.06)',
      }}
      role="tablist"
      aria-label="Authentication mode selector"
    >
      {TABS.map(({ key, label, ariaLabel }) => {
        const isActive = mode === key;
        return (
          <button
            key={key}
            role="tab"
            id={`tab-${key}`}
            aria-selected={isActive}
            aria-controls={`panel-${key}`}
            aria-label={ariaLabel}
            onClick={() => onChange(key)}
            className={`
              relative flex-1 rounded-xl font-semibold transition-colors duration-200 
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
              ${isMobile ? 'h-[40px] text-[13px]' : 'h-[44px] text-[14px]'}
            `}
            style={{ color: isActive ? '#0b2c4d' : '#8a94a6', zIndex: 1 }}
          >
            {isActive && (
              <motion.div
                layoutId="toggle-pill"
                className="absolute inset-0 rounded-xl"
                style={{
                  background: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1), 0 6px 20px rgba(0,0,0,0.06)',
                }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10 tracking-[-0.01em]">{label}</span>
          </button>
        );
      })}
    </div>
  );
};
