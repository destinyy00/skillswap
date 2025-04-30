# SkillSwap Shared Authentication Module

This directory contains a shared authentication module that can be used in both frontend and backend applications.

## Structure

- **AuthTypes.ts**: Defines common types used across auth components
- **AuthService.ts**: Provides authentication API service functions
- **AuthContext.tsx**: React context for managing authentication state
- **AuthForm.tsx**: Reusable authentication form component
- **AuthPage.tsx**: Sample implementation of authentication page
- **Auth.css**: Styling for authentication components

## Usage

### Frontend Implementation

```tsx
import { AuthProvider, AuthPage } from '../shared/src';
import '../shared/src/Auth.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          {/* Other routes */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}
```

### Protected Route Component

```tsx
import { useAuth } from '../shared/src';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};
```

### Backend Implementation

```ts
import { LoginRequest, RegisterRequest, User } from '../shared/src/AuthTypes';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Example of a login handler
const loginHandler = async (req: Request, res: Response) => {
  const { email, password }: LoginRequest = req.body;
  
  try {
    // Validate user credentials from your database
    const user = await findUserByEmail(email);
    
    if (!user || !await bcrypt.compare(password, user.passwordHash)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1d' });
    
    // Return user data and token
    return res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
```

## Customization

You can customize the authentication flow by modifying the `AuthContext.tsx` and `AuthService.ts` files to match your specific requirements.

- **API Endpoints**: Update the `API_URL` in `AuthService.ts`
- **Token Storage**: The default implementation uses `localStorage`. For better security, consider using HTTP-only cookies
- **User Interface**: Customize `Auth.css` and `AuthForm.tsx` to match your application's design system 