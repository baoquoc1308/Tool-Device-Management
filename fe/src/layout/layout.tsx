import { Outlet } from 'react-router-dom'
import { SidebarProvider, AppSidebar, Header } from '@/components'
import Cookies from 'js-cookie'
import { useNotification } from '@/hooks'

const Layout = () => {
  const sidebarState = Cookies.get('sidebar_state') === 'true'
  useNotification()
  return (
    <SidebarProvider defaultOpen={sidebarState}>
      <AppSidebar />
      <main className='flex flex-1 flex-col gap-4 overflow-x-hidden overflow-y-auto p-4 pt-0'>
        <Header />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

export default Layout
