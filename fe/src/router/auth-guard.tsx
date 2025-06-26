import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useGetSession } from '@/hooks/use-get-session'
import { Skeleton } from '@/components'

export const ProtectedRoute = () => {
  const token = Cookies.get('accessToken')
  const { loading } = useGetSession()
  if (loading) return <Skeleton className='size-full' />
  return token ? <Outlet /> : <Navigate to={'/login'} />
}

export const AuthRoute = () => {
  const token = Cookies.get('accessToken')
  return token ? <Navigate to={'/'} /> : <Outlet />
}
