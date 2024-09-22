import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonName() {
  return (
    <div className="inline-flex items-center">
      <Skeleton className="h-[30px] w-40 sm:w-52 md:w-64 rounded-md" />
    </div>
  )
}