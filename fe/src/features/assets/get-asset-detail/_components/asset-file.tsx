import { Button } from '@/components'
import { FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { AssetsType } from '../../view-all-assets/model'

export const AssetFile = ({ asset }: { asset: AssetsType }) => {
  return asset.fileAttachment ? (
    <div className='flex items-center justify-between rounded-md border p-3'>
      <div className='flex items-center'>
        <FileText className='text-primary mr-2 h-5 w-5' />
        <span>Asset Document</span>
      </div>
      <Link
        to={asset.fileAttachment}
        download={true}
      >
        <Button
          variant='outline'
          size='sm'
        >
          View
        </Button>
      </Link>
    </div>
  ) : (
    <div className='flex h-[100px] w-full flex-col items-center justify-center rounded-md border border-dashed'>
      <FileText className='text-muted-foreground h-8 w-8' />
      <p className='text-muted-foreground mt-2 text-sm'>No documents available</p>
    </div>
  )
}
