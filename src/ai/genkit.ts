/**
 * @fileoverview This file initializes and configures the Genkit AI instance.
 */
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {genkitEval} from 'genkit/eval';
import {googleCloud} from '@genkit-ai/google-cloud';

export const ai = genkit({
  plugins: [
    googleAI(),
    googleCloud(),
    genkitEval({
      judge: 'googleai/gemini-1.5-flash-latest',
      metrics: ['reasoning', 'correctness'],
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
