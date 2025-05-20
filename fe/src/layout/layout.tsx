import { Outlet } from 'react-router-dom'
import { SidebarProvider, AppSidebar, Header } from '@/components'
import Cookies from 'js-cookie'

const Layout = () => {
  const sidebarState = Cookies.get('sidebar_state') === 'true'
  return (
    <SidebarProvider defaultOpen={sidebarState}>
      <AppSidebar />
      <main className='flex flex-1 flex-col gap-4 p-4 pt-0'>
        <Header />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

export default Layout
