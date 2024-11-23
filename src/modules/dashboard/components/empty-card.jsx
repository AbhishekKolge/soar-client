import { Link } from "react-router-dom";
import { ICON, ROUTES } from "../../../utils/constants";
import { Button } from "@/components/ui/button";

const EmptyCard = () => {
  return (
    <div className="flex h-full justify-center flex-col gap-6 w-full self-center">
      <img
        className="h-60"
        src={ICON.illustration.cardPayment}
        alt="not found cover"
      />
      <div className="flex flex-col items-center gap-4">
        <div className="text-center">
          <h1 className="font-medium text-xl md:text-2xl capitalize">
            You are missing out 😩
          </h1>
          <span className="text-primary text-sm md:text-base">
            Add your credit card now to get started
          </span>
        </div>
        <Button className="w-[200px]" asChild>
          <Link
            to={{
              pathname: ROUTES.creditCardList,
              search: "?add-card=true",
            }}
          >
            Add card
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default EmptyCard;
