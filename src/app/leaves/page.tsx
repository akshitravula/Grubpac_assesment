"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/useAuthStore';
import { MOCK_LEAVES } from '@/lib/mock-data';
import { CalendarDays, Filter, Plus, CheckCircle2, XCircle } from 'lucide-react';

export default function LeavesPage() {
    const { user } = useAuthStore();
    const [showApplyForm, setShowApplyForm] = useState(false);

    const canApprove = user?.role === 'OWNER' || user?.role === 'TEAM_LEAD';

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Leave Management</h1>
                    <p className="text-gray-500">Apply for leaves and track your requests.</p>
                </div>
                <div className="flex space-x-3">
                    <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <Button size="sm" onClick={() => setShowApplyForm(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Apply Leave
                    </Button>
                </div>
            </div>

            {showApplyForm && (
                <Card className="border-blue-200 bg-blue-50/50">
                    <CardHeader>
                        <CardTitle className="text-lg">Apply for Leave</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Leave Type</label>
                                <select className="w-full h-10 px-3 rounded-md border border-gray-200 bg-white">
                                    <option>Sick Leave</option>
                                    <option>Casual Leave</option>
                                    <option>Restricted Holiday</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Start Date</label>
                                <Input type="date" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">End Date</label>
                                <Input type="date" />
                            </div>
                            <div className="flex space-x-2">
                                <Button className="flex-1">Submit Request</Button>
                                <Button variant="ghost" onClick={() => setShowApplyForm(false)}>Cancel</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {canApprove && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                            <CalendarDays className="mr-2 h-5 w-5 text-blue-600" />
                            Pending Approvals
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b text-sm text-gray-500">
                                        <th className="pb-4 font-medium">Employee</th>
                                        <th className="pb-4 font-medium">Leave Type</th>
                                        <th className="pb-4 font-medium">Duration</th>
                                        <th className="pb-4 font-medium">Reason</th>
                                        <th className="pb-4 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {MOCK_LEAVES.filter(l => l.status === 'PENDING').map((leave) => (
                                        <tr key={leave.id} className="text-sm">
                                            <td className="py-4 font-medium">{leave.userName}</td>
                                            <td className="py-4">{leave.type}</td>
                                            <td className="py-4">{leave.startDate} to {leave.endDate}</td>
                                            <td className="py-4 max-w-[200px] truncate">{leave.reason}</td>
                                            <td className="py-4 text-right space-x-2">
                                                <Button size="sm" variant="outline" className="text-green-600 border-green-100 hover:bg-green-50">
                                                    Approve
                                                </Button>
                                                <Button size="sm" variant="outline" className="text-red-600 border-red-100 hover:bg-red-50">
                                                    Reject
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Leave History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b text-sm text-gray-500">
                                    <th className="pb-4 font-medium">Type</th>
                                    <th className="pb-4 font-medium">Date Range</th>
                                    <th className="pb-4 font-medium">Reason</th>
                                    <th className="pb-4 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {MOCK_LEAVES.map((leave) => (
                                    <tr key={leave.id} className="text-sm">
                                        <td className="py-4 font-bold">{leave.type}</td>
                                        <td className="py-4 text-gray-600">{leave.startDate} - {leave.endDate}</td>
                                        <td className="py-4 text-gray-500">{leave.reason}</td>
                                        <td className="py-4">
                                            <Badge variant={leave.status === 'APPROVED' ? 'success' : leave.status === 'PENDING' ? 'warning' : 'error'}>
                                                {leave.status}
                                            </Badge>
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
