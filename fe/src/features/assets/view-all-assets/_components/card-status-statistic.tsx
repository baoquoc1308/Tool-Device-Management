import { Card, CardContent, Skeleton } from '@/components/ui'
import type { AssetsType } from '../model'
export const CardStatusStatistic = ({ isPending, assets }: { isPending: boolean; assets: AssetsType[] }) => {
  if (!assets) {
    return (
      <div className='mb-6 grid grid-cols-2 gap-4 md:grid-cols-5'>
        <Card>
          <CardContent className='p-4'>
            <div className='text-muted-foreground text-sm font-medium'>No Assets Available</div>
          </CardContent>
        </Card>
      </div>
    )
  }
  return (
    <div className='mb-6 grid grid-cols-2 gap-4 md:grid-cols-5'>
      <Card>
        <CardContent className='p-4'>
          <div className='text-muted-foreground text-sm font-medium'>Total Assets</div>
          <div className='text-2xl font-bold'>{isPending ? <Skeleton className='h-8 w-16' /> : assets.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className='p-4'>
          <div className='text-muted-foreground text-sm font-medium'>New</div>
          <div className='text-2xl font-bold text-green-600'>
            {isPending ? <Skeleton className='h-8 w-16' /> : assets.filter((asset) => asset.status === 'New').length}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className='p-4'>
          <div className='text-muted-foreground text-sm font-medium'>In Use</div>
          <div className='text-2xl font-bold text-blue-600'>
            {isPending ? <Skeleton className='h-8 w-16' /> : assets.filter((asset) => asset.status === 'In Use').length}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className='p-4'>
          <div className='text-muted-foreground text-sm font-medium'>Under Maintenance</div>
          <div className='text-2xl font-bold text-amber-600'>
            {isPending ? (
              <Skeleton className='h-8 w-16' />
            ) : (
              assets.filter((asset) => asset.status === 'Under Maintenance').length
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className='p-4'>
          <div className='text-muted-foreground text-sm font-medium'>Retired / Disposed</div>
          <div className='text-2xl font-bold text-slate-600'>
            {isPending ? (
              <Skeleton className='h-8 w-16' />
            ) : (
              assets.filter((asset) => ['Retired', 'Disposed'].includes(asset.status)).length
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
