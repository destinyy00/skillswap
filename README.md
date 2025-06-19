# SkillSwap

SkillSwap is a full-stack platform for skill-based bartering, enabling users to exchange knowledge and services using a credit system. Built for scalability, modularity, and future growth.

## Tech Stack

**Frontend:**
- React (TypeScript)
- Tailwind CSS
- shadcn/ui
- framer-motion
- lottie-react
- lucide-react

**Backend:**
- Node.js + Express + TypeScript
- Prisma ORM (PostgreSQL)
- Socket.io (real-time)
- Firebase Admin SDK (JWT Auth)

**Database:**
- PostgreSQL (with Prisma migrations & seed)

**Hosting:**
- Frontend: Vercel
- Backend: Railway/Render

## Folder Structure

```
/frontend
  /components
  /pages
  /hooks
  /utils
  /styles
/backend
  /controllers
  /routes
  /services
  /middlewares
  /prisma
  /utils
  /types
/shared
  /interfaces
```

## Features (MVP)
- Firebase Auth (Email/Google)
- Profile setup (name, avatar, bio, timezone, location, skills)
- Skill discovery & match suggestions
- Session booking & calendar
- Credit-based barter system
- Real-time chat
- Ratings & feedback
- Admin: manage users, credits, sessions

## Environment Variables

### Backend (.env)
```
DATABASE_URL=your_postgres_url
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
```

### Frontend (.env.local)
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Setup

1. Clone the repo
2. Install dependencies in `/frontend` and `/backend`
3. Set up `.env` and `.env.local` files
4. Run database migrations & seed
5. Start backend and frontend

---

See `/docs` for more details. 
<!-- R commit at 2025-06-16T13:48:26.796Z -->
<!-- R commit at 2025-06-16T13:55:29.696Z -->
<!-- R commit at 2025-06-16T14:00:18.215Z -->
<!-- R commit at 2025-06-16T19:00:18.244Z -->
<!-- R commit at 2025-06-17T00:00:18.239Z -->
<!-- R commit at 2025-06-17T17:25:08.564Z -->
<!-- R commit at 2025-06-18T10:36:32.807Z -->
<!-- R commit at 2025-06-18T10:36:37.524Z -->
<!-- R commit at 2025-06-18T14:25:23.149Z -->
<!-- R commit at 2025-06-18T15:21:50.554Z -->
<!-- R commit at 2025-06-19T21:43:23.202Z -->
<!-- R commit at 2025-06-19T21:43:25.256Z -->
<!-- R commit at 2025-06-19T21:43:27.073Z -->
<!-- R commit at 2025-06-19T21:43:47.207Z -->
<!-- R commit at 2025-06-19T21:43:49.218Z -->