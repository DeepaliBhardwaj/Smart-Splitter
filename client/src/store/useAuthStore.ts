import { create } from 'zustand';
import Cookies from 'js-cookie';

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, name: string, email: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  
  login: async (username: string, password: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get users from localStorage
      const usersJson = localStorage.getItem('users');
      const users: User[] = usersJson ? JSON.parse(usersJson) : [];
      
      // Find or create user
      let user = users.find(u => u.username === username);
      if (!user) {
        // Auto-create user for demo
        user = {
          id: Date.now().toString(),
          username,
          name: username,
          email: `${username}@demo.com`,
        };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
      }
      
      // Store auth in cookie and localStorage
      Cookies.set('isAuthenticated', 'true', { expires: 1 }); // 1 day
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  
  register: async (username: string, password: string, name: string, email: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get users from localStorage
      const usersJson = localStorage.getItem('users');
      const users: User[] = usersJson ? JSON.parse(usersJson) : [];
      
      // Check if user exists
      if (users.find(u => u.username === username)) {
        throw new Error('Username already exists');
      }
      
      // Create new user
      const user: User = {
        id: Date.now().toString(),
        username,
        name,
        email,
      };
      
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Store auth in cookie and localStorage
      Cookies.set('isAuthenticated', 'true', { expires: 1 });
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },
  
  logout: () => {
    Cookies.remove('isAuthenticated');
    localStorage.removeItem('currentUser');
    set({ user: null, isAuthenticated: false });
  },
  
  checkAuth: () => {
    const isAuth = Cookies.get('isAuthenticated') === 'true';
    const userJson = localStorage.getItem('currentUser');
    
    if (isAuth && userJson) {
      const user = JSON.parse(userJson);
      set({ user, isAuthenticated: true, isLoading: false });
    } else {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
