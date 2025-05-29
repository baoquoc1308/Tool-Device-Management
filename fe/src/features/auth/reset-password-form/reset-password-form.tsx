import { useState, useTransition } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FormInput,
  FormButtonSubmit,
} from '@/components/ui'
import { toast } from 'sonner'
import { type ResetPasswordFormType, resetPasswordFormSchema } from './model'
import { resetPassword } from '../api'
import { tryCatch } from '@/utils'
import { ErrorComponent, SuccessComponent } from './_components'
import { Lock } from 'lucide-react'

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
      const response = await tryCatch(resetPassword(data.password, token))
      if (response.error && response.error.message === 'Token was expired') {
        toast.error(response.error.message)
        setError(true)
        return
      }
      if (response.error) {
        toast.error(response.error.message || 'Failed to reset password, please try again')
        setError(true)
        return
      }
      setIsSuccess(true)
    })
  }

  if (isSuccess) {
    return <SuccessComponent />
  }

  if (error) {
    return <ErrorComponent />
  }

  return (
    <Card className='mx-auto w-full max-w-md'>
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>Enter a new password for your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4'
            >
              <FormInput
                name='password'
                type='password'
                label='New Password'
                placeholder='••••••••'
                Icon={Lock}
              />
              <FormInput
                name='confirmPassword'
                type='password'
                label='Confirm Password'
                placeholder='••••••••'
                Icon={Lock}
              />
              <FormButtonSubmit
                className='bg-primary hover:bg-primary/90 mt-5 flex h-9 w-full items-center justify-center gap-1.5 text-sm font-medium sm:mt-6 sm:h-10 sm:gap-2 sm:text-base'
                isPending={isPending}
                type='Reset Password'
                onSubmit={onSubmit}
              />
            </form>
          </Form>
        </FormProvider>
      </CardContent>
    </Card>
  )
}

export default ResetPasswordForm
