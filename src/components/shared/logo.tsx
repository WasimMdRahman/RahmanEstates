import Link from "next/link";
import { Home } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <Home className="h-7 w-7 text-accent" />
      <span className="text-xl font-headline font-bold text-primary">
        Rahman Estates
      </span>
    </Link>
  );
}
