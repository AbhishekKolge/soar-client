import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { SIDEBAR_OPTIONS } from "../../utils/constants/defaults";
import { Link } from "react-router-dom";
import { Logo } from "../../components/layout";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const AppSidebar = () => {
  const location = useLocation();
  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {SIDEBAR_OPTIONS.map((item) => {
            const isActive = location.pathname.startsWith(item.url);
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton isActive={isActive} asChild>
                  <Link to={item.url}>
                    <img
                      src={isActive ? item.iconDark : item.icon}
                      className="w-[25px] h-[25px]"
                      alt={`${item.icon} icon`}
                    />

                    <span
                      className={cn(
                        "text-accent-secondary text-lg font-medium",
                        isActive && "text-foreground"
                      )}
                    >
                      {item.title}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
