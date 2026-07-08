import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Package, Users, FileText, Settings, Landmark } from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'POS', icon: ShoppingCart, path: '/pos' },
  { label: 'Inventory', icon: Package, path: '/inventory' },
  { label: 'Customers', icon: Users, path: '/customers' },
  { label: 'Orders', icon: FileText, path: '/orders' },
  { label: 'Accounting', icon: Landmark, path: '/accounting' },
  { label: 'Settings', icon: Settings, path: '/settings' },
];

export const Sidebar: React.FC = () => {
  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 bg-blue-900 text-white min-h-screen shadow-lg"
    >
      <div className="p-6">
        <h2 className="text-lg font-bold mb-8 text-blue-100">Menu</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-blue-100 hover:bg-blue-800'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </motion.aside>
  );
};
