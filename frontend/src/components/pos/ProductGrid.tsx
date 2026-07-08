import React from 'react';
import { motion } from 'framer-motion';
import { Product, Service } from '@/types';
import { Plus, Tag } from 'lucide-react';
import { usePOSStore } from '@/stores/pos';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-24 flex items-center justify-center">
            <Tag className="w-12 h-12 text-white opacity-50" />
          </div>
          <div className="p-4">
            <h3 className="font-bold text-gray-800 truncate">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-3">₱{product.sellingPrice.toFixed(2)}</p>
            <button
              onClick={() => onAddToCart(product)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
