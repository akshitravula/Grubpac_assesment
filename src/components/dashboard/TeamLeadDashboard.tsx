"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Users,
    CalendarDays,
    CheckCircle2,
    XCircle,
    MoreVertical
} from 'lucide-react';
import { MOCK_LEAVES, MOCK_USERS } from '@/lib/mock-data';

const TeamLeadDashboard = () => {
    const teamMembers = MOCK_USERS.filter(u => u.role === 'EMPLOYEE' && u.department === 'Engineering');
    const pendingLeaves = MOCK_LEAVES.filter(l => l.status === 'PENDING');

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Team Overview</h1>
                <p className="text-muted-foreground">Manage your team and review requests.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-primary text-white border-none shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-primary-foreground/70 text-sm font-medium">Team Size</p>
                                <h3 className="text-3xl font-bold mt-1">{teamMembers.length}</h3>
                            </div>
                            <Users className="h-8 w-8 text-primary-foreground/50" />
                        </div>
                        <p className="mt-4 text-xs text-primary-foreground/80">Engineering Department</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-muted-foreground text-sm font-medium">Team Attendance</p>
                                <h3 className="text-3xl font-bold mt-1 text-foreground">94%</h3>
                            </div>
                            <div className="bg-green-500/10 p-2 rounded-lg">
                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                        <p className="mt-4 text-xs text-green-600 font-medium">+2% higher than average</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-muted-foreground text-sm font-medium">Leave Requests</p>
                                <h3 className="text-3xl font-bold mt-1 text-foreground">{pendingLeaves.length}</h3>
                            </div>
                            <div className="bg-orange-500/10 p-2 rounded-lg">
                                <CalendarDays className="h-6 w-6 text-orange-600" />
                            </div>
                        </div>
                        <p className="mt-4 text-xs text-orange-600 font-medium">Action required</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-semibold">Pending Leave Approvals</CardTitle>
                        <Button variant="ghost" size="sm">View All</Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {pendingLeaves.map((request) => (
                            <div key={request.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-accent transition-colors">
                                <div className="flex items-center space-x-4">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        {request.userName.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-foreground">{request.userName}</h4>
                                        <p className="text-xs text-muted-foreground">{request.type} Leave • {request.startDate}</p>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive/10 border-destructive/20">
                                        <XCircle className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="outline" className="text-green-600 hover:bg-green-600/10 border-green-600/20">
                                        <CheckCircle2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-semibold">Team Members</CardTitle>
                        <MoreVertical className="h-5 w-5 text-muted-foreground cursor-pointer" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {teamMembers.map((member) => (
                                <div key={member.id} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <img src={member.avatar} alt="" className="h-10 w-10 rounded-full border border-border" />
                                        <div>
                                            <h4 className="text-sm font-bold text-foreground">{member.name}</h4>
                                            <p className="text-xs text-muted-foreground">{member.designation}</p>
                                        </div>
                                    </div>
                                    <Badge variant="success">Online</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default TeamLeadDashboard;
