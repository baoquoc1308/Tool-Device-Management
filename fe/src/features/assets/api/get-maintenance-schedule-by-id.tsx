import { httpRequest } from '@/utils'

export const getMaintenanceScheduleById = async (id: string) => {
  return await httpRequest.get('/maintenance-schedules/' + id)
}
