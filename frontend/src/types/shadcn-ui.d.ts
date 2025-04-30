declare module '@shadcn/ui' {
  // Button
  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
  }
  export const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

  // Input
  export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
  export const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

  // Textarea
  export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
  export const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;

  // Card
  export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
  export const Card: React.FC<CardProps>;
  export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>>;
  export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>>;
  export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>>;

  // Badge
  export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'secondary' | 'success' | 'destructive';
  }
  export const Badge: React.FC<BadgeProps>;

  // Label
  export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}
  export const Label: React.ForwardRefExoticComponent<LabelProps & React.RefAttributes<HTMLLabelElement>>;

  // Dialog
  export interface DialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
  }
  export const Dialog: React.FC<DialogProps>;
  export const DialogContent: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const DialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const DialogTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>>;
  export const DialogDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>>;
  export const DialogFooter: React.FC<React.HTMLAttributes<HTMLDivElement>>;

  // Calendar
  export interface CalendarProps {
    value?: Date;
    onChange?: (date: Date) => void;
    className?: string;
  }
  export const Calendar: React.FC<CalendarProps>;

  // Popover
  export interface PopoverProps {
    children: React.ReactNode;
  }
  export const Popover: React.FC<PopoverProps>;
  export interface PopoverTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
    asChild?: boolean;
  }
  export const PopoverTrigger: React.FC<PopoverTriggerProps>;
  export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: 'center' | 'start' | 'end';
  }
  export const PopoverContent: React.FC<PopoverContentProps>;

  // Select
  export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}
  export const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;
  export const SelectTrigger: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const SelectValue: React.FC<React.HTMLAttributes<HTMLSpanElement>>;
  export const SelectContent: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const SelectItem: React.FC<React.HTMLAttributes<HTMLDivElement>>;

  // Utils
  export function cn(...inputs: (string | undefined)[]): string;
} 