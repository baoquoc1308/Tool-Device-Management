import { useEffect, useState, useTransition } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { DataTable, Button } from '@/components/ui'
import { Skeleton } from '@/components/ui/skeleton'
import { ClipboardList, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import type { AssignmentsResponse } from './model/type'
import { getData, tryCatch } from '@/utils'
import { getAssignments } from '../api'
import { columnsAssignmentsTable } from './column-table'
import { useDebounce } from '@/hooks'
import { FilterX } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

const ListAssignments = () => {
  const [searchParam, setSearchParam] = useSearchParams()
  const [assignments, setAssignments] = useState<AssignmentsResponse>()
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    assetName: '',
    emailAssign: '',
    emailAssigned: '',
  })
  const resetFilters = () => {
    setFilters({
      assetName: '',
      emailAssign: '',
      emailAssigned: '',
    })
  }

  const filterData = useDebounce(filters, 1000)

  const fetchData = async () => {
    setIsLoading(true)
    const data = await getData(getAssignments, setAssignments)
    console.log('Assignments data:', data)
    setIsLoading(false)
  }
  const getAssetsFilterData = async () => {
    setIsLoading(true)
    const { data, error } = await tryCatch(getAssignments(filterData))
    if (error) {
      toast.error(error?.message || 'Failed to load assets')
      return
    }
    setAssignments(data.data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])
  useEffect(() => {
    if (filters.assetName) {
      searchParam.set('assetName', filters.assetName)
    } else {
      searchParam.delete('assetName')
    }
    if (filters.emailAssign) {
      searchParam.set('emailAssign', filters.emailAssign)
    } else {
      searchParam.delete('emailAssign')
    }
    if (filters.emailAssigned) {
      searchParam.set('emailAssigned', filters.emailAssigned)
    } else {
      searchParam.delete('departmentId')
    }
    setSearchParam(searchParam)
    getAssetsFilterData()
  }, [filterData])

  return (
    <Card className='w-full'>
      <CardHeader>
        <div className='flex items-center space-x-4'>
          <div className='flex-1 space-y-1'>
            <CardTitle className='flex items-center gap-2 text-2xl'>
              <ClipboardList className='h-6 w-6' />
              Asset Assignments
            </CardTitle>
            <CardDescription>View and manage all asset assignments</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='flex flex-col gap-4 md:flex-row'>
            <div className='flex-1 space-y-2'>
              <label className='text-sm font-medium'>Asset Name</label>
              <div className='relative'>
                <Search className='text-muted-foreground absolute top-2.5 left-2 h-4 w-4' />
                <Input
                  placeholder='Filter by asset name...'
                  className='pl-8'
                  value={filters.assetName}
                  onChange={(e) => setFilters((prev) => ({ ...prev, assetName: e.target.value }))}
                />
              </div>
            </div>
            <div className='flex-1 space-y-2'>
              <label className='text-sm font-medium'>Assigned By (Email)</label>
              <div className='relative'>
                <Search className='text-muted-foreground absolute top-2.5 left-2 h-4 w-4' />
                <Input
                  placeholder='Filter by assigner email...'
                  className='pl-8'
                  value={filters.emailAssign}
                  onChange={(e) => setFilters((prev) => ({ ...prev, emailAssign: e.target.value }))}
                />
              </div>
            </div>
            <div className='flex-1 space-y-2'>
              <label className='text-sm font-medium'>Assigned To (Email)</label>
              <div className='relative'>
                <Search className='text-muted-foreground absolute top-2.5 left-2 h-4 w-4' />
                <Input
                  placeholder='Filter by assignee email...'
                  className='pl-8'
                  value={filters.emailAssigned}
                  onChange={(e) => setFilters((prev) => ({ ...prev, emailAssigned: e.target.value }))}
                />
              </div>
            </div>
            <Button
              disabled={!filters.assetName && !filters.emailAssign && !filters.emailAssigned}
              variant='outline'
              onClick={resetFilters}
              className='gap-2'
            >
              <FilterX className='h-4 w-4' />
              Clear filters
            </Button>
          </div>

          {isLoading ? (
            <div className='space-y-4'>
              <Skeleton className='h-12 w-full' />
              <Skeleton className='h-12 w-full' />
              <Skeleton className='h-12 w-full' />
              <Skeleton className='h-12 w-full' />
              <Skeleton className='h-12 w-full' />
            </div>
          ) : (
            <DataTable
              columns={columnsAssignmentsTable}
              data={assignments?.data || []}
            />
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default ListAssignments
