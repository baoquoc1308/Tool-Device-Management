import { Button, LoadingSpinner } from '@/components'
import { Upload } from 'lucide-react'
import type { CreateAssetFormType } from '../model'
import type { UseFormReturn } from 'react-hook-form'

export const ButtonUpload = ({
  isPending,
  form,
  onSubmit,
}: {
  isPending: boolean
  form: UseFormReturn<CreateAssetFormType>
  onSubmit: (data: CreateAssetFormType) => void
}) => {
  return (
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
  )
}
