import z from 'zod';

export const platformCreateSchema = z.object({
  title: z.string().min(3).max(50),
  image_url: z.string().url().optional().or(z.literal('')),
  company: z.string().optional().or(z.literal('')),
  acquisition_year: z.coerce.date().optional().or(z.literal('')),
});

export type PlatformCreateRequest = z.infer<typeof platformCreateSchema>;
