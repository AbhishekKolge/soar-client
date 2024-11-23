import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <main className="grid h-full place-content-center">
      <div className="flex justify-center items-center gap-4 flex-col">
        <Loader
          className="stroke-primary motion-safe:animate-spin-slow"
          size={50}
        />
        <div className="text-center">
          <h3 className="capitalize text-lg">Please be patient...</h3>
          <span className="text-sm capitalize">We are getting your data</span>
        </div>
      </div>
    </main>
  );
};

export default Loading;
