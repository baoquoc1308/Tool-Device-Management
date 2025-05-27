import { Image } from 'lucide-react'
import type { AssetsType } from '../../view-all-assets/model'

export const AssetQR = ({ asset }: { asset: AssetsType }) => {
  return asset.imageUpload ? (
    <img
      src={asset.qrUrl}
      alt={asset.assetName}
      className='max-h-[230px] rounded-md object-contain'
    />
  ) : (
    <div className='flex h-[250px] w-full flex-col items-center justify-center rounded-md border border-dashed'>
      <Image className='text-muted-foreground h-10 w-10' />
      <p className='text-muted-foreground mt-2 text-sm'>No QR available</p>
    </div>
  )
}
