import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { DataSignupType } from './model/schema'
import { signupSchema } from './model/schema'
import { Form } from '@/components/ui'
import { Link, useNavigate } from 'react-router-dom'
import { signUpNewUser } from '../api'
import { toast } from 'sonner'
import { useTransition } from 'react'
import { tryCatch } from '@/utils'
import type { AxiosError } from 'axios'

import {
  ConfirmPasswordField,
  EmailField,
  FirstNameField,
  LastNameField,
  PasswordField,
  ButtonSubmit,
} from './_components'

const SignupForm = () => {
  const [isPending, startTransition] = useTransition()
  const navigate = useNavigate()
  const form = useForm<DataSignupType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (data: DataSignupType) => {
    startTransition(async () => {
      const response = await tryCatch(signUpNewUser(data))
      const errorData = (response.error as AxiosError)?.response?.data
      const errorMsg =
        errorData && typeof errorData === 'object' && 'msg' in errorData
          ? (errorData as { msg: string }).msg
          : undefined

      if (errorData) {
        toast.error(errorMsg)
        return
      }
      toast.success('Account created successfully')
      navigate('/login')
    })
  }

  return (
    <div>
      <div className='mb-4 flex flex-col items-center sm:mb-6'>
        <h1 className='mb-1 text-xl font-bold text-gray-800 sm:mb-2 sm:text-2xl'>Create your account</h1>
        <p className='text-muted-foreground px-2 text-center text-sm'>Get started with device management system</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4 sm:space-y-5'
        >
          <div className='grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2'>
            <FirstNameField form={form} />
            <LastNameField form={form} />
          </div>
          <EmailField form={form} />
          <PasswordField form={form} />
          <ConfirmPasswordField form={form} />
          <ButtonSubmit
            form={form}
            isPending={isPending}
          />
          <div className='text-muted-foreground mt-4 text-center text-xs sm:text-sm'>
            Already have an account?{' '}
            <Link
              to='/login'
              className='text-primary font-medium hover:underline'
            >
              Sign in
            </Link>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SignupForm
