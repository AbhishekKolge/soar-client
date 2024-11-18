import { lazy } from "react";

const Loan = lazy(() => import("../modules/loan/pages/home"));

const LoanRoutes = () => {
  const routes = [
    {
      index: true,
      element: <Loan />,
    },
  ];

  return routes;
};

export default LoanRoutes;
