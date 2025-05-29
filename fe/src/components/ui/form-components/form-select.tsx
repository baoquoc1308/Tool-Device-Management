import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui'
import { useFormContext } from 'react-hook-form'

export const FormSelect = ({
  name,
  label,
  placeholder,
  data,
}: {
  name: string
  label: string
  placeholder: string
  data: any[]
}) => {
  const { control } = useFormContext()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Label>{label}</Label>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {data.map((d) => (
                <SelectItem
                  key={d.id}
                  value={d.id.toString()}
                >
                  {d.categoryName || d.departmentName || d.name}
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
