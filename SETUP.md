# Setup Instructions

## Backend Setup

### Prerequisites
- .NET 8 SDK
- SQL Server 2019 or later
- Visual Studio 2022 or VS Code

### Database Setup
1. Update connection string in `appsettings.json`
2. Run migrations:
```bash
cd backend/PrintShop.Infrastructure
dotnet ef database update
```

### API Setup
1. Navigate to backend directory:
```bash
cd backend/PrintShop.API
```

2. Restore packages:
```bash
dotnet restore
```

3. Run the API:
```bash
dotnet run
```

The API will be available at `http://localhost:5000`
Swagger documentation at `http://localhost:5000/swagger`

## Frontend Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Configuration

### Backend Configuration
Edit `backend/PrintShop.API/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=PrintShop;Trusted_Connection=true;"
  },
  "JwtSettings": {
    "SecretKey": "your-secret-key-here",
    "ExpiryMinutes": 60
  }
}
```

### Frontend Configuration
Create `.env` file in frontend directory:

```
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=PrintShop POS
```

## Default Credentials
Username: `admin`
Password: `admin123`

## Project Structure

```
PrintShop-POS/
├── backend/
│   ├── PrintShop.API/          # ASP.NET Core API
│   ├── PrintShop.Core/         # Business logic & entities
│   ├── PrintShop.Infrastructure/# Data access layer
│   └── PrintShop.Tests/        # Unit tests
├── frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API services
│   │   ├── stores/             # Zustand stores
│   │   ├── types/              # TypeScript types
│   │   └── styles/             # Global styles
│   └── package.json
├── database/
│   └── migrations/             # Database migration scripts
├── docs/
│   ├── FEATURE_REQUIREMENTS.md
│   └── DEPLOYMENT.md
└── README.md
```

## Features Implemented

✅ User Authentication (JWT)
✅ Role-Based Access Control (RBAC)
✅ Customer Management
✅ Product Management
✅ Work Order Management
✅ Dashboard with Analytics
✅ POS Interface
✅ RESTful API
✅ Responsive Design
✅ Dark/Light Mode Support

## Next Steps

1. **Database Migrations**: Create and apply EF Core migrations
2. **Seed Data**: Populate initial roles, permissions, and test data
3. **Payment Integration**: Integrate GCash, Maya, and bank APIs
4. **Email/SMS Services**: Configure email and SMS providers
5. **Testing**: Add comprehensive unit and integration tests
6. **Deployment**: Deploy to Azure, AWS, or on-premises

## Support

For issues and questions, please create an issue in the GitHub repository.
