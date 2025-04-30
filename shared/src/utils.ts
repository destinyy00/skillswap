/**
 * Utility function for combining class names
 */
export function cn(...classNames: (string | undefined)[]) {
  return classNames.filter(Boolean).join(' ');
} 