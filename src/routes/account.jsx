import { lazy } from "react";
import { Navigate } from "react-router-dom";

const AccountList = lazy(() => import("../modules/account/pages/list"));

const AccountRoutes = () => {
  const routes = [
    {
      index: true,
      element: <Navigate to="list" replace />,
    },
    {
      path: "list",
      element: <AccountList />,
    },
  ];

  return routes;
};

export default AccountRoutes;
