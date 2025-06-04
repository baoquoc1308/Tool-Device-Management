import { FormField, FormItem, FormControl, Textarea, FormMessage, Label } from '@/components'
import type { UseFormReturn } from 'react-hook-form'
import type { FormCreateRequestTransfer } from '../model'
export const FormDescriptionField = ({ form }: { form: UseFormReturn<FormCreateRequestTransfer> }) => {
  return (
    <FormField
      control={form.control}
      name='description'
      render={({ field }) => (
        <FormItem>
          <Label>Request Description</Label>
          <FormControl>
            <Textarea
              placeholder='Describe why you need this transfer...'
              className='min-h-[120px]'
              {...field}
            />
          </FormControl>
          <FormMessage />
          <p className='text-muted-foreground mt-1 text-xs'>
            Please provide details about why you need this asset transfer.
            {field.value && <span className='ml-1'>({field.value.length}/500 characters)</span>}
          </p>
        </FormItem>
      )}
    />
  )
}
