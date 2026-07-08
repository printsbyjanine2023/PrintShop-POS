import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { motion } from 'framer-motion';
import { DollarSign, Package, Users, Clock } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState({
    todaysSales: 45250,
    weeklySales: 287500,
    monthlySales: 1200000,
    pendingOrders: 12,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <Layout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your business overview.</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <DashboardCard
            title="Today's Sales"
            value={`₱${stats.todaysSales.toLocaleString()}`}
            trend={12}
            icon={<DollarSign className="w-8 h-8" />}
            color="blue"
          />
          <DashboardCard
            title="Weekly Sales"
            value={`₱${stats.weeklySales.toLocaleString()}`}
            trend={8}
            icon={<DollarSign className="w-8 h-8" />}
            color="green"
          />
          <DashboardCard
            title="Monthly Sales"
            value={`₱${stats.monthlySales.toLocaleString()}`}
            trend={-3}
            icon={<DollarSign className="w-8 h-8" />}
            color="orange"
          />
          <DashboardCard
            title="Pending Orders"
            value={stats.pendingOrders}
            icon={<Clock className="w-8 h-8" />}
            color="purple"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2">
            <SalesChart />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
                New Sale
              </button>
              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold">
                New Order
              </button>
              <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition font-semibold">
                Inventory Check
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};
