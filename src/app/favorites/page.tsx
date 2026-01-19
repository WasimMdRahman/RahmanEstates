"use client";

import { useMemo } from "react";
import { useFavorites } from "@/hooks/use-favorites";
import { properties as allProperties } from "@/lib/data";
import { PropertyCard } from "@/components/properties/property-card";
import { Heart, SearchX } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FavoritesPage() {
  const { favorites, isInitialized } = useFavorites();

  const favoriteProperties = useMemo(() => {
    return allProperties.filter((property) => favorites.includes(property.id));
  }, [favorites]);

  if (!isInitialized) {
    // Show a loading state until favorites are loaded from localStorage
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="w-10 h-10 text-red-500" />
        <h1 className="text-4xl font-headline">Favorite Properties</h1>
      </div>

      {favoriteProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <SearchX className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-headline mb-2">No Favorites Yet</h2>
          <p className="text-muted-foreground mb-4">
            Click the heart icon on any property to save it here.
          </p>
          <Button asChild>
            <Link href="/">Browse Properties</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
