import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

export function StatusFilter({
  status,
  setStatus,
}: {
  status: string
  setStatus: React.Dispatch<React.SetStateAction<string>>
}) {
  const statuses: { value: string; label: string }[] = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Confirm', label: 'Confirmed' },
    { value: 'Deny', label: 'Denied' },
  ]

  return (
    <div className='flex flex-col space-y-1.5'>
      <Label htmlFor='status'>Status</Label>
      <Select
        value={status}
        onValueChange={setStatus}
      >
        <SelectTrigger
          id='status'
          className='w-full md:w-[180px]'
        >
          <SelectValue placeholder='Filter by status' />
        </SelectTrigger>
        <SelectContent>
          {statuses.map((statusOption) => (
            <SelectItem
              key={statusOption.value}
              value={statusOption.value}
            >
              {statusOption.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
