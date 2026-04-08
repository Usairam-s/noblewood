"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    "https://pidocv4207.ufs.sh/f/gYC2yQmQ9rl44irOawCOQ3VNSWAT9KqE0Zfkvaur61wdFyUz",
    "https://pidocv4207.ufs.sh/f/gYC2yQmQ9rl4eLRIFuCja8W5BZ1P0YsiTm46E3gwcdvbLeDA",
    "https://pidocv4207.ufs.sh/f/gYC2yQmQ9rl4COyyNhWOIgZxQcempGH5Srz2KjwosyqNXPf4"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

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

      {/* Right Side - Image Slider */}
      <div className="w-full lg:w-1/2 bg-[#2A1500] relative overflow-hidden">
        {/* Slider Images */}
        <div className="relative h-full min-h-[500px] lg:min-h-[600px]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={slide}
                alt={`Wooden product ${index + 1}`}
                fill
                sizes="50vw"
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A1500]/80 via-transparent to-transparent" />
        </div>

        {/* Dots Navigation */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide
                  ? 'w-12 h-3 bg-[#C4A574]'
                  : 'w-3 h-3 bg-white/50 hover:bg-white/80'
              } rounded-full`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Product Showcase Label */}
        <div className="absolute top-8 left-8 right-8 z-10">
          <div className="bg-black/50 backdrop-blur-sm px-6 py-3 inline-block">
            <p className="text-[#C4A574] text-sm font-medium tracking-wider">
              HANDCRAFTED EXCELLENCE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
