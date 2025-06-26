import { useState } from 'react'
import { signOut } from '../api'
import { toast } from 'sonner'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { LoadingSpinner } from '@/components'
import { LogOut } from 'lucide-react'
import { tryCatch } from '@/utils'
import { useAppDispatch } from '@/hooks'
import { clearAuthState } from '../slice/reducer'

const SignOut = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isPending, setIsPending] = useState(false)

  const handleSignOut = async () => {
    setIsPending(true)
    const response = await tryCatch(signOut())
    if (response.error) {
      toast.error('Sign out failed')
    }
    dispatch(clearAuthState())
    toast.success('Sign out successfully')
    Object.keys(Cookies.get()).forEach(function (cookieName) {
      Cookies.remove(cookieName)
    })
    navigate('/login')
    setIsPending(false)
  }
  return (
    <div
      onClick={handleSignOut}
      className='flex w-full cursor-pointer items-center gap-2 rounded-md p-2 text-sm'
    >
      <LogOut />
      {isPending ? <LoadingSpinner className='' /> : 'Sign Out'}
    </div>
  )
}

export default SignOut
