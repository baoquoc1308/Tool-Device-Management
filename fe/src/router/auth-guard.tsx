import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
  //  const { loading } = useGetSession();
  //   if (loading) return;

  const user = localStorage.getItem('userId')
  return user ? <Outlet /> : <Navigate to={'/login'} />
}

export const AuthRoute = () => {
  const user = localStorage.getItem('userId')
  return user ? <Navigate to={'/'} /> : <Outlet />
}
