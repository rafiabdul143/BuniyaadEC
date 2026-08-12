import React, { useId, useState } from 'react';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  label,
  error,
  helperText,
  type = 'text',
  className = '',
  required,
  ...props
}) => {
  const id = useId();
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full text-left space-y-1.5">
      <div className="flex justify-between items-center">
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      </div>

      <div className="relative rounded-lg shadow-2xs">
        <input
          id={id}
          type={inputType}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          required={required}
          className={`
            w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 bg-white placeholder:text-slate-400
            transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 hover:border-slate-300'}
            ${isPassword ? 'pr-10' : ''}
            ${className}
          `}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 focus:outline-none focus:text-slate-600"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.025 10.025 0 011.838-.163c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21f-9-9" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        )}
      </div>

      {error && (
        <p id={errorId} className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}

      {helperText && !error && (
        <p id={helperId} className="text-xs text-slate-500">
          {helperText}
        </p>
      )}
    </div>
  );
};