import { httpRequest } from '@/utils'

export const getRequestTransferInformation = async (id: string) => {
  return await httpRequest.get(`/request-transfer/${id}`)
}
