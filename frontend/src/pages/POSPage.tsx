import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { CartDisplay } from '@/components/pos/CartDisplay';
import { ProductGrid } from '@/components/pos/ProductGrid';
import { Product } from '@/types';
import { usePOSStore } from '@/stores/pos';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const mockProducts: Product[] = [
  { id: 1, code: 'PROD-001', name: 'A4 Paper (500pcs)', description: 'Premium White Paper', sellingPrice: 250, costPrice: 150, unit: 'pack', isActive: true },
  { id: 2, code: 'PROD-002', name: 'Ink Cartridge Black', description: 'Standard Cartridge', sellingPrice: 800, costPrice: 400, unit: 'pcs', isActive: true },
  { id: 3, code: 'PROD-003', name: 'Lamination Film', description: 'A4 Size', sellingPrice: 150, costPrice: 80, unit: 'pcs', isActive: true },
  { id: 4, code: 'PROD-004', name: 'Photo Paper A4', description: 'Glossy 180gsm', sellingPrice: 400, costPrice: 200, unit: 'pack', isActive: true },
];

export const POSPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = usePOSStore();

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: `product-${product.id}`,
      productId: product.id,
      name: product.name,
      quantity: 1,
      unitPrice: product.sellingPrice,
      discount: 0,
      total: product.sellingPrice,
    });
  };

  const filteredProducts = mockProducts.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-800">Point of Sale</h1>
          <p className="text-gray-600">Fast and easy transactions</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex gap-3 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
            </div>
          </div>

          <div>
            <CartDisplay onCheckout={() => console.log('Checkout clicked')} />
          </div>
        </div>
      </div>
    </Layout>
  );
};
