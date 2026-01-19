import { User, Attendance, LeaveRequest, Holiday, SalaryRecord } from './types';

export const MOCK_USERS: User[] = [
    {
        id: '1',
        name: 'John Doe',
        email: 'admin@ems.com',
        role: 'OWNER',
        avatar: 'https://i.pravatar.cc/150?u=1',
        department: 'Management',
        designation: 'CEO & Founder',
        joinDate: '2020-01-01',
    },
    {
        id: '2',
        name: 'Sarah Smith',
        email: 'sarah@ems.com',
        role: 'TEAM_LEAD',
        avatar: 'https://i.pravatar.cc/150?u=2',
        department: 'Engineering',
        designation: 'Senior Engineering Manager',
        joinDate: '2021-03-15',
    },
    {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike@ems.com',
        role: 'EMPLOYEE',
        avatar: 'https://i.pravatar.cc/150?u=3',
        department: 'Engineering',
        designation: 'Frontend Developer',
        joinDate: '2022-06-01',
    },
    {
        id: '4',
        name: 'Emily Blue',
        email: 'emily@ems.com',
        role: 'EMPLOYEE',
        avatar: 'https://i.pravatar.cc/150?u=4',
        department: 'Marketing',
        designation: 'Content Strategist',
        joinDate: '2023-01-10',
    },
];

export const MOCK_ATTENDANCE: Attendance[] = [
    { id: '101', userId: '3', date: '2024-01-15', checkIn: '09:05 AM', checkOut: '06:15 PM', status: 'PRESENT' },
    { id: '102', userId: '3', date: '2024-01-16', checkIn: '09:15 AM', checkOut: '06:30 PM', status: 'PRESENT' },
    { id: '103', userId: '3', date: '2024-01-17', checkIn: '09:45 AM', checkOut: '06:00 PM', status: 'LATE' },
    { id: '104', userId: '2', date: '2024-01-15', checkIn: '08:55 AM', checkOut: '05:45 PM', status: 'PRESENT' },
];

export const MOCK_LEAVES: LeaveRequest[] = [
    {
        id: 'L1',
        userId: '3',
        userName: 'Mike Johnson',
        type: 'SICK',
        startDate: '2024-01-20',
        endDate: '2024-01-21',
        reason: 'Flu and fever',
        status: 'PENDING',
    },
    {
        id: 'L2',
        userId: '4',
        userName: 'Emily Blue',
        type: 'VACATION',
        startDate: '2024-02-01',
        endDate: '2024-02-05',
        reason: 'Family trip',
        status: 'APPROVED',
    },
];

export const MOCK_HOLIDAYS: Holiday[] = [
    { id: 'H1', name: 'New Year Day', date: '2024-01-01', type: 'PUBLIC' },
    { id: 'H2', name: 'Republic Day', date: '2024-01-26', type: 'PUBLIC' },
    { id: 'H3', name: 'Easter Monday', date: '2024-04-01', type: 'RESTRICTED' },
];

export const MOCK_SALARIES: SalaryRecord[] = [
    {
        id: 'S1',
        userId: '3',
        month: 'December 2023',
        baseSalary: 5000,
        allowances: 800,
        deductions: 200,
        netSalary: 5600,
        attendanceDays: 21,
        totalDays: 22,
    },
];
