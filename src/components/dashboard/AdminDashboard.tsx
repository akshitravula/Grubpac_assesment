"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Users,
    CalendarCheck,
    Clock,
    Wallet,
    ArrowUpRight,
    TrendingUp,
    TrendingDown
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

const data = [
    { name: 'Mon', attendance: 85 },
    { name: 'Tue', attendance: 88 },
    { name: 'Wed', attendance: 92 },
    { name: 'Thu', attendance: 90 },
    { name: 'Fri', attendance: 87 },
];

const salaryData = [
    { month: 'Oct', total: 45000 },
    { month: 'Nov', total: 47000 },
    { month: 'Dec', total: 46500 },
    { month: 'Jan', total: 48000 },
];

const AdminDashboard = () => {
    const stats = [
        { 
            label: 'Total Employees', 
            value: '124', 
            icon: Users, 
            color: 'text-primary', 
            bg: 'bg-primary/10',
            trend: '+12%',
            trendUp: true
        },
        { 
            label: 'Today Attendance', 
            value: '112/124', 
            icon: CalendarCheck, 
            color: 'text-green-600', 
            bg: 'bg-green-500/10',
            trend: '+5%',
            trendUp: true
        },
        { 
            label: 'Pending Leaves', 
            value: '5', 
            icon: Clock, 
            color: 'text-orange-600', 
            bg: 'bg-orange-500/10',
            trend: '-2',
            trendUp: false
        },
        { 
            label: 'Monthly Payroll', 
            value: '$48K', 
            fullValue: '$48,000',
            icon: Wallet, 
            color: 'text-purple-600', 
            bg: 'bg-purple-500/10',
            trend: '+8%',
            trendUp: true
        },
    ];

    // Custom tooltip for mobile
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-card border border-border rounded-lg shadow-lg p-2 sm:p-3">
                    <p className="text-xs sm:text-sm font-medium text-foreground">{label}</p>
                    <p className="text-xs sm:text-sm text-primary font-bold">
                        {payload[0].name === 'total' ? `$${payload[0].value.toLocaleString()}` : `${payload[0].value}%`}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-4 sm:space-y-6 lg:space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                        Admin Overview
                    </h1>
                    <p className="text-sm sm:text-base text-muted-foreground">
                        Welcome back! Here&apos;s what&apos;s happening today.
                    </p>
                </div>
                <Button 
                    className="w-full sm:w-auto"
                    size="default"
                >
                    <span className="sm:inline">Generate Report</span>
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {stats.map((stat) => (
                    <Card key={stat.label} className="overflow-hidden">
                        <CardContent className="p-3 sm:p-4 lg:p-6">
                            <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
                                        {stat.label}
                                    </p>
                                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mt-0.5 sm:mt-1 text-foreground">
                                        <span className="sm:hidden">{stat.value}</span>
                                        <span className="hidden sm:inline">{stat.fullValue || stat.value}</span>
                                    </h3>
                                </div>
                                <div className={`${stat.bg} ${stat.color} p-2 sm:p-2.5 lg:p-3 rounded-lg lg:rounded-xl shrink-0`}>
                                    <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                                </div>
                            </div>
                            <div className={`mt-2 sm:mt-3 lg:mt-4 flex items-center text-xs ${stat.trendUp ? 'text-green-600' : 'text-red-500'}`}>
                                {stat.trendUp ? (
                                    <TrendingUp className="h-3 w-3 mr-1 shrink-0" />
                                ) : (
                                    <TrendingDown className="h-3 w-3 mr-1 shrink-0" />
                                )}
                                <span className="truncate">{stat.trend} from last month</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {/* Weekly Attendance Chart */}
                <Card>
                    <CardHeader className="pb-2 sm:pb-4 px-3 sm:px-6 pt-3 sm:pt-6">
                        <CardTitle className="text-base sm:text-lg font-semibold">
                            Weekly Attendance
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="px-2 sm:px-6 pb-3 sm:pb-6">
                        <div className="h-[200px] sm:h-[250px] lg:h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart 
                                    data={data} 
                                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                                >
                                    <CartesianGrid 
                                        strokeDasharray="3 3" 
                                        vertical={false} 
                                        stroke="hsl(var(--muted))" 
                                        opacity={0.2} 
                                    />
                                    <XAxis 
                                        dataKey="name" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                                        tickMargin={8}
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                                        tickMargin={8}
                                        width={35}
                                        domain={[70, 100]}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar 
                                        dataKey="attendance" 
                                        fill="hsl(var(--primary))" 
                                        radius={[4, 4, 0, 0]} 
                                        maxBarSize={50}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        {/* Mobile-friendly legend */}
                        <div className="flex items-center justify-center gap-4 mt-3 sm:hidden">
                            <div className="flex items-center gap-1.5">
                                <div className="h-2.5 w-2.5 rounded-sm bg-primary" />
                                <span className="text-xs text-muted-foreground">Attendance %</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Payroll History Chart */}
                <Card>
                    <CardHeader className="pb-2 sm:pb-4 px-3 sm:px-6 pt-3 sm:pt-6">
                        <CardTitle className="text-base sm:text-lg font-semibold">
                            Payroll History
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="px-2 sm:px-6 pb-3 sm:pb-6">
                        <div className="h-[200px] sm:h-[250px] lg:h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart 
                                    data={salaryData}
                                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                                >
                                    <defs>
                                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid 
                                        strokeDasharray="3 3" 
                                        vertical={false} 
                                        stroke="hsl(var(--muted))" 
                                        opacity={0.2} 
                                    />
                                    <XAxis 
                                        dataKey="month" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                                        tickMargin={8}
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                                        tickMargin={8}
                                        width={40}
                                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area 
                                        type="monotone" 
                                        dataKey="total" 
                                        stroke="hsl(var(--primary))" 
                                        fillOpacity={1} 
                                        fill="url(#colorTotal)" 
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        {/* Mobile-friendly legend */}
                        <div className="flex items-center justify-center gap-4 mt-3 sm:hidden">
                            <div className="flex items-center gap-1.5">
                                <div className="h-2.5 w-2.5 rounded-sm bg-primary" />
                                <span className="text-xs text-muted-foreground">Total Payroll</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Stats for Mobile */}
            <div className="grid grid-cols-2 gap-3 sm:hidden">
                <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                    <CardContent className="p-3">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary/20 p-1.5 rounded-lg">
                                <TrendingUp className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <div>
                                <p className="text-[10px] text-muted-foreground">Avg. Attendance</p>
                                <p className="text-sm font-bold text-foreground">88.4%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20">
                    <CardContent className="p-3">
                        <div className="flex items-center gap-2">
                            <div className="bg-green-500/20 p-1.5 rounded-lg">
                                <CalendarCheck className="h-3.5 w-3.5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-[10px] text-muted-foreground">On Time Today</p>
                                <p className="text-sm font-bold text-foreground">98%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
