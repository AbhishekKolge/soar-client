import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "../components";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import { slugToName } from "../../utils/helper";

const PrimaryLayout = () => {
  const location = useLocation();
  const title = slugToName(location.pathname.split("/")[1]);

  return (
    <SidebarProvider>
      <Sidebar />
      <main className="w-full">
        <Header>{title}</Header>
        <SidebarTrigger className="md:hidden" />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default PrimaryLayout;
