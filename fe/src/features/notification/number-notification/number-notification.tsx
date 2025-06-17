import { Bell } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  LoadingSpinner,
} from '@/components/ui'
import { tryCatch } from '@/utils'
import { getAllNotifications, updateReadNotification } from '../api'
import { toast } from 'sonner'
import type { NotificationType } from './model'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

const NumberNotification = () => {
  const navigate = useNavigate()
  const [unreadCount, setUnreadCount] = useState(0)
  const [notifications, setNotifications] = useState<NotificationType[]>([])
  const [isPending, setIsPending] = useState(false)

  const getNotifications = async () => {
    setIsPending(true)
    const response = await tryCatch(getAllNotifications())
    if (response.error) {
      toast.error(response.error.message || 'Failed to fetch notifications')
      return
    }
    setNotifications(response.data.data)
    setUnreadCount(
      response.data.data.filter((notification: NotificationType) => notification.status === 'pending').length
    )
    setIsPending(false)
  }

  const clickNotification = async (id: string) => {
    const response = await tryCatch(updateReadNotification(id))
    if (response.error) {
      toast.error(response.error.message || 'Failed to seen notification')
      return
    }
    setUnreadCount((prev) => prev - 1)
    // Update the notification status locally
    setNotifications(
      notifications.map((notification) =>
        notification.id.toString() === id ? { ...notification, status: 'seen' } : notification
      )
    )
    navigate(`assets/${id}`)
  }

  useEffect(() => {
    getNotifications()
  }, [])

  return (
    <div className='relative'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='relative'
          >
            <Bell className='h-12 w-12' />
            {unreadCount > 0 && (
              <span className='absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white'>
                {isPending ? (
                  <LoadingSpinner className='h-6 w-6 animate-spin text-white' />
                ) : (
                  <span>{unreadCount}</span>
                )}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          className='w-80'
        >
          <div className='flex items-center justify-between border-b px-4 py-2'>
            <span className='font-medium'>Notifications</span>
            {notifications.length > 0 && <span className='text-muted-foreground text-sm'>{unreadCount} unread</span>}
          </div>
          <DropdownMenuItem className='cursor-pointer p-0'>
            <div className='flex w-full flex-col'>
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <div
                    key={index}
                    onClick={() => clickNotification(notification.id.toString())}
                    className={cn(
                      'hover:bg-accent p-3 transition-colors',
                      'border-b last:border-b-0',
                      notification.status === 'pending' && 'bg-accent/50',
                      'cursor-pointer'
                    )}
                  >
                    <div className='flex items-start gap-2'>
                      <div className='flex-1'>
                        <p className={cn('text-sm', notification.status === 'pending' && 'font-medium')}>
                          {notification.content}
                        </p>
                        <span className='text-muted-foreground text-xs'>
                          {new Date(notification.notifyDate).toLocaleDateString()}
                        </span>
                      </div>
                      {notification.status === 'pending' && <div className='mt-1 h-2 w-2 rounded-full bg-blue-500' />}
                    </div>
                  </div>
                ))
              ) : (
                <div className='text-muted-foreground p-4 text-center text-sm'>No notifications</div>
              )}
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default NumberNotification
