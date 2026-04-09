'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/contexts/CartContext';
import Image from 'next/image';
import { ArrowLeft, Package, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    alternativePhone: '',
    address: '',
    nearbyPlace: '',
  });

  const shipping = 280;
  const total = cartTotal + shipping;
  const hasLargeOrder = cart.reduce((sum, item) => sum + item.quantity, 0) >= 10;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderData = {
        ...formData,
        products: cart.map(item => ({
          productId: item._id,
          title: item.title,
          actualPrice: item.actualPrice,
          quantity: item.quantity,
          image: item.images[0],
        })),
        subtotal: cartTotal,
        shipping,
        total,
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        clearCart();
        router.push('/thank-you');
      } else {
        toast.error('Failed to place order');
      }
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5EDE0] flex items-center justify-center p-8">
        <div className="text-center">
          <Package className="w-20 h-20 text-gray-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add some products before checking out</p>
          <Link href="/">
            <button className="px-6 py-3 bg-[#654321] text-white font-medium rounded-lg hover:bg-[#4A3219] transition-colors">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5EDE0] py-8">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 mb-8 text-[#654321] hover:text-[#4A3219] transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-white border-2 border-[#654321] flex items-center justify-center group-hover:bg-[#654321] transition-all">
            <ArrowLeft className="w-5 h-5 group-hover:text-white transition-colors" />
          </div>
          <span className="font-semibold text-lg">Back</span>
        </button>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#654321] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#654321] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#654321] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="03XX XXXXXXX"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#654321] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alternative Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    name="alternativePhone"
                    value={formData.alternativePhone}
                    onChange={handleChange}
                    placeholder="03XX XXXXXXX"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#654321] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Complete Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="House/Street number, Area, City"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#654321] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Famous Place Nearby (Optional)
                </label>
                <input
                  type="text"
                  name="nearbyPlace"
                  value={formData.nearbyPlace}
                  onChange={handleChange}
                  placeholder="e.g., Near XYZ Mall, Behind ABC Hospital"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#654321] focus:border-transparent"
                />
              </div>

              {hasLargeOrder && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Large Order Notice</p>
                    <p className="text-sm text-blue-700 mt-1">
                      You have 10+ products in your order. Due to the size and weight of the parcel, 
                      we will contact you after placing the order to confirm shipping details.
                    </p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#654321] hover:bg-[#4A3219] text-white font-bold rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
                {cart.map((item) => (
                  <div key={item._id} className="flex gap-3">
                    <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={item.images[0]}
                        alt={item.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Qty: {item.quantity} × Rs. {item.actualPrice}
                      </p>
                      <p className="text-sm font-semibold text-[#654321] mt-1">
                        Rs. {item.actualPrice * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">Rs. {cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium">Rs. {shipping}</span>
                </div>
                <div className="h-px bg-gray-300 my-2" />
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-[#654321]">Rs. {total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
