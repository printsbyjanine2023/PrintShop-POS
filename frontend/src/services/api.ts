import axios, { AxiosInstance, AxiosError } from 'axios';
import { AuthResponse } from '@/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class ApiClient {
  private api: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: `${API_URL}/api`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(username: string, password: string): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/auth/login', {
      username,
      password,
    });
    return response.data;
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/auth/refresh-token', {
      refreshToken,
    });
    return response.data;
  }

  // Products
  async getProducts() {
    const response = await this.api.get('/products');
    return response.data;
  }

  async getProductById(id: number) {
    const response = await this.api.get(`/products/${id}`);
    return response.data;
  }

  // Services
  async getServices() {
    const response = await this.api.get('/services');
    return response.data;
  }

  // Customers
  async getCustomers() {
    const response = await this.api.get('/customers');
    return response.data;
  }

  async getCustomerById(id: number) {
    const response = await this.api.get(`/customers/${id}`);
    return response.data;
  }

  // Sales
  async createSale(saleData: any) {
    const response = await this.api.post('/sales', saleData);
    return response.data;
  }

  async getSaleById(id: number) {
    const response = await this.api.get(`/sales/${id}`);
    return response.data;
  }

  // Work Orders
  async getWorkOrders() {
    const response = await this.api.get('/work-orders');
    return response.data;
  }

  async createWorkOrder(orderData: any) {
    const response = await this.api.post('/work-orders', orderData);
    return response.data;
  }

  async updateWorkOrderStatus(id: number, status: string) {
    const response = await this.api.put(`/work-orders/${id}/status`, { status });
    return response.data;
  }
}

export const apiClient = new ApiClient();
