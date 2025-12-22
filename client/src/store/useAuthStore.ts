import { create } from 'zustand';
import axios from 'axios';

interface User {
  id: string; // Mongoose _id is string
  username: string;
  name: string;
  email: string;
  avatar?: string;
  _id?: string; // Handle both id and _id if needed, but we can normalize
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>; // Changed email to username as per backend
  register: (username: string, password: string, name: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // Initial loading state for checking auth
  login: async (username, password) => {
    try {
      const res = await axios.post('/api/auth/login', { username, password });
      // Map _id to id for frontend consistency if needed, or just use _id
      const user = { ...res.data, id: res.data._id };
      set({ user, isAuthenticated: true });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  register: async (username, password, name, email) => {
    try {
      const res = await axios.post('/api/auth/register', { username, password, name, email });
      const user = { ...res.data, id: res.data._id };
      set({ user, isAuthenticated: true });
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },
  logout: async () => {
    try {
      await axios.post('/api/auth/logout');
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },
  checkAuth: async () => {
    try {
      const res = await axios.get('/api/auth/me');
      const user = { ...res.data, id: res.data._id };
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  }
}));