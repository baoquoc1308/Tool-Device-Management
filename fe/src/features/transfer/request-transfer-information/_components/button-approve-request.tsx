import { Button } from '@/components'
import { Check, Loader2 } from 'lucide-react'

export const ButtonApproveRequest = ({
  isProcessing,
  openApprovalDialog,
}: {
  isProcessing: boolean
  openApprovalDialog: () => void
}) => {
  return (
    <Button
      onClick={openApprovalDialog}
      disabled={isProcessing}
    >
      {isProcessing ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <Check className='mr-2 h-4 w-4' />}
      Approve Request
    </Button>
  )
}
