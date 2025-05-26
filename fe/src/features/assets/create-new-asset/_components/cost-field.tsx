import { FormControl, FormField, FormItem, FormMessage, FormLabel, Input } from '@/components'
import type { CreateAssetFormType } from '../model'
import type { UseFormReturn } from 'react-hook-form'

export const CostField = ({ form }: { form: UseFormReturn<CreateAssetFormType> }) => {
  return (
    <FormField
      control={form.control}
      name='cost'
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Cost <span className='text-red-500'>*</span>
          </FormLabel>
          <FormControl>
            <div className='relative'>
              <span className='absolute top-1/2 left-3 -translate-y-1/2'>$</span>
              <Input
                type='number'
                className='pl-7'
                placeholder='0.00'
                {...field}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
