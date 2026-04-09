"use client";

import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/contexts/CartContext';

export default function CartSidebar() {
  const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, closeCart, cartCount } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-[#654321]" />
            <h2 className="text-2xl font-bold text-gray-900">
              Shopping Cart ({cartCount})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 max-h-[calc(100vh-280px)]">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-20 h-20 text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Add some products to get started!</p>
              <button
                onClick={closeCart}
                className="px-6 py-3 bg-[#654321] text-white font-medium rounded-lg hover:bg-[#4A3219] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item._id} className="flex gap-4 bg-gray-50 p-4 rounded-lg">
                  <div className="relative w-24 h-24 flex-shrink-0 bg-white rounded-lg overflow-hidden">
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-lg font-bold text-[#654321] mb-3">
                      Rs. {item.actualPrice}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Checkout Section */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4 bg-gray-50">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">Rs. {cartTotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="h-px bg-gray-300 my-2" />
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span className="text-[#654321]">Rs. {cartTotal}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/checkout" onClick={closeCart}>
                <button className="w-full py-4 bg-[#654321] hover:bg-[#4A3219] text-white font-bold rounded-lg transition-colors shadow-lg">
                  Proceed to Checkout
                </button>
              </Link>

              <button
                onClick={closeCart}
                className="w-full py-3 border-2 border-[#654321] text-[#654321] font-medium rounded-lg hover:bg-[#654321] hover:text-white transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
