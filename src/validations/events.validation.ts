import { z } from 'zod';

export const eventSchema = z.object({
  type: z.enum(['pageview', 'click', 'session_end']),
  page: z.string(),
  sessionId: z.string(),
  timestamp: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid timestamp format",
  }),
  country: z.string(),
  metadata: z.record(z.any()).optional(),
});
