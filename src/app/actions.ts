
'use server';

import { generateWaterSavingTips, type WaterSavingTipsInput, type WaterSavingTipsOutput } from '@/ai/flows/generate-water-saving-tips';
import { generateCarbonFootprintTips, type CarbonFootprintTipsInput, type CarbonFootprintTipsOutput } from '@/ai/flows/generate-carbon-footprint-tips';
import { generateElectricitySavingTips, type ElectricitySavingTipsInput, type ElectricitySavingTipsOutput } from '@/ai/flows/generate-electricity-saving-tips';
import { assessEsgRisk, type EsgRiskInput, type EsgRiskOutput } from '@/ai/flows/assess-esg-risk';
import { z } from 'zod';

const WaterFormSchema = z.object({
  numResidents: z.coerce.number().min(1, "Number of residents must be at least 1.").max(100, "Number of residents seems too high."),
  waterBillHistory: z.string().min(10, "Please provide some details about your water bill history (at least 10 characters).").max(2000, "Water bill history is too long (max 2000 characters)."),
  habits: z.string().min(10, "Please describe your household's water usage habits (at least 10 characters).").max(2000, "Habits description is too long (max 2000 characters)."),
});

export interface CommonFormState {
  message: string;
  tips?: string;
  success?: boolean;
  errors?: {
    [key: string]: string[] | undefined; 
    _form?: string[];
  };
}

