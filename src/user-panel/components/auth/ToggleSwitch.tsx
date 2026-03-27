import React from 'react';
import { motion } from 'framer-motion';

interface ToggleSwitchProps {
  mode: 'login' | 'register';
  onChange: (mode: 'login' | 'register') => void;
}

const TABS: { key: 'register' | 'login'; label: string }[] = [
  { key: 'register', label: 'Sign up' },
  { key: 'login', label: 'Log in' },
];

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ mode, onChange }) => {
  return (
    <div
      className="flex rounded-2xl p-1.5 gap-1"
      style={{
        background: 'rgba(0,0,0,0.05)',
        border: '1px solid rgba(0,0,0,0.06)',
      }}
      role="tablist"
    >
      {TABS.map(({ key, label }) => {
        const isActive = mode === key;
        return (
          <button
            key={key}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(key)}
            className="relative flex-1 h-[44px] rounded-xl text-[14px] font-semibold transition-colors duration-200 focus:outline-none"
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
