import { Button, LoadingSpinner } from '@/components/ui'

export const ButtonSubmit = ({ isPending }: { isPending: boolean }) => {
  return (
    <Button
      type='submit'
      className='w-full'
      disabled={isPending}
    >
      {isPending ? <LoadingSpinner className='mr-2 h-4 w-4 animate-spin' /> : 'Reset Password'}
    </Button>
  )
}
