import { useTransition } from 'react'
import { signOut } from './action/sign-out'
import { toast } from 'sonner'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { LoadingSpinner } from '@/components'

const SignOut = () => {
  const navigate = useNavigate()
  const [isPending, startTransition] = useTransition()
  const handleSignOut = () => {
    startTransition(async () => {
      const response = await signOut()
      if (!response.success) {
        toast.error('Sign out failed')
      }
      toast.success('Sign out successfully')
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
      navigate('/login')
    })
  }
  return <span onClick={handleSignOut}>{isPending ? <LoadingSpinner className='' /> : 'Sign Out'}</span>
}

export default SignOut
