import z from 'zod';

export const categorySchema = z.object({
  title: z.string().min(3, {message: 'Title must have 3 or more characters'}).max(50, {message: 'Title must be at most 3 characters long'}),
  description: z.string().max(100, {message: 'Description must be at most 3 characters long'}).optional(),
});

export type CategoryRequest = z.infer<typeof categorySchema>;
