import { NavLink } from "react-router-dom";
import { SETTINGS_TAB_OPTIONS } from "../../../utils/constants";
import { cn } from "@/lib/utils";

const SettingsTab = () => {
  return (
    <div className="border-b border-secondary flex gap-11">
      {SETTINGS_TAB_OPTIONS.map((setting) => {
        return (
          <NavLink
            className={({ isActive }) => {
              return cn(
                "min-w-[114px] block pb-[11px] px-[15px] relative leading-5 font-medium text-muted text-center",
                isActive &&
                  "before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-full before:h-[3px] before:bg-sidebar-foreground before:rounded-t-[10px] text-foreground"
              );
            }}
            key={setting.title}
            to={setting.url}
          >
            {setting.title}
          </NavLink>
        );
      })}
    </div>
  );
};

export default SettingsTab;
