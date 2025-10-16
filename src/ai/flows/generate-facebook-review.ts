'use server';

/**
 * @fileOverview Generates a realistic Facebook review for a digital services company.
 *
 * - generateFacebookReview - A function that generates the Facebook review.
 * - GenerateFacebookReviewInput - The input type for the generateFacebookReview function.
 * - GenerateFacebookReviewOutput - The return type for the generateFacebookReview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFacebookReviewInputSchema = z.object({
  topic: z
    .string()
    .describe('The topic for the review, e.g., Web Development, SEO, etc.'),
});
export type GenerateFacebookReviewInput = z.infer<typeof GenerateFacebookReviewInputSchema>;

const GenerateFacebookReviewOutputSchema = z.object({
  review: z.string().describe('The generated Facebook review.'),
});
export type GenerateFacebookReviewOutput = z.infer<typeof GenerateFacebookReviewOutputSchema>;

export async function generateFacebookReview(input: GenerateFacebookReviewInput): Promise<GenerateFacebookReviewOutput> {
  return generateFacebookReviewFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFacebookReviewPrompt',
  input: {schema: GenerateFacebookReviewInputSchema},
  output: {schema: GenerateFacebookReviewOutputSchema},
  prompt: `You are a marketing expert who specializes in generating unique, professional, and realistic Facebook reviews that comply with Facebook's policies.

  Write a natural, human-sounding Facebook review for a digital services company called Ab Nahid Agency. The review must be completely unique and not a duplicate of previous ones.

  The review should sound like a real client who received services from the company. It should mention how the service helped them and why they’d recommend Ab Nahid Agency to their friends and network in Sylhet or Bangladesh.

  Focus the review on the following topic: {{{topic}}}.

  Write the review in a professional yet friendly and conversational tone. Use 3–5 sentences, and make it sound completely authentic as if a real person is writing it. Avoid stuffing keywords; instead, subtly weave in 2-3 of the most relevant keywords. Ensure the language feels genuine and not robotic. Do not include any quotation marks in the review.

  Critically, every review must be different. Do not use repetitive sentence structures or opening phrases like "I'm so glad". Vary the tone and focus of each review.
  `,
});

const generateFacebookReviewFlow = ai.defineFlow(
  {
    name: 'generateFacebookReviewFlow',
    inputSchema: GenerateFacebookReviewInputSchema,
    outputSchema: GenerateFacebookReviewOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
