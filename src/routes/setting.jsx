import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Profile = lazy(() => import("../modules/setting/pages/profile"));
const Preference = lazy(() => import("../modules/setting/pages/preference"));
const Security = lazy(() => import("../modules/setting/pages/security"));

const SettingRoutes = () => {
  const routes = [
    {
      index: true,
      element: <Navigate to="profile" replace />,
    },
    {
      path: "profile",
      element: <Profile />,
    },
    {
      path: "preference",
      element: <Preference />,
    },
    {
      path: "security",
      element: <Security />,
    },
  ];

  return routes;
};

export default SettingRoutes;
