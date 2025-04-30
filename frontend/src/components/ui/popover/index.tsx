import React, { useState, useEffect, useRef } from 'react';

export interface PopoverProps {
  children: React.ReactNode;
}

export const Popover = ({ children }: PopoverProps) => {
  return <div className="relative inline-block">{children}</div>;
};

export interface PopoverTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const PopoverTrigger = ({ children, asChild = false, ...props }: PopoverTriggerProps) => {
  return (
    <div className="inline-block" {...props}>
      {asChild ? children : <button type="button">{children}</button>}
    </div>
  );
};

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'center' | 'start' | 'end';
}

export const PopoverContent = ({ 
  children, 
  className,
  align = 'center',
  ...props 
}: PopoverContentProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!isVisible) return null;

  const alignmentClass = {
    center: 'left-1/2 transform -translate-x-1/2',
    start: 'left-0',
    end: 'right-0',
  };

  return (
    <div 
      ref={contentRef}
      className={`absolute z-50 mt-1 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-2 shadow-md animate-in fade-in-80 ${alignmentClass[align]} ${className || ''}`} 
      {...props}
    >
      {children}
    </div>
  );
}; 