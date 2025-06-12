import { httpRequest } from '@/utils'
import type { CreateMaintenanceScheduleType } from '../create-maintenance-schedule/model'

export const createMaintenanceSchedule = async (value: CreateMaintenanceScheduleType) => {
  return await httpRequest.post('/maintenance-schedules', { ...value, assetId: parseInt(value.assetId) })
}
