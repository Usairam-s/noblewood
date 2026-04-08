"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Box, Package, Utensils, Gift, Sparkles } from "lucide-react";

export default function CollectionsSection() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetch('/api/collections')
      .then(res => res.json())
      .then(data => setCollections(data.collections || []));
  }, []);

  // Map collection names to icons
  const getIconForCollection = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('jewelry') || lowerName.includes('jewellery')) return Box;
    if (lowerName.includes('watch')) return Package;
    if (lowerName.includes('kitchen') || lowerName.includes('utensil')) return Utensils;
    if (lowerName.includes('gift')) return Gift;
    return Sparkles; // Default icon
  };

  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-3">
            Explore Our Collections
          </h2>
          <p className="text-gray-600">
            Handcrafted wooden products for every need
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection: any) => {
            const IconComponent = getIconForCollection(collection.name);
            return (
              <Link
                key={collection._id}
                href={`/products?collection=${encodeURIComponent(collection.name)}`}
                className="group relative bg-[#F5EDE0] p-8 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl block"
              >
                {/* Background overlay on hover */}
                <div className="absolute inset-0 bg-[#654321] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center bg-white rounded-full group-hover:bg-[#F5EDE0] transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-[#654321] transition-colors duration-300" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-black group-hover:text-white transition-colors duration-300 mb-2">
                    {collection.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 group-hover:text-white/80 transition-colors duration-300">
                    {collection.description || 'Handcrafted wooden products'}
                  </p>

                  {/* Arrow indicator */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-white text-[#654321] px-4 py-2 text-sm font-medium inline-block">
                      Explore →
                    </span>
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#654321] transform translate-x-10 -translate-y-10 rotate-45 group-hover:bg-[#8B6F47] transition-colors duration-300"></div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <button className="bg-[#654321] text-white px-8 py-3 font-medium hover:bg-[#4A3219] transition">
              See All Products
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
