import { useState, useEffect } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  DataTable,
  Button,
  SkeletonForTable,
} from '@/components/ui'
import { RepeatIcon } from 'lucide-react'
import type { RequestTransferResponseType } from './model'
import { getData } from '@/utils'
import { getAllRequestTransferWithFilter } from '../api'
import { columns } from './column-table'
import { ClearFilterButton, StatusFilter } from './_components'
import { useSearchParams } from 'react-router-dom'
import { useDebounce } from '@/hooks'

const AllRequestTransfer = () => {
  const [transfers, setTransfers] = useState<RequestTransferResponseType>()
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [searchParam, setSearchParam] = useSearchParams()

  const filteredStatus = useDebounce(statusFilter, 1000)

  const getTransfersDataWithFilter = async () => {
    setIsLoading(true)
    await getData(() => getAllRequestTransferWithFilter(filteredStatus), setTransfers)
    setIsLoading(false)
  }
  console.log(transfers)
  useEffect(() => {
    getTransfersDataWithFilter()
  }, [])

  useEffect(() => {
    if (statusFilter) {
      searchParam.set('status', statusFilter)
    } else {
      searchParam.delete('status')
    }
    setSearchParam(searchParam)
    getTransfersDataWithFilter()
  }, [filteredStatus])

  return (
    <div className='container mx-auto px-4 py-6'>
      <Card className='w-full'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div className='space-y-1'>
              <CardTitle className='flex items-center gap-2 text-2xl'>
                <RepeatIcon className='h-6 w-6' />
                Asset Transfer Requests
              </CardTitle>
              <CardDescription>View and manage all asset transfer requests</CardDescription>
            </div>
            <Button
              onClick={getTransfersDataWithFilter}
              variant='outline'
              size='sm'
            >
              <RepeatIcon className='mr-2 h-4 w-4' />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col justify-between gap-4 py-2 sm:flex-row sm:items-end'>
            <StatusFilter
              status={statusFilter}
              setStatus={setStatusFilter}
            />
            <ClearFilterButton setStatusFilter={setStatusFilter} />
          </div>
          {isLoading ? (
            <SkeletonForTable />
          ) : transfers && transfers.data ? (
            <DataTable
              columns={columns}
              data={transfers.data}
            />
          ) : (
            <div className='flex flex-col items-center justify-center py-12 text-center'>
              <RepeatIcon className='text-muted-foreground mb-4 h-12 w-12' />
              <h3 className='text-lg font-medium'>No transfer requests found</h3>
              <p className='text-muted-foreground mt-2'>There are no transfer requests to display.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default AllRequestTransfer
