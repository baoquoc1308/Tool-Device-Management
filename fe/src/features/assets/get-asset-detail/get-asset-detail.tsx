import { useParams, Link, useNavigate } from 'react-router-dom'
import type { AssetsType } from '../view-all-assets/model'
import { getData, tryCatch } from '@/utils'
import { useEffect } from 'react'
import { deleteAsset, getAssetInformation } from '../api'
import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  LoadingSpinner,
} from '@/components/ui'

import { ArrowLeft, Pencil, Loader2, Trash2 } from 'lucide-react'
import { useAppSelector } from '@/hooks'

import {
  AssetBadge,
  AssetFile,
  AssetImage,
  AssetInformation,
  AssetMaintenanceSchedule,
  AssetQR,
  NoAsset,
} from './_components'
import { ViewAssetLog } from '../view-asset-log'
import { toast } from 'sonner'

const GetAssetDetail = () => {
  const { id } = useParams()
  const [isPending, setIsPending] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [asset, setAsset] = useState<AssetsType>()

  const navigate = useNavigate()
  const user = useAppSelector((state) => state.auth.user)
  const role = user.role.slug
  const canEditAsset = () => {
    if (role === 'admin') return true
    if (role === 'assetManager') {
      return user.department && asset?.department?.id === user.department.id
    }
    return false
  }
  const getAssetData = async () => {
    setIsPending(true)
    if (!id) return
    await getData(() => getAssetInformation(id), setAsset)
    setIsPending(false)
  }
  const deletingAsset = async () => {
    setIsDeleting(true)
    if (!id) return
    const response = await tryCatch(deleteAsset(id))
    if (response.error) {
      toast.error(response.error.message || 'Failed to delete asset')
      return
    }
    toast.success('Asset deleted successfully')
    navigate('/assets')
    setIsDeleting(false)
  }

  useEffect(() => {
    getAssetData()
  }, [id])

  if (isPending) {
    return (
      <div className='flex h-[70vh] items-center justify-center'>
        <Loader2 className='text-primary h-12 w-12 animate-spin' />
      </div>
    )
  }
  if (!asset) {
    return <NoAsset id={id || ''} />
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center'>
          <Link to='/assets'>
            <Button
              variant='ghost'
              className='mr-4'
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className='h-5 w-5' />
            </Button>
          </Link>
          <h1 className='text-3xl font-semibold'>{asset.assetName}</h1>
          <AssetBadge asset={asset} />
        </div>
        {asset.status !== 'Disposed' && canEditAsset() && (
          <div className='flex items-center space-x-2'>
            <Link to={`/assets/update/${id}`}>
              <Button variant='outline'>
                <Pencil className='mr-2 h-4 w-4' />
                Update Asset
              </Button>
            </Link>

            <Button
              variant='destructive'
              onClick={deletingAsset}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <LoadingSpinner className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                <>
                  <Trash2 className='mr-2 h-4 w-4' />
                  Delete Asset
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      <div
        className='grid grid-cols-1 gap-6 lg:grid-cols-3'
        style={{ gridAutoRows: '1fr' }}
      >
        <div className='flex flex-col gap-6 lg:col-span-2'>
          <Card className='w-full'>
            <CardHeader>
              <CardTitle>Asset Information</CardTitle>
              <CardDescription>Details about the hardware asset</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <AssetInformation asset={asset} />
            </CardContent>
          </Card>

          {role !== 'viewer' &&
            role !== 'departmentHead' &&
            (role === 'admin' ||
              (role === 'assetManager' && (user as any).department?.id === asset?.department?.id)) && (
              <ViewAssetLog id={id || ''} />
            )}
          {role !== 'viewer' && (
            <Card className='w-full'>
              <div className='flex items-center justify-between'>
                <CardHeader className='flex-1'>
                  <CardTitle>Maintenance Schedule</CardTitle>
                  <CardDescription>Upcoming and past maintenance schedules</CardDescription>
                </CardHeader>
              </div>

              <CardContent>
                <AssetMaintenanceSchedule id={id || ''} />
              </CardContent>
            </Card>
          )}
        </div>

        <div className='flex'>
          <Tabs
            defaultValue='image'
            className='flex w-full flex-col'
          >
            <TabsList className='w-full'>
              <TabsTrigger
                value='image'
                className='flex-1'
              >
                Image
              </TabsTrigger>
              <TabsTrigger
                value='documents'
                className='flex-1'
              >
                Documents
              </TabsTrigger>
              <TabsTrigger
                value='qr'
                className='flex-1'
              >
                QR
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value='image'
              className='flex flex-grow'
            >
              <Card className='w-full'>
                <CardContent className='flex h-full items-center justify-center py-4'>
                  <AssetImage asset={asset} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent
              value='documents'
              className='mt-4 flex flex-grow'
            >
              <Card className='w-full'>
                <CardContent className='flex h-full items-center justify-center py-4'>
                  <AssetFile asset={asset} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent
              value='qr'
              className='mt-4 flex flex-grow'
            >
              <Card className='w-full'>
                <CardContent className='flex h-full items-center justify-center py-4'>
                  <AssetQR asset={asset} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default GetAssetDetail
