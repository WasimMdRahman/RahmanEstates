import Image from "next/image";
import Link from "next/link";
import type { Agent } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

type AgentCardProps = {
  agent: Agent;
};

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <Card className="flex flex-col text-center items-center p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Avatar className="w-32 h-32 mb-4 border-4 border-accent">
        <AvatarImage src={agent.image} alt={agent.name} data-ai-hint="person portrait" />
        <AvatarFallback>{agent.name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <CardHeader className="p-0 mb-2">
        <h3 className="text-2xl font-headline">{agent.name}</h3>
        <p className="text-sm text-muted-foreground">{agent.title}</p>
      </CardHeader>
      <CardContent className="p-0 flex-grow">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 min-h-[60px]">{agent.bio}</p>
        <div className="flex justify-center gap-4 text-accent mb-4">
           <a href={`mailto:${agent.email}`} className="hover:text-primary"><Mail /></a>
           <a href={`tel:${agent.phone}`} className="hover:text-primary"><Phone /></a>
        </div>
      </CardContent>
      <Button asChild variant="outline" className="mt-auto">
        <Link href={`/agents/${agent.id}`} prefetch={false}>
          View Profile <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </Card>
  );
}
