import { lazy } from "react";

const Privilege = lazy(() => import("../modules/privilege/pages/home"));

const PrivilegeRoutes = () => {
  const routes = [
    {
      index: true,
      element: <Privilege />,
    },
  ];

  return routes;
};

export default PrivilegeRoutes;
