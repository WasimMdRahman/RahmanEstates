import { Logo } from "@/components/shared/logo";

export function Footer() {
  return (
    <footer className="border-t bg-secondary">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Logo />
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} Rahman Estates. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
