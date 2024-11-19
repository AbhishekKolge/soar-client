import { Skeleton } from "@/components/ui/skeleton";

const CardLoading = () => {
  return new Array(6).fill(null).map((_, index) => {
    return <Skeleton key={index} className="h-[246.5px] w-full" />;
  });
};

export default CardLoading;
