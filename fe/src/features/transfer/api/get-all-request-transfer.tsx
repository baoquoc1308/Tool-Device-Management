import { httpRequest } from '@/utils'

export const getAllRequestTransfer = async () => {
  return await httpRequest.get('/request-transfer/filter')
}
