import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { DataSignupType } from './model/schema'
import { signupSchema } from './model/schema'
import { Form, FormButtonSubmit, FormInput } from '@/components/ui'
import { Link, useNavigate } from 'react-router-dom'
import { signUpNewUser } from '../api'
import { toast } from 'sonner'
import { useState } from 'react'
import { tryCatch } from '@/utils'
import { Lock, Mail, Plus, User } from 'lucide-react'

const SignupForm = () => {
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()
  const methods = useForm<DataSignupType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: DataSignupType) => {
    setIsPending(true)
    const response = await tryCatch(signUpNewUser(data))

    if (response.error) {
      toast.error(response.error.message || 'Failed to create account, please try again')
      return
    }
    toast.success('Account created successfully')
    navigate('/login')
    setIsPending(false)
  }

  return (
    <div>
      <div className='mb-4 flex flex-col items-center sm:mb-6'>
        <h1 className='text-foreground mb-1 text-xl font-bold sm:mb-2 sm:text-2xl'>Create your account</h1>
        <p className='text-muted-foreground px-2 text-center text-sm'>Get started with device management system</p>
      </div>
      <FormProvider {...methods}>
        <Form {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className='space-y-4 sm:space-y-5'
          >
            <div className='grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2'>
              <FormInput
                name='firstName'
                type='text'
                label='First Name'
                Icon={User}
                placeholder='Enter your first name'
              />
              <FormInput
                name='lastName'
                type='text'
                label='Last Name'
                Icon={User}
                placeholder='Enter your last name'
              />
            </div>
            <FormInput
              name='email'
              type='email'
              label='Email Address'
              Icon={Mail}
              placeholder='Enter your email address'
            />
            <FormInput
              name='password'
              type='password'
              label='Password'
              Icon={Lock}
              placeholder='Enter your password'
            />
            <FormInput
              name='confirmPassword'
              type='password'
              label='Confirm Password'
              Icon={Lock}
              placeholder='Confirm your password'
            />
            <FormButtonSubmit
              className='bg-primary hover:bg-primary/90 mt-5 flex h-9 w-full items-center justify-center gap-1.5 text-sm font-medium sm:mt-6 sm:h-10 sm:gap-2 sm:text-base'
              isPending={isPending}
              Icon={Plus}
              type='Create Account'
              onSubmit={onSubmit}
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
      </FormProvider>
    </div>
  )
}

export default SignupForm
