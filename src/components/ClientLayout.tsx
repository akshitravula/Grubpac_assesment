"use client";

import { useAuthStore } from '@/store/useAuthStore';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isAuthenticated && pathname !== '/login') {
            router.push('/login');
        } else if (isAuthenticated && pathname === '/login') {
            router.push('/dashboard');
        }
    }, [isAuthenticated, pathname, router]);

    if (!isAuthenticated && pathname !== '/login') {
        return null;
    }

    if (pathname === '/login') {
        return (
            <ThemeProvider attribute="class" defaultTheme="light">
                {children}
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider attribute="class" defaultTheme="light">
            <div className="flex h-screen bg-background text-foreground overflow-hidden">
                <Sidebar />
                <div className="flex flex-1 flex-col overflow-hidden">
                    <Navbar />
                    <main className="flex-1 overflow-y-auto p-8 bg-background">
                        {children}
                    </main>
                </div>
            </div>
        </ThemeProvider>
    );
}
