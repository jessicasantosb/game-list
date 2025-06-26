import z from 'zod';

export const categoryCreateSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().max(100).optional(),
});

export type CategoryCreateRequest = z.infer<typeof categoryCreateSchema>;
