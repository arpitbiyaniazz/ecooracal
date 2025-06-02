
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
  prompt: `You are a friendly and helpful "EcoOracle" expert in water conservation! 💧 Your mission is to provide personalized, practical, actionable, and easy-to-implement water-saving tips.

Based on the household data provided, generate a list of practical, actionable, and easy-to-implement water-saving tips. Be encouraging, positive, and focus on advice that users can readily apply in their daily lives.
- Make your tips engaging and use relevant emojis (e.g., 🚿, 🚽, 🌱, 💰,💧).
- Structure your advice clearly using headings, bullet points, or numbered lists where appropriate.
- Highlight key actions, the most impactful changes, or the easiest-to-implement tips.
- Focus on practical advice and include any relevant rebates or local policies the household might benefit from, if applicable.

Household Data:
Number of Residents: {{{numResidents}}}
Water Bill History: {{{waterBillHistory}}}
Water Usage Habits: {{{habits}}}

Share your insightful and friendly water-saving wisdom below:
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
