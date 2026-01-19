"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MOCK_HOLIDAYS } from '@/lib/mock-data';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { useState } from 'react';

export default function HolidayPage() {
    const [currentMonth, setCurrentMonth] = useState(new Date(2024, 0, 1));

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const renderCalendar = () => {
        const days = [];
        const totalDays = daysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
        const startDay = firstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());

        // Empty cells for days of previous month
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 border-b border-r bg-gray-50/50" />);
        }

        // Days of current month
        for (let day = 1; day <= totalDays; day++) {
            const dateStr = `2024-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const holiday = MOCK_HOLIDAYS.find(h => h.date === dateStr);

            days.push(
                <div key={day} className="h-24 border-b border-r p-2 hover:bg-gray-50 transition-colors relative group">
                    <span className="text-sm font-medium text-gray-500">{day}</span>
                    {holiday && (
                        <div className={`mt-1 p-1 rounded text-[10px] font-bold ${holiday.type === 'PUBLIC' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                            {holiday.name}
                        </div>
                    )}
                </div>
            );
        }

        return days;
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Holiday Calendar</h1>
                    <p className="text-gray-500">View public and restricted holidays for the year.</p>
                </div>
                <div className="flex items-center space-x-2 bg-white border rounded-lg p-1">
                    <button className="p-2 hover:bg-gray-100 rounded-md"><ChevronLeft className="h-4 w-4" /></button>
                    <span className="px-4 text-sm font-bold">Jan 2024</span>
                    <button className="p-2 hover:bg-gray-100 rounded-md"><ChevronRight className="h-4 w-4" /></button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 overflow-hidden">
                    <div className="grid grid-cols-7 bg-gray-50 border-b text-center text-xs font-bold text-gray-400 py-3">
                        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => <div key={d}>{d}</div>)}
                    </div>
                    <div className="grid grid-cols-7 border-l">
                        {renderCalendar()}
                    </div>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Holiday List 2024</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {MOCK_HOLIDAYS.map((holiday) => (
                                <div key={holiday.id} className="flex items-center justify-between group">
                                    <div className="flex items-center space-x-4">
                                        <div className={`h-10 w-10 rounded-xl flex flex-col items-center justify-center font-bold text-[10px] ${holiday.type === 'PUBLIC' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                                            <span>{new Date(holiday.date).toLocaleString('en-US', { month: 'short' }).toUpperCase()}</span>
                                            <span className="text-sm">{new Date(holiday.date).getDate()}</span>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold">{holiday.name}</h4>
                                            <p className="text-xs text-gray-500 capitalize">{holiday.type.toLowerCase()} Holiday</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-blue-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <Info className="h-5 w-5 text-blue-200" />
                                <h4 className="font-bold">Restricted Holidays</h4>
                            </div>
                            <p className="text-xs text-blue-100 leading-relaxed">
                                Employees are entitled to 2 Restricted Holidays (RH) per calendar year.
                                Please apply at least 7 days in advance for approval.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
