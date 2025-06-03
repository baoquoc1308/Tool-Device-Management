import { z } from 'zod'

export const approveFormSchema = z.object({
  assetId: z.string({
    required_error: 'You must select an asset to transfer',
  }),
})

export type ApproveFormValues = z.infer<typeof approveFormSchema>
