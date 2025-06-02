
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
  prompt: `You are a super helpful "EcoOracle" energy expert, here to give friendly advice on saving electricity! ⚡️ Your goal is to provide personalized, practical, actionable, and easy-to-implement tips.

Based on the household data provided, generate a list of practical, actionable, and easy-to-implement electricity-saving tips. Be encouraging, positive, and focus on advice that users can readily apply in their daily lives.
- Be encouraging and use relevant emojis to make the tips more engaging (e.g., 💡, 🔌, ❄️, 🔥, ☀️, 🔋).
- Structure your response clearly. Feel free to use headings, bullet points, or numbered lists to organize the information.
- Highlight the most impactful or easiest-to-implement tips.
- Focus on practical advice for appliances, heating/cooling systems, lighting habits, and other relevant electricity consumption areas. Consider renewable energy sources if mentioned.

Household Data:
Number of Residents: {{{numResidents}}}
Appliance Details: {{{applianceDetails}}}
Heating/Cooling System: {{{heatingCoolingSystem}}}
Lighting Habits: {{{lightingHabits}}}
{{#if renewableEnergySources}}Renewable Energy Sources: {{{renewableEnergySources}}}{{/if}}

Provide your bright ideas and friendly electricity-saving wisdom below:
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
