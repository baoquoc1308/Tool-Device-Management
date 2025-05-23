import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { DataSignupType } from './model/schema'
import { signupSchema } from './model/schema'
import {
  FormField,
  FormItem,
  Label,
  FormControl,
  FormMessage,
  Input,
  Button,
  Form,
  LoadingSpinner,
} from '@/components/ui'
import { Link, useNavigate } from 'react-router-dom'
import { signUpNewUser } from '../api'
import { toast } from 'sonner'
import { useTransition } from 'react'
import { tryCatch } from '@/utils'
import type { AxiosError } from 'axios'
import { Lock, Mail, Plus, User } from 'lucide-react'

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
            <FormField
              name='firstName'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label className='text-sm font-medium'>First Name</Label>
                  <FormControl>
                    <div className='relative'>
                      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                        <User className='h-4 w-4 text-gray-400 sm:h-5 sm:w-5' />
                      </div>
                      <Input
                        type='text'
                        placeholder='Enter first name'
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
              name='lastName'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label className='text-sm font-medium'>Last Name</Label>
                  <FormControl>
                    <div className='relative'>
                      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                        <User className='h-4 w-4 text-gray-400 sm:h-5 sm:w-5' />
                      </div>
                      <Input
                        type='text'
                        placeholder='Enter last name'
                        className='h-9 pl-9 text-sm sm:h-10 sm:pl-10'
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className='text-xs sm:text-sm' />
                </FormItem>
              )}
            />
          </div>

          <FormField
            name='email'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label className='text-sm font-medium'>Email Address</Label>
                <FormControl>
                  <div className='relative'>
                    <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                      <Mail className='h-4 w-4 text-gray-400 sm:h-5 sm:w-5' />
                    </div>
                    <Input
                      type='email'
                      placeholder='email@company.com'
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
            name='password'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label className='text-sm font-medium'>Password</Label>
                <FormControl>
                  <div className='relative'>
                    <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                      <Lock className='h-4 w-4 text-gray-400 sm:h-5 sm:w-5' />
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
                      <Lock className='h-4 w-4 text-gray-400 sm:h-5 sm:w-5' />
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
            disabled={!form.formState.isDirty}
            type='submit'
            className='bg-primary hover:bg-primary/90 mt-5 flex h-9 w-full items-center justify-center gap-1.5 text-sm font-medium sm:mt-6 sm:h-10 sm:gap-2 sm:text-base'
          >
            {isPending ? (
              <LoadingSpinner className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <>
                <Plus className='h-4 w-4' />
                Create Account
              </>
            )}
          </Button>

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
