"use client";

import { Mail, Phone, MapPin, Share2, MessageCircle, Send } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1a0f0a] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-1 text-2xl font-bold mb-4">
              <span>Noble</span>
              <span className="bg-white text-[#1a0f0a] px-2 py-0.5 rounded">Wood</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Pakistan's premier handmade wooden furniture store. Crafting authentic sheesham wood products with love and precision since day one.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-[#654321] transition flex items-center justify-center">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-[#654321] transition flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-[#654321] transition flex items-center justify-center">
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#C4A574]">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/bestsellers" className="text-gray-400 hover:text-white transition text-sm">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#C4A574]">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/jewelry-box" className="text-gray-400 hover:text-white transition text-sm">
                  Jewelry Boxes
                </Link>
              </li>
              <li>
                <Link href="/watch-box" className="text-gray-400 hover:text-white transition text-sm">
                  Watch Boxes
                </Link>
              </li>
              <li>
                <Link href="/kitchen-items" className="text-gray-400 hover:text-white transition text-sm">
                  Kitchen Items
                </Link>
              </li>
              <li>
                <Link href="/gift-sets" className="text-gray-400 hover:text-white transition text-sm">
                  Gift Sets
                </Link>
              </li>
              <li>
                <Link href="/islamic-decor" className="text-gray-400 hover:text-white transition text-sm">
                  Islamic Décor
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#C4A574]">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C4A574] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  123 Wooden Street, Karachi, Pakistan
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#C4A574] flex-shrink-0" />
                <a href="tel:+923001234567" className="text-gray-400 hover:text-white transition text-sm">
                  +92 300 1234567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#C4A574] flex-shrink-0" />
                <a href="mailto:info@noblewood.pk" className="text-gray-400 hover:text-white transition text-sm">
                  info@noblewood.pk
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 NobleWood. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition text-sm">
                Terms & Conditions
              </Link>
              <Link href="/shipping" className="text-gray-400 hover:text-white transition text-sm">
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
