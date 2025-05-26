import { FormControl, FormField, FormItem, FormMessage, Checkbox, Label } from '@/components/ui'
import type { DataLoginType } from '../model'
import type { UseFormReturn } from 'react-hook-form'

export const RememberMeField = ({ form }: { form: UseFormReturn<DataLoginType> }) => {
  return (
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
  )
}
