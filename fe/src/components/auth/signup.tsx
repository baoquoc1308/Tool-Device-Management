import { SignupForm } from '@/features/auth'
import { Box } from 'lucide-react'
const Signup = () => {
  return (
    <div className='w-full max-w-md overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl'>
      <div className='bg-primary/10 border-b border-gray-200 p-4 sm:p-6'>
        <div className='mb-3 flex items-center justify-center sm:mb-4'>
          <Box className='text-primary h-12 w-12' />
        </div>
        <h2 className='text-center text-lg font-bold text-gray-800 sm:text-xl'>Device Management Tool</h2>
      </div>

      <div className='p-4 sm:p-6'>
        <SignupForm />
      </div>

      <div className='border-t border-gray-200 bg-gray-50 px-4 py-3 text-center text-xs text-gray-500 sm:px-6 sm:py-4'>
        © {new Date().getFullYear()} Device Management System • All rights reserved
      </div>
    </div>
  )
}

export default Signup
