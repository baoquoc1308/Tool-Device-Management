import { httpRequest } from '@/utils'
import { tryCatch } from '@/utils'

const getAllCategories = async () => {
  const { data, error } = await tryCatch(httpRequest.get('/categories'))

  if (error) return { success: false, error }

  return { success: true, data: data.data.data }
}

export default getAllCategories
