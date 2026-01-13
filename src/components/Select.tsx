import React from 'react';

interface SelectProps {
  label?: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
  helper?: string;
}

export function Select({
  label,
  options,
  value,
  onChange,
  required = false,
  disabled = false,
  placeholder,
  error,
  helper
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="block">
          {label}
          {required && <span className="text-[var(--color-danger)] ml-1">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`px-4 py-2.5 rounded-lg border-2 transition-all duration-200 bg-white ${
          error
            ? 'border-[var(--color-danger)] focus:border-[var(--color-danger)] focus:ring-2 focus:ring-[var(--color-danger)]/20'
            : 'border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20'
        } disabled:bg-gray-50 disabled:cursor-not-allowed outline-none`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-sm text-[var(--color-danger)]">{error}</span>}
      {helper && !error && <span className="text-sm text-[var(--color-text-secondary)]">{helper}</span>}
    </div>
  );
}
