'use server';

/**
 * @fileOverview AI flow to generate a compelling property description from basic details.
 *
 * - generatePropertyDescription - A function that handles the property description generation process.
 * - GeneratePropertyDescriptionInput - The input type for the generatePropertyDescription function.
 * - GeneratePropertyDescriptionOutput - The return type for the generatePropertyDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePropertyDescriptionInputSchema = z.object({
  propertyType: z.string().describe('Type of property (e.g., house, apartment, condo).'),
  bedrooms: z.number().int().min(1).describe('Number of bedrooms.'),
  bathrooms: z.number().min(1).describe('Number of bathrooms.'),
  location: z.string().describe('Location of the property (city, neighborhood).'),
  amenities: z.string().describe('Key amenities (e.g., swimming pool, gym, parking).'),
  uniqueFeatures: z.string().describe('Unique features of the property (e.g., balcony with a view, renovated kitchen).'),
  price: z.number().describe('The price of the property'),
  squareFootage: z.number().describe('The square footage of the property'),
});
export type GeneratePropertyDescriptionInput = z.infer<typeof GeneratePropertyDescriptionInputSchema>;

const GeneratePropertyDescriptionOutputSchema = z.object({
  description: z.string().describe('A compelling property description.'),
});
export type GeneratePropertyDescriptionOutput = z.infer<typeof GeneratePropertyDescriptionOutputSchema>;

export async function generatePropertyDescription(
  input: GeneratePropertyDescriptionInput
): Promise<GeneratePropertyDescriptionOutput> {
  return generatePropertyDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePropertyDescriptionPrompt',
  input: {schema: GeneratePropertyDescriptionInputSchema},
  output: {schema: GeneratePropertyDescriptionOutputSchema},
  prompt: `You are an expert real estate copywriter. Generate a compelling and engaging property description based on the following details:

Property Type: {{{propertyType}}}
Bedrooms: {{{bedrooms}}}
Bathrooms: {{{bathrooms}}}
Location: {{{location}}}
Amenities: {{{amenities}}}
Unique Features: {{{uniqueFeatures}}}
Price: {{{price}}}
Square Footage: {{{squareFootage}}}

Write a description that highlights the key features and benefits of the property, appealing to potential buyers or renters. The description should be approximately 150-200 words. Focus on creating a vivid and attractive image of the property. Mention the price at the end.
`,
});

const generatePropertyDescriptionFlow = ai.defineFlow(
  {
    name: 'generatePropertyDescriptionFlow',
    inputSchema: GeneratePropertyDescriptionInputSchema,
    outputSchema: GeneratePropertyDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
