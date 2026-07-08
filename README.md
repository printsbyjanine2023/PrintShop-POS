# PrintShop POS - Enterprise Print Shop Management System

A modern, enterprise-grade Point of Sale and Business Management System designed specifically for digital printing, photocopy, tarpaulin, ID printing, photo printing, sticker printing, large format printing, and graphic design businesses.

## 🎯 Project Overview

PrintShop POS is a comprehensive solution that combines:
- **Fast POS System** with barcode scanning and thermal printer support
- **Work Order Management** for tracking print jobs from quote to delivery
- **Production Management** with live job status tracking
- **Inventory System** with automatic material consumption tracking
- **Accounting & Payroll** with commission tracking
- **Customer Management** with loyalty points and credit accounts
- **Cloud Sync & Offline Mode** for continuous operations

## 🏗️ Technology Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Framer Motion** for animations
- **React Hook Form** with Zod validation

### Backend
- **ASP.NET Core 8** Web API
- **Entity Framework Core** for data access
- **SQL Server** database
- **JWT Authentication** with refresh tokens
- **Swagger/OpenAPI** documentation

### Desktop Features
- Barcode scanner integration
- Thermal receipt printer
- Cash drawer support
- Offline-first capability
- Auto-sync when online

## 📦 Project Structure

```
PrintShop-POS/
├── backend/                 # ASP.NET Core API
│   ├── PrintShop.API/
│   ├── PrintShop.Core/
│   ├── PrintShop.Infrastructure/
│   └── PrintShop.Tests/
├── frontend/                # React + TypeScript
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   └── public/
├── database/                # SQL Server scripts
└── docs/                    # Documentation
```

## 👥 User Roles & Permissions

1. **Administrator** - Full system access
2. **Manager** - Operations oversight
3. **Cashier** - POS transactions
4. **Production Staff** - Job processing
5. **Designer** - Design approval/modifications
6. **Encoder** - Data entry
7. **Owner** - Business analytics

## 📊 Key Features

### Dashboard
- Real-time sales analytics
- Inventory status
- Pending orders
- Employee performance
- Charts and reports

### POS Module
- Fast product/service search
- Barcode scanning
- Multiple payment methods (Cash, GCash, Maya, Bank Transfer, Credit Card)
- Senior/PWD discounts
- Split & partial payments
- Receipt management (print, email, reprint)

### Work Order Management
- Job quotations
- Status tracking (Design → Production → Quality Check → Delivery)
- File uploads (PDF, PSD, AI, CDR, PNG, JPG)
- Production notes & attachments
- Timeline tracking

### Printing Services
- Document printing
- Photocopy
- Photo printing
- Tarpaulin & Sintra board
- Sticker printing
- ID printing
- Mug & T-shirt printing
- Lamination & binding
- Graphic design services
- Custom pricing & rush fees

### Inventory Management
- Products & materials tracking
- Automatic stock deduction
- Low stock alerts
- Supplier management
- Cost valuation

### Accounting & Payroll
- Sales reconciliation
- Income/expense tracking
- Receivables & payables
- Automatic payroll
- Commission tracking
- Payslip generation

### Customer Management
- Profile management
- Loyalty points system
- Purchase history
- Outstanding balances
- Favorite services tracking

### Notifications & Alerts
- Low stock warnings
- Pending order reminders
- Payment due alerts
- Pickup reminders
- Daily closing notifications

### Backup & Security
- Automatic backup
- Cloud sync capability
- JWT authentication
- Role-based access control
- Audit logs
- Activity logging

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- .NET 8 SDK
- SQL Server 2019+
- Git

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend/PrintShop.API
dotnet restore
dotnet ef database update
dotnet run
```

## 📝 Database Schema

The system uses a normalized SQL Server database with these main entities:
- Users, Roles, Permissions
- Customers, Employees, Suppliers
- Products, Services, Categories
- Inventory, Transactions
- WorkOrders, Quotations
- Sales, Payments
- Expenses, Receivables
- Payroll, Commissions
- PurchaseOrders
- Notifications, AuditLogs

## 🔐 Security Features

- JWT Authentication with refresh tokens
- Role-based authorization
- Two-factor authentication (optional)
- Automatic session logout
- Database encryption
- Comprehensive audit trails
- Activity logging

## 📱 Responsive Design

- Mobile-friendly dashboard
- Touch-optimized POS interface
- Tablet support for production board
- Desktop analytics dashboard
- Dark/Light mode support

## 🧪 Testing

Unit tests for all services and repositories following Clean Architecture principles.

## 📖 API Documentation

Swagger UI available at `/swagger` when running the API.

## 🤝 Contributing

Instructions for team members to contribute to the project.

## 📄 License

Proprietary - PrintShop POS

## 📞 Support

For support and inquiries, contact the development team.

---

**Status**: In Development 🚀

**Last Updated**: 2026-07-08
