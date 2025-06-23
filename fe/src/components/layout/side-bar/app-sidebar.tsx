import { SidebarMainContent } from './_components/sidebar-main-content'
import { NavUser } from './_components/sidebar-footer'
import { SidebarNav } from './_components/sidebar-item'
import { Sidebar, SidebarContent, SidebarFooter, SidebarMenuSkeleton, SidebarRail } from '@/components/ui/sidebar'
import { useAppSelector } from '@/hooks'

function AppSidebar() {
  const data = SidebarNav()
  const loading = useAppSelector((state) => state.auth.loading)

  return (
    <Sidebar collapsible='icon'>
      <SidebarContent>
      {loading ? (
          <>
            <SidebarMenuSkeleton showIcon />
            <SidebarMenuSkeleton showIcon />
            <SidebarMenuSkeleton showIcon />
          </>
        ) : (
          <SidebarMainContent items={data.navMain} />
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
export default AppSidebar
