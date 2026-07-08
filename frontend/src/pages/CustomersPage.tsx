import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Plus, Search, Mail, Phone, Edit2, Trash2, User } from 'lucide-react';

interface CustomerData {
  id: number;
  code: string;
  name: string;
  businessName?: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
  totalPurchases: number;
  outstandingBalance: number;
  isPWD: boolean;
  isSenior: boolean;
}

const mockCustomers: CustomerData[] = [
  { id: 1, code: 'CUST-001', name: 'John Doe', businessName: 'ABC Printing Co.', email: 'john@abc.com', phone: '09171234567', loyaltyPoints: 2500, totalPurchases: 45000, outstandingBalance: 5000, isPWD: false, isSenior: false },
  { id: 2, code: 'CUST-002', name: 'Maria Santos', businessName: 'XYZ Graphics', email: 'maria@xyz.com', phone: '09179876543', loyaltyPoints: 1800, totalPurchases: 35000, outstandingBalance: 0, isPWD: false, isSenior: false },
  { id: 3, code: 'CUST-003', name: 'Carlos Rivera', businessName: undefined, email: 'carlos@email.com', phone: '09165555555', loyaltyPoints: 500, totalPurchases: 8000, outstandingBalance: 2000, isPWD: true, isSenior: false },
  { id: 4, code: 'CUST-004', name: 'Rosa Garcia', businessName: undefined, email: 'rosa@email.com', phone: '09178888888', loyaltyPoints: 3200, totalPurchases: 52000, outstandingBalance: 0, isPWD: false, isSenior: true },
];

export const CustomersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [customers] = useState<CustomerData[]>(mockCustomers);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCustomers = filteredCustomers.length;
  const totalSales = filteredCustomers.reduce((sum, c) => sum + c.totalPurchases, 0);
  const totalReceivables = filteredCustomers.reduce((sum, c) => sum + c.outstandingBalance, 0);

  return (
    <Layout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-800">Customer Management</h1>
          <p className="text-gray-600">Manage your customers and their accounts</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Customers</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{totalCustomers}</p>
              </div>
              <User className="w-10 h-10 text-blue-100" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div>
              <p className="text-gray-600 text-sm">Total Sales</p>
              <p className="text-2xl font-bold text-green-600 mt-2">₱{totalSales.toLocaleString()}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div>
              <p className="text-gray-600 text-sm">Outstanding</p>
              <p className="text-2xl font-bold text-orange-600 mt-2">₱{totalReceivables.toLocaleString()}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div>
              <p className="text-gray-600 text-sm">Avg. Transaction</p>
              <p className="text-2xl font-bold text-purple-600 mt-2">₱{Math.round(totalSales / totalCustomers).toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b flex gap-3 items-center justify-between">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
              <Plus className="w-4 h-4" />
              Add Customer
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Business</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Loyalty Points</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Total Sales</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Outstanding</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer, index) => (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">{customer.code}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{customer.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{customer.businessName || '-'}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <a href={`mailto:${customer.email}`} className="text-blue-600 hover:text-blue-800">
                          <Mail className="w-4 h-4" />
                        </a>
                        <a href={`tel:${customer.phone}`} className="text-blue-600 hover:text-blue-800">
                          <Phone className="w-4 h-4" />
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-purple-600">{customer.loyaltyPoints}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">₱{customer.totalPurchases.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-orange-600">₱{customer.outstandingBalance.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-1">
                        {customer.isPWD && <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">PWD</span>}
                        {customer.isSenior && <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">Senior</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm flex gap-2">
                      <button className="p-2 hover:bg-blue-100 text-blue-600 rounded transition">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-red-100 text-red-600 rounded transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};
