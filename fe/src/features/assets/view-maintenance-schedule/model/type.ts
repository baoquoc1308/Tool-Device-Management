export type MaintenanceSchedule = {
  id: number
  startDate: Date
  endDate: Date
  asset: {
    id: number
    assetName: string
    status: string
    fileAttachment: string
    imageUpload: string
  }
}
