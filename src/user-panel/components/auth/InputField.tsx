import React, { forwardRef, useId } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  error?: string;
  delay?: number;
  inputClassName?: string;
  helperText?: string;
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
      helperText,
      id: providedId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = providedId || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, delay, ease: [0.25, 0.1, 0.25, 1] }}
        className={`flex flex-col gap-1.5 sm:gap-2 ${className}`}
      >
        {label ? (
          <label 
            htmlFor={inputId}
            className="text-[13px] sm:text-[13.5px] font-semibold text-[#2d3748] tracking-[-0.01em] cursor-pointer"
          >
            {label}
          </label>
        ) : null}

        <div className="relative group">
          {icon && (
            <span
              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200"
              style={{ color: error ? '#fc8181' : '#a0aec0' }}
              aria-hidden="true"
            >
              {icon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            {...props}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={[
              'w-full rounded-xl sm:rounded-2xl border-[1.5px] bg-[#f8fafc] text-[14px] sm:text-[15px] text-[#1a202c]',
              'placeholder:text-[#b8c4d0] outline-none',
              'transition-all duration-200',
              'hover:bg-white hover:border-[#cbd5e0]',
              'focus:bg-white',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error
                ? 'border-[#fc8181] focus:border-[#f56565] focus:shadow-[0_0_0_4px_rgba(252,129,129,0.15)]'
                : 'border-[#e2e8f0] focus:border-[#136da1] focus:shadow-[0_0_0_4px_rgba(19,109,161,0.12)]',
              icon ? 'pl-11 sm:pl-12' : 'pl-4 sm:pl-5',
              rightElement ? 'pr-11 sm:pr-12' : 'pr-4 sm:pr-5',
              'h-[48px] sm:h-[52px]',
              inputClassName,
            ]
              .filter(Boolean)
              .join(' ')}
          />

          {rightElement && (
            <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2">
              {rightElement}
            </span>
          )}
        </div>

        {/* Helper text */}
        {helperText && !error && (
          <p id={helperId} className="text-[11px] sm:text-[12px] text-[#64748b]">
            {helperText}
          </p>
        )}

        {/* Error message */}
        {error && (
          <motion.p
            id={errorId}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="flex items-center gap-1.5 text-[12px] sm:text-[12.5px] font-medium text-[#e53e3e]"
            role="alert"
          >
            <AlertCircle
              className="w-3 h-3 sm:w-[13px] sm:h-[13px] shrink-0"
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
