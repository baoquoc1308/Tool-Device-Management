import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui'
import { ShieldX } from 'lucide-react'

interface AdminGuardProps {
  children: React.ReactNode
  fallbackPath?: string
}

export const AdminGuard = ({ children, fallbackPath = '/dashboard' }: AdminGuardProps) => {
  const [userRole, setUserRole] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        const user = JSON.parse(userData)
        setUserRole(user?.role?.slug || '')
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className='flex min-h-[200px] items-center justify-center'>
        <div className='h-6 w-6 animate-spin rounded-full border-b-2 border-blue-600' />
      </div>
    )
  }

  if (userRole !== 'admin') {
    return (
      <div className='flex min-h-[400px] items-center justify-center p-6'>
        <Card className='max-w-md'>
          <CardContent className='flex flex-col items-center p-6 text-center'>
            <ShieldX className='mb-4 h-12 w-12 text-red-500' />
            <h3 className='mb-2 text-lg font-semibold'>Access Denied</h3>
            <p className='text-muted-foreground mb-4'>
              You don't have permission to access this page. Only administrators can view statistical reports.
            </p>
            <Navigate
              to={fallbackPath}
              replace
            />
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
