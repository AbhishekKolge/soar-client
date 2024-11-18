import { lazy } from "react";
import { Navigate } from "react-router-dom";

const TransactionList = lazy(() => import("../modules/transaction/pages/list"));

const TransactionRoutes = () => {
  const routes = [
    {
      index: true,
      element: <Navigate to="list" replace />,
    },
    {
      path: "list",
      element: <TransactionList />,
    },
  ];

  return routes;
};

export default TransactionRoutes;
