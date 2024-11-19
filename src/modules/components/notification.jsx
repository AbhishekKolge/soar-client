import { Button } from "@/components/ui/button";
import { ICON } from "../../utils/constants";

const Notification = () => {
  return (
    <Button
      variant="secondary"
      className="w-[50px] h-[50px] p-0 rounded-full lg:rounded-full"
    >
      <img
        src={ICON.icons.notificationActive}
        className="w-[25px] h-[25px]"
        alt="active notification"
      />
      {/* <BellDotIcon className="!w-[25px] !h-[25px]" stroke="#396AFF" /> */}
    </Button>
  );
};

export default Notification;
