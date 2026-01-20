"use client";

import { useAuthStore } from '@/store/useAuthStore';
import { Bell, Search, User as UserIcon, X } from 'lucide-react';
import { Input } from './ui/input';
import { ThemeToggle } from './ThemeToggle';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Badge } from './ui/badge';

const Navbar = () => {
    const { user } = useAuthStore();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    const notifications = [
        { id: 1, text: "Leave request approved", time: "2h ago" },
        { id: 2, text: "New holiday marked on calendar", time: "5h ago" },
        { id: 3, text: "Salary slip for Jan is generated", time: "1d ago" },
    ];

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowMobileSearch(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close mobile search on escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setShowMobileSearch(false);
                setShowNotifications(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    return (
        <nav className="flex h-14 sm:h-16 items-center justify-between border-b bg-card text-card-foreground px-3 sm:px-6 lg:px-8 transition-colors duration-200 relative">
            {/* Desktop Search Bar */}
            <div className="hidden md:flex w-64 lg:w-80 xl:w-96 items-center">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search anything..."
                        className="pl-10 focus-visible:ring-1 h-9 lg:h-10"
                    />
                </div>
            </div>

            {/* Mobile Search Button */}
            <button
                onClick={() => setShowMobileSearch(true)}
                className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-accent"
            >
                <Search className="h-5 w-5" />
            </button>

            {/* Mobile Search Overlay */}
            {showMobileSearch && (
                <div 
                    ref={searchRef}
                    className="absolute inset-x-0 top-0 h-14 bg-card z-50 flex items-center px-3 gap-2 md:hidden border-b"
                >
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search anything..."
                            className="pl-10 focus-visible:ring-1 h-9 w-full"
                            autoFocus
                        />
                    </div>
                    <button
                        onClick={() => setShowMobileSearch(false)}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-accent shrink-0"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
            )}

            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
                <ThemeToggle />

                {/* Notifications */}
                <div className="relative" ref={notificationRef}>
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-accent"
                    >
                        <Bell className="h-5 w-5" />
                        <span className="absolute right-0.5 top-0.5 sm:right-1.5 sm:top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-card">
                            3
                        </span>
                    </button>

                    {showNotifications && (
                        <>
                            {/* Mobile: Full-width dropdown */}
                            <div className="fixed sm:absolute inset-x-0 sm:inset-x-auto sm:right-0 top-14 sm:top-auto sm:mt-2 w-full sm:w-80 bg-card border-y sm:border sm:rounded-xl shadow-lg z-50 overflow-hidden">
                                <div className="p-3 sm:p-4 border-b flex justify-between items-center text-foreground">
                                    <span className="font-bold text-sm">Notifications</span>
                                    <Badge variant="info">3 New</Badge>
                                </div>
                                <div className="max-h-[50vh] sm:max-h-64 overflow-y-auto">
                                    {notifications.map((n) => (
                                        <div 
                                            key={n.id} 
                                            className="p-3 sm:p-4 border-b last:border-0 hover:bg-accent active:bg-accent transition-colors cursor-pointer text-foreground"
                                        >
                                            <p className="text-sm">{n.text}</p>
                                            <span className="text-[10px] text-muted-foreground mt-1 block">{n.time}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 text-center border-t">
                                    <button className="text-xs text-primary font-bold hover:underline active:underline">
                                        View All Notifications
                                    </button>
                                </div>
                            </div>
                            {/* Mobile backdrop */}
                            <div 
                                className="fixed inset-0 bg-black/20 z-40 sm:hidden" 
                                onClick={() => setShowNotifications(false)}
                            />
                        </>
                    )}
                </div>

                {/* User Profile */}
                <Link 
                    href="/profile" 
                    className="flex items-center space-x-2 sm:space-x-3 border-l pl-2 sm:pl-4 lg:pl-6 hover:opacity-80 active:opacity-70 transition-opacity"
                >
                    <div className="hidden sm:flex flex-col text-right">
                        <span className="text-sm font-semibold text-foreground truncate max-w-[100px] lg:max-w-[150px]">
                            {user?.name}
                        </span>
                        <span className="text-xs text-muted-foreground capitalize truncate max-w-[100px] lg:max-w-[150px]">
                            {user?.role.toLowerCase().replace('_', ' ')}
                        </span>
                    </div>
                    <div className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary overflow-hidden shrink-0">
                        {user?.avatar ? (
                            <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                        ) : (
                            <UserIcon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                        )}
                    </div>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
