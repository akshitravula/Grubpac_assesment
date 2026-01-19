"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuthStore';
import {
    LayoutDashboard,
    CalendarCheck,
    CalendarDays,
    FileText,
    Wallet,
    Users,
    LogOut,
    UserCircle
} from 'lucide-react';

const Sidebar = () => {
    const pathname = usePathname();
    const { user, logout } = useAuthStore();

    const routes = [
        {
            label: 'Dashboard',
            icon: LayoutDashboard,
            href: '/dashboard',
            roles: ['OWNER', 'TEAM_LEAD', 'EMPLOYEE'],
        },
        {
            label: 'Attendance',
            icon: CalendarCheck,
            href: '/attendance',
            roles: ['OWNER', 'TEAM_LEAD', 'EMPLOYEE'],
        },
        {
            label: 'Leave Management',
            icon: CalendarDays,
            href: '/leaves',
            roles: ['OWNER', 'TEAM_LEAD', 'EMPLOYEE'],
        },
        {
            label: 'Holidays',
            icon: FileText,
            href: '/holidays',
            roles: ['OWNER', 'TEAM_LEAD', 'EMPLOYEE'],
        },
        {
            label: 'Salary',
            icon: Wallet,
            href: '/salary',
            roles: ['OWNER', 'TEAM_LEAD', 'EMPLOYEE'],
        },
        {
            label: 'Team',
            icon: Users,
            href: '/team',
            roles: ['OWNER', 'TEAM_LEAD'],
        },
        {
            label: 'My Profile',
            icon: UserCircle,
            href: '/profile',
            roles: ['OWNER', 'TEAM_LEAD', 'EMPLOYEE'],
        },
    ];

    const filteredRoutes = routes.filter((route) =>
        user && route.roles.includes(user.role)
    );

    return (
        <div className="flex h-full w-64 flex-col border-r bg-card text-card-foreground transition-colors duration-200">
            <div className="flex h-16 items-center px-6">
                <span className="text-xl font-bold text-primary">GrubPac EMS</span>
            </div>

            <div className="flex-1 space-y-1 px-3 py-4">
                {filteredRoutes.map((route) => (
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                            "group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                            pathname === route.href
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                    >
                        <route.icon className={cn(
                            "mr-3 h-5 w-5 transition-colors",
                            pathname === route.href ? "text-primary" : "text-muted-foreground group-hover:text-accent-foreground"
                        )} />
                        {route.label}
                    </Link>
                ))}
            </div>

            <div className="border-t p-4">
                <button
                    onClick={logout}
                    className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
