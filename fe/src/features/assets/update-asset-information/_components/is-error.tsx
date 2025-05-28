import { Button } from '@/components'
import { AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'
export const IsError = ({ id }: { id: string }) => {
  return (
    <div className='flex h-[70vh] flex-col items-center justify-center space-y-4'>
      <AlertTriangle className='text-warning h-16 w-16' />
      <h2 className='text-2xl font-semibold'>Asset Not Found</h2>
      <p className='text-muted-foreground'>The asset with ID {id} could not be found.</p>
      <Link to='/assets'>
        <Button>Return to Assets</Button>
      </Link>
    </div>
  )
}
