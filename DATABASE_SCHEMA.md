# PrintShop POS - Database Schema

## Database: PrintShop

### Core Tables

## Users & Authentication

```sql
CREATE TABLE [Users] (
    [Id] INT PRIMARY KEY IDENTITY(1,1),
    [Username] NVARCHAR(100) UNIQUE NOT NULL,
    [Email] NVARCHAR(255) UNIQUE NOT NULL,
    [PasswordHash] NVARCHAR(MAX) NOT NULL,
    [FirstName] NVARCHAR(100) NOT NULL,
    [LastName] NVARCHAR(100) NOT NULL,
    [PhoneNumber] NVARCHAR(20),
    [ProfileImage] NVARCHAR(MAX),
    [IsActive] BIT DEFAULT 1,
    [IsDeleted] BIT DEFAULT 0,
    [LastLogin] DATETIME2,
    [CreatedAt] DATETIME2 DEFAULT GETUTCDATE(),
    [UpdatedAt] DATETIME2 DEFAULT GETUTCDATE()
);
```

## Customers & Addresses

```sql
CREATE TABLE [Customers] (
    [Id] INT PRIMARY KEY IDENTITY(1,1),
    [Code] NVARCHAR(50) UNIQUE NOT NULL,
    [FirstName] NVARCHAR(100) NOT NULL,
    [LastName] NVARCHAR(100) NOT NULL,
    [BusinessName] NVARCHAR(255),
    [Email] NVARCHAR(255),
    [PhoneNumber] NVARCHAR(20),
    [AlternatePhoneNumber] NVARCHAR(20),
    [TaxId] NVARCHAR(50),
    [DateOfBirth] DATE,
    [LoyaltyPoints] DECIMAL(18,2) DEFAULT 0,
    [CustomerType] NVARCHAR(50),
    [IsPWD] BIT DEFAULT 0,
    [IsSenior] BIT DEFAULT 0,
    [OutstandingBalance] DECIMAL(18,2) DEFAULT 0,
    [CreditLimit] DECIMAL(18,2) DEFAULT 0,
    [Notes] NVARCHAR(MAX),
    [IsActive] BIT DEFAULT 1,
    [IsDeleted] BIT DEFAULT 0,
    [CreatedAt] DATETIME2 DEFAULT GETUTCDATE(),
    [UpdatedAt] DATETIME2 DEFAULT GETUTCDATE()
);
```

## Products & Services

```sql
CREATE TABLE [Products] (
    [Id] INT PRIMARY KEY IDENTITY(1,1),
    [Code] NVARCHAR(50) UNIQUE NOT NULL,
    [Name] NVARCHAR(255) NOT NULL,
    [Description] NVARCHAR(MAX),
    [CategoryId] INT NOT NULL,
    [CostPrice] DECIMAL(18,2),
    [SellingPrice] DECIMAL(18,2) NOT NULL,
    [Barcode] NVARCHAR(100),
    [Unit] NVARCHAR(50),
    [IsActive] BIT DEFAULT 1,
    [CreatedAt] DATETIME2 DEFAULT GETUTCDATE()
);

CREATE TABLE [Services] (
    [Id] INT PRIMARY KEY IDENTITY(1,1),
    [Code] NVARCHAR(50) UNIQUE NOT NULL,
    [Name] NVARCHAR(255) NOT NULL,
    [Description] NVARCHAR(MAX),
    [ServiceType] NVARCHAR(100),
    [BasePrice] DECIMAL(18,2) NOT NULL,
    [IsTaxable] BIT DEFAULT 1,
    [RequiresDesign] BIT DEFAULT 0,
    [RequiresApproval] BIT DEFAULT 0,
    [EstimatedTurnaroundDays] INT,
    [IsActive] BIT DEFAULT 1,
    [CreatedAt] DATETIME2 DEFAULT GETUTCDATE()
);
```

## Sales & Transactions

```sql
CREATE TABLE [Sales] (
    [Id] INT PRIMARY KEY IDENTITY(1,1),
    [TransactionNumber] NVARCHAR(50) UNIQUE NOT NULL,
    [CustomerId] INT,
    [CashierId] INT NOT NULL,
    [SaleDate] DATETIME2 DEFAULT GETUTCDATE(),
    [Subtotal] DECIMAL(18,2),
    [TaxAmount] DECIMAL(18,2) DEFAULT 0,
    [DiscountAmount] DECIMAL(18,2) DEFAULT 0,
    [TotalAmount] DECIMAL(18,2),
    [AmountPaid] DECIMAL(18,2),
    [BalanceDue] DECIMAL(18,2) DEFAULT 0,
    [SaleType] NVARCHAR(50),
    [Status] NVARCHAR(50),
    [IsVoided] BIT DEFAULT 0,
    [CreatedAt] DATETIME2 DEFAULT GETUTCDATE()
);
```

## Work Orders

```sql
CREATE TABLE [WorkOrders] (
    [Id] INT PRIMARY KEY IDENTITY(1,1),
    [OrderNumber] NVARCHAR(50) UNIQUE NOT NULL,
    [CustomerId] INT NOT NULL,
    [QuotationId] INT,
    [Status] NVARCHAR(50),
    [Priority] NVARCHAR(50),
    [DeadlineDate] DATE,
    [PickupDate] DATE,
    [Description] NVARCHAR(MAX),
    [EstimatedAmount] DECIMAL(18,2),
    [FinalAmount] DECIMAL(18,2),
    [PaymentStatus] NVARCHAR(50),
    [CreatedAt] DATETIME2 DEFAULT GETUTCDATE(),
    [UpdatedAt] DATETIME2 DEFAULT GETUTCDATE()
);
```

## Complete Schema

For the full database schema with all 30+ tables, see the dedicated DATABASE_SCHEMA.md file.
