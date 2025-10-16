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
  topic: z
    .string()
    .describe('The topic for the review, e.g., Web Development, SEO, etc.'),
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

  The review should sound like a real client who received a service from the company. Mention how the service helped them and why they’d recommend Ab Nahid Agency to others in Sylhet or Bangladesh.

  Focus the review on the following topic: {{{topic}}}.

  When writing about the topic, subtly and naturally include 1-2 relevant keywords from the following list, ONLY if they fit the selected topic. Do not stuff keywords.

  Keyword List:
  - For SEO/Digital Marketing: "best seo expert in sylhet", "top digital marketing agency in sylhet", "affordable seo service in bangladesh", "seo service for local business bd"
  - For Web Development: "best web development agency in sylhet", "next.js expert in sylhet", "custom website design in sylhet"
  - For WordPress: "professional wordpress developer in sylhet", "wordpress expert in sylhet"
  - For MERN Stack: "best marn stack developer in sylhet"


  Write the review in a professional and friendly tone, use 3–5 sentences, and make it sound completely authentic. Avoid a robotic tone. Do not include any quotation marks in the review.

  Critically, every review must be different. Do not use repetitive sentence structures or opening phrases like "I'm so glad". Vary the tone and focus of each review.
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
