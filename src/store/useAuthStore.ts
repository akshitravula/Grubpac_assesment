import { create } from 'zustand';
import { User, Role } from '@/lib/types';
import { MOCK_USERS } from '@/lib/mock-data';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, role: Role) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    login: async (email, role) => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                const foundUser = MOCK_USERS.find(u => u.email === email && u.role === role);
                if (foundUser) {
                    set({ user: foundUser, isAuthenticated: true });
                }
                resolve();
            }, 500);
        });
    },
    logout: () => {
        set({ user: null, isAuthenticated: false });
    },
}));
