import { httpRequest } from '@/utils'

export const getAllMaintenanceSchedules = async () => {
  return await httpRequest.get('/maintenance-schedules')
}
