import z from 'zod';

export const platformUpdateSchema = z.object({
  title: z.string().min(3).max(50),
  image_url: z.string().url().optional(),
  company: z.string().optional(),
  acquisition_year: z.coerce.date().optional(),
});

export type PlatformUpdateSchema = z.infer<typeof platformUpdateSchema>;
