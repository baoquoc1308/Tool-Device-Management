// import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui";
import { AppSidebar } from "@/components/ui";
import Cookies from "js-cookie";
const Layout = () => {
  const sidebarState = Cookies.get("sidebar_state") === "true";
  return (

    <SidebarProvider defaultOpen={sidebarState}>
      <AppSidebar />
      <main>
        <SidebarTrigger />
      </main>
    </SidebarProvider>
  );
};

export default Layout
