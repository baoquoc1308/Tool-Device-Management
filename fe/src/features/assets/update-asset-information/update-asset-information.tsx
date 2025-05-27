import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useTransition } from 'react'
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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Calendar,
} from '@/components/ui'
import {
  ArrowLeft,
  Save,
  Loader2,
  AlertTriangle,
  Upload,
  FileText,
  Image as ImageIcon,
  DollarSign,
  CalendarIcon,
} from 'lucide-react'
import { format } from 'date-fns'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { tryCatch, urlToFile } from '@/utils'
import { getAssetInformation, getAllCategories, getAllDepartment, updateAssetInformation } from '../api'
import type { AssetsType } from '../view-all-assets/model/type'
import { type CreateAssetFormType, createAssetFormSchema } from '../create-new-asset'

const UpdateAssetInformation = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isPending, startTransition] = useTransition()
  const [isGetDataPending, startGetDataTransition] = useTransition()
  const [asset, setAsset] = useState<AssetsType>()
  const [categories, setCategories] = useState<any[]>([])
  const [departments, setDepartments] = useState<any[]>([])
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
      image: null,
      file: null,
    },
    mode: 'onChange',
  })
  //TODO: too many workers, need to refactor
  const getAssetData = () => {
    startGetDataTransition(async () => {
      if (!id) return
      const { data, error } = await tryCatch(getAssetInformation(id))

      if (error) {
        toast.error('Error fetching asset data')
        return
      }
      setAsset(data.data)
      const imageFile = await tryCatch(urlToFile(data.data.imageUpload.toString()))
      if (imageFile.error) {
        toast.error('Error converting image URL to file')
        return
      }
      const file = await tryCatch(urlToFile(data.data.fileAttachment.toString()))
      console.log(file instanceof File)
      if (file.error) {
        toast.error('Error converting file URL to file')
        return
      }
      form.reset({
        assetName: data.data.assetName,
        serialNumber: data.data.serialNumber,
        status: data.data.status,
        categoryId: data.data.category?.id?.toString(),
        departmentId: data.data.department?.id?.toString(),
        purchaseDate: data.data.purchaseDate ? new Date(data.data.purchaseDate) : undefined,
        cost: data.data.cost ? data.data.cost.toString() : '',
        warrantExpiry: data.data.warrantExpiry ? new Date(data.data.warrantExpiry) : undefined,
        image: imageFile.data || null,
        file: file.data || null,
      })

      if (data.data.imageUpload) {
        setImagePreview(data.data.imageUpload)
      }

      if (data.data.fileAttachment) {
        const fileName = data.data.fileAttachment.split('/').pop() || 'Attachment'
        setFileAttachmentName(fileName)
      }
      const categoriesResponse = await tryCatch(getAllCategories())
      if (categoriesResponse.error) {
        toast.error('Error fetching categories')
      }
      setCategories(categoriesResponse.data?.data)
      const departmentsResponse = await tryCatch(getAllDepartment())
      if (departmentsResponse.error) {
        toast.error('Error fetching departments')
      }
      console.log(departmentsResponse)
      setDepartments(departmentsResponse.data?.data)
    })
  }

  useEffect(() => {
    getAssetData()
  }, [id])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImagePreview(reader.result)
          form.setValue('image', file)
        }
      }
      reader.readAsDataURL(file)
    }
  }
  //TODO: no need to create function
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileAttachmentName(file.name)
      form.setValue('file', file)
    }
  }
  console.log(form.formState.isDirty, form.formState.isValid)
  const onSubmit = (values: CreateAssetFormType) => {
    startTransition(async () => {
      const { error } = await tryCatch(updateAssetInformation(id || '', values))

      if (error) {
        toast.error(error?.message || 'Failed to update asset')
        return
      }
      toast.success('Asset updated successfully')
      navigate(`/assets/${id}`)
    })
  }
  const handlePurchaseDateChange = (field: any, value: any) => {
    field.onChange(value)
    const endDate = form.getValues('warrantExpiry')

    if (endDate) {
      form.trigger('warrantExpiry')
    } else {
      form.clearErrors('warrantExpiry')
    }
  }

  if (isGetDataPending) {
    return (
      <div className='flex h-[70vh] items-center justify-center'>
        <Loader2 className='text-primary h-12 w-12 animate-spin' />
      </div>
    )
  }

  if (!asset) {
    return (
      <div className='flex h-[70vh] flex-col items-center justify-center space-y-4'>
        <AlertTriangle className='text-warning h-16 w-16' />
        <h2 className='text-2xl font-semibold'>Asset Not Found</h2>
        <p className='text-muted-foreground'>The asset with ID {id} could not be found.</p>
        <Link to='/assets'>
          <Button>Return to Assets</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-6 flex flex-col items-center gap-5 md:flex-row md:justify-between md:gap-0'>
        <div className='flex items-center'>
          <Link to={`/assets/${id}`}>
            <Button
              variant='ghost'
              className='mr-4'
            >
              <ArrowLeft className='h-5 w-5' />
            </Button>
          </Link>
          <h1 className='text-3xl font-semibold'>Update Asset</h1>
        </div>
        <Button
          type='submit'
          onClick={form.handleSubmit(onSubmit)}
          disabled={isPending || !form.formState.isValid || !form.formState.isDirty}
        >
          {isPending ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <Save className='mr-2 h-4 w-4' />}
          Save Changes
        </Button>
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
                      <FormField
                        control={form.control}
                        name='assetName'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Asset Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='serialNumber'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Serial Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <FormField
                        control={form.control}
                        name='status'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Select status' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value='New'>New</SelectItem>
                                <SelectItem value='In Use'>In Use</SelectItem>
                                <SelectItem value='Under Maintenance'>Under Maintenance</SelectItem>
                                <SelectItem value='Retired'>Retired</SelectItem>
                                <SelectItem value='Disposed'>Disposed</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='categoryId'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Select category' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectGroup>
                                  {categories.map((category) => (
                                    <SelectItem
                                      key={category.id}
                                      value={category.id.toString()}
                                    >
                                      {category.categoryName}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name='departmentId'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select department' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                {departments.map((department) => (
                                  <SelectItem
                                    key={department.id}
                                    value={department.id.toString()}
                                  >
                                    {department.departmentName}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
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
                    <FormField
                      control={form.control}
                      name='cost'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cost</FormLabel>
                          <FormControl>
                            <div className='relative'>
                              <DollarSign className='text-muted-foreground absolute top-2.5 left-2 h-4 w-4' />
                              <Input
                                type='number'
                                className='pl-8'
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <FormField
                        control={form.control}
                        name='purchaseDate'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Purchase Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={'outline'}
                                    className={`pl-3 text-left font-normal ${!field.value && 'text-muted-foreground'}`}
                                  >
                                    {field.value ? format(field.value, 'PPP') : <span>Select date</span>}
                                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className='w-auto p-0'
                                align='start'
                              >
                                <Calendar
                                  mode='single'
                                  selected={field.value}
                                  onSelect={(value) => handlePurchaseDateChange(field, value)}
                                  autoFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='warrantExpiry'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Warranty Expiration</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={'outline'}
                                    className={`w-full text-left font-normal ${!field.value && 'text-muted-foreground'}`}
                                  >
                                    {field.value ? format(field.value, 'PPP') : <span>Select date</span>}
                                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className='w-auto p-0'
                                align='start'
                              >
                                <Calendar
                                  mode='single'
                                  selected={field.value || undefined}
                                  onSelect={field.onChange}
                                  autoFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
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
                      <div className='flex flex-grow items-center justify-center space-y-4'>
                        {imagePreview ? (
                          <div className='flex-grow overflow-hidden'>
                            <img
                              src={imagePreview}
                              alt='Asset preview'
                              className='m-auto max-h-[300px] rounded-md object-contain p-8'
                            />
                          </div>
                        ) : (
                          <div className='flex h-40 items-center justify-center rounded-md border border-dashed'>
                            <ImageIcon className='text-muted-foreground h-10 w-10' />
                          </div>
                        )}
                      </div>

                      <FormField
                        control={form.control}
                        name='image'
                        render={() => (
                          <FormItem>
                            <FormControl>
                              <div>
                                <Input
                                  type='file'
                                  accept='image/*'
                                  id='imageUpload'
                                  className='hidden'
                                  onChange={handleImageUpload}
                                />
                                <Button
                                  type='button'
                                  variant='outline'
                                  className='w-full'
                                  onClick={() => document.getElementById('imageUpload')?.click()}
                                >
                                  <Upload className='mr-2 h-4 w-4' />
                                  {imagePreview ? 'Change Image' : 'Upload Image'}
                                </Button>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
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
                      <div className='flex flex-grow items-center justify-center space-y-4'>
                        {fileAttachmentName && (
                          <Link
                            to={asset.fileAttachment}
                            download={true}
                          >
                            <div className='flex max-w-full items-center gap-3 rounded-md border p-3'>
                              <FileText className='h-6 w-6 flex-shrink-0' />
                              <div className='min-w-0 overflow-hidden'>
                                <p
                                  className='font-medium break-all'
                                  title={fileAttachmentName}
                                >
                                  {fileAttachmentName}
                                </p>
                                <p className='text-muted-foreground text-sm'>Attached document</p>
                              </div>
                            </div>
                          </Link>
                        )}
                      </div>

                      <FormField
                        control={form.control}
                        name='file'
                        render={() => (
                          <FormItem>
                            <FormControl>
                              <div>
                                <Input
                                  type='file'
                                  id='fileAttachment'
                                  className='hidden'
                                  onChange={handleFileUpload}
                                />
                                <Button
                                  type='button'
                                  variant='outline'
                                  className='w-full'
                                  onClick={() => document.getElementById('fileAttachment')?.click()}
                                >
                                  <Upload className='mr-2 h-4 w-4' />
                                  {fileAttachmentName ? 'Change File' : 'Upload File'}
                                </Button>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default UpdateAssetInformation
