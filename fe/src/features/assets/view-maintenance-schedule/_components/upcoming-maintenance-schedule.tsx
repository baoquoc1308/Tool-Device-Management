import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Button } from '@/components/ui'
import { Calendar, ChevronRight } from 'lucide-react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import type { MaintenanceSchedule } from '../model'

export const UpcomingMaintenanceSchedule = ({ upcoming }: { upcoming: MaintenanceSchedule[] }) => {
  const nextMaintenance = upcoming[0]
  if (upcoming.length === 0)
    return (
      <Card className='border-border bg-muted/50 dark:bg-muted/20'>
        <CardHeader className='pb-2'>
          <CardTitle className='text-foreground text-lg'>No Upcoming Maintenance Scheduled</CardTitle>
          <CardDescription className='text-muted-foreground'>All assets are up to date.</CardDescription>
        </CardHeader>
      </Card>
    )
  return (
    <Card className='border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20'>
      <CardHeader className='pb-2'>
        <CardTitle className='flex items-center text-lg text-blue-800 dark:text-blue-200'>
          <Calendar className='mr-2 h-5 w-5' />
          Next Scheduled Maintenance
        </CardTitle>
        <CardDescription className='text-blue-700 dark:text-blue-300'>
          Scheduled for {format(new Date(nextMaintenance.startDate), 'MMMM d, yyyy')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col justify-between gap-4 md:flex-row'>
          <div>
            <p className='text-foreground text-lg font-medium'>{nextMaintenance.asset.assetName}</p>
            <div className='mt-1 flex items-center gap-2'>
              <Calendar className='h-4 w-4 text-blue-800 dark:text-blue-200' />
              <span className='text-sm text-blue-800 dark:text-blue-200'>
                {format(new Date(nextMaintenance.startDate), 'MMMM d, yyyy')} -{' '}
                {format(new Date(nextMaintenance.endDate), 'MMMM d, yyyy')}
              </span>
            </div>
            <div className='mt-2'>
              <Badge
                variant='outline'
                className='border-blue-200 bg-blue-100 text-blue-800 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-200'
              >
                {nextMaintenance.asset.status}
              </Badge>
            </div>
          </div>
          <Button asChild>
            <Link to={`/assets/${nextMaintenance.asset.id}`}>
              View Asset Details
              <ChevronRight className='ml-1 h-4 w-4' />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
