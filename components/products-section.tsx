"use client";

import { Star, Check, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState("featured");

  const categories = ["All Products", "Jewelry Box", "Watch Box", "Kitchen Items", "Gift Sets"];

  return (
    <section className="py-16 px-8 bg-[#F5EDE0]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-3">
            Our Premium Products
          </h2>
          <p className="text-gray-600">
            Handcrafted with love, built to last a lifetime
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-[#654321] text-white"
                    : "bg-white text-[#654321] hover:bg-[#654321] hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
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
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
              {/* Image Container */}
              <div className="relative overflow-hidden">
                {/* Sale Badge */}
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-sm font-bold z-10">
                  SALE
                </div>

                {/* Product Image */}
                <div className="relative h-80 bg-gray-200">
                  <Image
                    src="https://res.cloudinary.com/dmx22dkwy/image/upload/v1773378268/tray_luhtok.jpg"
                    alt="Wooden Watch Box"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Category */}
                <p className="text-[#8B6F47] text-xs font-medium tracking-wider mb-2">
                  WOODEN PRODUCT
                </p>

                {/* Product Name */}
                <h3 className="text-xl font-bold text-black mb-3 line-clamp-2">
                  1 Wooden Watch Box with Glass Top & Golden Button | Han
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
                      <span className="text-2xl font-bold text-black">Rs.1,100</span>
                      <span className="text-gray-400 line-through text-sm">Rs.1,600</span>
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

        {/* View All Products Button */}
        <div className="text-center mt-12">
          <button className="bg-[#654321] text-white px-8 py-3 font-medium hover:bg-[#4A3219] transition">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}
