import { z } from 'zod'
export const assignDepartmentSchema = z.object({
  userId: z.string({ required_error: 'User ID is required' }),
  departmentId: z.string({ required_error: 'Department ID is required' }),
})
export type AssignDepartmentType = z.infer<typeof assignDepartmentSchema>
