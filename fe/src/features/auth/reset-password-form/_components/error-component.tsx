import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from '@/components/ui'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export const ErrorComponent = () => {
  return (
    <Card className='mx-auto w-full max-w-md'>
      <CardHeader>
        <CardTitle>Invalid reset link</CardTitle>
        <CardDescription>The reset link is invalid or has expired.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant='outline'
          asChild
          className='w-full'
        >
          <Link to='/forget-password'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to forgot password
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
