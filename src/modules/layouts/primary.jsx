import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "../components";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import { slugToName } from "../../utils/helper";

const PrimaryLayout = () => {
  const location = useLocation();
  const title = slugToName(location.pathname.split("/")[1]);

  return (
    <SidebarProvider>
      <Sidebar />
      <main className="w-full bg:white lg:bg-secondary flex flex-col">
        <Header>{title}</Header>
        <section className="pt-[11px] flex-1 pb-[21px] px-[25px] bg-white lg:bg-secondary lg:px-[40px] lg:py-[24px]">
          <Outlet />
        </section>
      </main>
    </SidebarProvider>
  );
};

export default PrimaryLayout;
