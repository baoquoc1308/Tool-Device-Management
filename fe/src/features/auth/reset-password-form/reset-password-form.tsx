import { useState, useTransition } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  Label,
  FormMessage,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  LoadingSpinner,
} from '@/components/ui'
import { Input } from '@/components/ui/input'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { type ResetPasswordFormType, resetPasswordFormSchema } from './model'
import { resetPassword } from './action'

const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const [isPending, startTransition] = useTransition()
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<boolean>(false)
  const form = useForm<ResetPasswordFormType>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (data: ResetPasswordFormType) => {
    startTransition(async () => {
      const response = await resetPassword(data.password, token)
      if (!response.success && (response.error?.data as { msg?: string } | undefined)?.msg === 'Token was expired') {
        toast.error((response.error?.data as { msg?: string })?.msg)
        setError(true)
        return
      }
      if (!response.success) {
        toast.error((response.error as any)?.data.msg)
        return
      }
      setIsSuccess(true)
    })
  }

  if (isSuccess) {
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

  if (error) {
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

  return (
    <Card className='mx-auto w-full max-w-md'>
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>Enter a new password for your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              name='password'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label className='text-sm font-medium'>Password</Label>
                  <FormControl>
                    <div className='relative'>
                      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                          className='h-4 w-4 text-gray-400 sm:h-5 sm:w-5'
                        >
                          <path
                            fillRule='evenodd'
                            d='M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </div>
                      <Input
                        type='password'
                        placeholder='••••••••'
                        className='h-9 pl-9 text-sm sm:h-10 sm:pl-10'
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className='text-xs sm:text-sm' />
                </FormItem>
              )}
            />

            <FormField
              name='confirmPassword'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label className='text-sm font-medium'>Confirm Password</Label>
                  <FormControl>
                    <div className='relative'>
                      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                          className='h-4 w-4 text-gray-400 sm:h-5 sm:w-5'
                        >
                          <path
                            fillRule='evenodd'
                            d='M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </div>
                      <Input
                        type='password'
                        placeholder='••••••••'
                        className='h-9 pl-9 text-sm sm:h-10 sm:pl-10'
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className='text-xs sm:text-sm' />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              className='w-full'
              disabled={isPending}
            >
              {isPending ? <LoadingSpinner className='mr-2 h-4 w-4 animate-spin' /> : 'Reset Password'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ResetPasswordForm
