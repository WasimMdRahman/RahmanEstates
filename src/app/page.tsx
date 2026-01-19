"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { agents, properties as allProperties, testimonials } from "@/lib/data";
import type { Property } from "@/lib/types";
import { PropertyCard } from "@/components/properties/property-card";
import { PropertyFilters } from "@/components/properties/property-filters";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { AgentCard } from "@/components/agents/agent-card";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { TestimonialCard } from "@/components/testimonials/testimonial-card";
import { ContactForm } from "@/components/contact/contact-form";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    minPrice: 0,
    maxPrice: 5000000,
    bedrooms: "all",
  });

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

  const autoplayPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [propertyCarouselApi, setPropertyCarouselApi] = useState<CarouselApi>();
  const [propertyCurrent, setPropertyCurrent] = useState(0);


  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    setCurrent(carouselApi.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(carouselApi.selectedScrollSnap());
    };

    carouselApi.on("select", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);
  
  useEffect(() => {
    if (!propertyCarouselApi) {
      return;
    }
    setPropertyCurrent(propertyCarouselApi.selectedScrollSnap());
    const onSelect = () => {
      setPropertyCurrent(propertyCarouselApi.selectedScrollSnap());
    };
    propertyCarouselApi.on("select", onSelect);
    return () => {
      propertyCarouselApi.off("select", onSelect);
    };
  }, [propertyCarouselApi]);


  return (
    <div className="space-y-24">
      {/* Welcome Section */}
      <section className="relative h-[60vh] overflow-hidden">
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
      <section className="w-full bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-12 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
                <h2 className="text-4xl font-headline text-accent">About Rahman Estates</h2>
                <p className="text-primary-foreground/80 leading-relaxed">
                Welcome to Rahman Estates, where we turn your real estate dreams into reality. Founded on the principles of integrity, transparency, and unparalleled service, we have been a trusted name in the property market for over two decades. Our dedicated team of experts is committed to providing a seamless and personalized experience for every client.
                </p>
                <p className="text-primary-foreground/80 leading-relaxed">
                Whether you are buying your first home, seeking a luxury waterfront villa, or investing in commercial properties, we have the expertise and resources to guide you every step of the way. At Rahman Estates, we don't just sell properties; we build lifelong relationships.
                </p>
                <Button asChild variant="secondary" >
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
        </div>
      </section>
      
      {/* Properties Section */}
      <section id="properties" className="scroll-mt-20">
        <div className="container mx-auto px-4">
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
                  <Carousel
                    setApi={setPropertyCarouselApi}
                    opts={{
                      loop: true,
                      align: "center",
                    }}
                    className="w-full"
                  >
                    <CarouselContent className="-ml-4">
                      {filteredProperties.map((property, index) => (
                        <CarouselItem
                          key={property.id}
                          className={cn(
                            "pl-4 md:basis-1/2 lg:basis-1/3"
                          )}
                        >
                          <div
                            className={cn("h-full transition-transform duration-500", {
                              "scale-105 z-10": index === propertyCurrent,
                              "scale-90 opacity-70": index !== propertyCurrent,
                            })}
                          >
                            <PropertyCard property={property} />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                ) : (
                  <p>No properties match your current filters. Try broadening your search.</p>
                )}
            </main>
            </div>
        </div>
      </section>
      
      {/* Agents Section */}
      <section className="w-full bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-12 md:py-24">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-headline text-accent">Meet Our Expert Agents</h2>
                <p className="text-primary-foreground/80 mt-2 max-w-2xl mx-auto">Our team of experienced and dedicated real estate agents is here to help you find your perfect property.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {agents.slice(0, 3).map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
                ))}
            </div>
            <div className="text-center mt-12">
                <Button asChild size="lg" variant="secondary">
                    <Link href="/agents">
                        View All Agents <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="overflow-x-hidden">
        <div className="container mx-auto px-4 py-12 md:py-24">
            <div className="text-center mb-12">
            <h2 className="text-4xl font-headline text-primary">
                What Our Clients Say
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Real stories from satisfied homeowners who found their dream
                properties with us.
            </p>
            </div>
            <Carousel
            setApi={setCarouselApi}
            plugins={[autoplayPlugin.current]}
            opts={{
                loop: true,
                align: "center",
            }}
            className="w-full max-w-6xl mx-auto"
            >
            <CarouselContent className="-ml-4">
                {testimonials.map((testimonial, index) => (
                <CarouselItem
                    key={testimonial.id}
                    className={cn(
                    "pl-4 md:basis-1/2 lg:basis-1/3 transition-all duration-500 ease-in-out"
                    )}
                >
                    <div
                    className={cn("h-full transition-transform duration-500", {
                        "scale-105": index === current,
                        "scale-90 opacity-70": index !== current,
                    })}
                    >
                    <TestimonialCard testimonial={testimonial} />
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
            </Carousel>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="w-full bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-12 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                    <h2 className="text-4xl font-headline text-accent">Get In Touch</h2>
                    <p className="text-primary-foreground/80 leading-relaxed">
                        Have a question or ready to start your real estate journey? Our team is here to help. Contact us today, and let's turn your property goals into reality.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <MapPin className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold">Our Office</h3>
                                <p className="text-primary-foreground/80">123 Real Estate Ave, Suite 100<br/>Beverly Hills, CA 90210</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Mail className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold">Email Us</h3>
                                <a href="mailto:contact@rahmanestates.com" className="text-primary-foreground/80 hover:text-accent">contact@rahmanestates.com</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Phone className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold">Call Us</h3>
                                <a href="tel:+1-800-555-1234" className="text-primary-foreground/80 hover:text-accent">+1 (800) 555-1234</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <ContactForm />
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
