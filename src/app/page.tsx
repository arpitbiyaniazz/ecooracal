
'use client';

import { useState } from 'react';
import { BarChart, Droplet, Zap, Bolt, ChevronDown, FileSearch } from 'lucide-react';
import AppHeader from '@/components/layout/app-header';
import AppFooter from '@/components/layout/app-footer';
import { HouseholdDataForm } from '@/components/aqua-wise/household-data-form';
import { CarbonDataForm } from '@/components/carbon-couch/carbon-data-form';
import { ElectricityDataForm } from '@/components/electricity-coach/electricity-data-form';
import { EsgRiskForm } from '@/components/esg-assessor/esg-risk-form';
import { Separator } from '@/components/ui/separator';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define a type for the view keys
type ViewType = 'water' | 'carbon' | 'electricity' | 'esg';

// Helper object to store details for each view
const views = {
  water: {
    label: "Water Conservation",
    icon: Droplet,
    title: "Water Conservation Center",
    description: "Enter your household's water usage details to get smart tips tailored just for you.",
    component: HouseholdDataForm,
    titleColor: "text-primary",
  },
  carbon: {
    label: "Carbon Footprint",
    icon: Zap,
    title: "Carbon Footprint Coach",
    description: "Describe your lifestyle to understand and reduce your carbon emissions.",
    component: CarbonDataForm,
    titleColor: "text-accent-foreground",
  },
  electricity: {
    label: "Electricity Saving",
    icon: Bolt,
    title: "Electricity Consumption Coach",
    description: "Detail your electricity use to receive AI-powered saving strategies.",
    component: ElectricityDataForm,
    titleColor: "text-primary",
  },
  esg: {
    label: "ESG Risk Assessor",
    icon: FileSearch,
    title: "ESG Risk Assessment Tool",
    description: "Paste a corporate report to automatically identify and assess ESG risks.",
    component: EsgRiskForm,
    titleColor: "text-secondary-foreground",
  },
};

export default function Home() {
  const [activeView, setActiveView] = useState<ViewType>('water');

  const ActiveIcon = views[activeView].icon;
  const ActiveComponent = views[activeView].component;

  return (
    <div className="flex flex-col min-h-screen bg-background">
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

        <div className="w-full max-w-4xl mx-auto mb-16 md:mb-24">
          <div className="flex justify-center mb-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto md:min-w-[300px] text-lg py-6 flex items-center justify-center gap-3 border-border shadow-md">
                  <ActiveIcon className="h-5 w-5 text-primary" />
                  <span className="font-headline">{views[activeView].label}</span>
                  <ChevronDown className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full md:w-[300px]">
                {(Object.keys(views) as ViewType[]).map((key) => {
                  const view = views[key];
                  const Icon = view.icon;
                  return (
                    <DropdownMenuItem
                      key={key}
                      className="text-base py-2 cursor-pointer"
                      onClick={() => setActiveView(key)}
                    >
                      <Icon className="mr-2 h-5 w-5 text-primary" />
                      <span>{view.label}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="p-1">
            <h3 className={`text-3xl md:text-4xl font-headline mb-3 flex items-center ${views[activeView].titleColor}`}>
              <ActiveIcon className="mr-3 h-7 w-7" />
              {views[activeView].title}
            </h3>
            <p className="text-base text-muted-foreground font-body mb-6">
              {views[activeView].description}
            </p>
            <ActiveComponent />
          </div>
        </div>
        
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
