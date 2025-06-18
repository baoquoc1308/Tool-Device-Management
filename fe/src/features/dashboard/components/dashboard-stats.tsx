import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import type { DashboardData } from '../api/type'
import type { AssetsType } from '@/features/assets/view-all-assets/model'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Loader2 } from 'lucide-react'

interface DashboardStatsProps {
  stats: DashboardData
  assets: AssetsType[]
  isPending: boolean
}

const COLORS = {
  'In Use': '#22d3ee',
  'Under Maintenance': '#fb7185',
  'Retired / Disposed': '#a78bfa',
  New: '#fb923c',
}

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent }: any) => {
  const radius = outerRadius * 0.7
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor='middle'
      dominantBaseline='central'
      style={{ fontSize: '14px', fontWeight: 'bold' }}
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  )
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className='rounded-lg border bg-white p-2 shadow-lg'>
        <p className='font-medium'>{data.name}</p>
        <p className='text-sm text-gray-600'>{`${data.value} (${(data.percent * 100).toFixed(1)}%)`}</p>
      </div>
    )
  }
  return null
}

const CustomLegend = ({ payload }: any) => {
  return (
    <div className='mt-4 flex flex-wrap justify-center gap-6'>
      {payload.map((entry: any) => (
        <div
          key={entry.value}
          className='flex items-center gap-2'
        >
          <div
            className='h-2.5 w-2.5 rounded-full'
            style={{ backgroundColor: entry.color }}
          />
          <span className='text-sm text-gray-600'>{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

export const DashboardStats = ({ stats, assets, isPending }: DashboardStatsProps) => {
  const getStatusCount = (status: string) => {
    return assets.filter((asset) => asset.status === status).length
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
    .filter((item) => item.value > 0)
    .map((item, _, array) => {
      const totalDisplayedValues = array.reduce((sum, curr) => sum + curr.value, 0)
      return {
        ...item,
        percent: item.value / totalDisplayedValues,
      }
    })

  return (
    <div className='space-y-6'>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-5'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.total_assets}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>New</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{newCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>In Use</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{inUseCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Under Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{underMaintenanceCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Retired / Disposed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{retiredAndDisposedCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Asset Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {isPending ? (
              <div className='flex h-[300px] items-center justify-center'>
                <Loader2 className='h-8 w-8 animate-spin' />
              </div>
            ) : (
              <div className='h-[300px]'>
                <ResponsiveContainer
                  width='100%'
                  height='100%'
                >
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx='50%'
                      cy='45%'
                      outerRadius={90}
                      dataKey='value'
                      startAngle={90}
                      endAngle={-270}
                      label={renderCustomizedLabel}
                      labelLine={false}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[entry.name as keyof typeof COLORS]}
                          strokeWidth={0}
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

        <Card>
          <CardHeader>
            <CardTitle>Recent Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-8'>
              {assets.slice(0, 5).map((asset) => (
                <div
                  className='flex items-center'
                  key={asset.id}
                >
                  <div className='ml-4 space-y-1'>
                    <p className='text-sm leading-none font-medium'>{asset.assetName}</p>
                    <p className='text-muted-foreground text-sm'>
                      {asset.category.categoryName} • {asset.status}
                    </p>
                  </div>
                  <div className='ml-auto font-medium'>{asset.department.departmentName || 'No Department'}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
