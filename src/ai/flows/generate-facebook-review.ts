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
  keywords: z
    .string()
    .describe(
      'A comma-separated list of keywords to include in the review. Choose 2-3 keywords from the following list and blend them naturally into the review—avoid keyword stuffing: best SEO expert in Sylhet, best SEO expert in Bangladesh, best web development agency in Sylhet, best web developer in Sylhet, top digital marketing agency in Sylhet, affordable SEO services in Sylhet, professional WordPress developer in Sylhet, freelance SEO expert in Bangladesh, custom website design in Sylhet, SEO expert in Sylhet, marketing agency in Sylhet, SEO expert near me, top WordPress development agency Sylhet, best website design company in sylhet, best web development company sylhet, next.js expert in sylhet, professional web developer sylhet, affordable seo service in bangladesh, top seo agency in bangladesh, seo service for local business bd, wordpress expert in sylhet, best marn stack developer in sylhet'
    ),
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

  The review should sound like a real client who received services like SEO, WordPress development, digital marketing, or website design. It should mention how the service helped them and why they’d recommend Ab Nahid Agency to their friends and network in Sylhet or Bangladesh.

  Write the review in a professional yet friendly and conversational tone. Use 3–5 sentences, and make it sound completely authentic as if a real person is writing it. Avoid stuffing keywords; instead, subtly weave in 2-3 of the most relevant keywords from the list provided. Ensure the language feels genuine and not robotic.

  Use the following keywords in the review: {{{keywords}}}
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
