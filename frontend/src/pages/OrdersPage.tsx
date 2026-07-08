import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Plus, Search, Eye, Edit2, Trash2, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface WorkOrder {
  id: number;
  orderNumber: string;
  customer: string;
  service: string;
  status: 'Pending' | 'Approved' | 'Printing' | 'QC' | 'Ready' | 'Delivered';
  priority: 'Normal' | 'High' | 'Rush';
  amount: number;
  dueDate: string;
}

const mockOrders: WorkOrder[] = [
  { id: 1, orderNumber: 'ORD-20260708-001', customer: 'ABC Printing Co.', service: 'Tarpaulin Banner', status: 'Printing', priority: 'High', amount: 8500, dueDate: '2026-07-10' },
  { id: 2, orderNumber: 'ORD-20260708-002', customer: 'XYZ Graphics', service: 'Business Cards', status: 'Pending', priority: 'Normal', amount: 2500, dueDate: '2026-07-12' },
  { id: 3, orderNumber: 'ORD-20260708-003', customer: 'Design Studio', service: 'Photo Printing', status: 'Ready', priority: 'Normal', amount: 5000, dueDate: '2026-07-08' },
  { id: 4, orderNumber: 'ORD-20260707-001', customer: 'Corp Prints', service: 'Document Printing', status: 'Delivered', priority: 'Normal', amount: 3500, dueDate: '2026-07-07' },
];

const statusColors: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Approved: 'bg-blue-100 text-blue-700',
  Printing: 'bg-purple-100 text-purple-700',
  QC: 'bg-indigo-100 text-indigo-700',
  Ready: 'bg-green-100 text-green-700',
  Delivered: 'bg-gray-100 text-gray-700',
};

const priorityColors: Record<string, string> = {
  Normal: 'text-gray-600',
  High: 'text-orange-600 font-semibold',
  Rush: 'text-red-600 font-bold',
};

export const OrdersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [orders] = useState<WorkOrder[]>(mockOrders);

  const filteredOrders = orders.filter((order) =>
    order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingOrders = filteredOrders.filter((o) => o.status === 'Pending').length;
  const completedOrders = filteredOrders.filter((o) => o.status === 'Delivered').length;
  const totalAmount = filteredOrders.reduce((sum, o) => sum + o.amount, 0);

  return (
    <Layout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-800">Work Orders</h1>
          <p className="text-gray-600">Track and manage print jobs</p>
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
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{pendingOrders}</p>
              </div>
              <Clock className="w-10 h-10 text-orange-100" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completed</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{completedOrders}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-100" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Orders</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{filteredOrders.length}</p>
              </div>
              <AlertCircle className="w-10 h-10 text-blue-100" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div>
              <p className="text-gray-600 text-sm">Total Value</p>
              <p className="text-2xl font-bold text-purple-600 mt-2">₱{totalAmount.toLocaleString()}</p>
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
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
              <Plus className="w-4 h-4" />
              New Order
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Order #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 text-sm font-mono font-semibold text-gray-700">{order.orderNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{order.customer}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.service}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={priorityColors[order.priority]}>{order.priority}</span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(order.dueDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">₱{order.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm flex gap-2">
                      <button className="p-2 hover:bg-blue-100 text-blue-600 rounded transition">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-blue-100 text-blue-600 rounded transition">
                        <Edit2 className="w-4 h-4" />
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
