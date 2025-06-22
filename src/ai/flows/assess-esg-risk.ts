
'use server';

/**
 * @fileOverview An AI agent for assessing ESG (Environmental, Social, Governance) risks from corporate reports.
 *
 * - assessEsgRisk - A function that handles the ESG risk assessment process.
 * - EsgRiskInput - The input type for the assessEsgRisk function.
 * - EsgRiskOutput - The return type for the assessEsgRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EsgRiskInputSchema = z.object({
  reportText: z.string().describe('The full text content of a corporate annual or sustainability report.'),
});
export type EsgRiskInput = z.infer<typeof EsgRiskInputSchema>;

const EsgRiskCategorySchema = z.object({
    score: z.string().describe('A risk score for this category (e.g., "Low", "Medium", "High", "Not Assessed").'),
    summary: z.string().describe('A concise summary of the key risks and findings for this category.'),
    evidence: z.array(z.string()).describe('Direct quotes or summarized passages from the report text that serve as evidence for the assessment.'),
});

const EsgRiskOutputSchema = z.object({
  environmental: EsgRiskCategorySchema.describe('Assessment of environmental risks like emissions, pollution, and resource management.'),
  social: EsgRiskCategorySchema.describe('Assessment of social risks like labor practices, community relations, and data privacy.'),
  governance: EsgRiskCategorySchema.describe('Assessment of governance risks like board structure, executive compensation, and business ethics.'),
  overallSummary: z.string().describe('A brief, high-level summary of the overall ESG risk profile based on the report.'),
});
export type EsgRiskOutput = z.infer<typeof EsgRiskOutputSchema>;

export async function assessEsgRisk(input: EsgRiskInput): Promise<EsgRiskOutput> {
  return assessEsgRiskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'esgRiskPrompt',
  input: {schema: EsgRiskInputSchema},
  output: {schema: EsgRiskOutputSchema},
  prompt: `You are an expert ESG (Environmental, Social, and Governance) risk analyst. Your task is to analyze the provided corporate report text and generate a risk scorecard.

Carefully read the report text and identify any language, data, or disclosures that indicate potential risks. Look for keywords related to issues such as:
- Environmental: "emissions," "pollution," "waste," "climate change," "environmental fine," "resource depletion"
- Social: "lawsuit," "labor dispute," "employee safety," "data breach," "community opposition," "diversity and inclusion"
- Governance: "shareholder complaint," "board independence," "executive compensation," "bribery," "corruption," "compliance issue"

For each of the three ESG categories (Environmental, Social, Governance), you must:
1.  Assign a risk score: "Low," "Medium," or "High." If there is no relevant information, use "Not Assessed."
2.  Write a concise summary of your findings for that category.
3.  Extract specific quotes or passages from the text as evidence to support your assessment. Be precise and list at least 2-3 pieces of evidence if available.

Finally, provide a high-level overall summary of the company's ESG risk profile based on your analysis.

Report Text:
{{{reportText}}}

Begin your assessment now.`,
});

const assessEsgRiskFlow = ai.defineFlow(
  {
    name: 'assessEsgRiskFlow',
    inputSchema: EsgRiskInputSchema,
    outputSchema: EsgRiskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
