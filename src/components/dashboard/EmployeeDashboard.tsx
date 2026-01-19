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
    ChevronRight
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

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome back, {user?.name}!</h1>
                    <p className="text-muted-foreground">You have no pending tasks for today.</p>
                </div>
                <div className="flex items-center space-x-4 bg-card border px-4 py-2 rounded-xl shadow-sm">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="text-lg font-bold font-mono text-foreground">{time}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="col-span-1 md:col-span-2 bg-gradient-to-br from-primary to-blue-700 text-white border-none shadow-xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Clock className="h-24 w-24" />
                    </div>
                    <CardContent className="p-8">
                        <div className="flex flex-col h-full justify-between">
                            <div>
                                <Badge variant="secondary" className="bg-white/20 text-white border-none mb-4">Current Shift</Badge>
                                <h3 className="text-3xl font-bold">09:00 AM - 06:00 PM</h3>
                                <p className="text-primary-foreground/70 mt-1 font-medium italic">Regular Office Hours</p>
                            </div>
                            <div className="mt-8 flex space-x-4">
                                {!isClockedIn ? (
                                    <Button onClick={() => setIsClockedIn(true)} className="bg-white text-primary hover:bg-white/90 shadow-lg">
                                        <Play className="mr-2 h-4 w-4 fill-current" /> Clock In
                                    </Button>
                                ) : (
                                    <Button onClick={() => setIsClockedIn(false)} variant="destructive" className="shadow-lg">
                                        <Square className="mr-2 h-4 w-4 fill-current" /> Clock Out
                                    </Button>
                                )}
                                <Button variant="ghost" className="text-white hover:bg-white/10">Read Policy</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                            <div className="p-4 bg-orange-500/10 rounded-full mb-4">
                                <CalendarDays className="h-8 w-8 text-orange-600" />
                            </div>
                            <p className="text-muted-foreground text-sm font-medium">Leave Balance</p>
                            <h3 className="text-3xl font-bold mt-1 text-foreground">12 Days</h3>
                            <Button variant="ghost" className="mt-4 text-primary w-full group">
                                Apply Leave <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                            <div className="p-4 bg-green-500/10 rounded-full mb-4">
                                <Wallet className="h-8 w-8 text-green-600" />
                            </div>
                            <p className="text-muted-foreground text-sm font-medium">Monthly Salary</p>
                            <h3 className="text-3xl font-bold mt-1 text-foreground">$4,200</h3>
                            <Button variant="ghost" className="mt-4 text-primary w-full group">
                                View Payslip <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {[
                                { action: 'Clocked In', time: '09:05 AM', date: 'Today', status: 'ON TIME' },
                                { action: 'Clocked Out', time: '06:12 PM', date: 'Yesterday', status: 'NORMAL' },
                                { action: 'Leave Approved', time: 'Yesterday', date: '15 Jan', status: 'SICK LEAVE' },
                            ].map((activity, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <div className="h-2 w-2 rounded-full bg-primary" />
                                        <div>
                                            <p className="text-sm font-bold text-foreground">{activity.action}</p>
                                            <p className="text-xs text-muted-foreground">{activity.date} • {activity.time}</p>
                                        </div>
                                    </div>
                                    <Badge variant="secondary" className="text-[10px]">{activity.status}</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Upcoming Holidays</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { name: 'Republic Day', date: '26 Jan 2024', day: 'Friday' },
                                { name: 'Holi', date: '25 Mar 2024', day: 'Monday' },
                            ].map((holiday, i) => (
                                <div key={i} className="flex items-center justify-between p-4 border rounded-xl border-dashed hover:border-primary transition-colors cursor-default">
                                    <div>
                                        <h4 className="text-sm font-bold text-foreground">{holiday.name}</h4>
                                        <p className="text-xs text-muted-foreground">{holiday.day}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-primary">{holiday.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
