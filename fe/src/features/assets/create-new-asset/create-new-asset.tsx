import { useEffect, useState, useTransition } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import {
  Form,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  FormInput,
  FormSelect,
  FormDatePicker,
  FormButtonSubmit,
} from '@/components/ui'
import { DollarSign, Laptop } from 'lucide-react'
import { getAllDepartment, getAllCategories, createNewAsset } from '../api'
import { type CreateAssetFormType, createAssetFormSchema } from './model/schema'
import { getData, tryCatch } from '@/utils'
import { FileField, ImageField, ButtonCancel } from './_components'
import type { CategoryType, DepartmentType } from './model'

const CreateNewAsset = () => {
  const navigate = useNavigate()
  const [isPending, startTransition] = useTransition()
  const [fileName, setFileName] = useState<string>('')
  const [departments, setDepartments] = useState<DepartmentType[]>([])
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [isPendingGetData, startTransitionGetData] = useTransition()
  const [imageName, setImageName] = useState<string>('')

  const getAllInformation = () => {
    startTransitionGetData(async () => {
      await getData(getAllDepartment, setDepartments)
      await getData(getAllCategories, setCategories)
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
      file: '',
      image: '',
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
  const handlePurchaseDateChange = (value: Date) => {
    form.setValue('purchaseDate', value)
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
        <FormProvider {...form}>
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
                  <FormSelect
                    name='categoryId'
                    label='Category'
                    placeholder='Select a category'
                    data={categories}
                  />

                  <FormSelect
                    name='departmentId'
                    label='Department'
                    placeholder='Select a department'
                    data={departments}
                  />
                  <FormDatePicker
                    name='purchaseDate'
                    label='Purchase Date'
                    fn={handlePurchaseDateChange}
                  />

                  <FormDatePicker
                    name='warrantExpiry'
                    label='Warranty Expiry'
                  />
                  <FormInput
                    name='cost'
                    type='number'
                    label='Cost'
                    placeholder='Enter asset cost'
                    Icon={DollarSign}
                  />
                </div>

                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  <FileField
                    form={form}
                    fileName={fileName}
                    setFileName={setFileName}
                  />
                  <ImageField
                    form={form}
                    imageName={imageName}
                    setImageName={setImageName}
                  />
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className='flex justify-between'>
            <ButtonCancel isPending={isPending} />
            <FormButtonSubmit
              className='w-fit sm:w-auto'
              isPending={isPending}
              Icon={Laptop}
              type='Create Asset'
              onSubmit={onSubmit}
            />
          </CardFooter>
        </FormProvider>
      </Card>
    </div>
  )
}

export default CreateNewAsset
