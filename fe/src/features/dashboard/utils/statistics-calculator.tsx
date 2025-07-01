import type { AssetsType } from '@/features/assets/view-all-assets/model'
import type { MonthlyStats, CategoryStats, StatusStats, DepartmentStats } from '../model'

export const calculateMonthlyStats = (assets: AssetsType[]): MonthlyStats => {
  if (!assets || assets.length === 0) {
    return {
      totalAssets: 0,
      totalValue: 0,
      inUseCount: 0,
      newAssetsCount: 0,
      retiredAssetsCount: 0,
      maintenanceCount: 0,
      categoryBreakdown: [],
      statusDistribution: [],
      departmentBreakdown: [],
      monthlyTrend: [],
    }
  }

  const totalAssets = assets.length
  const totalValue = assets.reduce((sum, asset) => sum + (asset.cost || 0), 0)

  const statusCounts = assets.reduce(
    (acc, asset) => {
      acc[asset.status] = (acc[asset.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const newAssetsCount = statusCounts['New'] || 0
  const retiredAssetsCount = (statusCounts['Retired'] || 0) + (statusCounts['Disposed'] || 0)
  const maintenanceCount = statusCounts['Under Maintenance'] || 0

  const categoryMap = new Map<string, { count: number; totalValue: number; categoryId: number }>()
  assets.forEach((asset) => {
    const key = asset.category.categoryName
    const existing = categoryMap.get(key) || { count: 0, totalValue: 0, categoryId: asset.category.id }
    categoryMap.set(key, {
      count: existing.count + 1,
      totalValue: existing.totalValue + (asset.cost || 0),
      categoryId: asset.category.id,
    })
  })

  const categoryBreakdown: CategoryStats[] = Array.from(categoryMap.entries()).map(([name, data]) => ({
    categoryId: data.categoryId,
    categoryName: name,
    count: data.count,
    totalValue: data.totalValue,
    percentage: (data.count / totalAssets) * 100,
  }))

  const statusDistribution: StatusStats[] = Object.entries(statusCounts).map(([status, count]) => {
    const statusValue = assets
      .filter((asset) => asset.status === status)
      .reduce((sum, asset) => sum + (asset.cost || 0), 0)

    return {
      status,
      count,
      percentage: (count / totalAssets) * 100,
      totalValue: statusValue,
    }
  })

  const departmentMap = new Map<
    string,
    { count: number; totalValue: number; departmentId: number; locationName?: string }
  >()
  assets.forEach((asset) => {
    const key = asset.department.departmentName
    const existing = departmentMap.get(key) || {
      count: 0,
      totalValue: 0,
      departmentId: asset.department.id,
      locationName: asset.department.location?.locationAddress,
    }
    departmentMap.set(key, {
      count: existing.count + 1,
      totalValue: existing.totalValue + (asset.cost || 0),
      departmentId: asset.department.id,
      locationName: existing.locationName,
    })
  })

  const departmentBreakdown: DepartmentStats[] = Array.from(departmentMap.entries()).map(([name, data]) => ({
    departmentId: data.departmentId,
    departmentName: name,
    count: data.count,
    totalValue: data.totalValue,
    percentage: (data.count / totalAssets) * 100,
    locationName: data.locationName,
  }))

  return {
    totalAssets,
    totalValue,
    newAssetsCount,
    inUseCount: statusCounts['In Use'] || 0,
    retiredAssetsCount,
    maintenanceCount,
    categoryBreakdown: categoryBreakdown.sort((a, b) => b.count - a.count),
    statusDistribution: statusDistribution.sort((a, b) => b.count - a.count),
    departmentBreakdown: departmentBreakdown.sort((a, b) => b.count - a.count),
    monthlyTrend: [],
  }
}

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`
}

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value)
}

export const calculateGrowthRate = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0
  return ((current - previous) / previous) * 100
}
