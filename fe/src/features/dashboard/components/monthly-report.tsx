import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui'
import { FileText, Calendar, X, GitCompare } from 'lucide-react'
import type { AssetsType } from '@/features/assets/view-all-assets/model'
import type { FilterType } from '../../assets/view-all-assets/model'
import type { DateFilter } from '../model/statistics-types'
import type { SetStateAction } from 'react'
import {
  filterAssetsByDate,
  calculateMonthlyStats,
  generateFilteredTrend,
  generateComparisonData,
  getDateRangeText,
} from '../utils'
import { DateFilter as DateFilterComponent } from './date-filter'
import { StatisticsCards } from './statistics-cards'
import { TrendCharts } from './trend-charts'
import { ComparativeAnalysis } from './comparative-analysis'
import { ExportMonthlyReport } from '@/components/ui/export/export-monthly-report'
import {
  CategoriesFilter,
  DepartmentsFilter,
  StatusFilter,
} from '../../assets/view-all-assets/_components/filter/_components'

interface MonthlyReportProps {
  assets: AssetsType[]
  className?: string
}

export const MonthlyReport = ({ assets, className = '' }: MonthlyReportProps) => {
  const [dateFilter, setDateFilter] = useState<DateFilter>({
    dateField: 'purchase',
    month: undefined,
    year: undefined,
  })

  const [assetFilter, setAssetFilter] = useState<FilterType>({
    assetName: '',
    categoryId: null,
    departmentId: null,
    status: null,
  })

  const [showComparison, _setShowComparison] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'comparison'>('overview')

  const handleAssetFilterChange: React.Dispatch<SetStateAction<FilterType>> = (value) => {
    const newFilter = typeof value === 'function' ? value(assetFilter) : value
    setAssetFilter(newFilter)
  }

  const clearDateFilter = () => {
    setDateFilter({
      dateField: 'purchase',
      month: undefined,
      year: undefined,
      startDate: undefined,
      endDate: undefined,
      singleDate: undefined,
    })
  }

  const clearCategoryFilter = () => {
    setAssetFilter((prev) => ({ ...prev, categoryId: null }))
  }

  const clearDepartmentFilter = () => {
    setAssetFilter((prev) => ({ ...prev, departmentId: null }))
  }

  const clearStatusFilter = () => {
    setAssetFilter((prev) => ({ ...prev, status: null }))
  }

  const handleClearAllFilters = () => {
    clearDateFilter()
    setAssetFilter({
      assetName: '',
      categoryId: null,
      departmentId: null,
      status: null,
    })
  }

  const getActiveFilters = () => {
    const filters = []

    if (dateFilter.month && dateFilter.year) {
      const monthName = new Date(2024, dateFilter.month - 1).toLocaleString('default', { month: 'long' })
      filters.push({
        key: 'date',
        label: `${monthName} ${dateFilter.year}`,
        onClear: clearDateFilter,
      })
    } else if (dateFilter.year && !dateFilter.month) {
      filters.push({
        key: 'date',
        label: `Year: ${dateFilter.year}`,
        onClear: clearDateFilter,
      })
    } else if (dateFilter.month && !dateFilter.year) {
      const monthName = new Date(2024, dateFilter.month - 1).toLocaleString('default', { month: 'long' })
      filters.push({
        key: 'date',
        label: `Month: ${monthName}`,
        onClear: clearDateFilter,
      })
    } else if (dateFilter.startDate && dateFilter.endDate) {
      filters.push({
        key: 'date',
        label: 'Date Range',
        onClear: clearDateFilter,
      })
    }

    if (assetFilter.categoryId) {
      const categoryName =
        assets.find((a) => a.category.id.toString() === assetFilter.categoryId)?.category.categoryName || 'Category'
      filters.push({
        key: 'category',
        label: categoryName,
        onClear: clearCategoryFilter,
      })
    }

    if (assetFilter.departmentId) {
      const departmentName =
        assets.find((a) => a.department.id.toString() === assetFilter.departmentId)?.department.departmentName ||
        'Department'
      filters.push({
        key: 'department',
        label: departmentName,
        onClear: clearDepartmentFilter,
      })
    }

    if (assetFilter.status) {
      filters.push({
        key: 'status',
        label: assetFilter.status,
        onClear: clearStatusFilter,
      })
    }

    return filters
  }

  const activeFilters = getActiveFilters()
  const hasActiveFilters = activeFilters.length > 0

  const filteredAssets = useMemo(() => {
    let result = filterAssetsByDate(assets, dateFilter)

    if (assetFilter.categoryId) {
      result = result.filter((asset) => asset.category.id.toString() === assetFilter.categoryId)
    }

    if (assetFilter.departmentId) {
      result = result.filter((asset) => asset.department.id.toString() === assetFilter.departmentId)
    }

    if (assetFilter.status) {
      result = result.filter((asset) => asset.status === assetFilter.status)
    }

    return result
  }, [assets, dateFilter, assetFilter])

  const departmentOnlyFiltered = useMemo(() => {
    return filterAssetsByDate(assets, dateFilter)
  }, [assets, dateFilter])

  const monthlyStats = useMemo(() => {
    return calculateMonthlyStats(filteredAssets)
  }, [filteredAssets])

  const departmentStats = useMemo(() => {
    return calculateMonthlyStats(departmentOnlyFiltered)
  }, [departmentOnlyFiltered])

  const trendData = useMemo(() => {
    return generateFilteredTrend(assets, dateFilter, assetFilter, 12)
  }, [assets, dateFilter, assetFilter])

  const comparisonData = useMemo(() => {
    if (!dateFilter.month || !dateFilter.year) return null
    return generateComparisonData(assets, dateFilter.month, dateFilter.year)
  }, [assets, dateFilter.month, dateFilter.year])

  const handleExport = (format: 'pdf' | 'csv' | 'html') => {
    console.log(`Exporting ${format} report for ${getDateRangeText(dateFilter)}`)
  }

  const tabs = [
    { key: 'overview', label: 'Overview', icon: FileText },
    { key: 'comparison', label: 'Comparison', icon: GitCompare },
  ]

  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <CardTitle className='flex items-center gap-2 text-2xl'>
              <FileText className='h-6 w-6' />
              Reports - {getDateRangeText(dateFilter)}
            </CardTitle>

            <div className='flex items-center gap-2'>
              {hasActiveFilters && (
                <Button
                  variant='outline'
                  size='default'
                  onClick={handleClearAllFilters}
                  className='h-9 gap-2'
                >
                  <X className='h-4 w-4' />
                  Clear All
                </Button>
              )}
              <div className='flex h-10 items-center'>
                <ExportMonthlyReport
                  data={monthlyStats}
                  assets={filteredAssets}
                  dateFilter={dateFilter}
                  onExport={handleExport}
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className='space-y-4'>
          <div className='flex flex-wrap items-end gap-4'>
            <DateFilterComponent
              dateFilter={dateFilter}
              onDateFilterChange={setDateFilter}
              assets={assets}
            />

            <div className='flex flex-col gap-2'>
              <label className='text-sm font-medium text-black dark:text-white'>Category</label>
              <div className='h-9 w-30 sm:w-45 [&_button]:h-full [&>*]:h-full [&>*]:w-full'>
                <CategoriesFilter
                  filteredAssets={assetFilter}
                  setFilteredAssets={handleAssetFilterChange}
                />
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-sm font-medium text-black dark:text-white'>Department</label>
              <div className='h-9 w-30 sm:w-45 [&_button]:h-full [&>*]:h-full [&>*]:w-full'>
                <DepartmentsFilter
                  filteredAssets={assetFilter}
                  setFilteredAssets={handleAssetFilterChange}
                />
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-sm font-medium text-black dark:text-white'>Status</label>
              <div className='h-9 w-30 sm:w-45 [&_button]:h-full [&>*]:h-full [&>*]:w-full'>
                <StatusFilter
                  filteredAssets={assetFilter}
                  setFilteredAssets={handleAssetFilterChange}
                />
              </div>
            </div>
          </div>

          {hasActiveFilters && (
            <div className='flex flex-wrap items-center gap-2'>
              <span className='text-sm font-medium text-gray-700 dark:text-gray-200'>Active filters:</span>
              {activeFilters.map((filter) => (
                <div
                  key={filter.key}
                  className='flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-sm text-blue-700'
                >
                  <span>{filter.label}</span>
                  <button
                    onClick={filter.onClear}
                    className='ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-200 text-blue-600 hover:bg-blue-300'
                  >
                    <X className='h-3 w-3' />
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className='flex space-x-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-700'>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-white text-gray-900 shadow dark:bg-gray-600 dark:text-gray-100'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-600/50 dark:hover:text-gray-100'
                }`}
              >
                <tab.icon className='h-4 w-4' />
                {tab.label}
              </button>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          {activeTab === 'overview' && (
            <div className='space-y-6'>
              <StatisticsCards
                stats={monthlyStats}
                showComparison={showComparison && !!comparisonData}
                comparisonData={
                  comparisonData
                    ? {
                        previousValue: comparisonData.previousPeriod.totalAssets,
                        growthRate: comparisonData.growthRate.assets,
                      }
                    : undefined
                }
              />

              {filteredAssets.length > 0 && (
                <TrendCharts
                  trendData={trendData}
                  departmentData={departmentStats.departmentBreakdown}
                  statusData={monthlyStats.statusDistribution}
                  showOverview={true}
                />
              )}

              {filteredAssets.length === 0 && (
                <Card>
                  <CardContent className='py-8'>
                    <div className='text-center text-gray-500'>
                      <Calendar className='mx-auto mb-4 h-12 w-12 text-gray-300' />
                      <h3 className='mb-2 text-lg font-medium'>No data found</h3>
                      <p className='text-sm'>Try adjusting your filters to see results.</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeTab === 'comparison' && (
            <>
              {comparisonData ? (
                <ComparativeAnalysis comparisonData={comparisonData} />
              ) : (
                <Card>
                  <CardContent className='py-8'>
                    <div className='text-center text-gray-500'>
                      <Calendar className='mx-auto mb-4 h-12 w-12 text-gray-300' />
                      <h3 className='mb-2 text-lg font-medium'>Comparison requires specific month and year</h3>
                      <p className='text-sm'>Please select both month and year to view comparison data.</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className='flex items-center gap-2'>
              <FileText className='h-5 w-5' />
              Report Summary
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='mt-0 grid grid-cols-1 gap-2 text-sm md:grid-cols-2 lg:grid-cols-4'>
            <div>
              <div className='font-medium text-gray-700 dark:text-gray-200'>Report Period</div>
              <div>{getDateRangeText(dateFilter)}</div>
            </div>
            <div>
              <div className='font-medium text-gray-700 dark:text-gray-200'>Total Assets</div>
              <div>{monthlyStats.totalAssets} assets</div>
            </div>
            <div>
              <div className='font-medium text-gray-700 dark:text-gray-200'>Generated</div>
              <div>{new Date().toLocaleDateString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
