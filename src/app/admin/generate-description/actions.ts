"use server";

import { generatePropertyDescription as generatePropertyDescriptionFlow, type GeneratePropertyDescriptionInput } from '@/ai/flows/generate-property-description';

export async function generateDescriptionAction(input: GeneratePropertyDescriptionInput): Promise<{success: boolean, description?: string, error?: string}> {
  try {
    const result = await generatePropertyDescriptionFlow(input);
    if (result && result.description) {
        return { success: true, description: result.description };
    }
    return { success: false, error: 'Failed to generate description.' };
  } catch (error) {
    console.error('AI Description Generation Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to generate description: ${errorMessage}` };
  }
}
