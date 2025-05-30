import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent, CardFooter, Button, Separator } from '@/components/ui'
import { ArrowLeft, MapPin, User, Package, Loader2 } from 'lucide-react'
import type { AssignmentData } from '../get-all-assignments/model/type'
import { getData } from '@/utils'
import { getAssignmentData } from '../api'

import {
  AssignmentAssetFile,
  AssignmentAssetImage,
  AssignmentAssetName,
  AssignmentAssetStatus,
  AssignmentDepartment,
  AssignmentError,
  AssignmentUserAssign,
} from './_components'

const ViewAssignmentDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isPending, setIsPending] = useState(true)
  const [assignmentDetail, setAssignmentDetail] = useState<AssignmentData>()

  const getAssignmentsDetailData = async () => {
    setIsPending(true)
    await getData(() => getAssignmentData(id || ''), setAssignmentDetail)
    setIsPending(false)
  }

  useEffect(() => {
    getAssignmentsDetailData()
  }, [id])

  if (isPending) {
    return (
      <div className='flex h-[70vh] items-center justify-center'>
        <Loader2 className='text-primary h-12 w-12 animate-spin' />
      </div>
    )
  }

  if (!assignmentDetail) {
    return <AssignmentError id={id || ''} />
  }

  return (
    <div className='container mx-auto px-4 py-6 md:px-6'>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
          <Button
            variant='ghost'
            onClick={() => navigate('/assignments')}
            className='w-fit'
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Assignments
          </Button>
          <h1 className='text-3xl font-semibold'> Assignment #{assignmentDetail.id}</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className='text-2xl'>Assignment Details</CardTitle>
          </CardHeader>

          <CardContent className='space-y-6'>
            <div className='space-y-4'>
              <h3 className='flex items-center text-lg font-semibold'>
                <Package className='mr-2 h-5 w-5' />
                Asset Information
              </h3>
              <Separator />

              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <AssignmentAssetName assignmentDetail={assignmentDetail} />

                <AssignmentAssetStatus assignmentDetail={assignmentDetail} />

                <AssignmentAssetImage assignmentDetail={assignmentDetail} />

                <AssignmentAssetFile assignmentDetail={assignmentDetail} />
              </div>
            </div>

            <div className='space-y-4'>
              <h3 className='flex items-center text-lg font-semibold'>
                <User className='mr-2 h-5 w-5' />
                Assignment Users
              </h3>
              <Separator />

              <div>
                <AssignmentUserAssign assignmentDetail={assignmentDetail} />
              </div>
            </div>

            <div className='space-y-4'>
              <h3 className='flex items-center text-lg font-semibold'>
                <MapPin className='mr-2 h-5 w-5' />
                Department Information
              </h3>
              <Separator />

              <AssignmentDepartment assignmentDetail={assignmentDetail} />
            </div>
          </CardContent>

          <CardFooter className='flex flex-col justify-end gap-3 sm:flex-row'>
            <Button
              variant='outline'
              onClick={() => navigate('/assignments')}
            >
              Cancel
            </Button>
            <Button>Edit Assignment</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default ViewAssignmentDetail
