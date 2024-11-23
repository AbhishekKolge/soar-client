import { NavLink } from "react-router-dom";
import { SETTINGS_TAB_OPTIONS } from "../../../utils/constants";
import { cn } from "@/lib/utils";

const SettingsTab = () => {
  return (
    <div className="border-b border-secondary flex gap-[30px] md:gap-11 sm:justify-center md:justify-start overflow-x-scroll">
      {SETTINGS_TAB_OPTIONS.map((setting) => {
        return (
          <NavLink
            className={({ isActive }) => {
              return cn(
                "min-w-[80px] md:min-w-[114px] block pb-[7px] md:pb-[11px] px-[6px] md:px-[15px] relative leading-5 font-medium text-muted text-center text-[13px] lg:text-[16px]",
                isActive &&
                  "before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-full before:h-[2px] md:before:h-[3px] before:bg-sidebar-foreground before:rounded-t-[10px] text-foreground"
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
