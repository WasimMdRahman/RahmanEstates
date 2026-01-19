"use client";

import { useState, useMemo } from "react";
import { properties as allProperties } from "@/lib/data";
import type { Property } from "@/lib/types";
import { PropertyCard } from "@/components/properties/property-card";
import { PropertyFilters } from "@/components/properties/property-filters";
import { useFavorites } from "@/hooks/use-favorites";

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <aside className="lg:col-span-1">
        <div className="sticky top-24">
          <h2 className="text-2xl font-headline mb-4">Filter Properties</h2>
          <PropertyFilters filters={filters} setFilters={setFilters} />
        </div>
      </aside>
      <section className="lg:col-span-3">
        <h1 className="text-4xl font-headline mb-6">Our Properties</h1>
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
      </section>
    </div>
  );
}
