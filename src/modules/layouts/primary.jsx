import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "../components";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const PrimaryLayout = () => {
  return (
    <SidebarProvider>
      <Sidebar />
      <main>
        <Header>header</Header>
        <SidebarTrigger className="md:hidden" />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default PrimaryLayout;
