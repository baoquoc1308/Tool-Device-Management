export type AssignmentData = {
  id: number
  userAssigned: {
    id: number
    firstName: string
    lastName: string
    email: string
  }
  userAssign: {
    id: number
    firstName: string
    lastName: string
    email: string
  }
  asset: {
    id: number
    assetName: string
    status: string
    fileAttachment: string
    imageUpload: string
  }
  department: {
    id: number
    departmentName: string
    location: {
      id: number
      locationAddress: string
    }
  }
}

export type FilterData = {
  assetName: string
  emailAssigned: string
  emailAssign: string
}
