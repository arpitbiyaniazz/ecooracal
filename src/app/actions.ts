'use server';

import { generateWaterSavingTips, type WaterSavingTipsInput, type WaterSavingTipsOutput } from '@/ai/flows/generate-water-saving-tips';
import { z } from 'zod';

const FormSchema = z.object({
  numResidents: z.coerce.number().min(1, "Number of residents must be at least 1.").max(100, "Number of residents seems too high."),
  waterBillHistory: z.string().min(10, "Please provide some details about your water bill history (at least 10 characters).").max(2000, "Water bill history is too long (max 2000 characters)."),
  habits: z.string().min(10, "Please describe your household's water usage habits (at least 10 characters).").max(2000, "Habits description is too long (max 2000 characters)."),
});

export interface FormState {
  message: string;
  tips?: string;
  success?: boolean;
  errors?: {
    numResidents?: string[];
    waterBillHistory?: string[];
    habits?: string[];
    _form?: string[]; // For general form errors
  };
}

export async function getTipsAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = FormSchema.safeParse({
    numResidents: formData.get('numResidents'),
    waterBillHistory: formData.get('waterBillHistory'),
    habits: formData.get('habits'),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation failed. Please check your inputs.",
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const input: WaterSavingTipsInput = validatedFields.data;
    const result: WaterSavingTipsOutput = await generateWaterSavingTips(input);
    
    if (!result.tips || result.tips.trim() === "") {
        return { 
            message: "AI service returned empty tips. Please try adjusting your input or try again later.",
            success: false,
            errors: { _form: ["AI returned no tips."] }
        };
    }

    return { 
        message: "Successfully generated tips!", 
        tips: result.tips,
        success: true,
    };
  } catch (error) {
    console.error("Error generating tips:", error);
    // Check if error is an object and has a message property
    const errorMessage = (error instanceof Error) ? error.message : "An unknown error occurred.";
    return { 
        message: `Failed to generate tips: ${errorMessage}. Please try again later.`,
        success: false,
        errors: { _form: ["AI service error.", errorMessage] }
    };
  }
}
