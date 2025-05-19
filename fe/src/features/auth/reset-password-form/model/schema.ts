import { z } from 'zod'
export const resetPasswordFormSchema = z
  .object({
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    confirmPassword: z.string().min(1, { message: 'Confirm password is required' }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password and confirm password do not match',
        path: ['confirmPassword'],
      })
    }
  })

export type ResetPasswordFormType = z.infer<typeof resetPasswordFormSchema>