export async function getWaterTipsAction(prevState: CommonFormState, formData: FormData): Promise<CommonFormState> {
  const validatedFields = WaterFormSchema.safeParse({
    numResidents: formData.get('numResidents'),
    waterBillHistory: formData.get('waterBillHistory'),
    habits: formData.get('habits'),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation failed. Please check your inputs for water saving tips.",
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const input: WaterSavingTipsInput = validatedFields.data;
    const result: WaterSavingTipsOutput = await generateWaterSavingTips(input);
    
    if (!result.tips || result.tips.trim() === "") {
        return { 
            message: "AI service returned empty water saving tips. Please try adjusting your input or try again later.",
            success: false,
            errors: { _form: ["AI returned no water tips."] }
        };
    }

    return { 
        message: "Successfully generated water saving tips!", 
        tips: result.tips,
        success: true,
    };
  } catch (error) {
    console.error("Error generating water tips:", error);
    const errorMessage = (error instanceof Error) ? error.message : "An unknown error occurred.";
    return { 
        message: `Failed to generate water saving tips: ${errorMessage}. Please try again later.`,
        success: false,
        errors: { _form: ["AI service error for water tips.", errorMessage] }
    };
  }
}

const CarbonFormSchema = z.object({
  numResidentsCarbon: z.coerce.number().min(1, "Number of residents must be at least 1.").max(100, "Number of residents seems too high."),
  electricityUsage: z.string().min(10, "Please describe electricity usage (at least 10 characters).").max(2000, "Description too long (max 2000 chars)."),
  transportationHabits: z.string().min(10, "Please describe transportation habits (at least 10 characters).").max(2000, "Description too long (max 2000 chars)."),
  dietaryPreferences: z.string().min(10, "Please describe dietary preferences (at least 10 characters).").max(2000, "Description too long (max 2000 chars)."),
  flyingHabits: z.string().min(10, "Please describe flying habits (at least 10 characters).").max(2000, "Description too long (max 2000 chars)."),
});

export async function getCarbonTipsAction(prevState: CommonFormState, formData: FormData): Promise<CommonFormState> {
  const validatedFields = CarbonFormSchema.safeParse({
    numResidentsCarbon: formData.get('numResidentsCarbon'),
    electricityUsage: formData.get('electricityUsage'),
    transportationHabits: formData.get('transportationHabits'),
    dietaryPreferences: formData.get('dietaryPreferences'),
    flyingHabits: formData.get('flyingHabits'),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation failed. Please check your inputs for carbon footprint tips.",
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const input: CarbonFootprintTipsInput = {
        numResidents: validatedFields.data.numResidentsCarbon,
        electricityUsage: validatedFields.data.electricityUsage,
        transportationHabits: validatedFields.data.transportationHabits,
        dietaryPreferences: validatedFields.data.dietaryPreferences,
        flyingHabits: validatedFields.data.flyingHabits,
    };
    const result: CarbonFootprintTipsOutput = await generateCarbonFootprintTips(input);
    
    if (!result.tips || result.tips.trim() === "") {
        return { 
            message: "AI service returned empty carbon footprint tips. Please try adjusting your input or try again later.",
            success: false,
            errors: { _form: ["AI returned no carbon tips."] }
        };
    }

    return { 
        message: "Successfully generated carbon footprint tips!", 
        tips: result.tips,
        success: true,
    };
  } catch (error) {
    console.error("Error generating carbon tips:", error);
    const errorMessage = (error instanceof Error) ? error.message : "An unknown error occurred.";
    return { 
        message: `Failed to generate carbon footprint tips: ${errorMessage}. Please try again later.`,
        success: false,
        errors: { _form: ["AI service error for carbon tips.", errorMessage] }
    };
  }
}

const ElectricityFormSchema = z.object({
  numResidentsElectricity: z.coerce.number().min(1, "Number of residents must be at least 1.").max(100, "Number of residents seems too high."),
  applianceDetails: z.string().min(10, "Please describe appliance details (at least 10 characters).").max(2000, "Description too long (max 2000 chars)."),
  heatingCoolingSystem: z.string().min(10, "Please describe heating/cooling system (at least 10 characters).").max(2000, "Description too long (max 2000 chars)."),
  lightingHabits: z.string().min(10, "Please describe lighting habits (at least 10 characters).").max(2000, "Description too long (max 2000 chars)."),
  renewableEnergySources: z.string().max(2000, "Description too long (max 2000 chars).").optional(),
});

export async function getElectricityTipsAction(prevState: CommonFormState, formData: FormData): Promise<CommonFormState> {
  const validatedFields = ElectricityFormSchema.safeParse({
    numResidentsElectricity: formData.get('numResidentsElectricity'),
    applianceDetails: formData.get('applianceDetails'),
    heatingCoolingSystem: formData.get('heatingCoolingSystem'),
    lightingHabits: formData.get('lightingHabits'),
    renewableEnergySources: formData.get('renewableEnergySources'),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation failed. Please check your inputs for electricity saving tips.",
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const input: ElectricitySavingTipsInput = {
        numResidents: validatedFields.data.numResidentsElectricity,
        applianceDetails: validatedFields.data.applianceDetails,
        heatingCoolingSystem: validatedFields.data.heatingCoolingSystem,
        lightingHabits: validatedFields.data.lightingHabits,
        renewableEnergySources: validatedFields.data.renewableEnergySources || undefined,
    };
    const result: ElectricitySavingTipsOutput = await generateElectricitySavingTips(input);
    
    if (!result.tips || result.tips.trim() === "") {
        return { 
            message: "AI service returned empty electricity saving tips. Please try adjusting your input or try again later.",
            success: false,
            errors: { _form: ["AI returned no electricity tips."] }
        };
    }

    return { 
        message: "Successfully generated electricity saving tips!", 
        tips: result.tips,
        success: true,
    };
  } catch (error) {
    console.error("Error generating electricity tips:", error);
    const errorMessage = (error instanceof Error) ? error.message : "An unknown error occurred.";
    return { 
        message: `Failed to generate electricity saving tips: ${errorMessage}. Please try again later.`,
        success: false,
        errors: { _form: ["AI service error for electricity tips.", errorMessage] }
    };
  }
}

// ESG Risk Assessment Action
const EsgRiskFormSchema = z.object({
  reportText: z.string().min(100, "Report text must be at least 100 characters.").max(50000, "Report text cannot exceed 50,000 characters."),
});

export interface EsgRiskFormState {
  message: string;
  assessment?: EsgRiskOutput;
  success?: boolean;
  errors?: {
    reportText?: string[];
    _form?: string[];
  };
}

export async function getEsgRiskAssessmentAction(prevState: EsgRiskFormState, formData: FormData): Promise<EsgRiskFormState> {
  const validatedFields = EsgRiskFormSchema.safeParse({
    reportText: formData.get('reportText'),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation failed. Please check your inputs.",
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const input: EsgRiskInput = validatedFields.data;
    const result: EsgRiskOutput = await assessEsgRisk(input);
    
    if (!result || !result.overallSummary) {
        return { 
            message: "AI service returned an empty assessment. Please try adjusting your input or try again later.",
            success: false,
            errors: { _form: ["AI returned no assessment."] }
        };
    }

    return { 
        message: "Successfully generated ESG Risk Assessment!", 
        assessment: result,
        success: true,
    };
  } catch (error) {
    console.error("Error generating ESG assessment:", error);
    const errorMessage = (error instanceof Error) ? error.message : "An unknown error occurred.";
    return { 
        message: `Failed to generate ESG assessment: ${errorMessage}. Please try again later.`,
        success: false,
        errors: { _form: ["AI service error during assessment.", errorMessage] }
    };
  }
}
