import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ICON, ROUTES } from "../../utils/constants";

const Settings = () => {
  return (
    <Button
      variant="secondary"
      className="hidden w-[50px] h-[50px] lg:rounded-full lg:p-[12px] lg:block"
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
