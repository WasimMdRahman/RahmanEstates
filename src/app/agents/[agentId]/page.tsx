"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { agents, properties } from "@/lib/data";
import { Mail, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PropertyCard } from "@/components/properties/property-card";

export default function AgentProfilePage({
  params,
}: {
  params: { agentId: string };
}) {
  const agent = agents.find((a) => a.id === params.agentId);
  if (!agent) {
    notFound();
  }

  const agentProperties = properties.filter((p) => p.agentId === agent.id);

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="overflow-hidden mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-1">
            <Image
              src={agent.image}
              alt={agent.name}
              width={400}
              height={400}
              className="w-full h-full object-cover"
              data-ai-hint="person portrait"
            />
          </div>
          <div className="md:col-span-2 p-8 flex flex-col justify-center">
            <h1 className="text-4xl font-headline mb-1">{agent.name}</h1>
            <p className="text-lg text-accent font-semibold mb-4">{agent.title}</p>
            <p className="text-muted-foreground mb-6">{agent.bio}</p>
            <Separator />
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6">
              <a href={`mailto:${agent.email}`} className="flex items-center gap-2 hover:text-accent">
                <Mail className="w-5 h-5" />
                <span>{agent.email}</span>
              </a>
              <a href={`tel:${agent.phone}`} className="flex items-center gap-2 hover:text-accent">
                <Phone className="w-5 h-5" />
                <span>{agent.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </Card>

      <h2 className="text-3xl font-headline mb-6">
        {agent.name}&apos;s Listings
      </h2>
      {agentProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agentProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          {agent.name} currently has no active listings.
        </p>
      )}
    </div>
  );
}
