import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type DataLoginType, loginSchema } from './model/schema'
import {
  FormField,
  FormItem,
  Label,
  FormControl,
  FormMessage,
  Input,
  Button,
  Form,
  Checkbox,
  LoadingSpinner,
} from '@/components/ui'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAppDispatch } from '@/hooks'
import { logIn } from '../slice'
import { useTransition } from 'react'
import Cookies from 'js-cookie'
import { Lock, LogIn, Mail } from 'lucide-react'
import { LinkToForgetPassword, LinkToSignUp } from './_components'
import ButtonSubmitForm from './_components/button-submit-form'

const LoginForm = () => {
  const [isPending, startTransition] = useTransition()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const form = useForm<DataLoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (data: DataLoginType) => {
    startTransition(async () => {
      const result = await dispatch(logIn(data)).unwrap()
      if (!result.success) {
        toast.error((result.error as any)?.msg)
        return
      }
      if (result.data.is_active === false) {
        toast.error('User is inactive, please go to email and verify your account')
        return
      }
      Cookies.set('accessToken', result.data.access_token)
      Cookies.set('refreshToken', result.data.refresh_token)
      toast.success('Login successfully')
      navigate('/')
    })
  }
  return (
    <div>
      <div className='mb-4 flex flex-col items-center sm:mb-6'>
        <h1 className='mb-1 text-xl font-bold text-gray-800 sm:mb-2 sm:text-2xl'>Sign in to your account</h1>
        <p className='text-muted-foreground px-2 text-center text-sm'>Manage your devices and assets securely</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4 sm:space-y-5'
        >
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
                <LinkToForgetPassword />
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
            name='rememberMe'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='mt-2 flex items-center'>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label className='ml-2 block text-xs text-gray-700 sm:text-sm'>Remember me</Label>
                  </div>
                </FormControl>
                <FormMessage className='text-xs sm:text-sm' />
              </FormItem>
            )}
          />
          <ButtonSubmitForm
            isPending={isPending}
            form={form}
          />
          <LinkToSignUp />
        </form>
      </Form>
    </div>
  )
}

export default LoginForm
