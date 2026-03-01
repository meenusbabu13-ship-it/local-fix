import { create } from 'zustand';

interface UserRecord {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    joinedDate: string;
    avatar: string;
    [key: string]: any;
}

interface LogRecord {
    id: string;
    user: string;
    action: string;
    timestamp: string;
}

interface AppState {
    users: UserRecord[];
    logs: LogRecord[];
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    addUser: (user: any) => void;
    updateUser: (id: string, data: any) => void;
    deleteUser: (id: string) => void;
    setUsers: (users: any[]) => void;
    addLog: (log: any) => void;
}

export const useAppStore = create<AppState>((set) => ({
    users: [],
    logs: [],
    theme: 'light',
    toggleTheme: () =>
        set((state) => {
            const newTheme = state.theme === 'light' ? 'dark' : 'light';
            if (newTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            localStorage.setItem('theme', newTheme);
            return { theme: newTheme };
        }),
    addUser: (user) =>
        set((state) => ({
            users: [...state.users, { ...user, id: Math.random().toString(36).substr(2, 9) }],
        })),
    updateUser: (id, data) =>
        set((state) => ({
            users: state.users.map((u) => (u.id === id ? { ...u, ...data } : u)),
        })),
    deleteUser: (id) =>
        set((state) => ({ users: state.users.filter((u) => u.id !== id) })),
    setUsers: (users) => set({ users }),
    addLog: (log) => set((state) => ({ logs: [log, ...state.logs] })),
}));
