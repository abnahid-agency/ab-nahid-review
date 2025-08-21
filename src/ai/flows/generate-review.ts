'use server';

/**
 * @fileOverview Generates a realistic Google review for a digital services company.
 *
 * - generateReview - A function that generates the Google review.
 * - GenerateReviewInput - The input type for the generateReview function.
 * - GenerateReviewOutput - The return type for the generateReview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReviewInputSchema = z.object({
  keywords: z
    .string()
    .describe(
      'A comma-separated list of keywords to include in the review. Choose 2-3 keywords from the following list and blend them naturally into the review—avoid keyword stuffing: best SEO expert in Sylhet, best SEO expert in Bangladesh, best web development agency in Sylhet, best web developer in Sylhet, top digital marketing agency in Sylhet, affordable SEO services in Sylhet, professional WordPress developer in Sylhet, freelance SEO expert in Bangladesh, custom website design in Sylhet, SEO expert in Sylhet, marketing agency in Sylhet, SEO expert near me, top WordPress development agency Sylhet, best website design company in sylhet, best web development company sylhet, next.js expert in sylhet, professional web developer sylhet, affordable seo service in bangladesh, top seo agency in bangladesh, seo service for local business bd, wordpress expert in sylhet, best marn stack developer in sylhet'
    ),
});
export type GenerateReviewInput = z.infer<typeof GenerateReviewInputSchema>;

const GenerateReviewOutputSchema = z.object({
  review: z.string().describe('The generated Google review.'),
});
export type GenerateReviewOutput = z.infer<typeof GenerateReviewOutputSchema>;

export async function generateReview(input: GenerateReviewInput): Promise<GenerateReviewOutput> {
  return generateReviewFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReviewPrompt',
  input: {schema: GenerateReviewInputSchema},
  output: {schema: GenerateReviewOutputSchema},
  prompt: `You are a marketing expert who specializes in generating unique, professional, and realistic Google reviews.

  Write a natural, human-sounding Google review for a digital services company called Ab Nahid Agency. Each review must be completely unique and not a duplicate of previous ones.

  The review should sound like a real client who received services like SEO, WordPress development, digital marketing, or website design. Mention how the service helped them and why they’d recommend Ab Nahid Agency to others in Sylhet or Bangladesh.

  Write the review in a professional and friendly tone, use 3–5 sentences, and make it sound completely authentic. Avoid stuffing keywords; instead, subtly weave in 2-3 of the most relevant keywords from the list provided. Do not include any quotation marks in the review.

  Use the following keywords in the review: {{{keywords}}}
  `,
});

const generateReviewFlow = ai.defineFlow(
  {
    name: 'generateReviewFlow',
    inputSchema: GenerateReviewInputSchema,
    outputSchema: GenerateReviewOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
