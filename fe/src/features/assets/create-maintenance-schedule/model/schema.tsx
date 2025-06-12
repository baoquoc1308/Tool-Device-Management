import { z } from 'zod'
export const createMaintenanceScheduleSchema = z
  .object({
    assetId: z.string({ required_error: 'Asset is required' }),
    startDate: z.date({ required_error: 'Start date is required' }),
    endDate: z.date({ required_error: 'End date is required' }),
  })
  .superRefine(
    (
      {
        startDate,
        endDate,
      }: {
        startDate: Date
        endDate: Date
      },
      ctx
    ) => {
      if (endDate.getTime() < startDate.getTime()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'End date must be after start date',
          path: ['endDate'],
        })
      }
    }
  )
export type CreateMaintenanceScheduleType = z.infer<typeof createMaintenanceScheduleSchema>
