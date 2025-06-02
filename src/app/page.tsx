
import { BarChart, Droplet, Zap, Bolt } from 'lucide-react'; // Added Bolt
import AppHeader from '@/components/layout/app-header';
import AppFooter from '@/components/layout/app-footer';
import { HouseholdDataForm } from '@/components/aqua-wise/household-data-form';
import { CarbonDataForm } from '@/components/carbon-couch/carbon-data-form';
import { ElectricityDataForm } from '@/components/electricity-coach/electricity-data-form'; // Added ElectricityDataForm
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="text-center mb-10 md:mb-16">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-headline text-primary mb-4 leading-tight">
            Live Smarter, Greener, Better
          </h2>
          <p className="text-xl md:text-2xl font-body text-foreground/80 max-w-3xl mx-auto">
            EcoOracle provides personalized, AI-powered recommendations to help you reduce your household's environmental impact.
            Select a category below to get started.
          </p>
        </section>

        <Tabs defaultValue="water" className="w-full max-w-4xl mx-auto mb-16 md:mb-24">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-card p-1.5 rounded-lg shadow-lg">
            <TabsTrigger
              value="water"
              className="py-3 text-lg md:text-xl font-headline rounded-md transition-all duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-primary/10"
            >
              <Droplet className="mr-2 h-5 w-5" /> Water Conservation
            </TabsTrigger>
            <TabsTrigger
              value="carbon"
              className="py-3 text-lg md:text-xl font-headline rounded-md transition-all duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-primary/10"
            >
              <Zap className="mr-2 h-5 w-5" /> Carbon Footprint
            </TabsTrigger>
            <TabsTrigger
              value="electricity"
              className="py-3 text-lg md:text-xl font-headline rounded-md transition-all duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-primary/10"
            >
              <Bolt className="mr-2 h-5 w-5" /> Electricity Saving
            </TabsTrigger>
          </TabsList>
          <TabsContent value="water">
            <div className="p-1">
              <h3 className="text-3xl md:text-4xl font-headline text-primary mb-3 flex items-center">
                <Droplet className="mr-3 h-7 w-7" />
                Water Conservation Center
              </h3>
              <p className="text-base text-muted-foreground font-body mb-6">
                Enter your household's water usage details to get smart tips tailored just for you.
              </p>
              <HouseholdDataForm />
            </div>
          </TabsContent>
          <TabsContent value="carbon">
            <div className="p-1">
              <h3 className="text-3xl md:text-4xl font-headline text-accent-foreground mb-3 flex items-center">
                <Zap className="mr-3 h-7 w-7" />
                Carbon Footprint Coach
              </h3>
              <p className="text-base text-muted-foreground font-body mb-6">
                Describe your lifestyle to understand and reduce your carbon emissions.
              </p>
              <CarbonDataForm />
            </div>
          </TabsContent>
          <TabsContent value="electricity">
            <div className="p-1">
              <h3 className="text-3xl md:text-4xl font-headline text-primary mb-3 flex items-center">
                <Bolt className="mr-3 h-7 w-7" />
                Electricity Consumption Coach
              </h3>
              <p className="text-base text-muted-foreground font-body mb-6">
                Detail your electricity use to receive AI-powered saving strategies.
              </p>
              <ElectricityDataForm />
            </div>
          </TabsContent>
        </Tabs>
        
        <Separator className="my-12 md:my-16" />

        <section id="progress-tracking" className="p-6 md:p-8 bg-card rounded-lg shadow-lg border-border/80">
           <h3 className="text-3xl md:text-4xl font-headline text-foreground mb-4 text-center">
             Future: Track Your Eco-Progress & Goals
           </h3>
           <p className="text-base text-muted-foreground font-body text-center max-w-xl mx-auto">
              Soon, you'll be able to set reduction goals for water, carbon, and electricity, and visualize your progress with insightful charts. EcoOracle is committed to helping you make a lasting impact. Stay tuned!
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
