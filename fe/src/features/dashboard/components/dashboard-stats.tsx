import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { ReusablePieChart } from '@/components/ui/charts/pie-chart'
import type { DashboardData } from '../api/type'
import type { AssetsType } from '@/features/assets/view-all-assets/model'
import { ClockIcon, Loader2, PieChart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface DashboardStatsProps {
  stats: DashboardData
  assets: AssetsType[]
  isPending: boolean
}

export const DashboardStats = ({ stats, assets, isPending }: DashboardStatsProps) => {
  const navigate = useNavigate()

  if (!isPending && (!assets || assets.length === 0)) {
    return (
      <div className='space-y-4 sm:space-y-6'>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          <Card>
            <CardContent className='p-3 sm:p-4'>
              <div className='text-muted-foreground text-xs font-medium sm:text-sm'>No Assets Available</div>
            </CardContent>
          </Card>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2'>
          <Card>
            <CardHeader className='pb-3 sm:pb-6'>
              <CardTitle className='text-base sm:text-lg'>Asset Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-muted-foreground flex h-[250px] items-center justify-center sm:h-[300px]'>
                <div className='text-center'>
                  <p className='text-sm font-medium sm:text-lg'>No results.</p>
                  <p className='text-xs sm:text-sm'>Try adjusting your filters or create a new asset.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='pb-3 sm:pb-6'>
              <CardTitle className='text-base sm:text-lg'>
                <div className='flex items-center gap-2'>
                  <ClockIcon className='h-5 w-5' />
                  Recent Purchased Assets
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-muted-foreground flex h-[250px] items-center justify-center sm:h-[300px]'>
                <div className='text-center'>
                  <p className='text-sm font-medium sm:text-lg'>No assets found.</p>
                  <p className='text-xs sm:text-sm'>Assets will appear here once available.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const getStatusCount = (status: string) => {
    return assets?.filter((asset) => asset.status === status)?.length || 0
  }

  const newCount = getStatusCount('New')
  const retiredAndDisposedCount = getStatusCount('Retired') + getStatusCount('Disposed')
  const inUseCount = getStatusCount('In Use')
  const underMaintenanceCount = getStatusCount('Under Maintenance')

  const pieChartData = [
    { name: 'In Use', value: inUseCount },
    { name: 'Under Maintenance', value: underMaintenanceCount },
    { name: 'Retired / Disposed', value: retiredAndDisposedCount },
    { name: 'New', value: newCount },
  ]

  return (
    <div className='space-y-4 sm:space-y-6'>
      <div className='xs:grid-cols-2 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-5'>
        <Card className='w-full transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50'>
          <CardContent className='p-3 sm:p-4'>
            <div className='text-muted-foreground text-xs font-medium sm:text-sm dark:text-gray-400'>Total Assets</div>
            <div className='text-base font-bold sm:text-lg md:text-xl lg:text-2xl dark:text-white'>
              {stats.total_assets}
            </div>
          </CardContent>
        </Card>

        <Card className='w-full transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50'>
          <CardContent className='p-3 sm:p-4'>
            <div className='text-muted-foreground text-xs font-medium sm:text-sm dark:text-gray-400'>New</div>
            <div className='text-base font-bold text-green-600 sm:text-lg md:text-xl lg:text-2xl dark:text-green-400'>
              {newCount}
            </div>
          </CardContent>
        </Card>

        <Card className='w-full transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50'>
          <CardContent className='p-3 sm:p-4'>
            <div className='text-muted-foreground text-xs font-medium sm:text-sm dark:text-gray-400'>In Use</div>
            <div className='text-base font-bold text-blue-600 sm:text-lg md:text-xl lg:text-2xl dark:text-blue-400'>
              {inUseCount}
            </div>
          </CardContent>
        </Card>

        <Card className='w-full transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50'>
          <CardContent className='p-3 sm:p-4'>
            <div className='text-muted-foreground text-xs font-medium sm:text-sm dark:text-gray-400'>
              Under Maintenance
            </div>
            <div className='text-base font-bold text-amber-600 sm:text-lg md:text-xl lg:text-2xl dark:text-amber-400'>
              {underMaintenanceCount}
            </div>
          </CardContent>
        </Card>

        <Card className='w-full transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50'>
          <CardContent className='p-3 sm:p-4'>
            <div className='text-muted-foreground text-xs font-medium sm:text-sm dark:text-gray-400'>
              Retired / Disposed
            </div>
            <div className='text-base font-bold text-red-600 sm:text-lg md:text-xl lg:text-2xl dark:text-red-400'>
              {retiredAndDisposedCount}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2'>
        <ReusablePieChart
          icon={<PieChart className='h-5 w-5' />}
          data={pieChartData}
          title='Asset Status Distribution'
          isPending={isPending}
          showAnimation={true}
          animationDelay={2000}
        />

        <Card className='transition-shadow duration-200 hover:shadow-lg'>
          <CardHeader className='pb-0 sm:pb-0'>
            <CardTitle className='text-base sm:text-lg'>
              <div className='flex items-center gap-2'>
                <ClockIcon className='h-5 w-5' />
                Recent Purchased Assets
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isPending ? (
              <div className='flex h-[250px] items-center justify-center sm:h-[300px] lg:h-[350px]'>
                <Loader2 className='h-6 w-6 animate-spin sm:h-8 sm:w-8' />
              </div>
            ) : (
              <div className='space-y-3 sm:space-y-4'>
                {assets
                  .sort((a, b) => a.id - b.id)
                  .slice(0 - 5)
                  .reverse()
                  .map((asset) => (
                    <div
                      className='hover:bg-muted/50 flex items-center rounded-lg border border-transparent p-2 transition-all duration-200 hover:cursor-pointer hover:shadow-md sm:p-3'
                      key={asset.id}
                      onClick={() => navigate(`/assets/${asset.id}`)}
                    >
                      <div className='min-w-0 flex-1 space-y-1'>
                        <p className='truncate text-xs leading-none font-medium sm:text-sm'>{asset.assetName}</p>
                        <p className='text-muted-foreground truncate text-xs sm:text-sm'>
                          {asset.category.categoryName} • {asset.status}
                        </p>
                      </div>
                      <div className='ml-2 min-w-0 flex-shrink-0 text-right text-xs font-medium sm:ml-4 sm:text-sm'>
                        <span className='truncate'>{asset.department.departmentName || 'No Department'}</span>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
