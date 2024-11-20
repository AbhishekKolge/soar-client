import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ICON, ROUTES } from "../../utils/constants";

const Notification = () => {
  return (
    <Button
      variant="secondary"
      className="w-[50px] h-[50px] p-0 rounded-full lg:rounded-full"
      asChild
    >
      <Link to={ROUTES.preferenceSetting}>
        <img
          src={ICON.icons.notificationActive}
          className="w-[25px] h-[25px]"
          alt="active notification"
        />
      </Link>
    </Button>
  );
};

export default Notification;
