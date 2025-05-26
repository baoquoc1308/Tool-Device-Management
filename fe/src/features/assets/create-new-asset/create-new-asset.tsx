import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { format } from 'date-fns'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Calendar,
  LoadingSpinner,
} from '@/components/ui'
import { Laptop, Upload, PaperclipIcon, ImageIcon } from 'lucide-react'
import { getAllDepartment, getAllCategories, createNewAsset } from '../api'
import { getAllUsers } from '@/features/user'
import { type CreateAssetFormType, createAssetFormSchema } from './model/schema'
import { tryCatch } from '@/utils'
import {
  AssetNameField,
  CategoryIdField,
  SerialNumberField,
  DepartmentIdField,
  PurchaseDateField,
  WarrantExpiryField,
  OwnerField,
  CostField,
} from './_components'

const CreateNewAsset = () => {
  const navigate = useNavigate()
  const [isPending, startTransition] = useTransition()

  const [fileName, setFileName] = useState<string | null>(null)
  const [departments, setDepartments] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [isPendingGetData, startTransitionGetData] = useTransition()
  const [imageName, setImageName] = useState<string | null>(null)

  const getAllInformation = () => {
    startTransitionGetData(async () => {
      const departmentsResponse = await tryCatch(getAllDepartment())
      if (departmentsResponse.error) {
        toast.error(departmentsResponse.error?.message || 'Failed to load departments')
        return
      }
      setDepartments(departmentsResponse.data.data)
      const categoriesResponse = await tryCatch(getAllCategories())
      if (categoriesResponse.error) {
        toast.error(categoriesResponse.error?.message || 'Failed to load categories')
        return
      }
      setCategories(categoriesResponse.data.data)
      const usersResponse = await tryCatch(getAllUsers())
      if (usersResponse.error) {
        toast.error(usersResponse.error?.message || 'Failed to load users')
        return
      }
      setUsers(usersResponse.data.data)
    })
  }

  useEffect(() => {
    getAllInformation()
  }, [])
  const form = useForm<CreateAssetFormType>({
    resolver: zodResolver(createAssetFormSchema),
    defaultValues: {
      assetName: '',
      purchaseDate: undefined,
      warrantExpiry: undefined,
      cost: 0,
      serialNumber: '',
      categoryId: '',
      departmentId: '',
      owner: '',
      file: null,
      image: null,
    },
    mode: 'onChange',
  })
  const onSubmit = (data: CreateAssetFormType) => {
    startTransition(async () => {
      const response = await tryCatch(createNewAsset(data))
      if (response.error) {
        toast.error(response.error?.message || 'Failed to create asset')
        return
      }
      toast.success('Asset created successfully')
      navigate('/assets')
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const file = e.target.files?.[0]
    if (file) {
      field.onChange(file)
      setImageName(file.name)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const file = e.target.files?.[0]
    if (file) {
      field.onChange(file)
      setFileName(file.name)
    }
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
  return (
    <div className='container mx-auto max-w-3xl py-6'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center text-2xl'>
            <Laptop className='mr-2 h-6 w-6' />
            Create New Asset
          </CardTitle>
          <CardDescription>Add a new asset to the inventory system</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-6'
              aria-disabled={isPendingGetData}
            >
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <AssetNameField form={form} />
                <SerialNumberField form={form} />
                <CategoryIdField
                  form={form}
                  categories={categories}
                />
                <DepartmentIdField
                  form={form}
                  departments={departments}
                />
                <PurchaseDateField
                  form={form}
                  handlePurchaseDateChange={handlePurchaseDateChange}
                />
                <WarrantExpiryField form={form} />
                <CostField form={form} />
                <OwnerField
                  form={form}
                  users={users}
                />
              </div>

              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='image'
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>
                        Asset Image <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <div className='flex w-full flex-col items-center justify-center'>
                          <label
                            htmlFor='image-upload'
                            className='flex h-28 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-slate-900 dark:hover:border-gray-500'
                          >
                            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                              <ImageIcon className='mb-2 h-8 w-8 text-gray-500 dark:text-gray-400' />
                              <p className='mb-1 text-sm text-gray-500 dark:text-gray-400'>
                                {imageName ? imageName : 'Click to upload image'}
                              </p>
                              <p className='text-xs text-gray-500 dark:text-gray-400'>PNG, JPG, GIF up to 10MB</p>
                            </div>
                            <Input
                              id='image-upload'
                              type='file'
                              accept='image/*'
                              className='hidden'
                              {...field}
                              onChange={(e) => handleImageChange(e, { onChange })}
                            />
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button
            variant='outline'
            onClick={() => navigate('/assets')}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={isPending || !form.formState.isValid || !form.formState.isDirty}
          >
            {isPending ? (
              <LoadingSpinner className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <>
                <Upload className='mr-2 h-4 w-4' /> Create
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default CreateNewAsset
