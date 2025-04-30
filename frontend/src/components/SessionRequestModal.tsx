import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Calendar,
  Input,
  Textarea,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  cn
} from '@shadcn/ui';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface UserType {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface SkillType {
  id: string;
  name: string;
  category: string;
  description?: string;
  offeredBy: UserType;
}

interface SessionRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skill: SkillType | null;
  onRequestSession: (sessionData: SessionRequestData) => void;
}

interface SessionRequestData {
  skillId: string;
  date: Date;
  time: string;
  message: string;
}

const SessionRequestModal: React.FC<SessionRequestModalProps> = ({
  open,
  onOpenChange,
  skill,
  onRequestSession,
}) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!skill) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) return;

    setIsSubmitting(true);
    
    try {
      await onRequestSession({
        skillId: skill.id,
        date,
        time,
        message,
      });
      onOpenChange(false);
      // Reset form
      setDate(undefined);
      setTime('');
      setMessage('');
    } catch (error) {
      console.error('Error requesting session:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeOptions = [
    '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00',
    '17:00', '18:00', '19:00', '20:00',
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request a Session</DialogTitle>
          <DialogDescription>
            Request a session with {skill.offeredBy.name} for {skill.name}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="date">Select Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="time">Select Time</Label>
            <div className="flex flex-wrap gap-2">
              {timeOptions.map((t) => (
                <Button
                  key={t}
                  type="button"
                  variant={time === t ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTime(t)}
                  className="flex-grow-0"
                >
                  <Clock className="mr-1 h-3 w-3" />
                  {t}
                </Button>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Add any specific details or questions here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter className="sm:justify-end">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!date || !time || isSubmitting}
            >
              {isSubmitting ? 'Requesting...' : 'Request Session'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SessionRequestModal; 