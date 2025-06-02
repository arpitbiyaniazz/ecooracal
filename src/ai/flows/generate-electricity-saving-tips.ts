
'use server';

/**
 * @fileOverview Generates personalized electricity-saving tips.
 *
 * - generateElectricitySavingTips - A function that generates electricity saving tips.
 * - ElectricitySavingTipsInput - The input type for the generateElectricitySavingTips function.
 * - ElectricitySavingTipsOutput - The return type for the generateElectricitySavingTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ElectricitySavingTipsInputSchema = z.object({
  numResidents: z.number().describe('The number of residents in the household.'),
  applianceDetails: z.string().describe('Description of major household appliances and their typical usage (e.g., refrigerator age, washing machine frequency, TV hours).'),
  heatingCoolingSystem: z.string().describe('Description of the household heating and cooling systems and usage patterns (e.g., type of system, thermostat settings, frequency of use).'),
  lightingHabits: z.string().describe('Description of household lighting habits (e.g., types of bulbs used, rooms where lights are often left on).'),
  renewableEnergySources: z.string().optional().describe('Information about any renewable energy sources used by the household (e.g., solar panels).'),
});
export type ElectricitySavingTipsInput = z.infer<typeof ElectricitySavingTipsInputSchema>;

const ElectricitySavingTipsOutputSchema = z.object({
  tips: z.string().describe('Personalized electricity-saving tips for the household, covering appliances, heating/cooling, lighting, and other relevant areas.'),
});
export type ElectricitySavingTipsOutput = z.infer<typeof ElectricitySavingTipsOutputSchema>;

export async function generateElectricitySavingTips(input: ElectricitySavingTipsInput): Promise<ElectricitySavingTipsOutput> {
  return generateElectricitySavingTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'electricitySavingTipsPrompt',
  input: {schema: ElectricitySavingTipsInputSchema},
  output: {schema: ElectricitySavingTipsOutputSchema},
  prompt: `You are an expert in energy efficiency and electricity conservation for households.
  Based on the household data provided, generate a list of actionable, personalized electricity-saving tips.
  Focus on practical advice for appliances, heating/cooling systems, lighting habits, and other relevant electricity consumption areas.
  Be encouraging and prioritize tips that can make a significant impact.

  Household Data:
  Number of Residents: {{{numResidents}}}
  Appliance Details: {{{applianceDetails}}}
  Heating/Cooling System: {{{heatingCoolingSystem}}}
  Lighting Habits: {{{lightingHabits}}}
  {{#if renewableEnergySources}}Renewable Energy Sources: {{{renewableEnergySources}}}{{/if}}

  Provide concise, actionable tips below:
  Tips:`,
});

const generateElectricitySavingTipsFlow = ai.defineFlow(
  {
    name: 'generateElectricitySavingTipsFlow',
    inputSchema: ElectricitySavingTipsInputSchema,
    outputSchema: ElectricitySavingTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
