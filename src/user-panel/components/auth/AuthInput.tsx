import React, { forwardRef } from 'react';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  error?: string;
  hint?: string;
  inputClassName?: string;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  (
    {
      label,
      icon,
      rightElement,
      error,
      hint,
      inputClassName = '',
      className = '',
      ...props
    },
    ref
  ) => {
    const ringColor = error
      ? 'border-red-300 focus:border-red-400'
      : 'border-[#dde3ec] focus:border-[#136da1]';

    return (
      <div className={`flex flex-col ${className}`}>
        {/* Label — only rendered when non-empty */}
        {label ? (
          <label className="block text-[13px] font-semibold text-[#374151] tracking-wide mb-1.5">
            {label}
          </label>
        ) : null}

        {/* Input wrapper */}
        <div className="relative group">
          {icon && (
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0bec5] group-focus-within:text-[#136da1] transition-colors duration-200 pointer-events-none">
              {icon}
            </span>
          )}

          <input
            ref={ref}
            {...props}
            className={[
              'w-full h-[46px] rounded-xl border bg-white',
              'text-[14px] text-[#111827]',
              'placeholder:text-[#c2cad6]',
              'outline-none transition-all duration-200',
              'hover:border-[#b0bec5]',
              'focus:ring-[3px] focus:ring-[#136da1]/12',
              'disabled:bg-[#f8fafc] disabled:text-[#9ca3af] disabled:cursor-not-allowed',
              icon ? 'pl-10' : 'pl-4',
              rightElement ? 'pr-11' : 'pr-4',
              ringColor,
              inputClassName,
            ]
              .filter(Boolean)
              .join(' ')}
          />

          {rightElement && (
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
              {rightElement}
            </span>
          )}
        </div>

        {/* Error or hint */}
        {error ? (
          <p className="mt-1.5 text-[12px] text-red-500 font-medium flex items-center gap-1">
            <svg
              className="w-3 h-3 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        ) : hint ? (
          <p className="mt-1.5 text-[12px] text-[#9ca3af]">{hint}</p>
        ) : null}
      </div>
    );
  }
);

AuthInput.displayName = 'AuthInput';
