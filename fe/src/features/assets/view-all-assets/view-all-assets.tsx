import { useEffect, useState, useTransition } from 'react'
import { getAllAssets } from '../api'
import { toast } from 'sonner'
import type { AssetsType } from './model'
import { columnsAssetsTable } from './column-table'
import { DataTable, Card, CardHeader, CardTitle, CardDescription, CardContent, Skeleton } from '@/components/ui'
import { Laptop } from 'lucide-react'
import { ButtonCreateNewAssets, ButtonViewType, CardStatusStatistic, ViewCardsDataAssets } from './_components'
import { tryCatch } from '@/utils'

const ViewAllAssets = () => {
  const [isPending, startTransition] = useTransition()
  const [assets, setAssets] = useState<AssetsType[]>([])
  const [viewMode, setViewMode] = useState<string>('table')

  const getAssetsData = () => {
    startTransition(async () => {
      const response = await tryCatch(getAllAssets())
      if (response.error) {
        toast.error(response.error?.message || 'Failed to load assets')
        return
      }
      setAssets(response.data.data)
    })
  }
  useEffect(() => {
    getAssetsData()
  }, [])

  return (
    <div className='space-y-6'>
      <ButtonViewType
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      <Card>
        <CardHeader className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
          <div>
            <CardTitle className='flex items-center text-2xl'>
              <Laptop className='mr-2 h-5 w-5' />
              Asset Management
            </CardTitle>
            <CardDescription>View and manage all company assets</CardDescription>
          </div>
          <ButtonCreateNewAssets />
        </CardHeader>
        <CardContent>
          <CardStatusStatistic
            isPending={isPending}
            assets={assets}
          />

          {isPending ? (
            <div className='space-y-4'>
              <Skeleton className='h-12 w-full' />
              <Skeleton className='h-12 w-full' />
              <Skeleton className='h-12 w-full' />
              <Skeleton className='h-12 w-full' />
              <Skeleton className='h-12 w-full' />
            </div>
          ) : (
            <>
              {viewMode === 'table' ? (
                <DataTable
                  columns={columnsAssetsTable}
                  data={assets}
                />
              ) : (
                <ViewCardsDataAssets assets={assets} />
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ViewAllAssets
