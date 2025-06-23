import { useEffect } from 'react'
import { EventSourcePolyfill } from 'event-source-polyfill'
import Cookies from 'js-cookie'
import { toast } from 'sonner'
export const useNotification = () => {
  const token = Cookies.get('accessToken')

  useEffect(() => {
    const eventSource = new EventSourcePolyfill(`${import.meta.env.VITE_API_URL}sse`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    eventSource.onmessage = (event) => {
      toast.success(event.data)
    }
    return () => eventSource.close()
  }, [])
}
