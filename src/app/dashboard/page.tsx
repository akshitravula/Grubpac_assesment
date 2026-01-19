"use client";

import { useAuthStore } from '@/store/useAuthStore';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import TeamLeadDashboard from '@/components/dashboard/TeamLeadDashboard';
import EmployeeDashboard from '@/components/dashboard/EmployeeDashboard';

export default function DashboardPage() {
    const { user } = useAuthStore();

    if (!user) return null;

    switch (user.role) {
        case 'OWNER':
            return <AdminDashboard />;
        case 'TEAM_LEAD':
            return <TeamLeadDashboard />;
        case 'EMPLOYEE':
            return <EmployeeDashboard />;
        default:
            return null;
    }
}
