import { SidebarMainContent } from './_components/sidebar-main-content'
import { NavUser } from './_components/sidebar-footer'
import { data } from './_components/sidebar-item'
import { Sidebar, SidebarContent, SidebarFooter, SidebarRail } from '@/components/ui/sidebar'

function AppSidebar() {
  return (
    <Sidebar collapsible='icon'>
      <SidebarContent>
        <SidebarMainContent items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
export default AppSidebar
