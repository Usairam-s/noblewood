'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Package, User, Phone, MapPin, Calendar, ShoppingBag } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data.orders || []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">All Orders</h1>
        <div className="text-center py-12">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">All Orders</h1>
        <div className="text-sm text-gray-600">
          {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-2">No orders yet</p>
          <p className="text-gray-500 text-sm">Orders will appear here once customers place them</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order: any) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Order ID</p>
                      <p className="font-mono text-sm font-semibold">{order._id.slice(-8).toUpperCase()}</p>
                    </div>
                    <div className="h-8 w-px bg-gray-300" />
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="text-sm font-medium">
                        {new Date(order.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Customer Info */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Customer Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Name:</strong> {order.firstName} {order.lastName}</p>
                      <p><strong>Email:</strong> {order.email}</p>
                      <div className="flex items-start gap-2">
                        <Phone className="w-4 h-4 mt-0.5 text-gray-400" />
                        <div>
                          <p>{order.phone}</p>
                          {order.alternativePhone && (
                            <p className="text-gray-600">{order.alternativePhone}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-0.5 text-gray-400" />
                        <div>
                          <p>{order.address}</p>
                          {order.nearbyPlace && (
                            <p className="text-gray-600 text-xs mt-1">Near: {order.nearbyPlace}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="lg:col-span-2">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
                      <ShoppingBag className="w-4 h-4" />
                      Products ({order.products.length})
                    </h3>
                    <div className="space-y-3">
                      {order.products.map((product: any, index: number) => (
                        <div key={index} className="flex gap-3 bg-gray-50 p-3 rounded-lg">
                          <div className="relative w-16 h-16 flex-shrink-0 bg-white rounded overflow-hidden">
                            <Image
                              src={product.image}
                              alt={product.title}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm line-clamp-1">{product.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              Qty: {product.quantity} × Rs. {product.actualPrice}
                            </p>
                            <p className="text-sm font-semibold text-[#654321] mt-1">
                              Rs. {product.actualPrice * product.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-medium">Rs. {order.subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping</span>
                          <span className="font-medium">Rs. {order.shipping}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                          <span>Total</span>
                          <span className="text-[#654321]">Rs. {order.total}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
