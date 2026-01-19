"use client";

import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, ShieldCheck, Users, UserCircle } from 'lucide-react';
import { Role } from '@/lib/types';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<Role>('EMPLOYEE');
    const [isLoading, setIsLoading] = useState(false);
    const login = useAuthStore((state) => state.login);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await login(email, role);
        setIsLoading(false);
    };

    const roleOptions = [
        { value: 'OWNER', label: 'Admin / Owner', icon: ShieldCheck, description: 'Full system access' },
        { value: 'TEAM_LEAD', label: 'Team Lead', icon: Users, description: 'Manage your team' },
        { value: 'EMPLOYEE', label: 'Employee', icon: UserCircle, description: 'View personal records' },
    ];

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden border">
                {/* Left Side: Illustration or Info */}
                <div className="hidden md:flex flex-col justify-center p-12 bg-blue-600 text-white">
                    <h1 className="text-4xl font-bold mb-6">GrubPac EMS</h1>
                    <p className="text-blue-100 text-lg mb-8">
                        Manage your workforce efficiently with our modern, role-based Employee Management System.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <span>Role-based access control</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                                <LogIn className="h-5 w-5" />
                            </div>
                            <span>Real-time attendance tracking</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="p-8 md:p-12">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                        <p className="text-gray-500">Please enter your credentials to continue</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Email Address</label>
                            <Input
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <p className="text-[10px] text-gray-400">Try admin@ems.com, sarah@ems.com, or mike@ems.com</p>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-700">Select Your Role</label>
                            <div className="grid grid-cols-1 gap-3">
                                {roleOptions.map((option) => (
                                    <label
                                        key={option.value}
                                        className={`
                      relative flex cursor-pointer items-center rounded-lg border p-4 shadow-sm transition-all
                      ${role === option.value ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}
                    `}
                                    >
                                        <input
                                            type="radio"
                                            name="role"
                                            value={option.value}
                                            className="sr-only"
                                            onChange={() => setRole(option.value as Role)}
                                        />
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white border">
                                            <option.icon className={`h-5 w-5 ${role === option.value ? 'text-blue-600' : 'text-gray-400'}`} />
                                        </div>
                                        <div className="ml-4">
                                            <p className={`text-sm font-bold ${role === option.value ? 'text-blue-900' : 'text-gray-900'}`}>
                                                {option.label}
                                            </p>
                                            <p className="text-xs text-gray-500">{option.description}</p>
                                        </div>
                                        {role === option.value && (
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-blue-600" />
                                        )}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading || !email}>
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
