'use server';
/**
 * @fileOverview Generates a realistic Facebook review for a digital services company.
 *
 * - generateFacebookReview - A function that generates the Facebook review.
 * - GenerateFacebookReviewInput - The input type for the generateFacebookReview function.
 * - GenerateFacebookReviewOutput - The return type for the generateFacebookReview function.
 */

import {ai} from '../genkit';
import {z} from 'genkit';

const GenerateFacebookReviewInputSchema = z.object({
  topic: z
    .string()
    .describe('The topic for the review, e.g., Web Development, SEO, etc.'),
});
export type GenerateFacebookReviewInput = z.infer<typeof GenerateFacebookReviewReviewInputSchema>;

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
  prompt: `You are a marketing expert who specializes in generating unique, professional, and realistic Facebook reviews.

  Write a natural, human-sounding Facebook review for a digital services company called Ab Nahid Agency. The review must be completely unique and not a duplicate of previous ones.

  The review should sound like a real client who received services from the company. It should mention how the service helped them and why they’d recommend Ab Nahid Agency to their friends and network in Sylhet or Bangladesh.

  Focus the review on the following topic: {{{topic}}}.

  Keyword Groups (use 1-2 naturally based on the selected topic):
  - SEO: "best seo expert in sylhet", "best seo expert in bangladesh", "top seo agency in bangladesh", "affordable seo service in bangladesh", "seo service for local business bd", "seo expert", "seo expert near me"
  - Web/Next.js: "best web development agency in sylhet", "best web developer in sylhet", "professional web developer sylhet", "best website design company in sylhet", "next.js expert in sylhet", "figma to next.js expart", "best marn stack developer in sylhet"
  - WordPress: "professional wordpress developer in sylhet", "wordpress expert in sylhet", "top wordpress development agency sylhet"
  - Marketing: "top digital marketing agency in sylhet", "marketing agency in sylhet"

  Write the review in a professional yet friendly and conversational tone. Use 3–5 sentences, and make it sound completely authentic. DO NOT include any quotation marks in the review.

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
