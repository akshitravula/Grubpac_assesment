"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MOCK_SALARIES } from '@/lib/mock-data';
import { Download, FileText, Landmark, Wallet, Percent } from 'lucide-react';

export default function SalaryPage() {
    const salary = MOCK_SALARIES[0];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Salary & Payslips</h1>
                    <p className="text-gray-500">View your earnings and download monthly slips.</p>
                </div>
                <Button className="bg-blue-600">
                    <Download className="mr-2 h-4 w-4" /> Download Latest Slip
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-blue-50 border-blue-100">
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="bg-white p-3 rounded-xl shadow-sm">
                                <Wallet className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-blue-600">Net Salary</p>
                                <h3 className="text-2xl font-bold text-blue-900">${salary.netSalary.toLocaleString()}</h3>
                            </div>
                        </div>
                        <p className="mt-4 text-xs text-blue-700">For Dec 2023 • Paid on 31 Dec</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="bg-green-50 p-3 rounded-xl">
                                <Percent className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Attendance Payout</p>
                                <h3 className="text-2xl font-bold">100%</h3>
                            </div>
                        </div>
                        <p className="mt-4 text-xs text-green-600 font-medium">21/22 Days Working</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="bg-orange-50 p-3 rounded-xl">
                                <Landmark className="h-6 w-6 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Tax Deductions</p>
                                <h3 className="text-2xl font-bold">${salary.deductions}</h3>
                            </div>
                        </div>
                        <p className="mt-4 text-xs text-gray-500">Income Tax & PF</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Salary Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Basic Salary</span>
                                <span className="font-bold">${salary.baseSalary}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">HRA & Allowances</span>
                                <span className="font-bold text-green-600">+${salary.allowances}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Deductions (PT & Tax)</span>
                                <span className="font-bold text-red-600">-${salary.deductions}</span>
                            </div>
                        </div>
                        <div className="pt-6 border-t flex justify-between items-center">
                            <span className="font-bold">Total Net Payable</span>
                            <span className="text-xl font-extrabold text-blue-600">${salary.netSalary}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-dashed border-2 bg-gray-50/50">
                    <CardContent className="p-12 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-sm">
                            <FileText className="h-8 w-8 text-gray-400" />
                        </div>
                        <div>
                            <h4 className="font-bold">Generate Past Payslips</h4>
                            <p className="text-sm text-gray-500 max-w-[240px] mt-2">
                                Select a month from the past year to generate and download your payslip.
                            </p>
                        </div>
                        <select className="bg-white border rounded-lg px-4 py-2 text-sm w-full max-w-[200px]">
                            <option>November 2023</option>
                            <option>October 2023</option>
                            <option>September 2023</option>
                        </select>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
