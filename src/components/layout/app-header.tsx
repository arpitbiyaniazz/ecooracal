import { Droplet } from 'lucide-react';
import Link from 'next/link';

const AppHeader = () => {
  return (
    <header className="py-4 md:py-6 px-4 md:px-8 border-b border-border/80 shadow-sm bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Droplet className="h-7 w-7 md:h-8 md:w-8 text-primary group-hover:animate-pulse" />
          <h1 className="text-2xl md:text-3xl font-headline text-primary group-hover:text-primary/90 transition-colors">
            AquaWise
          </h1>
        </Link>
        {/* Navigation items can be added here if needed */}
      </div>
    </header>
  );
};

export default AppHeader;
