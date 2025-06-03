import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent, CardFooter, Button, Separator } from '@/components/ui'
import { ArrowLeft, User, Pen, FileText, Loader2 } from 'lucide-react'
import type { RequestTransferType } from '../all-request-transfer/model/type'
import { toast } from 'sonner'
import { getData, tryCatch } from '@/utils'
import { approveRequestTransfer, denyRequestTransfer, getRequestTransferInformation } from '../api'
import type { ApproveFormValues } from './dialog-select-asset/model'
import {
  AssetCategoryRequestInformation,
  ButtonApproveRequest,
  ButtonRejectRequest,
  ComponentGetInformationError,
  RequestDescription,
  StatusAndButtonGoBack,
  UserRequestInformation,
} from './_components'
import { DialogSelectAsset } from './dialog-select-asset'

const RequestTransferInformation = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [requestTransfer, setTransferRequest] = useState<RequestTransferType>()
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const getTransferRequestData = async () => {
    setIsLoading(true)
    await getData(() => getRequestTransferInformation(id || ''), setTransferRequest)
    setIsLoading(false)
  }

  useEffect(() => {
    getTransferRequestData()
  }, [id])

  const handleReject = async () => {
    setIsProcessing(true)
    const data = await tryCatch(denyRequestTransfer(id || ''))
    if (data.error) {
      toast.error(data.error.message || 'Failed to deny transfer request')
      setIsProcessing(false)
      return
    }
    toast.success(`Transfer request #${id} has been denied`)
    getTransferRequestData()
    setIsProcessing(false)
  }

  const handleApprove = async (values: ApproveFormValues) => {
    setIsProcessing(true)

    const data = await tryCatch(approveRequestTransfer(values.assetId, id || ''))
    if (data.error) {
      toast.error(data.error.message || 'Failed to approve transfer request')
      setIsDialogOpen(false)
      setIsProcessing(false)
      return
    }
    toast.success(`Transfer request #${id} has been approved`)
    getTransferRequestData()
    setIsDialogOpen(false)
    setIsProcessing(false)
  }

  if (isLoading) {
    return (
      <div className='flex h-[70vh] items-center justify-center'>
        <Loader2 className='text-primary h-12 w-12 animate-spin' />
      </div>
    )
  }

  if (!requestTransfer) {
    return <ComponentGetInformationError />
  }

  return (
    <div className='container mx-auto px-4 py-6'>
      <DialogSelectAsset
        categoryId={requestTransfer.category.id.toString()}
        departmentId={requestTransfer.user.departmentId.toString()}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        handleApprove={handleApprove}
        isProcessing={isProcessing}
      />
      <div className='flex flex-col space-y-6'>
        <StatusAndButtonGoBack requestTransfer={requestTransfer} />

        <Card>
          <CardHeader>
            <CardTitle className='text-2xl'>Transfer Request Details</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-4'>
              <h3 className='flex items-center text-lg font-semibold'>
                <User className='mr-2 h-5 w-5' />
                Requester Information
              </h3>
              <Separator />
              <UserRequestInformation requestTransfer={requestTransfer} />
            </div>

            <div className='space-y-4'>
              <h3 className='flex items-center text-lg font-semibold'>
                <Pen className='mr-2 h-5 w-5' />
                Category
              </h3>
              <Separator />
              <AssetCategoryRequestInformation requestTransfer={requestTransfer} />
            </div>

            <div className='space-y-4'>
              <h3 className='flex items-center text-lg font-semibold'>
                <FileText className='mr-2 h-5 w-5' />
                Request Details
              </h3>
              <Separator />
              <RequestDescription requestTransfer={requestTransfer} />
            </div>
          </CardContent>

          <CardFooter>
            <div className='flex w-full justify-end space-x-2'>
              {requestTransfer.status === 'Pending' ? (
                <>
                  <ButtonRejectRequest
                    isProcessing={isProcessing}
                    handleReject={handleReject}
                  />
                  <ButtonApproveRequest
                    isProcessing={isProcessing}
                    openApprovalDialog={() => setIsDialogOpen(true)}
                  />
                </>
              ) : (
                <Button
                  variant='outline'
                  onClick={() => navigate('/transfers')}
                >
                  <ArrowLeft className='mr-2 h-4 w-4' />
                  Back to All Requests
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default RequestTransferInformation
