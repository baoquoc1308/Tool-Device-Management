import { FormControl, FormField, FormItem, FormMessage, FormLabel, Input } from '@/components/ui'
import type { ForgetPasswordFormType } from '../model'
import type { UseFormReturn } from 'react-hook-form'

export const EmailField = ({ form }: { form: UseFormReturn<ForgetPasswordFormType> }) => {
  return (
    <FormField
      control={form.control}
      name='email'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              placeholder='Enter your email address'
              type='email'
              autoComplete='email'
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
