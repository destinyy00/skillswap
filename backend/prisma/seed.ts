import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/en';

const prisma = new PrismaClient();

// Define the SessionStatus enum here to avoid import issues
enum SessionStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

// Define a User interface for type safety
interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  bio: string;
  location: string;
  timeZone: string;
  credits: number;
}

// Define a Skill interface for type safety
interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
  userId: string;
}

async function main() {
  // Create 5 users with English data
  const users = [];
  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        avatarUrl: faker.image.avatar(),
        bio: faker.lorem.paragraph(1),
        location: faker.location.city() + ", " + faker.location.country(),
        timeZone: faker.location.timeZone(),
        credits: faker.number.int({ min: 5, max: 20 }),
      },
    });
    users.push(user);
  }

  // Create skills (offered and wanted)
  const skillCategories = ['Programming', 'Music', 'Cooking', 'Design', 'Language'];
  const skills = [];
  for (const user of users) {
    // Each user offers 2 skills
    for (let i = 0; i < 2; i++) {
      const skill = await prisma.skill.create({
        data: {
          name: faker.word.words({ count: 2 }),
          category: faker.helpers.arrayElement(skillCategories),
          description: faker.lorem.sentence(),
          offeredBy: { connect: { id: user.id } },
        },
      });
      skills.push(skill);
    }
    // Each user wants 1 skill (from another user)
    const otherUser = faker.helpers.arrayElement(users.filter(u => u.id !== user.id));
    await prisma.skill.create({
      data: {
        name: faker.word.words({ count: 2 }),
        category: faker.helpers.arrayElement(skillCategories),
        description: faker.lorem.sentence(),
        wantedBy: { connect: { id: user.id } },
        offeredBy: { connect: { id: otherUser.id } },
      },
    });
  }

  // Create 5 sessions connecting users
  for (let i = 0; i < 5; i++) {
    const learner = faker.helpers.arrayElement(users);
    let mentor = faker.helpers.arrayElement(users.filter(u => u.id !== learner.id));
    await prisma.session.create({
      data: {
        title: faker.company.catchPhrase(),
        description: faker.lorem.sentence(),
        dateTime: faker.date.soon(),
        status: faker.helpers.arrayElement([
          SessionStatus.PENDING, 
          SessionStatus.CONFIRMED, 
          SessionStatus.COMPLETED, 
          SessionStatus.CANCELLED
        ]),
        user: { connect: { id: learner.id } },
        host: { connect: { id: mentor.id } },
        feedback: faker.lorem.sentence(),
        rating: faker.number.int({ min: 1, max: 5 }),
      },
    });
  }
}

main()
  .then(() => {
    console.log('Database seeded successfully with English data');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error('Error seeding database:', e);
    return prisma.$disconnect().then(() => process.exit(1));
  }); 