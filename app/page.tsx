import Image from "next/image";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import CollectionsSection from "@/components/collections-section";
import ProductsSection from "@/components/products-section";
import FeaturedSection from "@/components/featured-section";
import TestimonialsSection from "@/components/testimonials-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <CollectionsSection />
      <ProductsSection />
      <FeaturedSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
