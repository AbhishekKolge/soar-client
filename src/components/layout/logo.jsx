import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import DarkIcon from "../../assets/icons/logo-dark.svg";

const Logo = (props) => {
  const { className } = props;
  return (
    <Link to={ROUTES.dashboard}>
      <div className={cn("flex gap-2.5 items-center", className)}>
        <DarkIcon />
        <span className="text-primary font-extrabold text-2xl">Soar Task</span>
      </div>
    </Link>
  );
};

export default Logo;
