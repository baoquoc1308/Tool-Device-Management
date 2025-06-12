import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  Form,
  FormDatePicker,
} from '@/components/ui'
import { Check, Loader2 } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useTransition } from 'react'
import { type UpdateMaintenanceScheduleType, updateMaintenanceScheduleSchema } from './model/schema'
import { updateMaintenanceSchedule } from '../api'
import { toast } from 'sonner'
import { tryCatch } from '@/utils'

const UpdateMaintenanceSchedule = ({
  id,
  isDialogOpen,
  setIsDialogOpen,
}: {
  id: string
  isDialogOpen: boolean
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [isProcessing, startTransition] = useTransition()

  const form = useForm<UpdateMaintenanceScheduleType>({
    resolver: zodResolver(updateMaintenanceScheduleSchema),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
    },
    mode: 'onChange',
  })

  const onSubmit = async (data: UpdateMaintenanceScheduleType) => {
    startTransition(async () => {
      const response = await tryCatch(updateMaintenanceSchedule(id, data))
      if (response.error) {
        toast.error(response.error.message || 'Failed to update maintenance schedule')
        return
      }
      toast.success('Maintenance schedule updated successfully')
      form.reset({
        startDate: undefined,
        endDate: undefined,
      })
      setIsDialogOpen(false)
    })
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
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
    >
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Update Maintenance Schedule</DialogTitle>
          <DialogDescription>Set the start and end dates for maintenance schedule.</DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4'
            >
              <FormDatePicker
                name='startDate'
                label='Start Date'
                fn={handleStartDateChange}
              />

              <FormDatePicker
                name='endDate'
                label='End Date'
              />

              <DialogFooter>
                <Button
                  variant='outline'
                  type='button'
                  onClick={() => {
                    setIsDialogOpen(false)
                    form.reset({
                      startDate: undefined,
                      endDate: undefined,
                    })
                  }}
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  disabled={isProcessing || !form.formState.isValid || !form.formState.isDirty}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Check className='mr-2 h-4 w-4' />
                      Update Schedule
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateMaintenanceSchedule
