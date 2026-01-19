import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[60vh]">
      <SearchX className="w-24 h-24 text-accent mb-4" />
      <h1 className="text-6xl font-headline mb-2">404 - Page Not Found</h1>
      <p className="text-lg text-muted-foreground mb-6">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/">Return to Homepage</Link>
      </Button>
    </div>
  );
}
