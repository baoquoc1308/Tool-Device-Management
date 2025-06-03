import { z } from 'zod'
export const assignRoleSchema = z.object({
  userId: z.string({ required_error: 'User ID is required' }),
  role: z.string({ required_error: 'Role ID is required' }),
})
export type AssignRoleType = z.infer<typeof assignRoleSchema>
