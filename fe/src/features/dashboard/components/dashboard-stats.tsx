import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import type { DashboardData } from '../api/type'
import type { AssetsType } from '@/features/assets/view-all-assets/model'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface DashboardStatsProps {
  stats: DashboardData
  assets: AssetsType[]
  isPending: boolean
}

const COLORS = {
  'In Use': '#3b82f6',
  'Under Maintenance': '#f59e0b',
  'Retired / Disposed': '#ef4444',
  New: '#22c55e',
}

const STATUS_COLORS = {
  'In Use': 'text-blue-600',
  'Under Maintenance': 'text-amber-600',
  'Retired / Disposed': 'text-red-600',
  New: 'text-green-600',
}

const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, fill }: any) => {
  if (percent < 0.02) return null

  const RADIAN = Math.PI / 180
  const isSmallScreen = window.innerWidth < 360
  const labelRadius = isSmallScreen ? outerRadius + 35 : outerRadius + 50
  const lineEndOffset = isSmallScreen ? 30 : 45

  const radius = labelRadius
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  const lineStartRadius = outerRadius + 5
  const lineStartX = cx + lineStartRadius * Math.cos(-midAngle * RADIAN)
  const lineStartY = cy + lineStartRadius * Math.sin(-midAngle * RADIAN)

  const lineEndRadius = outerRadius + lineEndOffset
  const lineEndX = cx + lineEndRadius * Math.cos(-midAngle * RADIAN)
  const lineEndY = cy + lineEndRadius * Math.sin(-midAngle * RADIAN)

  return (
    <g>
      <line
        x1={lineStartX}
        y1={lineStartY}
        x2={lineEndX}
        y2={lineEndY}
        stroke={fill}
        strokeWidth={2}
      />
      <text
        x={x}
        y={y}
        fill='#374151'
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'
        className='text-xs font-semibold sm:text-sm'
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    </g>
  )
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className='max-w-[200px] rounded-lg border bg-white p-2 shadow-lg'>
        <p className='text-sm font-medium'>{data.name}</p>
        <p className='text-xs text-gray-600'>{`${data.value} (${(data.percent * 100).toFixed(1)}%)`}</p>
      </div>
    )
  }
  return null
}

