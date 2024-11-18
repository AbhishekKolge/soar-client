import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ICON, ROUTES } from "../../../utils/constants";

const Error404 = () => {
  return (
    <>
      <img
        className="h-60"
        src={ICON.illustration.notFound}
        alt="not found cover"
      />
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-medium text-xl capitalize">Page not found</h1>
        <span className="text-secondary">
          The page you are looking for does not exist
        </span>
      </div>
      <Button asChild>
        <Link to={ROUTES.dashboard}>Go back to home</Link>
      </Button>
    </>
  );
};

export default Error404;
