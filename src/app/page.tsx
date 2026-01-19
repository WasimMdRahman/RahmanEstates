"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { agents, properties as allProperties } from "@/lib/data";
import type { Property } from "@/lib/types";
import { PropertyCard } from "@/components/properties/property-card";
import { PropertyFilters } from "@/components/properties/property-filters";
import { useFavorites } from "@/hooks/use-favorites";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { AgentCard } from "@/components/agents/agent-card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    minPrice: 0,
    maxPrice: 5000000,
    bedrooms: "all",
  });
  
  const { favorites } = useFavorites();

  const filteredProperties = useMemo(() => {
    return allProperties.filter((property: Property) => {
      const { search, type, minPrice, maxPrice, bedrooms } = filters;
      if (
        search &&
        !property.title.toLowerCase().includes(search.toLowerCase()) &&
        !property.location.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }
      if (type !== "all" && property.propertyType !== type) {
        return false;
      }
      if (property.price < minPrice || property.price > maxPrice) {
        return false;
      }
      if (bedrooms !== "all" && property.bedrooms < parseInt(bedrooms)) {
        return false;
      }
      return true;
    });
  }, [filters]);
  
  const heroImage = PlaceHolderImages.find(img => img.id === 'property-1-1');
  const aboutImage = PlaceHolderImages.find(img => img.id === 'property-4-1');

  return (
    <div className="space-y-24">
      {/* Welcome Section */}
      <section className="relative h-[60vh] rounded-lg overflow-hidden -mt-8">
        <Image
          src={heroImage?.imageUrl || "/placeholder.jpg"}
          alt={heroImage?.description || "Luxury house"}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage?.imageHint || "house exterior"}
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 drop-shadow-lg">
            Find Your Dream Home
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8 drop-shadow">
            With Rahman Estates, the key to your new beginning is just a click away. Explore our exclusive listings and find the perfect place to call home.
          </p>
          <Button size="lg" asChild>
            <Link href="#properties">Browse Properties</Link>
          </Button>
        </div>
      </section>

      {/* About Us Section */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-4xl font-headline text-primary">About Rahman Estates</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to Rahman Estates, where we turn your real estate dreams into reality. Founded on the principles of integrity, transparency, and unparalleled service, we have been a trusted name in the property market for over two decades. Our dedicated team of experts is committed to providing a seamless and personalized experience for every client.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether you are buying your first home, seeking a luxury waterfront villa, or investing in commercial properties, we have the expertise and resources to guide you every step of the way. At Rahman Estates, we don't just sell properties; we build lifelong relationships.
            </p>
            <Button asChild variant="outline">
              <Link href="/agents">Meet Our Team</Link>
            </Button>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
             <Image
              src={aboutImage?.imageUrl || "/placeholder.jpg"}
              alt={aboutImage?.description || "Luxury condo"}
              width={600}
              height={400}
              className="w-full h-auto object-cover"
              data-ai-hint={aboutImage?.imageHint || "luxury condo"}
            />
          </div>
        </div>
      </section>
      
      <Separator />

      {/* Properties Section */}
      <section id="properties" className="scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-3xl font-headline mb-4">Filter Properties</h2>
              <PropertyFilters filters={filters} setFilters={setFilters} />
            </div>
          </aside>
          <main className="lg:col-span-3">
            <h2 className="text-4xl font-headline mb-6">Our Properties</h2>
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isFavorited={favorites.includes(property.id)}
                  />
                ))}
              </div>
            ) : (
              <p>No properties match your current filters. Try broadening your search.</p>
            )}
          </main>
        </div>
      </section>

      <Separator />
      
      {/* Agents Section */}
      <section>
        <div className="text-center mb-12">
            <h2 className="text-4xl font-headline text-primary">Meet Our Expert Agents</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Our team of experienced and dedicated real estate agents is here to help you find your perfect property.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.slice(0, 3).map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
        </div>
        <div className="text-center mt-12">
            <Button asChild size="lg">
                <Link href="/agents">
                    View All Agents <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
