import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
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
  Form,
  FormInput,
  FormSelect,
  FormDatePicker,
  FormButtonSubmit,
} from '@/components/ui'
import { ArrowLeft, Save, DollarSign } from 'lucide-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { getData, tryCatch, urlToFile } from '@/utils'
import { getAssetInformation, getAllCategories, getAllDepartment, updateAssetInformation } from '../api'
import type { AssetsType } from '../view-all-assets/model/type'
import {
  type CategoryType,
  type CreateAssetFormType,
  type DepartmentType,
  createAssetFormSchema,
} from '../create-new-asset'
import { STATUS } from './data/status'
import { FieldFile, FieldImage, IsError, IsGettingData } from './_components'

const UpdateAssetInformation = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isPending, setIsPending] = useState(false)
  const [isGetDataPending, setIsGetDataPending] = useState<boolean>(false)
  const [asset, setAsset] = useState<AssetsType>()
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [departments, setDepartments] = useState<DepartmentType[]>([])
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [fileAttachmentName, setFileAttachmentName] = useState<string | null>(null)

  const form = useForm({
    resolver: zodResolver(createAssetFormSchema),
    defaultValues: {
      assetName: '',
      serialNumber: '',
      status: '',
      categoryId: '',
      departmentId: '',
      purchaseDate: undefined,
      cost: 0,
      warrantExpiry: undefined,
      image: '',
      file: '',
    },
    mode: 'onChange',
  })

  const getAssetData = async () => {
    setIsGetDataPending(true)
    if (!id) return
    const data = await getData(() => getAssetInformation(id), setAsset)
    if (data?.imageUpload) {
      setImagePreview(data.imageUpload)
    }
    if (data?.fileAttachment) {
      setFileAttachmentName(data.fileAttachment)
    }
    await getData(getAllCategories, setCategories)
    await getData(getAllDepartment, setDepartments)
    setIsGetDataPending(false)
  }
  useEffect(() => {
    getAssetData()
  }, [id])
  useEffect(() => {
    if (!asset) return
    form.reset({
      assetName: asset?.assetName,
      serialNumber: asset?.serialNumber,
      status: asset?.status,
      categoryId: asset?.category?.id?.toString(),
      departmentId: asset?.department?.id?.toString(),
      purchaseDate: asset?.purchaseDate ? new Date(asset?.purchaseDate) : undefined,
      cost: asset?.cost ? asset?.cost : 0,
      warrantExpiry: asset?.warrantExpiry ? new Date(asset?.warrantExpiry) : undefined,
      image: asset?.imageUpload ? asset?.imageUpload : '',
      file: asset?.fileAttachment ? asset?.fileAttachment : '',
    })
  }, [asset])

  const onSubmit = async (values: CreateAssetFormType) => {
    setIsPending(true)
    if (typeof values.image === 'string') {
      const image = await urlToFile(values.image)
      values.image = image
    }
    if (typeof values.file === 'string') {
      const file = await urlToFile(values.file)
      values.file = file
    }
    const purchaseDate = new Date(values.purchaseDate.getTime() + 25200000)
    const warrantExpiry = new Date(values.warrantExpiry.getTime() + 25200000)

    const { error } = await tryCatch(updateAssetInformation(id || '', { ...values, purchaseDate, warrantExpiry }))

    if (error) {
      toast.error(error?.message || 'Failed to update asset')
      return
    }
    toast.success('Asset updated successfully')
    navigate(`/assets/${id}`)
    setIsPending(false)
  }
  const handlePurchaseDateChange = (value: Date) => {
    form.setValue('purchaseDate', value)
    const endDate = form.getValues('warrantExpiry')

    if (endDate) {
      form.trigger('warrantExpiry')
    } else {
      form.clearErrors('warrantExpiry')
    }
  }

  if (isGetDataPending) {
    return <IsGettingData />
  }

  if (!asset) {
    return <IsError id={id || ' '} />
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <FormProvider {...form}>
        <div className='mb-6 flex flex-col items-center gap-5 md:flex-row md:justify-between md:gap-0'>
          <div className='flex items-center'>
            <Link to={`/assets/${id}`}>
              <Button
                variant='ghost'
                className='mr-4'
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className='h-5 w-5' />
              </Button>
            </Link>
            <h1 className='text-3xl font-semibold'>Update Asset</h1>
          </div>
          <FormButtonSubmit
            onSubmit={onSubmit}
            className='bg-primary hover:bg-primary/90 flex h-9 items-center justify-center gap-2 text-sm font-medium md:h-10 md:text-base'
            isPending={isPending}
            Icon={Save}
            type='Submit'
          />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div
              className='grid grid-cols-1 gap-6 lg:grid-cols-3'
              style={{ gridAutoRows: '1fr' }}
            >
              <div className='lg:col-span-2'>
                <Card className='mb-6 flex flex-grow flex-col'>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Update the primary details of this asset</CardDescription>
                  </CardHeader>
                  <CardContent className='flex-grow'>
                    <div className='h-full space-y-6'>
                      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        <FormInput
                          name='assetName'
                          type='text'
                          label='Asset Name'
                          placeholder='Enter asset name'
                        />

                        <FormInput
                          name='serialNumber'
                          type='text'
                          label='Serial Number'
                          placeholder='Enter serial number'
                        />
                      </div>

                      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        <FormSelect
                          name='status'
                          label='Status'
                          placeholder='Select status'
                          data={STATUS}
                        />
                        <FormSelect
                          name='categoryId'
                          label='Category'
                          placeholder='Select category'
                          data={categories}
                        />
                      </div>

                      <FormSelect
                        name='departmentId'
                        label='Department'
                        placeholder='Select department'
                        data={departments}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className='flex flex-col'>
                  <CardHeader>
                    <CardTitle>Financial Details</CardTitle>
                    <CardDescription>Update cost and warranty information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-6'>
                      <FormInput
                        name='cost'
                        type='number'
                        label='Cost'
                        placeholder='Enter asset cost'
                        Icon={DollarSign}
                      />
                      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        <FormDatePicker
                          name='purchaseDate'
                          label='Purchase Date'
                          fn={handlePurchaseDateChange}
                        />
                        <FormDatePicker
                          name='warrantExpiry'
                          label='Warranty Expiry'
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className='flex h-full flex-col'>
                <Tabs
                  defaultValue='image'
                  className='flex h-full flex-col'
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
                  </TabsList>

                  <TabsContent
                    value='image'
                    className='mt-4 flex flex-grow'
                  >
                    <Card className='flex w-full flex-col'>
                      <CardHeader>
                        <CardTitle>Asset Image</CardTitle>
                        <CardDescription>Upload an image of this asset</CardDescription>
                      </CardHeader>
                      <CardContent className='flex flex-grow flex-col justify-between'>
                        <FieldImage
                          setImagePreview={setImagePreview}
                          imagePreview={imagePreview || ''}
                          form={form}
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent
                    value='documents'
                    className='mt-4 flex flex-grow'
                  >
                    <Card className='flex w-full flex-col'>
                      <CardHeader>
                        <CardTitle>Attachments</CardTitle>
                        <CardDescription>Add documentation for this asset</CardDescription>
                      </CardHeader>
                      <CardContent className='flex flex-grow flex-col justify-between'>
                        <FieldFile
                          form={form}
                          fileAttachmentName={fileAttachmentName || ''}
                          setFileAttachmentName={setFileAttachmentName}
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </form>
        </Form>
      </FormProvider>
    </div>
  )
}

export default UpdateAssetInformation
