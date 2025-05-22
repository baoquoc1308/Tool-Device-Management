import { tryCatch } from '@/utils'
import { httpRequest } from '@/utils'
const getAllDepartment = async () => {
  const { data, error } = await tryCatch(httpRequest.get('/departments'))

  if (error) return { success: false, error }

  return { success: true, data: data.data.data }
}

export default getAllDepartment
