import React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        className={`text-sm font-medium text-gray-700 ${className || ''}`}
        ref={ref}
        {...props}
      />
    );
  }
);

Label.displayName = 'Label'; 