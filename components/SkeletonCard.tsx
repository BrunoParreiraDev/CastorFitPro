import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[150px] sm:h-[175px] md:h-[200px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full sm:w-[80%] md:w-[70%]" />
        <Skeleton className="h-4 w-[80%] sm:w-[70%] md:w-[60%]" />
      </div>
    </div>
  )
}