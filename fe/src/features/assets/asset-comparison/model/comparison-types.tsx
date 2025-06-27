export interface ComparisonAsset {
  id: number
  assetName: string
  serialNumber: string
  cost: number
  purchaseDate: string
  warrantExpiry: string
  imageUpload: string
  status: string
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
  location: {
    id: number
    locationAddress: string
  }
}
export interface ComparisonField {
  key: keyof ComparisonAsset | string
  label: string
  type: 'text' | 'number' | 'date' | 'currency' | 'image' | 'badge'
  group: 'basic' | 'financial' | 'location' | 'status'
}

export interface ComparisonData {
  assets: ComparisonAsset[]
  fields: ComparisonField[]
}

export interface ComparisonPreset {
  id: string
  name: string
  assetIds: number[]
  createdAt: string
}
