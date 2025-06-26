import { z } from 'zod'

export const updateInformationFormSchema = z.object({
  firstName: z.string({ required_error: 'First name is required' }).min(1, 'First name is required'),
  lastName: z.string({ required_error: 'Last name is required' }).min(1, 'Last name is required'),
  image: z
    .union([
      z
        .instanceof(File, { message: 'Avatar is required' })
        .refine((file) => !file || file.size !== 0 || file.size <= 5000000, `Max image size is 5MB`)
        .refine(
          (file) =>
            !file || file.type === '' || ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type),
          'Only .jpg, .jpeg, .png and .webp formats are supported'
        ),
      z.string(),
    ])
    .optional()
    .refine((value) => !value || value instanceof File || typeof value === 'string', {
      message: 'Avatar must be a valid file or URL',
    }),
})

export type UpdateInformationFormType = z.infer<typeof updateInformationFormSchema>
