import { format } from 'date-fns'
import type { AssetLog } from '../model'

export const LogInformation = ({ item }: { item: AssetLog }) => {
  return (
    <div className='flex-1'>
      <div className='mb-1 flex items-start justify-between'>
        <h4 className='font-medium'>{item.action}</h4>
        <time className='text-muted-foreground text-xs'>
          {item.timeStamp ? format(new Date(item.timeStamp), 'dd/MM/yyyy') : 'Unknown date'}
        </time>
      </div>
      <p className='text-muted-foreground text-sm'>{item.changeSummary}</p>

      <div className='flex flex-col'>
        <p className='mt-1 text-xs font-medium'>
          By:{' '}
          {item.byUserId ? `${item.byUserId.firstName} ${item.byUserId.lastName || ''}` : item.byUserId || 'Unknown'}
        </p>
        {item.byUserId?.email && <p className='text-muted-foreground text-xs'>{item.byUserId.email}</p>}
      </div>
    </div>
  )
}
