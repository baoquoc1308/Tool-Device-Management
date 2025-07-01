export interface DateFilter {
  month?: number
  year?: number
  dateField: 'purchase' | 'warranty' | 'created'
  startDate?: Date
  endDate?: Date
  singleDate?: Date
}

export interface MonthlyStats {
  totalAssets: number
  totalValue: number
  newAssetsCount: number
  retiredAssetsCount: number
  maintenanceCount: number
  inUseCount: number
  categoryBreakdown: CategoryStats[]
  statusDistribution: StatusStats[]
  departmentBreakdown: DepartmentStats[]
  monthlyTrend: TrendData[]
}

export interface CategoryStats {
  categoryId: number
  categoryName: string
  count: number
  totalValue: number
  percentage: number
}

export interface StatusStats {
  status: string
  count: number
  percentage: number
  totalValue: number
}

export interface DepartmentStats {
  departmentId: number
  departmentName: string
  count: number
  totalValue: number
  percentage: number
  locationName?: string
}

export interface TrendData {
  month: string
  year: number
  totalAssets: number
  totalValue: number
  newAssets: number
  retiredAssets: number
}

export interface ComparisonData {
  currentPeriod: MonthlyStats
  previousPeriod: MonthlyStats
  yearOverYear: MonthlyStats
  growthRate: {
    assets: number
    value: number
  }
}

export interface ExportConfig {
  format: 'pdf' | 'csv' | 'html'
  dateRange: DateFilter
  includeCharts: boolean
  includeTrends: boolean
  customFilename?: string
}
