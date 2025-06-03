import { httpRequest } from '@/utils'
import type { FormCreateRequestTransfer } from '../create-request-transfer/model'
export const createNewRequestTransfer = async (data: FormCreateRequestTransfer) => {
  return await httpRequest.post('/request-transfer', {
    categoryId: parseInt(data.categoryId),
    description: data.description,
  })
}
