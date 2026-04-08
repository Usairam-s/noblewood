"use client";

import { Star, Check, Plus, PackageX, ArrowLeft, LayoutGrid, Box, Package, Utensils, Gift, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ProductsContent() {
  const searchParams = useSearchParams();
  const collectionQuery = searchParams.get('collection');
  
  const [selectedCategory, setSelectedCategory] = useState(collectionQuery || "All Products");
  const [sortBy, setSortBy] = useState("featured");
  const [collections, setCollections] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch collections
    fetch('/api/collections')
      .then(res => res.json())
      .then(data => setCollections(data.collections || []));

    // Fetch products
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (collectionQuery) {
      setSelectedCategory(collectionQuery);
    }
  }, [collectionQuery]);

  // Map collection names to icons
  const getIconForCollection = (name: string) => {
    if (name === "All Products") return LayoutGrid;
    const lowerName = name.toLowerCase();
    if (lowerName.includes('jewelry') || lowerName.includes('jewellery')) return Box;
    if (lowerName.includes('watch')) return Package;
    if (lowerName.includes('kitchen') || lowerName.includes('utensil')) return Utensils;
    if (lowerName.includes('gift')) return Gift;
    return Sparkles;
  };

  // Filter products by category
  const filteredProducts = products.filter((product: any) => {
    if (selectedCategory === "All Products") return true;
    return product.collection?.name === selectedCategory;
  });

  // Filter products by tag for sort
  const sortedProducts = [...filteredProducts].filter((product: any) => {
    if (sortBy === "featured") return product.tag === "featured" || !product.tag;
    if (sortBy === "bestsellers") return product.tag === "bestseller";
    if (sortBy === "trending") return product.tag === "trending";
    return true;
  });

  const displayProducts = sortedProducts.length > 0 ? sortedProducts : filteredProducts;

  const categories = ["All Products", ...collections.map((c: any) => c.name)];

  return (
    <section className="py-16 px-8 bg-[#F5EDE0] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 mb-8 text-[#654321] hover:text-[#4A3219] transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-white border-2 border-[#654321] flex items-center justify-center group-hover:bg-[#654321] group-hover:border-[#654321] transition-all">
            <ArrowLeft className="w-5 h-5 group-hover:text-white transition-colors" />
          </div>
          <span className="font-semibold text-lg">Back to Home</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-black mb-3">
            All Products
          </h1>
          <p className="text-gray-600">
            Browse our complete collection of handcrafted wooden products
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {categories.map((category) => {
              const IconComponent = getIconForCollection(category);
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 font-medium transition-all flex items-center gap-2 ${
                    selectedCategory === category
                      ? "bg-[#654321] text-white"
                      : "bg-white text-[#654321] hover:bg-[#654321] hover:text-white"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {category}
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <label className="text-gray-700 font-medium">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border-2 border-[#654321] text-[#654321] px-4 py-2 font-medium focus:outline-none focus:border-[#4A3219]"
            >
              <option value="featured">Featured</option>
              <option value="bestsellers">Best Sellers</option>
              <option value="trending">Trending</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#654321] border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : displayProducts.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20">
            <PackageX className="w-24 h-24 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Products Found</h3>
            <p className="text-gray-500">
              {sortBy !== "featured" 
                ? `No ${sortBy === "bestsellers" ? "best seller" : sortBy} products available in this category.`
                : `No products available in this category yet.`}
            </p>
          </div>
        ) : (
          /* Product Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {displayProducts.map((product: any) => (
              <div key={product._id} className="bg-white overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  {/* Tag Badge */}
                  {product.tag && (
                    <div className={`absolute top-4 left-4 px-3 py-1 text-sm font-bold z-10 ${
                      product.tag === 'featured' ? 'bg-purple-600 text-white' :
                      product.tag === 'trending' ? 'bg-blue-600 text-white' :
                      product.tag === 'bestseller' ? 'bg-green-600 text-white' : ''
                    }`}>
                      {product.tag === 'featured' ? '⭐ FEATURED' :
                       product.tag === 'trending' ? '🔥 TRENDING' :
                       product.tag === 'bestseller' ? '🏆 BEST SELLER' : product.tag.toUpperCase()}
                    </div>
                  )}

                  {/* Discount Badge */}
                  {product.originalPrice > product.actualPrice && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 text-sm font-bold z-10">
                      {Math.round(((product.originalPrice - product.actualPrice) / product.originalPrice) * 100)}% OFF
                    </div>
                  )}

                  {/* Product Image */}
                  <div className="relative h-80 bg-gray-200">
                    {product.images?.[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <PackageX className="w-16 h-16 text-gray-300" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  {/* Category */}
                  <p className="text-[#8B6F47] text-xs font-medium tracking-wider mb-2">
                    {product.collection?.name?.toUpperCase() || 'PRODUCT'}
                  </p>

                  {/* Product Name */}
                  <h3 className="text-xl font-bold text-black mb-3 line-clamp-2">
                    {product.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-green-600 font-medium text-sm">In Stock</span>
                  </div>

                  {/* Price and Add Button */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-black">Rs.{product.actualPrice}</span>
                        {product.originalPrice > product.actualPrice && (
                          <span className="text-gray-400 line-through text-sm">Rs.{product.originalPrice}</span>
                        )}
                      </div>
                    </div>
                    <button className="bg-black text-white px-6 py-3 font-medium hover:bg-[#654321] transition-colors flex items-center gap-2">
                      Add
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function AllProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F5EDE0] flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#654321] border-t-transparent"></div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
