import Image from "next/image";
import type { Testimonial } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="flex flex-col h-full text-center items-center p-8 bg-secondary border-0 shadow-lg">
      <CardContent className="p-0 flex flex-col items-center">
        <div className="flex text-yellow-400 mb-4">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
        </div>
        <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
        <div className="flex items-center gap-4 w-full">
            <Avatar className="w-14 h-14">
                <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint="person smiling" />
                <AvatarFallback>{testimonial.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="text-left">
                <h4 className="font-bold text-lg">{testimonial.name}</h4>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
