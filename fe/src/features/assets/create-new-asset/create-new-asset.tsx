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
import { CalendarIcon, Laptop, Upload, PaperclipIcon, ImageIcon } from 'lucide-react'
import getAllDepartment from './action/get-all-department'
import getAllCategories from './action/get-all-categories'
import getAllUsers from './action/get-all-user'
import { type CreateAssetFormType, createAssetFormSchema } from './model/schema'
import createNewAsset from './action/create-new-asset'

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
      const departmentsResponse = await getAllDepartment()
      if (!departmentsResponse.success) {
        toast.error(departmentsResponse.error?.message || 'Failed to load departments')
        return
      }
      setDepartments(departmentsResponse.data)
      const categoriesResponse = await getAllCategories()
      if (!categoriesResponse.success) {
        toast.error(categoriesResponse.error?.message || 'Failed to load categories')
        return
      }
      setCategories(categoriesResponse.data)
      const usersResponse = await getAllUsers()
      if (!usersResponse.success) {
        toast.error(usersResponse.error?.message || 'Failed to load users')
        return
      }
      setUsers(usersResponse.data)
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
      file: undefined,
      image: undefined,
    },
  })

  const onSubmit = (data: CreateAssetFormType) => {
    startTransition(async () => {
      console.log(data)
      const response = await createNewAsset(data)
      console.log('response', response)
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
                <FormField
                  control={form.control}
                  name='assetName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Asset Name <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter asset name'
                          {...field}
                        />
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
                      <FormLabel>
                        Serial Number <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter serial number'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='categoryId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Category <span className='text-red-500'>*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a category' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id.toString()}
                            >
                              {category.categoryName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='departmentId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Department <span className='text-red-500'>*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a department' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departments.map((department) => (
                            <SelectItem
                              key={department.id}
                              value={department.id.toString()}
                            >
                              {department.departmentName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='purchaseDate'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>
                        Purchase Date <span className='text-red-500'>*</span>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={`w-full pl-3 text-left font-normal ${!field.value && 'text-muted-foreground'}`}
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
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                            initialFocus
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
                    <FormItem className='flex flex-col'>
                      <FormLabel>
                        Warranty Expiry <span className='text-red-500'>*</span>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={`w-full pl-3 text-left font-normal ${!field.value && 'text-muted-foreground'}`}
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
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date('1900-01-01')}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='cost'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Cost <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <span className='absolute top-1/2 left-3 -translate-y-1/2'>$</span>
                          <Input
                            type='number'
                            className='pl-7'
                            placeholder='0.00'
                            {...field}
                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='owner'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Owner <span className='text-red-500'>*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a department' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {users.map((user) => (
                            <SelectItem
                              key={user.id}
                              value={user.id.toString()}
                            >
                              {user.lastName + ' ' + user.firstName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='file'
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>
                        Attachment <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <div className='flex w-full flex-col items-center justify-center'>
                          <label
                            htmlFor='file-upload'
                            className='flex h-28 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-slate-900 dark:hover:border-gray-500'
                          >
                            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                              <PaperclipIcon className='mb-2 h-8 w-8 text-gray-500 dark:text-gray-400' />
                              <p className='mb-1 text-sm text-gray-500 dark:text-gray-400'>
                                {fileName ? fileName : <span>Click to attach file</span>}
                              </p>
                              <p className='text-xs text-gray-500 dark:text-gray-400'>PDF, DOC, XLS, etc.</p>
                            </div>
                            <Input
                              id='file-upload'
                              type='file'
                              className='hidden'
                              {...field}
                              onChange={(e) => handleFileChange(e, { onChange })}
                            />
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
            disabled={isPending}
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
