'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Package, Tag, Calendar } from 'lucide-react';

export default function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">All Products</h1>
        <div className="text-center py-12">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        <div className="text-sm text-gray-600">
          {products.length} {products.length === 1 ? 'Product' : 'Products'}
        </div>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-2">No products found</p>
          <p className="text-gray-500 text-sm">Add your first product to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product: any) => (
            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow flex">
              {/* Product Image */}
              <div className="relative w-48 h-48 bg-gray-100 flex-shrink-0">
                {product.images?.[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    sizes="192px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-16 h-16 text-gray-300" />
                  </div>
                )}
                
                {/* Image Count */}
                {product.images?.length > 1 && (
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    +{product.images.length - 1} more
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1 flex-1">
                    {product.title}
                  </h3>
                  {/* Tag Badge */}
                  {product.tag && (
                    <span className={`ml-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      product.tag === 'featured' ? 'bg-purple-500 text-white' :
                      product.tag === 'trending' ? 'bg-blue-500 text-white' :
                      product.tag === 'bestseller' ? 'bg-green-500 text-white' : ''
                    }`}>
                      {product.tag === 'featured' ? '⭐ Featured' :
                       product.tag === 'trending' ? '🔥 Trending' :
                       product.tag === 'bestseller' ? '🏆 Best Seller' : product.tag}
                    </span>
                  )}
                </div>

                {/* Collection */}
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {product.collection?.name || 'No Collection'}
                  </span>
                </div>

                {/* Description Preview */}
                {product.description && (
                  <div 
                    className="text-sm text-gray-500 mb-3 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                )}

                {/* Pricing */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl font-bold text-green-600">
                    ${product.actualPrice}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
                    {Math.round(((product.originalPrice - product.actualPrice) / product.originalPrice) * 100)}% OFF
                  </span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 mt-auto border-t border-gray-100">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {new Date(product.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </div>
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
