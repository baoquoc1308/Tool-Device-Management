import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@/components'
import type { FilterType } from '../../../model'
import { useEffect, useState, useTransition } from 'react'
import { tryCatch } from '@/utils'
import { getAllCategories } from '@/features/assets/api'
export const CategoriesFilter = ({
  filteredAssets,
  setFilteredAssets,
}: {
  filteredAssets: FilterType
  setFilteredAssets: React.Dispatch<React.SetStateAction<FilterType>>
}) => {
  const [isPending, startTransition] = useTransition()
  const [categories, setCategories] = useState<any[]>([])
  const getCategories = () => {
    startTransition(async () => {
      const response = await tryCatch(getAllCategories())
      if (response.error) {
        return
      }
      setCategories(response.data.data)
    })
  }
  useEffect(() => {
    getCategories()
  }, [])
  return (
    <Select
      disabled={isPending}
      value={filteredAssets.categoryId || ''}
      onValueChange={(value) => setFilteredAssets({ ...filteredAssets, categoryId: value || null })}
    >
      <SelectTrigger className='w-full md:w-[180px]'>
        <SelectValue placeholder='Category'>
          {filteredAssets.categoryId &&
            categories.find((category) => category.id.toString() === filteredAssets.categoryId)?.categoryName}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {categories.map((category) => (
            <SelectItem
              key={category.id}
              value={category.id}
            >
              {category.categoryName}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
