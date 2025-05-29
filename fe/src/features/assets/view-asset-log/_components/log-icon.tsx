import { cn } from '@/lib'
import type { AssetLog } from '../model/type'
import { Info, Pencil, PlusCircle, Trash2, ArrowRightLeft, PenTool } from 'lucide-react'

export const LogIcon = ({ item }: { item: AssetLog }) => {
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'Create':
        return <PlusCircle className='h-4 w-4' />
      case 'Update':
        return <Pencil className='h-4 w-4' />
      case 'Delete':
        return <Trash2 className='h-4 w-4' />
      case 'Transfer':
        return <ArrowRightLeft className='h-4 w-4' />
      case 'Maintenance':
        return <PenTool className='h-4 w-4' />
      default:
        return <Info className='h-4 w-4' />
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case 'Create':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'Update':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'Delete':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'Transfer':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
      case 'Maintenance':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
    }
  }

  return (
    <div className='mt-1'>
      <div className={cn('flex items-center justify-center rounded-full p-2', getActionColor(item.action))}>
        {getActionIcon(item.action)}
      </div>
    </div>
  )
}
