
import { Leaf } from 'lucide-react'; // Changed from Droplet to Leaf
import Link from 'next/link';

const AppHeader = () => {
  return (
    <header className="py-4 md:py-6 px-4 md:px-8 border-b border-border/80 shadow-sm bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Leaf className="h-7 w-7 md:h-8 md:w-8 text-primary group-hover:animate-pulse" /> {/* Changed icon */}
          <h1 className="text-3xl md:text-4xl font-headline text-primary group-hover:text-primary/90 transition-colors">
            EcoOracle
          </h1> {/* Changed name */}
        </Link>
        {/* Navigation items can be added here if needed */}
      </div>
    </header>
  );
};

export default AppHeader;
