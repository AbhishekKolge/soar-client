import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { checkLoginStatus } from "../../features/auth/auth-action";
import { useFirstRender } from "../../utils/hooks";
import Loading from "./loading";
import { ROUTES } from "../../utils/constants";

const AuthChecker = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { firstRender } = useFirstRender();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const isAuthPage = pathname.startsWith("/auth");

  useEffect(() => {
    firstRender && dispatch(checkLoginStatus());
  }, [dispatch, firstRender]);

  if (isLoggedIn === null) {
    return <Loading />;
  }

  if (isLoggedIn === false && !isAuthPage) {
    return <Navigate to={ROUTES.login} replace />;
  }

  if (isLoggedIn && isAuthPage) {
    return <Navigate to={ROUTES.dashboard} replace />;
  }

  return <Outlet />;
};

export default AuthChecker;
