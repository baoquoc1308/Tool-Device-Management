import { z } from 'zod'
export const createAssetFormSchema = z
  .object({
    assetName: z.string().min(2, { message: 'Asset name must be at least 2 characters' }),
    purchaseDate: z.date({ required_error: 'Purchase date is required' }),
    cost: z.coerce.number({
      required_error: 'Cost is required',
    }),
    warrantExpiry: z.date({ required_error: 'Warrant expiry date is required' }),
    serialNumber: z.string({ required_error: 'Serial number is required' }),
    categoryId: z.string({ required_error: 'Category is required' }),
    departmentId: z.string({ required_error: 'Department is required' }),
    owner: z.string().min(1, { message: 'Owner ID is required' }),
    file: z
      .instanceof(File, {
        message: 'File is required',
      })
      .nullable(),
    image: z
      .instanceof(File, {
        message: 'Image is required',
      })
      .nullable(),
  })
  .superRefine(
    (
      {
        purchaseDate,
        warrantExpiry,
      }: {
        purchaseDate: Date
        warrantExpiry: Date
      },
      ctx
    ) => {
      if (warrantExpiry.getTime() < purchaseDate.getTime()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Warrant expiry date must be after purchase date',
          path: ['warrantExpiry'],
        })
      }
    }
  )

export type CreateAssetFormType = z.infer<typeof createAssetFormSchema>
