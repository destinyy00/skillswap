import React from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        className={`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${className || ''}`}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';

export const SelectTrigger = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={`select-trigger ${props.className || ''}`}>
    {children}
  </div>
);

export const SelectValue = ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span {...props} className={`select-value ${props.className || ''}`}>
    {children}
  </span>
);

export const SelectContent = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={`select-content ${props.className || ''}`}>
    {children}
  </div>
);

export const SelectItem = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={`select-item ${props.className || ''}`}>
    {children}
  </div>
); 