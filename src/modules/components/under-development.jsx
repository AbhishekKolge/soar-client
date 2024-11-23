import { ICON } from "../../utils/constants";

const UnderDevelopment = () => {
  return (
    <div className="flex h-full justify-center flex-col gap-6 m-auto">
      <img
        className="h-60"
        src={ICON.illustration.construction}
        alt="not found cover"
      />
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-medium text-xl md:text-2xl text-center capitalize">
          {`We're building something amazing! 🚀`}
        </h1>
        <span className="text-primary text-sm md:text-base text-center">
          Stay tuned for updates. Exciting features are on their way!
        </span>
      </div>
    </div>
  );
};

export default UnderDevelopment;
