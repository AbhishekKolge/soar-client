import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="w-full grid grid-cols-12 gap-x-[30px] gap-y-6">
      <div className="col-span-8 grid gap-y-5">
        <Skeleton className="h-7 w-28" />
        <div className="grid grid-cols-2 gap-x-[30px]">
          <Skeleton className="rounded-[15px] min-h-[235px]" />
          <Skeleton className="rounded-[15px] min-h-[235px]" />
        </div>
      </div>
      <div className="grid gap-y-5 col-span-4">
        <Skeleton className="h-7 w-28" />
        <Skeleton className="rounded-[15px] min-h-[235px]" />
      </div>
      <div className="col-span-8 grid gap-y-5">
        <Skeleton className="h-7 w-28" />
        <Skeleton className="rounded-[15px] min-h-[322px]" />
      </div>
      <div className="col-span-4 grid gap-y-5">
        <Skeleton className="h-7 w-28" />
        <Skeleton className="rounded-[15px] min-h-[322px]" />
      </div>
      <div className="col-span-5 grid gap-y-5">
        <Skeleton className="h-7 w-28" />
        <Skeleton className="rounded-[15px] min-h-[276px]" />
      </div>
      <div className="col-span-7 grid gap-y-5">
        <Skeleton className="h-7 w-28" />
        <Skeleton className="rounded-[15px] min-h-[276px]" />
      </div>
    </div>
  );
};

export default Loading;
