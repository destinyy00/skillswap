import React, { useState } from 'react';

interface AuthFormProps {
  mode: 'login' | 'register';
  onSubmit: (data: { email: string; password: string; name?: string }) => void;
  onToggleMode: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit, onToggleMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'login') {
      onSubmit({ email, password });
    } else {
      onSubmit({ email, password, name });
    }
  };
  
  return (
    <div className="auth-form-container">
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {mode === 'register' && (
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={mode === 'register'}
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          {mode === 'login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
      <p>
        {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
        <button type="button" onClick={onToggleMode} className="toggle-mode-button">
          {mode === 'login' ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
}; 