import { httpRequest } from '@/utils'

export const denyRequestTransfer = async (id: string) => {
  return await httpRequest.patch(`/request-transfer/deny/${id}`)
}
