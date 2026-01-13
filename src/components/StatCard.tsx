import React from 'react';
import { Card } from './Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <Card>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-[var(--color-text-secondary)] mb-1">{title}</p>
            <p className="text-3xl font-bold text-[var(--color-text-primary)]">{value}</p>
            {trend && (
              <p className={`text-sm mt-2 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% ce mois
              </p>
            )}
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 rounded-lg flex items-center justify-center text-[var(--color-primary)]">
            {icon}
          </div>
        </div>
      </div>
    </Card>
  );
}
