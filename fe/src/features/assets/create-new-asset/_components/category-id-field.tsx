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

export const CategoryIdField = ({
  form,
  categories,
}: {
  form: UseFormReturn<CreateAssetFormType>
  categories: any[]
}) => {
  return (
    <FormField
      control={form.control}
      name='categoryId'
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Category <span className='text-red-500'>*</span>
          </FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder='Select a category' />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem
                  key={category.id}
                  value={category.id.toString()}
                >
                  {category.categoryName}
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
