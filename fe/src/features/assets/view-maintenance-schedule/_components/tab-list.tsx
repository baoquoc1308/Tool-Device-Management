import { TabsList, TabsTrigger, Badge } from '@/components'
import type { MaintenanceSchedule } from '../model'

export const TabList = ({
  schedules,
  upcoming,
  inProgress,
}: {
  schedules: MaintenanceSchedule[]
  upcoming: MaintenanceSchedule[]
  inProgress: MaintenanceSchedule[]
}) => {
  return (
    <TabsList className='grid w-full grid-cols-3 md:w-auto'>
      <TabsTrigger value='all'>
        All
        <Badge
          variant='secondary'
          className='ml-2'
        >
          {schedules.length}
        </Badge>
      </TabsTrigger>
      <TabsTrigger value='upcoming'>
        Scheduled
        <Badge
          variant='secondary'
          className='ml-2'
        >
          {upcoming.length}
        </Badge>
      </TabsTrigger>
      <TabsTrigger value='in-progress'>
        Under Maintenance
        <Badge
          variant='secondary'
          className='ml-2'
        >
          {inProgress.length}
        </Badge>
      </TabsTrigger>
    </TabsList>
  )
}
