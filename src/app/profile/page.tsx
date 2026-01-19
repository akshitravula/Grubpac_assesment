"use client";

import { useAuthStore } from '@/store/useAuthStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Mail,
    MapPin,
    Phone,
    Calendar,
    Briefcase,
    Building2,
    Edit,
    Camera
} from 'lucide-react';

export default function ProfilePage() {
    const { user } = useAuthStore();

    if (!user) return null;

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="relative h-48 rounded-2xl bg-gradient-to-r from-primary to-blue-800 overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
            </div>

            <div className="relative -mt-24 px-8 pb-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <div className="relative">
                            <div className="h-32 w-32 rounded-3xl border-4 border-white dark:border-slate-900 bg-white dark:bg-slate-800 shadow-xl overflow-hidden">
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center bg-blue-50 text-primary text-4xl font-bold uppercase">
                                        {user.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-md border dark:border-slate-700 text-gray-600 dark:text-slate-400 hover:text-primary transition-colors">
                                <Camera className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="text-center md:text-left mt-2">
                            <h1 className="text-3xl font-bold dark:text-white">{user.name}</h1>
                            <p className="text-gray-500 dark:text-slate-400 font-medium">{user.designation}</p>
                            <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-2">
                                <Badge variant="info">{user.department}</Badge>
                                <Badge variant="secondary" className="dark:bg-slate-800 dark:text-slate-200">{user.role.replace('_', ' ')}</Badge>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" className="dark:border-slate-800 dark:text-slate-300">
                            Settings
                        </Button>
                        <Button className="bg-primary">
                            <Edit className="mr-2 h-4 w-4" /> Edit Profile
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-6">
                    <Card className="dark:bg-slate-900 dark:border-slate-800">
                        <CardHeader>
                            <CardTitle className="text-lg">Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3 text-sm">
                                <div className="p-2 bg-gray-100 dark:bg-slate-800 rounded-lg text-gray-500">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-gray-400 text-xs">Email</p>
                                    <p className="font-medium truncate dark:text-slate-200">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <div className="p-2 bg-gray-100 dark:bg-slate-800 rounded-lg text-gray-500">
                                    <Phone className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs">Phone</p>
                                    <p className="font-medium dark:text-slate-200">+1 (555) 000-0000</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <div className="p-2 bg-gray-100 dark:bg-slate-800 rounded-lg text-gray-500">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs">Location</p>
                                    <p className="font-medium dark:text-slate-200">New York, USA</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="dark:bg-slate-900 dark:border-slate-800">
                        <CardHeader>
                            <CardTitle className="text-lg">Employment</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3 text-sm">
                                <Building2 className="h-4 w-4 text-gray-400" />
                                <div>
                                    <p className="text-gray-400 text-xs">Department</p>
                                    <p className="font-medium dark:text-slate-200">{user.department}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Briefcase className="h-4 w-4 text-gray-400" />
                                <div>
                                    <p className="text-gray-400 text-xs">Designation</p>
                                    <p className="font-medium dark:text-slate-200">{user.designation}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <div>
                                    <p className="text-gray-400 text-xs">Started</p>
                                    <p className="font-medium dark:text-slate-200">{user.joinDate}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-2 space-y-6">
                    <Card className="dark:bg-slate-900 dark:border-slate-800">
                        <CardHeader>
                            <CardTitle className="text-lg">About Me</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm">
                                Dynamic and creative {user.designation} with over 5 years of experience in {user.department}.
                                Passionate about building scalable web applications and improving team efficiency.
                                Always looking for new challenges and learning opportunities.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="dark:bg-slate-900 dark:border-slate-800">
                        <CardHeader>
                            <CardTitle className="text-lg">Key Skills</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            {['React', 'Next.js', 'Typescript', 'Tailwind', 'Node.js', 'Project Management'].map(skill => (
                                <span key={skill} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-primary dark:text-blue-300 rounded-full text-xs font-bold border dark:border-blue-900/30">
                                    {skill}
                                </span>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
