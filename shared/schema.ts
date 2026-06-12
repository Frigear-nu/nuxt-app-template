import { z } from 'zod/v4'

export const frigearUserSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  email: z.email(),
  picture: z.url().nullish().optional(),
  role: z.string(),
})
