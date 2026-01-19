"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FavoriteButtonProps = {
  isFavorited: boolean;
  onClick: () => void;
  className?: string;
};

export function FavoriteButton({ isFavorited, onClick, className }: FavoriteButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("rounded-full hover:bg-red-100/50 dark:hover:bg-red-900/20", className)}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
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
