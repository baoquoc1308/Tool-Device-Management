export type AssetLog = {
  assignUserId: number
  action: 'Create' | 'Update' | 'Delete' | 'Transfer' | 'Maintenance'
  timeStamp: Date
  changeSummary: string
  byUserId: {
    id: number
    firstName: string
    lastName: string
    email: string
  }
}
