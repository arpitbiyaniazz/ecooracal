
'use client';

import React, { useEffect, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { getElectricityTipsAction, type CommonFormState } from '@/app/actions';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Users, Refrigerator, Thermometer, Lightbulb, Wind, Bolt, Sparkles, AlertCircle } from 'lucide-react'; // Added Bolt
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full font-body text-base" disabled={pending} aria-live="polite">
      {pending ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Getting Electricity Tips...
        </>
      ) : (
        <>
          Get My Electricity Saving Tips <Sparkles className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}

const initialState: CommonFormState = {
  message: '',
  success: false,
};

export function ElectricityDataForm() {
  const [state, formAction] = useActionState(getElectricityTipsAction, initialState);
  const { toast } = useToast();
  const tipsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Success!",
          description: state.message,
          variant: "default",
        });
        if (tipsRef.current) {
          setTimeout(() => {
            tipsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      } else {
        toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
        });
      }
    }
  }, [state, toast]);

  return (
    <Card className="shadow-lg border-border/80">
      <CardHeader>
        <CardTitle className="font-headline text-2xl md:text-3xl flex items-center text-foreground">
          <Bolt className="mr-2 h-6 w-6 text-primary" />
          Your Household's Electricity Use
        </CardTitle>
        <CardDescription className="font-body text-base text-muted-foreground">
          Provide details below to receive personalized electricity-saving tips from our AI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div>
            <Label htmlFor="numResidentsElectricity" className="font-body flex items-center mb-1 text-foreground/90">
              <Users className="mr-2 h-4 w-4 text-primary" />Number of Residents
            </Label>
            <Input id="numResidentsElectricity" name="numResidentsElectricity" type="number" placeholder="e.g., 3" required className="font-body" aria-describedby="numResidentsElectricityError" />
            {state.errors?.numResidentsElectricity && <p id="numResidentsElectricityError" className="text-base text-destructive mt-1 font-body">{state.errors.numResidentsElectricity.join(', ')}</p>}
          </div>
          <div>
            <Label htmlFor="applianceDetails" className="font-body flex items-center mb-1 text-foreground/90">
              <Refrigerator className="mr-2 h-4 w-4 text-primary" />Appliance Details
            </Label>
            <Textarea
              id="applianceDetails"
              name="applianceDetails"
              placeholder="e.g., Old fridge (10+ years), energy-star washer/dryer, 2 TVs, daily computer use."
              required
              className="font-body"
              aria-describedby="applianceDetailsError"
            />
            {state.errors?.applianceDetails && <p id="applianceDetailsError" className="text-base text-destructive mt-1 font-body">{state.errors.applianceDetails.join(', ')}</p>}
          </div>
          <div>
            <Label htmlFor="heatingCoolingSystem" className="font-body flex items-center mb-1 text-foreground/90">
              <Thermometer className="mr-2 h-4 w-4 text-primary" />Heating & Cooling System
            </Label>
            <Textarea
              id="heatingCoolingSystem"
              name="heatingCoolingSystem"
              placeholder="e.g., Central AC set to 75°F in summer, gas furnace in winter. Window AC unit in one room."
              required
              className="font-body"
              aria-describedby="heatingCoolingSystemError"
            />
            {state.errors?.heatingCoolingSystem && <p id="heatingCoolingSystemError" className="text-base text-destructive mt-1 font-body">{state.errors.heatingCoolingSystem.join(', ')}</p>}
          </div>
          <div>
            <Label htmlFor="lightingHabits" className="font-body flex items-center mb-1 text-foreground/90">
              <Lightbulb className="mr-2 h-4 w-4 text-primary" />Lighting Habits
            </Label>
            <Textarea
              id="lightingHabits"
              name="lightingHabits"
              placeholder="e.g., Mix of LED and CFL bulbs. Kids often leave lights on."
              required
              className="font-body"
              aria-describedby="lightingHabitsError"
            />
            {state.errors?.lightingHabits && <p id="lightingHabitsError" className="text-base text-destructive mt-1 font-body">{state.errors.lightingHabits.join(', ')}</p>}
          </div>
           <div>
            <Label htmlFor="renewableEnergySources" className="font-body flex items-center mb-1 text-foreground/90">
              <Wind className="mr-2 h-4 w-4 text-primary" />Renewable Energy Sources (Optional)
            </Label>
            <Textarea
              id="renewableEnergySources"
              name="renewableEnergySources"
              placeholder="e.g., Solar panels installed last year, or 'None'."
              className="font-body"
              aria-describedby="renewableEnergySourcesError"
            />
            {state.errors?.renewableEnergySources && <p id="renewableEnergySourcesError" className="text-base text-destructive mt-1 font-body">{state.errors.renewableEnergySources.join(', ')}</p>}
          </div>
          <SubmitButton />
        </form>

        {state.errors?._form && (
          <Alert variant="destructive" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="font-headline text-base">Form Error</AlertTitle>
            <AlertDescription className="font-body text-base">
              {state.errors._form.join(' ')}
            </AlertDescription>
          </Alert>
        )}

        {state.success && state.tips && (
          <div ref={tipsRef} className="pt-2"> 
            <Card className="mt-8 bg-primary/10 border-primary/30">
              <CardHeader>
                <CardTitle className="font-headline text-2xl md:text-3xl flex items-center text-primary">
                  <Sparkles className="mr-2 h-6 w-6" />Your Personalized Electricity Saving Tips!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-body prose dark:prose-invert prose-base sm:prose-lg max-w-none whitespace-pre-wrap text-foreground/90 prose-headings:text-primary prose-strong:text-foreground">
                  {state.tips}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
