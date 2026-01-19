"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import type { Property } from "@/lib/types";
import { Button } from "@/components/ui/button";

type InteractiveMapProps = {
  properties: Property[];
  apiKey: string;
};

export function InteractiveMap({ properties, apiKey }: InteractiveMapProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const center = { lat: 34.052235, lng: -118.243683 }; // Default center (Los Angeles)

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultCenter={center}
        defaultZoom={5}
        mapId="rahman_estates_map"
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        {properties.map((property) => (
          <AdvancedMarker
            key={property.id}
            position={property.coordinates}
            onClick={() => setSelectedProperty(property)}
          >
            <Pin
              background={"hsl(var(--primary))"}
              borderColor={"hsl(var(--primary-foreground))"}
              glyphColor={"hsl(var(--primary-foreground))"}
            />
          </AdvancedMarker>
        ))}
        {selectedProperty && (
          <InfoWindow
            position={selectedProperty.coordinates}
            onCloseClick={() => setSelectedProperty(null)}
          >
            <div className="w-64 p-2">
              <Image
                src={selectedProperty.images[0]}
                alt={selectedProperty.title}
                width={256}
                height={150}
                className="w-full h-32 object-cover rounded-md mb-2"
                data-ai-hint="house exterior"
              />
              <h3 className="font-headline text-lg truncate">{selectedProperty.title}</h3>
              <p className="text-sm text-muted-foreground">{selectedProperty.location}</p>
              <p className="font-bold text-base my-1">${selectedProperty.price.toLocaleString()}</p>
              <Button asChild size="sm" className="w-full mt-2">
                <Link href={`/${selectedProperty.id}`} prefetch={false}>View Details</Link>
              </Button>
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
}
