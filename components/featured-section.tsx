"use client";

import { ArrowRight } from "lucide-react";

export default function FeaturedSection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      {/* Most Gifted Item */}
      <div className="relative bg-gradient-to-br from-[#3d2817] via-[#2d1f12] to-[#1a0f0a] text-white px-12 py-20 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#654321] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#8B6F47] opacity-10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-xl">
          <p className="text-[#C4A574] text-sm font-medium tracking-widest mb-6">
            MOST GIFTED ITEM
          </p>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            10-Slot Watch Box
            <br />
            with Acrylic Glass Top
          </h2>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[#C4A574] text-3xl font-bold">Rs.3,500</span>
            <span className="text-gray-400 line-through text-lg">Rs.4,400</span>
          </div>
          
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Handcrafted from premium sheesham wood with a golden button and crystal-clear acrylic lid.
          </p>
          
          <button className="group bg-[#C4A574] text-black px-8 py-4 font-bold hover:bg-[#d4b584] transition-all flex items-center gap-3">
            Shop Watch Boxes
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* New Arrival */}
      <div className="relative bg-gradient-to-br from-[#8B6F47] via-[#6B5437] to-[#4A3219] text-white px-12 py-20 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#C4A574] opacity-10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-xl">
          <p className="text-[#F5EDE0] text-sm font-medium tracking-widest mb-6">
            NEW ARRIVAL
          </p>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Ayatul Kursi
            <br />
            18-Inch Wall Art
          </h2>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[#F5EDE0] text-3xl font-bold">Rs.3,200</span>
            <span className="text-gray-300 line-through text-lg">Rs.3,800</span>
          </div>
          
          <p className="text-gray-100 text-lg mb-8 leading-relaxed">
            Intricately carved Ayatul Kursi in solid sheesham wood — a timeless piece of Islamic art.
          </p>
          
          <button className="group bg-[#F5EDE0] text-[#2d1f12] px-8 py-4 font-bold hover:bg-white transition-all flex items-center gap-3">
            Shop Islamic Decor
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
