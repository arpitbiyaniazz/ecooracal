import { BarChart } from 'lucide-react';
import AppHeader from '@/components/layout/app-header';
import AppFooter from '@/components/layout/app-footer';
import { HouseholdDataForm } from '@/components/aqua-wise/household-data-form';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="text-center mb-10 md:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-headline text-primary mb-4 leading-tight">
            Save Water, Save Money, Save the Planet
          </h2>
          <p className="text-lg md:text-xl font-body text-foreground/80 max-w-3xl mx-auto">
            AquaWise provides personalized, AI-powered recommendations to help you reduce your household water consumption.
            Enter your details below to get smart tips tailored just for you.
          </p>
        </section>

        <div className="max-w-2xl mx-auto mb-16 md:mb-24">
          <HouseholdDataForm />
        </div>

        <section id="progress-tracking" className="p-6 md:p-8 bg-card rounded-lg shadow-lg border-border/80">
           <h3 className="text-2xl md:text-3xl font-headline text-foreground mb-4 text-center">
             Future: Track Your Progress & Goals
           </h3>
           <p className="text-muted-foreground font-body text-center max-w-xl mx-auto">
              Soon, you'll be able to set water reduction goals and visualize your progress with insightful charts. AquaWise is committed to helping you make a lasting impact. Stay tuned!
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
