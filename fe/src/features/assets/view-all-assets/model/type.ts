export type AssetStatus = 'New' | 'In Use' | 'Under Maintenance' | 'Retired' | 'Disposed'

export type FilterType = {
  assetName: string | ''
  categoryId: string | null
  departmentId: string | null
  status: string | null
}

export type AssetsType = {
  id: number
  assetName: string
  purchaseDate: Date
  cost: number
  owner: {
    id: number
    firstName: string
    lastName: string
    email: string
  }
  warrantExpiry: Date
  status: AssetStatus
  serialNumber: string
  fileAttachment: string
  imageUpload: string
  category: {
    id: number
    categoryName: string
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
