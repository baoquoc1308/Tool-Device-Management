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
import { signUpNewUser } from './action'
import { toast } from 'sonner'
import { useTransition } from 'react'

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
      const result = await signUpNewUser(data)
      if (!result.success) {
        toast.error((result.error as any)?.data.msg)
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
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                          className='h-4 w-4 text-gray-400 sm:h-5 sm:w-5'
                        >
                          <path d='M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z' />
                        </svg>
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
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                          className='h-4 w-4 text-gray-400 sm:h-5 sm:w-5'
                        >
                          <path d='M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z' />
                        </svg>
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
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        className='h-4 w-4 text-gray-400 sm:h-5 sm:w-5'
                      >
                        <path d='M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z' />
                        <path d='M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z' />
                      </svg>
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
            disabled={!form.formState.isDirty}
            type='submit'
            className='bg-primary hover:bg-primary/90 mt-5 flex h-9 w-full items-center justify-center gap-1.5 text-sm font-medium sm:mt-6 sm:h-10 sm:gap-2 sm:text-base'
          >
            {isPending ? (
              <LoadingSpinner className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  className='h-4 w-4 sm:h-5 sm:w-5'
                >
                  <path d='M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z' />
                </svg>
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
