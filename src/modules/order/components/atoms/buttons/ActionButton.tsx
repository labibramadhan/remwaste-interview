import React from 'react';

interface ActionButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export function ActionButton({
  variant,
  onClick,
  children,
  disabled = false,
  className = '',
  icon,
  iconPosition = 'right',
}: ActionButtonProps) {
  const variantClasses = {
    primary: 'bg-[#0037C1] hover:bg-[#0037C1]/90 text-white',
    secondary: 'bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white',
    outline:
      'bg-transparent border border-[#0037C1]/30 text-[#0037C1] hover:bg-[#0037C1]/10',
  };

  const baseClasses = `
    cursor-pointer rounded px-4 py-2 
    transition-all flex items-center justify-center
    focus:outline-none focus:ring-2 focus:ring-[#0037C1]/50
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${variantClasses[variant]}
    ${className}
  `;

  return (
    <button onClick={onClick} disabled={disabled} className={baseClasses}>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </button>
  );
}
