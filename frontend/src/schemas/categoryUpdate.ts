import z from 'zod';

export const categoryUpdateSchema = z.object({
  data: z.object({
    title: z.string().min(3).max(50),
    description: z.string().max(100).optional(),
  }),
  id: z.string(),
});

export type CategoryUpdateRequest = z.infer<typeof categoryUpdateSchema>;
