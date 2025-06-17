import { useEffect, useState } from 'react'
import { EventSourcePolyfill } from 'event-source-polyfill'
import Cookies from 'js-cookie'
const ToastNotification = () => {
  const token = Cookies.get('accessToken')
  const [notification, setNotification] = useState<string>('')
  useEffect(() => {
    const eventSource = new EventSourcePolyfill(`${import.meta.env.VITE_API_URL}/sse`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    eventSource.onmessage = (event) => {
      const notification = JSON.parse(event.data)
      setNotification({ ...notification })
    }

    // terminating the connection on component unmount
    return () => eventSource.close()
  }, [])
  return <div>{notification}</div>
}

export default ToastNotification
