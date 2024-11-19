import { Skeleton } from "@/components/ui/skeleton";

const ProfileLoading = () => {
  return new Array(10).fill(null).map((_, index) => {
    return (
      <div key={index} className="space-y-[9px]">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-[50px] w-full" />
      </div>
    );
  });
};

export default ProfileLoading;
