"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Star, Heart, Minus, Plus, Truck, Shield, RotateCcw, Phone, ArrowLeft, Check } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/lib/contexts/CartContext';
import toast, { Toaster } from 'react-hot-toast';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const productId = resolvedParams.id;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`/api/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data.product);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error('Failed to load product');
      });
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5EDE0] flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#654321] border-t-transparent"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5EDE0] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <button
            onClick={() => router.back()}
            className="text-[#654321] hover:text-[#4A3219] font-semibold"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice > product.actualPrice
    ? Math.round(((product.originalPrice - product.actualPrice) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${quantity} item(s) added to cart!`);
  };

  return (
    <div className="min-h-screen bg-[#F5EDE0]">
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg relative">
              <Image
                src={product.images[selectedImage]}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              {discount > 0 && (
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  {discount}% OFF
                </div>
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-[#654321] shadow-md' 
                        : 'border-gray-200 hover:border-[#654321]'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-[#8B6F47] text-white text-sm rounded-full font-medium">
                  {product.collection?.name || 'Product'}
                </span>
                {product.tag && (
                  <span className={`px-3 py-1 text-white text-sm rounded-full font-medium ${
                    product.tag === 'featured' ? 'bg-purple-600' :
                    product.tag === 'trending' ? 'bg-blue-600' :
                    product.tag === 'bestseller' ? 'bg-green-600' : 'bg-gray-600'
                  }`}>
                    {product.tag === 'featured' ? '⭐ Featured' :
                     product.tag === 'trending' ? '🔥 Trending' :
                     product.tag === 'bestseller' ? '🏆 Best Seller' : product.tag}
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-gray-600 text-sm ml-2">(4.8 / 5.0)</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-[#654321]">Rs. {product.actualPrice}</span>
              {product.originalPrice > product.actualPrice && (
                <>
                  <span className="text-2xl text-gray-400 line-through">Rs. {product.originalPrice}</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    Save Rs. {product.originalPrice - product.actualPrice}
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3 w-fit">
              <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-green-700 font-medium">In Stock</span>
            </div>

            {/* Description */}
            {product.description && (
              <div 
                className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            )}

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-900">Quantity:</span>
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-[#654321] hover:bg-[#4A3219] text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="p-4 border-2 border-gray-300 hover:border-[#654321] rounded-lg transition-all"
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-300">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Truck className="w-5 h-5 text-[#654321]" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Shield className="w-5 h-5 text-[#654321]" />
                <span>Quality Guarantee</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <RotateCcw className="w-5 h-5 text-[#654321]" />
                <span>7-Day Returns</span>
              </div>
            </div>

            <div className="bg-[#8B6F47]/10 border border-[#8B6F47]/30 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#654321]" />
                <div>
                  <p className="font-medium text-gray-900">Need Help?</p>
                  <p className="text-[#654321] font-semibold">
                    Contact us for assistance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
