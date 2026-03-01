import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { useAppStore } from '../stores/useAppStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Mail, Lock, Shield, User, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../services/api';

type LoginRole = 'user' | 'admin' | 'provider';

const ROLE_OPTIONS: { value: LoginRole; label: string; icon: React.ReactNode; color: string }[] = [
    { value: 'user', label: 'User', icon: <User className="w-4 h-4" />, color: 'from-blue-500 to-indigo-500' },
    { value: 'provider', label: 'Provider', icon: <Wrench className="w-4 h-4" />, color: 'from-violet-500 to-purple-500' },
    { value: 'admin', label: 'Admin', icon: <Shield className="w-4 h-4" />, color: 'from-emerald-500 to-teal-500' },
];

export const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const { addLog } = useAppStore();

    const [selectedRole, setSelectedRole] = useState<LoginRole>('user');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [pendingMessage, setPendingMessage] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setPendingMessage('');

        try {
            const response = await api.login(email, password, selectedRole);

            if (response.success && response.token) {
                const apiUser = response.user;
                const mappedRole =
                    apiUser.role === 'admin' ? 'Admin'
                        : apiUser.role === 'provider' ? 'ServiceProvider'
                            : 'User';

                const userToStore = { ...apiUser, id: apiUser._id || apiUser.id, role: mappedRole };
                login(userToStore, response.token);

                addLog({
                    id: Math.random().toString(),
                    user: userToStore.name || 'User',
                    action: 'System Login',
                    timestamp: new Date().toLocaleString(),
                });

                if (mappedRole === 'Admin') navigate('/admin');
                else if (mappedRole === 'ServiceProvider') navigate('/provider');
                else navigate('/dashboard');
            } else {
                setError(response.message || 'Login failed.');
            }
        } catch (err: any) {
            if (err.status === 'pending') {
                setPendingMessage(err.message);
            } else if (err.status === 'rejected') {
                setError(err.message);
            } else {
                setError(err.message || 'Invalid credentials. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg transition-colors duration-300 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-800">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                            Sign In
                        </h1>
                        <p className="text-gray-500">Welcome back</p>
                    </div>

                    {/* Role Selector */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                            Sign in as
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {ROLE_OPTIONS.map((role) => (
                                <button
                                    key={role.value}
                                    type="button"
                                    onClick={() => setSelectedRole(role.value)}
                                    className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 transition-all text-xs font-semibold ${selectedRole === role.value
                                        ? `border-transparent bg-gradient-to-br ${role.color} text-white shadow-lg`
                                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                                        }`}
                                >
                                    {role.icon}
                                    {role.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={<Mail className="w-5 h-5" />}
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={<Lock className="w-5 h-5" />}
                            required
                        />

                        {error && (
                            <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-xl text-center">
                                {error}
                            </p>
                        )}
                        {pendingMessage && (
                            <div className="text-sm text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-4 py-3 rounded-xl text-center border border-amber-200 dark:border-amber-700/30">
                                ⏳ {pendingMessage}
                            </div>
                        )}

                        <Button type="submit" className="w-full" isLoading={loading} size="lg">
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-6 space-y-3 text-center text-sm text-gray-500">
                        <div>
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-primary hover:underline font-medium">
                                Sign up as User
                            </Link>
                        </div>
                        <div>
                            Are you a service provider?{' '}
                            <Link to="/provider-register" className="text-violet-600 hover:underline font-semibold">
                                Register as Provider
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
