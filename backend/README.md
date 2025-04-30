# Backend Setup – SkillSwap

## 1. Install dependencies

```
npm install
```

## 2. Set up environment variables

Edit `.env` with your PostgreSQL and Firebase credentials.

```
DATABASE_URL=your_postgres_url
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
FRONTEND_URL=http://localhost:5173
```

## 3. Prisma: Generate Client & Push Schema

```
npx prisma generate
npx prisma db push
```

## 4. Seed the Database

```
npm install @faker-js/faker
npx ts-node prisma/seed.ts
```

## 5. Run the Backend

```
npm run dev
```

## Real-time Communication with Socket.io

SkillSwap uses Socket.io for real-time communication between users. The implementation includes:

### Server-side Features:

- **Authentication**: All socket connections are authenticated using Firebase tokens.
- **Private Rooms**: Each user joins a private room with their user ID for receiving direct messages.
- **Event Handlers**:
  - `session:request` - When a user requests a session with another user
  - `session:update` - When a session's status changes
  - `notification:send` - General-purpose notification system

### Example Usage:

#### Client-side Connection (frontend)

```typescript
import { io } from 'socket.io-client';
import { getAuth } from 'firebase/auth';

// Get Firebase auth token
const auth = getAuth();
const token = await auth.currentUser?.getIdToken();

// Connect to Socket.io server with auth token
const socket = io('http://localhost:3000', {
  auth: {
    token
  }
});

// Listen for incoming session requests
socket.on('session:incoming', (data) => {
  console.log('New session request:', data);
  // Show notification to user
});

// Listen for session updates
socket.on('session:updated', (data) => {
  console.log('Session updated:', data);
  // Update UI or show notification
});

// Listen for notifications
socket.on('notification:received', (data) => {
  console.log('New notification:', data);
  // Display notification
});

// Request a session with another user
socket.emit('session:request', {
  toUserId: 'target-user-id',
  sessionData: {
    // Session details
  }
});

// Update a session
socket.emit('session:update', {
  toUserId: 'target-user-id',
  update: {
    // Updated session details
  }
});
```

#### Using from Express Controllers

The Socket.io instance is exported and can be used in controllers to emit events:

```typescript
import { emitSessionRequest, emitSessionUpdate } from '../socket';

// In a controller method
const hostId = 'target-user-id';
const userId = 'current-user-id';

// Emit a session request notification
emitSessionRequest(hostId, userId, sessionData);

// Emit a session update notification
emitSessionUpdate(hostId, userId, updateData);
```

---

- The Prisma schema is in `prisma/schema.prisma`.
- The seed script is in `prisma/seed.ts` and generates fake users, skills, and sessions.
- For more info, see the main project README. 