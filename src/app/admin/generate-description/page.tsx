"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wand2, Loader2 } from "lucide-react";
import { generateDescriptionAction } from "./actions";

const formSchema = z.object({
  propertyType: z.string().min(1, "Property type is required"),
  bedrooms: z.coerce.number().int().min(1, "Must have at least 1 bedroom"),
  bathrooms: z.coerce.number().min(1, "Must have at least 1 bathroom"),
  location: z.string().min(1, "Location is required"),
  amenities: z.string().min(1, "List at least one amenity"),
  uniqueFeatures: z.string().min(1, "Describe at least one unique feature"),
  price: z.coerce.number().min(1, "Price is required"),
  squareFootage: z.coerce.number().min(1, "Square footage is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function GenerateDescriptionPage() {
  const [generatedDescription, setGeneratedDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyType: "House",
      bedrooms: 3,
      bathrooms: 2,
      location: "Miami, FL",
      amenities: "Swimming pool, Gym, Parking",
      uniqueFeatures: "Balcony with a view",
      price: 500000,
      squareFootage: 1500,
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setError(null);
    setGeneratedDescription("");

    const result = await generateDescriptionAction(values);

    if (result.success && result.description) {
      setGeneratedDescription(result.description);
    } else {
      setError(result.error || "An unexpected error occurred.");
    }
    setIsLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-headline">AI Property Description Generator</h1>
        <p className="text-muted-foreground mt-2">
          Fill in the property details below and let our AI craft a compelling description for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
            <CardDescription>Enter the key features of the property.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type</FormLabel>
                      <FormControl><Input placeholder="e.g., House, Apartment" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="bedrooms" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bedrooms</FormLabel>
                      <FormControl><Input type="number" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="bathrooms" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bathrooms</FormLabel>
                      <FormControl><Input type="number" step="0.5" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="price" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl><Input type="number" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="squareFootage" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sq. Footage</FormLabel>
                      <FormControl><Input type="number" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="location" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl><Input placeholder="e.g., Miami, FL" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="amenities" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Key Amenities</FormLabel>
                    <FormControl><Textarea placeholder="e.g., Swimming pool, gym, parking" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="uniqueFeatures" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unique Features</FormLabel>
                    <FormControl><Textarea placeholder="e.g., Balcony with a view, renovated kitchen" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                  )}
                  Generate Description
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Description</CardTitle>
            <CardDescription>The AI-generated description will appear below.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            {error && <p className="text-destructive">{error}</p>}
            {generatedDescription && (
              <Textarea
                readOnly
                value={generatedDescription}
                className="min-h-[300px] bg-secondary text-base"
                aria-label="Generated property description"
              />
            )}
            {!isLoading && !error && !generatedDescription && (
              <div className="flex items-center justify-center text-center text-muted-foreground h-full p-8 border-2 border-dashed rounded-lg">
                Your generated description will appear here.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
