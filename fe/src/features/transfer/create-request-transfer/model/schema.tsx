import { z } from 'zod'
export const formCreateRequestTransferSchema = z.object({
  categoryId: z.string({
    required_error: 'Category is required',
  }),
  description: z
    .string()
    .min(5, { message: 'Description must be at least 5 characters' })
    .max(500, { message: 'Description cannot exceed 500 characters' }),
})

export type FormCreateRequestTransfer = z.infer<typeof formCreateRequestTransferSchema>
