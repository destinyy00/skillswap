import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import SkillCard from '../components/SkillCard';
import SessionCard from '../components/SessionCard';
import SessionRequestModal from '../components/SessionRequestModal';
import { Skill, Session, SessionRequestData } from '../types';
import { motion } from 'framer-motion';
import { Loader2, Plus } from 'lucide-react';
import { Button } from '@shadcn/ui/button';
import {
  myOfferedSkills,
  myWantedSkills,
  myLearningUpcomingSessions,
  myTeachingUpcomingSessions,
  requestSession as requestSessionAPI,
  fetchSkills,
  fetchSessions,
} from '../data/mockData';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [offeredSkills, setOfferedSkills] = useState<Skill[]>([]);
  const [wantedSkills, setWantedSkills] = useState<Skill[]>([]);
  const [learningSessions, setLearningSessions] = useState<Session[]>([]);
  const [teachingSessions, setTeachingSessions] = useState<Session[]>([]);
  const [browseSkills, setBrowseSkills] = useState<Skill[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // In a real app, these would be API calls
        // const skillsData = await fetchSkills();
        // const sessionsData = await fetchSessions();

        // Using mock data for now
        setOfferedSkills(myOfferedSkills);
        setWantedSkills(myWantedSkills);
        setLearningSessions(myLearningUpcomingSessions);
        setTeachingSessions(myTeachingUpcomingSessions);
        setBrowseSkills(myWantedSkills); // Using wanted skills as browse for demo
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleRequestSession = async (sessionData: SessionRequestData) => {
    try {
      const newSession = await requestSessionAPI(sessionData);
      // In a real app, we would update the sessions list
      setLearningSessions((prev) => [...prev, newSession]);
      return newSession;
    } catch (error) {
      console.error('Error requesting session:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-sm"
        >
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome back, {user?.displayName || user?.email?.split('@')[0] || 'User'}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            You currently have {myOfferedSkills.length} skills offered and {learningSessions.length + teachingSessions.length} upcoming sessions.
          </p>
        </motion.div>

        {/* My Skills Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">My Skills</h2>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </div>
          {offeredSkills.length === 0 ? (
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                You haven't added any skills yet. Add skills to start teaching and earning credits.
              </p>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {offeredSkills.map((skill) => (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  onRequestSession={() => {
                    setSelectedSkill(skill);
                    setModalOpen(true);
                  }}
                />
              ))}
            </motion.div>
          )}
        </div>

        {/* My Sessions Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">My Upcoming Sessions</h2>
          {learningSessions.length === 0 && teachingSessions.length === 0 ? (
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                You don't have any upcoming sessions. Browse skills to request a session.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {learningSessions.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Learning</h3>
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {learningSessions.map((session) => (
                      <SessionCard key={session.id} session={session} isTeaching={false} />
                    ))}
                  </motion.div>
                </div>
              )}

              {teachingSessions.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Teaching</h3>
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {teachingSessions.map((session) => (
                      <SessionCard key={session.id} session={session} isTeaching={true} />
                    ))}
                  </motion.div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Browse Skills Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Browse Skills</h2>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {browseSkills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                onRequestSession={() => {
                  setSelectedSkill(skill);
                  setModalOpen(true);
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Session Request Modal */}
      <SessionRequestModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        skill={selectedSkill}
        onRequestSession={handleRequestSession}
      />
    </DashboardLayout>
  );
};

export default Dashboard; 