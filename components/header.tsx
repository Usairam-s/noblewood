"use client";

import { Search, ShoppingCart, Truck, DollarSign, TreePine } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/contexts/CartContext";

export default function Header() {
  const [collections, setCollections] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount, openCart } = useCart();

  useEffect(() => {
    fetch('/api/collections')
      .then(res => res.json())
      .then(data => setCollections(data.collections || []));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

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
            {collections.length > 0 ? (
              collections.map((collection: any) => (
                <Link 
                  key={collection._id} 
                  href={`/products?collection=${encodeURIComponent(collection.name)}`} 
                  className="relative group py-1"
                >
                  <span>{collection.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))
            ) : (
              // Hardcoded collections as fallback
              <>
                <Link href="/products?collection=Jewelry Box" className="relative group py-1">
                  <span>Jewelry Box</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link href="/products?collection=Watch Box" className="relative group py-1">
                  <span>Watch Box</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link href="/products?collection=Kitchen Items" className="relative group py-1">
                  <span>Kitchen Items</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link href="/products?collection=Gift Sets" className="relative group py-1">
                  <span>Gift Sets</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </>
            )}
          </nav>

          {/* Search & Cart */}
          <div className="flex items-center gap-3">
            <form onSubmit={handleSearch} className="hidden md:block relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products... (Press Enter)"
                className="bg-[#2d1f17] text-white px-4 py-2 border border-[#4a3a2e] focus:outline-none focus:border-white/50 w-64"
              />
            </form>
            <button 
              onClick={() => {
                const query = prompt("Search products:");
                if (query?.trim()) {
                  window.location.href = `/products?search=${encodeURIComponent(query.trim())}`;
                }
              }}
              className="md:hidden hover:text-white/80 transition"
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={openCart}
              className="relative border border-white/30 px-4 py-2 hover:bg-white/10 transition flex items-center gap-2"
            >
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
          {collections.length > 0 ? (
            collections.map((collection: any) => (
              <Link 
                key={collection._id} 
                href={`/products?collection=${encodeURIComponent(collection.name)}`} 
                className="hover:text-white/80 transition whitespace-nowrap"
              >
                {collection.name}
              </Link>
            ))
          ) : (
            // Hardcoded collections as fallback
            <>
              <Link href="/products?collection=Jewelry Box" className="hover:text-white/80 transition whitespace-nowrap">Jewelry Box</Link>
              <Link href="/products?collection=Watch Box" className="hover:text-white/80 transition whitespace-nowrap">Watch Box</Link>
              <Link href="/products?collection=Kitchen Items" className="hover:text-white/80 transition whitespace-nowrap">Kitchen Items</Link>
              <Link href="/products?collection=Gift Sets" className="hover:text-white/80 transition whitespace-nowrap">Gift Sets</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
