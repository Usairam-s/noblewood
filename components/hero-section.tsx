"use client";

import { Check, Star } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const bestsellers = [
    {
      id: 1,
      name: "Best Office Deal 01 – Organize Your D...",
      price: "5,400",
      originalPrice: "6,750",
      image: "/placeholder.jpg"
    },
    {
      id: 2,
      name: "5 Watch Wooden Box with Acrylic Glass...",
      price: "2,850",
      originalPrice: "3,400",
      image: "/placeholder.jpg"
    },
    {
      id: 3,
      name: "10 Watch Wooden Box with Acrylic Glas...",
      price: "3,500",
      originalPrice: "4,400",
      image: "/placeholder.jpg"
    },
    {
      id: 4,
      name: "Wooden Carved Adjustable Mobile Stand...",
      price: "1,300",
      originalPrice: "1,600",
      image: "/placeholder.jpg"
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Left Side - Hero Content */}
      <div className="w-full lg:w-1/2 bg-[#F5EDE0] px-8 lg:px-16 py-16 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-[#8B6F47] text-sm font-medium mb-6 flex items-center gap-2">
            <span className="w-8 h-px bg-[#8B6F47]"></span>
            PAKISTAN'S NO.1 HANDMADE WOODEN STORE
          </p>

          <h1 className="text-5xl lg:text-6xl font-bold mb-4">
            Pakistan No 1 Wooden
            <br />
            <span className="text-[#8B6F47]">Handcrafted Brand</span>
          </h1>

          <p className="text-[#5a4a3a] text-lg mb-8 leading-relaxed">
            Authentic sheesham wood products — jewelry boxes, watch cases, kitchen items & Islamic décor. Every piece handmade by master craftsmen in Pakistan.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <div className="flex items-center gap-2 text-[#5a4a3a]">
              <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span>Cash on Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-[#5a4a3a]">
              <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span>100% Handmade</span>
            </div>
            <div className="flex items-center gap-2 text-[#5a4a3a]">
              <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span>Nationwide Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-[#5a4a3a]">
              <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span>7-Day Returns</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button className="bg-black text-white px-8 py-3 font-medium hover:bg-black/90 transition">
              Shop Collection
            </button>
            <button className="bg-transparent text-black px-8 py-3 font-medium border-2 border-black hover:bg-black hover:text-white transition">
              View Bestsellers
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Bestsellers */}
      <div className="w-full lg:w-1/2 bg-[#2A1500] px-6 py-12">
        <h2 className="text-[#C4A574] text-sm font-medium tracking-wider mb-8 text-center">
          BESTSELLING PRODUCTS
        </h2>

        <div className="space-y-4">
          {bestsellers.slice(0, 3).map((product) => (
            <div key={product.id} className="bg-[#3d2410] p-4 flex gap-4">
              <div className="w-20 h-20 bg-gray-600 flex-shrink-0 flex items-center justify-center text-white text-xs">
                Image
              </div>
              <div className="flex-1">
                <h3 className="text-[#E5D4B8] text-sm font-medium mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#C4A574] font-bold">Rs.{product.price}</span>
                  <span className="text-gray-500 text-sm line-through">Rs.{product.originalPrice}</span>
                </div>
                <span className="inline-block bg-red-600 text-white text-xs px-2 py-1 font-medium">
                  Best Seller
                </span>
              </div>
            </div>
          ))}

          {/* Last Product with Rating */}
          <div className="bg-[#3d2410] p-4 flex gap-4">
            <div className="w-20 h-20 bg-gray-600 flex-shrink-0 flex items-center justify-center text-white text-xs">
              Image
            </div>
            <div className="flex-1">
              <h3 className="text-[#E5D4B8] text-sm font-medium mb-2 line-clamp-2">
                {bestsellers[3].name}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#C4A574] font-bold">Rs.{bestsellers[3].price}</span>
                <span className="text-gray-500 text-sm line-through">Rs.{bestsellers[3].originalPrice}</span>
              </div>
              <div className="bg-white p-3 mt-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="font-bold text-black text-sm">4.8 / 5.0</span>
                </div>
                <p className="text-xs text-gray-600">500+ verified reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
