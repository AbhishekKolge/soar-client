import { ICON } from "../../../utils/constants";



const EmptyCard = () => {
  return (
    <div className="flex flex-col gap-6">
      <img
        className="h-60"
        src={ICON.illustration.creditCard}
        alt="not found cover"
      />
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-medium text-2xl capitalize">
          You are missing out 😩
        </h1>
        <span className="text-primary">
          Add your credit card now to get started
        </span>
      </div>
    </div>
  );
};

export default EmptyCard;
