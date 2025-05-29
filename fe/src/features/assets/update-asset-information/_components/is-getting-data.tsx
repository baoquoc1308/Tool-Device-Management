import { Loader2 } from 'lucide-react'

export const IsGettingData = () => {
  return (
    <div className='flex h-[70vh] items-center justify-center'>
      <Loader2 className='text-primary h-12 w-12 animate-spin' />
    </div>
  )
}
