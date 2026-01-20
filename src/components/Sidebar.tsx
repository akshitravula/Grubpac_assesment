"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
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
    UserCircle,
    Menu,
    X
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
    const pathname = usePathname();
    const { user, logout } = useAuthStore();
    const [isOpen, setIsOpen] = useState(false);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

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

    const SidebarContent = () => (
        <>
            <div className="flex-1 space-y-1 px-3 py-4">
                {filteredRoutes.map((route) => (
                    <Link
                        key={route.href}
                        href={route.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                            "group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                            pathname === route.href
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                    >
                        <route.icon className={cn(
                            "mr-3 h-5 w-5 shrink-0 transition-colors",
                            pathname === route.href ? "text-primary" : "text-muted-foreground group-hover:text-accent-foreground"
                        )} />
                        {route.label}
                    </Link>
                ))}
            </div>

            <div className="border-t p-4">
                <button
                    onClick={() => {
                        setIsOpen(false);
                        logout();
                    }}
                    className="flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                >
                    <LogOut className="mr-3 h-5 w-5 shrink-0" />
                    Logout
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* Mobile Header with Menu Button */}
            <div className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center border-b bg-background px-4 lg:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="shrink-0">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64 p-0">
                        <SheetHeader className="border-b px-6 py-4">
                            <SheetTitle className="text-left text-xl font-bold text-primary">
                                GrubPac EMS
                            </SheetTitle>
                        </SheetHeader>
                        <div className="flex h-[calc(100vh-65px)] flex-col">
                            <SidebarContent />
                        </div>
                    </SheetContent>
                </Sheet>
                <span className="ml-3 text-lg font-bold text-primary">GrubPac EMS</span>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden h-full w-64 flex-col border-r bg-card text-card-foreground transition-colors duration-200 lg:flex">
                <div className="flex h-16 items-center px-6">
                    <span className="text-xl font-bold text-primary">GrubPac EMS</span>
                </div>
                <SidebarContent />
            </div>
        </>
    );
};

export default Sidebar;
