import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout } from "../modules/auth/layouts";
import AuthRoutes from "./auth";
import DashboardRoutes from "./dashboard";
import { StoreProvider } from "../providers";
import ErrorBoundary from "../modules/error/pages/error-boundary";
import PrimaryLayout from "../modules/layouts/primary";
import TransactionRoutes from "./transaction";
import AccountRoutes from "./account";
import InvestmentRoutes from "./investment";
import CreditCardRoutes from "./credit-card";
import LoanRoutes from "./loan";
import ServiceRoutes from "./service";
import PrivilegeRoutes from "./privilege";
import SettingRoutes from "./setting";
import { SettingLayout } from "../modules/setting/layouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StoreProvider />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to="auth" replace />,
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: AuthRoutes(),
      },
      {
        path: "overview",
        element: <PrimaryLayout />,
        children: DashboardRoutes(),
      },
      {
        path: "transaction",
        element: <PrimaryLayout />,
        children: TransactionRoutes(),
      },
      {
        path: "account",
        element: <PrimaryLayout />,
        children: AccountRoutes(),
      },
      {
        path: "investment",
        element: <PrimaryLayout />,
        children: InvestmentRoutes(),
      },
      {
        path: "credit-card",
        element: <PrimaryLayout />,
        children: CreditCardRoutes(),
      },
      {
        path: "loan",
        element: <PrimaryLayout />,
        children: LoanRoutes(),
      },
      {
        path: "service",
        element: <PrimaryLayout />,
        children: ServiceRoutes(),
      },
      {
        path: "privilege",
        element: <PrimaryLayout />,
        children: PrivilegeRoutes(),
      },
      {
        path: "setting",
        element: <PrimaryLayout />,
        children: [
          {
            element: <SettingLayout />,
            children: SettingRoutes(),
          },
        ],
      },
    ],
  },
]);

export default router;
