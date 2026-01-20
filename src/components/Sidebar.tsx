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
    ChevronRight
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

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

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

    const NavLink = ({ route, isMobile = false }: { route: typeof routes[0]; isMobile?: boolean }) => (
        <Link
            href={route.href}
            onClick={() => isMobile && setIsOpen(false)}
            className={cn(
                "group flex items-center justify-between rounded-xl px-3 py-3 sm:py-2.5 text-sm font-medium transition-all duration-200",
                pathname === route.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground active:bg-accent active:scale-[0.98]"
            )}
        >
            <div className="flex items-center">
                <route.icon className={cn(
                    "mr-3 h-5 w-5 shrink-0 transition-colors",
                    pathname === route.href ? "text-primary" : "text-muted-foreground group-hover:text-accent-foreground"
                )} />
                <span className="truncate">{route.label}</span>
            </div>
            {pathname === route.href && (
                <ChevronRight className="h-4 w-4 text-primary shrink-0" />
            )}
        </Link>
    );

    const UserInfo = () => (
        <div className="flex items-center space-x-3 px-3 py-4 border-b mb-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden shrink-0">
                {user?.avatar ? (
                    <img src={user.avatar} alt={user?.name} className="h-full w-full object-cover" />
                ) : (
                    <UserCircle className="h-6 w-6" />
                )}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground capitalize truncate">
                    {user?.role.toLowerCase().replace('_', ' ')}
                </p>
            </div>
        </div>
    );

    const LogoutButton = ({ isMobile = false }: { isMobile?: boolean }) => (
        <button
            onClick={() => {
                setIsOpen(false);
                logout();
            }}
            className={cn(
                "flex w-full items-center rounded-xl px-3 py-3 sm:py-2.5 text-sm font-medium text-destructive transition-all duration-200",
                "hover:bg-destructive/10 active:bg-destructive/15 active:scale-[0.98]"
            )}
        >
            <LogOut className="mr-3 h-5 w-5 shrink-0" />
            <span>Logout</span>
        </button>
    );

    const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
        <>
            {/* User Info - Mobile Only */}
            {isMobile && <UserInfo />}

            {/* Navigation Links */}
            <div className="flex-1 space-y-1 px-3 py-2 overflow-y-auto">
                <div className="space-y-1">
                    {filteredRoutes.map((route) => (
                        <NavLink key={route.href} route={route} isMobile={isMobile} />
                    ))}
                </div>
            </div>

            {/* Logout Button */}
            <div className="border-t p-3 sm:p-4 mt-auto">
                <LogoutButton isMobile={isMobile} />
            </div>
        </>
    );

    return (
        <>
            {/* Mobile Header with Menu Button */}
            <div className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 px-3 sm:px-4 lg:hidden safe-area-inset-top">
                <div className="flex items-center">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="shrink-0 h-10 w-10 hover:bg-accent active:bg-accent active:scale-95 transition-transform"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent 
                            side="left" 
                            className="w-[280px] sm:w-72 p-0 safe-area-inset-left"
                        >
                            <SheetHeader className="px-4 sm:px-6 py-4 border-b">
                                <SheetTitle className="text-left text-xl font-bold text-primary">
                                    GrubPac EMS
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex h-[calc(100vh-65px)] flex-col safe-area-inset-bottom">
                                <SidebarContent isMobile={true} />
                            </div>
                        </SheetContent>
                    </Sheet>
                    <span className="ml-2 text-lg font-bold text-primary">GrubPac EMS</span>
                </div>

                {/* Mobile Quick Actions */}
                <div className="flex items-center space-x-1">
                    <Link href="/profile">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-10 w-10 hover:bg-accent active:bg-accent active:scale-95 transition-transform"
                        >
                            <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden">
                                {user?.avatar ? (
                                    <img src={user.avatar} alt={user?.name} className="h-full w-full object-cover" />
                                ) : (
                                    <UserCircle className="h-4 w-4" />
                                )}
                            </div>
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Mobile Spacer - Prevents content from going under fixed header */}
            <div className="h-14 lg:hidden" />

            {/* Desktop Sidebar */}
            <div className="hidden h-full w-64 flex-col border-r bg-card text-card-foreground transition-colors duration-200 lg:flex">
                <div className="flex h-16 items-center px-6 border-b">
                    <span className="text-xl font-bold text-primary">GrubPac EMS</span>
                </div>
                <div className="flex flex-col flex-1 overflow-hidden">
                    <SidebarContent isMobile={false} />
                </div>
            </div>
        </>
    );
};

export default Sidebar;
