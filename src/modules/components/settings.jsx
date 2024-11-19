import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ICON, ROUTES } from "../../utils/constants";

const Settings = () => {
  return (
    <Button
      variant="secondary"
      className="w-[50px] h-[50px] p-0 rounded-full lg:rounded-full"
      asChild
    >
      <Link to={ROUTES.securitySetting}>
        <img
          src={ICON.icons.cog}
          className="w-[25px] h-[25px]"
          alt="settings"
        />
      </Link>
    </Button>
  );
};

export default Settings;
