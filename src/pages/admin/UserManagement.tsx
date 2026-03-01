import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { useAuthStore } from '../../stores/useAuthStore';
import { api } from '../../services/api';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Edit2, Trash2, Plus, Search, Shield, User, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const UserManagement = () => {
    const { token } = useAuthStore();
    const { users, addUser, updateUser, deleteUser, setUsers } = useAppStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);
    const [formData, setFormData] = useState({ name: '', email: '', role: 'User' });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);

    // Fetch real users on mount
    useEffect(() => {
        if (!token) return;
        const fetchUsers = async () => {
            try {
                const res = await api.getUsers(token);
                if (res.success) {
                    const mappedUsers = res.users.map((u: any) => ({
                        id: u._id,
                        name: u.name,
                        email: u.email,
                        role: 'User',
                        status: 'Active',
                        joinedDate: u.createdAt || new Date().toISOString(),
                        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=random`,
                    }));
                    setUsers(mappedUsers);
                }
            } catch (err) {
                console.error('Failed to fetch users from API.', err);
            }
        };
        fetchUsers();
    }, [token, setUsers]);

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = () => {
        if (editingUser) {
            updateUser(editingUser.id, formData);
        } else {
            addUser({
                ...formData,
                status: 'Active',
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`,
                joinedDate: new Date().toISOString().split('T')[0],
            });
        }
        handleCloseModal();
    };

    const handleEdit = (user: any) => {
        setEditingUser(user);
        setFormData({ name: user.name, email: user.email, role: user.role });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
        setFormData({ name: '', email: '', role: 'User' });
    };

    const confirmDelete = (id: string) => {
        setUserToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        if (userToDelete) {
            const user = users.find((u) => u.id === userToDelete);
            if (user && token) {
                try {
                    const type = user.role === 'ServiceProvider' ? 'provider' : 'user';
                    await api.deleteUser(user.id, type as any, token);
                } catch (err) {
                    console.error('API delete failed, falling back to local delete', err);
                }
            }
            deleteUser(userToDelete);
            setIsDeleteModalOpen(false);
            setUserToDelete(null);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">
                        User Management
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Manage platform users and permissions.
                    </p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} className="shadow-lg shadow-primary/25">
                    <Plus className="w-5 h-5 mr-2" />
                    Add New User
                </Button>
            </div>

            <div className="glass dark:glass-dark rounded-[2.5rem] p-8 border border-slate-200/50 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none">
                <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search users by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 text-slate-900 dark:text-white placeholder-slate-400 transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-white/5 text-left">
                                <th className="pb-6 pl-6 font-display font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">User</th>
                                <th className="pb-6 font-display font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Role</th>
                                <th className="pb-6 font-display font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                                <th className="pb-6 font-display font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Joined Date</th>
                                <th className="pb-6 pr-6 text-right font-display font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            <AnimatePresence>
                                {filteredUsers.map((user, idx) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                                    >
                                        <td className="py-5 pl-6">
                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    <img
                                                        src={user.avatar}
                                                        alt=""
                                                        className="w-12 h-12 rounded-2xl object-cover shadow-sm ring-2 ring-white dark:ring-white/10"
                                                    />
                                                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-dark-bg flex items-center justify-center ${user.status === 'Active' ? 'bg-green-500' : 'bg-slate-400'}`}>
                                                        {user.status === 'Active' && <CheckCircle2 className="w-2.5 h-2.5 text-white" />}
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 dark:text-white font-display text-base">{user.name}</p>
                                                    <p className="text-sm text-slate-500 font-medium">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-5">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-xl border ${user.role === 'Admin'
                                                ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/20'
                                                : 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                                                }`}>
                                                {user.role === 'Admin' ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-5">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'bg-slate-400'}`} />
                                                <span className="font-medium text-sm text-slate-600 dark:text-slate-300">{user.status}</span>
                                            </div>
                                        </td>
                                        <td className="py-5 text-slate-500 font-medium text-sm">
                                            {new Date(user.joinedDate).toLocaleDateString('en-US', {
                                                month: 'short', day: 'numeric', year: 'numeric',
                                            })}
                                        </td>
                                        <td className="py-5 pr-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button
                                                    variant="ghost"
                                                    onClick={() => handleEdit(user)}
                                                    className="h-9 w-9 p-0 rounded-xl hover:bg-blue-50 text-blue-600 dark:hover:bg-blue-900/20 dark:text-blue-400"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    onClick={() => confirmDelete(user.id)}
                                                    className="h-9 w-9 p-0 rounded-xl hover:bg-rose-50 text-rose-600 dark:hover:bg-rose-900/20 dark:text-rose-400"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                    {filteredUsers.length === 0 && (
                        <div className="py-20 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                                <Search className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No users found</h3>
                            <p className="text-slate-500 mt-1">
                                {searchTerm ? 'Try adjusting your search terms.' : 'No users have registered yet.'}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Edit / Add Modal */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingUser ? 'Edit User' : 'Add New User'}>
                <div className="space-y-6">
                    <Input
                        label="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                    />
                    <Input
                        label="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        type="email"
                    />
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Role</label>
                        <div className="grid grid-cols-2 gap-4">
                            {['User', 'Admin'].map((role) => (
                                <button
                                    key={role}
                                    onClick={() => setFormData({ ...formData, role })}
                                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all font-semibold ${formData.role === role
                                        ? 'border-primary bg-primary/5 text-primary'
                                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                                        }`}
                                >
                                    {role === 'Admin' ? <Shield className="w-4 h-4" /> : <User className="w-4 h-4" />}
                                    {role}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 dark:border-white/5">
                        <Button variant="ghost" onClick={handleCloseModal}>Cancel</Button>
                        <Button onClick={handleSubmit}>{editingUser ? 'Save Changes' : 'Create User'}</Button>
                    </div>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Deletion">
                <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 flex gap-3">
                        <XCircle className="w-6 h-6 shrink-0" />
                        <p className="font-medium text-sm">
                            Are you sure you want to delete this user? This action cannot be undone and will remove all their data.
                        </p>
                    </div>
                    <div className="flex justify-end gap-3">
                        <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                        <Button variant="danger" onClick={handleDelete}>Delete User</Button>
                    </div>
                </div>
            </Modal>
        </motion.div>
    );
};
