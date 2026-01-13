import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  padding?: boolean;
}

export function Card({ children, className = '', hover = false, onClick, padding = false }: CardProps) {
  const hoverClass = hover
    ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer hover:border-[var(--color-primary)]/20'
    : '';
  const clickable = onClick ? 'cursor-pointer' : '';
  const paddingClass = padding ? 'p-6' : '';

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 ${hoverClass} ${clickable} ${paddingClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
