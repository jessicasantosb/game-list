import z from 'zod';

export const gameUpdateSchema = z.object({
  data: z.object({
    title: z.string().min(3).max(50),
    description: z.string().max(100).optional(),
    image_url: z.string().url().optional().optional(),
    category: z.string(),
    platform: z.string(),
    favorite: z.coerce
      .boolean()
      .refine((value) => value === true)
      .optional(),
    status: z.enum(['done', 'playing', 'abandoned']),
    acquisition_date: z.coerce.date().optional(),
    finishi_date: z.coerce.date().optional(),
  }),
  id: z.string(),
});

export type GameUpdateRequest = z.infer<typeof gameUpdateSchema>;
