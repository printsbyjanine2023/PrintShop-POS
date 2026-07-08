# PrintShop POS Backend (Node.js/Express)

A modern REST API backend for the PrintShop POS system built with Express.js and TypeScript.

## Features

- ✅ User Authentication (JWT)
- ✅ Role-Based Access Control (Admin/User)
- ✅ Customer Management
- ✅ Product Management
- ✅ Work Order Management
- ✅ Dashboard with Analytics
- ✅ SQLite Database
- ✅ TypeScript Support
- ✅ CORS Enabled
- ✅ Error Handling

## Prerequisites

- Node.js 18+
- npm or yarn

## Installation

1. Navigate to backend directory:
```bash
cd nodejs-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` if needed (default settings should work)

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user (requires auth)
- `POST /api/v1/auth/seed-admin` - Create default admin user

### Customers
- `GET /api/v1/customers` - List all customers
- `GET /api/v1/customers/:id` - Get customer details
- `POST /api/v1/customers` - Create customer
- `PUT /api/v1/customers/:id` - Update customer
- `DELETE /api/v1/customers/:id` - Delete customer

### Products
- `GET /api/v1/products` - List all products
- `GET /api/v1/products/:id` - Get product details
- `POST /api/v1/products` - Create product
- `PUT /api/v1/products/:id` - Update product
- `DELETE /api/v1/products/:id` - Delete product

### Work Orders
- `GET /api/v1/work-orders` - List all work orders
- `GET /api/v1/work-orders/:id` - Get work order details
- `POST /api/v1/work-orders` - Create work order
- `POST /api/v1/work-orders/:id/items` - Add item to work order
- `PATCH /api/v1/work-orders/:id/status` - Update work order status
- `DELETE /api/v1/work-orders/:id` - Delete work order

### Dashboard
- `GET /api/v1/dashboard/stats` - Get dashboard statistics
- `GET /api/v1/dashboard/recent-orders` - Get recent orders
- `GET /api/v1/dashboard/revenue` - Get revenue data

## Authentication

Include JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## Default Credentials

- Email: `admin@printshop.com`
- Password: `admin123`

Create admin user first:
```bash
curl -X POST http://localhost:5000/api/v1/auth/seed-admin
```

## Project Structure

```
nodejs-backend/
├── src/
│   ├── database/
│   │   └── init.ts           # Database initialization
│   ├── middleware/
│   │   ├── auth.ts           # Authentication middleware
│   │   └── errorHandler.ts   # Error handling
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── customer.routes.ts
│   │   ├── product.routes.ts
│   │   ├── workOrder.routes.ts
│   │   └── dashboard.routes.ts
│   └── server.ts             # Main server file
├── .env.example              # Environment variables
├── package.json
└── tsconfig.json
```

## Environment Variables

```
PORT=5000
NODE_ENV=development
DATABASE_PATH=./data/printshop.db
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRY=24h
CORS_ORIGIN=http://localhost:3000
API_PREFIX=/api/v1
```

## Testing

### Create Admin User
```bash
curl -X POST http://localhost:5000/api/v1/auth/seed-admin
```

### Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@printshop.com","password":"admin123"}'
```

### Create Customer
```bash
curl -X POST http://localhost:5000/api/v1/customers \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","phone":"1234567890"}'
```

## Troubleshooting

### Port already in use
Change `PORT` in `.env` file to a different port (e.g., 5001)

### Database errors
Delete `data/printshop.db` to reset the database

## License

MIT
