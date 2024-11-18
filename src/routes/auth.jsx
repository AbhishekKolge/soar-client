import { lazy } from "react";
import { Navigate } from "react-router-dom";

const ForgotPassword = lazy(() =>
  import("../modules/auth/pages/forgot-password")
);
const Login = lazy(() => import("../modules/auth/pages/login"));
const Register = lazy(() => import("../modules/auth/pages/register"));
const ResetPassword = lazy(() =>
  import("../modules/auth/pages/reset-password")
);
const Verify = lazy(() => import("../modules/auth/pages/verify"));
const GoogleLogin = lazy(() => import("../modules/auth/pages/google-login"));

const AuthRoutes = () => {
  const routes = [
    {
      index: true,
      element: <Navigate to="login" replace />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "verify",
      element: <Verify />,
    },
    {
      path: "forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "reset-password",
      element: <ResetPassword />,
    },
    {
      path: "google",
      element: <GoogleLogin />,
    },
  ];

  return routes;
};

export default AuthRoutes;
