import z from 'zod';

export const signUpSchema = z
  .object({
    full_name: z
      .string()
      .min(3, { message: 'Name must have at least 3 characters' })
      .max(50, { message: 'Name must be at most 50 characters long' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must have at least 8 characters' })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/, {
        message:
          'Password must include at least one letter, one number, and one special character',
      }),
    confirm_password: z.string(),
  })
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export type SignUpRequest = z.infer<typeof signUpSchema>;
