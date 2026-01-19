"use client";

import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, MapPin, Maximize } from "lucide-react";
import type { Property } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/shared/favorite-button";

type PropertyCardProps = {
  property: Property;
};

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/${property.id}`} prefetch={false}>
        <div className="relative">
          <Image
            src={property.images[0]}
            alt={property.title}
            width={600}
            height={400}
            className="w-full h-64 object-cover"
            data-ai-hint="house exterior"
          />
          <Badge
            variant="secondary"
            className="absolute top-2 left-2 bg-background/80"
          >
            {property.propertyType}
          </Badge>
          <div className="absolute top-1 right-1">
            <FavoriteButton propertyId={property.id} />
          </div>
        </div>
      </Link>
      <Link href={`/${property.id}`} className="flex flex-col flex-grow" prefetch={false}>
        <CardHeader>
          <CardTitle className="font-headline text-2xl truncate">{property.title}</CardTitle>
          <CardDescription className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {property.location}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-2xl font-bold text-primary">
            ${property.price.toLocaleString()}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground border-t pt-4 mt-auto">
          <div className="flex items-center gap-2">
            <BedDouble className="w-5 h-5 text-accent" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-5 h-5 text-accent" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-2">
            <Maximize className="w-4 h-4 text-accent" />
            <span>{property.squareFootage.toLocaleString()} sqft</span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
