import { SignupForm } from '@/features/auth'
import { Box } from 'lucide-react'

const Signup = () => {
  return (
    <div className='border-border bg-card w-full max-w-md overflow-hidden rounded-xl border shadow-xl'>
      <div className='bg-primary/10 dark:bg-primary/20 border-border border-b p-4 sm:p-6'>
        <div className='mb-3 flex items-center justify-center sm:mb-4'>
          <Box className='text-primary h-12 w-12' />
        </div>
        <h2 className='text-foreground text-center text-lg font-bold sm:text-xl'>Device Management Tool</h2>
      </div>

      <div className='p-4 sm:p-6'>
        <SignupForm />
      </div>

      <div className='border-border bg-muted text-muted-foreground border-t px-4 py-3 text-center text-xs sm:px-6 sm:py-4'>
        © {new Date().getFullYear()} Device Management System • All rights reserved
      </div>
    </div>
  )
}

export default Signup
