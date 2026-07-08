import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, AlertCircle } from 'lucide-react';

interface InventoryItem {
  id: number;
  code: string;
  name: string;
  category: string;
  currentStock: number;
  reorderLevel: number;
  unit: string;
  costPrice: number;
  value: number;
}

const mockInventory: InventoryItem[] = [
  { id: 1, code: 'INV-001', name: 'A4 Paper (500pcs)', category: 'Paper', currentStock: 45, reorderLevel: 50, unit: 'pack', costPrice: 150, value: 6750 },
  { id: 2, code: 'INV-002', name: 'Ink Cartridge Black', category: 'Ink', currentStock: 12, reorderLevel: 20, unit: 'pcs', costPrice: 400, value: 4800 },
  { id: 3, code: 'INV-003', name: 'Lamination Film A4', category: 'Film', currentStock: 25, reorderLevel: 30, unit: 'pack', costPrice: 80, value: 2000 },
  { id: 4, code: 'INV-004', name: 'Photo Paper Glossy', category: 'Paper', currentStock: 60, reorderLevel: 40, unit: 'pack', costPrice: 200, value: 12000 },
];

export const InventoryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [items] = useState<InventoryItem[]>(mockInventory);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockItems = filteredItems.filter((item) => item.currentStock <= item.reorderLevel);
  const totalValue = filteredItems.reduce((sum, item) => sum + item.value, 0);

  return (
    <Layout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-800">Inventory Management</h1>
          <p className="text-gray-600">Track and manage your products and materials</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center">
              <p className="text-gray-600 text-sm">Total Items</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{items.length}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center">
              <p className="text-gray-600 text-sm">Total Value</p>
              <p className="text-3xl font-bold text-green-600 mt-2">₱{totalValue.toLocaleString()}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center">
              <p className="text-gray-600 text-sm">Low Stock Items</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{lowStockItems.length}</p>
            </div>
          </div>
        </motion.div>

        {lowStockItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex gap-3"
          >
            <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-orange-900">Low Stock Alert</h3>
              <p className="text-sm text-orange-800 mt-1">
                {lowStockItems.length} item(s) are below reorder level. Consider restocking.
              </p>
            </div>
          </motion.div>
        )}

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
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
              <Plus className="w-4 h-4" />
              Add Item
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">{item.code}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{item.currentStock}</span>
                        <span className="text-gray-500">/ {item.reorderLevel} {item.unit}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">₱{item.value.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm">
                      {item.currentStock <= item.reorderLevel ? (
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Low Stock</span>
                      ) : (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">OK</span>
                      )}
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
