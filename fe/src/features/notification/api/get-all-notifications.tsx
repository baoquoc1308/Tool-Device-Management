import { httpRequest } from '@/utils'

export const getAllNotifications = async () => {
  return await httpRequest.get('/notifications')
}
