
'use server';

/**
 * @fileOverview Generates personalized water-saving tips based on household data.
 *
 * - generateWaterSavingTips - A function that generates water saving tips.
 * - WaterSavingTipsInput - The input type for the generateWaterSavingTips function.
 * - WaterSavingTipsOutput - The return type for the generateWaterSavingTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WaterSavingTipsInputSchema = z.object({
  numResidents: z.number().describe('The number of residents in the household.'),
  waterBillHistory: z.string().describe('A summary of the household water bill history.'),
  habits: z.string().describe('Description of the household water usage habits.'),
});
export type WaterSavingTipsInput = z.infer<typeof WaterSavingTipsInputSchema>;

const WaterSavingTipsOutputSchema = z.object({
  tips: z.string().describe('Personalized water-saving tips for the household, including relevant rebates and policies.'),
});
export type WaterSavingTipsOutput = z.infer<typeof WaterSavingTipsOutputSchema>;

export async function generateWaterSavingTips(input: WaterSavingTipsInput): Promise<WaterSavingTipsOutput> {
  return generateWaterSavingTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'waterSavingTipsPrompt',
  input: {schema: WaterSavingTipsInputSchema},
  output: {schema: WaterSavingTipsOutputSchema},
  prompt: `You are a friendly and helpful expert in water conservation, acting as a personal "EcoOracle" assistant! 💧 Your goal is to provide personalized, actionable, and easy-to-understand water-saving tips.

Based on the household data provided, generate a list of practical water-saving tips. Be encouraging and positive!
- Use relevant emojis to make the advice more friendly and engaging (e.g., 🚿, 🚽, 🌱, 💰).
- Structure your response clearly. You can use headings, bullet points, or numbered lists.
- Highlight key actions or important information to make them stand out.
- Include any relevant rebates and policies the household might be eligible for, if applicable.

Household Data:
Number of Residents: {{{numResidents}}}
Water Bill History: {{{waterBillHistory}}}
Water Usage Habits: {{{habits}}}

Please provide your friendly and helpful tips below:
Tips:`,
});

const generateWaterSavingTipsFlow = ai.defineFlow(
  {
    name: 'generateWaterSavingTipsFlow',
    inputSchema: WaterSavingTipsInputSchema,
    outputSchema: WaterSavingTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
