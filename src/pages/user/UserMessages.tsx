import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Search, Send, Phone, Video, MoreVertical, Paperclip, Mic, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export const UserMessages = () => {
    const [selectedChat, setSelectedChat] = useState(0);
    const [message, setMessage] = useState('');

    const chats = [
        {
            id: 1,
            name: "Dave's Pro Repairs",
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
            lastMsg: 'Great, see you then!',
            time: '10:30 AM',
            unread: 0,
            online: true
        },
        {
            id: 2,
            name: 'Sparkle Cleaners',
            avatar: 'https://images.unsplash.com/photo-1581578017093-cd30fba4e9d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            lastMsg: 'Can you verify the part number?',
            time: 'Yesterday',
            unread: 2,
            online: false
        },
    ];

    const messages = [
        { id: 1, sender: 'them', text: 'Hi John, I will be arriving at 2 PM as scheduled.', time: '10:00 AM' },
        { id: 2, sender: 'me', text: 'Perfect, looking forward to it.', time: '10:15 AM' },
        { id: 3, sender: 'them', text: 'Excellent.', time: '10:25 AM' },
        { id: 4, sender: 'them', text: 'Great, see you then!', time: '10:30 AM' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-[calc(100vh-8rem)] flex gap-6"
        >
            {/* Chat List */}
            <Card className="w-1/3 flex flex-col p-0 overflow-hidden bg-slate-50 dark:bg-slate-900 border-none rounded-r-none">
                <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Messages</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search providers..."
                            disabled
                            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-gray-800 rounded-lg text-sm border-none focus:ring-2 focus:ring-primary/20 cursor-not-allowed opacity-50"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto flex items-center justify-center p-6 text-center">
                    <div>
                        <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500 text-sm">No active conversations</p>
                    </div>
                </div>
            </Card>

            {/* Chat Window */}
            <Card className="flex-1 flex flex-col p-0 overflow-hidden bg-white dark:bg-gray-900 rounded-l-none">
                {/* Header */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-900 z-10 shadow-sm min-h-[73px]">
                    <div className="text-sm font-bold text-slate-400">Select a perfect provider to start chatting</div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 dark:bg-black/20 flex items-center justify-center text-center">
                    <div>
                        <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm mx-auto mb-4 border border-slate-100 dark:border-gray-700">
                            <Send className="w-6 h-6 text-slate-300" />
                        </div>
                        <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-1">Your Inbox is Empty</h3>
                        <p className="text-slate-500 text-sm max-w-[250px] mx-auto">Once you contact a provider or book a service, your messages will appear here.</p>
                        <button onClick={() => window.location.href = '/services'} className="mt-6 px-6 py-2 bg-primary text-white rounded-full text-sm font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-indigo-500/25">
                            Find a Provider
                        </button>
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 opacity-50 pointer-events-none">
                    <div className="flex gap-2 items-end">
                        <button className="p-3 text-gray-400 rounded-xl">
                            <Paperclip className="w-5 h-5" />
                        </button>
                        <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center p-2">
                            <input
                                type="text"
                                disabled
                                placeholder="Type a message..."
                                className="flex-1 bg-transparent border-none text-sm p-2"
                            />
                            <button className="p-2 text-gray-400">
                                <Mic className="w-4 h-4" />
                            </button>
                        </div>
                        <button className="p-3 bg-gray-300 dark:bg-gray-700 text-white rounded-xl">
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};
