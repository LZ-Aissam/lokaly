import React from 'react';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'level';
  level?: number;
  emoji?: string;
}

export function Badge({ children, variant = 'neutral', level, emoji = '⭐' }: BadgeProps) {
  const variantClasses = {
    primary: 'bg-blue-100 text-blue-700 border-blue-200',
    secondary: 'bg-green-100 text-green-700 border-green-200',
    accent: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    neutral: 'bg-gray-100 text-gray-700 border-gray-200',
    level: 'bg-yellow-50 text-yellow-900 border-yellow-200'
  };

  const renderLevelEmojis = (lvl: number) => {
    return emoji.repeat(Math.min(lvl, 5));
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm border ${variantClasses[variant]}`}>
      {variant === 'level' && level ? (
        <>
          <span className="font-medium">Nv.{level}</span>
          <span>{renderLevelEmojis(level)}</span>
        </>
      ) : (
        children
      )}
    </span>
  );
}
