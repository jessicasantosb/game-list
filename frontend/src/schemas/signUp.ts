import z from 'zod';

export const signUpSchema = z
  .object({
    full_name: z.string().min(3),
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/),
    confirm_password: z.string(),
  })
  .refine(({ password, confirm_password }) => password === confirm_password, {
    path: ['confirm_password'],
  });

export type SignUpRequest = z.infer<typeof signUpSchema>;
