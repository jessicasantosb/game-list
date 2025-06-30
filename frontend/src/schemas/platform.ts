import z from 'zod';

export const platformSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must have 3 or more characters' })
    .max(50, { message: 'Title must be at most 50 characters long' }),
  image_url: z.string().url().optional().or(z.literal('')),
  company: z.string().optional().or(z.literal('')),
  acquisition_year: z.coerce.date().optional().or(z.literal('')),
});

export type PlatformRequest = z.infer<typeof platformSchema>;
