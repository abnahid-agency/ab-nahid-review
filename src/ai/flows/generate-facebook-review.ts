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

  When writing about the topic, subtly and naturally include 1-2 relevant keywords from the following list, ONLY if they fit the selected topic. Do not stuff keywords.

  Keyword List:
  - For SEO/Digital Marketing: "best seo expert in sylhet", "top digital marketing agency in sylhet", "affordable seo service in bangladesh", "seo service for local business bd"
  - For Web Development: "best web development agency in sylhet", "next.js expert in sylhet", "custom website design in sylhet"
  - For WordPress: "professional wordpress developer in sylhet", "wordpress expert in sylhet"
  - For MERN Stack: "best marn stack developer in sylhet"

  Write the review in a professional yet friendly and conversational tone. Use 3–5 sentences, and make it sound completely authentic as if a real person is writing it. Avoid a robotic tone. Do not include any quotation marks in the review.

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
