import z from 'zod';

export const gameSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must have 3 or more characters' })
    .max(50, { message: 'Title must be at most 50 characters long' }),
  description: z
    .string()
    .max(100, { message: 'Description must be at most 100 characters long' })
    .optional(),
  image_url: z.string().url().optional(),
  category: z.string({ message: 'Category is required' }),
  platform: z.string().optional(),
  favorite: z.coerce
    .boolean()
    .refine((value) => value === true)
    .optional(),
  status: z.enum(['Done', 'Playing', 'Abandoned']),
  acquisition_date: z.coerce.date({ message: 'Acquisition date is required' }),
  finish_date: z.coerce.date().optional(),
});

export type GameRequest = z.infer<typeof gameSchema>;
