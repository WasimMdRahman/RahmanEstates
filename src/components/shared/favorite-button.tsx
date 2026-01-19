"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/hooks/use-favorites";

type FavoriteButtonProps = {
  propertyId: string;
  className?: string;
};

export function FavoriteButton({ propertyId, className }: FavoriteButtonProps) {
  const { favorites, toggleFavorite, isInitialized } = useFavorites();

  if (!isInitialized) {
    // Return a disabled, non-interactive placeholder to prevent hydration mismatch.
    return (
      <Button
        variant="ghost"
        size="icon"
        disabled
        className={cn("rounded-full", className)}
        aria-label="Loading favorites"
      >
        <Heart className="h-5 w-5 text-gray-300 dark:text-gray-600" />
      </Button>
    );
  }

  const isFavorited = favorites.includes(propertyId);

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("rounded-full hover:bg-red-100/50 dark:hover:bg-red-900/20", className)}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(propertyId);
      }}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-all duration-300",
          isFavorited
            ? "fill-red-500 text-red-500"
            : "text-gray-400"
        )}
      />
    </Button>
  );
}
