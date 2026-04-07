"use client";

import { Search, ShoppingCart, Truck, DollarSign, TreePine } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [cartCount] = useState(0);

  return (
    <header className="bg-[#1a0f0a] text-white">
      {/* Row 1 */}
      <div className="py-2 text-center text-sm">
        <div className="flex items-center justify-center gap-6 flex-wrap px-4">
          <span className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Free delivery on orders Rs.5,000+
          </span>
          <span className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Rs. 500 advance for confirmation. Orders above Rs. 5,000 require 20% advance.
          </span>
        </div>
      </div>

      {/* Row 2 */}
      <div className="py-2 text-center text-sm">
        <div className="flex items-center justify-center gap-2">
          <TreePine className="w-4 h-4" />
          100% authentic sheesham wood — handmade in Pakistan 🇵🇰
        </div>
      </div>

      {/* Row 3 */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 text-xl font-bold">
            <span>Noble</span>
            <span className="bg-white text-black px-2 py-0.5 rounded">Wood</span>
          </Link>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="relative group py-1">
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/collection-1" className="relative group py-1">
              <span>Collection 1</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/collection-2" className="relative group py-1">
              <span>Collection 2</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/collection-3" className="relative group py-1">
              <span>Collection 3</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/collection-4" className="relative group py-1">
              <span>Collection 4</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Search & Cart */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-[#2d1f17] text-white px-4 py-2 border border-[#4a3a2e] focus:outline-none focus:border-white/50 w-64"
              />
            </div>
            <button className="md:hidden hover:text-white/80 transition">
              <Search className="w-5 h-5" />
            </button>
            <button className="relative border border-white/30 px-4 py-2 hover:bg-white/10 transition flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm">Cart</span>
              {cartCount > 0 && (
                <span className="bg-white text-[#1a0f0a] text-xs font-bold px-1.5 py-0.5">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center gap-4 mt-4 overflow-x-auto text-sm">
          <Link href="/" className="hover:text-white/80 transition whitespace-nowrap">Home</Link>
          <Link href="/collection-1" className="hover:text-white/80 transition whitespace-nowrap">Collection 1</Link>
          <Link href="/collection-2" className="hover:text-white/80 transition whitespace-nowrap">Collection 2</Link>
          <Link href="/collection-3" className="hover:text-white/80 transition whitespace-nowrap">Collection 3</Link>
          <Link href="/collection-4" className="hover:text-white/80 transition whitespace-nowrap">Collection 4</Link>
        </nav>
      </div>
    </header>
  );
}
