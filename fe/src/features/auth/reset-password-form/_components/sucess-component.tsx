import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from '@/components/ui'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'


export const SuccessComponent = () => {
  return (
    <Card className='mx-auto w-full max-w-md'>
      <CardHeader>
        <CardTitle>Password reset successful</CardTitle>
        <CardDescription>Your password has been reset successfully</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant='outline'
          asChild
          className='w-full'
        >
          <Link to='/login'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to login
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
