import { FormControl, FormField, FormItem, FormMessage, FormLabel, Input } from '@/components/ui'
import type { CreateAssetFormType } from '../model'
import type { UseFormReturn } from 'react-hook-form'

export const AssetNameField = ({ form }: { form: UseFormReturn<CreateAssetFormType> }) => {
  return (
    <FormField
      control={form.control}
      name='assetName'
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Asset Name <span className='text-red-500'>*</span>
          </FormLabel>
          <FormControl>
            <Input
              placeholder='Enter asset name'
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
