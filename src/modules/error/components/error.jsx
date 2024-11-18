import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ICON, ROUTES } from "../../../utils/constants";

const Error = (props) => {
  const { message } = props;

  const reloadPageHandler = () => {
    window.location.reload();
  };

  return (
    <>
      <img
        className="h-60"
        src={ICON.illustration.notFound}
        alt="error cover"
      />
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-medium text-xl capitalize">
          {message || "something went wrong"}
        </h1>
        <p className="text-secondary w-[400px] text-center">
          Brace yourself till we get the error fixed. You may also refresh the
          page or try again later
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="secondary" onClick={reloadPageHandler}>
          Reload page
        </Button>
        <Button asChild>
          <Link to={ROUTES.dashboard}>Go back to home</Link>
        </Button>
      </div>
    </>
  );
};

export default Error;
