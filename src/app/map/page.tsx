import { InteractiveMap } from '@/components/map/interactive-map';
import { properties } from '@/lib/data';

export default function MapPage() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <div>
      <h1 className="text-4xl font-headline mb-4">Explore Properties on Map</h1>
      <p className="text-muted-foreground mb-6">Click on a marker to see property details and get a bird's-eye view of your next home.</p>
      <div className="h-[70vh] w-full rounded-lg overflow-hidden shadow-lg border">
        {apiKey ? (
          <InteractiveMap properties={properties} apiKey={apiKey} />
        ) : (
          <div className="flex items-center justify-center h-full bg-secondary">
            <p className="text-center text-muted-foreground">
              Google Maps API key is missing. <br /> Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
