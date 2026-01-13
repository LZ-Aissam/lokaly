import React from 'react';

interface InputProps {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'time' | 'url';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helper?: string;
}

export function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  helper
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="block">
          {label}
          {required && <span className="text-[var(--color-danger)] ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`px-4 py-2.5 rounded-lg border-2 transition-all duration-200 bg-white ${
          error
            ? 'border-[var(--color-danger)] focus:border-[var(--color-danger)] focus:ring-2 focus:ring-[var(--color-danger)]/20'
            : 'border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20'
        } disabled:bg-gray-50 disabled:cursor-not-allowed outline-none`}
      />
      {error && <span className="text-sm text-[var(--color-danger)]">{error}</span>}
      {helper && !error && <span className="text-sm text-[var(--color-text-secondary)]">{helper}</span>}
    </div>
  );
}
