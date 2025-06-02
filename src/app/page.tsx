
import { BarChart, Droplet, Zap } from 'lucide-react'; // Added Droplet, Zap
import AppHeader from '@/components/layout/app-header';
import AppFooter from '@/components/layout/app-footer';
import { HouseholdDataForm } from '@/components/aqua-wise/household-data-form';
import { CarbonDataForm } from '@/components/carbon-couch/carbon-data-form'; // Added CarbonDataForm
import { Separator } from '@/components/ui/separator'; // Added Separator

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="text-center mb-10 md:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-headline text-primary mb-4 leading-tight">
            Live Smarter, Greener, Better
          </h2>
          <p className="text-lg md:text-xl font-body text-foreground/80 max-w-3xl mx-auto">
            EcoOracle provides personalized, AI-powered recommendations to help you reduce your household's environmental impact.
            Explore tips for water conservation and carbon footprint reduction below.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 mb-16 md:mb-24">
          <div>
            <h3 className="text-2xl md:text-3xl font-headline text-primary mb-3 flex items-center">
              <Droplet className="mr-3 h-7 w-7" />
              Water Conservation Center
            </h3>
            <p className="text-muted-foreground font-body mb-6">
              Enter your household's water usage details to get smart tips tailored just for you.
            </p>
            <HouseholdDataForm />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-headline text-accent-foreground mb-3 flex items-center">
              <Zap className="mr-3 h-7 w-7" /> {/* Or Footprints, Cloud */}
              Carbon Footprint Coach
            </h3>
            <p className="text-muted-foreground font-body mb-6">
              Describe your lifestyle to understand and reduce your carbon emissions.
            </p>
            <CarbonDataForm />
          </div>
        </div>
        
        <Separator className="my-12 md:my-16" />

        <section id="progress-tracking" className="p-6 md:p-8 bg-card rounded-lg shadow-lg border-border/80">
           <h3 className="text-2xl md:text-3xl font-headline text-foreground mb-4 text-center">
             Future: Track Your Eco-Progress & Goals
           </h3>
           <p className="text-muted-foreground font-body text-center max-w-xl mx-auto">
              Soon, you'll be able to set reduction goals for both water and carbon, and visualize your progress with insightful charts. EcoOracle is committed to helping you make a lasting impact. Stay tuned!
           </p>
           <div className="mt-6 flex justify-center">
              <BarChart className="w-10 h-10 md:w-12 md:h-12 text-primary opacity-60" />
           </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
