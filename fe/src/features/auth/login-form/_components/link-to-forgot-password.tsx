import { Link } from 'react-router-dom'
import { Label } from '@/components/ui'

export const LinkToForgetPassword = () => {
  return (
    <div className='flex items-center justify-between'>
      <Label className='text-sm font-medium'>Password</Label>
      <Link
        to='/forget-password'
        className='text-primary text-xs hover:underline'
      >
        Forgot password?
      </Link>
    </div>
  )
}
