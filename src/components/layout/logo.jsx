import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ICON, ROUTES } from "../../utils/constants";

const Logo = (props) => {
  const { className } = props;
  return (
    <Link to={ROUTES.dashboard}>
      <div className={cn("flex gap-2.5 items-center", className)}>
        <img src={ICON.icons.darkLogo} alt="soar logo" />
        <span className="text-primary font-extrabold text-2xl">Soar Task</span>
      </div>
    </Link>
  );
};

export default Logo;
