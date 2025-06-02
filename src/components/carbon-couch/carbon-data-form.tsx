
'use client';

import React, { useEffect, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { getCarbonTipsAction, type CommonFormState } from '@/app/actions';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Users, Zap, CarFront, Vegan, Plane, Lightbulb, CloudCog, AlertCircle, Sparkles } from 'lucide-react';
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
          Getting Carbon Tips...
        </>
      ) : (
        <>
          Get My Carbon Saving Tips <Lightbulb className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}

const initialState: CommonFormState = {
  message: '',
  success: false,
};

export function CarbonDataForm() {
  const [state, formAction] = useActionState(getCarbonTipsAction, initialState);
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
          <CloudCog className="mr-2 h-6 w-6 text-primary" />
          Your Household's Carbon Footprint
        </CardTitle>
        <CardDescription className="font-body text-base text-muted-foreground">
          Provide details below to receive personalized carbon-saving tips from our AI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div>
            <Label htmlFor="numResidentsCarbon" className="font-body flex items-center mb-1 text-foreground/90">
              <Users className="mr-2 h-4 w-4 text-primary" />Number of Residents
            </Label>
            <Input id="numResidentsCarbon" name="numResidentsCarbon" type="number" placeholder="e.g., 2" required className="font-body" aria-describedby="numResidentsCarbonError" />
            {state.errors?.numResidentsCarbon && <p id="numResidentsCarbonError" className="text-base text-destructive mt-1 font-body">{state.errors.numResidentsCarbon.join(', ')}</p>}
          </div>
          <div>
            <Label htmlFor="electricityUsage" className="font-body flex items-center mb-1 text-foreground/90">
              <Zap className="mr-2 h-4 w-4 text-primary" />Electricity Usage
            </Label>
            <Textarea
              id="electricityUsage"
              name="electricityUsage"
              placeholder="e.g., Average 500 kWh/month, use LED bulbs, run AC in summer."
              required
              className="font-body"
              aria-describedby="electricityUsageError"
            />
            {state.errors?.electricityUsage && <p id="electricityUsageError" className="text-base text-destructive mt-1 font-body">{state.errors.electricityUsage.join(', ')}</p>}
          </div>
          <div>
            <Label htmlFor="transportationHabits" className="font-body flex items-center mb-1 text-foreground/90">
              <CarFront className="mr-2 h-4 w-4 text-primary" />Transportation Habits
            </Label>
            <Textarea
              id="transportationHabits"
              name="transportationHabits"
              placeholder="e.g., Drive a sedan 100 miles/week, use public transport for commute."
              required
              className="font-body"
              aria-describedby="transportationHabitsError"
            />
            {state.errors?.transportationHabits && <p id="transportationHabitsError" className="text-base text-destructive mt-1 font-body">{state.errors.transportationHabits.join(', ')}</p>}
          </div>
          <div>
            <Label htmlFor="dietaryPreferences" className="font-body flex items-center mb-1 text-foreground/90">
              <Vegan className="mr-2 h-4 w-4 text-primary" />Dietary Preferences
            </Label>
            <Textarea
              id="dietaryPreferences"
              name="dietaryPreferences"
              placeholder="e.g., Eat meat 3 times a week, try to buy local produce."
              required
              className="font-body"
              aria-describedby="dietaryPreferencesError"
            />
            {state.errors?.dietaryPreferences && <p id="dietaryPreferencesError" className="text-base text-destructive mt-1 font-body">{state.errors.dietaryPreferences.join(', ')}</p>}
          </div>
           <div>
            <Label htmlFor="flyingHabits" className="font-body flex items-center mb-1 text-foreground/90">
              <Plane className="mr-2 h-4 w-4 text-primary" />Flying Habits
            </Label>
            <Textarea
              id="flyingHabits"
              name="flyingHabits"
              placeholder="e.g., 1 international round-trip flight per year, a few domestic short flights."
              required
              className="font-body"
              aria-describedby="flyingHabitsError"
            />
            {state.errors?.flyingHabits && <p id="flyingHabitsError" className="text-base text-destructive mt-1 font-body">{state.errors.flyingHabits.join(', ')}</p>}
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
            <Card className="mt-8 bg-accent/10 border-accent/30">
              <CardHeader>
                <CardTitle className="font-headline text-2xl md:text-3xl flex items-center text-accent-foreground">
                  <Sparkles className="mr-2 h-6 w-6" />Your Personalized Carbon Saving Tips!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-body prose dark:prose-invert prose-base sm:prose-lg max-w-none whitespace-pre-wrap text-foreground/90 prose-headings:text-accent-foreground prose-strong:text-foreground">
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
