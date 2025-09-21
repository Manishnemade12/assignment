'use server';

/**
 * @fileOverview A flow to determine the appropriate status for a track based on its title.
 *
 rmineTrackStatusOutput - The return type for the determineTrackStatus function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetermineTrackStatusInputSchema = z.object({
  trackTitle: z.string().describe('The title of the track.'),
});
export type DetermineTrackStatusInput = z.infer<typeof DetermineTrackStatusInputSchema>;

const DetermineTrackStatusOutputSchema = z.object({
  status: z
    .enum(['Published', 'Draft', 'Submitted'])
    .describe('The determined status of the track.'),
});
export type DetermineTrackStatusOutput = z.infer<typeof DetermineTrackStatusOutputSchema>;

export async function determineTrackStatus(
  input: DetermineTrackStatusInput
): Promise<DetermineTrackStatusOutput> {
  return determineTrackStatusFlow(input);
}

const prompt = ai.definePrompt({
  name: 'determineTrackStatusPrompt',
  input: {schema: DetermineTrackStatusInputSchema},
  output: {schema: DetermineTrackStatusOutputSchema},
  prompt: `You are an AI assistant helping to determine the appropriate status for a music track.
  Given the track title, suggest one of the following statuses: Published, Draft, or Submitted.

  Consider these guidelines:
  - Published: The track is finalized and available to the public.
  - Draft: The track is still a work in progress and not ready for release.
  - Submitted: The track has been submitted for review or approval.

  Track Title: {{{trackTitle}}}

  Based on the track title, what is the most appropriate status?`,
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
