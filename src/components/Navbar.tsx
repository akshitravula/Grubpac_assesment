"use client";

import { useAuthStore } from '@/store/useAuthStore';
import { Bell, Search, User as UserIcon } from 'lucide-react';
import { Input } from './ui/input';
import { ThemeToggle } from './ThemeToggle';
import { useState } from 'react';
import Link from 'next/link';
import { Badge } from './ui/badge';

const Navbar = () => {
    const { user } = useAuthStore();
    const [showNotifications, setShowNotifications] = useState(false);

    const notifications = [
        { id: 1, text: "Leave request approved", time: "2h ago" },
        { id: 2, text: "New holiday marked on calendar", time: "5h ago" },
        { id: 3, text: "Salary slip for Jan is generated", time: "1d ago" },
    ];

    return (
        <nav className="flex h-16 items-center justify-between border-b bg-card text-card-foreground px-8 transition-colors duration-200">
            <div className="flex w-96 items-center">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search anything..."
                        className="pl-10 focus-visible:ring-1"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <ThemeToggle />

                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-accent"
                    >
                        <Bell className="h-5 w-5" />
                        <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-card">
                            3
                        </span>
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-80 bg-card border rounded-xl shadow-lg z-50 overflow-hidden">
                            <div className="p-4 border-b flex justify-between items-center text-foreground">
                                <span className="font-bold text-sm">Notifications</span>
                                <Badge variant="info">3 New</Badge>
                            </div>
                            <div className="max-h-64 overflow-y-auto">
                                {notifications.map((n) => (
                                    <div key={n.id} className="p-4 border-b last:border-0 hover:bg-accent transition-colors cursor-pointer text-foreground">
                                        <p className="text-sm">{n.text}</p>
                                        <span className="text-[10px] text-muted-foreground mt-1 block">{n.time}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="p-3 text-center border-t">
                                <button className="text-xs text-primary font-bold hover:underline">View All Notifications</button>
                            </div>
                        </div>
                    )}
                </div>

                <Link href="/profile" className="flex items-center space-x-3 border-l pl-6 hover:opacity-80 transition-opacity">
                    <div className="flex flex-col text-right hidden lg:flex">
                        <span className="text-sm font-semibold text-foreground">{user?.name}</span>
                        <span className="text-xs text-muted-foreground capitalize">{user?.role.toLowerCase().replace('_', ' ')}</span>
                    </div>
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary overflow-hidden">
                        {user?.avatar ? (
                            <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                        ) : (
                            <UserIcon className="h-6 w-6" />
                        )}
                    </div>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
