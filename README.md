# GrubPac - Employee Management System

A professional, role-based Employee Management System (EMS) built with Next.js 14+, TypeScript, and Tailwind CSS. This application features a sleek light-themed UI designed for clarity and efficiency.

## 🚀 Key Features

- **Role-Based Access Control**:
  - **Admin/Owner**: Full overview of company stats, payroll, and leave approvals.
  - **Team Lead**: Management of team members, attendance, and team-specific leave requests.
  - **Employee**: Personal dashboard for clock-in/out, leave applications, and salary viewing.
- **Dark Mode Support**: Seamless theme switching for better user comfort.
- **Interactive Notifications**: Real-time notification dropdown for important updates.
- **User Profile Page**: Detailed views of employment and personal information.
- **Attendance System**: Real-time clock-in/out functionality with daily and monthly logs.
- **Leave Management**: Comprehensive workflow for applying, viewing, and approving/rejecting leave requests.
- **Holiday & Calendar**: Custom interactive calendar and holiday list for better planning.
- **Payroll & Salary**: Detailed salary breakdown and payslip generation UI.
- **Modern UI/UX**: Built with a "premium" focus using Framer Motion for animations, Lucide icons, and a custom **System Darker Blue** brand color.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, Lucide Icons
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Visualization**: Recharts
- **Date Formatting**: date-fns

## 📂 Project Structure

```text
src/
├── app/               # Next.js App Router pages
├── components/        # Reusable UI and layout components
│   ├── dashboard/     # Role-specific dashboard views
│   └── ui/            # Base UI components (Button, Card, etc.)
├── lib/               # Utilities, types, and mock data
├── store/             # Zustand state management
└── ...
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd grubpac
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### 🔐 Demo Credentials

Use the following emails to test different roles:
- **Admin**: `admin@ems.com`
- **Team Lead**: `sarah@ems.com`
- **Employee**: `mike@ems.com`

