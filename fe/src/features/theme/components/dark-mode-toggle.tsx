import { Moon, Sun, Palette } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { toggleTheme } from '../slice/theme-slice'
import { SidebarMenuButton, useSidebar } from '@/components/ui/sidebar'

export const DarkModeToggle = () => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.theme.mode)
  const { state } = useSidebar()
  const isDark = theme === 'dark'
  const isCollapsed = state === 'collapsed'

  const handleToggle = () => {
    dispatch(toggleTheme())
  }

  return (
    <SidebarMenuButton
      onClick={handleToggle}
      className='w-full justify-between'
      tooltip={isCollapsed ? 'Toggle dark mode' : undefined}
    >
      <div className='flex items-center gap-2'>
        <Palette className='h-4 w-4' />
        {!isCollapsed && <span>Dark mode</span>}
      </div>
      {!isCollapsed && (
        <div
          className={`relative h-5 w-9 rounded-full transition-colors duration-200 ${
            isDark ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
          }`}
        >
          <div
            className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-md transition-transform duration-200 ${
              isDark ? 'translate-x-4' : 'translate-x-0.5'
            }`}
          >
            <div className='flex h-full w-full items-center justify-center'>
              {isDark ? <Moon className='text-primary h-2.5 w-2.5' /> : <Sun className='h-2.5 w-2.5 text-yellow-500' />}
            </div>
          </div>
        </div>
      )}
    </SidebarMenuButton>
  )
}
