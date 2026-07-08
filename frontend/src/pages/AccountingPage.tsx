import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Download, Filter } from 'lucide-react';

const salesData = [
  { name: 'Week 1', revenue: 45000, expenses: 12000, profit: 33000 },
  { name: 'Week 2', revenue: 52000, expenses: 15000, profit: 37000 },
  { name: 'Week 3', revenue: 48000, expenses: 13500, profit: 34500 },
  { name: 'Week 4', revenue: 61000, expenses: 18000, profit: 43000 },
];

const expenseData = [
  { name: 'Materials', value: 35, fill: '#ff6b6b' },
  { name: 'Salary', value: 40, fill: '#4ecdc4' },
  { name: 'Utilities', value: 15, fill: '#45b7d1' },
  { name: 'Maintenance', value: 10, fill: '#ffa07a' },
];

export const AccountingPage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Accounting & Financial Reports</h1>
            <p className="text-gray-600">Track revenue, expenses, and profitability</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition font-semibold">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-600 text-sm">Total Revenue</p>
            <p className="text-3xl font-bold text-green-600 mt-2">₱206,000</p>
            <p className="text-xs text-gray-500 mt-2">+8% from last month</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-600 text-sm">Total Expenses</p>
            <p className="text-3xl font-bold text-red-600 mt-2">₱58,500</p>
            <p className="text-xs text-gray-500 mt-2">+3% from last month</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-600 text-sm">Net Profit</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">₱147,500</p>
            <p className="text-xs text-gray-500 mt-2">+11% from last month</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-600 text-sm">Profit Margin</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">71.6%</p>
            <p className="text-xs text-gray-500 mt-2">+2% from last month</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Revenue vs Expenses</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#10b981" />
                <Bar dataKey="expenses" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Expense Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-xl font-bold mb-4 text-gray-800">Profit Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </Layout>
  );
};
