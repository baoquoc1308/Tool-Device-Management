import { tryCatch } from '@/utils'
import { httpRequest } from '@/utils'
const getAllUsers = async () => {
  const { data, error } = await tryCatch(httpRequest.get('/users'))

  if (error) return { success: false, error }

  return { success: true, data: data.data.data }
}

export default getAllUsers
