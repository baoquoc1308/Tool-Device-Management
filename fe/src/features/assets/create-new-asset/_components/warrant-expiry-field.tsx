import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  Calendar,
} from '@/components'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import type { CreateAssetFormType } from '../model'
import type { UseFormReturn } from 'react-hook-form'
export const WarrantExpiryField = ({ form }: { form: UseFormReturn<CreateAssetFormType> }) => {
  return (
    <FormField
      control={form.control}
      name='warrantExpiry'
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <FormLabel>
            Warranty Expiry <span className='text-red-500'>*</span>
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={`w-full pl-3 text-left font-normal ${!field.value && 'text-muted-foreground'}`}
                >
                  {field.value ? format(field.value, 'PPP') : <span>Select date</span>}
                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className='w-auto p-0'
              align='start'
            >
              <Calendar
                mode='single'
                selected={field.value}
                onSelect={field.onChange}
                autoFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
