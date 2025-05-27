import { Button } from '@/components'
import { FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { AssetsType } from '../../view-all-assets/model'
import { getFileName } from '@/utils'

export const AssetFile = ({ asset }: { asset: AssetsType }) => {
  return asset.fileAttachment ? (
    <div className='flex flex-col items-center justify-between gap-5 rounded-md border p-3'>
      <div className='flex items-center'>
        <FileText className='text-primary mr-2 h-5 w-5' />
        <span>{getFileName(asset.fileAttachment)}</span>
      </div>
      <Link
        to={asset.fileAttachment}
        download={true}
        className='w-full'
      >
        <Button
          variant='outline'
          size='sm'
          className='w-full'
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
