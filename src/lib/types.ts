export type Role = 'OWNER' | 'TEAM_LEAD' | 'EMPLOYEE';

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    avatar?: string;
    department: string;
    designation: string;
    joinDate: string;
}

export interface Attendance {
    id: string;
    userId: string;
    date: string; // ISO string
    checkIn?: string; // Time string
    checkOut?: string; // Time string
    status: 'PRESENT' | 'ABSENT' | 'LATE' | 'ON_LEAVE' | 'HOLIDAY';
}

export interface LeaveRequest {
    id: string;
    userId: string;
    userName: string;
    type: 'SICK' | 'CASUAL' | 'RESTRICTED' | 'VACATION';
    startDate: string;
    endDate: string;
    reason: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface Holiday {
    id: string;
    name: string;
    date: string;
    type: 'PUBLIC' | 'RESTRICTED';
}

export interface SalaryRecord {
    id: string;
    userId: string;
    month: string; // "January 2024"
    baseSalary: number;
    allowances: number;
    deductions: number;
    netSalary: number;
    attendanceDays: number;
    totalDays: number;
}
