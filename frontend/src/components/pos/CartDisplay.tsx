import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { usePOSStore } from '@/stores/pos';
import { CartItem } from '@/types';

interface CartDisplayProps {
  onCheckout?: () => void;
}

export const CartDisplay: React.FC<CartDisplayProps> = ({ onCheckout }) => {
  const { cartItems, removeFromCart, updateCartItem, discount, getSubtotal, getTotal } = usePOSStore();

  if (cartItems.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p className="text-gray-500 text-lg">Cart is empty</p>
      </div>
    );
  }

  const handleQuantityChange = (item: CartItem, change: number) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      updateCartItem(item.id, { quantity: newQuantity });
    }
  };

  const subtotal = getSubtotal();
  const tax = (subtotal - discount) * 0.12;
  const total = getTotal();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="bg-blue-600 text-white p-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Shopping Cart
        </h2>
      </div>

      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {cartItems.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex gap-3 items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition"
          >
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-600">₱{item.unitPrice.toFixed(2)} x {item.quantity}</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleQuantityChange(item, -1)}
                className="p-1 hover:bg-gray-200 rounded transition"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-6 text-center font-semibold">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item, 1)}
                className="p-1 hover:bg-gray-200 rounded transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-800">₱{item.total.toFixed(2)}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="bg-gray-50 p-4 space-y-3 border-t">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal:</span>
          <span className="font-semibold">₱{subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-orange-600">
            <span>Discount:</span>
            <span className="font-semibold">-₱{discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-gray-700">
          <span>Tax (12%):</span>
          <span className="font-semibold">₱{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold bg-blue-50 p-2 rounded">
          <span>Total:</span>
          <span className="text-blue-600">₱{total.toFixed(2)}</span>
        </div>
        <button
          onClick={onCheckout}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-lg"
        >
          Checkout
        </button>
      </div>
    </motion.div>
  );
};
