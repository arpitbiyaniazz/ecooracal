
'use client';

import React, { useEffect, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { getWaterTipsAction, type CommonFormState } from '@/app/actions'; // Changed to getWaterTipsAction and CommonFormState
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Users, FileText, Activity, Sparkles, ClipboardEdit, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full font-body" disabled={pending} aria-live="polite">
      {pending ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Getting Water Tips...
        </>
      ) : (
        <>
          Get My Water Saving Tips <Sparkles className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}

const initialState: CommonFormState = { // Changed to CommonFormState
  message: '',
  success: false,
};

export function HouseholdDataForm() {
  const [state, formAction] = useActionState(getWaterTipsAction, initialState); // Changed to getWaterTipsAction
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
        <CardTitle className="font-headline text-xl md:text-2xl flex items-center text-foreground">
          <ClipboardEdit className="mr-2 h-6 w-6 text-primary" />
          Your Household's Water Use
        </CardTitle>
        <CardDescription className="font-body text-muted-foreground">
          Provide details below to receive personalized water-saving tips from our AI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div>
            <Label htmlFor="numResidents" className="font-body flex items-center mb-1 text-foreground/90">
              <Users className="mr-2 h-4 w-4 text-primary" />Number of Residents
            </Label>
            <Input id="numResidents" name="numResidents" type="number" placeholder="e.g., 4" required className="font-body" aria-describedby="numResidentsError" />
            {state.errors?.numResidents && <p id="numResidentsError" className="text-sm text-destructive mt-1 font-body">{state.errors.numResidents.join(', ')}</p>}
          </div>
          <div>
            <Label htmlFor="waterBillHistory" className="font-body flex items-center mb-1 text-foreground/90">
              <FileText className="mr-2 h-4 w-4 text-primary" />Water Bill History
            </Label>
            <Textarea
              id="waterBillHistory"
              name="waterBillHistory"
              placeholder="e.g., Average monthly bill is $50, usage is 3000 gallons. Higher consumption in summer due to garden watering."
              required
              className="font-body min-h-[100px]"
              aria-describedby="waterBillHistoryError"
            />
            {state.errors?.waterBillHistory && <p id="waterBillHistoryError" className="text-sm text-destructive mt-1 font-body">{state.errors.waterBillHistory.join(', ')}</p>}
          </div>
          <div>
            <Label htmlFor="habits" className="font-body flex items-center mb-1 text-foreground/90">
              <Activity className="mr-2 h-4 w-4 text-primary" />Water Usage Habits
            </Label>
            <Textarea
              id="habits"
              name="habits"
              placeholder="e.g., Daily showers for all residents, run dishwasher 3 times/week, water lawn twice a week for 30 mins."
              required
              className="font-body min-h-[100px]"
              aria-describedby="habitsError"
            />
            {state.errors?.habits && <p id="habitsError" className="text-sm text-destructive mt-1 font-body">{state.errors.habits.join(', ')}</p>}
          </div>
          <SubmitButton />
        </form>

        {state.errors?._form && (
          <Alert variant="destructive" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="font-headline">Form Error</AlertTitle>
            <AlertDescription className="font-body">
              {state.errors._form.join(' ')}
            </AlertDescription>
          </Alert>
        )}

        {state.success && state.tips && (
          <div ref={tipsRef} className="pt-2"> 
            <Card className="mt-8 bg-primary/10 border-primary/30">
              <CardHeader>
                <CardTitle className="font-headline text-xl md:text-2xl flex items-center text-primary">
                  <Sparkles className="mr-2 h-6 w-6" />Your Personalized Water Saving Tips!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-body prose dark:prose-invert prose-sm sm:prose-base max-w-none whitespace-pre-wrap text-foreground/90 prose-headings:text-primary prose-strong:text-foreground">
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
