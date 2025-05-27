import { FormControl, FormField, FormItem, FormMessage, Input } from '@/components/ui'
import { Lock } from 'lucide-react'
import { LinkToForgetPassword } from './link-to-forgot-password'
import type { UseFormReturn } from 'react-hook-form'
import type { DataLoginType } from '../model'

export const PasswordField = ({ form }: { form: UseFormReturn<DataLoginType> }) => {
  return (
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
  )
}
