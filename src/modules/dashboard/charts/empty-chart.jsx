import { ICON } from "../../../utils/constants";

const EmptyChart = () => {
  return (
    <div className="w-full grid place-content-center gap-4">
      <img
        className="w-[80%] h-[80%] max-h-[95px] m-auto object-contain"
        src={ICON.illustration.error}
        alt="empty data"
      />
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-medium text-xl capitalize">No transactions...</h1>
      </div>
    </div>
  );
};

export default EmptyChart;
