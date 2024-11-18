import { lazy } from "react";
import { Navigate } from "react-router-dom";

const CreditCardList = lazy(() => import("../modules/credit-card/pages/list"));

const CreditCardRoutes = () => {
  const routes = [
    {
      index: true,
      element: <Navigate to="list" replace />,
    },
    {
      path: "list",
      element: <CreditCardList />,
    },
  ];

  return routes;
};

export default CreditCardRoutes;
