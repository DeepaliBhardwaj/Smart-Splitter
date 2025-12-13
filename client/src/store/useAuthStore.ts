import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Mock User
const MOCK_USER: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://github.com/shadcn.png',
};

export const useAuthStore = create<AuthState>((set) => ({
  user: MOCK_USER, // Default logged in for mockup
  isAuthenticated: true,
  login: async (email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({ 
      user: { ...MOCK_USER, email }, 
      isAuthenticated: true 
    });
  },
  register: async (name, email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({ 
      user: { id: `u${Math.random()}`, name, email, avatar: '' }, 
      isAuthenticated: true 
    });
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));