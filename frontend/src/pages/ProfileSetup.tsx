import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import { Button } from '@shadcn/ui/button';
import { Input } from '@shadcn/ui/input';
import { Textarea } from '@shadcn/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shadcn/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@shadcn/ui/card';
import { Badge } from '@shadcn/ui/badge';
import { Label } from '@shadcn/ui/label';
import { X, Check } from 'lucide-react';
import { Skill, User } from '../types';
import { mockSkills, currentUser } from '../data/mockData';
import { motion } from 'framer-motion';

const ProfileSetup = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<Partial<User>>({
    name: currentUser.name,
    bio: currentUser.bio || '',
    location: currentUser.location || '',
    timeZone: currentUser.timeZone || '',
    avatarUrl: currentUser.avatarUrl || '',
  });
  const [selectedOfferedSkills, setSelectedOfferedSkills] = useState<string[]>([]);
  const [selectedWantedSkills, setSelectedWantedSkills] = useState<string[]>([]);
  const [availableSkills] = useState<Skill[]>(mockSkills);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const timezones = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Australia/Sydney',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, field: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleOfferedSkill = (skillId: string) => {
    setSelectedOfferedSkills((prev) =>
      prev.includes(skillId) ? prev.filter((id) => id !== skillId) : [...prev, skillId]
    );
  };

  const toggleWantedSkill = (skillId: string) => {
    setSelectedWantedSkills((prev) =>
      prev.includes(skillId) ? prev.filter((id) => id !== skillId) : [...prev, skillId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Profile Setup</CardTitle>
              <CardDescription>
                Complete your profile to help others find you and match your skills.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell others about yourself, your expertise, and what you're looking to learn"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City, Country"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={formData.timeZone}
                      onValueChange={(value) => handleSelectChange(value, 'timeZone')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        {timezones.map((tz) => (
                          <SelectItem key={tz} value={tz}>
                            {tz}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="avatarUrl">Avatar URL</Label>
                  <Input
                    id="avatarUrl"
                    name="avatarUrl"
                    value={formData.avatarUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com/avatar.jpg"
                  />
                  {formData.avatarUrl && (
                    <div className="mt-2">
                      <img
                        src={formData.avatarUrl}
                        alt="Avatar preview"
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Skills I Offer</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Select the skills you can teach others.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {availableSkills.map((skill) => (
                        <Badge
                          key={skill.id}
                          variant={selectedOfferedSkills.includes(skill.id) ? 'default' : 'outline'}
                          className="cursor-pointer select-none"
                          onClick={() => toggleOfferedSkill(skill.id)}
                        >
                          {skill.name}
                          {selectedOfferedSkills.includes(skill.id) && (
                            <X className="ml-1 h-3 w-3" onClick={() => toggleOfferedSkill(skill.id)} />
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Skills I Want to Learn</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Select the skills you want to learn from others.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {availableSkills.map((skill) => (
                        <Badge
                          key={skill.id}
                          variant={selectedWantedSkills.includes(skill.id) ? 'default' : 'outline'}
                          className="cursor-pointer select-none"
                          onClick={() => toggleWantedSkill(skill.id)}
                        >
                          {skill.name}
                          {selectedWantedSkills.includes(skill.id) && (
                            <X className="ml-1 h-3 w-3" onClick={() => toggleWantedSkill(skill.id)} />
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting || success}>
                  {isSubmitting ? 'Saving...' : success ? (
                    <span className="flex items-center">
                      <Check className="mr-2 h-4 w-4" /> Saved!
                    </span>
                  ) : 'Save Profile'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default ProfileSetup; 