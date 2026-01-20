"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Clock,
    CalendarDays,
    Wallet,
    Play,
    Square,
    ChevronRight,
    Activity,
    Calendar
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useState, useEffect } from 'react';

const EmployeeDashboard = () => {
    const { user } = useAuthStore();
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [isClockedIn, setIsClockedIn] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Get greeting based on time
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    };

    return (
        <div className="space-y-4 sm:space-y-6 lg:space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="min-w-0">
                        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-foreground truncate">
                            {getGreeting()}, {user?.name?.split(' ')[0]}!
                        </h1>
                        <p className="text-sm sm:text-base text-muted-foreground">
                            You have no pending tasks for today.
                        </p>
                    </div>
                    <div className="flex items-center space-x-3 bg-card border px-3 sm:px-4 py-2 rounded-xl shadow-sm self-start sm:self-auto">
                        <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
                        <span className="text-base sm:text-lg font-bold font-mono text-foreground tabular-nums">
                            {time}
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {/* Clock In/Out Card - Full Width on Mobile */}
                <Card className="sm:col-span-2 bg-gradient-to-br from-primary to-blue-700 text-white border-none shadow-xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-10">
                        <Clock className="h-16 sm:h-20 lg:h-24 w-16 sm:w-20 lg:w-24" />
                    </div>
                    <CardContent className="p-4 sm:p-6 lg:p-8">
                        <div className="flex flex-col h-full justify-between relative z-10">
                            <div>
                                <Badge 
                                    variant="secondary" 
                                    className="bg-white/20 text-white border-none mb-2 sm:mb-4 text-xs"
                                >
                                    Current Shift
                                </Badge>
                                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                                    09:00 AM - 06:00 PM
                                </h3>
                                <p className="text-primary-foreground/70 mt-1 text-sm sm:text-base font-medium italic">
                                    Regular Office Hours
                                </p>
                            </div>
                            <div className="mt-4 sm:mt-6 lg:mt-8 flex flex-col sm:flex-row gap-2 sm:gap-4">
                                {!isClockedIn ? (
                                    <Button 
                                        onClick={() => setIsClockedIn(true)} 
                                        className="bg-white text-primary hover:bg-white/90 active:bg-white/80 shadow-lg w-full sm:w-auto"
                                        size="default"
                                    >
                                        <Play className="mr-2 h-4 w-4 fill-current" /> 
                                        Clock In
                                    </Button>
                                ) : (
                                    <Button 
                                        onClick={() => setIsClockedIn(false)} 
                                        variant="destructive" 
                                        className="shadow-lg w-full sm:w-auto"
                                        size="default"
                                    >
                                        <Square className="mr-2 h-4 w-4 fill-current" /> 
                                        Clock Out
                                    </Button>
                                )}
                                <Button 
                                    variant="ghost" 
                                    className="text-white hover:bg-white/10 active:bg-white/20 w-full sm:w-auto"
                                    size="default"
                                >
                                    Read Policy
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Leave Balance Card */}
                <Card className="overflow-hidden">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex sm:flex-col items-center sm:items-center text-left sm:text-center gap-4 sm:gap-0">
                            <div className="p-3 sm:p-4 bg-orange-500/10 rounded-full sm:mb-3 lg:mb-4 shrink-0">
                                <CalendarDays className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-orange-600" />
                            </div>
                            <div className="flex-1 sm:flex-none min-w-0">
                                <p className="text-muted-foreground text-xs sm:text-sm font-medium">
                                    Leave Balance
                                </p>
                                <h3 className="text-2xl sm:text-2xl lg:text-3xl font-bold mt-0.5 sm:mt-1 text-foreground">
                                    12 <span className="text-base sm:text-lg font-normal text-muted-foreground">Days</span>
                                </h3>
                            </div>
                            <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-primary sm:mt-3 lg:mt-4 sm:w-full group shrink-0 sm:shrink"
                            >
                                <span className="hidden sm:inline">Apply Leave</span>
                                <span className="sm:hidden">Apply</span>
                                <ChevronRight className="ml-1 sm:ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Monthly Salary Card */}
                <Card className="overflow-hidden">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex sm:flex-col items-center sm:items-center text-left sm:text-center gap-4 sm:gap-0">
                            <div className="p-3 sm:p-4 bg-green-500/10 rounded-full sm:mb-3 lg:mb-4 shrink-0">
                                <Wallet className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-green-600" />
                            </div>
                            <div className="flex-1 sm:flex-none min-w-0">
                                <p className="text-muted-foreground text-xs sm:text-sm font-medium">
                                    Monthly Salary
                                </p>
                                <h3 className="text-2xl sm:text-2xl lg:text-3xl font-bold mt-0.5 sm:mt-1 text-foreground">
                                    $4,200
                                </h3>
                            </div>
                            <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-primary sm:mt-3 lg:mt-4 sm:w-full group shrink-0 sm:shrink"
                            >
                                <span className="hidden sm:inline">View Payslip</span>
                                <span className="sm:hidden">View</span>
                                <ChevronRight className="ml-1 sm:ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions - Mobile Only */}
            <div className="grid grid-cols-3 gap-2 sm:hidden">
                {[
                    { icon: Clock, label: 'Attendance', color: 'text-primary', bg: 'bg-primary/10' },
                    { icon: CalendarDays, label: 'Leaves', color: 'text-orange-600', bg: 'bg-orange-500/10' },
                    { icon: Wallet, label: 'Salary', color: 'text-green-600', bg: 'bg-green-500/10' },
                ].map((action, i) => (
                    <button 
                        key={i}
                        className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-card border hover:bg-accent active:bg-accent transition-colors"
                    >
                        <div className={`p-2 rounded-lg ${action.bg}`}>
                            <action.icon className={`h-4 w-4 ${action.color}`} />
                        </div>
                        <span className="text-xs font-medium text-foreground">{action.label}</span>
                    </button>
                ))}
            </div>

            {/* Activity and Holidays Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {/* Recent Activity Card */}
                <Card>
                    <CardHeader className="pb-2 sm:pb-4 px-4 sm:px-6 pt-4 sm:pt-6">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                                <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-primary sm:hidden" />
                                Recent Activity
                            </CardTitle>
                            <Button variant="ghost" size="sm" className="text-xs h-8 hidden sm:flex">
                                View All
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="px-3 sm:px-6 pb-4 sm:pb-6">
                        <div className="space-y-2 sm:space-y-3">
                            {[
                                { action: 'Clocked In', time: '09:05 AM', date: 'Today', status: 'ON TIME', statusColor: 'bg-green-500/10 text-green-600' },
                                { action: 'Clocked Out', time: '06:12 PM', date: 'Yesterday', status: 'NORMAL', statusColor: 'bg-blue-500/10 text-blue-600' },
                                { action: 'Leave Approved', time: 'Yesterday', date: '15 Jan', status: 'SICK', statusColor: 'bg-orange-500/10 text-orange-600' },
                            ].map((activity, i) => (
                                <div 
                                    key={i} 
                                    className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg hover:bg-accent active:bg-accent transition-colors"
                                >
                                    <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
                                        <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-foreground truncate">
                                                {activity.action}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {activity.date} • {activity.time}
                                            </p>
                                        </div>
                                    </div>
                                    <Badge 
                                        variant="secondary" 
                                        className={`text-[10px] shrink-0 ${activity.statusColor}`}
                                    >
                                        {activity.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                        {/* Mobile View All Button */}
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="w-full mt-3 text-xs h-9 sm:hidden"
                        >
                            View All Activity
                            <ChevronRight className="ml-1 h-3 w-3" />
                        </Button>
                    </CardContent>
                </Card>

                {/* Upcoming Holidays Card */}
                <Card>
                    <CardHeader className="pb-2 sm:pb-4 px-4 sm:px-6 pt-4 sm:pt-6">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary sm:hidden" />
                                Upcoming Holidays
                            </CardTitle>
                            <Button variant="ghost" size="sm" className="text-xs h-8 hidden sm:flex">
                                View All
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="px-3 sm:px-6 pb-4 sm:pb-6">
                        <div className="space-y-2 sm:space-y-4">
                            {[
                                { name: 'Republic Day', date: '26 Jan 2024', day: 'Friday', daysLeft: 5 },
                                { name: 'Holi', date: '25 Mar 2024', day: 'Monday', daysLeft: 60 },
                            ].map((holiday, i) => (
                                <div 
                                    key={i} 
                                    className="flex items-center justify-between p-3 sm:p-4 border rounded-xl border-dashed hover:border-primary active:border-primary transition-colors"
                                >
                                    <div className="min-w-0">
                                        <h4 className="text-sm font-bold text-foreground truncate">
                                            {holiday.name}
                                        </h4>
                                        <p className="text-xs text-muted-foreground">
                                            {holiday.day}
                                        </p>
                                    </div>
                                    <div className="text-right shrink-0 ml-2">
                                        <p className="text-sm font-bold text-primary">
                                            {holiday.date.split(' ').slice(0, 2).join(' ')}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground">
                                            in {holiday.daysLeft} days
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Mobile View All Button */}
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="w-full mt-3 text-xs h-9 sm:hidden"
                        >
                            View All Holidays
                            <ChevronRight className="ml-1 h-3 w-3" />
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Status Banner - Mobile Only */}
            {isClockedIn && (
                <div className="fixed bottom-4 left-4 right-4 sm:hidden z-40">
                    <Card className="bg-green-500 text-white border-none shadow-lg">
                        <CardContent className="p-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                                <span className="text-sm font-medium">Currently Working</span>
                            </div>
                            <Button 
                                size="sm" 
                                variant="secondary"
                                onClick={() => setIsClockedIn(false)}
                                className="h-8 bg-white/20 hover:bg-white/30 text-white border-none"
                            >
                                <Square className="mr-1.5 h-3 w-3 fill-current" />
                                Clock Out
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default EmployeeDashboard;
