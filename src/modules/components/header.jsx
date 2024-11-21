import { useSelector } from "react-redux";
import { NavAction } from "../../components/ui/nav-action";
import { useDispatch } from "react-redux";
import { logoutHandler } from "../../features/auth/auth-action";
import Notification from "./notification";
import Settings from "./settings";
import Search from "./search";

const Header = (props) => {
  const { children } = props;
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logoutAccountHandler = () => {
    dispatch(logoutHandler());
  };

  return (
    <header className="bg-background border-b border-border-secondary py-5 px-10 flex items-center justify-between">
      <h2 className="text-primary text-[28px] font-semibold leading-9">
        {children}
      </h2>
      <div className="flex items-center gap-[30px]">
        <Search />
        <Settings />
        <Notification />
        <NavAction auth={auth} onLogout={logoutAccountHandler} />
      </div>
    </header>
  );
};

export default Header;
