import type { AssetsType } from '@/features/assets/view-all-assets/model'
import type { TrendData, ComparisonData, DateFilter } from '../model/statistics-types'
import type { FilterType } from '../../assets/view-all-assets/model'
import { calculateMonthlyStats } from './statistics-calculator'
import { filterAssetsByDate, getPreviousMonth, getPreviousYear } from './date-filtering'

export const generateMonthlyTrend = (
  assets: AssetsType[],
  months: number = 12,
  additionalFilters?: {
    categoryId?: string | null
    departmentId?: string | null
    status?: string | null
  }
): TrendData[] => {
  const trendData: TrendData[] = []
  const currentDate = new Date()

  let filteredAssets = assets

  if (additionalFilters?.categoryId) {
    filteredAssets = filteredAssets.filter((asset) => asset.category.id.toString() === additionalFilters.categoryId)
  }

  if (additionalFilters?.departmentId) {
    filteredAssets = filteredAssets.filter((asset) => asset.department.id.toString() === additionalFilters.departmentId)
  }

  if (additionalFilters?.status) {
    filteredAssets = filteredAssets.filter((asset) => asset.status === additionalFilters.status)
  }

  for (let i = months - 1; i >= 0; i--) {
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
    const month = targetDate.getMonth() + 1
    const year = targetDate.getFullYear()

    const monthlyAssets = filterAssetsByDate(filteredAssets, {
      month,
      year,
      dateField: 'purchase',
    })

    const newAssets = filteredAssets.filter((asset) => {
      const purchaseDate = new Date(asset.purchaseDate)
      return purchaseDate.getMonth() + 1 === month && purchaseDate.getFullYear() === year
    })

    const cumulativeAssets = filteredAssets.filter((asset) => {
      const purchaseDate = new Date(asset.purchaseDate)
      const assetDate = new Date(purchaseDate.getFullYear(), purchaseDate.getMonth(), 1)
      const targetDateMonth = new Date(year, month - 1, 1)
      return assetDate <= targetDateMonth
    })

    const retiredAssets = monthlyAssets.filter((asset) => asset.status === 'Retired' || asset.status === 'Disposed')

    trendData.push({
      month: targetDate.toLocaleDateString('en-US', { month: 'short' }),
      year,
      totalAssets: cumulativeAssets.length,
      totalValue: cumulativeAssets.reduce((sum, asset) => sum + (asset.cost || 0), 0),
      newAssets: newAssets.length,
      retiredAssets: retiredAssets.length,
    })
  }

  return trendData
}

export const generateFilteredTrend = (
  baseAssets: AssetsType[],
  dateFilter: DateFilter,
  assetFilter: FilterType,
  months: number = 12
): TrendData[] => {
  let filteredAssets = baseAssets

  if (dateFilter.month || dateFilter.year || dateFilter.startDate || dateFilter.endDate) {
    filteredAssets = filterAssetsByDate(filteredAssets, dateFilter)
  }

  if (assetFilter.categoryId) {
    filteredAssets = filteredAssets.filter((asset) => asset.category.id.toString() === assetFilter.categoryId)
  }

  if (assetFilter.departmentId) {
    filteredAssets = filteredAssets.filter((asset) => asset.department.id.toString() === assetFilter.departmentId)
  }

  if (assetFilter.status) {
    filteredAssets = filteredAssets.filter((asset) => asset.status === assetFilter.status)
  }

  const trendData: TrendData[] = []
  const currentDate = new Date()

  for (let i = months - 1; i >= 0; i--) {
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
    const month = targetDate.getMonth() + 1
    const year = targetDate.getFullYear()

    const monthAssets = filteredAssets.filter((asset) => {
      const purchaseDate = new Date(asset.purchaseDate)
      return purchaseDate.getMonth() + 1 === month && purchaseDate.getFullYear() === year
    })

    const cumulativeAssets = filteredAssets.filter((asset) => {
      const purchaseDate = new Date(asset.purchaseDate)
      const assetDate = new Date(purchaseDate.getFullYear(), purchaseDate.getMonth(), 1)
      const targetDateMonth = new Date(year, month - 1, 1)
      return assetDate <= targetDateMonth
    })

    trendData.push({
      month: targetDate.toLocaleDateString('en-US', { month: 'short' }),
      year,
      totalAssets: cumulativeAssets.length,
      totalValue: cumulativeAssets.reduce((sum, asset) => sum + (asset.cost || 0), 0),
      newAssets: monthAssets.length,
      retiredAssets: monthAssets.filter((asset) => asset.status === 'Retired' || asset.status === 'Disposed').length,
    })
  }

  return trendData
}

export const generateComparisonData = (
  assets: AssetsType[],
  currentMonth: number,
  currentYear: number
): ComparisonData => {
  const currentAssets = filterAssetsByDate(assets, {
    month: currentMonth,
    year: currentYear,
    dateField: 'purchase',
  })
  const currentPeriod = calculateMonthlyStats(currentAssets)

  const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(currentMonth, currentYear)
  const previousAssets = filterAssetsByDate(assets, {
    month: prevMonth,
    year: prevMonthYear,
    dateField: 'purchase',
  })
  const previousPeriod = calculateMonthlyStats(previousAssets)

  const { month: yoyMonth, year: yoyYear } = getPreviousYear(currentMonth, currentYear)
  const yoyAssets = filterAssetsByDate(assets, {
    month: yoyMonth,
    year: yoyYear,
    dateField: 'purchase',
  })
  const yearOverYear = calculateMonthlyStats(yoyAssets)

  const assetGrowthRate =
    ((currentPeriod.totalAssets - previousPeriod.totalAssets) / (previousPeriod.totalAssets || 1)) * 100
  const valueGrowthRate =
    ((currentPeriod.totalValue - previousPeriod.totalValue) / (previousPeriod.totalValue || 1)) * 100

  return {
    currentPeriod,
    previousPeriod,
    yearOverYear,
    growthRate: {
      assets: assetGrowthRate,
      value: valueGrowthRate,
    },
  }
}

export const generateYearlyTrend = (assets: AssetsType[], years: number = 5): TrendData[] => {
  const trendData: TrendData[] = []
  const currentYear = new Date().getFullYear()

  for (let i = years - 1; i >= 0; i--) {
    const targetYear = currentYear - i

    const yearlyAssets = filterAssetsByDate(assets, {
      year: targetYear,
      dateField: 'purchase',
    })

    const newAssets = yearlyAssets.filter((asset) => {
      return new Date(asset.purchaseDate).getFullYear() === targetYear
    })

    const retiredAssets = yearlyAssets.filter((asset) => asset.status === 'Retired' || asset.status === 'Disposed')

    trendData.push({
      month: 'Dec',
      year: targetYear,
      totalAssets: yearlyAssets.length,
      totalValue: yearlyAssets.reduce((sum, asset) => sum + (asset.cost || 0), 0),
      newAssets: newAssets.length,
      retiredAssets: retiredAssets.length,
    })
  }

  return trendData
}

export const calculateTrendDirection = (data: TrendData[]): 'up' | 'down' | 'stable' => {
  if (data.length < 2) return 'stable'

  const recent = data[data.length - 1]
  const previous = data[data.length - 2]

  if (recent.totalValue > previous.totalValue * 1.05) return 'up'
  if (recent.totalValue < previous.totalValue * 0.95) return 'down'
  return 'stable'
}
