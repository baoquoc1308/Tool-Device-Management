import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  Button,
  FormDatePicker,
  FormSelect,
} from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import type { AssetsType } from '../view-all-assets'
import { createMaintenanceSchedule, getAllAssets } from '../api'
import { getData, tryCatch } from '@/utils'
import { type CreateMaintenanceScheduleType, createMaintenanceScheduleSchema } from './model/schema'

const CreateMaintenanceSchedule = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [assets, setAssets] = useState<AssetsType[]>([])
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()

  const getAssetsData = async () => {
    setIsPending(true)
    await getData(getAllAssets, setAssets)
    setIsPending(false)
  }
  useEffect(() => {
    getAssetsData()
  }, [])

  const form = useForm<CreateMaintenanceScheduleType>({
    resolver: zodResolver(createMaintenanceScheduleSchema),
    defaultValues: {
      assetId: '',
      startDate: undefined,
      endDate: undefined,
    },
    mode: 'onChange',
  })

  const onSubmit = async (data: CreateMaintenanceScheduleType) => {
    setIsSubmitting(true)
    const response = await tryCatch(createMaintenanceSchedule(data))
    if (response.error) {
      toast.error(response.error.message || 'Failed to create maintenance schedule')
      setIsSubmitting(false)
      return
    }
    toast.success('Maintenance schedule created successfully')
    form.reset({
      assetId: '',
      startDate: undefined,
      endDate: undefined,
    })
    setIsSubmitting(false)
    navigate('/assets/maintenance-schedule')
  }
  const handleStartDateChange = (value: Date) => {
    form.setValue('startDate', value)
    const endDate = form.getValues('endDate')

    if (endDate) {
      form.trigger('endDate')
    } else {
      form.clearErrors('endDate')
    }
  }
  return (
    <div className='container mx-auto py-10'>
      <Card className='mx-auto max-w-2xl'>
        <CardHeader>
          <CardTitle>Create Maintenance Schedule</CardTitle>
          <CardDescription>
            Schedule maintenance for an asset by selecting dates and the asset to maintain.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
              >
                {isPending ? (
                  <div className='flex'>
                    <Loader2 className='text-muted-foreground h-6 w-6 animate-spin' />
                  </div>
                ) : (
                  <FormSelect
                    name='assetId'
                    label='Select Asset'
                    placeholder='Select an asset'
                    data={assets}
                  />
                )}

                <FormDatePicker
                  name='startDate'
                  label='Start Date'
                  fn={handleStartDateChange}
                />

                <FormDatePicker
                  name='endDate'
                  label='End Date'
                />

                <div className='flex justify-end space-x-4'>
                  <Button
                    variant='outline'
                    onClick={() => navigate('/assets/maintenance-schedule')}
                    type='button'
                  >
                    Cancel
                  </Button>
                  <Button
                    type='submit'
                    disabled={isSubmitting || !form.formState.isValid || !form.formState.isDirty}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        Creating...
                      </>
                    ) : (
                      'Create Schedule'
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateMaintenanceSchedule
