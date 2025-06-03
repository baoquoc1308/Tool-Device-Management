export type RequestTransferStatusType = 'Pending' | 'Confirm' | 'Deny'
export type RequestTransferType = {
  id: number
  status: RequestTransferStatusType
  category: {
    id: number
    categoryName: string
  }
  description: string
  user: {
    id: number
    firstName: string
    lastName: string
    email: string
    departmentId: number
  }
}
export type RequestTransferResponseType = {
  data: RequestTransferType[]
  total: number
  page: number
  limit: number
  total_page: number
}
