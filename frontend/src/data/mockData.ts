import { User, Skill, Session, SessionStatus } from '../types';
import { add } from 'date-fns';

// Mock Users
export const currentUser: User = {
  id: 'u1',
  name: 'John Doe',
  email: 'john@example.com',
  avatarUrl: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff',
  bio: 'Full-stack developer with a passion for teaching and learning',
  location: 'New York, USA',
  timeZone: 'America/New_York',
  credits: 15,
};

export const mockUsers: User[] = [
  currentUser,
  {
    id: 'u2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatarUrl: 'https://ui-avatars.com/api/?name=Jane+Smith&background=0D8ABC&color=fff',
    bio: 'UX Designer and frontend developer',
    location: 'San Francisco, USA',
    timeZone: 'America/Los_Angeles',
    credits: 10,
  },
  {
    id: 'u3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    avatarUrl: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=0D8ABC&color=fff',
    bio: 'Cloud infrastructure specialist',
    location: 'London, UK',
    timeZone: 'Europe/London',
    credits: 5,
  },
  {
    id: 'u4',
    name: 'Sara Lee',
    email: 'sara@example.com',
    avatarUrl: 'https://ui-avatars.com/api/?name=Sara+Lee&background=0D8ABC&color=fff',
    bio: 'Machine learning expert',
    location: 'Toronto, Canada',
    timeZone: 'America/Toronto',
    credits: 20,
  },
];

// Mock Skills
export const mockSkills: Skill[] = [
  {
    id: 's1',
    name: 'React Development',
    category: 'Programming',
    description: 'Learn to build interactive UIs with React',
    userId: 'u1',
    offeredBy: mockUsers[0],
  },
  {
    id: 's2',
    name: 'UX Design Fundamentals',
    category: 'Design',
    description: 'Understand UX design principles and best practices',
    userId: 'u2',
    offeredBy: mockUsers[1],
  },
  {
    id: 's3',
    name: 'AWS Cloud Architecture',
    category: 'DevOps',
    description: 'Set up scalable cloud infrastructure with AWS',
    userId: 'u3',
    offeredBy: mockUsers[2],
  },
  {
    id: 's4',
    name: 'Machine Learning with Python',
    category: 'Data Science',
    description: 'Implement ML algorithms for real-world applications',
    userId: 'u4',
    offeredBy: mockUsers[3],
  },
  {
    id: 's5',
    name: 'TypeScript Fundamentals',
    category: 'Programming',
    description: 'Learn typed JavaScript with TypeScript',
    userId: 'u2',
    offeredBy: mockUsers[1],
  },
  {
    id: 's6',
    name: 'Node.js Backend Development',
    category: 'Programming',
    description: 'Build APIs and server-side applications with Node.js',
    userId: 'u1',
    offeredBy: mockUsers[0],
  },
];

// Mock Sessions
export const mockSessions: Session[] = [
  {
    id: 'ses1',
    title: 'Introduction to React Hooks',
    description: 'Learn the basics of React Hooks and function components',
    dateTime: add(new Date(), { days: 3, hours: 2 }).toISOString(),
    status: 'CONFIRMED' as SessionStatus,
    userId: 'u2', // Jane is learning
    hostId: 'u1', // John is teaching
    user: {
      name: mockUsers[1].name,
      avatarUrl: mockUsers[1].avatarUrl,
    },
    host: {
      name: mockUsers[0].name,
      avatarUrl: mockUsers[0].avatarUrl,
    },
  },
  {
    id: 'ses2',
    title: 'Advanced UX Design Patterns',
    description: 'Explore modern UX design patterns and techniques',
    dateTime: add(new Date(), { days: 5 }).toISOString(),
    status: 'PENDING' as SessionStatus,
    userId: 'u1', // John is learning
    hostId: 'u2', // Jane is teaching
    user: {
      name: mockUsers[0].name,
      avatarUrl: mockUsers[0].avatarUrl,
    },
    host: {
      name: mockUsers[1].name,
      avatarUrl: mockUsers[1].avatarUrl,
    },
  },
  {
    id: 'ses3',
    title: 'AWS Lambda and Serverless',
    description: 'Building serverless applications with AWS Lambda',
    dateTime: add(new Date(), { days: -2 }).toISOString(),
    status: 'COMPLETED' as SessionStatus,
    userId: 'u1', // John is learning
    hostId: 'u3', // Mike is teaching
    user: {
      name: mockUsers[0].name,
      avatarUrl: mockUsers[0].avatarUrl,
    },
    host: {
      name: mockUsers[2].name,
      avatarUrl: mockUsers[2].avatarUrl,
    },
    feedback: 'Great session, very informative!',
    rating: 5,
  },
  {
    id: 'ses4',
    title: 'Getting Started with Machine Learning',
    description: 'Introduction to ML concepts and algorithms',
    dateTime: add(new Date(), { days: 1 }).toISOString(),
    status: 'CANCELLED' as SessionStatus,
    userId: 'u1', // John is learning
    hostId: 'u4', // Sara is teaching
    user: {
      name: mockUsers[0].name,
      avatarUrl: mockUsers[0].avatarUrl,
    },
    host: {
      name: mockUsers[3].name,
      avatarUrl: mockUsers[3].avatarUrl,
    },
  },
];

// User's skills
export const myOfferedSkills = mockSkills.filter(skill => skill.userId === currentUser.id);

// Skills the user wants to learn (not owned by the user)
export const myWantedSkills = mockSkills.filter(skill => skill.userId !== currentUser.id);

// Upcoming sessions where the user is learning (user is not the host)
export const myLearningUpcomingSessions = mockSessions.filter(
  session => session.userId === currentUser.id && session.status !== 'COMPLETED' && session.status !== 'CANCELLED'
);

// Upcoming sessions where the user is teaching (user is the host)
export const myTeachingUpcomingSessions = mockSessions.filter(
  session => session.hostId === currentUser.id && session.status !== 'COMPLETED' && session.status !== 'CANCELLED'
);

// Past sessions
export const myPastSessions = mockSessions.filter(
  session => (session.userId === currentUser.id || session.hostId === currentUser.id) 
  && (session.status === 'COMPLETED' || session.status === 'CANCELLED')
);

// Mock API functions
export const fetchSkills = (): Promise<Skill[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSkills);
    }, 500);
  });
};

export const fetchSessions = (): Promise<Session[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSessions);
    }, 500);
  });
};

export const requestSession = (sessionData: any): Promise<Session> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newSession: Session = {
        id: `ses${mockSessions.length + 1}`,
        title: `Session on ${sessionData.skillId}`,
        description: sessionData.message,
        dateTime: new Date(`${sessionData.date.toISOString().split('T')[0]}T${sessionData.time}`).toISOString(),
        status: 'PENDING',
        userId: currentUser.id,
        hostId: mockUsers.find(u => u.id !== currentUser.id)?.id || 'u2',
        user: {
          name: currentUser.name,
          avatarUrl: currentUser.avatarUrl,
        },
        host: {
          name: mockUsers.find(u => u.id !== currentUser.id)?.name || 'Jane Smith',
          avatarUrl: mockUsers.find(u => u.id !== currentUser.id)?.avatarUrl,
        },
      };
      resolve(newSession);
    }, 1000);
  });
}; 