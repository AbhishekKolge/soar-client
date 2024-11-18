import { useSelector } from "react-redux";
import { NavAction } from "../../components/ui/nav-action";
import { useDispatch } from "react-redux";
import { logoutHandler } from "../../features/auth/auth-action";

const Header = (props) => {
  const { children } = props;
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logoutAccountHandler = () => {
    dispatch(logoutHandler());
  };

  return (
    <header className="border-b border-border-secondary py-[33px] px-10 flex items-center justify-between">
      <h2 className="text-primary text-[28px] font-semibold leading-9">
        {children}
      </h2>
      <div>
        <NavAction auth={auth} onLogout={logoutAccountHandler} />
      </div>
    </header>
  );
};

export default Header;
