import { useSelector } from "react-redux";
import { NavAction } from "../../components/ui/nav-action";
import { useDispatch } from "react-redux";
import { logoutHandler } from "../../features/auth/auth-action";
import Notification from "./notification";
import Settings from "./settings";
import Search from "./search";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Header = (props) => {
  const { children } = props;
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logoutAccountHandler = () => {
    dispatch(logoutHandler());
  };

  return (
    <header className="pb-[11px] pt-[25px] px-[25px] lg:pt-[20px] lg:pb-[20px] lg:px-[40px] bg-white">
      <div className="max-w-screen-xl m-auto w-full h-full flex flex-col gap-[25px]">
        <div className="flex items-center justify-between">
          <SidebarTrigger className="lg:hidden p-0" />
          <h2 className="text-primary text-[20px] lg:text-[28px] font-semibold leading-9">
            {children}
          </h2>
          <div className="flex items-center gap-[30px]">
            <Search className="hidden lg:block" />
            <Settings />
            <Notification />
            <NavAction auth={auth} onLogout={logoutAccountHandler} />
          </div>
        </div>
        <Search className="lg:hidden" />
      </div>
    </header>
  );
};

export default Header;
