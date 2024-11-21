import { Skeleton } from "@/components/ui/skeleton";

const CardLoading = () => {
  return new Array(6).fill(null).map((_, index) => {
    return (
      <Skeleton key={index} className="rounded-[25px] aspect-[3/2] w-full" />
    );
  });
};

export default CardLoading;
