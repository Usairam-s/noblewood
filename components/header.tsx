"use client";

import { Search, ShoppingCart, Truck, DollarSign, TreePine } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [cartCount] = useState(0);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetch('/api/collections')
      .then(res => res.json())
      .then(data => setCollections(data.collections || []));
  }, []);

  return (
    <header className="bg-[#1a0f0a] text-white">
      {/* Row 1 */}
      <div className="py-2 text-center text-sm">
        <div className="flex items-center justify-center gap-2">
          <TreePine className="w-4 h-4" />
          100% authentic sheesham wood — handmade in Pakistan 🇵🇰
        </div>
      </div>

      {/* Row 2 */}
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
            {collections.map((collection: any) => (
              <Link 
                key={collection._id} 
                href={`/products?collection=${encodeURIComponent(collection.name)}`} 
                className="relative group py-1"
              >
                <span>{collection.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
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
          {collections.map((collection: any) => (
            <Link 
              key={collection._id} 
              href={`/products?collection=${encodeURIComponent(collection.name)}`} 
              className="hover:text-white/80 transition whitespace-nowrap"
            >
              {collection.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
