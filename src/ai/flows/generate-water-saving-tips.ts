// This file is machine-generated - edit with care!

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
  prompt: `You are an expert in water conservation and are providing personalized water-saving tips to households.

  Based on the household data provided, generate a list of actionable water-saving tips. Include any relevant rebates and policies that the household may be eligible for.

  Household Data:
  Number of Residents: {{{numResidents}}}
  Water Bill History: {{{waterBillHistory}}}
  Water Usage Habits: {{{habits}}}

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
