import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success' | 'destructive';
}

export const Badge = ({ 
  className,
  variant = 'default',
  ...props 
}: BadgeProps) => {
  const variantClasses = {
    default: 'bg-primary-100 text-primary-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    destructive: 'bg-red-100 text-red-800',
  };

  return (
    <div 
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className || ''}`}
      {...props} 
    />
  );
}; 