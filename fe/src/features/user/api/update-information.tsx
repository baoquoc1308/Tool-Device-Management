import { httpRequest } from '@/utils'
import type { UpdateInformationFormType } from '../model/update-information-schema'

export const updateInformation = async (value: UpdateInformationFormType) => {
  return await httpRequest.patch('/user/information', { ...value }, { 'Content-Type': 'multipart/form-data' })
}
