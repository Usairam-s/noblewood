"use client";

import { Star, Quote } from "lucide-react";
import { useState } from "react";

export default function TestimonialsSection() {
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Ahmed Hassan",
      product: "10-Slot Watch Box",
      rating: 5,
      review:
        "Absolutely stunning craftsmanship! The sheesham wood quality is exceptional and the golden buttons add such an elegant touch. Worth every rupee.",
      location: "Karachi",
    },
    {
      id: 2,
      name: "Fatima Malik",
      product: "Ayatul Kursi Wall Art",
      rating: 5,
      review:
        "This piece transformed my living room. The intricate carving is breathtaking and you can feel the quality. My guests always compliment it!",
      location: "Lahore",
    },
    {
      id: 3,
      name: "Bilal Raza",
      product: "Jewelry Box Set",
      rating: 5,
      review:
        "Bought this as a gift for my wife and she absolutely loves it. The attention to detail is remarkable. Highly recommend NobleWood!",
      location: "Islamabad",
    },
    {
      id: 4,
      name: "Ayesha Khan",
      product: "Kitchen Spice Organizer",
      rating: 5,
      review:
        "Beautiful and functional! The wood finish is smooth and the compartments are perfectly sized. Best purchase for my kitchen.",
      location: "Faisalabad",
    },
    {
      id: 5,
      name: "Usman Ali",
      product: "5-Watch Display Box",
      rating: 5,
      review:
        "Premium quality at a reasonable price. The acrylic glass is crystal clear and the wood smells amazing. Very satisfied customer!",
      location: "Multan",
    },
    {
      id: 6,
      name: "Zainab Tariq",
      product: "Wooden Serving Tray",
      rating: 5,
      review:
        "Exceeded my expectations! The craftsmanship is top-notch and it's perfect for serving guests. Truly handmade with love.",
      location: "Peshawar",
    },
  ];

  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-3">
            What Our Customers Say
          </h2>
          <p className="text-gray-600">
            Real reviews from real customers across Pakistan
          </p>
        </div>

        {/* Outer wrapper: clips overflow AND holds the fade overlays */}
        <div className="relative overflow-hidden">
          {/* Left fade — sits on top of the scroll track, outside it */}
          <div
            className="absolute left-0 top-0 bottom-0 w-48 pointer-events-none z-10"
            style={{
              background: "linear-gradient(to right, white 40%, transparent)",
            }}
          />
          {/* Right fade */}
          <div
            className="absolute right-0 top-0 bottom-0 w-48 pointer-events-none z-10"
            style={{
              background: "linear-gradient(to left, white 40%, transparent)",
            }}
          />

          {/* Scroll track — no overflow, no relative positioning */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                width: "max-content",
                animation: isPaused ? "none" : "scroll 40s linear infinite",
              }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="flex-shrink-0 w-[400px] bg-[#F5EDE0] p-8 border-l-4 border-[#654321] hover:shadow-xl transition-all duration-700 ease-out hover:scale-[1.02]"
                >
                  <Quote className="w-10 h-10 text-[#C4A574] mb-4" />

                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= testimonial.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-700 text-base leading-relaxed mb-6 italic">
                    "{testimonial.review}"
                  </p>

                  <div className="border-t border-[#C4A574] pt-4">
                    <p className="font-bold text-black text-lg">
                      {testimonial.name}
                    </p>
                    <p className="text-[#8B6F47] text-sm font-medium">
                      Purchased: {testimonial.product}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      {testimonial.location}, Pakistan
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          Hover to pause • Auto-scrolling testimonials
        </p>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
