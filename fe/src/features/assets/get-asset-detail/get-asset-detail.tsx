import { useParams, Link } from 'react-router-dom'
import type { AssetsType } from '../view-all-assets/model'
import { tryCatch } from '@/utils'
import { useEffect, useTransition } from 'react'
import { getAssetInformation } from '../api'
import { useState } from 'react'
import { toast } from 'sonner'
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
} from '@/components/ui'

import { ArrowLeft, Pencil, Loader2 } from 'lucide-react'

import { AssetBadge, AssetFile, AssetImage, AssetInformation, NoAsset } from './_components'

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
            >
              <ArrowLeft className='h-5 w-5' />
            </Button>
          </Link>
          <h1 className='text-3xl font-semibold'>{asset.assetName}</h1>
          <AssetBadge asset={asset} />
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
              <AssetInformation asset={asset} />
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
                  <AssetImage asset={asset} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent
              value='documents'
              className='mt-4'
            >
              <Card>
                <CardContent className='p-4'>
                  <AssetFile asset={asset} />
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
