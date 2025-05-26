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

export const DepartmentIdField = ({
  form,
  departments,
}: {
  form: UseFormReturn<CreateAssetFormType>
  departments: any[]
}) => {
  return (
    <FormField
      control={form.control}
      name='departmentId'
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Department <span className='text-red-500'>*</span>
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
              {departments.map((department) => (
                <SelectItem
                  key={department.id}
                  value={department.id.toString()}
                >
                  {department.departmentName}
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
