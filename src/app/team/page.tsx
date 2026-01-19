"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MOCK_USERS } from '@/lib/mock-data';
import { Search, UserPlus, Mail, Phone, MoreHorizontal } from 'lucide-react';

export default function TeamPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Team Members</h1>
                    <p className="text-gray-500">Manage and view your organization&apos;s workforce.</p>
                </div>
                <Button className="bg-blue-600">
                    <UserPlus className="mr-2 h-4 w-4" /> Add Employee
                </Button>
            </div>

            <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Search by name, email, department..." className="pl-10" />
                </div>
                <select className="bg-white border rounded-lg px-4 py-2 text-sm">
                    <option>All Departments</option>
                    <option>Engineering</option>
                    <option>Marketing</option>
                    <option>Design</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_USERS.map((member) => (
                    <Card key={member.id} className="group hover:border-blue-200 transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                                <div className="h-16 w-16 rounded-2xl overflow-hidden border">
                                    <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" />
                                </div>
                                <button className="text-gray-400 hover:text-gray-900 transition-colors">
                                    <MoreHorizontal className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="mt-4">
                                <h3 className="text-lg font-bold group-hover:text-blue-600 transition-colors">{member.name}</h3>
                                <p className="text-sm text-gray-500">{member.designation}</p>
                                <div className="mt-2">
                                    <Badge variant="info">{member.department}</Badge>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3 pt-6 border-t">
                                <div className="flex items-center text-sm text-gray-500">
                                    <Mail className="h-4 w-4 mr-3" />
                                    {member.email}
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <Phone className="h-4 w-4 mr-3" />
                                    +1 (555) 000-0000
                                </div>
                            </div>

                            <div className="mt-6 flex space-x-2">
                                <Button variant="outline" size="sm" className="flex-1">View Profile</Button>
                                <Button variant="ghost" size="sm" className="px-3">
                                    <Mail className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
