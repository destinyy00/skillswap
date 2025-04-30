import React from 'react';
import { Card, CardContent, CardHeader } from '@shadcn/ui/card';
import { Badge } from '@shadcn/ui/badge';
import { Clock, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

export type SessionStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

interface SessionType {
  id: string;
  title: string;
  dateTime: Date | string;
  status: SessionStatus;
  userId: string;
  hostId: string;
  user: {
    name: string;
    avatarUrl?: string;
  };
  host: {
    name: string;
    avatarUrl?: string;
  };
}

interface SessionCardProps {
  session: SessionType;
  isTeaching?: boolean;
}

const SessionCard: React.FC<SessionCardProps> = ({ session, isTeaching = false }) => {
  const getStatusColor = (status: SessionStatus) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300';
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-300';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const formatDateTime = (dateTime: Date | string) => {
    const date = typeof dateTime === 'string' ? new Date(dateTime) : dateTime;
    return format(date, 'MMM dd, yyyy h:mm a');
  };

  // Person to display is the opposite of isTeaching
  const personToDisplay = isTeaching ? session.user : session.host;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg">{session.title}</h3>
            <Badge className={`${getStatusColor(session.status)} font-medium`}>
              {session.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
              <div className="flex items-center space-x-2">
                {personToDisplay.avatarUrl ? (
                  <img
                    src={personToDisplay.avatarUrl}
                    alt={`${personToDisplay.name}'s avatar`}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                    {personToDisplay.name.charAt(0)}
                  </div>
                )}
                <span className="text-sm">
                  {isTeaching ? 'Student' : 'Mentor'}: {personToDisplay.name}
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
              <span className="text-sm">{formatDateTime(session.dateTime)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
              <span className="text-sm">
                {isTeaching ? 'You are teaching' : 'You are learning'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SessionCard; 