import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
  user: User | null;
  login: (walletAddress: string, role: 'teacher' | 'student') => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: async (walletAddress: string, role: 'teacher' | 'student') => {
        // In a real app, you'd verify the wallet signature and fetch user data
        const mockUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          role,
          name: role === 'teacher' ? 'John Doe' : 'Jane Smith',
          walletAddress
        };
        set({ user: mockUser });
      },
      logout: () => set({ user: null })
    }),
    {
      name: 'auth-storage'
    }
  )
);