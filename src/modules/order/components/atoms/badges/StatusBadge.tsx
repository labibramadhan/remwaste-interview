import React from 'react';

interface StatusBadgeProps {
  variant: 'green' | 'red' | 'orange' | 'blue' | 'amber';
  children: React.ReactNode;
}

export function StatusBadge({ variant, children }: StatusBadgeProps) {
  const variantClasses = {
    green: 'bg-green-900/30 text-green-300 border border-green-500/30',
    red: 'bg-red-900/30 text-red-300 border border-red-500/30',
    orange: 'bg-orange-900/30 text-orange-300 border border-orange-500/30',
    blue: 'bg-blue-900/30 text-blue-300 border border-blue-500/30',
    amber: 'bg-amber-400 text-black font-medium',
  };

  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
