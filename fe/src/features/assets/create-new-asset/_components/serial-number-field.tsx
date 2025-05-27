import { FormControl, FormField, FormItem, FormMessage, FormLabel, Input } from '@/components'
import type { CreateAssetFormType } from '../model'
import type { UseFormReturn } from 'react-hook-form'

export const SerialNumberField = ({ form }: { form: UseFormReturn<CreateAssetFormType> }) => {
  return (
    <FormField
      control={form.control}
      name='serialNumber'
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Serial Number <span className='text-red-500'>*</span>
          </FormLabel>
          <FormControl>
            <Input
              placeholder='Enter serial number'
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
