import type { RequestTransferType } from '../../all-request-transfer/model'

export const RequestDescription = ({ requestTransfer }: { requestTransfer: RequestTransferType }) => {
  return (
    <div>
      <p className='text-muted-foreground text-sm'>Description</p>
      <p className='mt-1'>{requestTransfer.description}</p>
    </div>
  )
}
