import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui'
import type { CreateAssetFormType } from '../model'
import type { UseFormReturn } from 'react-hook-form'

export const OwnerField = ({ form, users }: { form: UseFormReturn<CreateAssetFormType>; users: any[] }) => {
  return (
    <FormField
      control={form.control}
      name='owner'
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Owner <span className='text-red-500'>*</span>
          </FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder='Select a department' />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {users.map((user) => (
                <SelectItem
                  key={user.id}
                  value={user.id.toString()}
                >
                  {user.lastName + ' ' + user.firstName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
