import { Suspense } from "react";
import TopBarProgress from "react-topbar-progress-indicator";

const SuspenseView = (props) => {
  const { children } = props;

  TopBarProgress.config({
    barColors: {
      0: "#232323",
    },
    barThickness: 3,
  });

  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export default SuspenseView;
