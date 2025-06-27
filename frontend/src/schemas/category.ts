import z from 'zod';

export const categorySchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().max(100).optional(),
});

export type CategoryRequest = z.infer<typeof categorySchema>;
