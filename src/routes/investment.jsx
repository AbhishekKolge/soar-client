import { lazy } from "react";

const Investment = lazy(() => import("../modules/investment/pages/home"));

const InvestmentRoutes = () => {
  const routes = [
    {
      index: true,
      element: <Investment />,
    },
  ];

  return routes;
};

export default InvestmentRoutes;
