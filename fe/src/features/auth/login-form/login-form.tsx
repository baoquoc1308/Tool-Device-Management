import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type DataLoginType, loginSchema } from './model/schema'
import { Form } from '@/components/ui'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAppDispatch } from '@/hooks'
import { logIn } from '../slice'
import { useTransition } from 'react'
import Cookies from 'js-cookie'
import { EmailField, ButtonSubmitForm, LinkToSignUp, PasswordField, RememberMeField } from './_components'

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
          <EmailField form={form} />
          <PasswordField form={form} />
          <RememberMeField form={form} />
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
