import { Button, LoadingSpinner } from '@/components'

export const ButtonSubmit = ({ isPending }: { isPending: boolean }) => {
  return (
    <Button
      type='submit'
      className='w-full'
    >
      {isPending ? <LoadingSpinner className='mr-2 h-4 w-4 animate-spin' /> : 'Send'}
    </Button>
  )
}
