import { lazy } from "react";

const Dashboard = lazy(() => import("../modules/dashboard/pages/home"));

const DashboardRoutes = () => {
  const routes = [
    {
      index: true,
      element: <Dashboard />,
    },
  ];

  return routes;
};

export default DashboardRoutes;
