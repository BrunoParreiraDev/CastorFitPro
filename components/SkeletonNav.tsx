import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonNav() {
  return (
    <div className="flex items-center justify-center w-full">
      {/* Skeleton para celular e outros dispositivos */}
      <Skeleton className="h-[40px] w-full rounded-md" />
    </div>
  );
}
