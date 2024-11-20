import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../utils/constants";
import { PlusCircledIcon } from "@radix-ui/react-icons";

const PlaceholderCard = (props) => {
  const { replace } = props;
  return (
    <Card className="border-dashed border-2 border-muted">
      <Link
        className="w-full h-full grid place-content-center"
        to={{
          pathname: ROUTES.creditCardList,
          search: "?add-card=true",
        }}
        replace={replace}
      >
        <PlusCircledIcon className="w-14 h-14" color="#718EBF" />
      </Link>
    </Card>
  );
};

export default PlaceholderCard;
