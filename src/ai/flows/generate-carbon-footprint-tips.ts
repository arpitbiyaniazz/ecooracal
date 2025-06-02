
'use server';

/**
 * @fileOverview Generates personalized carbon footprint reduction tips.
 *
 * - generateCarbonFootprintTips - A function that generates carbon footprint tips.
 * - CarbonFootprintTipsInput - The input type for the generateCarbonFootprintTips function.
 * - CarbonFootprintTipsOutput - The return type for the generateCarbonFootprintTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CarbonFootprintTipsInputSchema = z.object({
  numResidents: z.number().describe('The number of residents in the household.'),
  electricityUsage: z.string().describe('Description of household electricity usage (e.g., average kWh/month, types of appliances, usage patterns).'),
  transportationHabits: z.string().describe('Description of household transportation habits (e.g., miles driven per week, vehicle types, public transport use, cycling).'),
  dietaryPreferences: z.string().describe('Description of household dietary preferences (e.g., meat consumption frequency, preference for local/seasonal food, food waste habits).'),
  flyingHabits: z.string().describe('Description of household flying habits (e.g., number of short/long-haul flights per year).'),
});
export type CarbonFootprintTipsInput = z.infer<typeof CarbonFootprintTipsInputSchema>;

const CarbonFootprintTipsOutputSchema = z.object({
  tips: z.string().describe('Personalized carbon footprint reduction tips for the household, addressing electricity, transportation, diet, and flying.'),
});
export type CarbonFootprintTipsOutput = z.infer<typeof CarbonFootprintTipsOutputSchema>;

export async function generateCarbonFootprintTips(input: CarbonFootprintTipsInput): Promise<CarbonFootprintTipsOutput> {
  return generateCarbonFootprintTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'carbonFootprintTipsPrompt',
  input: {schema: CarbonFootprintTipsInputSchema},
  output: {schema: CarbonFootprintTipsOutputSchema},
  prompt: `You are a friendly and encouraging "EcoOracle" expert specializing in carbon footprint reduction and sustainable living! 🌍 Your aim is to provide personalized, actionable, and easy-to-follow tips.

Based on the household data provided, generate a list of practical tips to reduce carbon emissions.
- Make your tips engaging and use relevant emojis (e.g., 💡, 🚗, ✈️, ♻️, 🥦).
- Structure your advice clearly using headings, bullet points, or numbered lists where appropriate.
- Focus on impactful changes but also include smaller, manageable steps. Be positive and motivating!
- Cover electricity, transportation, diet, and flying habits.

Household Data:
Number of Residents: {{{numResidents}}}
Electricity Usage: {{{electricityUsage}}}
Transportation Habits: {{{transportationHabits}}}
Dietary Preferences: {{{dietaryPreferences}}}
Flying Habits: {{{flyingHabits}}}

Share your insightful and friendly carbon-saving tips below:
Tips:`,
});

const generateCarbonFootprintTipsFlow = ai.defineFlow(
  {
    name: 'generateCarbonFootprintTipsFlow',
    inputSchema: CarbonFootprintTipsInputSchema,
    outputSchema: CarbonFootprintTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
