import type { RequestTransferType } from '../../all-request-transfer/model'

export const UserRequestInformation = ({ requestTransfer }: { requestTransfer: RequestTransferType }) => {
  return (
    <div className='flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4'>
      <div className='flex flex-col gap-3'>
        <p className='font-medium'>
          {requestTransfer.user.firstName} {requestTransfer.user.lastName}
        </p>
        <p className='text-muted-foreground text-sm'>{requestTransfer.user.email}</p>
      </div>
    </div>
  )
}
