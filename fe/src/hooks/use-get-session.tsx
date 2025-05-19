import { getSession } from '@/features/auth/slice'
import { useAppDispatch, useAppSelector } from './redux-hook'
import { useEffect } from 'react'

export const useGetSession = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector((state) => state.auth)
  useEffect(() => {
    dispatch(getSession()).unwrap()
  }, [])
  return { auth: data, loading: data.loading }
}
