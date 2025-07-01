import { Card, CardContent, CardTitle } from '@/components/ui'
import { TrendingUp, TrendingDown, DollarSign, Package, AlertTriangle, CheckCircle, Minus, Users } from 'lucide-react'
import type { MonthlyStats } from '../model'
import { formatCurrency, formatNumber, formatPercentage } from '../utils'

interface StatisticsCardsProps {
  stats: MonthlyStats
  className?: string
  showComparison?: boolean
  comparisonData?: {
    previousValue: number
    growthRate: number
  }
}

export const StatisticsCards = ({
  stats,
  className = '',
  showComparison = false,
  comparisonData,
}: StatisticsCardsProps) => {
  const getTrendIcon = (rate: number) => {
    if (rate > 0) return <TrendingUp className='h-3.5 w-3.5 text-green-500 sm:h-4 sm:w-4 dark:text-green-400' />
    if (rate < 0) return <TrendingDown className='h-3.5 w-3.5 text-red-500 sm:h-4 sm:w-4 dark:text-red-400' />
    return <Minus className='h-3.5 w-3.5 text-gray-500 sm:h-4 sm:w-4 dark:text-gray-400' />
  }

  const inUseCount = stats.statusDistribution.find((status) => status.status === 'In Use')?.count || 0

  const cards = [
    {
      title: 'Total Assets',
      value: formatNumber(stats.totalAssets),
      icon: Package,
      iconColor: 'text-blue-500 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/50',
      valueColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Total Value',
      value: formatCurrency(stats.totalValue),
      icon: DollarSign,
      iconColor: 'text-green-500 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-950/50',
      valueColor: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'New Assets',
      value: formatNumber(stats.newAssetsCount),
      icon: CheckCircle,
      iconColor: 'text-emerald-500 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/50',
      valueColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      title: 'In Use Assets',
      value: formatNumber(inUseCount),
      icon: Users,
      iconColor: 'text-blue-500 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/50',
      valueColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Under Maintenance',
      value: formatNumber(stats.maintenanceCount),
      icon: AlertTriangle,
      iconColor: 'text-amber-500 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/50',
      valueColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      title: 'Retired/Disposed',
      value: formatNumber(stats.retiredAssetsCount),
      icon: TrendingDown,
      iconColor: 'text-red-500 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-950/50',
      valueColor: 'text-red-600 dark:text-red-400',
    },
  ]

  return (
    <div
      className={`xs:grid-cols-2 max-w-[430px]:grid-cols-1 grid w-full grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:gap-4 lg:grid-cols-6 ${className}`}
    >
      {cards.map((card, _index) => (
        <Card
          key={card.title}
          className='group w-full transition-all duration-300 dark:border-gray-700 dark:bg-gray-800/50'
        >
          <CardContent className='p-2.5 sm:p-3 md:p-4'>
            <div className='mb-1 flex items-center justify-between'>
              <CardTitle className='line-clamp-2 text-xs leading-tight font-medium text-gray-600 sm:text-sm dark:text-gray-400'>
                {card.title}
              </CardTitle>
              <div
                className={`${card.bgColor} rounded-full p-1.5 transition-all duration-300 group-hover:scale-110 sm:p-2`}
              >
                <card.icon className={`h-3 w-3 sm:h-4 sm:w-4 ${card.iconColor}`} />
              </div>
            </div>

            <div className='space-y-1'>
              <div
                className={`text-lg font-bold transition-colors duration-300 sm:text-xl md:text-2xl ${card.valueColor}`}
              >
                {card.value}
              </div>

              {showComparison && comparisonData && (
                <div className='flex items-center text-xs text-gray-600 dark:text-gray-400'>
                  {getTrendIcon(comparisonData.growthRate)}
                  <span className='ml-1 truncate'>
                    {formatPercentage(Math.abs(comparisonData.growthRate))} from last period
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
