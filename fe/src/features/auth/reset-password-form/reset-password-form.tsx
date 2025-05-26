import { useState, useTransition } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { toast } from 'sonner'
import { type ResetPasswordFormType, resetPasswordFormSchema } from './model'
import { resetPassword } from '../api'
import { tryCatch } from '@/utils'
import type { AxiosError } from 'axios'
import { PasswordField, ConfirmPasswordField, ButtonSubmit, ErrorComponent, SuccessComponent } from './_components'

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
      const errorData = (response.error as AxiosError)?.response?.data
      const errorMsg =
        errorData && typeof errorData === 'object' && 'msg' in errorData
          ? (errorData as { msg: string }).msg
          : undefined

      if (response.error && errorMsg === 'Token was expired') {
        toast.error(errorMsg)
        setError(true)
        return
      }
      if (response.error) {
        toast.error(errorMsg)
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <PasswordField form={form} />
            <ConfirmPasswordField form={form} />
            <ButtonSubmit isPending={isPending} />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ResetPasswordForm
