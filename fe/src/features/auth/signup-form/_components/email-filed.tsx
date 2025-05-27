import { FormControl, FormField, FormItem, FormMessage, Input, Label } from '@/components/ui'
import { Mail } from 'lucide-react'
import type { DataSignupType } from '../model'
import type { UseFormReturn } from 'react-hook-form'

export const EmailField = ({ form }: { form: UseFormReturn<DataSignupType> }) => {
  return (
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
  )
}
