export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  refreshToken?: string;
  user?: User;
}

export interface Customer {
  id: number;
  code: string;
  firstName: string;
  lastName: string;
  businessName?: string;
  email?: string;
  phoneNumber?: string;
  loyaltyPoints: number;
  outstandingBalance: number;
  isPWD: boolean;
  isSenior: boolean;
}

export interface Product {
  id: number;
  code: string;
  name: string;
  description?: string;
  sellingPrice: number;
  costPrice: number;
  barcode?: string;
  unit: string;
  isActive: boolean;
}

export interface Service {
  id: number;
  code: string;
  name: string;
  description?: string;
  serviceType: string;
  basePrice: number;
  isTaxable: boolean;
  requiresDesign: boolean;
}

export interface CartItem {
  id: string;
  productId?: number;
  serviceId?: number;
  name: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
}

export interface Sale {
  id: number;
  transactionNumber: string;
  customerId?: number;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  amountPaid: number;
  balanceDue: number;
  paymentMethod: string;
  saleDate: Date;
  status: string;
}

export interface WorkOrder {
  id: number;
  orderNumber: string;
  customerId: number;
  status: string;
  priority: string;
  deadlineDate?: Date;
  description?: string;
  estimatedAmount?: number;
  finalAmount?: number;
  createdAt: Date;
  updatedAt: Date;
}
