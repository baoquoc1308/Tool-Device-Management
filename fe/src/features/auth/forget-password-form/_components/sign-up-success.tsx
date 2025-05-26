import { ArrowLeft } from 'lucide-react'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { Link } from 'react-router-dom'
const SignUpSuccess = () => {
  return (
    <Card className='mx-auto w-full max-w-md'>
      <CardHeader>
        <CardTitle>Check your email</CardTitle>
        <CardDescription>We've sent password reset instructions to your email.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className='text-muted-foreground mb-4 text-sm'>
          If you don't see the email, check other places it might be, like your junk, spam, or other folders.
        </p>
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

export default SignUpSuccess
