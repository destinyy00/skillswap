import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthState } from './AuthTypes';
import { getCurrentUser, login, logout, register } from './AuthService';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { user, token } = getCurrentUser();
        
        if (user && token) {
          setState({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        } else {
          setState({
            ...initialState,
            isLoading: false
          });
        }
      } catch (err) {
        setState({
          ...initialState,
          isLoading: false,
          error: 'Session expired or invalid'
        });
      }
    };

    initAuth();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      setState({ ...state, isLoading: true, error: null });
      const data = await login({ email, password });
      
      setState({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    } catch (err) {
      setState({
        ...state,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to login'
      });
      throw err;
    }
  };

  const handleRegister = async (email: string, password: string, name: string) => {
    try {
      setState({ ...state, isLoading: true, error: null });
      const data = await register({ email, password, name });
      
      setState({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    } catch (err) {
      setState({
        ...state,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to register'
      });
      throw err;
    }
  };

  const handleLogout = () => {
    logout();
    setState({
      ...initialState,
      isLoading: false
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}; 