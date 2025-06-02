import { httpRequest } from '@/utils'

export const getAllRequestTransferWithFilter = async (status: string) => {
  return await httpRequest.get(`/request-transfer/filter`, {
    params: {
      status: status,
    },
  })
}
