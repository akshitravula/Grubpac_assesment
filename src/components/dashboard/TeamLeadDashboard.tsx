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
        <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">Team Overview</h1>
                <p className="text-sm sm:text-base text-muted-foreground">Manage your team and review requests.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                <Card className="bg-primary text-white border-none shadow-lg sm:col-span-2 md:col-span-1">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-primary-foreground/70 text-xs sm:text-sm font-medium">Team Size</p>
                                <h3 className="text-2xl sm:text-3xl font-bold mt-1">{teamMembers.length}</h3>
                            </div>
                            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary-foreground/50" />
                        </div>
                        <p className="mt-3 sm:mt-4 text-xs text-primary-foreground/80">Engineering Department</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-muted-foreground text-xs sm:text-sm font-medium">Team Attendance</p>
                                <h3 className="text-2xl sm:text-3xl font-bold mt-1 text-foreground">94%</h3>
                            </div>
                            <div className="bg-green-500/10 p-1.5 sm:p-2 rounded-lg">
                                <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                            </div>
                        </div>
                        <p className="mt-3 sm:mt-4 text-xs text-green-600 font-medium">+2% higher than average</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-muted-foreground text-xs sm:text-sm font-medium">Leave Requests</p>
                                <h3 className="text-2xl sm:text-3xl font-bold mt-1 text-foreground">{pendingLeaves.length}</h3>
                            </div>
                            <div className="bg-orange-500/10 p-1.5 sm:p-2 rounded-lg">
                                <CalendarDays className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
                            </div>
                        </div>
                        <p className="mt-3 sm:mt-4 text-xs text-orange-600 font-medium">Action required</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {/* Pending Leave Approvals */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 px-4 sm:px-6 pt-4 sm:pt-6">
                        <CardTitle className="text-base sm:text-lg font-semibold">Pending Leave Approvals</CardTitle>
                        <Button variant="ghost" size="sm" className="text-xs sm:text-sm h-8">
                            View All
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
                        {pendingLeaves.map((request) => (
                            <div 
                                key={request.id} 
                                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-xl hover:bg-accent active:bg-accent transition-colors gap-3 sm:gap-4"
                            >
                                <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
                                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm sm:text-base shrink-0">
                                        {request.userName.charAt(0)}
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="text-sm font-bold text-foreground truncate">{request.userName}</h4>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {request.type} Leave • {request.startDate}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex space-x-2 self-end sm:self-center shrink-0">
                                    <Button 
                                        size="sm" 
                                        variant="outline" 
                                        className="text-destructive hover:bg-destructive/10 active:bg-destructive/20 border-destructive/20 h-9 w-9 sm:h-8 sm:w-8 p-0"
                                    >
                                        <XCircle className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                        size="sm" 
                                        variant="outline" 
                                        className="text-green-600 hover:bg-green-600/10 active:bg-green-600/20 border-green-600/20 h-9 w-9 sm:h-8 sm:w-8 p-0"
                                    >
                                        <CheckCircle2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}

                        {pendingLeaves.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                                <CalendarDays className="h-10 w-10 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">No pending requests</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Team Members */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 px-4 sm:px-6 pt-4 sm:pt-6">
                        <CardTitle className="text-base sm:text-lg font-semibold">Team Members</CardTitle>
                        <button className="p-1.5 hover:bg-accent active:bg-accent rounded-lg transition-colors">
                            <MoreVertical className="h-5 w-5 text-muted-foreground" />
                        </button>
                    </CardHeader>
                    <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                        <div className="space-y-4 sm:space-y-6">
                            {teamMembers.map((member) => (
                                <div 
                                    key={member.id} 
                                    className="flex items-center justify-between gap-3"
                                >
                                    <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
                                        <img 
                                            src={member.avatar} 
                                            alt="" 
                                            className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-border shrink-0" 
                                        />
                                        <div className="min-w-0">
                                            <h4 className="text-sm font-bold text-foreground truncate">{member.name}</h4>
                                            <p className="text-xs text-muted-foreground truncate">{member.designation}</p>
                                        </div>
                                    </div>
                                    <Badge variant="success" className="shrink-0 text-xs">
                                        Online
                                    </Badge>
                                </div>
                            ))}

                            {teamMembers.length === 0 && (
                                <div className="text-center py-8 text-muted-foreground">
                                    <Users className="h-10 w-10 mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">No team members</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default TeamLeadDashboard;
