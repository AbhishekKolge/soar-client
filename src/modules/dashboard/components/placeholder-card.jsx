import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../utils/constants";
import { PlusCircledIcon } from "@radix-ui/react-icons";

const PlaceholderCard = (props) => {
  const { replace } = props;
  return (
    <Card className="border-dashed border-2 border-muted w-full min-w-[265px] aspect-[265/170] rounded-[15px] lg:rounded-[25px] lg:aspect-[350/235] overflow-hidden">
      <Link
        className="w-full h-full grid place-content-center"
        to={{
          pathname: ROUTES.creditCardList,
          search: "?add-card=true",
        }}
        replace={replace}
      >
        <PlusCircledIcon
          className="w-[35px] h-[35px] lg:w-[45px] lg:h-[45px]"
          color="#718EBF"
        />
      </Link>
    </Card>
  );
};

export default PlaceholderCard;
