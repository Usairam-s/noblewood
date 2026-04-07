"use client";

import { Box, Watch, UtensilsCrossed, Gift } from "lucide-react";

export default function CollectionsSection() {
  const collections = [
    {
      id: 1,
      name: "Jewelry Box",
      icon: Box,
      description: "Elegant storage solutions"
    },
    {
      id: 2,
      name: "Watch Box",
      icon: Watch,
      description: "Premium watch organizers"
    },
    {
      id: 3,
      name: "Kitchen Items",
      icon: UtensilsCrossed,
      description: "Handcrafted kitchen essentials"
    },
    {
      id: 4,
      name: "Gift Sets",
      icon: Gift,
      description: "Perfect gift collections"
    }
  ];

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
          {collections.map((collection) => {
            const IconComponent = collection.icon;
            return (
              <div
                key={collection.id}
                className="group relative bg-[#F5EDE0] p-8 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl"
              >
                {/* Background overlay on hover */}
                <div className="absolute inset-0 bg-[#654321] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center bg-white rounded-full group-hover:bg-[#F5EDE0] transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-[#654321] group-hover:text-[#654321] transition-colors duration-300" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-black group-hover:text-white transition-colors duration-300 mb-2">
                    {collection.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 group-hover:text-white/80 transition-colors duration-300">
                    {collection.description}
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
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button className="bg-[#654321] text-white px-8 py-3 font-medium hover:bg-[#4A3219] transition">
            See All Products
          </button>
        </div>
      </div>
    </section>
  );
}
