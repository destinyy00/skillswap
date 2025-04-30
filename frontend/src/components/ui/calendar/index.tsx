import React from 'react';

interface CalendarProps {
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
    <div className={`calendar ${className || ''}`}>
      <input 
        type="date" 
        value={value ? value.toISOString().split('T')[0] : ''} 
        onChange={handleDateChange}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
    </div>
  );
}; 