import { httpRequest } from '@/utils'

export const getAllCategories = async () => {
  return await httpRequest.get('/categories')
}
