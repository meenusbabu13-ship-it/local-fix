import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Search, Send, Phone, Video, MoreVertical, Paperclip, Mic } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProviderMessages = () => {
    const [selectedChat, setSelectedChat] = useState(0);
    const [message, setMessage] = useState('');

    const chats = [
        {
            id: 1,
            name: 'Sarah Johnson',
            avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
            lastMsg: 'Great, see you then!',
            time: '10:30 AM',
            unread: 0,
            online: true
        },
        {
            id: 2,
            name: 'Michael Ross',
            avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
            lastMsg: 'Can you verify the part number?',
            time: 'Yesterday',
            unread: 2,
            online: false
        },
        {
            id: 3,
            name: 'Elena Rodriguez',
            avatar: 'https://i.pravatar.cc/150?u=a04258114e29026302d',
            lastMsg: 'Thanks for the quick fix!',
            time: 'Oct 22',
            unread: 0,
            online: false
        },
    ];

    const messages = [
        { id: 1, sender: 'them', text: 'Hi, are you available for a quick consult?', time: '10:00 AM' },
        { id: 2, sender: 'me', text: 'Yes, I can stop by around 2 PM.', time: '10:15 AM' },
        { id: 3, sender: 'them', text: 'That works perfectly.', time: '10:25 AM' },
        { id: 4, sender: 'them', text: 'Great, see you then!', time: '10:30 AM' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-[calc(100vh-8rem)] flex gap-6"
        >
            {/* Chat List */}
            <Card className="w-1/3 flex flex-col p-0 overflow-hidden">
                <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Messages</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm border-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {chats.map((chat, idx) => (
                        <div
                            key={chat.id}
                            onClick={() => setSelectedChat(idx)}
                            className={`p-4 flex gap-3 cursor-pointer transition-colors border-b border-gray-50 dark:border-gray-800/50 ${selectedChat === idx ? 'bg-primary/5 dark:bg-primary/10' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                }`}
                        >
                            <div className="relative">
                                <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
                                {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-900"></div>}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className={`font-bold text-sm truncate ${selectedChat === idx ? 'text-primary' : 'text-gray-900 dark:text-white'}`}>
                                        {chat.name}
                                    </h4>
                                    <span className="text-xs text-gray-400">{chat.time}</span>
                                </div>
                                <p className={`text-sm truncate ${chat.unread ? 'font-bold text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                                    {chat.lastMsg}
                                </p>
                            </div>
                            {chat.unread > 0 && (
                                <div className="flex flex-col justify-center">
                                    <span className="w-5 h-5 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                                        {chat.unread}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Card>

            {/* Chat Window */}
            <Card className="flex-1 flex flex-col p-0 overflow-hidden bg-white dark:bg-gray-900">
                {/* Header */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-900 z-10 shadow-sm">
                    <div className="flex items-center gap-3">
                        <img src={chats[selectedChat].avatar} alt="" className="w-10 h-10 rounded-full" />
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">{chats[selectedChat].name}</h3>
                            <p className="text-xs text-emerald-500 font-medium">Online now</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500"><Phone className="w-5 h-5" /></button>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500"><Video className="w-5 h-5" /></button>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500"><MoreVertical className="w-5 h-5" /></button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50 dark:bg-black/20">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] rounded-2xl px-5 py-3 shadow-sm ${msg.sender === 'me'
                                    ? 'bg-primary text-white rounded-br-sm'
                                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-sm'
                                }`}>
                                <p className="text-sm">{msg.text}</p>
                                <p className={`text-[10px] mt-1 text-right ${msg.sender === 'me' ? 'text-white/70' : 'text-gray-400'}`}>
                                    {msg.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                    <div className="flex gap-2 items-end">
                        <button className="p-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                            <Paperclip className="w-5 h-5" />
                        </button>
                        <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center p-2">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-transparent border-none focus:ring-0 text-sm p-2"
                                onKeyDown={(e) => e.key === 'Enter' && setMessage('')}
                            />
                            <button className="p-2 text-gray-400 hover:text-gray-600">
                                <Mic className="w-4 h-4" />
                            </button>
                        </div>
                        <button
                            className="p-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                            onClick={() => setMessage('')}
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};
