import React, { useState, useEffect } from 'react';

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
  <div className={`p-6 ${className || ''}`} {...props}>
    {children}
  </div>
);

export const DialogHeader = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`mb-4 ${className || ''}`} {...props}>
    {children}
  </div>
);

export const DialogTitle = ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={`text-xl font-semibold ${className || ''}`} {...props}>
    {children}
  </h2>
);

export const DialogDescription = ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={`text-sm text-gray-500 ${className || ''}`} {...props}>
    {children}
  </p>
);

export const DialogFooter = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`mt-6 flex justify-end space-x-2 ${className || ''}`} {...props}>
    {children}
  </div>
); 