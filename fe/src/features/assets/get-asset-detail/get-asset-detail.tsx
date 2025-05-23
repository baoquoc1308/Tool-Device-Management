import { useParams, Link } from 'react-router-dom'
import type { AssetsType } from '../view-all-assets/model'
import { tryCatch } from '@/utils'
import { useEffect, useTransition } from 'react'
import { getAssetInformation } from '../api'
import { useState } from 'react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui'

import {
  Laptop,
  Calendar,
  DollarSign,
  Tag,
  Building,
  User,
  FileText,
  Clock,
  ArrowLeft,
  Pencil,
  Loader2,
} from 'lucide-react'
import { cn } from '@/lib'

const GetAssetDetail = () => {
  const { id } = useParams()
  const [isPending, startTransition] = useTransition()
  const [asset, setAsset] = useState<AssetsType>()

  const getAssetData = () => {
    startTransition(async () => {
      if (!id) return
      const { data, error } = await tryCatch(getAssetInformation(id))
      if (error) {
        toast.error('Error fetching asset data')
        return
      }
      setAsset(data.data)
    })
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
    return (
      <div className='container mx-auto px-4 py-8'>
        <Card className='border-destructive'>
          <CardHeader>
            <CardTitle className='text-destructive'>Asset Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>We couldn't find the asset with ID: {id}</p>
          </CardContent>
          <CardFooter>
            <Link to='/assets'>
              <Button>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back to Assets
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center'>
          <Link to='/assets'>
            <Button
              variant='ghost'
              className='mr-4'
            >
              <ArrowLeft className='h-5 w-5' />
            </Button>
          </Link>
          <h1 className='text-3xl font-semibold'>{asset.assetName}</h1>
          <Badge
            variant='outline'
            className={cn(
              'ml-4 flex items-center gap-1',
              asset.status === 'New' && 'border-green-200 bg-green-100 text-green-800',
              asset.status === 'In Use' && 'border-blue-200 bg-blue-100 text-blue-800',
              asset.status === 'Under Maintenance' && 'border-amber-200 bg-amber-100 text-amber-800',
              asset.status === 'Retired' && 'border-slate-200 bg-slate-100 text-slate-800',
              asset.status === 'Disposed' && 'border-gray-200 bg-gray-100 text-gray-800'
            )}
          >
            {asset.status}
          </Badge>
        </div>
        <Link to={`/assets/edit/${id}`}>
          <Button variant='outline'>
            <Pencil className='mr-2 h-4 w-4' />
            Edit Asset
          </Button>
        </Link>
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <Card className='h-full'>
            <CardHeader>
              <CardTitle>Asset Information</CardTitle>
              <CardDescription>Details about the hardware asset</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='grid grid-cols-1 gap-y-6 sm:grid-cols-2'>
                <div className='space-y-1'>
                  <h3 className='text-muted-foreground text-sm font-medium'>Asset Type</h3>
                  <p className='flex items-center font-medium'>
                    <Laptop className='text-primary mr-2 h-4 w-4' />
                    {asset.category?.categoryName}
                  </p>
                </div>

                <div className='space-y-1'>
                  <h3 className='text-muted-foreground text-sm font-medium'>Serial Number</h3>
                  <p className='flex items-center font-medium'>
                    <Tag className='text-primary mr-2 h-4 w-4' />
                    {asset.serialNumber}
                  </p>
                </div>

                <div className='space-y-1'>
                  <h3 className='text-muted-foreground text-sm font-medium'>Purchase Date</h3>
                  <p className='flex items-center font-medium'>
                    <Calendar className='text-primary mr-2 h-4 w-4' />
                    {format(new Date(asset.purchaseDate), 'PPP')}
                  </p>
                </div>

                <div className='space-y-1'>
                  <h3 className='text-muted-foreground text-sm font-medium'>Warranty Expiry</h3>
                  <p className='flex items-center font-medium'>
                    <Clock className='text-primary mr-2 h-4 w-4' />
                    {format(new Date(asset.warrantExpiry), 'PPP')}
                  </p>
                </div>

                <div className='space-y-1'>
                  <h3 className='text-muted-foreground text-sm font-medium'>Department</h3>
                  <p className='flex items-center font-medium'>
                    <Building className='text-primary mr-2 h-4 w-4' />
                    {asset.department?.departmentName}
                  </p>
                </div>

                <div className='space-y-1'>
                  <h3 className='text-muted-foreground text-sm font-medium'>Cost</h3>
                  <p className='flex items-center font-medium'>
                    <DollarSign className='text-primary mr-2 h-4 w-4' />
                    {asset.cost}
                  </p>
                </div>

                <div className='space-y-1'>
                  <h3 className='text-muted-foreground text-sm font-medium'>Owner</h3>
                  <p className='flex items-center font-medium'>
                    <User className='text-primary mr-2 h-4 w-4' />
                    {asset.owner?.firstName + ' ' + asset.owner?.lastName}
                  </p>
                </div>
              </div>{' '}
            </CardContent>
          </Card>
        </div>

        <div>
          <Tabs defaultValue='image'>
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
            </TabsList>

            <TabsContent
              value='image'
              className='mt-4'
            >
              <Card>
                <CardContent className='flex items-center justify-center p-4'>
                  {asset.imageUpload ? (
                    <img
                      src={asset.imageUpload}
                      alt={asset.assetName}
                      className='max-h-[300px] rounded-md object-contain'
                    />
                  ) : (
                    <div className='flex h-[300px] w-full flex-col items-center justify-center rounded-md border border-dashed'>
                      <Laptop className='text-muted-foreground h-10 w-10' />
                      <p className='text-muted-foreground mt-2 text-sm'>No image available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent
              value='documents'
              className='mt-4'
            >
              <Card>
                <CardContent className='p-4'>
                  {asset.fileAttachment ? (
                    <div className='flex items-center justify-between rounded-md border p-3'>
                      <div className='flex items-center'>
                        <FileText className='text-primary mr-2 h-5 w-5' />
                        <span>Asset Document</span>
                      </div>
                      <Link
                        to={asset.fileAttachment}
                        download={true}
                      >
                        <Button
                          variant='outline'
                          size='sm'
                        >
                          View
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className='flex h-[100px] w-full flex-col items-center justify-center rounded-md border border-dashed'>
                      <FileText className='text-muted-foreground h-8 w-8' />
                      <p className='text-muted-foreground mt-2 text-sm'>No documents available</p>
                    </div>
                  )}
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
