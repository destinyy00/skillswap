import axios from 'axios';
import { LoginRequest, RegisterRequest, AuthResponse } from './AuthTypes';

// Using a more browser-compatible approach for the API URL
const API_URL = 'http://localhost:5000/api';

export const register = async (credentials: RegisterRequest): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/register`, credentials);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Registration failed');
    }
    throw new Error('An unexpected error occurred during registration');
  }
};

export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, credentials);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Login failed');
    }
    throw new Error('An unexpected error occurred during login');
  }
};

export const logout = (): void => {
  localStorage.removeItem('token');
};

export const getCurrentUser = (): { user: null | any; token: string | null } => {
  const token = localStorage.getItem('token');
  if (!token) return { user: null, token: null };
  
  try {
    // Basic parsing of JWT to get user info - in a real app, validate the token
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const user = JSON.parse(window.atob(base64));
    return { user, token };
  } catch (error) {
    localStorage.removeItem('token');
    return { user: null, token: null };
  }
}; 