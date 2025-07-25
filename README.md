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
<!-- R commit at 2025-06-19T21:43:51.842Z -->
<!-- R commit at 2025-06-20T07:58:47.800Z -->
<!-- R commit at 2025-06-20T09:01:39.231Z -->
<!-- R commit at 2025-06-20T12:07:35.815Z -->
<!-- R commit at 2025-06-20T14:01:39.229Z -->
<!-- R commit at 2025-06-20T19:01:39.253Z -->
<!-- R commit at 2025-06-20T21:29:51.172Z -->
<!-- R commit at 2025-06-21T00:01:39.233Z -->
<!-- R commit at 2025-06-21T19:03:01.055Z -->
<!-- R commit at 2025-06-21T19:03:03.860Z -->
<!-- R commit at 2025-06-24T11:43:38.056Z -->
<!-- R commit at 2025-06-24T11:50:35.180Z -->
<!-- R commit at 2025-06-24T11:56:08.097Z -->
<!-- R commit at 2025-06-25T11:48:43.251Z -->
<!-- R commit at 2025-06-25T11:48:45.008Z -->
<!-- R commit at 2025-06-25T11:48:46.716Z -->
<!-- R commit at 2025-06-25T11:48:48.209Z -->
<!-- R commit at 2025-06-25T11:48:50.585Z -->
<!-- R commit at 2025-06-25T17:27:32.723Z -->
<!-- R commit at 2025-06-26T15:48:39.359Z -->
<!-- R commit at 2025-06-26T15:48:41.317Z -->
<!-- R commit at 2025-06-26T15:48:43.290Z -->
<!-- R commit at 2025-06-26T15:48:45.346Z -->
<!-- R commit at 2025-06-26T15:48:47.162Z -->
<!-- R commit at 2025-06-30T15:12:28.653Z -->
<!-- R commit at 2025-06-30T15:13:22.930Z -->
<!-- R commit at 2025-06-30T15:13:25.724Z -->
<!-- R commit at 2025-06-30T16:32:59.766Z -->
<!-- R commit at 2025-06-30T16:34:17.433Z -->
<!-- R commit at 2025-07-05T21:48:00.164Z -->
<!-- R commit at 2025-07-05T21:49:43.341Z -->
<!-- R commit at 2025-07-05T21:49:45.779Z -->
<!-- R commit at 2025-07-05T21:49:47.923Z -->
<!-- R commit at 2025-07-05T21:49:49.805Z -->
<!-- R commit at 2025-07-05T21:49:51.540Z -->
<!-- R commit at 2025-07-05T21:49:53.899Z -->
<!-- R commit at 2025-07-05T21:49:56.700Z -->
<!-- R commit at 2025-07-05T21:49:59.718Z -->
<!-- R commit at 2025-07-07T09:37:44.871Z -->
<!-- R commit at 2025-07-07T09:37:47.676Z -->
<!-- R commit at 2025-07-07T09:37:49.875Z -->
<!-- R commit at 2025-07-08T10:54:04.920Z -->
<!-- R commit at 2025-07-08T10:54:08.792Z -->
<!-- R commit at 2025-07-08T10:56:55.922Z -->
<!-- R commit at 2025-07-08T10:57:14.112Z -->
<!-- R commit at 2025-07-08T11:21:59.743Z -->
<!-- R commit at 2025-07-09T23:13:36.280Z -->
<!-- R commit at 2025-07-09T23:13:55.826Z -->
<!-- R commit at 2025-07-09T23:14:40.772Z -->
<!-- R commit at 2025-07-10T00:30:56.712Z -->
<!-- R commit at 2025-07-12T00:13:29.682Z -->
<!-- R commit at 2025-07-12T00:13:33.257Z -->
<!-- R commit at 2025-07-12T12:18:37.406Z -->
<!-- R commit at 2025-07-14T12:47:50.698Z -->
<!-- R commit at 2025-07-14T12:47:53.944Z -->
<!-- R commit at 2025-07-14T16:53:41.631Z -->
<!-- R commit at 2025-07-14T19:49:08.591Z -->
<!-- R commit at 2025-07-15T06:27:14.792Z -->
<!-- R commit at 2025-07-20T08:06:53.517Z -->
<!-- R commit at 2025-07-20T08:06:56.226Z -->
<!-- R commit at 2025-07-20T08:06:58.271Z -->
<!-- R commit at 2025-07-21T14:33:31.183Z -->
<!-- R commit at 2025-07-21T14:33:36.380Z -->
<!-- R commit at 2025-07-21T14:33:39.012Z -->
<!-- R commit at 2025-07-21T14:33:41.276Z -->
<!-- R commit at 2025-07-21T14:36:50.987Z -->
<!-- R commit at 2025-07-22T20:06:47.933Z -->
<!-- R commit at 2025-07-23T18:12:03.903Z -->
<!-- R commit at 2025-07-23T18:12:09.805Z -->
<!-- R commit at 2025-07-24T15:39:52.374Z -->
<!-- R commit at 2025-07-24T15:39:54.324Z -->