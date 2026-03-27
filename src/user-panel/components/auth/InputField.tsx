import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  error?: string;
  delay?: number;
  inputClassName?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      icon,
      rightElement,
      error,
      delay = 0,
      className = '',
      inputClassName = '',
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, delay, ease: [0.25, 0.1, 0.25, 1] }}
        className={`flex flex-col gap-2 ${className}`}
      >
        {label ? (
          <label className="text-[13.5px] font-semibold text-[#2d3748] tracking-[-0.01em]">
            {label}
          </label>
        ) : null}

        <div className="relative group">
          {icon && (
            <span
              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200"
              style={{ color: '#a0aec0' }}
            >
              {icon}
            </span>
          )}

          <input
            ref={ref}
            {...props}
            className={[
              'w-full rounded-2xl border-[1.5px] bg-[#f8fafc] text-[15px] text-[#1a202c]',
              'placeholder:text-[#b8c4d0] outline-none',
              'transition-all duration-200',
              'hover:bg-white hover:border-[#cbd5e0]',
              'focus:bg-white',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error
                ? 'border-[#fc8181] focus:border-[#f56565] focus:shadow-[0_0_0_4px_rgba(252,129,129,0.15)]'
                : 'border-[#e2e8f0] focus:border-[#136da1] focus:shadow-[0_0_0_4px_rgba(19,109,161,0.12)]',
              icon ? 'pl-12' : 'pl-5',
              rightElement ? 'pr-12' : 'pr-5',
              'h-[52px]',
              inputClassName,
            ]
              .filter(Boolean)
              .join(' ')}
          />

          {rightElement && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2">
              {rightElement}
            </span>
          )}
        </div>

        {/* ── Error message — icon uses explicit px size to prevent SVG inflation ── */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="flex items-center gap-1.5 text-[12.5px] font-medium text-[#e53e3e]"
          >
            {/* AlertCircle from Lucide with explicit pixel size — never inflates */}
            <AlertCircle
              style={{ width: 13, height: 13, flexShrink: 0 }}
              strokeWidth={2.5}
            />
            {error}
          </motion.p>
        )}
      </motion.div>
    );
  }
);

InputField.displayName = 'InputField';
