import { Button, LoadingSpinner } from '@/components'
import { LogIn } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'
import type { DataLoginType } from '../model'

export const ButtonSubmitForm = ({ isPending, form }: { isPending: boolean; form: UseFormReturn<DataLoginType> }) => {
  return (
    <Button
      disabled={!form.formState.isDirty}
      type='submit'
      className='bg-primary hover:bg-primary/90 mt-5 flex h-9 w-full items-center justify-center gap-1.5 text-sm font-medium sm:mt-6 sm:h-10 sm:gap-2 sm:text-base'
    >
      {isPending ? (
        <LoadingSpinner className='h-4 w-4 animate-spin' />
      ) : (
        <>
          <LogIn />
          Sign In
        </>
      )}
    </Button>
  )
}
