import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, Button, Badge } from '@shadcn/ui';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

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

interface SkillCardProps {
  skill: SkillType;
  onRequestSession: (skill: SkillType) => void;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, onRequestSession }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{skill.name}</h3>
              <Badge variant="outline" className="mt-1">
                {skill.category}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {skill.description || 'No description provided.'}
          </p>
          <div className="flex items-center space-x-2">
            {skill.offeredBy.avatarUrl ? (
              <img
                src={skill.offeredBy.avatarUrl}
                alt={`${skill.offeredBy.name}'s avatar`}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                {skill.offeredBy.name.charAt(0)}
              </div>
            )}
            <span className="text-sm font-medium">{skill.offeredBy.name}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            variant="default" 
            size="sm"
            onClick={() => onRequestSession(skill)}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Request Session
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default SkillCard; 