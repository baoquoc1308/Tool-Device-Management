import { httpRequest } from '@/utils'

export const approveRequestTransfer = async (assetId: string, id: string) => {
  return await httpRequest.patch(`/request-transfer/confirm/${id}`, {
    assetId: parseInt(assetId),
  })
}
