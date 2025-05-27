import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Form, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui'
import { Laptop } from 'lucide-react'
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
  FileField,
  ImageField,
  ButtonCancel,
  ButtonUpload,
} from './_components'

const CreateNewAsset = () => {
  const navigate = useNavigate()
  const [isPending, startTransition] = useTransition()

  const [fileName, setFileName] = useState<string>('')
  const [departments, setDepartments] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [isPendingGetData, startTransitionGetData] = useTransition()
  const [imageName, setImageName] = useState<string>('')

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
                <PurchaseDateField form={form} />
                <WarrantExpiryField form={form} />
                <CostField form={form} />
                <OwnerField
                  form={form}
                  users={users}
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
          <ButtonUpload
            isPending={isPending}
            form={form}
          />
        </CardFooter>
      </Card>
    </div>
  )
}

export default CreateNewAsset
