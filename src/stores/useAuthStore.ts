import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'Admin' | 'User' | 'ServiceProvider';

export interface Location {
    lat: number;
    lng: number;
    address: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    location?: Location;
    // Provider specific fields
    specialty?: string;
    rating?: number;
    completedJobs?: number;
    hourlyRate?: number;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isNewUser: boolean;
    login: (user: User, token: string) => void;
    signup: (user: User, token: string) => void;
    logout: () => void;
    resetNewUser: () => void;
    updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isNewUser: false,
            login: (user, token) => set({ user, token, isAuthenticated: true, isNewUser: false }),
            signup: (user, token) => set({ user, token, isAuthenticated: true, isNewUser: true }),
            logout: () => set({ user: null, token: null, isAuthenticated: false, isNewUser: false }),
            resetNewUser: () => set({ isNewUser: false }),
            updateUser: (updates: Partial<User>) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...updates } : null,
                })),
        }),
        {
            name: 'auth-storage',
        }
    )
);
