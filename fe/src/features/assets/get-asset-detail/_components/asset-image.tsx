import { Laptop } from 'lucide-react'
import type { AssetsType } from '../../view-all-assets/model'

export const AssetImage = ({ asset }: { asset: AssetsType }) => {
  return asset.imageUpload ? (
    <img
      src={asset.imageUpload}
      alt={asset.assetName}
      className='max-h-[250px] rounded-md object-contain'
    />
  ) : (
    <div className='flex h-[250px] w-full flex-col items-center justify-center rounded-md border border-dashed'>
      <Laptop className='text-muted-foreground h-10 w-10' />
      <p className='text-muted-foreground mt-2 text-sm'>No image available</p>
    </div>
  )
}
