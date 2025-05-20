import { tryCatch } from '@/utils'
import { httpRequest } from '@/utils'

export const signOut = async () => {
  const { data, error } = await tryCatch(httpRequest.post('/auth/logout'))
  if (error) return { success: false, error }
  return { success: true, data }
}
