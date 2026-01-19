import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { properties, agents } from "@/lib/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import {
  BedDouble,
  Bath,
  Maximize,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export async function generateStaticParams() {
  return properties.map((property) => ({
    propertyId: property.id,
  }));
}

export default function PropertyDetailsPage({
  params,
}: {
  params: { propertyId: string };
}) {
  const property = properties.find((p) => p.id === params.propertyId);
  if (!property) {
    notFound();
  }

  const agent = agents.find((a) => a.id === property.agentId);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
          {property.title}
        </h1>
        <div className="flex items-center gap-2 mt-2 text-lg text-muted-foreground">
          <MapPin className="w-5 h-5" />
          <span>{property.address}</span>
        </div>
      </div>

      <Carousel className="w-full mb-8 rounded-lg overflow-hidden shadow-lg">
        <CarouselContent>
          {property.images.map((img, index) => (
            <CarouselItem key={index}>
              <Image
                src={img}
                alt={`${property.title} - view ${index + 1}`}
                width={1200}
                height={700}
                className="w-full h-auto object-cover aspect-[16/9]"
                priority={index === 0}
                data-ai-hint="house interior"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-3xl">
                Property Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-around items-center text-center p-4 rounded-lg bg-secondary">
                <div className="flex flex-col items-center gap-2">
                  <BedDouble className="w-8 h-8 text-accent" />
                  <span className="font-bold text-lg">{property.bedrooms}</span>
                  <span className="text-sm text-muted-foreground">Bedrooms</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Bath className="w-8 h-8 text-accent" />
                  <span className="font-bold text-lg">{property.bathrooms}</span>
                  <span className="text-sm text-muted-foreground">Bathrooms</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Maximize className="w-7 h-7 text-accent" />
                  <span className="font-bold text-lg">
                    {property.squareFootage.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">sqft</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-3xl">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed">{property.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-3xl">
                Amenities & Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-2 list-disc list-inside">
                {property.amenities.map((amenity, i) => (
                  <li key={i}>{amenity}</li>
                ))}
              </ul>
              <Separator className="my-6" />
              <h4 className="font-bold mb-2">Unique Feature</h4>
              <p>{property.uniqueFeatures}</p>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-3xl">Price</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary mb-6">
                ${property.price.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          {agent && (
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-3xl">
                  Contact Agent
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={agent.image} alt={agent.name} data-ai-hint="person portrait" />
                    <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-lg">{agent.name}</h4>
                    <p className="text-sm text-muted-foreground">{agent.title}</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <a href={`mailto:${agent.email}`} className="flex items-center gap-2 hover:text-accent">
                    <Mail className="w-4 h-4" />
                    <span>{agent.email}</span>
                  </a>
                  <a href={`tel:${agent.phone}`} className="flex items-center gap-2 hover:text-accent">
                    <Phone className="w-4 h-4" />
                    <span>{agent.phone}</span>
                  </a>
                </div>
                <Link href={`/agents/${agent.id}`} className="text-sm text-accent font-semibold hover:underline" prefetch={false}>
                  View agent profile & listings
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
