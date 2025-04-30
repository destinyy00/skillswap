import React, { useState } from 'react';
import { AuthForm } from './AuthForm';
import { useAuth } from './AuthContext';

export const AuthPage: React.FC = () => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { login, register, error, isLoading } = useAuth();

  const toggleAuthMode = () => {
    setAuthMode(prevMode => prevMode === 'login' ? 'register' : 'login');
  };

  const handleSubmit = async (data: { email: string; password: string; name?: string }) => {
    try {
      if (authMode === 'login') {
        await login(data.email, data.password);
      } else if (data.name) {
        await register(data.email, data.password, data.name);
      }
    } catch (err) {
      // Error already handled by the auth context
      console.error('Authentication error:', err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>SkillSwap</h1>
        <p className="auth-subtitle">Connect, Learn, and Grow Together</p>
        
        {error && <div className="auth-error">{error}</div>}
        
        <AuthForm 
          mode={authMode}
          onSubmit={handleSubmit}
          onToggleMode={toggleAuthMode}
        />
        
        {isLoading && <div className="loading-spinner">Loading...</div>}
      </div>
    </div>
  );
}; 