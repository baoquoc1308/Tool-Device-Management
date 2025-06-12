import { httpRequest } from '@/utils'
import type { UpdateMaintenanceScheduleType } from '../update-maintenance-schedule/model/schema'

export const updateMaintenanceSchedule = (id: string, data: UpdateMaintenanceScheduleType) => {
  return httpRequest.patch(`/maintenance-schedules/${id}`, { ...data })
}
