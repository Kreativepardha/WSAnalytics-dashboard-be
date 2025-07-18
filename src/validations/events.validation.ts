import { z } from 'zod';

export const eventSchema = z.object({
  type: z.enum(['pageview', 'click', 'session_end']),
  page: z.string().regex(/^\/[a-z0-9-_\/]*$/, { message: 'Invalid page path' }),
  sessionId: z.string(),
  timestamp: z.coerce.date(),
  country: z.string(),
   metadata: z
    .object({
      browser: z.string().optional(),
      device: z.string().optional(),
    })
    .passthrough()
    .optional(),
});