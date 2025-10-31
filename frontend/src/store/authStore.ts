import { create } from 'zustand';
import { authAPI } from '@/lib/api';

interface User {
  id: string;
  email: string;
  full_name?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName?: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (email: string, password: string) => {
    try {
      const data = await authAPI.login(email, password);
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.access_token);
      }

      const user = await authAPI.getCurrentUser();
      set({ user, token: data.access_token, isAuthenticated: true });
    } catch (error) {
      throw error;
    }
  },

  register: async (email: string, password: string, fullName?: string) => {
    try {
      await authAPI.register(email, password, fullName);
      // Auto-login after registration
      const data = await authAPI.login(email, password);
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.access_token);
      }

      const user = await authAPI.getCurrentUser();
      set({ user, token: data.access_token, isAuthenticated: true });
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    set({ user: null, token: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    // Only run on client side
    if (typeof window === 'undefined') {
      set({ isLoading: false });
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      set({ isLoading: false });
      return;
    }

    try {
      const user = await authAPI.getCurrentUser();
      set({ user, token, isAuthenticated: true, isLoading: false });
    } catch (error) {
      localStorage.removeItem('token');
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }
  },
}));

