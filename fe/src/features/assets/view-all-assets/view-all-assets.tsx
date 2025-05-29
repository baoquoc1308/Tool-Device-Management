import { useEffect, useState, useTransition } from 'react'
import { getAllAssets, getDataAssetsFilter } from '../api'
import { toast } from 'sonner'
import type { AssetsType, FilterType } from './model'
import { columnsAssetsTable } from './column-table'
import { DataTable, Card, CardHeader, CardTitle, CardDescription, CardContent, Skeleton } from '@/components/ui'
import { Laptop } from 'lucide-react'
import {
  ButtonCreateNewAssets,
  ButtonViewType,
  CardStatusStatistic,
  FilterAssets,
  ViewCardsDataAssets,
} from './_components'
import { getData, tryCatch } from '@/utils'
import { useDebounce } from '@/hooks'
import { useSearchParams } from 'react-router-dom'

const ViewAllAssets = () => {
  const [searchParam, setSearchParam] = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [assets, setAssets] = useState<AssetsType[]>([])
  const [viewMode, setViewMode] = useState<string>('table')
  const [filteredAssets, setFilteredAssets] = useState<FilterType>({
    assetName: searchParam.get('assetName') || '',
    categoryId: searchParam.get('categoryId') || null,
    departmentId: searchParam.get('departmentId') || null,
    status: searchParam.get('status') || null,
  })
  const getAssetsData = () => {
    startTransition(async () => {
      await getData(getAllAssets, setAssets)
    })
  }
  const filterData = useDebounce(filteredAssets, 1000)

  useEffect(() => {
    getAssetsData()
  }, [])
  const getAssetsFilterData = () => {
    startTransition(async () => {
      const { data, error } = await tryCatch(getDataAssetsFilter({ ...filterData }))
      if (error) {
        toast.error(error?.message || 'Failed to load assets')
        return
      }
      setAssets(data.data.data)
    })
  }

  useEffect(() => {
    if (filteredAssets.assetName) {
      searchParam.set('assetName', filteredAssets.assetName)
    } else {
      searchParam.delete('assetName')
    }
    if (filteredAssets.categoryId) {
      searchParam.set('categoryId', filteredAssets.categoryId)
    } else {
      searchParam.delete('categoryId')
    }
    if (filteredAssets.departmentId) {
      searchParam.set('departmentId', filteredAssets.departmentId)
    } else {
      searchParam.delete('departmentId')
    }
    if (filteredAssets.status) {
      searchParam.set('status', filteredAssets.status)
    } else {
      searchParam.delete('status')
    }
    setSearchParam(searchParam)
    getAssetsFilterData()
  }, [filterData])
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
        <CardContent className='space-y-6'>
          <CardStatusStatistic
            isPending={isPending}
            assets={assets}
          />

          <FilterAssets
            filteredAssets={filteredAssets}
            setFilteredAssets={setFilteredAssets}
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
