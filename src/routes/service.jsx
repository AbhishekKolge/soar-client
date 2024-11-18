import { lazy } from "react";

const Service = lazy(() => import("../modules/service/pages/home"));

const ServiceRoutes = () => {
  const routes = [
    {
      index: true,
      element: <Service />,
    },
  ];

  return routes;
};

export default ServiceRoutes;
