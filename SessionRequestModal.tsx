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

// Rest of the component... 