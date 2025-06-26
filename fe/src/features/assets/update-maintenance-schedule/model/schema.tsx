import { z } from 'zod'
export const updateMaintenanceScheduleSchema = z
  .object({
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
      if (endDate.getTime < startDate.getTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'End date must be after start date',
          path: ['endDate'],
        })
      }
    }
  )
export type UpdateMaintenanceScheduleType = z.infer<typeof updateMaintenanceScheduleSchema>
