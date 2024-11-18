import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Profile = lazy(() => import("../modules/setting/pages/profile"));

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
  ];

  return routes;
};

export default SettingRoutes;
