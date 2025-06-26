import z from 'zod';

export const platformUpdateSchema = z.object({
  data: z.object({
    title: z.string().min(3).max(50),
    image_url: z.string().url().optional(),
    company: z.string().optional(),
    acquisition_year: z.coerce.date().optional(),
  }),
  id: z.string(),
});

export type PlatformUpdateRequest = z.infer<typeof platformUpdateSchema>;
