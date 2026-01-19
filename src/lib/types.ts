export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  description: string;
  propertyType: "House" | "Apartment" | "Condo" | "Villa";
  amenities: string[];
  uniqueFeatures: string;
  images: string[];
  agentId: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  bio: string;
  image: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  location: string;
  image: string;
}
