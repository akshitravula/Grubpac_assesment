"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MOCK_ATTENDANCE } from '@/lib/mock-data';
import { Clock, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AttendancePage() {
    const [selectedMonth, setSelectedMonth] = useState('January 2024');

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Attendance Logs</h1>
                    <p className="text-gray-500">Track your working hours and daily presence.</p>
                </div>
                <select
                    className="bg-white border rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    <option>January 2024</option>
                    <option>December 2023</option>
                    <option>November 2023</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Present Days', value: '18', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Late Entries', value: '2', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
                    { label: 'On Leave', value: '1', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Absences', value: '0', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
                ].map((stat) => (
                    <Card key={stat.label}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                                </div>
                                <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
                                    <stat.icon className="h-5 w-5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Daily Logs</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b text-sm text-gray-500">
                                    <th className="pb-4 font-medium">Date</th>
                                    <th className="pb-4 font-medium">Check In</th>
                                    <th className="pb-4 font-medium">Check Out</th>
                                    <th className="pb-4 font-medium">Total Hours</th>
                                    <th className="pb-4 font-medium">Status</th>
                                    <th className="pb-4 font-medium text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {MOCK_ATTENDANCE.map((log) => (
                                    <tr key={log.id} className="text-sm hover:bg-gray-50 transition-colors">
                                        <td className="py-4 font-medium">{log.date}</td>
                                        <td className="py-4">{log.checkIn || '-'}</td>
                                        <td className="py-4">{log.checkOut || '-'}</td>
                                        <td className="py-4">8.5 hrs</td>
                                        <td className="py-4">
                                            <Badge variant={log.status === 'PRESENT' ? 'success' : log.status === 'LATE' ? 'warning' : 'error'}>
                                                {log.status}
                                            </Badge>
                                        </td>
                                        <td className="py-4 text-right">
                                            <Button variant="ghost" size="sm">Details</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
