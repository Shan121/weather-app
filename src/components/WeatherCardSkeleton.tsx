import { Skeleton } from "./ui/skeleton";

const WeatherCardSkeleton = () => {
  return (
    <div className="w-full flex flex-col items-center gap-y-5">
      <div className="w-full flex items-center justify-between px-6">
        <Skeleton className="w-12 h-4" />
        <Skeleton className="w-12 h-4" />
      </div>
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="flex flex-col items-center gap-y-5">
        <Skeleton className="w-[200px] h-4" />
        <Skeleton className="w-[200px] h-4" />
        <Skeleton className="w-[200px] h-6" />
      </div>
      <div className="w-full flex items-center justify-between px-6">
        <div className="flex items-center gap-x-2">
          <Skeleton className="w-12 h-12" />
          <div className="flex flex-col">
            <Skeleton className="text-sm" />
            <Skeleton className="text-sm" />
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <Skeleton className="w-12 h-12" />
          <div className="flex flex-col">
            <Skeleton className="text-sm" />
            <Skeleton className="text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCardSkeleton;
