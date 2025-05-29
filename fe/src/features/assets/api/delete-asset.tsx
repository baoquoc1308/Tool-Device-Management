import { httpRequest } from '@/utils'

export const deleteAsset = async (id: string) => {
  return await httpRequest.delete(`/assets/${id}`)
}
