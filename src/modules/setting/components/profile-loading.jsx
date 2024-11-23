import { Skeleton } from "@/components/ui/skeleton";

const ProfileLoading = () => {
  return new Array(10).fill(null).map((_, index) => {
    return (
      <div key={index} className="space-y-[9px] w-full">
        <Skeleton className="h-[16px] w-24" />
        <Skeleton className="h-[40px] md:h-[50px] w-full" />
      </div>
    );
  });
};

export default ProfileLoading;
