import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout } from "../modules/auth/layouts";
import AuthRoutes from "./auth";
import DashboardRoutes from "./dashboard";
import { StoreProvider } from "../providers";
import ErrorBoundary from "../modules/error/pages/error-boundary";
import PrimaryLayout from "../modules/layouts/primary";

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
        path: "dashboard",
        element: <PrimaryLayout />,
        children: DashboardRoutes(),
      },
    ],
  },
]);

export default router;