const CustomLegend = ({ payload }: any) => {
  return (
    <div className='mt-2 flex flex-wrap justify-center gap-2 sm:mt-4 sm:gap-4 lg:gap-6'>
      {payload.map((entry: any) => (
        <div
          key={entry.value}
          className='flex items-center gap-1 sm:gap-2'
        >
          <div
            className='h-2 w-2 rounded-full sm:h-2.5 sm:w-2.5'
            style={{ backgroundColor: entry.color }}
          />
          <span className='text-xs text-gray-600 sm:text-sm'>{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

const applyLargestRemainder = (data: Array<{ value: number; name: string }>) => {
  if (!data.length) return []

  const total = data.reduce((sum, item) => sum + item.value, 0)
  if (total === 0) return data.map((item) => ({ ...item, percent: 0 }))

  const withPercentages = data.map((item) => ({
    ...item,
    exactPercent: item.value / total,
    percent: Math.floor((item.value / total) * 1000) / 1000,
    remainder: ((item.value / total) * 1000) % 1,
  }))

  const totalPercent = withPercentages.reduce((sum, item) => sum + item.percent, 0)

  const remainingPercent = Math.max(0, 1 - totalPercent)
  const extraPoints = Math.round(remainingPercent * 1000)

  const sorted = [...withPercentages].sort((a, b) => b.remainder - a.remainder)

  for (let i = 0; i < extraPoints && sorted.length > 0; i++) {
    sorted[i % sorted.length].percent += 0.001
  }

  return sorted.map(({ name, value, percent }) => ({
    name,
    value,
    percent,
  }))
}

export const DashboardStats = ({ stats, assets, isPending }: DashboardStatsProps) => {
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
              <CardTitle className='text-base sm:text-lg'>Recent Assets</CardTitle>
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

  const rawData = [
    { name: 'In Use', value: inUseCount },
    { name: 'Under Maintenance', value: underMaintenanceCount },
    { name: 'Retired / Disposed', value: retiredAndDisposedCount },
    { name: 'New', value: newCount },
  ].filter((item) => item.value > 0)

  const pieChartData = applyLargestRemainder(rawData)
  const navigate = useNavigate()

  return (
    <div className='space-y-4 sm:space-y-6'>
      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        <Card className='transition-shadow duration-200 hover:shadow-md'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2'>
            <CardTitle className='text-xs font-medium sm:text-sm'>Total Assets</CardTitle>
          </CardHeader>
          <CardContent className='pt-0'>
            <div className='text-2xl font-bold'>{stats.total_assets}</div>
          </CardContent>
        </Card>

        <Card className='transition-shadow duration-200 hover:shadow-md'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2'>
            <CardTitle className='text-xs font-medium sm:text-sm'>New</CardTitle>
          </CardHeader>
          <CardContent className='pt-0'>
            <div className={`text-2xl font-bold ${STATUS_COLORS['New']}`}>{newCount}</div>
          </CardContent>
        </Card>

        <Card className='transition-shadow duration-200 hover:shadow-md'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2'>
            <CardTitle className='text-xs font-medium sm:text-sm'>In Use</CardTitle>
          </CardHeader>
          <CardContent className='pt-0'>
            <div className={`text-2xl font-bold ${STATUS_COLORS['In Use']}`}>{inUseCount}</div>
          </CardContent>
        </Card>

        <Card className='transition-shadow duration-200 hover:shadow-md'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2'>
            <CardTitle className='text-xs font-medium sm:text-sm'>Under Maintenance</CardTitle>
          </CardHeader>
          <CardContent className='pt-0'>
            <div className={`text-2xl font-bold ${STATUS_COLORS['Under Maintenance']}`}>{underMaintenanceCount}</div>
          </CardContent>
        </Card>

        <Card className='transition-shadow duration-200 hover:shadow-md'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2'>
            <CardTitle className='text-xs font-medium sm:text-sm'>Retired / Disposed</CardTitle>
          </CardHeader>
          <CardContent className='pt-0'>
            <div className={`text-2xl font-bold ${STATUS_COLORS['Retired / Disposed']}`}>{retiredAndDisposedCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2'>
        <Card className='transition-shadow duration-200 hover:shadow-lg'>
          <CardHeader className='pb-3 sm:pb-6'>
            <CardTitle className='text-base sm:text-lg'>Asset Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {isPending ? (
              <div className='flex h-[250px] items-center justify-center sm:h-[300px] lg:h-[350px]'>
                <Loader2 className='h-6 w-6 animate-spin sm:h-8 sm:w-8' />
              </div>
            ) : (
              <div className='h-[250px] sm:h-[300px] lg:h-[350px]'>
                <ResponsiveContainer
                  width='100%'
                  height='100%'
                >
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx='50%'
                      cy='45%'
                      outerRadius='65%'
                      dataKey='value'
                      startAngle={90}
                      endAngle={-270}
                      label={renderCustomizedLabel}
                      labelLine={false}
                      strokeWidth={0}
                    >
                      {(pieChartData || []).map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[entry.name as keyof typeof COLORS]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend content={<CustomLegend />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className='transition-shadow duration-200 hover:shadow-lg'>
          <CardHeader className='pb-3 sm:pb-6'>
            <CardTitle className='text-base sm:text-lg'>Recent Purchased Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-3 sm:space-y-4'>
              {assets
                .sort((a, b) => a.id - b.id)
                .slice(assets.length - 5, assets.length)
                .reverse()
                .map((asset) => (
                  <div
                    className='flex items-center rounded-lg border border-transparent p-2 transition-all duration-200 hover:cursor-pointer hover:bg-gray-50 hover:shadow-md sm:p-3'
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
