import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonName() {
  return (
    <div className="inline-flex items-center">
      <Skeleton className="h-[30px] w-[233px] rounded-md" />
    </div>
  );
}
