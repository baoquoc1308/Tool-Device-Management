import { Button, LoadingSpinner } from '@/components/ui'
import { Plus } from 'lucide-react'

export const ButtonSubmit = ({ form, isPending }: { form: any; isPending: boolean }) => {
  return (
    <Button
      disabled={!form.formState.isDirty || !form.formState.isValid || isPending}
      type='submit'
      className='bg-primary hover:bg-primary/90 mt-5 flex h-9 w-full items-center justify-center gap-1.5 text-sm font-medium sm:mt-6 sm:h-10 sm:gap-2 sm:text-base'
    >
      {isPending ? (
        <LoadingSpinner className='mr-2 h-4 w-4 animate-spin' />
      ) : (
        <>
          <Plus className='h-4 w-4' />
          Create Account
        </>
      )}
    </Button>
  )
}
