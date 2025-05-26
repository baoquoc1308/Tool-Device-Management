import { Laptop, Calendar, DollarSign, Tag, Building, User, Clock } from 'lucide-react'
import type { AssetsType } from '../../view-all-assets/model'
import { format } from 'date-fns'
export const AssetInformation = ({ asset }: { asset: AssetsType }) => {
  return (
    <div className='grid grid-cols-1 gap-y-6 sm:grid-cols-2'>
      <div className='space-y-1'>
        <h3 className='text-muted-foreground text-sm font-medium'>Asset Type</h3>
        <p className='flex items-center font-medium'>
          <Laptop className='text-primary mr-2 h-4 w-4' />
          {asset.category?.categoryName}
        </p>
      </div>

      <div className='space-y-1'>
        <h3 className='text-muted-foreground text-sm font-medium'>Serial Number</h3>
        <p className='flex items-center font-medium'>
          <Tag className='text-primary mr-2 h-4 w-4' />
          {asset.serialNumber}
        </p>
      </div>

      <div className='space-y-1'>
        <h3 className='text-muted-foreground text-sm font-medium'>Purchase Date</h3>
        <p className='flex items-center font-medium'>
          <Calendar className='text-primary mr-2 h-4 w-4' />
          {format(new Date(asset.purchaseDate), 'PPP')}
        </p>
      </div>

      <div className='space-y-1'>
        <h3 className='text-muted-foreground text-sm font-medium'>Warranty Expiry</h3>
        <p className='flex items-center font-medium'>
          <Clock className='text-primary mr-2 h-4 w-4' />
          {format(new Date(asset.warrantExpiry), 'PPP')}
        </p>
      </div>

      <div className='space-y-1'>
        <h3 className='text-muted-foreground text-sm font-medium'>Department</h3>
        <p className='flex items-center font-medium'>
          <Building className='text-primary mr-2 h-4 w-4' />
          {asset.department?.departmentName}
        </p>
      </div>

      <div className='space-y-1'>
        <h3 className='text-muted-foreground text-sm font-medium'>Cost</h3>
        <p className='flex items-center font-medium'>
          <DollarSign className='text-primary mr-2 h-4 w-4' />
          {asset.cost}
        </p>
      </div>

      <div className='space-y-1'>
        <h3 className='text-muted-foreground text-sm font-medium'>Owner</h3>
        <p className='flex items-center font-medium'>
          <User className='text-primary mr-2 h-4 w-4' />
          {asset.owner?.firstName + ' ' + asset.owner?.lastName}
        </p>
      </div>
    </div>
  )
}
