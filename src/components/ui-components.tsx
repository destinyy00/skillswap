import React, { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

// Utility function
export function cn(...classNames: (string | undefined)[]) {
  return twMerge(classNames.filter(Boolean) as string[]);
}

// Button
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        className={cn(`button ${variant} ${size}`, className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

// Input
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn('px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500', className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

// Textarea
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn('px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500', className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

// Card components
export const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('rounded-lg border border-gray-200 bg-white shadow-sm', className)} {...props} />
);

export const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-6', className)} {...props} />
);

export const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('text-xl font-semibold', className)} {...props} />
);

export const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-sm text-gray-500', className)} {...props} />
);

export const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-6 pt-0', className)} {...props} />
);

export const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-6 pt-0 flex items-center', className)} {...props} />
);

// Badge
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
      className={cn(`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]}`, className)}
      {...props} 
    />
  );
};

// Label
export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => {
    return (
      <label
        className={cn('text-sm font-medium text-gray-700', className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Label.displayName = 'Label';

// Dialog
export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export const Dialog = ({ open = false, onOpenChange, children }: DialogProps) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = () => {
    setIsOpen(false);
    onOpenChange?.(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={handleClose}></div>
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        {children}
      </div>
    </div>
  );
};

export const DialogContent = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-6', className)} {...props}>
    {children}
  </div>
);

export const DialogHeader = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mb-4', className)} {...props}>
    {children}
  </div>
);

export const DialogTitle = ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn('text-xl font-semibold', className)} {...props}>
    {children}
  </h2>
);

export const DialogDescription = ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-sm text-gray-500', className)} {...props}>
    {children}
  </p>
);

export const DialogFooter = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-6 flex justify-end space-x-2', className)} {...props}>
    {children}
  </div>
);

// Calendar
export interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  className?: string;
}

export const Calendar = ({ value, onChange, className }: CalendarProps) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    onChange?.(date);
  };

  return (
    <div className={cn('calendar', className)}>
      <input 
        type="date" 
        value={value ? value.toISOString().split('T')[0] : ''} 
        onChange={handleDateChange}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
    </div>
  );
};

// Popover
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
    <div className={cn('inline-block', className)} {...props}>
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
      className={cn(`absolute z-50 mt-1 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-2 shadow-md animate-in fade-in-80 ${alignmentClass[align]}`, className)} 
      {...props}
    >
      {children}
    </div>
  );
};

// Select
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        className={cn('px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500', className)}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = 'Select';

export const SelectTrigger = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={cn('select-trigger', className)}>
    {children}
  </div>
);

export const SelectValue = ({ children, className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span {...props} className={cn('select-value', className)}>
    {children}
  </span>
);

export const SelectContent = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={cn('select-content', className)}>
    {children}
  </div>
);

export const SelectItem = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={cn('select-item', className)}>
    {children}
  </div>
); 