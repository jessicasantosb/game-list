import z from 'zod';

export const gameSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().max(100).optional(),
  image_url: z.string().url().optional(),
  category: z.string(),
  platform: z.string().optional(),
  favorite: z.coerce
    .boolean()
    .refine((value) => value === true)
    .optional(),
  status: z.enum(['Done', 'Playing', 'Abandoned']),
  acquisition_date: z.coerce.date(),
  finish_date: z.coerce.date().optional(),
});

export type GameRequest = z.infer<typeof gameSchema>;
