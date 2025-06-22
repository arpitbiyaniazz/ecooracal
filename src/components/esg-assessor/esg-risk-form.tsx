
'use client';

import React, { useEffect, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { getEsgRiskAssessmentAction, type EsgRiskFormState } from '@/app/actions';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { FileSearch, Newspaper, Sparkles, AlertCircle, ListChecks, CheckCircle, Shield, LandPlot } from 'lucide-react';
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
          Assessing Risks...
        </>
      ) : (
        <>
          Assess ESG Risks <FileSearch className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}

const initialState: EsgRiskFormState = {
  message: '',
  success: false,
};

const getBadgeVariant = (score: string) => {
    switch (score?.toLowerCase()) {
        case 'high': return 'destructive';
        case 'medium': return 'secondary';
        case 'low': return 'default';
        default: return 'outline';
    }
};

export function EsgRiskForm() {
  const [state, formAction] = useActionState(getEsgRiskAssessmentAction, initialState);
  const { toast } = useToast();
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Success!",
          description: state.message,
          variant: "default",
        });
        if (resultsRef.current) {
          setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
          <Newspaper className="mr-2 h-6 w-6 text-primary" />
          Corporate Report Analysis
        </CardTitle>
        <CardDescription className="font-body text-base text-muted-foreground">
          Paste the text from a company's sustainability or annual report below. The AI will analyze it for ESG risks.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div>
            <Label htmlFor="reportText" className="font-body flex items-center mb-1 text-foreground/90">
              Report Text
            </Label>
            <Textarea
              id="reportText"
              name="reportText"
              placeholder="Paste the full text of the report here..."
              required
              className="font-body min-h-[250px]"
              aria-describedby="reportTextError"
            />
            {state.errors?.reportText && <p id="reportTextError" className="text-base text-destructive mt-1 font-body">{state.errors.reportText.join(', ')}</p>}
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

        {state.success && state.assessment && (
          <div ref={resultsRef} className="pt-2"> 
            <Card className="mt-8 bg-primary/10 border-primary/30">
              <CardHeader>
                <CardTitle className="font-headline text-2xl md:text-3xl flex items-center text-primary">
                  <Sparkles className="mr-2 h-6 w-6" />ESG Risk Scorecard
                </CardTitle>
                <CardDescription className="font-body text-base text-primary/80">
                  {state.assessment.overallSummary}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-headline hover:no-underline">
                        <div className="flex items-center gap-2">
                           <LandPlot className="h-5 w-5 text-green-600" />
                           Environmental Risk
                           <Badge variant={getBadgeVariant(state.assessment.environmental.score)}>{state.assessment.environmental.score}</Badge>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="prose dark:prose-invert prose-base max-w-none text-foreground/90 pl-2">
                        <p><strong>Summary:</strong> {state.assessment.environmental.summary}</p>
                        <strong>Evidence:</strong>
                        <ul>
                            {state.assessment.environmental.evidence.map((e, i) => <li key={i}>"{e}"</li>)}
                        </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg font-headline hover:no-underline">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-blue-600" />
                            Social Risk
                            <Badge variant={getBadgeVariant(state.assessment.social.score)}>{state.assessment.social.score}</Badge>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="prose dark:prose-invert prose-base max-w-none text-foreground/90 pl-2">
                        <p><strong>Summary:</strong> {state.assessment.social.summary}</p>
                        <strong>Evidence:</strong>
                        <ul>
                            {state.assessment.social.evidence.map((e, i) => <li key={i}>"{e}"</li>)}
                        </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-lg font-headline hover:no-underline">
                        <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-gray-600" />
                            Governance Risk
                            <Badge variant={getBadgeVariant(state.assessment.governance.score)}>{state.assessment.governance.score}</Badge>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="prose dark:prose-invert prose-base max-w-none text-foreground/90 pl-2">
                        <p><strong>Summary:</strong> {state.assessment.governance.summary}</p>
                        <strong>Evidence:</strong>
                        <ul>
                            {state.assessment.governance.evidence.map((e, i) => <li key={i}>"{e}"</li>)}
                        </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
