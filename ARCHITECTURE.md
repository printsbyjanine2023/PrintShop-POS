# PrintShop POS - Architecture Documentation

## System Architecture Overview

### Clean Architecture Layers

```
┌──────────────────────────────────────────────────────┐
│         Presentation Layer (UI)             │
│      React 19 + TypeScript + Tailwind      │
├──────────────────────────────────────────────────────┤
│      Application Layer (API)                │
│     ASP.NET Core 8 Controllers              │
├──────────────────────────────────────────────────────┤
│       Domain Layer (Business Logic)         │
│    Services, Repositories, Specifications   │
├──────────────────────────────────────────────────────┤
│    Infrastructure Layer (Data Access)       │
│   Entity Framework Core, SQL Server         │
└──────────────────────────────────────────────────────┘
```

## Backend Structure

### PrintShop.API
Entry point for the application. Contains:
- Controllers for API endpoints
- Middleware configuration
- Dependency injection setup
- Program.cs bootstrap

### PrintShop.Core
Business logic and domain models:
- **Entities**: User, Customer, Product, WorkOrder, etc.
- **Services**: Core business operations
- **Repositories**: Data access abstractions
- **Specifications**: Query filters and sorting
- **Exceptions**: Custom exception types
- **DTOs**: Data transfer objects

### PrintShop.Infrastructure
Data access and external services:
- **DbContext**: EF Core configuration
- **Repositories**: Implementation of repository pattern
- **Migrations**: Database schema changes
- **Services**: Email, SMS, payment integration
- **Configuration**: DbContext setup

### PrintShop.Tests
Unit and integration tests:
- Service tests
- Repository tests
- Integration tests
- Test fixtures and mocks

## Frontend Structure

### Component Architecture
```
src/
├── components/
│   ├── common/          # Reusable components
│   ├── layout/          # Layout components
│   ├── pos/             # POS-specific components
│   ├── dashboard/       # Dashboard components
│   ├── inventory/       # Inventory components
│   └── reports/         # Report components
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── services/            # API clients
├── context/             # React context providers
├── types/               # TypeScript types
├── utils/               # Utility functions
└── styles/              # Global styles
```

## Data Flow

### POS Transaction Flow
```
User Input (UI)
    ↓
Form Validation (Zod)
    ↓
API Request (axios/fetch)
    ↓
Controller (ASP.NET)
    ↓
Service Layer (Business Logic)
    ↓
Repository (Data Access)
    ↓
Entity Framework → SQL Server
    ↓
Response with status/data
    ↓
UI State Update
```

## API Design

### RESTful Endpoints
- **GET** /api/products - List all products
- **GET** /api/products/:id - Get product details
- **POST** /api/sales - Create new sale
- **GET** /api/sales/:id - Get sale details
- **PUT** /api/orders/:id - Update order status
- **DELETE** /api/sales/:id - Void sale

### Request/Response Format
```json
{
  "success": true,
  "data": { /* resource data */ },
  "message": "Operation successful",
  "errors": null
}
```

## Database Schema Strategy

### Normalization Rules
- **1NF**: Atomic values only
- **2NF**: No partial dependencies
- **3NF**: No transitive dependencies
- Use foreign keys for relationships
- Use appropriate indexes on frequently queried columns

### Key Relationships
- Users → Roles → Permissions (RBAC)
- Customers → Addresses, Contact Info
- WorkOrders → Products/Services → Inventory
- Sales → SaleItems → Products
- Employees → Payroll, Commissions
- Suppliers → PurchaseOrders

## Authentication & Authorization

### JWT Token Flow
```
1. User Login → Validate Credentials
2. Generate JWT Token + Refresh Token
3. Client stores tokens (secure, httpOnly for refresh)
4. Each API request includes JWT in Authorization header
5. Middleware validates JWT signature and expiry
6. Token refresh using refresh token
7. Logout invalidates tokens
```

### Role-Based Access Control (RBAC)
- Roles defined in database
- Permissions linked to roles
- Users assigned to roles
- Controllers use [Authorize(Roles="Admin,Manager")] attribute
- Fine-grained permissions for complex scenarios

## Caching Strategy

- **In-memory cache**: Frequently accessed products, settings
- **Redis cache**: Session data, temporary calculations
- **Cache invalidation**: On data updates

## Offline Capability

### Sync Strategy
1. **Online**: Direct API calls
2. **Offline**: Store in IndexedDB (browser) or local SQLite (desktop)
3. **Detection**: Online/offline event listeners
4. **Sync Queue**: Queue operations when offline
5. **Auto-sync**: Resume when connection restored
6. **Conflict Resolution**: Last-write-wins or manual merge

## Error Handling

### Global Exception Handler
- Catches all exceptions
- Logs to file/service
- Returns standardized error response
- Appropriate HTTP status codes

### API Error Codes
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 422: Validation Error
- 500: Internal Server Error

## Performance Optimization

### Backend
- Database indexing
- Query optimization (includes, projection)
- Pagination for large datasets
- Caching frequently accessed data
- Connection pooling

### Frontend
- Code splitting
- Lazy loading routes
- Image optimization
- CSS-in-JS optimization
- React.memo for expensive components
- Virtual scrolling for large lists

## Security Measures

### Backend Security
- HTTPS only
- CORS configuration
- Rate limiting
- SQL injection prevention (EF Core parameterization)
- XSS protection
- CSRF tokens
- Input validation
- Password hashing (bcrypt)
- Audit logging

### Frontend Security
- XSS prevention (React sanitization)
- CSRF token handling
- Secure token storage
- Content Security Policy
- Dependency scanning

## Deployment Architecture

### Production Setup
```
Internet
    ↓
NGINX/IIS (Reverse Proxy)
    ↓
Load Balancer
    ↓
ASP.NET Core API Instances (Scaled)
    ↓
SQL Server Database (Replicated)
    ↓
Backup Storage
```

## Monitoring & Logging

- **Logging**: Serilog for structured logging
- **Monitoring**: Application Insights
- **Error Tracking**: Sentry or similar
- **Performance**: EF Core query logging
- **Audit Trail**: All changes logged with user/timestamp
