'use server';
/**
 * @fileOverview An AI flow to determine the status of a music track.
 *
 * - determineTrackStatus - A function that suggests a status for a track based on its title.
 * - DetermineTrackStatusInput - The input type for the determineTrackStatus function.
 * - DetermineTrackStatusOutput - The return type for the determineTrackStatus function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit/zod';
import {TrackStatus} from '@/lib/types';

const DetermineTrackStatusInputSchema = z.object({
  trackTitle: z.string().describe('The title of the music track.'),
});
export type DetermineTrackStatusInput = z.infer<
  typeof DetermineTrackStatusInputSchema
>;

const DetermineTrackStatusOutputSchema = z.object({
  status: z
    .enum(['Published', 'Draft', 'Submitted'])
    .describe('The suggested status for the track.'),
});
export type DetermineTrackStatusOutput = z.infer<
  typeof DetermineTrackStatusOutputSchema
>;

export async function determineTrackStatus(
  input: DetermineTrackStatusInput
): Promise<DetermineTrackStatusOutput> {
  return determineTrackStatusFlow(input);
}

const prompt = ai.definePrompt({
  name: 'determineTrackStatusPrompt',
  input: {schema: DetermineTrackStatusInputSchema},
  output: {schema: DetermineTrackStatusOutputSchema},
  prompt: `You are an expert music curator. Based on the track title, suggest a status.
- If the title seems like a work-in-progress, like "demo", "sketch", or "idea", suggest "Draft".
- If the title seems complete and ready for release, suggest "Submitted".
- If the title implies it's already out, like "live version" or includes a release date, suggest "Published".
- Otherwise, default to "Submitted".

Track Title: {{{trackTitle}}}`,
});

const determineTrackStatusFlow = ai.defineFlow(
  {
    name: 'determineTrackStatusFlow',
    inputSchema: DetermineTrackStatusInputSchema,
    outputSchema: DetermineTrackStatusOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
